import type { TOptional } from '@/@types/common.type';
import axiosConfig from '@/config/api.config';
import cookiesService from '@/services/cookies.service';
import EHttpStatusCode from '@/utils/httpStatusCode';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios';
import axios from 'axios';
import Cookie from 'js-cookie';
import _omitBy from 'lodash/omitBy';
import { trackPromise } from 'react-promise-tracker';

type TFailedRequests = {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
};

const MAXIMUM_RETRY_UN_AUTHENTICATION = 5;

type TRefreshToKenResponse = {
  data: {
    accessToken?: string;
    refreshToken?: string;
  };
};

export type TApiResponse<T> = {
  code: number;

  data: T;

  message: string;
} & AxiosResponse;

type TErrorResponse = {
  message: string;

  statusCode: number;
};

export default class HttpService {
  private readonly instance: AxiosInstance;

  private failedRequests: TFailedRequests[] = [];

  private isTokenRefreshing = false;

  private readonly refreshTokenCount = new Map<TOptional<string>, number>();

  constructor(config?: CreateAxiosDefaults, _prefix?: string) {
    const instance = axios.create({ ...axiosConfig, ...config });
    Object.assign(instance, this.setupInterceptorsTo(instance));
    this.instance = instance;
  }

  // private readonly removeTokenCookie = () => {
  //   cookiesService.remove('access_token');
  //   cookiesService.remove('refresh_token');
  // };

  private readonly onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = cookiesService.get('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  private readonly onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);

    return Promise.reject(error);
  };

  private readonly onResponse = <T>(response: AxiosResponse<TApiResponse<T>>): TApiResponse<T> => {
    const { url } = response.config;
    const result = response.data;

    const isExistedRefreshTokenCount = this.refreshTokenCount.has(url);

    if (isExistedRefreshTokenCount) {
      this.refreshTokenCount.set(url, 0);
    }

    return result;
  };

  private readonly onResponseError = async (error: AxiosError) => {
    // " non-null assertion operator | '!' " make sure the config property will not be "null" or "undefined"
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const originalRequest = error.config!;
    const { url } = originalRequest;
    const data = error.response?.data as TErrorResponse;

    if (data.statusCode !== EHttpStatusCode.UNAUTHORIZED) {
      return Promise.reject(error);
    }

    if (this.isTokenRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedRequests.push({ resolve, reject, config: originalRequest, error });
      });
    }

    const existedRefreshTokenCount = this.refreshTokenCount.get(url) ?? 0;

    if (existedRefreshTokenCount >= MAXIMUM_RETRY_UN_AUTHENTICATION) {
      window.location.href = '/login';

      return Promise.reject(new Error('Maximum retry attempts exceeded. Redirecting to login.'));
    }

    this.refreshTokenCount.set(url, existedRefreshTokenCount + 1);
    this.isTokenRefreshing = true;

    try {
      const refreshToken = Cookie.get('refresh_token') ?? '';
      const urlEndpoint = `${axiosConfig.baseURL}/auth/user/refresh-token`;

      const response = await axios.post(urlEndpoint, null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      });

      const result: TRefreshToKenResponse = response.data;

      cookiesService.set('access_token', result.data.accessToken, { path: '/' });
      cookiesService.set('refresh_token', result.data.refreshToken, { path: '/' });

      this.failedRequests.forEach(({ resolve, reject, config }) => {
        this.instance(config)
          .then((resHttp) => resolve(resHttp))
          .catch((errorHttp) => reject(errorHttp));
      });
    } catch (_error: unknown) {
      this.failedRequests.forEach(({ reject, error: errorFailedRequest }) => reject(errorFailedRequest));
      // this.removeTokenCookie();
      // window.location.href = `/dashboard`;

      return Promise.reject(error);
    } finally {
      this.failedRequests = [];
      this.isTokenRefreshing = false;
    }

    if (originalRequest) {
      return this.instance(originalRequest);
    }

    return Promise.reject(new Error('Original request is undefined.'));
  };

  private setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    axiosInstance.interceptors.response.use(this.onResponse, this.onResponseError);

    return axiosInstance;
  }

  private trackPromise<T, F extends (...agrs: Parameters<F>) => Promise<T>>(asyncFn: F, ...args: Parameters<F>) {
    return trackPromise(asyncFn(...args));
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.trackPromise(this.instance.get, url, config);
  }

  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.trackPromise(this.instance.post, url, data, config);
  }

  public async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.trackPromise(this.instance.patch, url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.trackPromise(this.instance.delete, url, config);
  }

  public setHttpConfigs(config?: Partial<AxiosRequestConfig>) {
    if (config?.baseURL) {
      this.instance.defaults.baseURL = config.baseURL;
    }

    this.instance.defaults = {
      ...this.instance.defaults,
      ..._omitBy(config, 'BaseURL')
    };
  }
}

import axiosConfig from '@/config/api.config';
import HttpStatusCode from '@/utils/httpStatusCode';
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
  resolve: any;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
};

const MAXIMUM_RETRY_UN_AUTHENTICATION = 5;

export default class HttpService {
  private readonly instance: AxiosInstance;

  private failedRequests: TFailedRequests[] = [];

  private isTokenRefreshing = false;

  private readonly refreshTokenCount = new Map();

  constructor(config?: CreateAxiosDefaults, _prefix?: string) {
    const instance = axios.create({ ...axiosConfig, ...config });
    Object.assign(instance, this.setupInterceptorsTo(instance));
    this.instance = instance;
  }

  private readonly removeTokenCookie = () => {
    Cookie.remove('access_token');
    Cookie.remove('refresh_token');
  };

  private readonly onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = Cookie.get('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  private readonly onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);

    return Promise.reject(error);
  };

  private readonly onResponse = (response: AxiosResponse) => {
    const { url } = response.config;
    const result = response.data;

    const isExistedRefreshTokenCount = this.refreshTokenCount.has(url);

    if (isExistedRefreshTokenCount) {
      this.refreshTokenCount.set(url, 0);
    }

    return result;
  };

  private readonly onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const originalRequest = error.config!;
    const { url } = originalRequest;

    if (this.isTokenRefreshing) {
      return new Promise((resolve, reject) => {
        if (originalRequest) {
          this.failedRequests.push({ resolve, reject, config: originalRequest, error });
        }
      });
    }

    const existedRefreshTokenCount = this.refreshTokenCount.get(url) ?? 0;

    if (existedRefreshTokenCount >= MAXIMUM_RETRY_UN_AUTHENTICATION) {
      window.location.href = '/login';

      return Promise.reject(new Error('Maximum retry attempts exceeded. Redirecting to login.'));
    }

    this.refreshTokenCount.set(url, existedRefreshTokenCount + 1);
    this.isTokenRefreshing = true;

    const status = error.response?.status;
    // const errorMessage = (error?.toJSON() as any)?.message || 'Error';

    switch (status) {
      case HttpStatusCode.UNAUTHORIZED:
        // window.location.href = '/login';

        return Promise.reject(error);
      case HttpStatusCode.BAD_REQUEST:
      case HttpStatusCode.INTERNAL_SERVER_ERROR:
      case HttpStatusCode.SERVICE_UNAVAILABLE:
      case HttpStatusCode.FORBIDDEN:
      case HttpStatusCode.NOT_FOUND:
      default:
        break;
    }

    try {
      const refreshToken = Cookie.get('refresh_token') ?? '';
      const urlEndpoint = `${22}/api/token/refresh-token`;

      const response = await axios.post(urlEndpoint, { refreshToken });

      const result = response.data;
      const user = result?.user;

      Cookie.set('access_token', user?.token, { path: '/' });
      Cookie.set('refresh_token', user?.refreshToken, { path: '/' });

      this.failedRequests.forEach(({ resolve, reject, config }) => {
        this.instance(config)
          .then((resHttp) => resolve(resHttp))
          .catch((errorHttp) => reject(errorHttp));
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error: unknown) {
      this.failedRequests.forEach(({ reject, error: errorFailedRequest }) => reject(errorFailedRequest));
      this.removeTokenCookie();
      window.location.href = `${22}`;

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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _trackPromise<T, Fn extends (...agrs: Parameters<Fn>) => Promise<T>>(asyncFn: Fn, ...args: Parameters<Fn>) {
    return trackPromise(asyncFn(...args));
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this._trackPromise(this.instance.get, url, config);
  }

  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this._trackPromise(this.instance.post, url, data, config);
  }

  public async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this._trackPromise(this.instance.patch, url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this._trackPromise(this.instance.delete, url, config);
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

const axiosConfigs = {
  development: {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000
  },
  production: {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000
  },
  test: {
    baseURL: '',
    timeout: 10000
  }
};

const getAxiosConfig = () => {
  const nodeEnv: string = import.meta.env.MODE || import.meta.env.NODE_ENV;

  return axiosConfigs[nodeEnv as keyof typeof axiosConfigs];
};

const axiosConfig = getAxiosConfig();

export default axiosConfig;

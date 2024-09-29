import axiosConfig from '@/config/api.config';

import Http from './http.service';

class BaseApiService {
  protected httpClient: Http;

  constructor() {
    this.httpClient = new Http();
    this.httpClient.setHttpConfigs(axiosConfig);
  }
}

export default BaseApiService;

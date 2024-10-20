// import Cookies from 'js-cookie';
import type { TLogin } from '../stores/redux/auth/auth.type';
import BaseApiService from './baseApi.service';

class AuthService extends BaseApiService {
  constructor() {
    super();
  }

  async login(data: TLogin): Promise<any> {
    return this.httpClient.post<any>('/auth/login', data);
  }

  async login1(): Promise<any> {
    return this.httpClient.get<any>('/todos/2');
  }
}

const authService = new AuthService();
export default authService;

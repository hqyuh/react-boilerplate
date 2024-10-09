// import Cookies from 'js-cookie';
import BaseApiService from '../../../services/baseApi.service';
import type { TLogin } from './auth.type';

class AuthService extends BaseApiService {
  constructor() {
    super();
  }

  async login(data: TLogin): Promise<any> {
    return this.httpClient.post<any>('/login', data);
  }

  async login1(): Promise<any> {
    return this.httpClient.get<any>('/todos/2');
  }
}

const authService = new AuthService();
export default authService;

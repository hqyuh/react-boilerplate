import BaseApiService from '../../services/baseApi.service';
import type { ILogin } from './auth.type';

class AuthService extends BaseApiService {
  constructor() {
    super();
  }

  async login(data: ILogin): Promise<any> {
    return this.httpClient.post<any>('/login', data);
  }
}

const authService = new AuthService();
export default authService;

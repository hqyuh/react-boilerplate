import BaseApiService from '../../../services/baseApi.service';
import type { TLogin } from './auth.type';

class AuthService extends BaseApiService {
  constructor() {
    super();
  }

  async login(data: TLogin): Promise<any> {
    return this.httpClient.post<any>('/login', data);
  }
}

const authService = new AuthService();
export default authService;

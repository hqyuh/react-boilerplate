import Cookies from 'js-cookie';

class CookieService {
  public set<T>(name: string, value: string | T, options?: Cookies.CookieAttributes) {
    const originalValue = typeof value === 'string' ? value : JSON.stringify(value);
    Cookies.set(name, originalValue, options);
  }

  public get<T>(key: string): T {
    const cookieValue = Cookies.get(key);

    return cookieValue as T;
  }

  public remove(key: string) {
    Cookies.remove(key);
  }
}

const cookiesService = new CookieService();
export default cookiesService;

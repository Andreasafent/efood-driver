import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

type HttpResponse<T = Record<string, any>> = {
  success: boolean;
  message?: string;
  data?: T;
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private http = inject(HttpClient);
  private endpoint = 'http://efood-api.test/driver';

  public me() {
    return this.http.get<HttpResponse<{user: any}>>(`${this.endpoint}/auth/me`);
  }

  public login(email: string, password: string) {
    return this.http.post<HttpResponse<{token:string, user: any}>>(`${this.endpoint}/auth/login`, { email, password });
  }
}

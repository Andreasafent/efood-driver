import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private endpoint = 'http://efood-api.test/driver';

  public login(email: string, password: string){
    return this.http.post(`${this.endpoint}/auth/login`, { email, password });
  }


}

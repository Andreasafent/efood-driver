import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

type HttpResponse<T = Record<string, any>> = {
  success: boolean;
  message?: string;
  data?: T;
};

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
}

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private endpoint = 'http://efood-api.test/driver';

    public user: User | null= null;

    public me() {
        return this.http.get<HttpResponse<{user: User}>>(`${this.endpoint}/auth/me`)
        .pipe(
            tap((response)=>{
                if(response.success && response.data?.user){
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    this.user = response.data.user;
                }else{
                    this.user = null;
                }
            })
        )
    }

    public login(email: string, password: string) {
        return this.http.post<HttpResponse<{token:string, user: User}>>(`${this.endpoint}/auth/login`, { email, password });
    }

    public logout(){
        this.http
            .post<HttpResponse>(`${this.endpoint}/auth/logout`, {})
            .subscribe();
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.user = null;
        this.router.navigate(['/auth/login']);
    }
}

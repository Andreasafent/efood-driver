import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import environment from '../../environments/environment';
import { HttpResponse } from '../types/general';



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

    public user: User | null= null;

    public me() {
        return this.http.get<HttpResponse<{user: User}>>(`${environment.endpoint}/auth/me`)
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
        return this.http.post<HttpResponse<{token:string, user: User}>>(`${environment.endpoint}/auth/login`, { email, password });
    }

    public logout(){
        this.http
            .post<HttpResponse>(`${environment.endpoint}/auth/logout`, {})
            .subscribe();
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.user = null;
        this.router.navigate(['/auth/login']);
    }
}

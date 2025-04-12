import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loading = false;
  public errorMessage = '';
  public form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  public login(){    
    const { email, password } = this.form.value;
    if(!email || !password){
      return;
    }
    
    this.loading = true;
    this.errorMessage = '';
    this.authService.login(email, password)
      .pipe(finalize(()=>this.loading = false))
      .subscribe(
        (response)=>{
          if(response.success && response.data){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            this.router.navigate(['/dashboard']);
          }
        },
        (response)=>{
          this.errorMessage = response.error?.message || 'An error occurred';
        }
    );
  }
}

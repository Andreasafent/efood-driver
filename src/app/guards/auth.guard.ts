import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService
  .me()
  .pipe(
    map((response)=>{
      if(response.success && response.data?.user){
        return true;
      }
      router.navigate(['/auth/login']);
      return false;
    }),

    catchError(()=>{
      router.navigate(['/auth/login']);
      return [false];
    })
  );
  
  

};

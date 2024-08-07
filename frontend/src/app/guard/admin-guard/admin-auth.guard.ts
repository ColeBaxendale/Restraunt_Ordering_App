// src/app/admin-auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../auth-guard/auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  
  return authService.verifyAdminRole().pipe(
    map(authorized => {
      console.log(authorized);
      
      if (!authorized) {
        router.navigate(['/login/admin']);
        return false;
      }
      return true;
    })
  );
};

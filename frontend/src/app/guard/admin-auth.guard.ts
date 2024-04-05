// src/app/admin-auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from './auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  
  return authService.verifyAdminRole().pipe(
    map(authorized => {
      if (!authorized) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};

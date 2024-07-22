import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../auth-guard/auth.service';

export const ownerAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  
  return authService.verifyOwnerRole().pipe(
    map(authorized => {
      if (!authorized) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};

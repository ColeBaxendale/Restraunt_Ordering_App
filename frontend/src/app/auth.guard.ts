// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.verifyUser().pipe(map(response => {
      if (response.isAuthenticated) {
        if (route.data['roles'] && route.data['roles'].indexOf(response.role) === -1) {
          // Role not authorized
          this.router.navigate(['/login']); // Redirect to login or another appropriate page
          return false;
        }
        // Authorized so return true
        return true;
      }

      // Not authenticated, redirect to login page
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }));
  }
}

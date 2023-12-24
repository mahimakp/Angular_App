import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.getIsAuthenticated()) {
    console.log('User is not authenticated.');
    router.navigate(['/login']);
    return false;
  }
  return true;
};

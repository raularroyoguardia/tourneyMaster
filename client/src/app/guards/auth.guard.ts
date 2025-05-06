import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/auth/token.service';

export const isUserAutenticatedGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(TokenService).isAuthenticated();

  if(isAuthenticated)
    return true;

  inject(Router).navigateByUrl('/login');

  return false;
}; 

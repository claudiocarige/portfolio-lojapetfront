import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = () => {
  const authenService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenService.isAuthenticated()) {
    return true;
  } else {
    return router.createUrlTree(['login']);
  }
};

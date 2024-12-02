import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { map, catchError, of } from 'rxjs';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  return sessionService.retrieveSession().pipe(
    map(item => {
      if (item?.user) {
        return true;
      } else {
        sessionService.deleteLocalData()
        router.navigate(['/auth/signIn']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/auth/signIn']);
      return of(false);
    })
  );
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { map, catchError, of } from 'rxjs';
import { SessionService } from '../services/session.service';
import { TeamService } from '../services/team.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);
  const _teamService = inject(TeamService);
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
      _teamService.deleteChosenTeam(),
      localStorage.removeItem('lane4ChosenTeam')
      router.navigate(['/auth/signIn']);
      return of(false);
    })
  );
};

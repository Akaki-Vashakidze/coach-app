import { Routes } from '@angular/router';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { SignInConfirmComponent } from './features/auth/sign-in-confirm/sign-in-confirm.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { RecoveryUserIdComponent } from './features/auth/recovery-user-id/recovery-user-id.component';
import { RecoveryContactComponent } from './features/auth/recovery-contact/recovery-contact.component';
import { NewPassRecoveryComponent } from './features/auth/new-pass-recovery/new-pass-recovery.component';

export const routes: Routes = [
  {
    path: '',
    //   canActivate: [userGuard],
    //   runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        redirectTo: 'coach',
        pathMatch: 'full',
      },
      {
        path: 'coach',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/coach/coach.routes').then(
            ({ coachRoutes }) => coachRoutes
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes').then(
            ({ authRoutes }) => authRoutes
          ),
      },
    ]
  },
];

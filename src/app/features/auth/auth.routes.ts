
import { Route } from '@angular/router';
import { NewPassRecoveryComponent } from './new-pass-recovery/new-pass-recovery.component';
import { RecoveryContactComponent } from './recovery-contact/recovery-contact.component';
import { RecoveryUserIdComponent } from './recovery-user-id/recovery-user-id.component';
import { SignInConfirmComponent } from './sign-in-confirm/sign-in-confirm.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthComponent } from './auth.component';

export const authRoutes: Route[] = [
    {
        component: AuthComponent,
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'signIn',
                pathMatch: 'full',
            },
            {
                path: 'signIn',
                component: SignInComponent
            },
            {
                path: 'confirmCode',
                component: SignInConfirmComponent
            },
            {
                path: 'recoveryId',
                component: RecoveryUserIdComponent
            },
            {
                path: 'sendCode',
                component: RecoveryContactComponent
            },
            {
                path: 'newPass',
                component: NewPassRecoveryComponent
            },
        ]
    }
];


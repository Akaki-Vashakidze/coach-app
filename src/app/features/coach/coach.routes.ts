
import { Route } from '@angular/router';
import { DashboardComponent } from '../../components/shared/dashboard/dashboard.component';
import { CoachComponent } from './coach.component';
import { TeamDetailsComponent } from '../../components/shared/team-details/team-details.component';
import { CompetitionRegistrationComponent } from '../../components/shared/competition-registration/competition-registration.component';
import { CompDetailsComponent } from '../../components/shared/comp-details/comp-details.component';

export const coachRoutes: Route[] = [
    {
        component: CoachComponent,
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadChildren: () =>
                  import('../../components/shared/dashboard/dashboard.routes').then(
                    ({ dashRoutes }) => dashRoutes
                  ),
            },
            {
                path:'teamDetails',
                component:TeamDetailsComponent
            },

            {
                path:'competition',
                children:[
                    {
                        path:'registration/:id',
                        component:CompetitionRegistrationComponent
                    },
                    {
                        path:'details/:id',
                        component:CompDetailsComponent
                    },
                ]
            }
        ]
    }
];


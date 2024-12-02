
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CompetitionsComponent } from '../../competitions/competitions.component';
import { TeamsComponent } from '../../teams/teams.component';
import { AthletesComponent } from '../athletes/athletes.component';

export const dashRoutes: Route[] = [
    {
        component: DashboardComponent,
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'competitions',
                pathMatch: 'full',
            },
            {
                path: 'teams',
                component: TeamsComponent
            },
            {
                path: 'athletes',
                component: AthletesComponent
            },
            {
                path: 'competitions',
                component: CompetitionsComponent
            },
        ]
    }
];
import { Component, signal } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { Athlete, Coach, TeamDetails } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatTabsModule,MatExpansionModule,LoaderSpinnerComponent],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss'
})
export class TeamDetailsComponent {
  teamDetails = signal<TeamDetails | null>(null)
  coaches = signal<Coach[] | null>(null)
  Athletes = signal<Athlete[] | null>(null)

  constructor(private teamService:TeamService){
    teamService.getTeamDetails().subscribe((item : any) => {
      this.teamDetails.set(item)
      let coaches : any[] = [], athletes : any[] = []
      this.teamDetails()?.members.map(member => {
        member.memberType == 'coach' ? coaches.push(member.coach) : athletes.push(member.athlete)
      })
      this.coaches.set(coaches)
      this.Athletes.set(athletes)
    })
  }

  onTabChange(item:any){
    
  }

}

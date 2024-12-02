import { Component, signal } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Athlete, TeamMembers } from '../../../interfaces/interfaces';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-athletes',
  standalone: true,
  imports: [CommonModule,MatExpansionModule, MatIconModule, LoaderSpinnerComponent],
  templateUrl: './athletes.component.html',
  styleUrl: './athletes.component.scss'
})
export class AthletesComponent {
  athletes = signal<TeamMembers[] | null>(null)
  constructor(private teamService:TeamService){
    teamService.getTeamAthletes().subscribe(item => {
      if(item){
        this.athletes.set(item)
      } else {
        this.athletes.set([])
      }
    })
  }
}

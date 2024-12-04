import { Component, signal } from '@angular/core';
import { CompetitionsService } from '../../services/competitions.service';
import { TeamService } from '../../services/team.service';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from '../shared/loader-spinner/loader-spinner.component';
import { Competition } from '../../interfaces/interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LabelComponent } from '../shared/label/label.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [CommonModule,TranslateModule,LoaderSpinnerComponent, RouterModule, LabelComponent ,MatCardModule, MatButtonModule, MatTooltipModule],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.scss'
})
export class CompetitionsComponent {
  competitions = signal<Competition[] | null>(null);
  constructor(private competitionService:CompetitionsService,private teamService:TeamService, private sessionService:SessionService){
    let chosenTeam = teamService.getChosenTeam()
    if(chosenTeam) {
      let teamId = chosenTeam._id
      competitionService.getTeamCompetitions(teamId,sessionService.userId).subscribe(item => {
          this.competitions.set(item)
      })
    } else {
      this.competitions.set(null)
    }
  }

  canRegistrate(regEndDate: Date, hasActiveStatement:boolean | undefined): boolean {
    if(!hasActiveStatement) return false;
    const today = new Date();
    const endDate = new Date(regEndDate);
    
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
    if (todayDateOnly.getTime() === endDateOnly.getTime()) {
      return true; 
    }
  
    if (todayDateOnly.getTime() > endDateOnly.getTime()) {
      return false;
    }
  
    return true;
  }

  matToolTipSet(regEndDate: Date, hasActiveStatement:boolean | undefined){
    if(!hasActiveStatement) return 'Please pay for the competition';
   if(this.canRegistrate(regEndDate,hasActiveStatement))  {
    return ''
   } else {
    return 'Competition registration deadline time is done'
   }
  }
}

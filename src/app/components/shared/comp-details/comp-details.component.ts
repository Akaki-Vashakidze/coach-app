import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompetitionsService } from '../../../services/competitions.service';
import { EventDetails } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { LabelComponent } from '../label/label.component';
import { TeamService } from '../../../services/team.service';
import { SessionService } from '../../../services/session.service';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RegisteredAthletesComponent } from "../registered-athletes/registered-athletes.component";

@Component({
  selector: 'app-comp-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, RegisteredAthletesComponent,TranslateModule, RouterModule, MatIconModule, LoaderSpinnerComponent, LabelComponent, RegisteredAthletesComponent],
  templateUrl: './comp-details.component.html',
  styleUrl: './comp-details.component.scss'
})
export class CompDetailsComponent {
  AllRegisterAthletes = signal<any>(null)
  event = signal<EventDetails | null>(null);
  coachId!:string;
  teamId!:string;
  eventId!:string;
  constructor(
    private competitionService: CompetitionsService,
    private teamService:TeamService,
    private sessionService:SessionService,
    private route: ActivatedRoute,
  ) {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    this.coachId = this.sessionService.userId;
     this.teamId = this.teamService.chosenTeam._id;
    competitionService.getEventDetailsForCoach(this.eventId,sessionService.userId,teamService.getChosenTeam()._id).subscribe((event) => {
      this.event.set(event);
    });
    this.getAllRegisteredAthletes()
  }

  getFormattedDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');   // Add leading zero if day < 10
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1)
    const year = today.getFullYear();
    
    return `${day}.${month}.${year}`;
  }

  getAllRegisteredAthletes(){
    this.competitionService.getAllRegisteredAthletes(this.coachId,this.teamId,this.eventId,null).subscribe(item => {
      this.AllRegisterAthletes.set(item)
      console.log(this.AllRegisterAthletes())
    })
  }


}

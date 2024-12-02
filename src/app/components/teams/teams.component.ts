import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  constructor(private sharedService:TeamService,private sessionService:SessionService){
    let data = sessionService.retrieveSession();

  }
}

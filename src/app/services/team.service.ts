import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Athlete, Team, TeamAthleteQualifications, TeamDetails, TeamMembers, User } from '../interfaces/interfaces';
import { BehaviorSubject, of, tap } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  sessionService = inject(SessionService)
  chosenTeam!: any;
  teamIsSet = new BehaviorSubject('');
  constructor(private _http: HttpClient) {
    let chosen = localStorage.getItem('lane4ChosenTeam')
    if(chosen) {
      chosen ? this.chosenTeam = JSON.parse(chosen) : '';
    }
  }

  getCoachTeams(id: string) {
    return this._http.get<Team[]>(`/consoleApi/coach/${id}/teams`).pipe(
      tap(item => {
        if (!this.chosenTeam && item.length > 0) {
          localStorage.setItem('lane4ChosenTeam',JSON.stringify(item[0]))
          this.chosenTeam = item[0]
          this.teamIsSet.next(this.chosenTeam)
        }
      })
    )
  }

  setChosenTeam(team: Team) {
    if(team){
      localStorage.setItem('lane4ChosenTeam',JSON.stringify(team))
      this.chosenTeam = team;
    }
  }

  getChosenTeam() {
    return this.chosenTeam;
  }

  deleteChosenTeam(){
    this.chosenTeam = '';
  }

  getTeamDetails() {
    let teamId = this.getChosenTeam()?._id;
    let userId = this.sessionService.userId
    return this._http.get<TeamDetails>(`/consoleApi/coach/${userId}/teams/${teamId}`)
  }

  getCoachTeamAthleteQualifications(raceId:string) {
    let teamId = this.getChosenTeam()?._id;
    let userId = this.sessionService.userId
    return this._http.get<TeamAthleteQualifications[]>(`/consoleApi/coach/${userId}/teams/${teamId}/athletes/qualifications/${raceId}`)
  }

  getTeamAthletes() {
    let teamId = this.getChosenTeam()?._id;
    let userId = this.sessionService.userId
    if(teamId && userId){
      return this._http.get<TeamMembers[]>(`/consoleApi/coach/${userId}/teams/${teamId}/athletes`)
    } else {
      return of([]);
    }
  }
}

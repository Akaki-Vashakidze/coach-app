import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competition, EventDetails, iTime } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private _http: HttpClient) { }
  
  getTeamCompetitions(teamId:string, coachId:string){
    return this._http.get<Competition[]>(`/consoleApi/coach/${coachId}/teams/${teamId}/events`);
  }

  getPlannedEvents(){
    return this._http.get<Competition[]>(`/consoleApi/event/planned`);
  }

  getEventDetailsForCoach(eventId:string,coachId:string, teamId:string){
    return this._http.get<EventDetails>(`/consoleApi/coach/${coachId}/teams/${teamId}/events/${eventId}/details`)
  }

  addEventPartiipant(coachId:string,teamId:string,eventId:string, participantId:string,raceId:string,time:iTime | null){
    return this._http.post<any>(`/consoleApi/coach/${coachId}/teams/${teamId}/events/${eventId}/participants/${participantId}`,{data:{raceId,time}})
  }

  getRegisteredAthletes(coachId:string,teamId:string,eventId:string,raceId:string | null){
    return this._http.get<any>(`/consoleApi/coach/${coachId}/teams/${teamId}/events/${eventId}/participants${raceId ? '?raceId=' + raceId :''}`)
  }

  getAllRegisteredAthletes(coachId:string,teamId:string,eventId:string,raceId:string | null){
    return this._http.get<any>(`/consoleApi/coach/${coachId}/teams/${teamId}/events/${eventId}/allParticipants${raceId ? '?raceId=' + raceId :''}`)
  }

  deleteEventPartiipant(coachId:string,teamId:string,eventId:string, participantId:string,raceId:string){
    return this._http.post<any>(`/consoleApi/coach/${coachId}/teams/${teamId}/events/${eventId}/participants/${participantId}/delete`,{data:{raceId}}, { observe: 'response' })

  }
}

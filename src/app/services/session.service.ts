import { Injectable } from '@angular/core';
import { GenericResponce, SessionData } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private _http:HttpClient) { }
  coachSessionData!:SessionData;
  userId!:string;
  retrieveSession() {
    return this._http.get<GenericResponce<SessionData>>("/consoleApi/session").pipe(
      tap(item=>{
        this.coachSessionData = item.result.data
        this.userId = item.result.data.user.userId
      }),
      map(item => {
        return item.result.data
      })
    )
  }

  getSessionDataInfo(){
    return this.coachSessionData;
  }

  deleteLocalData(){
    localStorage.removeItem('access-token-l4-coach')
  }
}

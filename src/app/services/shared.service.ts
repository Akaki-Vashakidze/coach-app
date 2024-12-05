import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  language!:string;
  constructor(private _http: HttpClient) { }

  getAthleteBestResult(raceId:string,athleteId:string){
    return this._http.get<any>(`/consoleApi/????????`);
  }

  setLanguage(lang:string){
    this.language = lang;
  }

}

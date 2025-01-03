import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { GenericResponce, LoginInfo, PidOrMail, RecPassStart, SessionData, SubmitTwoFa, SuccessfulPassChangeDataRes, userInfoForPassChange } from '../interfaces/interfaces';
import { SessionService } from './session.service';
import { TeamService } from './team.service';

interface AuthResult { data: SessionData | any }

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  session: SessionData | undefined;
  sessionService = inject(SessionService)
  coachUuid!:string;
  twoFaUuid!:string;
  submitMobile!:string;
  recoveryContactInfo!:{email:string, phone:string}
  userRecoveryUuid!:string;
  constructor(private _http: HttpClient, private _teamService:TeamService) { }

  login(loginInfo: LoginInfo) {
    return this._http.post<{ result: AuthResult }>("/consoleApi/session/admin", { data: loginInfo }).pipe(map((res: { result: AuthResult }) => {
      if (res?.result?.data?.user) {
        this.session = res?.result?.data as SessionData;
      } else {
        this.twoFaUuid = res.result.data.uuid;
        this.submitMobile = res.result.data.phone;
      }
      return res?.result;
    }))
  }

  submitLogin(token:string) {
    return this._http.post<{ result: AuthResult }>("/consoleApi/session/submit", { data: {token, uuid:this.twoFaUuid} }).pipe(map((res: { result: AuthResult }) => {
      if (res?.result?.data?.user) {
        this.session = res?.result?.data as SessionData;
      }
      return res?.result;
    }))
  }

  logout() {
    return this._http.delete<GenericResponce<boolean>>("/consoleApi/session", {}).pipe(tap((item) => {
      this._teamService.deleteChosenTeam(),
      localStorage.removeItem('lane4ChosenTeam')
      item.result.data ? this.sessionService.deleteLocalData() : '';
     }))
   }

   setUserRecoveryUuid(item:string){
    this.userRecoveryUuid = item;
   }

  recoverPasswordinit(info: PidOrMail) {
    return this._http.post<any>('/consoleApi/user/recovery/init', { data: info })
  }

  setCoachUuid(uuid:string){
    this.coachUuid = uuid;
  }

  setRecoveryContactInfo(item:{email:string, phone:string}){
   this.recoveryContactInfo = item;
  }

  recoverPasswordStart(data:any){
    return this._http.post<{uuid:string,resendDeley:number}>('/consoleApi/user/recovery/start',{data})
  }

  recoverPasswordSubmit(info:SubmitTwoFa){
    return this._http.post<GenericResponce<userInfoForPassChange>>('/consoleApi/user/recovery/submit',{data:info})
  }

  recoverPasswordMandatoryChange(password:string) {
    return this._http.post<SuccessfulPassChangeDataRes>('/consoleApi/user/password/mandatory/change',{data:{password}})
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarTranslateService {

  constructor() { }

  translateError(error: string, lang: string): string {
    switch (lang) {
      case 'en': // English
        switch (error) {
          case 'ERR_CONNECTION':
            return 'Connection error occurred';
          case 'ERR_TIMEOUT':
            return 'The operation timed out';
          case 'PARTICIPANT_ALREADY_EXISTS':
            return 'Athlete alreade registered in this race';
          case 'athlete_registered':
            return 'Athlete registered successfully';
          case 'success':
            return 'success';
          case 'ok':
            return 'Ok';
          case 'athlete_deleted':
            return 'Athlete Deleted from race';
          case 'PARTICIPANT_MAX_LIMIT_EXCEEDED':
            return 'Athlete registration limit exceeded';
          case 'error':
            return 'Error occured';



          default:
            return 'Language not supported';
        }
      case 'ka': // Georgian
        switch (error) {
          case 'ERR_CONNECTION':
            return 'კავშირი შეფერხდა';
          case 'ERR_TIMEOUT':
            return 'ოპერაცია დროში ამოიწურა';
          case 'PARTICIPANT_ALREADY_EXISTS':
            return 'სპორტსმენი უკვე დამატებულია ამ დისციპლინაზე';
          case 'athlete_registered':
            return 'სპორცმენი წარმატებით დარეგისტრირდა';
          case 'success':
            return 'წარმატებული მცდელობა';
          case 'ok':
            return 'ოკ';
          case 'PARTICIPANT_MAX_LIMIT_EXCEEDED':
            return 'სპორცმენების დარეგისტრირების ლიმიტი ამოიწურა';
          case 'error':
            return 'დაფიქსირდა შეცდომა';
          case 'athlete_deleted':
            return 'სპორცმენი გაცურვიდან წაიშალა';





          default:
            return 'დაფიქსირდა შეცდომა';
        }
      default:
        return 'Error occured';
    }
  }
}
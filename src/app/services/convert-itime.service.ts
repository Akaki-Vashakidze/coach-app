import { Injectable } from '@angular/core';
import { iTime } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConvertItimeService {

  constructor() { }

  convertItimeToStringTime(time:iTime){

  }

  convertStringTimeToItime(time:string){
    console.log(time)
    if(time){
      let minutes = time.split(':')[0]
      let seconds = time.split(':')[1].split('.')[0]
      let milliseconds = time.split(':')[1].split('.')[1]
  
      return {
        hours:'',
        milliseconds,
        minutes,
        seconds,
      }
    } 
    return null

  }
}

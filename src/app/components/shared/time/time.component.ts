import { Component, Input, OnInit } from '@angular/core';
import { Time } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent implements OnInit {
  @Input() timeObj !: Time | any;

  ngOnInit(): void {
    this.timeObj = this.convertToNumbers(this.timeObj)
  }
  convertToNumbers(obj: Time) {
    return {
      hours: Number(obj?.hours),
      minutes: Number(obj?.minutes),
      seconds: Number(obj?.seconds),
      milliseconds: Number(obj?.milliseconds),
      totalMilliseconds: Number(obj?.totalMilliseconds)
    };
  }
}

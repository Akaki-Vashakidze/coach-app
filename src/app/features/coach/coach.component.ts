import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.scss'
})
export class CoachComponent {
  menuItems = [
    {
      title: 'team_details',
      action: 'team_details'
    },
    {
      title: 'log_out',
      action: 'log_out'
    }
  ]
}

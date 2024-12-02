import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  menuItems = [
    {
      title: 'need help?',
      action: 'information'
    },
  ]
}

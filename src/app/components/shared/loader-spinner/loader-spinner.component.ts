import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.scss'
})
export class LoaderSpinnerComponent {
  @Input() color: string = '#fff';
  @Input() size: string = '100px';
  @Input() height: string = '300px';
}

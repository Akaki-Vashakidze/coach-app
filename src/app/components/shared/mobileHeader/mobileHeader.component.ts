import { Component, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatButtonModule, NgIf, MatIconModule],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="over" class="sidenav" (closedStart)="menuOpen = false">
        <div class="sidenav-content">
          <h3>{{ header }}</h3>
          <!-- Additional sidenav content can go here -->
        </div>
      </mat-sidenav>

      <mat-toolbar color="primary" class="toolbar">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="toolbar-title">{{ header }}</span>
      </mat-toolbar>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidenav-container {
        height: 100vh;
      }

      .sidenav {
        width: 250px;
      }

      .toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .toolbar-title {
        margin-left: 16px;
      }
    `,
  ],
})
export class MobileHeaderComponent {
  menuOpen!:boolean;
  @Input() header!: string;
}

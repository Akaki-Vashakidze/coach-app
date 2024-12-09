import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Subscription } from 'rxjs';
import { I18nService } from './services/i18n.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule,RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit , OnDestroy{
  private subscription!: Subscription;
  public font:string = 'GeoFont';
  constructor(private i18nService: I18nService) {
    i18nService.setInitialLanguage();
  }

  ngOnInit(): void {
    this.subscription = this.i18nService.changedLang.subscribe(lang => {
      lang == 'en' ? this.font = "EngFont" : this.font = "GeoFont";
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

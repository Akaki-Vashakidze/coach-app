import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from './shared.service';

const STORAGE_KEY = 'language';

@Injectable()
export class I18nService {
  private readonly availableLanguages = ['ka', 'en'];
  constructor(private translateService: TranslateService, private _sharedService:SharedService) {}
  public changedLang = new BehaviorSubject<string | null>('en');
  
  setInitialLanguage(): void {
    const browserLang = this.translateService.getBrowserLang() || 'en';
    let currentLanguage = localStorage.getItem(STORAGE_KEY);
    this.changedLang.next(currentLanguage);
    
    if (!currentLanguage) {
      const defaultLang = this.availableLanguages.includes(browserLang);
      const preferredLang = defaultLang ? browserLang : 'en';
      currentLanguage = preferredLang;
    }
    this._sharedService.setLanguage(currentLanguage)
    this.translateService.setDefaultLang(currentLanguage);
    this.translateService.use(currentLanguage);
  }

  changeCurrentLanguage(language: string) {
    this.translateService.use(language);
    localStorage.setItem(STORAGE_KEY, language);
    this.changedLang.next(language);
  }
}

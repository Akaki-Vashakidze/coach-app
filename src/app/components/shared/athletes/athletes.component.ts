import { Component, signal } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Athlete, TeamMembers } from '../../../interfaces/interfaces';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../../services/i18n.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-athletes',
  standalone: true,
  imports: [CommonModule,MatExpansionModule, TranslateModule, MatIconModule, LoaderSpinnerComponent],
  templateUrl: './athletes.component.html',
  styleUrl: './athletes.component.scss'
})
export class AthletesComponent {
  athletes = signal<TeamMembers[] | null>(null)
  lang = signal<string>('en');
  constructor(private teamService:TeamService, private _i18nService:I18nService){
    this._i18nService.changedLang
      .pipe(takeUntilDestroyed())
      .subscribe(lang => {
        this.lang.set(lang || 'en')
      }
    );
    teamService.getTeamAthletes().subscribe(item => {
      if(item){
        this.athletes.set(item)
      } else {
        this.athletes.set([])
      }
    })
  }
}

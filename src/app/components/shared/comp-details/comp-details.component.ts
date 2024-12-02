import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../../../services/competitions.service';
import { EventDetails } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-comp-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, LoaderSpinnerComponent, LabelComponent],
  templateUrl: './comp-details.component.html',
  styleUrl: './comp-details.component.scss'
})
export class CompDetailsComponent {
  event = signal<EventDetails | null>(null);
  constructor(
    private competitionService: CompetitionsService,
    private route: ActivatedRoute,
  ) {
    const eventId = this.route.snapshot.paramMap.get('id') || '';

    competitionService.getEventDetailsForCoach(eventId,'','').subscribe((event) => {
      this.event.set(event);
    });
  }
}

import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { CompetitionsService } from '../../../services/competitions.service';
import { Athlete, EventDetails, Race, TeamAthleteQualifications } from '../../../interfaces/interfaces';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, filter, map, Observable, startWith, switchMap, throwError } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { TeamService } from '../../../services/team.service';
import { MatButtonModule } from '@angular/material/button';
import { SharedService } from '../../../services/shared.service';
import { SessionService } from '../../../services/session.service';
import { ConvertItimeService } from '../../../services/convert-itime.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { LabelComponent } from '../label/label.component';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-registered-athletes',
  standalone: true,
  imports: [
        CommonModule,
        MatAutocompleteModule,
        LoaderSpinnerComponent,
        ReactiveFormsModule,
        MatTabsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        LabelComponent,
        TranslateModule,
        RouterModule
  ],
  templateUrl: './registered-athletes.component.html',
  styleUrl: './registered-athletes.component.scss'
})
export class RegisteredAthletesComponent implements OnInit, OnChanges{
  isLoadingAllRegAthletes!:boolean;
  eventId!:string;
  coachId!:string;
  teamId!:string;
  AllRegisterAthletes!:any;
  @Input() AllRegisterAthletesArr!:any;
  constructor(
  ) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.AllRegisterAthletes = this.AllRegisterAthletesArr;
  }
  ngOnInit(): void {

  }
}

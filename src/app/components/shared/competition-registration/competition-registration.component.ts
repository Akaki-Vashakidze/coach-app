import { Component, OnInit, signal } from '@angular/core';
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
import { RegisteredAthletesComponent } from '../registered-athletes/registered-athletes.component';
import { TimeComponent } from "../time/time.component";

@Component({
  selector: 'app-competition-registration',
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
    RouterModule,
    RegisteredAthletesComponent,
    TimeComponent
],
  templateUrl: './competition-registration.component.html',
  styleUrls: ['./competition-registration.component.scss'],
})
export class CompetitionRegistrationComponent implements OnInit {
  event = signal<EventDetails | null>(null);
  athleteResControl = new FormControl('');
  chosenRace: Race | null = null;
  filteredOptions = signal<TeamAthleteQualifications[] | null | undefined>(null);
  athletes = signal<TeamAthleteQualifications[] | null>(null);
  blockADD:boolean = true;
  AthleteResultValue:string | null = null;
  eventId!:string;
  statement!:number;
  isLoadingAddAthlet!:boolean;
  registerAthleteForm!:FormGroup;
  raceRegisterAthletes = signal<any>(null)
  AllRegisterAthletes = signal<any>(null)
  chosenAthleteToRegister!:TeamAthleteQualifications;
  coachId!:string;
  teamId!:string;
  isLoading!:boolean;
  isLoadingAllRegAthletes!:boolean;

  constructor(
    private _dialog: MatDialog,
    private competitionService: CompetitionsService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private sharedService:SharedService,
    private sessionService:SessionService,
    private convertItimeService:ConvertItimeService,
    private fb: FormBuilder,
    private snackBarService:SnackbarService
  ) {
     this.eventId = this.route.snapshot.paramMap.get('id') || '';
     this.registerAthleteForm = this.fb.group({
      athleteInfo: ['', [Validators.required]],
      athleteResult: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8),Validators.pattern(/^\d{2}:\d{2}\.\d{2}$/),]],
    });

    this.coachId = this.sessionService.userId;
     this.teamId = this.teamService.chosenTeam._id;
    this.registerAthleteForm.get('athleteResult')?.disable();
    competitionService.getEventDetailsForCoach(this.eventId,this.coachId,this.teamId).subscribe((event) => {
      this.event.set(event);
      if(event?.statement?.participantMaxCount) {
        this.statement = event?.statement?.participantMaxCount;
      } else {
        this.snackBarService.openSnackBar('statement_not_fount', 'ok');
      }
    
    });
  }

  ngOnInit(): void {
    
    this.registerAthleteForm.get('athleteInfo')?.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : '')),
      map((value) => this._filter(value))
    ).subscribe((filtered) => {
      this.filteredOptions.set(filtered);
    });
    let prevValue: string = '';

    this.registerAthleteForm.get('athleteResult')?.valueChanges.subscribe((item: string) => {
      if (!item) return;
    
      if (item.length < prevValue.length) {
        prevValue = item;
        return;
      }
    
      let formattedValue = item.replace(/[^0-9:.]/g, '');
    
      if (formattedValue.length >= 2 && formattedValue[2] !== ':') {
        formattedValue = `${formattedValue.slice(0, 2)}:${formattedValue.slice(2)}`;
      }
    
      if (formattedValue.length >= 5 && formattedValue[5] !== '.') {
        formattedValue = `${formattedValue.slice(0, 5)}.${formattedValue.slice(5)}`;
      }
    
      if (formattedValue.length > 8) {
        formattedValue = formattedValue.slice(0, 8);
      }
    
      if (formattedValue !== item) {
        this.registerAthleteForm.get('athleteResult')?.setValue(formattedValue, {
          emitEvent: false,
        });
      }
    
      prevValue = formattedValue;
    });
    
    
    

    this.getAllRegisteredAthletes()
  }
  

  chooseRace(race: Race) {
    this.chosenRace = race;
    this.getRegisteredAthletes()
    this.clearForm()
    this.filteredOptions.set(null)
    this.getCoachTeamAthleteQualifications(race._id)
  }

  clearForm() {
    this.registerAthleteForm.reset(); 
    this.blockADD = true; 
  }

  onTabChange(action: any) {
    this.chosenRace = null;
  }

  countRegisteredAthletes() {
    return this.AllRegisterAthletes()?.filter((item:any) => item.races.length != 0).length;
  }

  addAthlete() {
    const registrationEndDate = new Date(this.event()?.event.registrationEndDate);
    const currentDate = new Date();
    
    registrationEndDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    if (registrationEndDate < currentDate) {
      this.snackBarService.openSnackBar('registration_deadline_passed', 'ok');
      return;
    }
    let time;
    if (this.chosenAthleteToRegister.result) {
      time = this.chosenAthleteToRegister.result.result.time;
    } else {
      // for no time
      // time = this.convertItimeService.convertStringTimeToItime(
      //   this.registerAthleteForm.value.athleteResult || ''
      // );
      time = {
          "hours": "77",
          "milliseconds": "77",
          "minutes": "77",
          "seconds": "77"
      }
    }
  
    this.isLoadingAddAthlet = true;
  
    this.competitionService
      .addEventPartiipant(
        this.coachId,
        this.teamId,
        this.eventId,
        this.chosenAthleteToRegister.member.athlete._id,
        this.chosenRace?._id || '',
        time || null
      )
      .pipe(
        catchError((err) => {
          this.isLoadingAddAthlet = false;
          if (err.status === 400) {
          } else {
            alert('Something went wrong. Please try again later.');
          }
          return throwError(() => err);
        })
      )
      .subscribe((item) => {
        if (item.athlete) {
          this.snackBarService.openSnackBar('athlete_registered','ok')
          this.isLoadingAddAthlet = false; 
          this.clearForm();
          this.getRegisteredAthletes();
          this.getAllRegisteredAthletes();
        }
      });
  }
  

  getRegisteredAthletes(){
    this.isLoading = true;
    this.competitionService.getRegisteredAthletes(this.coachId,this.teamId,this.eventId,this.chosenRace?._id || '').subscribe(item => {
      this.isLoading = false;
      this.raceRegisterAthletes.set(item)
    })
  }

  getAllRegisteredAthletes(){
    this.isLoadingAllRegAthletes = true;
    this.competitionService.getAllRegisteredAthletes(this.coachId,this.teamId,this.eventId,null).subscribe(item => {
      this.isLoadingAllRegAthletes = false;
      this.AllRegisterAthletes.set(item)
      console.log(this.AllRegisterAthletes())
    })
  }

getCoachTeamAthleteQualifications(raceId:string){
  this.teamService.getCoachTeamAthleteQualifications(raceId).subscribe(item => {
    this.athletes.set(item)
    this.filteredOptions.set(item);
  })
}

deleteRegisteredAthlete(athlete:any){
  const dialogData = new ConfirmDialogModel('do_you_want_delete', 'delete');

  const dialogRef = this._dialog.open(ConfirmDialogComponent, {
    maxWidth: '400px',
    data: dialogData,
    width: '100%',
  });

  dialogRef
    .afterClosed()
    .pipe(
      filter((isConfirm) => isConfirm),
      switchMap(() => this.competitionService.deleteEventPartiipant(this.coachId,this.teamId,this.eventId,athlete.athlete._id,this.chosenRace?._id || '' ))
    )
    .subscribe((item) => {
      if(item.status == 200){
        this.snackBarService.openSnackBar('athlete_deleted','ok')
        this.getRegisteredAthletes()
        this.getAllRegisteredAthletes()
      } 
    });

}
  onOptionSelected(event:any){
    this.chosenAthleteToRegister = event.option.value;
    this.blockADD = false;
    if(this.chosenAthleteToRegister.result){
      this.registerAthleteForm.get('athleteResult')?.disable();
      this.AthleteResultValue = this.chosenAthleteToRegister.result.result.time.minutes + ':' + this.chosenAthleteToRegister.result.result.time.seconds + '.' + this.chosenAthleteToRegister.result.result.time.milliseconds
    } else {
      this.AthleteResultValue = 'No Time';
      this.registerAthleteForm.get('athleteResult')?.disable();
    }
  }

  private _filter(value: string | null): TeamAthleteQualifications[] | null {
    const filterValue = (value || '').toLowerCase()
    const result = this.athletes()?.filter(
      (athlete) =>
        athlete?.member.athlete.lastName.toLowerCase().includes(filterValue) ||
        athlete?.member.athlete.lastName.toLowerCase().includes(filterValue)
    );
    return result?.length ? result : null;
  }
  

  displayFn(option: TeamAthleteQualifications): string {
    return option ? `${option?.member?.athlete?.lastName} ${option?.member?.athlete?.firstName}` : '';
  }

  getFormattedDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');   // Add leading zero if day < 10
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1)
    const year = today.getFullYear();
    
    return `${day}.${month}.${year}`;
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { CompetitionsService } from '../../../services/competitions.service';
import { Athlete, EventDetails, Race, TeamAthleteQualifications } from '../../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, map, Observable, startWith, switchMap } from 'rxjs';
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
  ) {
     this.eventId = this.route.snapshot.paramMap.get('id') || '';
     this.statement = JSON.parse(this.route.snapshot.paramMap.get('statement') || '');
     this.registerAthleteForm = this.fb.group({
      athleteInfo: ['', [Validators.required]],
      athleteResult: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
    });
    this.registerAthleteForm.get('athleteResult')?.disable();
    competitionService.getEventDetails(this.eventId).subscribe((event) => {
      this.event.set(event);
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

    let prevValue:any;
    this.registerAthleteForm.get('athleteResult')?.valueChanges.subscribe(item => {
      if (item && item.length === 2 && prevValue.split('')[2] != ':') {
        const updatedValue = `${item}:`;
        this.registerAthleteForm.get('athleteResult')?.setValue(updatedValue, {
          emitEvent: false,
        });
      } 
      if (item && item.length === 5 && prevValue.split('')[5] != '.') {
        const updatedValue = `${item}.`;
        this.registerAthleteForm.get('athleteResult')?.setValue(updatedValue, {
          emitEvent: false,
        });
      }
      prevValue = item;
    })
    
    this.coachId = this.sessionService.userId;
     this.teamId = this.teamService.chosenTeam._id;

    this.getAllRegisteredAthletes()
  }
  

  chooseRace(race: Race) {
    this.chosenRace = race;
    this.getRegisteredAthletes()
    this.clearForm()
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
    let time;
    if(this.chosenAthleteToRegister.result) {
      time = this.chosenAthleteToRegister.result.result.time;
    } else {
      time = this.convertItimeService.convertStringTimeToItime(this.registerAthleteForm.value.athleteResult || '')
    }
    
    this.competitionService.addEventPartiipant(this.coachId,this.teamId,this.eventId,this.chosenAthleteToRegister.member.athlete._id,this.chosenRace?._id || '',time || null).subscribe(item => {
      if(item.athlete) {
        this.getRegisteredAthletes()
        this.getAllRegisteredAthletes()
      }
    })
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
      this.AthleteResultValue = null;
      this.registerAthleteForm.get('athleteResult')?.enable();
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
}

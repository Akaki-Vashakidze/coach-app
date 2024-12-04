import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { UserType } from '../../../enums/enums';
import { SignInService } from '../../../services/sign-in.service';
import { LoaderSpinnerComponent } from '../../../components/shared/loader-spinner/loader-spinner.component';
import { catchError, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recovery-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule,ReactiveFormsModule,LoaderSpinnerComponent, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,RouterModule],
  templateUrl: './recovery-contact.component.html',
  styleUrl: './recovery-contact.component.scss'
})
export class RecoveryContactComponent {
  mobileForm: FormGroup;
  loader!:boolean;
  coachUuid!:string;
  pidOrEmail!:string;
  userContactInfo!:{email:string, phone:string} | null;
  constructor(private fb: FormBuilder, private _router:Router,private _signInService:SignInService) {
    this.userContactInfo = _signInService.recoveryContactInfo;
    this.mobileForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.minLength(3)]],
    });
     this.pidOrEmail = this._signInService.userRecoveryUuid;
     this.pidOrEmail ? '':_router.navigate(['/auth/signIn'])
  }


  hasError(controlName: string, error: string): boolean {
    const control = this.mobileForm.get(controlName);
    return control?.hasError(error) && control?.touched || false;
  }

  sendCode() {
    const target = this.mobileForm.value.mobileNumber;
    const data = {
      targetType: "phone",
      userType: "coach",
      target,
      pidOrEmail: this.pidOrEmail,
    };
    this.loader = true;
  
    this._signInService
      .recoverPasswordStart(data)
      .pipe(
        catchError((err) => {
          this.loader = false;
          if (err.status === 400) {
            console.error('Bad Request (400):', err);
          } else {
            console.error('An unexpected error occurred:', err);
          }
          return throwError(() => err);
        })
      )
      .subscribe((item) => {
        if (item.uuid) {
          this._signInService.setCoachUuid(item.uuid);
          this.loader = false;
          this._router.navigate(['/auth/confirmCode']);
        }
      });
  }
  
  
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio'; // Add this
import { RouterModule, Router } from '@angular/router';
import { SignInService } from '../../../services/sign-in.service';
import { LoaderSpinnerComponent } from '../../../components/shared/loader-spinner/loader-spinner.component';
import { catchError, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recovery-contact',
  standalone: true,
  imports: [
      CommonModule, 
      TranslateModule, 
      ReactiveFormsModule, 
      FormsModule, 
      LoaderSpinnerComponent, 
      MatCardModule, 
      MatInputModule, 
      MatFormFieldModule, 
      MatButtonModule, 
      RouterModule,
      MatRadioModule 
    ],
  templateUrl: './recovery-contact.component.html',
  styleUrl: './recovery-contact.component.scss'
})

// ... other imports
export class RecoveryContactComponent {
  mobileForm: FormGroup;
  loader: boolean = false;
  pidOrEmail!: string;
  userContactInfo!: { email: string, phone: string } | null;
  recoveryMethod: 'phone' | 'email' = 'phone';

  constructor(private fb: FormBuilder, private _router: Router, private _signInService: SignInService) {
    this.userContactInfo = _signInService.recoveryContactInfo;
    
    this.mobileForm = this.fb.group({
      // Phone control: active by default
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(9)]],
      // Email control: disabled by default
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]]
    });

    this.pidOrEmail = this._signInService.userRecoveryUuid;
    if (!this.pidOrEmail) this._router.navigate(['/auth/signIn']);
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.mobileForm.get(controlName);
    return !!(control?.hasError(error) && control?.touched);
  }

  setMethod(method: 'phone' | 'email') {
    this.recoveryMethod = method;
    const phoneCtrl = this.mobileForm.get('mobileNumber');
    const emailCtrl = this.mobileForm.get('email');

    if (method === 'email') {
      phoneCtrl?.disable();
      emailCtrl?.enable();
    } else {
      phoneCtrl?.enable();
      emailCtrl?.disable();
    }
  }

  sendCode() {
    if (this.mobileForm.invalid) {
      this.mobileForm.markAllAsTouched();
      return;
    }

    // We use getRawValue() because one of the fields is always disabled
    const formValues = this.mobileForm.getRawValue();
    
    const data = {
      targetType: this.recoveryMethod,
      userType: "coach",
      target: this.recoveryMethod === 'phone' ? formValues.mobileNumber : formValues.email,
      pidOrEmail: this.pidOrEmail,
    };

    this.loader = true;
    this._signInService.recoverPasswordStart(data)
      .pipe(catchError((err) => { 
        this.loader = false; 
        return throwError(() => err); 
      }))
      .subscribe((item) => {
        this.loader = false;
        if (item.uuid) {
          this._signInService.setCoachUuid(item.uuid);
          this._router.navigate(['/auth/confirmCode']);
        }
      });
  }
}
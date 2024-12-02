import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { UserType } from '../../../enums/enums';
import { SignInService } from '../../../services/sign-in.service';
import { RecoveryContactComponent } from "../recovery-contact/recovery-contact.component";
import { LoaderSpinnerComponent } from '../../../components/shared/loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-recovery-user-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,LoaderSpinnerComponent, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, RouterModule, RecoveryContactComponent],
  templateUrl: './recovery-user-id.component.html',
  styleUrl: './recovery-user-id.component.scss'
})
export class RecoveryUserIdComponent {
  recoverPassWithIdForm: FormGroup;
  loader!:boolean;
  constructor(private fb: FormBuilder, private _router: Router, private _signInService: SignInService) {
    this.recoverPassWithIdForm = this.fb.group({
      pidOrEmail: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  onSubmit(): void {
    if (this.recoverPassWithIdForm.valid) {
      this.loader = true;
      this._signInService.recoverPasswordinit({ ...this.recoverPassWithIdForm.value, userType: UserType.COACH }).subscribe(item => {
        this._signInService.setUserRecoveryUuid(this.recoverPassWithIdForm.value.pidOrEmail)
        this._signInService.setRecoveryContactInfo(item)
        this.loader = false;
        this._router.navigate(['/auth/sendCode'])
      })
    } else {
      console.error('Form is invalid');
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.recoverPassWithIdForm.get(controlName);
    return control?.hasError(error) && control?.touched || false;
  }

}

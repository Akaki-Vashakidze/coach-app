import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { SignInService } from '../../../services/sign-in.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { MatIconModule} from '@angular/material/icon'
import { LoaderSpinnerComponent } from '../../../components/shared/loader-spinner/loader-spinner.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-new-pass-recovery',
  standalone: true,
  imports: [CommonModule,MatIconModule,LoaderSpinnerComponent, ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,RouterModule],
  templateUrl: './new-pass-recovery.component.html',
  styleUrl: './new-pass-recovery.component.scss'
})
export class NewPassRecoveryComponent {
  password1Open:boolean = false;
  loader!:boolean;
  password2Open:boolean = false;
  newPassForm: FormGroup;
  constructor(private fb: FormBuilder, private _router:Router,private _signInService:SignInService, private snackbarService:SnackbarService) {
    this.newPassForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.newPassForm.get(controlName);
    return control?.hasError(error) && control?.touched || false;
  }

  changePass() {
    this.loader = true;
    if(this.newPassForm.value.password === this.newPassForm.value.password2) {
      this._signInService
      .recoverPasswordMandatoryChange(this.newPassForm.value.password)
      .pipe(
        catchError((err) => {
          this.loader = false; 
          if (err.status === 400) {
            console.error('Bad Request (400):', err);
            alert('Invalid password. Please follow the password requirements.');
          } else {
            console.error('An unexpected error occurred:', err);
            alert('Something went wrong. Please try again later.');
          }
          return throwError(() => err);
        })
      )
      .subscribe((item) => {
        if (item?.token) {
          localStorage.setItem('access-token-l4-coach', item.token);
          this.loader = false;
          this._router.navigate(['/coach/dashboard']);
        }
      });
    } else {
      this.snackbarService.openSnackBar('passwords does not match', 'ok')

    }
  }
  
}

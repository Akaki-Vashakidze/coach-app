import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignInService } from '../../../services/sign-in.service';
import { UserType } from '../../../enums/enums';
import { Router, RouterModule } from '@angular/router';
import { LoaderSpinnerComponent } from '../../../components/shared/loader-spinner/loader-spinner.component';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-two-fa',
  standalone: true,
  imports: [CommonModule,TranslateModule, ReactiveFormsModule, LoaderSpinnerComponent,MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,RouterModule],
  templateUrl: './two-fa.component.html',
  styleUrl: './two-fa.component.scss'
})
export class TwoFaComponent {

  loader!:boolean;
  submitForm!: FormGroup;
  constructor(private fb: FormBuilder, private _router:Router,private _signInService:SignInService) {
    this.submitForm = this.fb.group({
      token: ['', [Validators.required]],
    });
    _signInService.twoFaUuid ? '' : _router.navigate(['/auth/signIn'])
  }

  onSubmit(): void {
    if (this.submitForm.valid) {
      this.loader = true;
  
      this._signInService
        .submitLogin(this.submitForm.value.token)
        .pipe(
          finalize(() => {
            this.loader = false; 
          })
        )
        .subscribe(
          (item) => {
            console.log(item);
            if (item?.data?.user) {
              this._router.navigate(['/coach/dashboard']);
            }
          },
          (error) => {
            console.error('Login failed:', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}

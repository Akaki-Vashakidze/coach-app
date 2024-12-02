import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { SignInService } from '../../../services/sign-in.service';
import { LoaderSpinnerComponent } from '../../../components/shared/loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-sign-in-confirm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,LoaderSpinnerComponent, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,RouterModule],
  templateUrl: './sign-in-confirm.component.html',
  styleUrl: './sign-in-confirm.component.scss'
})
export class SignInConfirmComponent {
  tokenCodeForm: FormGroup;
  loader!:boolean;
  coachUuid!:string;
  constructor(private fb: FormBuilder, private _router:Router,private _signInService:SignInService) {
    this.tokenCodeForm = this.fb.group({
      token: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(6)]],
    });
     this.coachUuid = this._signInService.coachUuid;
     this.coachUuid ? '' : _router.navigate(['/auth/signIn'])
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.tokenCodeForm.get(controlName);
    return control?.hasError(error) && control?.touched || false;
  }

  confirmCode(){
    this.loader = true;
    this._signInService.recoverPasswordSubmit({...this.tokenCodeForm.value,uuid:this.coachUuid}).subscribe(item => {
      if(item.result.data){
        this.loader = false;
        this._router.navigate(['/auth/newPass'])
      }
    })
  }
}

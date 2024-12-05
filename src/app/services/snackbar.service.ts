import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from './shared.service';
import { SnackBarTranslateService } from './snackBartranslate.service';

@Injectable({
  providedIn: 'root',
  
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar, private _sharedService:SharedService, private _errTranslate:SnackBarTranslateService) {}
  
  openSnackBar(message1: string, action1: string, type = 'success') {
    console.log(this._sharedService.language)
   let message = this._errTranslate.translateError(message1,this._sharedService.language)
   let action = this._errTranslate.translateError(action1,this._sharedService.language)
    this._snackBar.open(
      message
      , action, {
      duration: 2000,
      horizontalPosition: 'right',
      panelClass: type,
    });
  }

  openSnackBar20(message: string, action: string) {
    this._snackBar.open(
      message
      // this.translateService.instant(message)
    , action, {
      duration: 20000,
    });
  }
}

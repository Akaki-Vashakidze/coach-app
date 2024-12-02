import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  // private readonly translateService = inject(TranslateService);

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, type = 'success') {
    this._snackBar.open(
      // this.translateService.instant(message)
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

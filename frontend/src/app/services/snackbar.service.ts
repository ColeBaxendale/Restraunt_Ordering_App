import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  showAlert(message: string, type: string, duration: number = 5000): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, type: type },
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }

  showAlertTwo(message: string, duration: number = 5000): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, type: 'Error' },
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }



  showConfirmation(message: string, type: string , confirmAction: () => void, cancelAction?: () => void, duration: number = 5000): void {
    const snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, confirmation: true, type: type },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });

    snackBarRef.onAction().subscribe(() => {
      confirmAction();
    });

    snackBarRef.afterDismissed().subscribe(() => {
      if (cancelAction) {
        cancelAction();
      }
    });
  }
}

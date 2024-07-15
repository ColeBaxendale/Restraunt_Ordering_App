import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationSnackbarComponent } from '../components/confirmation-snackbar/confirmation-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  showAlert(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  showConfirmation(message: string, confirmAction: () => void, cancelAction?: () => void, duration: number = 5000): void {
    const snackBarRef = this.snackBar.openFromComponent(ConfirmationSnackbarComponent, {
      data: { message: message },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
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
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-snackbar.component.html',
  styleUrl: './confirmation-snackbar.component.css'
})
export class ConfirmationSnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ConfirmationSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.snackBarRef.dismissWithAction();
  }

  onDismiss(): void {
    this.snackBarRef.dismiss();
  }
}
import { Injectable } from '@angular/core';
import { AlertService } from 'easy-angular-alerts';

@Injectable({
  providedIn: 'root'
})
export class CurrentAlertService {

  private currentAlertMessage!: string;

  constructor(private alertService: AlertService) { }

  setCurrentMessge(messge: string){
    this.currentAlertMessage = messge;
  }

  getCurrentMessage(){
    return this.currentAlertMessage;
  }

  

  showAlertErrorBottomRight( message: string){
    this.alertService.showAlert({
      type: 'error',
      message: message,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      fontFamily: 'JetBrainsMono',
      fontSize: '1rem',
      borderStyle: 'none',
      duration: 3000
    });

  }


  showAlertSimpleBottomRight( message: string){
    this.alertService.showAlert({
      type: 'simple',
      message: message,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      backgroundColor: '#81fa7d',
      fontFamily: 'JetBrainsMono',
      fontSize: '1rem',
      borderStyle: 'none',
      duration: 3000

    });
  }
  showAlertConfirmationBottomCenter(message: string, confirmCallback: () => void, cancelCallback: () => void) {
    this.alertService.showAlert({
      type: 'confirmation',
      message: message,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    }, confirmCallback, cancelCallback);
  
}
}

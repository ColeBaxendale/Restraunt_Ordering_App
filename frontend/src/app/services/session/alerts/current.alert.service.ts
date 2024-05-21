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

  showAlertErrorBottomRight(type: string, message: string){
    this.alertService.showAlert({
      type: type,
      message: message,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      fontFamily: 'JetBrainsMono',
      fontSize: '1rem',
      borderStyle: 'none',
      duration: 3000
    });

  }


  showAlertSimpleBottomRight(type: string, message: string){
    this.alertService.showAlert({
      type: type,
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

  showAlertConfirmationBottomCenter(message: string, onConfirm: () => void, onCancel: () => void) {
    this.alertService.showAlert({
      type: 'confirmation',
      message: message,
      textColor: 'black',
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      fontFamily: 'JetBrainsMono',
      backgroundColor: '#609af7',
      duration: 0,
      fontSize: '1rem',
    }, onConfirm, onCancel);
  }

}

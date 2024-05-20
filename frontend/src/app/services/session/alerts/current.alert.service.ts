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

  showAlertBottomRight(type: string, message: string){
    this.alertService.showAlert({
      type: type,
      message: message,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      fontFamily: 'JetBrainsMono',
      fontSize: '1rem',
      borderStyle: 'none'
    });

  }


}

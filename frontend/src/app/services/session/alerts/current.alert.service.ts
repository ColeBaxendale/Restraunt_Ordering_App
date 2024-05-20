import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentAlertService {

  private currentAlertMessage!: string;

  constructor() { }

  setCurrentMessge(messge: string){
    this.currentAlertMessage = messge;
  }

  getCurrentMessage(){
    return this.currentAlertMessage;
  }
}

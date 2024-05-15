import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [ NgIf, CommonModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.css'
})

export class CustomSnackbarComponent implements OnInit {
    @Input() message: string = '';
    @Input() duration: number = 3000;
    @Input() type: 'message' | 'confirmation' | 'error' = 'message';
    @Output() action = new EventEmitter<string>();
  
    isVisible: boolean = false;
  
    ngOnInit() {
      this.isVisible = true;
      if (this.type !== 'confirmation') {
        setTimeout(() => {
          this.isVisible = false;
          this.action.emit('timeout');
        }, this.duration);
      }
    }
  
    confirm() {
      this.isVisible = false;
      this.action.emit('confirm');
    }
  
    cancel() {
      this.isVisible = false;
      this.action.emit('cancel');
    }
  }

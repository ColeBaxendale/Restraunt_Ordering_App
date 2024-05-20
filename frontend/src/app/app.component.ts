import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AlertService } from 'easy-angular-alerts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('alertContainer', { read: ViewContainerRef }) alertContainer!: ViewContainerRef;

    constructor(private alertService: AlertService){}
  ngAfterViewInit(): void {
    this.alertService.setViewContainerRef(this.alertContainer);

  }
  title = 'frontend';
}

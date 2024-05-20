import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { Restaurant, RestaurantResponse } from '../../../../../types';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { SessionService } from '../../../services/session/session/session.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DividerModule } from 'primeng/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../../services/loading/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertService } from 'easy-angular-alerts';
import { CurrentAlertService } from '../../../services/session/alerts/current.alert.service';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    AutoCompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatIcon,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit, AfterViewInit {
  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  totalIncome: number = 0;
  totalLiveRestaurants: number = 0;
  totalAmountMade: number = 0;
  searchTerm: string = '';
  editingRestaurantId: string | null = null;
  deleteDialog!: boolean;
  formGroup: FormGroup;
  filteredRestaurants: Restaurant[] = [];
  errorMsg!: string;
  confirmationMsg!: string;
  @ViewChild('alertContainer', { read: ViewContainerRef }) alertContainer!: ViewContainerRef;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService,
    public loadingService: LoadingService,
    private alertService: AlertService,
    private viewContainerRef: ViewContainerRef,
    private currentAlertServcice: CurrentAlertService
  ) {
    this.formGroup = this.fb.group({
      selectedRestaurant: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.deleteDialog = false;
    this.loadRestaurants();
    if(this.currentAlertServcice.getCurrentMessage()){
      console.log('in the alert things22');
      console.log(this.currentAlertServcice.getCurrentMessage());
      
      this.alertService.showAlert({
        type: 'simple',
        message: this.currentAlertServcice.getCurrentMessage(),
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        fontFamily: 'JetBrainsMono',
        borderStyle: 'none'
      });
      this.currentAlertServcice.setCurrentMessge('');
    }
   
  }

  ngAfterViewInit() {
    this.alertService.setViewContainerRef(this.alertContainer);
  }


  clearSearch(): void {
    this.searchTerm = '';
    this.searchRestaurants(this.searchTerm);
  }

  loadRestaurants(): void {
    this.loadingService.setLoading(true, 'restaurants');
    this.restaurantService.getAllRestaurants().subscribe({
      next: (response: any) => {
        if (response && response.restaurants) {
          this.restaurants = response.restaurants;
          this.filteredRestaurants = this.restaurants;
          this.totalAmountMade = this.restaurants.reduce(
            (acc, curr) =>
              acc +
              (curr.admin && curr.admin.overallIncome
                ? curr.admin.overallIncome
                : 0) -
              0.01,
            0
          );
        } else {
          console.error('Invalid data structure:', response);
        }
        console.log('Restaurants loaded:', this.restaurants);
      },
      error: (err) => {
        console.error('Error loading restaurants:', err);
      },
    });
    this.loadingService.setLoading(false, '');
  }

  restaurantPage(restaurantId: string) {
    this.loadingService.setLoading(true, 'edit');
    console.log(this.loadingService.getLoadingItem());

    this.editingRestaurantId = restaurantId;
    this.restaurantService.setCurrentId(restaurantId);
    this.router.navigate(['/restaurant']);
    this.loadingService.setLoading(false, '');
  }

  searchRestaurants(searchTerm: string): void {
    this.loadingService.setLoading(true, 'search');
    if (searchTerm) {
      this.filteredRestaurants = this.restaurants.filter((restaurant) =>
        restaurant.details.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // If no search term is provided, show all restaurants
      this.filteredRestaurants = this.restaurants;
    }
    this.loadingService.setLoading(false, '');
  }

  delete(restaurantId: string): void {
    this.deleteDialog = true;
    this.editingRestaurantId = restaurantId;

  }

  cancel() {
    this.deleteDialog = false;
  }

  confirmDelete(restaurantId: string) {
    this.loadingService.setLoading(true, 'delete')
    this.restaurantService.deleteRestaurant(restaurantId).subscribe({
      next: (response: RestaurantResponse) => {
        console.log('Successfully deleted restaurant:', response.message);
        this.deleteDialog = false;
        this.loadRestaurants();

      },
      error: (error) => {
        console.error('Delete failed', error);
        this.errorMsg = error.error.message;
      },
    });
    this.loadingService.setLoading(false, '')

  }

  addRestaurant(): void {
    this.router.navigate(['/addRestaurant']);
  }

  logout(): void {
    this.sessionService
      .logout()
      .pipe(finalize(() => this.router.navigate(['/login/admin'])))
      .subscribe({
        next: () => console.log('Logged out successfully'),
        error: (error) => console.error('Logout failed:', error),
      });
  }
}

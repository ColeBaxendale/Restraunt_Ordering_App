import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  OperatingHours,
  Restaurant,
  RestaurantResponse,
  User,
  UserResponse,
  WeeklyOperatingHours,
} from '../../../../../types';
import { SessionService } from '../../../services/session/session.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { NgIf, CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantService } from '../../../services/admin/restaurant/requests/restaurant.service';
import { RestaurantValidatorService } from '../../../services/admin/restaurant/validators/restaurant.validator.service';
import { OwnerEditDialogComponent } from '../../../components/admin-components/owner-edit-dialog/owner-edit-dialog.component';
import { OwnerAddDialogComponent } from '../../../components/admin-components/owner-add-dialog/owner-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/admin/owner/requests/user.service';
import { OwnerEditRestaurantDialogComponent } from '../../../components/admin-components/owner-edit-restaurant-dialog/owner-edit-restaurant-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoadingService } from '../../../services/loading/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressBarModule,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
  errorMsg: '' | undefined;
  private unsubscribe$ = new Subject<void>();
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private dialog: MatDialog,
    private sessionService: SessionService,
    private restaurantValidator: RestaurantValidatorService,
    public loadingService: LoadingService,
    private userService: UserService
  ){}

  ngOnInit() {
    this.initializeForm();
    const restaurantId = this.restaurantService.getCurrentId();
    if (restaurantId) {
      this.loadRestaurantData(restaurantId);
    }
    else{
      this.router.navigate(['/admin']); 
    }
  }

  private initializeForm() {
    this.form = this.fb.group({
      details: this.fb.group({
        logo: [''],
        name: [
          '',
          [Validators.required],
          [this.restaurantValidator.isValidNameValidation()],
        ],
        description: [
          '',
          this.restaurantValidator.isValidDescriptionValidation(),
        ],
        phone: ['', this.restaurantValidator.isValidPhoneValidation()],
        location: this.fb.group({
          address: ['', this.restaurantValidator.isValidAddressValidation()],
          city: ['', this.restaurantValidator.isValidCityValidation()],
          state: ['', this.restaurantValidator.isValidStateValidation()],
          zipCode: ['', this.restaurantValidator.isValidZipValidation()],
        }),
        operatingHours: this.fb.group({
          monday: this.initDay(),
          tuesday: this.initDay(),
          wednesday: this.initDay(),
          thursday: this.initDay(),
          friday: this.initDay(),
          saturday: this.initDay(),
          sunday: this.initDay(),
        }),
        ordersEnabled: [false],
        owner: ['', null, this.restaurantValidator.isValidOwnerEmailEditAsync()],
        menuSections: this.fb.array([]),
      }),
      admin: this.fb.group({
        overallIncome: [0.01],
      }),
      stripe: this.fb.group({
        stripeAccountId: [
          '',
          this.restaurantValidator.isValidStripeIdValidation(),
        ],
        addFees: [false],
      }),
    });
  }

  private initDay() {
    return this.fb.group(
      {
        isOpen: [false],
        open: [{ value: '', disabled: true }, Validators.required],
        close: [{ value: '', disabled: true }, Validators.required],
      },
      { validators: this.restaurantValidator.operatingHoursValidator() }
    );
  }

  toggleDay(day: string): void {
    const dayGroup = this.form.get(`details.operatingHours.${day}`);
    if (dayGroup) {
      const isOpen = dayGroup.get('isOpen')?.value;
      const openControl = dayGroup.get('open');
      const closeControl = dayGroup.get('close');

      if (isOpen) {
        openControl?.enable();
        closeControl?.enable();
      } else {
        openControl?.disable();
        closeControl?.disable();
        openControl?.reset();
        closeControl?.reset();
      }
    }
  }

 

  private loadRestaurantData(restaurantId: string) {
    this.restaurantService.getRestaurantById(restaurantId).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (response) => {
        this.form.patchValue(response);
        if (response.details.owner) {
          this.userService.getUserById(response.details.owner).pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe({
            next: (userResponse) => {
              console.log(userResponse);
              if(userResponse.user?.email){
                this.restaurantService.setCurrentOwnerEmail(userResponse.user.email ?? "");
               }
               else{
               error: (error: any) => console.error('Error setting email:', error)
               }
              this.form.patchValue({
                details: {
                  owner: userResponse.user?.email
                },
              });

            },
            error: (error) => console.error('Error fetching user data:', error)
          });
        }
      },
      error: (error) => console.error('Error fetching restaurant data:', error)
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.restaurantService.setCurrentOwnerEmail("");
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'Name must be filled in.';
      }
      const errorKeys = Object.keys(control.errors);
      const firstErrorKey = errorKeys[0];
      const error = control.errors[firstErrorKey];
      return error.value || 'Invalid field';
    }
    return '';
  }

  clearInput(path: string | Array<string | number>) {
    const control = this.form.get(path);
    if (control) {
      console.log(control);
      control.reset(''); 
      control.markAsPristine();
      control.markAsUntouched();
      console.log(control);
    } 
  }

  cancel() {
      this.router.navigate(['/admin']); 
      this.restaurantService.setCurrentOwnerEmail("");
  }
    
    submitForm() {
      if (this.loadingService.getLoading()) {
        return;
      }
      if (this.form.valid) {
        if(this.form.get('details.owner')?.value === ''){
          if(this.restaurantService.getCurrentOwnerEmail() === ""){
            // UPDATE RESTAURANT WITHOUT TOUCHING OWNER
          }
          else{
            // DELETE OLD USER AND UPDATE RESTAURANT WITH NO OWNER
          }
        }
        else{
          if(this.restaurantService.getCurrentOwnerEmail() === ""){
            // CREATE NEW USER AND UPDATE RESTAURANT
          }
          else{
            if(this.restaurantService.getCurrentOwnerEmail().toLowerCase() === this.form.get('details.owner')?.value.toLowerCase()){
              // UPDATE RESTAURANT WITHOUT CHANGING USER
            }
            else{
              // DELETE OLD OWNER AND UPDATE RESTAURANT WITH NEW OWNER
            }
          }
        }


      }

      

    }
      
}
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin-pages/admin/admin.component';
import { adminAuthGuard } from './guard/admin-auth.guard';
import { ownerAuthGuard } from './guard/owner-auth.guard';
import { AddRestaurantComponent } from './pages/admin-pages/add-restaurant/add-restaurant.component';
import { RestaurantComponent } from './pages/admin-pages/restaurant/restaurant.component';
import { OwnerDashboardComponent } from './pages/owner-pages/owner-dashboard/owner-dashboard.component';
import { OwnerFirstLoginComponent } from './pages/owner-pages/owner-first-login/owner-first-login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },


    { path: 'admin', component: AdminComponent, canActivate: [adminAuthGuard], pathMatch: 'full', },
    { path: 'addRestaurant', component: AddRestaurantComponent, canActivate: [adminAuthGuard], pathMatch: 'full', },
    { path: 'restaurant/:id', component: RestaurantComponent, canActivate: [adminAuthGuard], pathMatch: 'full', },



    { path: 'owner/:id', component: OwnerDashboardComponent, canActivate: [ownerAuthGuard], pathMatch: 'full', },
    { path: 'owner/reset/:id', component: OwnerFirstLoginComponent, canActivate: [ownerAuthGuard], pathMatch: 'full', },

    { path: '', redirectTo: '/login', pathMatch: 'full' },


];

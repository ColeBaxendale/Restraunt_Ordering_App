import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { OwnerComponent } from './pages/owner/owner.component';
import { adminAuthGuard } from './guard/admin-auth.guard';
import { ownerAuthGuard } from './guard/owner-auth.guard';
import { AddRestaurantComponent } from './pages/add-restaurant/add-restaurant.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'admin', component: AdminComponent, canActivate: [adminAuthGuard], pathMatch: 'full', },
    { path: 'addRestaurant', component: AddRestaurantComponent, canActivate: [adminAuthGuard], pathMatch: 'full', },
    { path: 'owner', component: OwnerComponent, canActivate: [ownerAuthGuard], pathMatch: 'full', },
    { path: '', redirectTo: '/login', pathMatch: 'full' },


];

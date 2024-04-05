import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { OwnerComponent } from './pages/owner/owner.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], pathMatch: 'full', },
    { path: 'owner', component: OwnerComponent, canActivate: [AuthGuard], pathMatch: 'full', },
    { path: '', redirectTo: '/login', pathMatch: 'full' },


];

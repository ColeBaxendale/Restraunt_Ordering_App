import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'admin', component: AdminComponent, canActivate: [authGuard], pathMatch: 'full', },
    { path: '', redirectTo: '/login', pathMatch: 'full' },


];

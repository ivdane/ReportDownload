import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { authGuard } from './auth.guard'; // Import the guard

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reports', component: ReportComponent, canActivate: [authGuard] }, // Protected
  { path: 'admin-dashboard', component: AdminComponent, canActivate: [authGuard] }, // Protected
  { path: 'forgot-password', component: ForgotPasswordComponent,canActivate: [authGuard] }
];

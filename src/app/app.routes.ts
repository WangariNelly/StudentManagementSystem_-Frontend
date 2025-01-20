import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DataGenerationComponent} from './components/data-generation/data-generation.component';
import {AppComponent} from './app.component';
import {DataProcessingComponent} from './components/data-processing/data-processing.component';
import {DataUploadComponent} from './components/data-upload/data-upload.component';
import {StudentManagementComponent} from './components/student-management/student-management.component';
import {AuthGuard} from './guards/authGuard';
import {DashboardComponent} from './components/dashboard/dashboard.component';


export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'data-generation',
    title: 'Data Generation',
    canActivate: [AuthGuard],
    component: DataGenerationComponent,
  },
  {
    path: 'data-processing',
    title: 'Data Processing',
    canActivate: [AuthGuard],
    component: DataProcessingComponent,
  },
  {
    path: 'data-upload',
    title: 'Data Upload',
    canActivate: [AuthGuard],
    component: DataUploadComponent,
  },

  {
    path: 'student-management',
    title: 'Student Management',
    canActivate: [AuthGuard],
    component: StudentManagementComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  },
]

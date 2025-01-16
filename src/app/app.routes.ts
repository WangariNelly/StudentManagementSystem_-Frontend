import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DataGenerationComponent } from './components/data-generation/data-generation.component';
import { AppComponent } from './app.component';
import { DataProcessingComponent } from './components/data-processing/data-processing.component';
import { DataUploadComponent } from './components/data-upload/data-upload.component';
import { StudentReportComponent } from './components/student-report/student-report.component';
import { StudentManagementComponent } from './components/student-management/student-management.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      {
        path: '', component: AppComponent, children: [
          { path: 'data-generation', component: DataGenerationComponent },
          { path: 'data-processing', component: DataProcessingComponent },
          { path: 'data-upload', component: DataUploadComponent },
          { path: 'student-management', component: StudentManagementComponent },
          { path: 'student-report', component: StudentReportComponent },
          { path: '**', redirectTo: '/login' } 
        ]
    }
];

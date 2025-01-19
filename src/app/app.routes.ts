import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DataGenerationComponent } from './components/data-generation/data-generation.component';
import { AppComponent } from './app.component';
import { DataProcessingComponent } from './components/data-processing/data-processing.component';
import { DataUploadComponent } from './components/data-upload/data-upload.component';
import { StudentReportComponent } from './components/student-report/student-report.component';
import { StudentManagementComponent } from './components/student-management/student-management.component';
import { AuthGuard } from './guards/authGuard'; 

export const routes: Routes = [
  {
    path: '',
    
    component: AppComponent, 
  
    children: [

      { 
        path: 'login', 
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
        
      },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [AuthGuard]
      },
      { 
        path: 'data-generation', 
        component: DataGenerationComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'data-processing', 
        component: DataProcessingComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'data-upload', 
        component: DataUploadComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'student-management', 
        component: StudentManagementComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'student-report', 
        component: StudentReportComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: '**',  
        redirectTo: '/login', 
        pathMatch: 'full' 
      }
    ]
  },
  { 
    path: 'login', 
    component: LoginComponent 
  }
];

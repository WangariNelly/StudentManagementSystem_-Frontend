import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/dashboard'
  constructor( private http: HttpClient,private snackBar: MatSnackBar, 
    private authService: AuthService,   private router: Router) { }


  getTotalStudents(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/students/count`);

  }


  
}


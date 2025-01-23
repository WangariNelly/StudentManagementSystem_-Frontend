import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar,private http: HttpClient ) { }

  private baseUrl = 'http://localhost:8080/api/students/data'

  // Fetch all students
  getAllStudents(): Observable<any> {
   const token = this.authService.getToken();  
   if (!token) {
     this.snackBar.open('Failed to login. Please retry', '', {
       horizontalPosition: "right",
       verticalPosition: "top",
       duration: 3000
     });
     return throwError(() => new Error('No token found'));
   }

   const headers = new HttpHeaders().set('Authorization', ` ${token.trim()}`);

   return this.http.get<any>(`${this.baseUrl}/all`, { headers }).pipe(
     catchError((error) => {
       this.snackBar.open('Failed to fetch students', '', {
         horizontalPosition: "right",
         verticalPosition: "top",
         duration: 3000
       });
       return throwError(() => new Error('Failed to fetch students'));
     })
   );
 }

 // Add new student
 addStudent(student: any): Observable<any> {
   const token = this.authService.getToken();  
   if (!token) {
     this.snackBar.open('Failed to login. Please retry', '', {
       horizontalPosition: "right",
       verticalPosition: "top",
       duration: 3000
     });
     return throwError(() => new Error('No token found'));
   }

   const headers = new HttpHeaders().set('Authorization', ` ${token.trim()}`);
   return this.http.post<any>(`${this.baseUrl}/register`, student, { headers }).pipe(
     catchError((error) => {
       this.snackBar.open('Failed to add student', '', {
         horizontalPosition: "right",
         verticalPosition: "top",
         duration: 3000
       });
       return throwError(() => new Error('Failed to add student'));
     })
   );
 }


 //edit 
 getStudentById(studentId: number): Observable<any> {
   const token = this.authService.getToken();
   if (!token) {
     this.snackBar.open('Failed to login. Please retry', '', {
       horizontalPosition: "right",
       verticalPosition: "top",
       duration: 3000
     });
     return throwError(() => new Error('No token found'));
   }

   const headers = new HttpHeaders().set('Authorization', ` ${token.trim()}`);
   
   return this.http.get<any>(`${this.baseUrl}/${studentId}`, { headers }).pipe(
     catchError((error) => {
       this.snackBar.open('Failed to fetch student details', '', {
         horizontalPosition: "right",
         verticalPosition: "top",
         duration: 3000
       });
       return throwError(() => new Error('Failed to fetch student details'));
     })
   );
 }

 
 // Update student details
 updateStudent(studentId: number, student: any): Observable<any> {
   const token = this.authService.getToken(); 
   if (!token) {
     this.snackBar.open('Failed to login. Please retry', '', {
       horizontalPosition: "right",
       verticalPosition: "top",
       duration: 3000
     });
     return throwError(() => new Error('No token found'));
   }

   const headers = new HttpHeaders().set('Authorization', ` ${token.trim()}`);
   return this.http.put<any>(`${this.baseUrl}/update/${studentId}`, student, { headers }).pipe(
     catchError((error) => {
       this.snackBar.open('Failed to update student', '', {
         horizontalPosition: "right",
         verticalPosition: "top",
         duration: 3000
       });
       return throwError(() => new Error('Failed to update student'));
     })
   );
 }

// Delete a student
deleteStudent(id: number): Observable<any> {
 const token = this.authService.getToken();  
 if (!token) {
   this.snackBar.open('Failed to login. Please retry', '', {
     horizontalPosition: "right",
     verticalPosition: "top",
     duration: 3000
   });
   return throwError(() => new Error('No token found'));
 }

 const headers = new HttpHeaders().set('Authorization', ` ${token.trim()}`);

 {
   return this.http.delete<any>(`${this.baseUrl}/delete/${id}`, { headers }).pipe(
     catchError((error) => {
       this.snackBar.open('Failed to delete student', '', {
         horizontalPosition: "right",
         verticalPosition: "top",
         duration: 3000
       });
       return throwError(() => new Error('Failed to delete student'));
     })
   );
 }
 return new Observable();
}
}

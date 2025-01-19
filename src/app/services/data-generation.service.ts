import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataGenerationService {
  private apiUrl = 'http://localhost:8080/api/data'; 

  constructor(private http: HttpClient, private router: Router) {}


  generateData(recordCount: number): Observable<any> {
    const token = localStorage.getItem('token');


   
    if (!token) {
      alert('Token is missing or invalid');
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token is missing or invalid'));
    }

    const headers = new HttpHeaders().set('Authorization', ` ${token.trim()}`);
    console.log('Authorization Header:', headers);

    return this.http
      .get(`${this.apiUrl}/generate?records=${recordCount}`, {
        headers: headers,
        params: { records: recordCount.toString() },
      })
      .pipe(catchError(this.handleError.bind(this)));
  }


  processData(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token is missing or invalid'));
    }

    const headers = new HttpHeaders().set('Authorization', ` ${token.trim()}`);
    console.log('Authorization Header:', headers);

    return this.http
      .get(`${this.apiUrl}/process`)
      .pipe(catchError(this.handleError.bind(this)));
  }


  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Token is missing or invalid');
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token is missing or invalid'));
    }

    const headers = new HttpHeaders().set('Authorization', ` ${token.trim()}`);
    console.log('Authorization Header:', headers);


    return this.http
      .post(`${this.apiUrl}/upload`, formData)
      .pipe(catchError(this.handleError.bind(this))); 
  }

  private handleError(error: any): Observable<never> {
    let errorMessage: string;
  
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (error.status) {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: The server could not understand the request.';
          break;
        case 401:
          errorMessage = 'Unauthorized: Access is denied due to invalid credentials.';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have the necessary permissions.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource could not be found.';
          break;
        case 408:
          errorMessage = 'Request Timeout: The server timed out waiting for the request.';
          break;
        case 500:
          errorMessage = 'Internal Server Error: The server encountered an unexpected condition.';
          break;
        case 502:
          errorMessage = 'Bad Gateway: The server received an invalid response from the upstream server.';
          break;
        case 503:
          errorMessage = 'Service Unavailable: The server is currently unable to handle the request.';
          break;
        case 504:
          errorMessage = 'Gateway Timeout: The server did not receive a timely response from the upstream server.';
          break;
        default:
          errorMessage = `Unexpected Error: ${error.status} ${error.statusText}`;
          break;
      }
  

      if (error.error?.message) {
        errorMessage += ` - ${error.error.message}`;
      }
    } else {
   
      errorMessage = 'An unexpected error occurred. Please try again later.';
    }
  

    console.error('User-Friendly Error Message:', errorMessage);

    return throwError(() => new Error(errorMessage));
  }
  
 }

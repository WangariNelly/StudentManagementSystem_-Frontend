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

  /**
   * Generate data with the specified number of records.
   * @param recordCount Number of records to generate.
   * @returns Observable with the server response.
   */
  generateData(recordCount: number): Observable<any> {
    const token = localStorage.getItem('token.trim()');
    console.log('Token from localStorage:', token);
    if (!token) {
      alert('Token is missing or invalid');
      this.router.navigate(['/login']);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token?.trim() || ''}`);
    console.log('Authorization Header:', headers);
    return this.http.get(`${this.apiUrl}/generate`,{
      headers: headers,
      params: { records: recordCount.toString() }
    }).pipe(
      catchError((this.handleError)
    ));
  }

  /**
   * Process data from the generated Excel file.
   * @returns Observable with the server response.
   */
  processData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/process`, {}).pipe(
      catchError((this.handleError)
    ));
  }

  /**
   * Upload a file to the server.
   * @param file The file to upload.
   * @returns Observable with the server response.
   */
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload`, formData).pipe(
      catchError((this.handleError)
    ));

  }


private handleError(error: any): Observable<never> {
  let errorMessage: string;

  if (error.error instanceof ErrorEvent) {
    errorMessage = `Client-side error: ${error.error.message}`;
  } else if (error.status) {
    errorMessage = `Server-side error: ${error.status} ${error.statusText} - ${error.error?.message || 'Unknown error'}`;
  } else {
    errorMessage = 'An unexpected error occurred.';
  }

  console.error('Error Details:', error); 
  console.error('User-Friendly Message:', errorMessage);
  return throwError(() => new Error(errorMessage));
}
}
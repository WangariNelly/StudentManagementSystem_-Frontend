import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataGenerationService {

  private apiUrl = 'http://localhost:8080/api/data';
  constructor(private http: HttpClient) {}

  generateData(recordCount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate`, {recordCount}).pipe(
      catchError((error) => {
        console.error('Error Loading...:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  processData(): Observable<any> {
    return this.http.post(`${this.apiUrl}/process`, {}).pipe(
      catchError((error) => {
        console.error('Error Processing...:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/upload`, {}).pipe(
      catchError((error) => {
        console.error('Error Processing...:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}


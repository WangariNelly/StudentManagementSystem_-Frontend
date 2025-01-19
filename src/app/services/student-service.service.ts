import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/dashboard'
  constructor( private http: HttpClient) { }

  getTotalStudents(): Observable<number> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User might not be logged in.');
      throw new Error('Unauthorized access');
    }

    const headers = new HttpHeaders().set('Authorization', ` ${token.trim() || ''}`);
    return this.http.get<number>(`${this.baseUrl}/students/count`, { headers });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/dashboard'
  constructor( private http: HttpClient) { }

  getTotalStudents(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/students/count`);
  }
}

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
    return this.http.get<number>(`${this.baseUrl}/students/count`);

  }

  
  getAllStudents(): Observable<any> {
    return this.http.get(`$this.baseUrl`);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`this.baseUrl/${id}`);
  }

  
}

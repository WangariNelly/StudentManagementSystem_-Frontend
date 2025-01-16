import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // This means the service is available globally
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Base URL for backend API

  constructor(private http: HttpClient) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };

    return this.http.post<any>(`${this.apiUrl}/login`, loginRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }


  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  logout(): void {
    localStorage.removeItem('authToken');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtResponse } from '../interfaces/jwtResponse.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 


  private loggedInStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public readonly isLoggedIn = this.loggedInStatus.asObservable();
  private redirectUrl: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('token')
  }


  // Login method
  login(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };

    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, loginRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      tap((response: JwtResponse) => {
        if (response.token) {
          const token = response.token.replace('Bearer ','');
          localStorage.setItem('token', token); 
          this.storeToken(token); 
          this.loggedInStatus.next(true);

         
          const redirect = this.redirectUrl || '/dashboard';
          this.router.navigate([redirect]);
        }
      })
    );
  }

  
  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  logout(): void {
    localStorage.removeItem('token');
    this.loggedInStatus.next(false);
    this.router.navigate(['/login']);
  }
}

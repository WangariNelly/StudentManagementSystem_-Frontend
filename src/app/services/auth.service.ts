// import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
import { JwtResponse } from '../interfaces/jwtResponse.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 
  private tokenKey = 'token';
  private loggedInStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public readonly isLoggedIn = this.loggedInStatus.asObservable();
  private redirectUrl: string = '';

  constructor(private http: HttpClient, private router: Router) {
    // Check token validity on service initialization
    this.validateStoredToken();
  }

  private validateStoredToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        // Basic validation - check if token is properly formatted
        const parts = token.split('.');
        if (parts.length !== 3) {
          this.logout();
        }
      } catch (e) {
        this.logout();
      }
    }
  }

  private checkLoginStatus(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token && token.split('.').length === 3;
  }

  login(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, loginRequest, { headers })
      .pipe(
        tap((response: JwtResponse) => {
          if (response?.token) {
            const cleanToken = response.token.trim();
            this.storeToken(cleanToken);
            this.loggedInStatus.next(true);
            
            // Navigate to redirect URL if set, otherwise to dashboard
            const redirectTo = this.redirectUrl || '/dashboard';
            this.router.navigate([redirectTo]);
            this.redirectUrl = ''; // Reset redirect URL
          } else {
            console.error('No token received in login response');
            throw new Error('Login failed: No token received');
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          this.loggedInStatus.next(false);
          throw error;
        })
      );
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  storeToken(token: string): void {
    if (!token) {
      console.error('Attempted to store empty token');
      return;
    }
    try {
      const cleanToken = token.trim();
      localStorage.setItem(this.tokenKey, cleanToken);
      console.log('Token stored successfully');
    } catch (e) {
      console.error('Error storing token:', e);
    }
  }

  getToken(): string | null {
    try {
      const token = localStorage.getItem(this.tokenKey);
      return token ? token.trim() : null;
    } catch (e) {
      console.error('Error retrieving token:', e);
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && token.split('.').length === 3;
  }

  logout(): void {
    try {
      localStorage.removeItem(this.tokenKey);
      this.loggedInStatus.next(false);
      this.router.navigate(['/login']);
    } catch (e) {
      console.error('Error during logout:', e);
    }
  }
}
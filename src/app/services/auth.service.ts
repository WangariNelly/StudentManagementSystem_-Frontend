import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'token';
  private loggedInStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public readonly isLoggedIn = this.loggedInStatus.asObservable();
  private redirectUrl: string = '';
  private isLoggedInSubscription: any;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.validateStoredToken();
  }

  private validateStoredToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
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

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.storeToken(response.token);
          this.loggedInStatus.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  handlePostLoginRedirect(): void {
    const redirectUrl = this.getRedirectUrl() || '/dashboard';
    this.router.navigate([redirectUrl]);
    this.redirectUrl = '';
  }

  storeToken(token: string): void {
    if (!token) {
      return;
    }
    localStorage.setItem(this.tokenKey, token.trim());
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

  // isChecker(): boolean {
  //   const token = this.getToken();
  //   if (token) {
  //     const decodedToken = this.jwtHelper.decodeToken(token);
  //     return decodedToken.roles && decodedToken.roles.includes('admin');
  //   }
  //   return false;
  // }

  logout(): void {
    try {
      localStorage.removeItem(this.tokenKey);
      localStorage.clear();
      this.loggedInStatus.next(false);
      this.router.navigate(['/login']);
    } catch (e) {
      console.error('Error during logout:', e);
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  ngOnDestroy() {
    this.isLoggedInSubscription?.unsubscribe();
  }

  ngOnInit() {
    this.isLoggedInSubscription = this.isLoggedIn.subscribe((status) => {
      console.log('Logged in status:', status);
    });
  }
}
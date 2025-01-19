import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, catchError, throwError, tap} from 'rxjs';
import {JwtResponse} from '../interfaces/jwtResponse.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'token';
  private loggedInStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public readonly isLoggedIn = this.loggedInStatus.asObservable();
  private redirectUrl: string = '';
  private isLoggedInSubscription: any;

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
    return this.http.post<any>(`${this.apiUrl}/login`, userData);
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

  logout(): void {
    try {
      localStorage.removeItem(this.tokenKey);
      this.loggedInStatus.next(false);
      this.router.navigate(['/login']);
    } catch (e) {
      console.error('Error during logout:', e);
    }
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

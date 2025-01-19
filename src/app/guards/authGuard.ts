
import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

   
    // If not authenticated and trying to access a protected route, redirect to login
    if (state.url !== '/login') { // Avoid redirecting to login if it's already the login page
      this.authService.setRedirectUrl(state.url);  // Store the attempted URL
      this.router.navigate(['/login']);  // Redirect to login page
    }

    return false;
  }
}
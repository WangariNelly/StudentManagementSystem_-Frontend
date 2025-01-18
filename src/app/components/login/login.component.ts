
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;
  isLoading: boolean = false;
  
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {
    // // Redirect if already logged in
    // if (this.authService.isAuthenticated()) {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  onSubmit(): void {
   
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.error = null; 

    this.authService.login(this.username.trim(), this.password).subscribe({
      next: (response) => {
        if (response?.token) {

          console.log('Login successful');

          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Invalid response from server';
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.error = err?.error?.message || 'Invalid credentials';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }


  onInput(): void {
    this.error = null;
  }
}

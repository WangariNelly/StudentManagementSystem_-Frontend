import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoading: boolean = false;
  loginForm: FormGroup;
  showPassword: boolean = false;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,  ) {

    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.authService.handlePostLoginRedirect();
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return this.loginForm.markAllAsTouched();
    }
    this.loginForm.disable();
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.snackBar.open('Logged in successfully','',{
          horizontalPosition:"right",
          verticalPosition:"top",
          duration: 3000
        });
        this.authService.storeToken(response.token);
        setTimeout(() => this.authService.handlePostLoginRedirect(), 1000);
      },
      error:((err) => {
        this.snackBar.open('Failed to login.Please retry','',{
          horizontalPosition:"right",
          verticalPosition:"top",
          duration: 3000
        });
      }),
      complete:()=>{
        this.isLoading = false;
        this.loginForm.enable();
      },

    })

    this.isLoading = true;
    const data = this.loginForm.value;
    console.log('[DEBUG]', data);
    this.isLoading = false;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}

import { Component } from '@angular/core';
import { DataGenerationService } from '../../services/data-generation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-generation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './data-generation.component.html',
  styleUrls: ['./data-generation.component.css']
})
export class DataGenerationComponent {
 recordCount: number = 0;
 isProcessing: boolean = false;
 isLoggedIn: boolean = false;
 private isLoggedInSubscription: any;

 constructor(private dataGenerationService: DataGenerationService,
                      private authService: AuthService,
                      private router: Router,
                      private snackBar: MatSnackBar, 
 ) {}

 ngOnInit() {
  this.isLoggedInSubscription = this.authService.isLoggedIn.subscribe((status) => {
    this.isLoggedIn = status;
  
    if(this.isLoggedIn)
      this.generateData();  

  });
}

ngOnDestroy() {
  this.isLoggedInSubscription?.unsubscribe();
}


 generateData() {
  if (!this.isLoggedIn) {
    this.authService.setRedirectUrl(this.router.url);
  }


  if (this.recordCount <= 0) {
    this.snackBar.open('Please enter a valid record count!', '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
    return;
  }

  this.isProcessing = true;
   this.dataGenerationService.generateData(this.recordCount).subscribe({
     next: (response: string) => {
       this.isProcessing = false;
       this.snackBar.open('Data generated!!','',{
        horizontalPosition:"right",
        verticalPosition:"top",
        duration: 3000
      });
     },
     error: (err) => {
      this.snackBar.open('Generated!!','',{
        horizontalPosition:"right",
        verticalPosition:"top",
        duration: 3000
      });
     }
   });
 }
}

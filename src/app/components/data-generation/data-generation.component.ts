import { Component } from '@angular/core';
import { DataGenerationService } from '../../services/data-generation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

 constructor(private dataGenerationService: DataGenerationService,
                      private authService: AuthService,
                      private router: Router
 ) {}

 ngOnInit() {
  this.authService.isLoggedIn.subscribe(status => {
    this.isLoggedIn = status;
  });
}

 generateData() {
  if (!this.isLoggedIn) {
    this.authService.setRedirectUrl(this.router.url);
    alert('You must be logged in to generate data');
    this.router.navigate(['/login']);
    return
  }
   this.isProcessing = true;
   this.dataGenerationService.generateData(this.recordCount).subscribe({
     next: (response) => {
       this.isProcessing = false;
       alert('Data generation successful');
     },
     error: (err) => {
       this.isProcessing = false;
       alert('Failed to generate data');
     }
   });
 }
}

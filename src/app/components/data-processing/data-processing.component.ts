import { Component } from '@angular/core';
import { DataGenerationService } from '../../services/data-generation.service';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-data-processing',
  standalone: true,
  imports: [CommonModule,MatCommonModule],
  templateUrl: './data-processing.component.html',
  styleUrls: ['./data-processing.component.css']
})
export class DataProcessingComponent {
  isProcessing: boolean = false;
  isLoggedIn: boolean = false;
  private isLoggedInSubscription: any;

  constructor(private dataGenerationService: DataGenerationService,  private authService: AuthService,
                        private router: Router) {}

                        ngOnInit() {
                          this.isLoggedInSubscription = this.authService.isLoggedIn.subscribe((status) => {
                            this.isLoggedIn = status;
                         
                              this.processData();  
                        
                          });
                        }
                        
                        ngOnDestroy() {
                          this.isLoggedInSubscription?.unsubscribe();
                        }
                        

  processData() {
    alert("processData() triggered.");
    this.isProcessing = true;
    this.dataGenerationService.processData().subscribe({
      next: (response: string) => {
        this.isProcessing = false;
        alert('Data processing complete');
      },
      error: (err) => {
        this.isProcessing = false;
        alert('Error processing data');
      }
    });
  }
}

import { Component } from '@angular/core';
import { DataGenerationService } from '../../services/data-generation.service';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
                        private router: Router,   private snackBar: MatSnackBar, ) {}

                        ngOnInit() {
                          this.isLoggedInSubscription = this.authService.isLoggedIn.subscribe((status) => {
                            this.isLoggedIn = status;
                         
                            if(this.isLoggedIn)
                              this.processData();  
                        
                          });
                        }
                        
                        ngOnDestroy() {
                          this.isLoggedInSubscription?.unsubscribe();
                        }
                        

  processData() {
    this.isProcessing = true;
    this.dataGenerationService.processData().subscribe({
      next: (response: string) => {
        this.snackBar.open('Processing', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
      error: (err) => {
      this.isProcessing = false;
        this.snackBar.open('Generated!!','',{
          horizontalPosition:"right",
          verticalPosition:"top",
          duration: 3000
        });
      }
    });
  }
}

// data-upload.component.ts
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DataGenerationService } from '../../services/data-generation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-data-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css']
})
export class DataUploadComponent {
  file: File | null = null;
  isUploading: boolean = false;

  constructor(private dataGenerationService: DataGenerationService,  private snackBar: MatSnackBar,          private authService: AuthService,
                        private router: Router ) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadData() {
    if (this.file) {
      this.isUploading = true;
      this.dataGenerationService.uploadFile(this.file).subscribe({
        next: (response) => {
          this.isUploading = false;
          this.snackBar.open('Uploaded!!','',{
            horizontalPosition:"right",
            verticalPosition:"top",
            duration: 3000
          });
        },
        error: (err) => {
          this.isUploading = false;
          this.snackBar.open('Error Uploading!!','',{
            horizontalPosition:"right",
            verticalPosition:"top",
            duration: 3000
          });
        }
      });
    } else {
      this.snackBar.open('Please select a File','',{
        horizontalPosition:"right",
        verticalPosition:"top",
        duration: 3000
      });
    }
  }
}

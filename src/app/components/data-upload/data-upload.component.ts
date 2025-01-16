// data-upload.component.ts
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DataGenerationService } from '../../services/data-generation.service';

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

  constructor(private dataGenerationService: DataGenerationService) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadData() {
    if (this.file) {
      this.isUploading = true;
      this.dataGenerationService.uploadFile(this.file).subscribe({
        next: (response) => {
          this.isUploading = false;
          alert('Data upload successful');
        },
        error: (err) => {
          this.isUploading = false;
          alert('Failed to upload data');
        }
      });
    } else {
      alert('Please select a file');
    }
  }
}

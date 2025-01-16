import { Component } from '@angular/core';
import { DataGenerationService } from '../../services/data-generation.service';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';

@Component({
  selector: 'app-data-processing',
  standalone: true,
  imports: [CommonModule,MatCommonModule],
  templateUrl: './data-processing.component.html',
  styleUrls: ['./data-processing.component.css']
})
export class DataProcessingComponent {
  isProcessing: boolean = false;

  constructor(private dataGenerationService: DataGenerationService) {}

  processData() {
    this.isProcessing = true;
    this.dataGenerationService.processData().subscribe({
      next: (response) => {
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

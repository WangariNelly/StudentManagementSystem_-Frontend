import { Component } from '@angular/core';
import { DataGenerationService } from '../../services/data-generation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-data-generation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-generation.component.html',
  styleUrls: ['./data-generation.component.css']
})
export class DataGenerationComponent {
 recordCount: number = 0;
 isProcessing: boolean = false;

 constructor(private dataGenerationService: DataGenerationService) {}

 generateData() {
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

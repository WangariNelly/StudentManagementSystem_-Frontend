import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-average-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './average-score.component.html',
  styleUrl: './average-score.component.css'
})
export class AverageScoreComponent {
  @Input() selectedStudents: any[] = [];

  
  getAverage() {
    const totalScore = this.selectedStudents.reduce((total, student) => total + student.score, 0);
    return totalScore / this.selectedStudents.length;
  }
}

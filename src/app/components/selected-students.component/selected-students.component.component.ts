import { Component } from '@angular/core';

@Component({
  selector: 'app-selected-students.component',
  standalone: true,
  imports: [],
  templateUrl: './selected-students.component.component.html',
  styleUrl: './selected-students.component.component.css'
})
export class SelectedStudentsComponentComponent implements OnChanges{

  @Input() selectedStudents: Student[] = [];
  averageScore: number = 0;

  ngOnChanges(): void {
    this.calculateAverageScore();
  }

  calculateAverageScore(): void {
    if (this.selectedStudents.length > 0) {
      const totalScore = this.selectedStudents.reduce((sum, student) => sum + student.score, 0);
      this.averageScore = totalScore / this.selectedStudents.length;
    } else {
      this.averageScore = 0;
    }
  }
}


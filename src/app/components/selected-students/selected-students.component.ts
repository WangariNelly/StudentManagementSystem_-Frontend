import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-selected-students',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './selected-students.component.html',
  styleUrl: './selected-students.component.css'
})
export class SelectedStudentsComponent {
    @Input() selectedStudents: any[] = [];
  

    displayedColumns: string[] = ['firstName', 'lastName', 'score'];
    
    getTotal() {
      return this.selectedStudents.reduce((total, student) => total + student.score, 0);
    }
}

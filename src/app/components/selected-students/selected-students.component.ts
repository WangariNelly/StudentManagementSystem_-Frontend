import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-selected-students',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './selected-students.component.html',
  styleUrls: [ './selected-students.component.css']
})
export class SelectedStudentsComponent implements OnChanges {
    @Input() selectedStudents: any[] = [];
    totalScore: number = 0; 

    displayedColumns: string[] = ['firstName', 'lastName', 'score'];
    

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['selectedStudents'] && this.selectedStudents) {
        this.getTotal();
      }
    }

    getTotal(): void {
      this.totalScore =  this.selectedStudents.reduce((total, student) => total + Number(student.score), 0);
    }
}

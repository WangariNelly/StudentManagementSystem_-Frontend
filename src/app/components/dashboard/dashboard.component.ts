import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentService } from '../../services/student-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalStudents: number = 0;

  
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudentCount();
}

loadStudentCount(): void {
  this.studentService.getTotalStudents().subscribe({
    next: (count) => (this.totalStudents = count),
    error: (err) => console.error('Failed to fetch total students:', err)
  })
}
}

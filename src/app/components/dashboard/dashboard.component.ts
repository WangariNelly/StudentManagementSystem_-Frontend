import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentService } from '../../services/student-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalStudents: number = 0;

  
  constructor(private studentService: StudentService, private router: Router ) {}

  ngOnInit(): void {
    this.loadStudentCount();
}

loadStudentCount(): void {
  this.studentService.getTotalStudents().subscribe({
    next: (count) => (this.totalStudents = count),
    error: (err) => {
      if (err.status === 401) {
        console.error('User is not authenticated. Redirecting to login...');
       
        this.router.navigate(['/login']);
      } else {
        console.error('Failed to fetch total students:', err);
      }
      this.totalStudents = 0;  
    },
  });
}
}

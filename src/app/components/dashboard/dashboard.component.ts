
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentService } from '../../services/student-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalStudents: number = 0;


  constructor(private studentService: StudentService, private router: Router, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.loadStudentCount();
}

loadStudentCount(): void {
  this.studentService.getTotalStudents().subscribe({
    next: (count) => (this.totalStudents = count),
    error: (err) => {
      if (err.status === 401) {
        this.snackBar.open('Session expired. Redirecting to login...', 'Close', { duration: 5000 });
        // setTimeout(() => this.router.navigate(['/login']), 5000);
      } else {
        this.snackBar.open('Failed to fetch total students. Please try again later.', 'Close', { duration: 5000 });
      }
      this.totalStudents = 0;
    },
  });
}
}

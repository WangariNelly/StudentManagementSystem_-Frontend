import { Component, OnInit } from '@angular/core';
import { StudentManagementService } from '../../services/student-management.service';  
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; 
import { AuthService } from '../../services/auth.service';

@Component({

  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
],
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css'],
})
export class StudentManagementComponent implements OnInit {
  students: any[] = [];  
  studentId: string = ''; 
  className: string = ''; 
  startDate: string = ''; 
  endDate: string = ''; 
  page: number = 0;
  pageSize = 10;
  totalRecords = this.students.length;
  size: number = 5;
 FormData: any[] = []

  classOptions: string[] = ['Class1', 'Class2', 'Class3', 'Class4','Class5'];

  constructor(private router: Router,public studentManagementService: StudentManagementService, authService: AuthService) {}

  ngOnInit(): void {
    this.getStudents();  
  }


  getStudents(): void {
    this.studentManagementService.studentId = this.studentId;
    this.studentManagementService.className = this.className;
    this.studentManagementService.startDate = this.startDate;
    this.studentManagementService.endDate = this.endDate;

    this.studentManagementService.getStudents();  
    this.students = this.studentManagementService.students; 
  }

  
  // onDelete(studentId: string): void {
  //   this.studentManagementService.onDelete(studentId);
  //   this.getStudents();  
  // }

  
  // onUpdate(student: any): void {
  //   this.studentManagementService.onUpdate(student);  

  // }

  // updateStudent(student: any): void {
  //   this.studentManagementService.updateStudent(studentId, FormData)
  // }

 
  onPageChange(page: number): void {
    this.studentManagementService.onPageChange(page);
    this.getStudents();
  }

}

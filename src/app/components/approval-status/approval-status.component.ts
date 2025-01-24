import { Component, OnInit } from '@angular/core';
import { StudentRecord } from '../../interfaces/student-record.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApprovalStatusService } from '../../services/approval-status.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-approval-status',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,MatInputModule,FormsModule,BrowserModule,MatTableModule],
  templateUrl: './approval-status.component.html',
  styleUrl: './approval-status.component.css'
})
export class ApprovalStatusComponent implements OnInit { 
    studentRecords: StudentRecord[] = [];
    displayedColumns: string[] = ['id', 'firstName', 'lastName','approvedStatus'];
    selectedRecord: StudentRecord | null = null;
    comment: string = '';
    isApproved: boolean | null = null;
  
    constructor(
      private studentApprovalService: ApprovalStatusService,
      private snackBar: MatSnackBar,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.studentRecords = [
        {
          id: 1, firstName: 'John', lastName: 'Doe', approvedStatus: 'Pending',
          dob: '',
          className: '',
          score: 0
        },
        {
          id: 2, firstName: 'Jane', lastName: 'Doe', approvedStatus: 'Approved',
          dob: '',
          className: '',
          score: 0
        },
        {
          id: 3, firstName: 'Alice', lastName: 'Smith', approvedStatus: 'Rejected',
          dob: '',
          className: '',
          score: 0
        },
      ];
      // this.fetchStudentRecords();
    }
  
    // Fetch the student records
    fetchStudentRecords(): void {
      this.studentApprovalService.getFilteredRecords('ALL').subscribe({
        next: (data) => {
          this.studentRecords = data;
        },
        error: (err) => {
          this.snackBar.open('Failed to fetch records', '', { duration: 3000 });
        },
      });
    }
  
    // Approve or reject a student record
    reviewRecord(record: StudentRecord, isApproved: boolean): void {
      if (!this.comment) {
        this.snackBar.open('Please add a comment for the review', '', { duration: 3000 });
        return;
      }
  
      this.studentApprovalService
        .reviewRecord(record.id, isApproved, this.comment)
        .subscribe({
          next: (message) => {
            this.snackBar.open(message, '', { duration: 3000 });
            this.fetchStudentRecords();
          },
          error: (err) => {
            this.snackBar.open('Failed to review record', '', { duration: 3000 });
          },
        });
    }
  
    // Update a student record
    updateRecord(record: StudentRecord): void {
      if (!this.selectedRecord) return;
  
      this.studentApprovalService.updateRecord(record.id, this.selectedRecord).subscribe({
        next: (message) => {
          this.snackBar.open(message, '', { duration: 3000 });
          this.fetchStudentRecords();
        },
        error: (err) => {
          this.snackBar.open('Failed to update record', '', { duration: 3000 });
        },
      });
    }
  
    selectRecord(record: StudentRecord): void {
      this.selectedRecord = { ...record };
    }
  
    clearSelection(): void {
      this.selectedRecord = null;
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule} from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentDataService } from '../../services/student-data.service';
import { AuthService } from '../../services/auth.service';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  selectedStudents: Student[] = [];
  studentForm!: FormGroup;
  currentStudentId: number | null = null;
  selectedStudent: Student | null = null;
  isChecker: boolean = false;
  isEditMode: boolean = false;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'dob',
    'className',
    'score',
    'status',
    'actions',
  ];

  constructor(
    private studentDataService: StudentDataService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.isChecker = this.authService.isChecker();
    this.studentForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      dob: ['', Validators.required],
      className: ['', [Validators.required, Validators.pattern('Class[1-5]')]],
      score: [55, [Validators.required, Validators.min(55), Validators.max(85)]],
      checkerComment: [''],
    });
  }
  

  fetchStudents(): void {
    this.studentDataService.getAllStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
      error: () => {
        this.snackBar.open('Failed to fetch students', '', {
          duration: 3000,
        });
      },
    });
  }

  submitForm(): void {
    if (this.studentForm.valid) {
      if (this.isEditMode && this.currentStudentId !== null) {
        this.studentDataService
          .updateStudent(this.currentStudentId, this.studentForm.value)
          .subscribe({
            next: () => {
              this.fetchStudents();
              this.resetForm();
            },
            error: () => {
              this.snackBar.open('Failed to update student', '', {
                duration: 3000,
              });
            },
          });
      } else {
        this.studentDataService.addStudent(this.studentForm.value).subscribe({
          next: () => {
            this.fetchStudents();
            this.resetForm();
          },
          error: () => {
            this.snackBar.open('Failed to add student', '', {
              duration: 3000,
            });
          },
        });
      }
    }
  }

  selectStudent(student: Student): void {
    if (!this.selectedStudents.includes(student)) {
      this.selectedStudents.push(student);
    }
  }

  calculateAverageScore(): number {
    if (this.selectedStudents.length === 0) {
      return 0;
    }
    const totalScore = this.selectedStudents.reduce(
      (sum, student) => sum + student.score,
      0
    );
    return totalScore / this.selectedStudents.length;
  }

  editStudent(studentId: number): void {
    this.isEditMode = true;
    this.currentStudentId = studentId;

    this.studentDataService.getStudentById(studentId).subscribe({
      next: (student) => {
        this.studentForm.patchValue({
          ...student,
          dob: student.dob ? new Date(student.dob) : null,
        });
      },
      error: () => {
        this.snackBar.open('Failed to fetch student details', '', {
          duration: 3000,
        });
      },
    });
  }

  approveStudent(student: Student): void {
    student.approvalStatus = 'approved';
    this.studentDataService.updateStudent(student.studentId, student).subscribe({
      next: () => this.fetchStudents(),
    });
  }

  rejectStudent(student: Student): void {
    student.approvalStatus = 'rejected';
    this.studentDataService.updateStudent(student.studentId, student).subscribe({
      next: () => this.fetchStudents(),
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentDataService.deleteStudent(id).subscribe({
        next: () => this.fetchStudents(),
        error: () => {
          this.snackBar.open('Failed to delete student', '', {
            duration: 3000,
          });
        },
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.currentStudentId = null;
    this.studentForm.reset({
      firstName: '',
      lastName: '',
      dob: '',
      className: '',
      score: 55,
      checkerComment: '',
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.studentForm.patchValue({
        photoPath: file.name,
      });
    }
  }
}

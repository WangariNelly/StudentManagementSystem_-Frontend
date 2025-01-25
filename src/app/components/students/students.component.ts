import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
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
import { AverageScoreComponent } from '../average-score/average-score.component';
import { SelectedStudentsComponent } from '../selected-students/selected-students.component';

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
    ReactiveFormsModule,
    SelectedStudentsComponent,
    AverageScoreComponent,
    
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  selectedStudents: any[] = [];
  studentForm!: FormGroup;
  currentStudentId: number | null = null;
  selectedStudent: Student | null = null;
  isChecker: boolean = false;
  isEditMode: boolean = false;
  // isStatusColumnVisible = false;

  closeModal(): void {
    this.isEditMode = false;
  }
  
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'dob',
    'className',
    'score',
    'actions',

  ];
  data: { roles: string[] } = { roles: ['ADMIN', 'USER'] };
  

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

   const markerChecker = localStorage.getItem("responseData");
   if (markerChecker) {
  const parsedData = JSON.parse(markerChecker);
  this.data = { roles: parsedData.roles };
  console.log(this.data);
} else {
  // this.router.navigate(['/login']);
}
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
      // checkerComment: [''],
      // approvalStatus: ['pending approval'],
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
        // Update student locally and set status to 'pendingApproval'
        const updatedStudent = {
          ...this.studentForm.value,
          approvalStatus: 'pendingApproval',
        };
  
        const index = this.students.findIndex(s => s.studentId === this.currentStudentId);
        if (index !== -1) {
          this.students[index] = { ...this.students[index], ...updatedStudent };
          this.snackBar.open('Student updated locally and marked as pending approval', '', { duration: 3000 });
        } else {
          this.snackBar.open('Failed to update student locally', '', { duration: 3000 });
        }
  
        this.resetForm();
      } else {
        // Add new student
        const newStudent = {
          ...this.studentForm.value,
          approvalStatus: 'pendingApproval', 
        };
  
        this.students.push(newStudent);
        this.snackBar.open('Student added locally', '', { duration: 3000 });
        this.resetForm();
      }
    }
  }
  
  

  // //select students
  // selectStudent(student: any): void {
 
  //   const isAlreadySelected = this.selectedStudents.some(s => s.studentId === student.studentId);
  
  //   if (!isAlreadySelected) {
  //     this.selectedStudents.push({
  //       studentId: student.studentId,
  //       firstName: student.firstName,
  //       lastName: student.lastName,
  //       score: student.score
  //     });
  //   } else {
  //     this.snackBar.open('This student is already selected.', '', { duration: 3000 });
  //   }
  // }

  selectStudent(student: any): void {
    const isAlreadySelected = this.selectedStudents.some(s => s.studentId === student.studentId);
  
    if (!isAlreadySelected) {
      this.selectedStudents = [
        ...this.selectedStudents, // Spread the existing array
        {
          studentId: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName,
          score: student.score
        }
      ];
    } else {
      this.snackBar.open('This student is already selected.', '', { duration: 3000 });
    }
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
  const updatedStudent = { ...student, approvalStatus: 'approved' };
  this.studentDataService.updateStudent(student.studentId, updatedStudent).subscribe({
    next: () => {
      // Update the student's status in the local array
      const index = this.students.findIndex(s => s.studentId === student.studentId);
      if (index !== -1) {
        this.students[index].approvalStatus = 'approved';
      }
      this.snackBar.open('Student approved successfully', '', { duration: 3000 });
    },
    error: () => {
      this.snackBar.open('Failed to approve student', '', { duration: 3000 });
    },
  });
}

rejectStudent(student: Student): void {
  const updatedStudent = { ...student, approvalStatus: 'rejected' };
  this.studentDataService.updateStudent(student.studentId, updatedStudent).subscribe({
    next: () => {
      // Update the student's status in the local array
      const index = this.students.findIndex(s => s.studentId === student.studentId);
      if (index !== -1) {
        this.students[index].approvalStatus = 'rejected';
      }
      this.snackBar.open('Student rejected successfully', '', { duration: 3000 });
    },
    error: () => {
      this.snackBar.open('Failed to reject student', '', { duration: 3000 });
    },
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

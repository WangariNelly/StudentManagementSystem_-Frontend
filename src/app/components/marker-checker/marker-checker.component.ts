import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-marker-checker',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './marker-checker.component.html',
  styleUrls: ['./marker-checker.component.css'],
})
export class MarkerCheckerComponent implements OnInit {
  constructor(private router: Router) {}

  currentUser = { roles: ['CHECKER'] };
  students = [
    { id: 1, firstName: 'John', lastName: 'Doe', score: 85, dob: '2004-02-14', class: 'Class1', approvalStatus: 'pending', editedData: null, rejectionComment: null, photo: 'https://www.w3schools.com/howto/img_avatar.png'  },
    { id: 2, firstName: 'Jane', lastName: 'Smith', score: 72, dob: '2003-11-22', class: 'Class2', approvalStatus: 'approved', editedData: null, rejectionComment: null,  photo: 'https://www.w3schools.com/howto/img_avatar2.png'},
    { id: 3, firstName: 'Alice', lastName: 'Johnson', score: 78, dob: '2001-06-03', class: 'Class3', approvalStatus: 'pending', editedData: null, rejectionComment: null, photo: null  },
    { id: 4, firstName: 'Bob', lastName: 'Brown', score: 65, dob: '2007-04-10', class: 'Class4', approvalStatus: 'pending', editedData: null, rejectionComment: null, photo: null  },
    { id: 5, firstName: 'Charlie', lastName: 'White', score: 58, dob: '2010-07-19', class: 'Class5', approvalStatus: 'rejected', editedData: null, rejectionComment: 'Incomplete data', photo: null  },
    { id: 6, firstName: 'Diana', lastName: 'Prince', score: 61, dob: '2001-01-15', class: 'Class2', approvalStatus: 'approved', editedData: null, rejectionComment: null, photo: null  },
    { id: 7, firstName: 'Edward', lastName: 'Green', score: 75, dob: '2001-09-24', class: 'Class3', approvalStatus: 'pending', editedData: null, rejectionComment: null , photo: null },
    { id: 8, firstName: 'Fiona', lastName: 'Blue', score: 60, dob: '2006-05-08', class: 'Class4', approvalStatus: 'rejected', editedData: null, rejectionComment: 'Incorrect information',  photo: null },
    { id: 9, firstName: 'George', lastName: 'Yellow', score: 88, dob: '2008-12-01', class: 'Class1', approvalStatus: 'pending', editedData: null, rejectionComment: null , photo: null },
    { id: 10, firstName: 'Helen', lastName: 'Black', score: 62, dob: '2010-08-30', class: 'Class2', approvalStatus: 'approved', editedData: null, rejectionComment: null ,  photo: null },
    { id: 11, firstName: 'Ian', lastName: 'Gray', score: 82, dob: '2009-02-13', class: 'Class3', approvalStatus: 'pending', editedData: null, rejectionComment: null , photo: null },
    { id: 12, firstName: 'Jenny', lastName: 'Purple', score: 79, dob: '2010-11-10', class: 'Class4', approvalStatus: 'approved', editedData: null, rejectionComment: null,  photo: null },
    { id: 13, firstName: 'Karen', lastName: 'Violet', score: 67, dob: '2001-03-22', class: 'Class5', approvalStatus: 'pending', editedData: null, rejectionComment: null,  photo: null },
    { id: 14, firstName: 'Leo', lastName: 'Orange', score: 55, dob: '2001-04-04', class: 'Class1', approvalStatus: 'rejected', editedData: null, rejectionComment: 'Insufficient details',  photo: null },
    { id: 15, firstName: 'Mona', lastName: 'Teal', score: 67, dob: '2008-09-14', class: 'Class2', approvalStatus: 'approved', editedData: null, rejectionComment: null , photo: null },
  ];

  editingStudent: any = null;
  rejectionComment: string = '';
  rejectingStudent: any = null;
  viewingEditedStudent: any = null;
  statusFilter: string = 'all';
  selectedFile: File | null = null;

  filteredStudents = [...this.students];

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.filterStudents({ target: { value: 'all' } });
  }

  switchRole(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currentUser.roles = [selectElement.value];
  }

  hasRole(role: string): boolean {
    return this.currentUser.roles.includes(role);
  }

  // Save students to local storage
  saveToLocalStorage(): void {
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  // Load students from local storage
  loadFromLocalStorage(): void {
    const data = localStorage.getItem('students');
    if (data) {
      this.students = JSON.parse(data);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.editingStudent) {
          this.editingStudent.photo = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
      this.saveToLocalStorage();
    }
  }

  filterStudents(event: any) {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.statusFilter = filterValue;

    if (filterValue === 'all') {
      this.filteredStudents = this.students;
    } else {
      this.filteredStudents = this.students.filter(
        (student) => student.approvalStatus === filterValue
      );
    }
  }

  viewEditedData(student: any) {
    if (this.hasRole('CHECKER') && student.editedData) {
      this.viewingEditedStudent = student.editedData;
    }
  }

  cancelView() {
    this.viewingEditedStudent = null;
  }

  showRejectionComment(): boolean {
    return this.rejectingStudent !== null;
  }

  editStudent(student: any) {
    if (this.hasRole('MARKER')) {
      this.editingStudent = { ...student };
    }
  }

  cancelEdit() {
    this.editingStudent = null;
  }

  saveEditedData() {
    const index = this.students.findIndex((s) => s.id === this.editingStudent.id);
    if (index > -1) {
      this.students[index].editedData = { ...this.editingStudent };
    }
    this.saveToLocalStorage();
    this.editingStudent = null;
  }

  approveStudent(student: any) {
    if (this.hasRole('CHECKER')) {
      const index = this.students.findIndex((s) => s.id === student.id);
      if (index > -1) {
        const editedData = this.students[index].editedData || {};
        this.students[index] = {
          ...this.students[index],
          ...editedData,
          approvalStatus: 'approved',
          editedData: null,
          rejectionComment: null,
        };
        this.saveToLocalStorage();
      }
    }
  }

  rejectStudent(student: any) {
    if (this.hasRole('CHECKER')) {
      this.rejectingStudent = student;
      this.rejectionComment = '';
    }
  }

  submitRejection() {
    if (this.rejectingStudent) {
      const index = this.students.findIndex((s) => s.id === this.rejectingStudent.id);
      if (index > -1) {
        this.students[index].approvalStatus = 'rejected';
        this.students[index].rejectionComment = this.rejectionComment;
        this.saveToLocalStorage();
      }
      this.rejectingStudent = null;
      this.rejectionComment = '';
    }
  }

  cancelRejection() {
    this.rejectingStudent = null;
    this.rejectionComment = '';
  }
}

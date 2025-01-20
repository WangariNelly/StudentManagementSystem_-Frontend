import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentManagementService {
  onUpdate(student: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/students';  // Backend API URL

  students: any[] = [];
  page: number = 0;
  pageSize = 5;
  totalRecords = this.students.length;
  // totalPages = this.totalPages;
  size: number = 10;
  studentId: string = '';
  className: string = '';
  startDate: string = '';
  endDate: string = '';
  classOptions: string[] = ['Class1', 'Class2', 'Class3', 'Class4','Class5'];

  constructor(private http: HttpClient, private router: Router,  private snackBar: MatSnackBar, private authService: AuthService ) {}

  /**
   * Fetch students based on filters and pagination.
   */
  getStudents(): void {
    const params = new HttpParams()
      .set('studentId', this.studentId || '')
      .set('className', this.className || '')
      .set('startDate', this.startDate || '')
      .set('endDate', this.endDate || '')
      .set('page', this.page.toString())
      .set('size', this.size.toString());

      // this.students = [
      //   { studentId: '1', firstName: 'John', lastName: 'Doe', className: 'Class1', dob: '2001-03-05', score: 85 },
      //   { studentId: '2', firstName: 'Jane', lastName: 'Smith', className: 'Class2', dob: '2002-07-14', score: 58 },
      //   { studentId: '3', firstName: 'Mike', lastName: 'Johnson', className: 'Class3', dob: '2003-11-25', score: 72 },
      //   { studentId: '4', firstName: 'Emily', lastName: 'Williams', className: 'Class4', dob: '2004-02-17', score: 95 },
      //   { studentId: '5', firstName: 'Daniel', lastName: 'Brown', className: 'Class5', dob: '2005-06-08', score: 65 },
      //   { studentId: '6', firstName: 'Sophia', lastName: 'Jones', className: 'Class1', dob: '2006-04-21', score: 89 },
      //   { studentId: '7', firstName: 'James', lastName: 'Garcia', className: 'Class2', dob: '2007-10-30', score: 78 },
      //   { studentId: '8', firstName: 'Lily', lastName: 'Martinez', className: 'Class3', dob: '2008-05-03', score: 92 },
      //   { studentId: '9', firstName: 'Jack', lastName: 'Hernandez', className: 'Class4', dob: '2009-09-18', score: 88 },
      //   { studentId: '10', firstName: 'Olivia', lastName: 'Lee', className: 'Class5', dob: '2010-01-25', score: 74 },
      //   { studentId: '11', firstName: 'Lucas', lastName: 'Gonzalez', className: 'Class1', dob: '2001-08-12', score: 82 },
      //   { studentId: '12', firstName: 'Charlotte', lastName: 'Perez', className: 'Class2', dob: '2002-01-30', score: 79 },
      //   { studentId: '13', firstName: 'Ethan', lastName: 'Wilson', className: 'Class3', dob: '2003-04-06', score: 90 },
      //   { studentId: '14', firstName: 'Amelia', lastName: 'Anderson', className: 'Class4', dob: '2004-12-15', score: 64 },
      //   { studentId: '15', firstName: 'Aiden', lastName: 'Thomas', className: 'Class5', dob: '2005-07-11', score: 70 },
      //   { studentId: '16', firstName: 'Isabella', lastName: 'Jackson', className: 'Class1', dob: '2006-03-21', score: 91 },
      //   { studentId: '17', firstName: 'Mason', lastName: 'White', className: 'Class2', dob: '2007-11-14', score: 76 },
      //   { studentId: '18', firstName: 'Mia', lastName: 'Harris', className: 'Class3', dob: '2008-02-05', score: 84 },
      //   { studentId: '19', firstName: 'Benjamin', lastName: 'Clark', className: 'Class4', dob: '2009-05-18', score: 68 },
      //   { studentId: '20', firstName: 'Ella', lastName: 'Lewis', className: 'Class5', dob: '2010-09-22', score: 93 }
      // ];
      

    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('Failed to login.Please retry','',{
        horizontalPosition:"right",
        verticalPosition:"top",
        duration: 3000
      });
      return;
    }

    const headers = new HttpHeaders().set('Authorization', ` ${token.trim()}`);

    this.http
      .get<any>(`${this.apiUrl}/report`, { headers, params })
      .pipe(
        map((response) => {
          if (response && response.content) {
            this.students = response.content; 
        this.totalRecords = response.totalElements; 
        this.page = response.number; 
        // this.totalPages = response.totalPages;
          }
          if (Array.isArray(response)) {
            return response;
          }
          throw new Error('Unexpected response structure');
        }),
        catchError((error) => {
         
          return throwError(() => new Error('Failed to fetch students'));
        })
      )
      .subscribe(
        (students) => {
          this.students = students;
        }
        // (error) => {
        //   this.snackBar.open('Fetched','',{
        //     horizontalPosition:"right",
        //     verticalPosition:"top",
        //     duration: 3000
        //   });
        // }
      );
  }

    // Get the students for the current page
    get studentsForPage() {
      const start = this.page * this.pageSize;
      const end = start + this.pageSize;
      return this.students.slice(start, end);
    }
  
    // Navigate to the next page
    nextPage() {
      if ((this.page + 1) * this.pageSize < this.totalRecords) {
        this.page++;
      }
    }
  
    // Navigate to the previous page
    prevPage() {
      if (this.page > 0) {
        this.page--;
      }
    }
  

  /**
   * Delete a student by ID.
   */
  onDelete(studentId: string): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.http
        .delete(`${this.apiUrl}/delete/${studentId}`)
        .pipe(
          catchError((error) => {
            return throwError(() => new Error('Failed to delete student'));
          })
        )
        .subscribe(() => {
          this.snackBar.open('Successfully deleted','',{
            horizontalPosition:"right",
            verticalPosition:"top",
            duration: 3000
          });
          this.getStudents();  
        });
    }
  }


updateStudent(studentId: number, formData: FormData) {
  return this.http.put(`this.apiUrl/${studentId}`, formData);
}



  onPageChange(page: number): void {
    this.page = page;
    this.getStudents(); 
  }
}

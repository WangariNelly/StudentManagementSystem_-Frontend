import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentRecord } from '../interfaces/student-record.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovalStatusService {

  private apiUrl = 'http://localhost:8080/api/students/approvalStatus';

  constructor(private http: HttpClient) {}

  // Fetch filtered student records
  getFilteredRecords(filter: string = 'ALL'): Observable<StudentRecord[]> {
    return this.http.get<StudentRecord[]>(`${this.apiUrl}/filteredRecords?filter=${filter}`);
  }

  // Review a student record (Approve/Reject)
  reviewRecord(studentId: number, isApproved: boolean, comment: string): Observable<string> {
    const reviewRequest = { isApproved, comment };
    return this.http.put<string>(`${this.apiUrl}/${studentId}/review`, reviewRequest);
  }

  // Update student record
  updateRecord(studentId: number, updatedRecord: StudentRecord): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${studentId}/update`, updatedRecord);
  }
}

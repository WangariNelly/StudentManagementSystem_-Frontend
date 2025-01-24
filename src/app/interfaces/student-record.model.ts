// src/app/models/student-record.model.ts

export interface StudentRecord {
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    className: string;
    score: number;
    approvedStatus: string;
    checkerComment?: string;
  }
  
export interface Student {
  isChecker: boolean;
  studentId: number;
  firstName: string;
  lastName: string;
  dob: Date;
  className: string;
  score: number;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  checkerComment?: string;
}
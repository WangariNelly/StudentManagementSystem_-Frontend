import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  constructor() { }
  
    getStudents(): Student[] {
      return [
        { id: 1, name: 'John Doe', score: 85 },
        { id: 2, name: 'Jane Smith', score: 92 },
        { id: 3, name: 'Bob Johnson', score: 78 }
      ];
    }
}

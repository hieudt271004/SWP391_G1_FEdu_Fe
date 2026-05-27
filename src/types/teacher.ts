export interface Subject {
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Classroom {
  classroomId: number;
  classroomCode: string;
  classroomName: string;
  subjectId: number;
  teacherId: number;
  semester?: string;
  year?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClassroomStudent {
  studentId: number;
  classroomId: number;
  enrolledAt?: string;
  status?: string;
  student?: {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
}

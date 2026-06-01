// Khớp chính xác với BE Subject entity JSON response
// subjectId, subjectCode, subjectName, description, isDeleted, createdAt, updatedAt
export interface Subject {
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  description?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubjectRequest {
  subjectCode: string;
  subjectName: string;
  description?: string;
}

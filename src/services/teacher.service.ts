import { apiClient } from './api.client';

// Get subjects by teacher ID
export async function getSubjectsByTeacherAPI(teacherId: number) {
  const response = await apiClient.get(`/teacher/subjects/${teacherId}`);
  return response.data;
}

// Get classrooms by teacher ID
export async function getClassroomsByTeacherAPI(teacherId: number) {
  const response = await apiClient.get(`/teacher/classrooms/${teacherId}`);
  return response.data;
}

// Get classroom details by ID
export async function getClassroomByIdAPI(classroomId: number) {
  const response = await apiClient.get(`/classrooms/${classroomId}`);
  return response.data;
}

// Get students in classroom
export async function getStudentsInClassroomAPI(classroomId: number) {
  const response = await apiClient.get(`/classrooms/${classroomId}/students`);
  return response.data;
}

// Get classrooms by subject
export async function getClassroomsBySubjectAPI(subjectId: number) {
  const response = await apiClient.get(`/classrooms/subject/${subjectId}`);
  return response.data;
}

// Get subject details by ID
export async function getSubjectByIdAPI(subjectId: number) {
  const response = await apiClient.get(`/subjects/${subjectId}`);
  return response.data;
}
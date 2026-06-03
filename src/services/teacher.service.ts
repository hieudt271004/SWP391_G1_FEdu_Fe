import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Get subjects by teacher ID
export async function getSubjectsByTeacherAPI(teacherId: number, token: string) {
  const response = await axios.get(
    `${API_BASE_URL}/teacher/subjects/${teacherId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

// Get classrooms by teacher ID
export async function getClassroomsByTeacherAPI(teacherId: number, token: string) {
  const response = await axios.get(
    `${API_BASE_URL}/teacher/classrooms/${teacherId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

// Get classroom details by ID
export async function getClassroomByIdAPI(classroomId: number, token: string) {
  const response = await axios.get(
    `${API_BASE_URL}/classrooms/${classroomId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

// Get students in classroom
export async function getStudentsInClassroomAPI(classroomId: number, token: string) {
  const response = await axios.get(
    `${API_BASE_URL}/classrooms/${classroomId}/students`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

// Get classrooms by subject
export async function getClassroomsBySubjectAPI(subjectId: number, token: string) {
  const response = await axios.get(
    `${API_BASE_URL}/classrooms/subject/${subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Loader, BookOpen } from 'lucide-react';
import { getClassroomsByTeacherAPI } from '../../../services/teacher.service';
import { Classroom } from '../../../types/teacher';
import { useAuth } from '../../../context/AuthContext';

// Mock data for testing when API returns empty
const MOCK_CLASSROOMS: Classroom[] = [
  { classroomId: 1, classroomCode: 'SE1801', classroomName: 'Software Engineering Class 1', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 2, classroomCode: 'SE1802', classroomName: 'Software Engineering Class 2', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 3, classroomCode: 'SE1803', classroomName: 'Software Engineering Class 3', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 4, classroomCode: 'SE1804', classroomName: 'Software Engineering Class 4', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 5, classroomCode: 'SE1805', classroomName: 'Software Engineering Class 5', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 6, classroomCode: 'SE1806', classroomName: 'Software Engineering Class 6', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
];

export function TeacherSubjectsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (!user?.userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        
        if (!token) {
          setError('Please login again');
          return;
        }

        console.log('Fetching classrooms for teacher ID:', user.userId);
        const response = await getClassroomsByTeacherAPI(user.userId, token);
        const classroomsData = response.data || response;
        console.log('Classrooms data fetched:', classroomsData);
        
        // Fallback to mock data if API returns empty array
        if (Array.isArray(classroomsData) && classroomsData.length === 0) {
          console.log('API returned empty, using mock data');
          setClassrooms(MOCK_CLASSROOMS);
        } else {
          setClassrooms(classroomsData);
        }
      } catch (err: any) {
        console.error('Error fetching classrooms:', err);
        setError(err.response?.data?.message || 'Failed to load classrooms');
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, [user]);

  const handleEnterClass = (classroomId: number) => {
    navigate(`/teacher/classrooms/${classroomId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => navigate('/teacher/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600">
          <BookOpen className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Subjects & Classrooms</h1>
          <p className="text-sm text-gray-500">All classrooms currently assigned to you</p>
        </div>
      </div>

      {classrooms.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-150 shadow-sm">
          <p className="text-gray-500">No classrooms assigned yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Card key={classroom.classroomId} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-indigo-900">{classroom.classroomCode}</CardTitle>
                {classroom.classroomName && (
                  <p className="text-sm text-muted-foreground">{classroom.classroomName}</p>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm text-muted-foreground">
                  {classroom.semester && (
                    <div>Semester: <span className="font-medium text-gray-700">{classroom.semester}</span></div>
                  )}
                  {classroom.year && (
                    <div>Year: <span className="font-medium text-gray-700">{classroom.year}</span></div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-gray-50">
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => handleEnterClass(classroom.classroomId)}
                >
                  Enter Class
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

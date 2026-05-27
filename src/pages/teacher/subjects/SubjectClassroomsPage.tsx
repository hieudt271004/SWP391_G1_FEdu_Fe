import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { ArrowLeft, Loader } from 'lucide-react';
import { getClassroomsBySubjectAPI } from '../../../services/teacher.service';
import { Classroom } from '../../../types/teacher';

// Mock data for testing when API returns empty
const MOCK_CLASSROOMS: Classroom[] = [
  { classroomId: 1, classroomCode: 'SE1801', classroomName: 'Software Engineering Class 1', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 2, classroomCode: 'SE1802', classroomName: 'Software Engineering Class 2', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 3, classroomCode: 'SE1803', classroomName: 'Software Engineering Class 3', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 4, classroomCode: 'SE1804', classroomName: 'Software Engineering Class 4', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 5, classroomCode: 'SE1805', classroomName: 'Software Engineering Class 5', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
  { classroomId: 6, classroomCode: 'SE1806', classroomName: 'Software Engineering Class 6', subjectId: 1, teacherId: 1, semester: 'Spring', year: 2024 },
];

export function SubjectClassroomsPage() {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (!subjectId) return;

      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        
        if (!token) {
          setError('Please login again');
          return;
        }

        const response = await getClassroomsBySubjectAPI(Number(subjectId), token);
        const classroomsData = response.data || response;
        
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
  }, [subjectId]);

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
        <Button variant="outline" size="icon" onClick={() => navigate('/teacher/dashboard')}>
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Classrooms</h1>
      </div>

      {classrooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No classrooms found for this subject</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Card key={classroom.classroomId} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{classroom.classroomCode}</CardTitle>
                {classroom.classroomName && (
                  <p className="text-sm text-muted-foreground">{classroom.classroomName}</p>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm text-muted-foreground">
                  {classroom.semester && (
                    <div>Semester: {classroom.semester}</div>
                  )}
                  {classroom.year && (
                    <div>Year: {classroom.year}</div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
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

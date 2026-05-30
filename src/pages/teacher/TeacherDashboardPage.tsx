import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Users, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getSubjectsByTeacherAPI } from '../../services/teacher.service';
import { Subject } from '../../types/teacher';

interface SubjectWithClasses extends Subject {
  activeClasses?: number;
}

// Mock data for testing when API returns empty
const MOCK_SUBJECTS: SubjectWithClasses[] = [
  {
    subjectId: 1,
    subjectCode: 'SWP391',
    subjectName: 'Software Development Project',
    activeClasses: 3,
  },
  {
    subjectId: 2,
    subjectCode: 'PRJ301',
    subjectName: 'Java Web Application Development',
    activeClasses: 2,
  },
  {
    subjectId: 3,
    subjectCode: 'SWT301',
    subjectName: 'Software Testing',
    activeClasses: 4,
  },
  {
    subjectId: 4,
    subjectCode: 'PRN231',
    subjectName: 'Building Cross-Platform Apps with .NET',
    activeClasses: 2,
  },
  {
    subjectId: 5,
    subjectCode: 'DBI202',
    subjectName: 'Database Management Systems',
    activeClasses: 5,
  },
];

export function TeacherDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<SubjectWithClasses[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      console.log('fetchSubjects called, user:', user);
      
      if (!user?.userId) {
        console.log('No user.userId, setting loading to false');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        console.log('Token:', token ? 'exists' : 'not found');
        
        if (!token) {
          setError('Please login again');
          setLoading(false);
          return;
        }

        console.log('Calling API with teacherId:', user.userId);
        const response = await getSubjectsByTeacherAPI(user.userId, token);
        console.log('API response:', response);
        
        // Xử lý response dựa vào format backend trả về
        const subjectsData = response.data || response;
        console.log('Subjects data:', subjectsData);
        
        // Fallback to mock data if API returns empty array
        if (Array.isArray(subjectsData) && subjectsData.length === 0) {
          console.log('API returned empty, using mock data');
          setSubjects(MOCK_SUBJECTS);
        } else {
          console.log('Using API data');
          setSubjects(subjectsData);
        }
      } catch (err: any) {
        console.error('Error fetching subjects:', err);
        setError(err.response?.data?.message || 'Failed to load subjects');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [user]);

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
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No subjects assigned yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Subjects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card
            key={subject.subjectId}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/teacher/subjects/${subject.subjectId}`)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {subject.subjectCode}
                  </Badge>
                  <CardTitle className="text-base">{subject.subjectName}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4" />
                <span>
                  {subject.activeClasses || 0}{' '}
                  {subject.activeClasses === 1 ? 'Active Class' : 'Active Classes'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

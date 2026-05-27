import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Progress } from '../../../components/ui/progress';
import { ArrowLeft, CheckCircle2, Circle, Settings, Loader } from 'lucide-react';
import { getClassroomByIdAPI, getStudentsInClassroomAPI } from '../../../services/teacher.service';

interface Student {
  id: string;
  fullName: string;
  progress: number;
}

interface Milestone {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
}

// Mock data
const MOCK_STUDENTS: Student[] = [
  { id: 'HE190001', fullName: 'Nguyen Van An', progress: 85 },
  { id: 'HE190002', fullName: 'Tran Thi Binh', progress: 92 },
  { id: 'HE190003', fullName: 'Le Van Cuong', progress: 78 },
  { id: 'HE190004', fullName: 'Pham Thi Dung', progress: 95 },
  { id: 'HE190005', fullName: 'Hoang Van Minh', progress: 65 },
  { id: 'HE190006', fullName: 'Vu Thi Hoa', progress: 88 },
  { id: 'HE190007', fullName: 'Do Van Khoa', progress: 73 },
  { id: 'HE190008', fullName: 'Bui Thi Lan', progress: 90 },
  { id: 'HE190009', fullName: 'Truong Van Nam', progress: 82 },
  { id: 'HE190010', fullName: 'Ngo Thi Oanh', progress: 70 },
];

const MOCK_MILESTONES: Milestone[] = [
  { id: 1, title: 'Module 1: Introduction', status: 'completed' },
  { id: 2, title: 'Module 2: Requirements', status: 'completed' },
  { id: 3, title: 'Module 3: Design', status: 'current' },
  { id: 4, title: 'Module 4: Implementation', status: 'upcoming' },
  { id: 5, title: 'Module 5: Testing', status: 'upcoming' },
  { id: 6, title: 'Module 6: Deployment', status: 'upcoming' },
];

export function ClassOverviewPage() {
  const navigate = useNavigate();
  const { classroomId } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [classInfo, setClassInfo] = useState({ classCode: '', courseCode: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const milestones: Milestone[] = MOCK_MILESTONES;

  useEffect(() => {
    const fetchClassroomData = async () => {
      if (!classroomId) return;

      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        
        if (!token) {
          setError('Please login again');
          return;
        }

        // Fetch classroom details and students list in parallel
        const [classResponse, studentsResponse] = await Promise.all([
          getClassroomByIdAPI(Number(classroomId), token),
          getStudentsInClassroomAPI(Number(classroomId), token)
        ]);

        const classData = classResponse.data || classResponse;
        setClassInfo({
          classCode: classData.classroomCode || 'N/A',
          courseCode: classData.subjectCode || `SUBJ${classData.subjectId || ''}` || 'SWP391',
        });

        const studentsData = studentsResponse.data || studentsResponse;
        console.log('Students fetched for class:', studentsData);

        if (Array.isArray(studentsData) && studentsData.length > 0) {
          const formatted = studentsData.map((item: any) => ({
            id: item.student?.email?.split('@')[0].toUpperCase() || `ST${item.studentId}`,
            fullName: item.student ? `${item.student.lastName} ${item.student.firstName}` : `Student ${item.studentId}`,
            progress: Math.floor(Math.random() * 30) + 70, // progress mock value
          }));
          setStudents(formatted);
        } else {
          console.log('No students found from API, using mock data');
          setStudents(MOCK_STUDENTS);
        }
      } catch (err: any) {
        console.error('Error loading classroom overview:', err);
        setError(err.response?.data?.message || 'Failed to load classroom data');
      } finally {
        setLoading(false);
      }
    };

    fetchClassroomData();
  }, [classroomId]);

  const getMilestoneColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-600';
      case 'current':
        return 'text-blue-600 bg-blue-50 border-blue-600';
      case 'upcoming':
        return 'text-muted-foreground bg-muted border-muted-foreground/30';
    }
  };

  const getMilestoneIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="size-5" />;
      case 'current':
        return <Circle className="size-5 fill-current" />;
      case 'upcoming':
        return <Circle className="size-5" />;
    }
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
        <Button onClick={() => navigate('/teacher/subjects')}>
          Back to Subjects
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="size-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Class {classInfo.classCode} - {classInfo.courseCode}
          </h1>
        </div>
        <Button onClick={() => navigate(`/teacher/classrooms/${classroomId}/manage`)}>
          <Settings className="size-4" />
          Manage Class
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Class Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-1">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  {index < milestones.length - 1 && (
                    <div
                      className={`absolute left-6 top-12 w-0.5 h-8 ${
                        milestone.status === 'completed'
                          ? 'bg-green-600'
                          : 'bg-muted-foreground/30'
                      }`}
                    />
                  )}

                  <div className="flex items-start gap-4 relative">
                    <div
                      className={`flex items-center justify-center size-12 rounded-full border-2 shrink-0 ${getMilestoneColor(
                        milestone.status
                      )}`}
                    >
                      {getMilestoneIcon(milestone.status)}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3
                        className={`font-medium ${
                          milestone.status === 'upcoming'
                            ? 'text-muted-foreground'
                            : 'text-foreground'
                        }`}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {milestone.status === 'completed' && 'Completed'}
                        {milestone.status === 'current' && 'In Progress'}
                        {milestone.status === 'upcoming' && 'Upcoming'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.fullName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress value={student.progress} className="flex-1" />
                        <span className="text-sm text-muted-foreground min-w-[3ch] text-right">
                          {student.progress}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

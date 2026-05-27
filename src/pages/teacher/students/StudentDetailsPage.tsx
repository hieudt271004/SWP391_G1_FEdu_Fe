import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Plus,
  User,
  BookOpen,
  TrendingUp,
  Award,
  AlertTriangle,
} from 'lucide-react';

interface RoadmapNode {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'custom';
  isCustom?: boolean;
  branchFromId?: number;
}

const studentData: Record<string, { fullName: string; grade: string; gpa: number; attendance: number; submittedMilestones: number; totalMilestones: number }> = {
  HE190001: {
    fullName: 'Nguyen Van An',
    grade: 'C+',
    gpa: 2.4,
    attendance: 72,
    submittedMilestones: 3,
    totalMilestones: 6,
  },
};

const defaultStudent = {
  fullName: 'Student',
  grade: 'B',
  gpa: 3.0,
  attendance: 85,
  submittedMilestones: 4,
  totalMilestones: 6,
};

export function StudentDetailsPage() {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const student = studentData[studentId || ''] ?? { ...defaultStudent, fullName: studentId || 'Student' };

  const [nodes, setNodes] = useState<RoadmapNode[]>([
    { id: 1, title: 'Module 1: Introduction', description: 'Project overview and team formation', status: 'completed' },
    { id: 2, title: 'Module 2: Requirements', description: 'Requirements gathering and user stories', status: 'completed' },
    { id: 3, title: 'Module 3: Design', description: 'System architecture and database design', status: 'completed' },
    {
      id: 101,
      title: 'Remedial: System Design Review',
      description: 'Extra session: ER diagrams, normalization, and architecture patterns',
      status: 'custom',
      isCustom: true,
      branchFromId: 3,
    },
    { id: 4, title: 'Module 4: Implementation', description: 'Core feature development', status: 'current' },
    { id: 5, title: 'Module 5: Testing', description: 'Unit and integration testing', status: 'upcoming' },
    { id: 6, title: 'Module 6: Deployment', description: 'CI/CD pipeline and final presentation', status: 'upcoming' },
  ]);

  const handleAddNode = () => {
    const newId = Date.now();
    const newNode: RoadmapNode = {
      id: newId,
      title: 'Custom Branching Module',
      description: 'Teacher-created remedial or enrichment task',
      status: 'custom',
      isCustom: true,
      branchFromId: 3,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const getNodeStyle = (status: RoadmapNode['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50 text-green-600';
      case 'current':
        return 'border-blue-500 bg-blue-50 text-blue-600';
      case 'custom':
        return 'border-amber-500 bg-amber-50 text-amber-600';
      default:
        return 'border-muted-foreground/30 bg-muted text-muted-foreground';
    }
  };

  const getNodeIcon = (status: RoadmapNode['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="size-5 text-green-500" />;
      case 'current':
        return <Circle className="size-5 fill-current text-blue-500" />;
      case 'custom':
        return <Plus className="size-5 text-amber-500" />;
      default:
        return <Circle className="size-5 text-muted-foreground" />;
    }
  };

  const getLineColor = (status: RoadmapNode['status']) => {
    if (status === 'completed') return 'bg-green-400';
    if (status === 'custom') return 'bg-amber-300';
    return 'bg-muted-foreground/30';
  };

  const gradeColor =
    student.gpa >= 3.5
      ? 'text-green-600'
      : student.gpa >= 2.5
      ? 'text-yellow-600'
      : 'text-red-600';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="text-2xl font-semibold">
          Student Profile – {studentId} ({student.fullName})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Academic Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary shrink-0">
                  <User className="size-8" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{student.fullName}</p>
                  <p className="text-sm text-muted-foreground">{studentId}</p>
                  <Badge variant="outline" className="mt-1">SE1801 – SWP391</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                    <Award className="size-3" /> Current Grade
                  </p>
                  <p className={`text-4xl font-bold ${gradeColor}`}>{student.grade}</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                    <TrendingUp className="size-3" /> GPA
                  </p>
                  <p className={`text-4xl font-bold ${gradeColor}`}>{student.gpa.toFixed(1)}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Attendance Rate</span>
                  <span className={`font-medium ${student.attendance >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                    {student.attendance}%
                  </span>
                </div>
                <Progress value={student.attendance} />
                {student.attendance < 80 && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertTriangle className="size-3" /> Below minimum 80% attendance requirement
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <BookOpen className="size-3" /> Milestones Submitted
                  </span>
                  <span className="font-medium">
                    {student.submittedMilestones}/{student.totalMilestones}
                  </span>
                </div>
                <Progress
                  value={(student.submittedMilestones / student.totalMilestones) * 100}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Custom Student Roadmap</CardTitle>
              <Button
                onClick={handleAddNode}
                className="bg-amber-500 hover:bg-amber-600 text-white shadow-md"
              >
                + Add Node
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Personalized learning path for {student.fullName}. Amber nodes are teacher-created custom branches.
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-0">
              {nodes
                .filter((n) => !n.branchFromId)
                .map((node, index, mainNodes) => {
                  const branches = nodes.filter((n) => n.branchFromId === node.id);
                  const isLastMain = index === mainNodes.length - 1;

                  return (
                    <div key={node.id} className="relative">
                      {!isLastMain && (
                        <div
                          className={`absolute left-[19px] top-[40px] bottom-[-8px] w-0.5 z-0 ${getLineColor(
                            node.status
                          )}`}
                        />
                      )}

                      <div className="flex items-start gap-4 relative py-2 z-10">
                        <div
                          className={`flex items-center justify-center size-10 rounded-full border-2 shrink-0 bg-card ${getNodeStyle(
                            node.status
                          )}`}
                        >
                          {getNodeIcon(node.status)}
                        </div>

                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3
                              className={`font-medium ${
                                node.status === 'upcoming'
                                  ? 'text-muted-foreground'
                                  : 'text-foreground'
                              }`}
                            >
                              {node.title}
                            </h3>
                            {node.isCustom && (
                              <Badge
                                variant="outline"
                                className="text-xs border-amber-400 text-amber-600 bg-amber-50"
                              >
                                Custom
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {node.description}
                          </p>
                        </div>
                      </div>

                      {branches.length > 0 && (
                        <div className="relative pl-[60px] py-2">
                          <div className="absolute left-[19px] top-[-16px] w-[41px] h-[44px] border-l-2 border-b-2 rounded-bl-xl border-amber-300 z-0" />
                          
                          <div className="space-y-4 relative z-10">
                            {branches.map((branch) => (
                              <div
                                key={branch.id}
                                className="flex items-start gap-4 relative"
                              >
                                <div
                                  className={`flex items-center justify-center size-10 rounded-full border-2 shrink-0 bg-card ${getNodeStyle(
                                    branch.status
                                  )}`}
                                >
                                  {getNodeIcon(branch.status)}
                                </div>
                                <div className="flex-1 pt-0.5">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-medium">{branch.title}</h3>
                                    {branch.isCustom && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs border-amber-400 text-amber-600 bg-amber-50"
                                      >
                                        Custom
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {branch.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

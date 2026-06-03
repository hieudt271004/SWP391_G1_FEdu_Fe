import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { ArrowLeft, Plus, Edit, Trash2, Users, ChevronRight } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
}

interface ClassData {
  id: number;
  classCode: string;
  studentCount: number;
}

export function CourseOverviewPage() {
  const navigate = useNavigate();

  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
    1: true, // Keep module 1 expanded by default
  });

  const toggleModule = (id: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const courseData = {
    code: 'SWP391',
    name: 'Software Development Project',
  };

  const modules: Module[] = [
    { id: 1, title: 'Module 1: Introduction', description: 'Project overview, team formation, and tool setup' },
    { id: 2, title: 'Module 2: Requirements', description: 'Requirements gathering, user stories, and backlog' },
    { id: 3, title: 'Module 3: Design', description: 'System architecture, database design, and UI/UX' },
    { id: 4, title: 'Module 4: Implementation', description: 'Core feature development and code reviews' },
    { id: 5, title: 'Module 5: Testing', description: 'Unit testing, integration testing, and QA' },
    { id: 6, title: 'Module 6: Deployment', description: 'CI/CD pipeline, deployment, and final presentation' },
  ];

  const classes: ClassData[] = [
    { id: 1, classCode: 'SE1801', studentCount: 30 },
    { id: 2, classCode: 'SE1802', studentCount: 28 },
    { id: 3, classCode: 'SE1803', studentCount: 32 },
    { id: 4, classCode: 'SE1804', studentCount: 25 },
    { id: 5, classCode: 'SE1805', studentCount: 29 },
    { id: 6, classCode: 'SE1806', studentCount: 31 },
  ];

  const handleAddModule = () => {
    console.log('Adding new module');
  };

  const handleEditModule = (moduleId: number) => {
    console.log('Editing module:', moduleId);
  };

  const handleDeleteModule = (moduleId: number) => {
    console.log('Deleting module:', moduleId);
  };

  const handleEnterClass = (classId: number) => {
    navigate(`/teacher/classes/${classId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/teacher/dashboard')}>
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="text-2xl font-semibold">
          {courseData.code} - Course Overview &amp; Classes
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Base Course Roadmap</CardTitle>
              <Button onClick={handleAddModule}>
                <Plus className="size-4" />
                Add New Module
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden divide-y divide-border shadow-sm">
              {modules.map((module) => {
                const isExpanded = !!expandedModules[module.id];

                return (
                  <div
                    key={module.id}
                    className="transition-all duration-200 hover:bg-muted/5 border-l-4 border-l-primary/60"
                  >
                    {/* Header */}
                    <div
                      onClick={() => toggleModule(module.id)}
                      className="flex items-center justify-between p-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`p-1 rounded transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-90' : ''}`}>
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-sm text-foreground">
                            {module.title}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] ml-4 bg-primary/5 text-primary shrink-0 border-primary/20">
                        Module {module.id}
                      </Badge>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 bg-muted/5 border-t border-muted/20 space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {module.description}
                        </p>
                        <div className="flex gap-2 pt-1 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            className="size-8 p-0"
                            onClick={() => handleEditModule(module.id)}
                            title="Edit module"
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="size-8 p-0 text-destructive border-destructive/20 hover:border-destructive hover:bg-destructive/5"
                            onClick={() => handleDeleteModule(module.id)}
                            title="Delete module"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{classItem.classCode}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="size-4" />
                    <span className="text-sm">
                      {classItem.studentCount}{' '}
                      {classItem.studentCount === 1 ? 'Student' : 'Students'}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleEnterClass(classItem.id)}
                  >
                    Enter Class
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

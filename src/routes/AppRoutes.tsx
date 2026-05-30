import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { StudentLayout } from '../components/layout/StudentLayout';
import { TeacherLayout } from '../components/layout/TeacherLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { RoleRoute } from './RoleRoute';
import { HomePage } from '../pages/home/HomePage';
import { LoginPage } from '../pages/auth/login/LoginPage';
import { RegisterPage } from '../pages/auth/register/RegisterPage';
import { ForgotPassword } from '../pages/auth/forgot/ForgotPassword';
import { ForgotSuccess } from '../pages/auth/forgot/ForgotSuccess';
import { GoogleAuthPage } from '../pages/auth/google/GoogleAuthPage';
import { ResetPasswordPage } from '../pages/auth/reset/ResetPasswordPage';
import { ResetSuccessPage } from '../pages/auth/reset/ResetSuccessPage';
import { TermsPage } from '../pages/auth/terms/TermsPage';
import { PrivacyPage } from '../pages/auth/privacy/PrivacyPage';
import { GuestOnlyRoute } from './GuestOnlyRoute';
import { useAuth } from '../context/AuthContext';
import { getRedirectPathAfterLogin } from './redirectAfterLogin';

// Teacher pages
import { TeacherDashboardPage } from '../pages/teacher/TeacherDashboardPage';
import { TeacherSubjectsPage } from '../pages/teacher/subjects/TeacherSubjectsPage';
import { SubjectClassroomsPage } from '../pages/teacher/subjects/SubjectClassroomsPage';
import { ClassOverviewPage } from '../pages/teacher/classes/ClassOverviewPage';
import { ClassManagementPage } from '../pages/teacher/classes/ClassManagementPage';
import { StudentDetailsPage } from '../pages/teacher/students/StudentDetailsPage';

// Student pages
import { StudentMilestoneSubmissionPage } from '../pages/student/milestones/StudentMilestoneSubmissionPage';

// Shared pages
import { ProfileEditPage } from '../pages/profile/ProfileEditPage';

function NotFoundRedirect() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if(isLoading) return <div className="min-h-screen"/>;
  return <Navigate to={isAuthenticated && user ? getRedirectPathAfterLogin(user) : "/"} replace />;
}

// Teacher pages
import { TeacherDashboardPage } from '../pages/teacher/TeacherDashboardPage';
import { TeacherSubjectsPage } from '../pages/teacher/subjects/TeacherSubjectsPage';
import { SubjectClassroomsPage } from '../pages/teacher/subjects/SubjectClassroomsPage';
import { ClassOverviewPage } from '../pages/teacher/classes/ClassOverviewPage';
import { ClassManagementPage } from '../pages/teacher/classes/ClassManagementPage';
import { StudentDetailsPage } from '../pages/teacher/students/StudentDetailsPage';

// Student pages
import { StudentMilestoneSubmissionPage } from '../pages/student/milestones/StudentMilestoneSubmissionPage';

// Shared pages
import { ProfileEditPage } from '../pages/profile/ProfileEditPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<GuestOnlyRoute><LoginPage /></GuestOnlyRoute>} />
        <Route path="/register" element={<GuestOnlyRoute><RegisterPage /></GuestOnlyRoute>} />
        <Route path="/forgot-password" element={<GuestOnlyRoute><ForgotPassword /></GuestOnlyRoute>} />
        <Route path="/forgot-success" element={<GuestOnlyRoute><ForgotSuccess /></GuestOnlyRoute>} />
        <Route path="/google-login" element={<GuestOnlyRoute><GoogleAuthPage /></GuestOnlyRoute>} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-success" element={<ResetSuccessPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Route>

      {/* Student + Sub-mentor chia chung 1 layout */}
      <Route
        element={
          <RoleRoute allowedRoles={['STUDENT', 'SUB_MENTOR']}>
            <StudentLayout />
          </RoleRoute>
        }
      >
        <Route path="/student/dashboard" element={<div>Student Dashboard placeholder</div>} />
        <Route path="/student/courses" element={<div>My Courses placeholder</div>} />
        <Route path="/student/submissions" element={<div>Submissions placeholder</div>} />
        <Route path="/student/progress" element={<div>Progress placeholder</div>} />
        <Route path="/student/milestones/:milestoneId" element={<StudentMilestoneSubmissionPage />} />
        <Route path="/student/profile" element={<ProfileEditPage />} />

        {/* Routes chỉ Sub-mentor mới vào được */}
        <Route
          path="/student/sub-mentor/dashboard"
          element={
            <RoleRoute allowedRoles={['SUB_MENTOR']}>
              <div>Sub-Mentor Dashboard placeholder</div>
            </RoleRoute>
          }
        />
        <Route
          path="/student/sub-mentor/mentees"
          element={
            <RoleRoute allowedRoles={['SUB_MENTOR']}>
              <div>Sub-Mentor Mentees placeholder</div>
            </RoleRoute>
          }
        />
      </Route>

      <Route
        element={
          <RoleRoute allowedRoles={['TEACHER']}>
            <TeacherLayout />
          </RoleRoute>
        }
      >
        <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
        <Route path="/teacher/subjects" element={<TeacherSubjectsPage />} />
        <Route path="/teacher/subjects/:subjectId" element={<SubjectClassroomsPage />} />
        <Route path="/teacher/classrooms/:classroomId" element={<ClassOverviewPage />} />
        <Route path="/teacher/classrooms/:classroomId/manage" element={<ClassManagementPage />} />
        <Route path="/teacher/students/:studentId" element={<StudentDetailsPage />} />
        <Route path="/teacher/profile" element={<ProfileEditPage />} />
      </Route>

      <Route
        element={
          <RoleRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </RoleRoute>
        }
      >
        <Route path="/admin/dashboard" element={<div>Admin Dashboard placeholder</div>} />
      </Route>

      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  );
}
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { StudentLayout } from '../components/layout/StudentLayout';
import { TeacherLayout } from '../components/layout/TeacherLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { SubMentorLayout } from '../components/layout/SubMentorLayout';
import { ProtectedRoute } from './ProtectedRoute';
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

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-success" element={<ForgotSuccess />} />
        <Route path="/google-login" element={<GoogleAuthPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-success" element={<ResetSuccessPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Route>

      <Route
        element={
          <RoleRoute allowedRoles={['STUDENT']}>
            <StudentLayout />
          </RoleRoute>
        }
      >
        <Route path="/student/dashboard" element={<div>Student Dashboard placeholder</div>} />
      </Route>

      <Route
        element={
          <RoleRoute allowedRoles={['TEACHER']}>
            <TeacherLayout />
          </RoleRoute>
        }
      >
        <Route path="/teacher/dashboard" element={<div>Teacher Dashboard placeholder</div>} />
      </Route>

      <Route
        element={
          <RoleRoute allowedRoles={['SUB_MENTOR']}>
            <SubMentorLayout />
          </RoleRoute>
        }
      >
        <Route path="/sub-mentor/dashboard" element={<div>Sub-Mentor Dashboard placeholder</div>} />
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, GraduationCap, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getFullName, getInitials } from '../../utils/userHelpers';

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Tổng quan', path: '/admin/dashboard' },
    { icon: Users, label: 'Người dùng', path: '/admin/users' },
    { icon: BookOpen, label: 'Khóa học', path: '/admin/courses' },
    { icon: GraduationCap, label: 'Lớp học', path: '/admin/classes' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin/users') {
      return location.pathname.startsWith('/admin/users');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                F<span className="text-indigo-400">Edu</span>
              </div>
              <div className="text-xs text-slate-500">Admin Portal</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer border-0 ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10 font-bold'
                    : 'hover:bg-slate-800 hover:text-white font-medium'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
              <span className="text-indigo-400 font-semibold text-sm">
                {getInitials(user)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">
                {getFullName(user) || 'Administrator'}
              </div>
              <div className="text-xs text-slate-500 truncate">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-sm text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors border border-rose-950/50 hover:border-rose-900 cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
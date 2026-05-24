import { Outlet } from 'react-router-dom';

export function TeacherLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-emerald-900 text-white p-4">
        <div className="text-lg font-bold mb-6">FEdu Teacher</div>
        <p className="text-sm text-emerald-200">Sidebar placeholder</p>
      </aside>

      <main className="flex-1 p-6 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
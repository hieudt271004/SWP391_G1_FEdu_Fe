import { Outlet } from 'react-router-dom';

export function StudentLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar sẽ thêm sau */}
      <aside className="w-64 bg-slate-900 text-white p-4">
        <div className="text-lg font-bold mb-6">FEdu Student</div>
        {/* nav links */}
        <p className="text-sm text-slate-400">Sidebar placeholder</p>
      </aside>

      <main className="flex-1 p-6 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
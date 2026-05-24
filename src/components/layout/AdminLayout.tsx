import { Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-rose-900 text-white p-4">
        <div className="text-lg font-bold mb-6">FEdu Admin</div>
        <p className="text-sm text-rose-200">Sidebar placeholder</p>
      </aside>

      <main className="flex-1 p-6 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
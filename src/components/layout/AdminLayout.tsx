import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard, path: "/admin/dashboard" },
  { id: "users", label: "Quản lý Người dùng", icon: Users, path: "/admin/users" },
  { id: "courses", label: "Quản lý Khóa học", icon: BookOpen, path: "/admin/courses" },
  { id: "classes", label: "Quản lý Lớp học", icon: GraduationCap, path: "/admin/classes" },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/login");
  };

  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
    : "Admin";

  const initials = user
    ? ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase() || "A"
    : "A";

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#f8fafc" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          backgroundColor: "white",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "#e5e7eb" }}>
          <NavLink
            to="/admin/dashboard"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            style={{ textDecoration: "none" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#5b21b6" }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#111827" }}>
              FEdu Learning
            </span>
          </NavLink>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" style={{ color: "#6b7280" }} />
          </button>
        </div>

        {/* Menu items */}
        <nav className="px-3 py-4">
          {/* MAIN MENU label */}
          <div className="px-3 mb-3">
            <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.05em" }}>
              MENU CHÍNH
            </span>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#f3e8ff" : "transparent",
                    color: isActive ? "#5b21b6" : "#6b7280",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.9375rem",
                    textDecoration: "none",
                  })}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="shrink-0 px-6 py-4 border-b"
          style={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile menu + Search */}
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" style={{ color: "#6b7280" }} />
              </button>

              <div
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full max-w-md flex-1"
                style={{ backgroundColor: "#f3f4f6", border: "1px solid #e5e7eb" }}
              >
                <Search className="w-4 h-4 shrink-0" style={{ color: "#9ca3af" }} />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "#111827" }}
                />
              </div>
            </div>

            {/* Right: Notifications + Avatar Dropdown */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" style={{ color: "#6b7280" }} />
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#ef4444" }}
                />
              </button>

              <div className="relative pl-3 border-l" style={{ borderColor: "#e5e7eb" }} ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#5b21b6" }}
                  >
                    <span className="text-white text-sm font-semibold">
                      {initials}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>
                      {displayName}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>Quản trị viên</div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    style={{ color: "#6b7280" }}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-lg overflow-hidden z-50"
                    style={{ backgroundColor: "white", border: "1px solid #e5e7eb" }}
                  >
                    {/* User Info */}
                    <div className="p-4 border-b" style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#5b21b6" }}
                        >
                          <span className="text-white text-lg font-semibold">
                            {initials}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>
                            {displayName}
                          </div>
                          <div
                            className="truncate"
                            style={{ fontSize: "0.75rem", color: "#6b7280" }}
                          >
                            {user?.email || "admin@fedu.vn"}
                          </div>
                        </div>
                      </div>
                      <div
                        className="inline-flex items-center px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#f3e8ff", fontSize: "0.6875rem", color: "#5b21b6", fontWeight: 600 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: "#5b21b6" }} />
                        Quản trị viên
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        style={{ color: "#374151", fontSize: "0.875rem" }}
                      >
                        <UserCircle className="w-4 h-4" style={{ color: "#6b7280" }} />
                        Thông tin cá nhân
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors"
                        style={{ color: "#dc2626", fontSize: "0.875rem" }}
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
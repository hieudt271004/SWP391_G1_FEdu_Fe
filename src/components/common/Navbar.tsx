import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserMenu } from "./UserMenu";

const NAV_LINKS = [
  { label: "Về FEdu", href: "#about" },
  { label: "Tính năng", href: "#features" },
  { label: "Liên hệ", href: "#contact" },
];

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-700 to-violet-600">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-extrabold text-gray-900 tracking-tight">
            F<span className="text-indigo-700">Edu</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-lg text-gray-700 text-[15px] hover:bg-gray-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-xl text-gray-700 text-[15px] font-medium hover:bg-gray-100 transition-colors"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-xl text-white text-[15px] font-medium bg-gradient-to-br from-indigo-700 to-violet-600 hover:opacity-90 transition-opacity"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 space-y-1 border-t border-gray-100">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-left px-4 py-2.5 rounded-lg text-gray-700 text-[15px] hover:bg-gray-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-[15px]"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full py-2.5 rounded-xl text-white text-[15px] bg-gradient-to-br from-indigo-700 to-violet-600"
                >
                  Đăng ký
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
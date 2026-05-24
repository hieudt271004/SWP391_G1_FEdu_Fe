import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/StatsSection";
import { AboutSection } from "./components/AboutSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { CTASection } from "./components/CTASection";

export function HomePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ─── Authenticated view (placeholder, sẽ refactor sau) ───
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chào mừng, {user.firstName} {user.lastName}! 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Đăng nhập thành công. Đây là trang home tạm — dashboard chính thức sẽ được phát triển sau.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm space-y-1.5">
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p>
              <span className="font-medium">Roles:</span>{" "}
              {user.roles.map((role) => (
                <span key={role} className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium mr-1">
                  {role}
                </span>
              ))}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  // ─── Guest view (landing page) ───
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
      {/* Stats, About, Features, CTA sẽ thêm ở các bước sau */}
    </>
  );
}
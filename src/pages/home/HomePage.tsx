import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");
  const userId =
    localStorage.getItem("userId") ||
    sessionStorage.getItem("userId");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Chào mừng đến FEdu! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Đăng nhập thành công. Đây là trang home tạm — dashboard chính thức sẽ được phát triển sau.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
          <p className="text-gray-700 mb-1">
            <span className="font-medium">User ID:</span> {userId || "N/A"}
          </p>
          <p className="text-gray-700 break-all">
            <span className="font-medium">Access Token:</span>{" "}
            <span className="font-mono text-xs">
              {accessToken ? `${accessToken.substring(0, 40)}...` : "N/A"}
            </span>
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
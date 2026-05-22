import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./pages/auth";
import { HomePage } from "./pages/home/HomePage";

// Component chặn truy cập trang yêu cầu login khi chưa có token
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token =
   localStorage.getItem("accessToken") ||
   sessionStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/reset-password" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useState } from "react";
import { Eye, EyeOff, BookOpen, Mail, Lock, User, ArrowLeft, CheckCircle } from "lucide-react";

type Screen = "login" | "register" | "forgot" | "forgot-success";

export function LoginPage() {
  const [screen, setScreen] = useState<Screen>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const leftPanel = (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzJTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzc4ODE3NTkyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Students learning"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 to-purple-700/80" />
      <div className="absolute inset-0 flex flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-white" style={{ fontSize: "1.25rem", fontWeight: 700 }}>FEdu Learning</span>
        </div>
        <div>
          <h2 className="text-white mb-4" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.2 }}>
            Học tập không giới hạn,<br />thành công không có điểm dừng
          </h2>
          <p className="text-indigo-100" style={{ fontSize: "1rem" }}>
            Hơn 10.000+ khóa học từ các chuyên gia hàng đầu đang chờ bạn khám phá.
          </p>
          <div className="flex gap-6 mt-8">
            {[["10K+", "Khóa học"], ["500K+", "Học viên"], ["98%", "Hài lòng"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{num}</div>
                <div className="text-indigo-200" style={{ fontSize: "0.875rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── LOGIN ────────────────────────────────────────────────────────────────
  if (screen === "login") {
    return (
      <div className="flex h-screen w-full">
        {leftPanel}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#4338ca" }}>EduLearn</span>
            </div>

            <h1 className="mb-2" style={{ color: "#111827" }}>Chào mừng trở lại!</h1>
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Đăng nhập để tiếp tục hành trình học tập của bạn.</p>

            <div className="mt-8 space-y-5">
              <div>
                <label style={{ color: "#374151", fontSize: "0.875rem" }}>Email</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none"
                    style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb", fontSize: "0.9375rem" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label style={{ color: "#374151", fontSize: "0.875rem" }}>Mật khẩu</label>
                  <button
                    onClick={() => setScreen("forgot")}
                    style={{ color: "#4338ca", fontSize: "0.8125rem", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border outline-none"
                    style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb", fontSize: "0.9375rem" }}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded" style={{ accentColor: "#4338ca" }} />
                <label htmlFor="remember" style={{ color: "#6b7280", fontSize: "0.875rem", fontWeight: 400 }}>Ghi nhớ đăng nhập</label>
              </div>

              <button
                className="w-full py-3 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4338ca, #7c3aed)", border: "none", cursor: "pointer" }}
              >
                Đăng nhập
              </button>

              <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
                <span style={{ color: "#9ca3af", fontSize: "0.8125rem" }}>hoặc tiếp tục với</span>
                <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[{ name: "Google", color: "#ea4335" }, { name: "Facebook", color: "#1877f2" }].map(({ name, color }) => (
                  <button
                    key={name}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#e5e7eb", background: "white", cursor: "pointer" }}
                  >
                    <span style={{ color, fontWeight: 700, fontSize: "0.875rem" }}>{name[0]}</span>
                    <span style={{ color: "#374151", fontSize: "0.875rem" }}>{name}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center mt-6" style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              Chưa có tài khoản?{" "}
              <button
                onClick={() => setScreen("register")}
                style={{ color: "#4338ca", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── REGISTER ─────────────────────────────────────────────────────────────
  if (screen === "register") {
    return (
      <div className="flex h-screen w-full">
        {leftPanel}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
          <div className="w-full max-w-md py-8">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#4338ca" }}>EduLearn</span>
            </div>

            <button
              onClick={() => setScreen("login")}
              className="flex items-center gap-1.5 mb-6"
              style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
            </button>

            <h1 className="mb-2" style={{ color: "#111827" }}>Tạo tài khoản</h1>
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Đăng ký miễn phí và bắt đầu học ngay hôm nay!</p>

            <div className="mt-8 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ color: "#374151", fontSize: "0.875rem" }}>Họ</label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                    <input
                      type="text"
                      placeholder="Nguyễn"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none"
                      style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb", fontSize: "0.9375rem" }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ color: "#374151", fontSize: "0.875rem" }}>Tên</label>
                  <div className="relative mt-1.5">
                    <input
                      type="text"
                      placeholder="Văn A"
                      className="w-full px-4 py-3 rounded-xl border outline-none"
                      style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb", fontSize: "0.9375rem" }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ color: "#374151", fontSize: "0.875rem" }}>Email</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none"
                    style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb", fontSize: "0.9375rem" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: "#374151", fontSize: "0.875rem" }}>Mật khẩu</label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Tối thiểu 8 ký tự"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border outline-none"
                    style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb", fontSize: "0.9375rem" }}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ color: "#374151", fontSize: "0.875rem" }}>Xác nhận mật khẩu</label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border outline-none"
                    style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb", fontSize: "0.9375rem" }}
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded" style={{ accentColor: "#4338ca" }} />
                <label htmlFor="terms" style={{ color: "#6b7280", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5 }}>
                  Tôi đồng ý với{" "}
                  <a href="#" style={{ color: "#4338ca" }}>Điều khoản sử dụng</a>{" "}và{" "}
                  <a href="#" style={{ color: "#4338ca" }}>Chính sách bảo mật</a>
                </label>
              </div>

              <button
                className="w-full py-3 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4338ca, #7c3aed)", border: "none", cursor: "pointer" }}
              >
                Tạo tài khoản
              </button>

              <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
                <span style={{ color: "#9ca3af", fontSize: "0.8125rem" }}>hoặc đăng ký với</span>
                <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[{ name: "Google", color: "#ea4335" }, { name: "Facebook", color: "#1877f2" }].map(({ name, color }) => (
                  <button
                    key={name}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#e5e7eb", background: "white", cursor: "pointer" }}
                  >
                    <span style={{ color, fontWeight: 700, fontSize: "0.875rem" }}>{name[0]}</span>
                    <span style={{ color: "#374151", fontSize: "0.875rem" }}>{name}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center mt-6" style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              Đã có tài khoản?{" "}
              <button
                onClick={() => setScreen("login")}
                style={{ color: "#4338ca", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
              >
                Đăng nhập
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── FORGOT PASSWORD ──────────────────────────────────────────────────────
  if (screen === "forgot") {
    return (
      <div className="flex h-screen w-full">
        {leftPanel}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#4338ca" }}>EduLearn</span>
            </div>

            <button
              onClick={() => setScreen("login")}
              className="flex items-center gap-1.5 mb-6"
              style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
            </button>

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg, #eef2ff, #ede9fe)" }}>
              <Mail className="w-7 h-7" style={{ color: "#4338ca" }} />
            </div>

            <h1 className="mb-2" style={{ color: "#111827" }}>Quên mật khẩu?</h1>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Nhập email đã đăng ký và chúng tôi sẽ gửi cho bạn đường dẫn để đặt lại mật khẩu.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label style={{ color: "#374151", fontSize: "0.875rem" }}>Email đã đăng ký</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none"
                    style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb", fontSize: "0.9375rem" }}
                  />
                </div>
              </div>

              <button
                onClick={() => setScreen("forgot-success")}
                className="w-full py-3 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4338ca, #7c3aed)", border: "none", cursor: "pointer" }}
              >
                Gửi đường dẫn đặt lại
              </button>

              <button
                onClick={() => setScreen("login")}
                className="w-full py-3 rounded-xl transition-colors hover:bg-gray-50"
                style={{ border: "1px solid #e5e7eb", background: "white", cursor: "pointer", color: "#374151" }}
              >
                Quay lại đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── FORGOT SUCCESS ───────────────────────────────────────────────────────
  return (
    <div className="flex h-screen w-full">
      {leftPanel}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #eef2ff, #ede9fe)" }}>
              <CheckCircle className="w-10 h-10" style={{ color: "#4338ca" }} />
            </div>
          </div>

          <h1 className="mb-3" style={{ color: "#111827" }}>Email đã được gửi!</h1>
          <p style={{ color: "#6b7280", fontSize: "0.9375rem", lineHeight: 1.6 }}>
            Chúng tôi đã gửi đường dẫn đặt lại mật khẩu đến email của bạn.
            Vui lòng kiểm tra hộp thư (kể cả thư mục Spam).
          </p>

          <div className="mt-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
            <p style={{ color: "#15803d", fontSize: "0.875rem" }}>
              Đường dẫn sẽ hết hạn sau <strong>15 phút</strong>
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <button
              className="w-full py-3 rounded-xl text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4338ca, #7c3aed)", border: "none", cursor: "pointer" }}
            >
              Mở ứng dụng Email
            </button>
            <button
              onClick={() => setScreen("forgot")}
              className="w-full py-3 rounded-xl transition-colors hover:bg-gray-50"
              style={{ border: "1px solid #e5e7eb", background: "white", cursor: "pointer", color: "#374151" }}
            >
              Gửi lại email
            </button>
          </div>

          <p className="mt-6" style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
            Nhớ mật khẩu rồi?{" "}
            <button
              onClick={() => setScreen("login")}
              style={{ color: "#4338ca", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

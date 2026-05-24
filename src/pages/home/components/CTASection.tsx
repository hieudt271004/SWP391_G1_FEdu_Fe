import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-700 to-pink-700 px-8 py-16 md:px-16 md:py-20 text-center">
          {/* Decorative blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-80 h-80 rounded-full opacity-20 bg-white"
              style={{ top: "-30%", right: "-10%", filter: "blur(60px)" }}
            />
            <div
              className="absolute w-72 h-72 rounded-full opacity-15 bg-pink-300"
              style={{ bottom: "-20%", left: "-5%", filter: "blur(60px)" }}
            />
          </div>

          {/* Content */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-white/15 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="text-sm text-white font-medium">
                Sẵn sàng đổi cách học?
              </span>
            </div>

            <h2 className="text-white font-extrabold leading-tight text-3xl md:text-5xl mb-4">
              Bắt đầu hành trình học tập
              <br />
              theo cách mới
            </h2>

            <p className="text-indigo-100 text-base md:text-lg max-w-xl mx-auto mb-10">
              Tham gia cộng đồng sinh viên và giảng viên đang định hình lại cách học đại học.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-semibold text-base hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
              >
                Đăng ký miễn phí
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3.5 rounded-xl border border-white/30 text-white font-medium text-base hover:bg-white/10 transition-colors"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
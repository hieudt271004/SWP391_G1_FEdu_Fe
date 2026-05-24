import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 bg-indigo-400"
          style={{
            top: "-5%",
            right: "10%",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-10 bg-violet-400"
          style={{
            bottom: "0",
            left: "5%",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-white/10 border border-white/15">
          <span className="text-sm text-indigo-200 font-medium">
            Lớp học đảo ngược cho đại học hiện đại
          </span>
        </div>

        <h1 className="text-white font-extrabold leading-tight text-4xl md:text-6xl mb-6">
          Lớp học đảo ngược,
          <br />
          <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
            kết quả lội ngược dòng
          </span>
        </h1>

        <p className="text-indigo-100 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          FEdu mang phương pháp Flipped Classroom đến với các trường đại học hiện đại. Tự học có lộ trình tại nhà, thảo luận và thực hành trên lớp — học sâu hơn, nhớ lâu hơn.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-semibold text-base hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
          >
            Bắt đầu ngay
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#about"
            className="px-8 py-3.5 rounded-xl border border-white/30 text-white font-medium text-base hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </div>
    </section>
  );
}
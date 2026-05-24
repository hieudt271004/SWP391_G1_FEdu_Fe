import { BookOpen, MessagesSquare, Trophy, ArrowRight } from "lucide-react";

const FLOW_STEPS = [
  {
    icon: BookOpen,
    title: "Tự học tại nhà",
    description: "Xem video, đọc tài liệu, làm quiz để nắm kiến thức nền tảng trước buổi học.",
    color: "text-indigo-700",
    bg: "bg-indigo-100",
  },
  {
    icon: MessagesSquare,
    title: "Thảo luận trên lớp",
    description: "Đặt câu hỏi, làm bài tập nhóm, tranh luận với giảng viên và bạn bè.",
    color: "text-violet-700",
    bg: "bg-violet-100",
  },
  {
    icon: Trophy,
    title: "Thực hành & ứng dụng",
    description: "Làm dự án thực tế, được hỗ trợ bởi sub-mentor và đánh giá tiến độ liên tục.",
    color: "text-pink-700",
    bg: "bg-pink-100",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-4 uppercase tracking-wider">
            Phương pháp
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Lớp học đảo ngược là gì?
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Phương pháp đảo ngược thứ tự học truyền thống. Thay vì nghe giảng trên lớp rồi về nhà làm bài tập, sinh viên{" "}
            <span className="font-semibold text-gray-900">xem trước nội dung tại nhà</span>{" "}
            qua tài liệu, video, quiz — đến lớp{" "}
            <span className="font-semibold text-gray-900">dành thời gian thảo luận</span>, làm dự án nhóm, hỏi đáp với giảng viên.
          </p>
        </div>

        {/* Flow 3 bước */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative">
          {FLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === FLOW_STEPS.length - 1;

            return (
              <div key={step.title} className="relative">
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${step.bg}`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <div className="text-xs font-semibold text-gray-400 mb-2">
                    BƯỚC {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow giữa các step (desktop only) */}
                {!isLast && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-gray-200 items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Kết luận */}
        <p className="text-center text-gray-600 mt-12 max-w-2xl mx-auto italic">
          Kết quả: hiểu sâu hơn, tự chủ hơn, và biến mỗi buổi học thành một workshop thực sự.
        </p>
      </div>
    </section>
  );
}
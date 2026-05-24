import {
  Route,
  FileText,
  TrendingUp,
  Users,
  ClipboardList,
  CalendarClock,
  BarChart3,
  MessageCircle,
  GraduationCap,
  Presentation,
} from "lucide-react";

const STUDENT_FEATURES = [
  {
    icon: Route,
    title: "Lộ trình rõ ràng",
    description: "Mỗi môn có roadmap chi tiết từng tuần, biết phải học gì khi nào.",
  },
  {
    icon: FileText,
    title: "Tài liệu chuẩn bị",
    description: "Video, slide, quiz trước mỗi buổi học để nắm kiến thức nền.",
  },
  {
    icon: TrendingUp,
    title: "Theo dõi tiến độ",
    description: "Biết chính xác bạn đang ở đâu trong khoá học, đã hoàn thành những gì.",
  },
  {
    icon: Users,
    title: "Hỗ trợ từ Sub-Mentor",
    description: "Bạn bè giỏi trong lớp được chọn làm mentor hỗ trợ học tập.",
  },
];

const TEACHER_FEATURES = [
  {
    icon: ClipboardList,
    title: "Quản lý lớp tập trung",
    description: "Một nơi cho toàn bộ lớp học của bạn, không phân tán dữ liệu.",
  },
  {
    icon: CalendarClock,
    title: "Giao bài tự động",
    description: "Schedule trước nội dung, hệ thống tự gửi đến học viên đúng thời điểm.",
  },
  {
    icon: BarChart3,
    title: "Báo cáo tiến độ",
    description: "Biết sinh viên nào đang chậm, sinh viên nào đang vượt — can thiệp kịp thời.",
  },
  {
    icon: MessageCircle,
    title: "Tương tác lớp học",
    description: "Q&A, thảo luận, polling realtime ngay trong buổi học.",
  },
];

interface FeatureGroupProps {
  badge: string;
  badgeBg: string;
  badgeColor: string;
  icon: typeof GraduationCap;
  title: string;
  features: typeof STUDENT_FEATURES;
  iconColor: string;
  iconBg: string;
}

function FeatureGroup({
  badge,
  badgeBg,
  badgeColor,
  icon: HeaderIcon,
  title,
  features,
  iconColor,
  iconBg,
}: FeatureGroupProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
      {/* Group header */}
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
          <HeaderIcon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <div className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-1 ${badgeBg} ${badgeColor}`}>
            {badge}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Features list */}
      <ul className="space-y-5">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <li key={feature.title} className="flex gap-4">
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold mb-4 uppercase tracking-wider">
            Tính năng
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Một nền tảng, hai trải nghiệm
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            FEdu được thiết kế riêng cho cả sinh viên và giảng viên — mỗi bên đều có công cụ phù hợp với vai trò của mình.
          </p>
        </div>

        {/* 2 column grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureGroup
            badge="Cho sinh viên"
            badgeBg="bg-indigo-100"
            badgeColor="text-indigo-700"
            icon={GraduationCap}
            title="Học hiệu quả hơn"
            features={STUDENT_FEATURES}
            iconColor="text-indigo-700"
            iconBg="bg-indigo-100"
          />
          <FeatureGroup
            badge="Cho giảng viên"
            badgeBg="bg-violet-100"
            badgeColor="text-violet-700"
            icon={Presentation}
            title="Dạy thông minh hơn"
            features={TEACHER_FEATURES}
            iconColor="text-violet-700"
            iconBg="bg-violet-100"
          />
        </div>
      </div>
    </section>
  );
}
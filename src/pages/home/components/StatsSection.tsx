import { Users, BookOpen, GraduationCap, Sparkles } from "lucide-react";

const STATS = [
  {
    icon: Users,
    value: "500+",
    label: "Sinh viên",
    bg: "bg-indigo-50",
    color: "text-indigo-700",
  },
  {
    icon: BookOpen,
    value: "20+",
    label: "Môn học",
    bg: "bg-violet-50",
    color: "text-violet-700",
  },
  {
    icon: GraduationCap,
    value: "30+",
    label: "Lớp học hiện hành",
    bg: "bg-pink-50",
    color: "text-pink-700",
  },
  {
    icon: Sparkles,
    value: "95%",
    label: "Đánh giá tích cực",
    bg: "bg-emerald-50",
    color: "text-emerald-700",
  },
];

export function StatsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${stat.bg}`}
                >
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
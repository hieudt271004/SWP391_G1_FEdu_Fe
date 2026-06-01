import { Users, BookOpen, GraduationCap, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const metrics = [
  {
    label: "Tổng Học viên",
    value: "12,543",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "#4338ca",
    bg: "#eef2ff",
  },
  {
    label: "Tổng Giảng viên",
    value: "342",
    change: "+8.2%",
    trend: "up",
    icon: GraduationCap,
    color: "#db2777",
    bg: "#fdf2f8",
  },
  {
    label: "Số Khóa học",
    value: "1,289",
    change: "+15.3%",
    trend: "up",
    icon: BookOpen,
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    label: "Doanh thu",
    value: "2.4B VNĐ",
    change: "-3.1%",
    trend: "down",
    icon: DollarSign,
    color: "#d97706",
    bg: "#fffbeb",
  },
];

const chartData = [
  { month: "Th1", students: 820 },
  { month: "Th2", students: 950 },
  { month: "Th3", students: 1100 },
  { month: "Th4", students: 980 },
  { month: "Th5", students: 1250 },
  { month: "Th6", students: 1420 },
  { month: "Th7", students: 1380 },
  { month: "Th8", students: 1550 },
  { month: "Th9", students: 1620 },
  { month: "Th10", students: 1480 },
  { month: "Th11", students: 1700 },
  { month: "Th12", students: 1850 },
];

const recentActivities = [
  { user: "Nguyễn Văn A", action: "đã đăng ký khóa React Advanced", time: "5 phút trước" },
  { user: "Trần Thị B", action: "đã hoàn thành khóa Python Basics", time: "12 phút trước" },
  { user: "Lê Minh C", action: "đã để lại đánh giá 5 sao", time: "25 phút trước" },
  { user: "Phạm Thu D", action: "đã đăng ký làm giảng viên", time: "1 giờ trước" },
  { user: "Hoàng Văn E", action: "đã nạp 500.000 VNĐ", time: "2 giờ trước" },
];

export function DashboardPage() {
  const maxValue = Math.max(...chartData.map((d) => d.students));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>
          Tổng quan
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          Chào mừng trở lại! Đây là bảng điều khiển của bạn.
        </p>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <div
              key={metric.label}
              className="rounded-xl p-5"
              style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: metric.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                  style={{
                    backgroundColor: metric.trend === "up" ? "#ecfdf5" : "#fef2f2",
                    color: metric.trend === "up" ? "#059669" : "#dc2626",
                    fontWeight: 600,
                  }}
                >
                  <TrendIcon className="w-3 h-3" />
                  {metric.change}
                </div>
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>
                {metric.value}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>{metric.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div
          className="lg:col-span-2 rounded-xl p-6"
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", marginBottom: "1rem" }}>
            Học viên đăng ký mới (12 tháng)
          </h3>
          <div className="flex items-end justify-between gap-2 h-64">
            {chartData.map((item) => {
              const heightPercent = (item.students / maxValue) * 100;
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex items-end justify-center" style={{ height: "200px" }}>
                    <div
                      className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                      style={{
                        background: "linear-gradient(180deg, #4338ca, #7c3aed)",
                        height: `${heightPercent}%`,
                        minHeight: "8px",
                      }}
                      title={`${item.students} học viên`}
                    />
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent activities */}
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", marginBottom: "1rem" }}>
            Hoạt động gần đây
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#f3f4f6" }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#4338ca" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.8125rem", color: "#111827", marginBottom: "0.125rem" }}>
                    <span style={{ fontWeight: 600 }}>{activity.user}</span> {activity.action}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

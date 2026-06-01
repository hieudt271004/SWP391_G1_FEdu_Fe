import { ArrowLeft, Mail, Phone, MapPin, BookOpen, GraduationCap } from "lucide-react";

interface Course {
  id: string;
  code: string;
  title: string;
  status: "Đang học" | "Đã hoàn thành" | "Đang dạy";
  progress?: number;
  students?: number;
}

interface AdminUserDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  role: "Học viên" | "Giảng viên";
  status: "active" | "inactive";
  avatar: string;
}

interface UserDetailPageProps {
  onBack: () => void;
  user: AdminUserDetail;
}

const mockStudentCourses: Course[] = [
  { id: "1", code: "SWP391", title: "Software Development Project", status: "Đang học", progress: 75 },
  { id: "2", code: "PRJ301", title: "Java Web Application Development", status: "Đã hoàn thành", progress: 100 },
  { id: "3", code: "DBI202", title: "Database Management Systems", status: "Đang học", progress: 60 },
];

const mockInstructorCourses: Course[] = [
  { id: "1", code: "SWP391", title: "Software Development Project", status: "Đang dạy", students: 120 },
  { id: "2", code: "PRJ301", title: "Java Web Application Development", status: "Đang dạy", students: 95 },
  { id: "3", code: "SWT301", title: "Software Testing", status: "Đang dạy", students: 80 },
];

export function UserDetailPage({ onBack, user }: UserDetailPageProps) {
  const isStudent = user.role === "Học viên";
  const courses = isStudent ? mockStudentCourses : mockInstructorCourses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5" style={{ color: "#6b7280" }} />
        </button>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>
          {isStudent ? "Thông tin Học viên" : "Thông tin Giảng viên"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl p-6 text-center" style={{ background: "linear-gradient(135deg, #4338ca, #7c3aed)" }}>
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)", border: "3px solid white" }}>
              <span className="text-white text-3xl font-bold">{user.avatar}</span>
            </div>
            <h2 className="text-white mb-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{user.name}</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-white text-2xl font-bold">{isStudent ? mockStudentCourses.length : mockInstructorCourses.length}</div>
                <div className="text-indigo-200 text-xs">Khóa học</div>
              </div>
              <div className="w-px h-10" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
              <div className="text-center">
                <div className="text-white text-2xl font-bold">
                  {isStudent ? "85%" : mockInstructorCourses.reduce((sum, c) => sum + (c.students || 0), 0)}
                </div>
                <div className="text-indigo-200 text-xs">{isStudent ? "Hoàn thành" : "Học viên"}</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-6" style={{ backgroundColor: "white", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", marginBottom: "1rem" }}>Thông tin cá nhân</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Giới tính</span>
                <span style={{ fontSize: "0.875rem", color: "#111827", fontWeight: 600 }}>{user.gender === "Male" ? "Nam" : user.gender === "Female" ? "Nữ" : "Khác"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Ngày sinh</span>
                <span style={{ fontSize: "0.875rem", color: "#111827", fontWeight: 600 }}>{new Date(user.dateOfBirth).toLocaleDateString("vi-VN")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Vai trò</span>
                <span className="px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: isStudent ? "#ecfdf5" : "#fdf2f8", color: isStudent ? "#059669" : "#db2777", fontWeight: 600 }}>{user.role}</span>
              </div>
            </div>
            <div className="border-t my-4" style={{ borderColor: "#e5e7eb" }} />
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#6b7280" }} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.125rem" }}>Email</div>
                  <div style={{ fontSize: "0.875rem", color: "#111827", fontWeight: 500, wordBreak: "break-all" }}>{user.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#6b7280" }} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.125rem" }}>Số điện thoại</div>
                  <div style={{ fontSize: "0.875rem", color: "#111827", fontWeight: 500 }}>{user.phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#6b7280" }} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.125rem" }}>Địa chỉ</div>
                  <div style={{ fontSize: "0.875rem", color: "#111827", fontWeight: 500 }}>Hà Nội, Việt Nam</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <div className="rounded-xl p-6" style={{ backgroundColor: "white", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-2 mb-6">
              {isStudent ? <BookOpen className="w-5 h-5" style={{ color: "#4338ca" }} /> : <GraduationCap className="w-5 h-5" style={{ color: "#4338ca" }} />}
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827" }}>
                {isStudent ? "Khóa học đã/đang học" : "Khóa học đang giảng dạy"}
              </h3>
            </div>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="p-5 rounded-xl hover:shadow-md transition-shadow" style={{ border: "1px solid #e5e7eb" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded text-xs" style={{ backgroundColor: "#eef2ff", color: "#4338ca", fontWeight: 700 }}>{course.code}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs" style={{
                          backgroundColor: course.status === "Đã hoàn thành" ? "#ecfdf5" : course.status === "Đang học" ? "#fef3c7" : "#eef2ff",
                          color: course.status === "Đã hoàn thành" ? "#059669" : course.status === "Đang học" ? "#d97706" : "#4338ca",
                          fontWeight: 600,
                        }}>{course.status}</span>
                      </div>
                      <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827" }}>{course.title}</h4>
                    </div>
                  </div>
                  {isStudent && course.progress !== undefined && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontSize: "0.8125rem", color: "#6b7280" }}>Tiến độ học tập</span>
                        <span style={{ fontSize: "0.8125rem", color: "#111827", fontWeight: 600 }}>{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${course.progress}%`, background: "linear-gradient(135deg, #4338ca, #7c3aed)" }} />
                      </div>
                    </div>
                  )}
                  {!isStudent && course.students !== undefined && (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" style={{ color: "#6b7280" }} />
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{course.students} học viên</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

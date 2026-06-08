import { ArrowLeft, Mail, Phone, MapPin, BookOpen, GraduationCap, Loader2, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminService, AdminUserResponse } from "../../services/admin.service";
import { classroomService } from "../../services/classroom.service";

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
  role: "Học viên" | "Giảng viên" | "Quản trị viên" | "Trợ giảng" | "USER" | string;
  status: "active" | "inactive";
  avatar: string;
}

interface UserDetailPageProps {
  onBack?: () => void; // Made optional since we can use navigate(-1) by default
}

function mapBeUserToAdminDetail(u: AdminUserResponse): AdminUserDetail {
  const fname = u.firstName || "";
  const lname = u.lastName || "";
  const initials = ((fname[0] || "") + (lname[0] || "")).toUpperCase() || "??";
  const roleLabel = u.roles?.includes("TEACHER")
    ? "Giảng viên"
    : u.roles?.includes("STUDENT")
    ? "Học viên"
    : u.roles?.includes("ADMIN")
    ? "Quản trị viên"
    : u.roles?.includes("SUB_MENTOR")
    ? "Trợ giảng"
    : u.roles?.[0] || "USER";

  return {
    id: u.userId,
    name: `${fname} ${lname}`.trim() || u.email.split("@")[0],
    email: u.email,
    phone: u.phone || "—",
    gender: (u.gender as "Male" | "Female" | "Other") || "Other",
    dateOfBirth: u.bod || "—",
    role: roleLabel as any,
    status: u.status === "ACTIVE" ? "active" : "inactive",
    avatar: initials,
  };
}

// Removed mock courses since we fetch real data

export function UserDetailPage({ onBack }: UserDetailPageProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await adminService.getUserById(Number(id));
        const userDetail = mapBeUserToAdminDetail(data);
        setUser(userDetail);

        // Fetch courses based on role
        const role = userDetail.role;
        const isLearner = role === "Học viên" || role === "Trợ giảng";
        const isInstructor = role === "Giảng viên" || role === "Quản trị viên";

        if (isLearner) {
          const studentClasses = await classroomService.getByStudent(userDetail.id);
          setCourses(studentClasses.map(c => ({
            id: String(c.classroomId),
            code: c.subjectCode,
            title: `${c.subjectName} (${c.className})`,
            status: "Đang học",
            progress: 0,
          })));
        } else if (isInstructor) {
          const teacherClasses = await classroomService.getByTeacher(userDetail.id);
          setCourses(teacherClasses.map(c => ({
            id: String(c.classroomId),
            code: c.subjectCode,
            title: `${c.subjectName} (${c.className})`,
            status: "Đang dạy",
            students: c.studentCount
          })));
        } else {
          setCourses([]);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Không thể tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#4338ca" }} />
      <span style={{ marginLeft: "0.75rem", color: "#6b7280" }}>Đang tải...</span>
    </div>
  );

  if (error || !user) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <AlertCircle className="w-10 h-10" style={{ color: "#ef4444" }} />
      <p style={{ color: "#374151" }}>{error || "Không tìm thấy người dùng"}</p>
      <button onClick={handleBack} className="px-4 py-2 rounded-lg text-white text-sm" style={{ background: "#4338ca" }}>Quay lại</button>
    </div>
  );

  const isLearner = user.role === "Học viên" || user.role === "Trợ giảng";
  const isInstructor = user.role === "Giảng viên" || user.role === "Quản trị viên";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5" style={{ color: "#6b7280" }} />
        </button>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>
          Thông tin {user.role}
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
                <div className="text-white text-2xl font-bold">{courses.length}</div>
                <div className="text-indigo-200 text-xs">Khóa học</div>
              </div>
              <div className="w-px h-10" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
              <div className="text-center">
                <div className="text-white text-2xl font-bold">
                  {isLearner ? "0%" : isInstructor ? courses.reduce((sum, c) => sum + (c.students || 0), 0) : "N/A"}
                </div>
                <div className="text-indigo-200 text-xs">{isLearner ? "Hoàn thành" : isInstructor ? "Học viên" : "Hoạt động"}</div>
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
                <span style={{ fontSize: "0.875rem", color: "#111827", fontWeight: 600 }}>{user.dateOfBirth === "—" ? "—" : new Date(user.dateOfBirth).toLocaleDateString("vi-VN")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Vai trò</span>
                <span className="px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: isLearner ? "#ecfdf5" : "#fdf2f8", color: isLearner ? "#059669" : "#db2777", fontWeight: 600 }}>{user.role}</span>
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

            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <div className="rounded-xl p-6" style={{ backgroundColor: "white", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", height: "100%" }}>
            <div className="flex items-center gap-2 mb-6">
              {isLearner ? <BookOpen className="w-5 h-5" style={{ color: "#4338ca" }} /> : <GraduationCap className="w-5 h-5" style={{ color: "#4338ca" }} />}
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827" }}>
                {isLearner ? "Khóa học đã/đang học" : isInstructor ? "Lớp học đang phụ trách" : "Thông tin hoạt động"}
              </h3>
            </div>
            
            {(!isLearner && !isInstructor) ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">Vai trò này không trực tiếp tham gia hay phụ trách lớp học.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">Không có dữ liệu khóa học</p>
                ) : (
                  courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-5 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                      style={{ border: "1px solid #e5e7eb" }}
                      onClick={() => navigate(`/admin/courses/${course.id}`)}
                    >
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
                      {isLearner && course.progress !== undefined && (
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
                      {!isLearner && course.students !== undefined && (
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" style={{ color: "#6b7280" }} />
                          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{course.students} học viên</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

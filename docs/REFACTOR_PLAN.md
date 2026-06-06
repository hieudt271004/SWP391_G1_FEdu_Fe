# FEdu Frontend — Đánh giá cấu trúc & Lộ trình Refactor

> Tài liệu đánh giá tổng thể codebase FE và kế hoạch refactor theo từng giai đoạn.
> Đối chiếu với **RDS v1.2 (FES-SRS)**. Đọc kèm [ARCHITECTURE.md](./ARCHITECTURE.md).

## 0. Bối cảnh & nguyên nhân gốc

Dự án khởi tạo từ **Figma Make** (`package.json` tên `@figma/my-make-file`, `vite.config.ts` có `figmaAssetResolver`, `guidelines/Guidelines.md` là template gốc chưa chỉnh). Code Figma-export (inline-style) bị trộn với code viết tay theo convention, rồi 6 thành viên mỗi người làm một module theo một "gu" riêng.

Tầng thư mục cấp 1 (`assets/ routes/ pages/ components/ services/ context/ utils/ types/`) **bám đúng** RDS mục 2.2.1, nhưng **bên trong mỗi module một kiểu**.

**Nguyên nhân gốc mang tính hệ thống:** không có ESLint, không Prettier, không editorconfig, `tsconfig` để `"strict": false`. Không có hàng rào tự động → 6 tác giả tạo ra 6 style. Hầu hết vấn đề bên dưới là triệu chứng của điều này → đó là lý do **Phase 0 phải làm trước tiên**.

---

## 1. Mức độ đáp ứng Requirement (RDS)

Tầng **service phủ gần đủ 20 Use Case** của RDS v1.x (scope hiện tại = Auth + User mgmt + Subject + Classroom). Tầng UI thì lệch theo role.

| Nhóm UC (RDS) | Service | UI | Ghi chú |
|---|---|---|---|
| UC01–07 Auth (register/login/logout/refresh/forgot/reset) | ✅ | ✅ | Đầy đủ. Refresh token tự động qua interceptor (`src/services/api.client.ts`). Smart-redirect theo role **đã làm** (`src/routes/redirectAfterLogin.ts`). |
| UC08 Create User via API-KEY | — | — | Thuộc BE, FE không cần. |
| UC09–10 Change status / Delete user (Admin) | ✅ | ✅ | `adminService` + `UserManagementPage`. |
| UC11–14 Subject CRUD | ✅ | 🟡 | `subjectService` đủ CRUD; UI admin có (đặt sai tên "Course"), teacher có `TeacherSubjectsPage`. |
| UC15–18 Classroom CRUD + assign lecturer | ✅ | 🟡 | `classroomService` đủ; UI admin + teacher có. |
| UC19–20 Add/Remove Student | ✅ | 🟡 | `classroomService.addStudent/removeStudent`. |
| Screen Authorization – role **STUDENT** | 🟡 | ❌ | `/student/dashboard` là `<div>placeholder</div>`; `StudentMilestoneSubmissionPage` đã code 260 dòng nhưng **không gắn route**. |
| **Sub-Mentor** | 🟡 | ❌ | `SubMentorLayout` chỉ "Sidebar placeholder", không có page. |

**Kết luận:** Đúng scope lõi RDS v1.x ở mức service + UI admin/teacher (**≈ 75%**). Hai khoảng trống so với bảng Screen Authorization: **role Student** và **Sub-Mentor** chưa có UI thật (RDS ghi "in development" → chấp nhận cho version này).

**Điểm lệch RDS cụ thể:**
- RDS 2.2.1 nói `utils` chứa "token storage", nhưng `tokenStorage.ts` lại nằm trong `services/`.
- `components/figma` lẽ ra chứa mockup Figma, thực tế mockup (inline-style) bị đổ vào `pages/admin/*`; `figma/` chỉ có `ImageWithFallback`.

---

## 2. Các vấn đề cấu trúc (xếp theo mức độ)

### 🔴 P0 — Nghiêm trọng

**a) Thuật ngữ Course / Subject / Class bị xáo trộn 3 tầng** (tệ nhất).

| BE / RDS | Module Teacher | File admin | Route admin |
|---|---|---|---|
| **Subject** (môn học) | `TeacherSubjectsPage` ✓ | `CourseManagementPage` → fetch `subjectService` | `/admin/courses` |
| **Classroom** (lớp) | `TeacherClassesPage` ✓ | **`CoursesListPage`** → fetch `classroomService` | **`/admin/classes`** |

File tên `CoursesListPage` lại hiển thị **danh sách lớp** tại `/admin/classes`. Admin tự bịa khái niệm "Course" map vào "Subject" của BE, lệch cả RDS lẫn module teacher.

**b) Type trùng & xung đột field.** `Classroom` tồn tại 2 bản khác nhau:
- `types/subject.ts` → `Classroom { classroomName, teacherId, year }` (code chết)
- `types/classroom.ts` → `ClassroomResponse { className, lecturerId, studentCount }` (đang dùng)

Type còn rải rác: `AdminUserResponse` trong `admin.service.ts`, `LearningPath*` trong `learningPath.service.ts` — không theo `types/`.

**c) Hai tầng HTTP + 4 phong cách service:**
1. `http` wrapper (sạch, auto-unwrap `data.data`): `admin/classroom/subject.service` ✓
2. `apiClient` thô + try/catch + `extractErrorMessage`: `auth/student/subMentor/learningPath.service`
3. `apiClient` thô + hàm rời `...API()` trả `response.data`: `teacher.service`
4. Wrapper legacy `loginAPI/registerAPI/getMeAPI` chồng lên `authService`

Lỗi xử lý không nhất quán: chỗ throw `Error` tiếng Việt, chỗ tiếng Anh, chỗ để lỗi tự nổi.

**d) Không có ESLint/Prettier + `strict: false`.** 23 chỗ `any`, 25 `console.*` còn sót, indentation lẫn lộn 2/4-space.

### 🟠 P1 — Lớn

**e) 548 inline `style={{}}` trong 24 file** — ngược convention team. Tập trung ở admin (~389) và auth. Nửa app Tailwind, nửa admin là Figma-export chưa refactor.

**f) Mỗi page admin tự định nghĩa display-model + mapper riêng** (`AdminUser`+`beUserToAdminUser`…) với nhãn tiếng Việt **dùng làm khóa filter thật** — `<UserManagementPage filterRole="Học viên" />` (rất dễ vỡ).

**g) Mock trộn lẫn dữ liệu thật:** `ClassDetailPage` có `mockModuleProgress` hardcode cạnh `classroomService` thật.

**h) Không ai dùng alias `@/`** (0 lần) dù `vite.config` khai báo — và `tsconfig` **thiếu `paths`**. Hậu quả: 50 import `../../../` ở 12 file.

### 🟡 P2 — Trung bình (dọn dẹp)

**i) Code chết / orphan:**
- `routes/ProtectedRoute.tsx`, `routes/GuestOnlyRoute.tsx` — định nghĩa nhưng **không dùng** (chỉ dùng `RoleRoute`). → login/register không chặn user đã đăng nhập.
- `pages/teacher/courses/CourseOverviewPage.tsx`, `pages/student/milestones/StudentMilestoneSubmissionPage.tsx` — code xong nhưng **không gắn route**.
- CSS chết: `assets/fonts.css` & `assets/globals.css` = **0 byte**; `default_shadcn_theme.css` (root) không ai import.

**j) Đặt sai chỗ / trùng chức năng:** `tokenStorage.ts` ở `services/` (RDS nói `utils`); `UserDetailModal.tsx` (component) nằm trong `pages/admin/`; user-detail tồn tại **cả Modal lẫn Page**.

**k) `pages/` lồng nhau không nhất quán:** auth lồng sâu (`auth/login/LoginPage`), admin phẳng, teacher gom theo domain. `StudentLayout` menu trỏ tới 4 route không tồn tại (`/student/courses`, `/student/submissions`…).

**l) Tài liệu lệch code:** `ARCHITECTURE.md` ghi StudentLayout "sidebar đen" (thực tế indigo); liệt kê smart-redirect là TODO dù đã làm.

---

## 3. Lộ trình refactor

Thứ tự có chủ đích: **dựng hàng rào → đổi tên → hợp nhất tầng → rồi mới tới UI.**

### Phase 0 — Guardrails *(0.5–1 ngày, làm TRƯỚC)*
- ESLint + Prettier + `eslint-plugin-react-hooks`.
- Bật `tsconfig "strict": true` (sửa lỗi dần).
- Thêm `paths: { "@/*": ["src/*"] }` cho khớp vite.
- Script `lint` / `format` / `typecheck`.
- **→ Chặn lộn xộn mới ngay lập tức.**

### Phase 1 — Thống nhất thuật ngữ & routing *(1–2 ngày)*
- Chọn 1 từ vựng theo RDS: **Subject** + **Classroom** (bỏ "Course" ở admin).
- `CourseManagementPage→SubjectListPage`, `CoursesListPage→ClassroomListPage`, `/admin/courses→/admin/subjects`.
- Thay prop `filterRole="Học viên"` bằng enum `UserRole`.

### Phase 2 — Hợp nhất service + types *(1–2 ngày)*
- Giữ **một** chuẩn: `http` wrapper + service object. Xóa `apiClient` thô ở `student/subMentor/teacher/learningPath`; bỏ wrapper legacy `...API`.
- Dồn mọi interface về `types/`; xóa `Classroom` trùng trong `subject.ts`.
- Tách `extractErrorMessage` khỏi `api.client.ts`; chuyển `tokenStorage` về `utils/`.

### Phase 3 — Chuẩn hóa cấu trúc & xóa code chết *(1 ngày)*
- Một quy ước lồng `pages/` (đề xuất: gom theo domain).
- Xóa orphan (`ProtectedRoute`/`GuestOnlyRoute`, `CourseOverviewPage`, CSS 0 byte, `default_shadcn_theme.css`).
- Chuyển `UserDetailModal` ra `components/`; gộp Modal/Page user-detail.
- Sửa menu `StudentLayout`; cập nhật `ARCHITECTURE.md`.

### Phase 4 — Khử inline-style *(3–5 ngày, làm dần)*
- 548 inline-style → Tailwind, ưu tiên admin.
- Trích display-mapper trùng lặp thành helper/hook dùng chung.

### Phase 5 — Lấp khoảng trống theo role *(theo sprint)*
- UI thật cho **Student** (dashboard, my-classrooms, submit milestone) và **Sub-Mentor**, đúng bảng Screen Authorization.

---

## 4. Tổng kết

| Tiêu chí | Đánh giá |
|---|---|
| Bám RDS (scope v1.x) | 🟢 Khá tốt ở service; 🟡 UI lệch (thiếu Student/Sub-Mentor) |
| Cấu trúc thư mục cấp 1 | 🟢 Đúng RDS 2.2.1 |
| Nhất quán nội bộ | 🔴 Kém (thuật ngữ, service, type, style mỗi nơi một kiểu) |
| Nền tảng (lint/type-safety) | 🔴 Thiếu hoàn toàn — **nguyên nhân gốc** |
| Khả năng bảo trì/mở rộng | 🟡 Trung bình; tệ nhanh nếu không làm Phase 0 |

**Điểm cốt lõi:** vấn đề không phải kiến trúc sai, mà là **thiếu hàng rào để giữ nhất quán**. Phase 0 + Phase 1 chặn được phần lớn lộn xộn lan thêm.

---

## 5. Tiến độ thực hiện

| Phase | Trạng thái | Ghi chú |
|---|---|---|
| Phase 0 — Guardrails | ✅ Hoàn thành | ESLint + Prettier + strict + `@/` alias + scripts. Xem mục dưới. |
| Phase 1–5 | ⏳ Chưa làm | |

### Phase 0 — chi tiết
- `eslint.config.js` (flat config, ESLint 9): typescript-eslint + react-hooks + react-refresh; cảnh báo `no-explicit-any`, `no-console`, `no-unused-vars`.
- `.prettierrc.json` + `.prettierignore`: 2-space, single-quote, trailing comma — chốt style thống nhất.
- `.editorconfig`: thống nhất charset/line-ending/indent cho mọi editor.
- `tsconfig.json`: `"strict": true`, `baseUrl: "."`, `paths: { "@/*": ["src/*"] }` (khớp `vite.config.ts`).
- `package.json` scripts: `lint`, `lint:fix`, `format`, `format:check`, `typecheck`.

> Lint/typecheck sẽ báo lỗi tồn đọng (any, console, lỗi strict) — **đúng như kỳ vọng**: đó là danh sách nợ kỹ thuật cho Phase 1–4 xử lý dần, không phải lỗi mới sinh.

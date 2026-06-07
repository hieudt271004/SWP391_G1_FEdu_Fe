# FEdu Frontend — Architecture

Tài liệu kỹ thuật cho team. Đọc trước khi bắt đầu build feature mới.

## Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: TailwindCSS 4 + shadcn/ui components
- **Routing**: react-router-dom v7
- **State management**: React Context (cho auth), useState (local)
- **Icons**: lucide-react
- **Auth**: JWT (accessToken + refreshToken), Google OAuth qua `@react-oauth/google`

## Folder structure
src/
├── App.tsx                  Entry point routing (BrowserRouter wrap AppRoutes)
├── main.tsx                 Mount React + AuthProvider + GoogleOAuthProvider
├── assets/                  CSS, images global
├── components/
│   ├── ui/                  shadcn primitives (Button, Card, Input, ...)
│   ├── common/              Reusable cross-module (Navbar, Footer, UserMenu, ImageWithFallback)
│   └── layout/              Layouts wrap Outlet
│       ├── PublicLayout       Navbar + main + Footer
│       ├── AuthLayout         Full-screen, no chrome
│       ├── StudentLayout      Sidebar đen + main
│       ├── TeacherLayout      Sidebar xanh emerald + main
│       ├── AdminLayout        Sidebar đỏ rose + main
│       └── SubMentorLayout    Sidebar vàng amber + main
├── context/
│   └── AuthContext.tsx      User state, login/logout/refetch, persist qua reload
├── pages/
│   ├── home/                HomePage + sections riêng
│   │   ├── HomePage.tsx
│   │   └── components/      HeroSection, StatsSection, AboutSection, FeaturesSection, CTASection
│   ├── auth/                Login, Register, Forgot, Reset, Google, Terms, Privacy
│   ├── student/             (TBD) Dashboard, Profile, Courses, ...
│   ├── teacher/             (TBD)
│   ├── admin/               (TBD)
│   └── sub-mentor/          (TBD)
├── routes/
│   ├── AppRoutes.tsx        Mọi route khai báo ở đây
│   ├── ProtectedRoute.tsx   Wrap route yêu cầu login
│   └── RoleRoute.tsx        Wrap route yêu cầu role cụ thể
├── services/
│   ├── http.ts              http wrapper: unwrap ResponseData.data + chuẩn hoá lỗi
│   └── RoleRoute.tsx        Wrap route yêu cầu role cụ thể
└── types/
└── user.ts              User, UserRole, UserStatus, Gender, LoginResponse

## Routing pattern (Pattern C)

Route được nhóm theo layout. Mỗi layout xử lý chrome (navbar/sidebar/footer) riêng.
/                            HomePage              PublicLayout
/login                       LoginPage             AuthLayout
/register                    RegisterPage          AuthLayout
/forgot-password             ForgotPassword        AuthLayout
/forgot-success              ForgotSuccess         AuthLayout
/google-login                GoogleAuthPage        AuthLayout
/reset-password?token=xxx    ResetPasswordPage     AuthLayout
/reset-success               ResetSuccessPage      AuthLayout
/terms                       TermsPage             AuthLayout (mở tab mới)
/privacy                     PrivacyPage           AuthLayout (mở tab mới)
/student/dashboard           ...                   StudentLayout (cần role STUDENT)
/student/*                   (TBD)                 StudentLayout
/teacher/dashboard           ...                   TeacherLayout (cần role TEACHER)
/admin/dashboard             ...                   AdminLayout (cần role ADMIN)
/sub-mentor/dashboard        ...                   SubMentorLayout (cần role SUB_MENTOR)
/*                           Navigate to /         (fallback)

### Quy tắc route mới

- **Public route**: thêm vào nhóm `<Route element={<PublicLayout />}>`
- **Auth-related (chưa login)**: thêm vào nhóm `<Route element={<AuthLayout />}>`
- **Cần login + role**: bọc bằng `<RoleRoute allowedRoles={['STUDENT']}>`
- **Chỉ cần login (any role)**: bọc bằng `<ProtectedRoute>`

## Auth flow

### Login (email/password)
LoginPage.handleLogin()
→ authService.login(email, password)                   POST /auth/login
→ returns { accessToken, refreshToken, userId }
→ useAuth().login(accessToken, refreshToken, rememberMe)
→ storage.setItem (localStorage nếu rememberMe, sessionStorage nếu không)
→ authService.getMe()                           GET /auth/me (token qua interceptor)
→ setUser(userData)
→ navigate(getRedirectPathAfterLogin(user))       smart redirect theo role

### Bootstrap (khi app mount hoặc F5)
AuthProvider useEffect on mount
→ getStoredToken() from localStorage OR sessionStorage
→ if no token → setIsLoading(false), user = null (guest)
→ if has token → authService.getMe()
→ success → setUser, isLoading = false
→ fail (token expired) → clearAllTokens(), user = null

### Logout
useAuth().logout()
→ clearAllTokens() (clear cả localStorage và sessionStorage)
→ setUser(null)

## Backend integration

### Base URL

`http://localhost:8080`

### Endpoints đã có

| Method | URL | Auth | Returns |
|---|---|---|---|
| POST | `/auth/login` | No | TokenResponse |
| POST | `/auth/register` | No | Created user |
| POST | `/auth/forgot-password` | No | OK |
| POST | `/auth/change-password` | Reset token | OK |
| GET | `/auth/me` | JWT | UserResponse |
| POST | `/auth/google-login` | No | TokenResponse |
| POST | `/auth/refresh-token` | Refresh token | TokenResponse |

### User shape (từ `/auth/me`)

```typescript
interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  roles: UserRole[];          // mảng, có thể có nhiều role
  status: UserStatus;
  gender?: Gender;
  bod?: string;               // ISO date
  phone?: string;
}

type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'SUB_MENTOR' | 'USER';

### Lưu ý role

- 1 user có thể có nhiều role (`roles: UserRole[]`)
- Sub-mentor là student có thành tích tốt → 1 user vừa STUDENT vừa SUB_MENTOR
- Admin và Teacher không liên quan (mỗi user chỉ 1 trong 2)

## Quy trình build feature mới

Khi thêm 1 feature mới (vd "Student quản lý môn học"), làm theo 6 bước:

### 1. Phân tích & API contract
- Viết user story
- Vẽ flow chính + edge cases
- Spec API: method + URL + request body + response shape + status codes

### 2. BE: tầng dữ liệu
- `entity/Subject.java` (nếu chưa có)
- Migration SQL nếu cần
- `repository/SubjectRepository.java`

### 3. BE: tầng business + API
- DTO request/response
- Validator nếu cần
- Service logic
- Controller endpoint
- **Test bằng Postman trước khi sang FE**

### 4. FE: tầng dữ liệu
- `types/subject.ts` — khớp với response BE
- `services/subject.service.ts` — function gọi API

### 5. FE: tầng UI
- Page chính: `pages/{module}/{FeaturePage}.tsx`
- Components con nếu phức tạp: `pages/{module}/components/`
- Thêm route vào `routes/AppRoutes.tsx` — wrap đúng layout/RoleRoute

### 6. Integration & test thủ công
- Chạy BE + FE song song
- Click thử full flow
- Test edge cases: empty data, network error, token expired

## Conventions

### Naming

- Component: PascalCase (`LoginPage`, `UserMenu`)
- File: trùng tên component (`LoginPage.tsx`)
- Hook: camelCase với prefix `use` (`useAuth`)
- Service: object export, gọi BE qua `http` wrapper (`authService.login`, `subjectService.getAll`)
- Type: PascalCase (`User`, `UserRole`)
- Constant: UPPER_SNAKE_CASE (`NAV_LINKS`, `ROLE_PRIORITY`)

### Import

```typescript
// React/lib trước
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// External packages
import { Eye, Lock } from "lucide-react";

// Internal services/types/context
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/auth.service";

// Components
import { LeftPanel } from "../components/LeftPanel";
```

### Styling

- **Ưu tiên Tailwind classes** thay vì inline `style={{}}`
- Khi gặp design Figma export với inline style → refactor sang Tailwind khi có thời gian
- shadcn components có sẵn: `<Button>`, `<Card>`, `<Input>`, `<DropdownMenu>`, ... — dùng trước khi tự custom

## Token storage strategy

| User chọn "Remember me" | Storage |
|---|---|
| ON | localStorage (persist qua đóng browser) |
| OFF | sessionStorage (mất khi đóng tab) |

Logout clear cả 2 storage cho an toàn.

## Known issues / TODO

- [ ] Smart redirect sau login theo role (hiện hardcode `/student/dashboard`)
- [ ] Refactor `auth.service.ts` sang axios instance với interceptor
- [ ] `ResetPasswordPage` gọi `fetch` thẳng thay vì qua service
- [ ] 9 file auth còn nhiều inline `style={{}}` — refactor sang Tailwind
- [ ] Dashboard thực sự cho Student / Teacher / Admin / Sub-mentor (hiện chỉ placeholder)
- [ ] Nút "Sub-Mentor Panel" trong StudentLayout (chỉ hiện nếu user có role SUB_MENTOR)
- [ ] Smooth scroll CSS (`html { scroll-behavior: smooth }`)
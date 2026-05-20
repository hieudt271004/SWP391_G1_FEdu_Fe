const BASE_URL = "http://localhost:8080/auth";

export const loginAPI = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok || data.status !== 200) {
    throw new Error(data.message || "Có lỗi xảy ra khi đăng nhập");
  }

  return data;
};

export const forgotPasswordAPI = async (email: string) => {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok || data.status !== 200) {
    throw new Error(data.message || "Email không tồn tại trong hệ thống");
  }

  return data;
};

export const googleLoginAPI = async (credential: string) => {
  const res = await fetch(`${BASE_URL}/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });

  const data = await res.json();

  if (!res.ok || data.status !== 200) {
    throw new Error(data.message || "Đăng nhập Google thất bại");
  }

  return data;
};
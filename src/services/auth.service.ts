const BASE_URL = "http://localhost:8080/auth";

export const loginAPI = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
  // Trả về: { accessToken, refreshToken, userId }
};

export const forgotPasswordAPI = async (email: string) => {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });
  if (!res.ok) throw new Error("Request failed");
  return res.json();
};
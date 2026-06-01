const BASE_URL = "http://localhost:8080";

function getToken(): string | null {
  // Thử lấy từ localStorage (key demo_proj_fe dùng)
  return (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    null
  );
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json: ApiResponse<T> = await res.json();

  if (!res.ok || (json.status && json.status >= 400)) {
    throw new Error(json.message || `HTTP ${res.status}`);
  }

  return json.data as T;
}

export const http = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string, body?: unknown) =>
    request<T>("DELETE", path, body),
};

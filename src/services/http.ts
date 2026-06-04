import { apiClient } from './api.client';

export const http = {
  get: async <T>(path: string) => {
    const res = await apiClient.get(path);
    return res.data.data as T;
  },
  post: async <T>(path: string, body?: unknown) => {
    const res = await apiClient.post(path, body);
    return res.data.data as T;
  },
  put: async <T>(path: string, body?: unknown) => {
    const res = await apiClient.put(path, body);
    return res.data.data as T;
  },
  patch: async <T>(path: string, body?: unknown) => {
    const res = await apiClient.patch(path, body);
    return res.data.data as T;
  },
  delete: async <T>(path: string, body?: unknown) => {
    const res = await apiClient.delete(path, { data: body });
    return res.data.data as T;
  },
};

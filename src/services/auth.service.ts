import { apiClient } from './api.client';
import { extractErrorMessage } from '../utils/apiError';
import { LoginResponse, User } from '../types/user';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      return res.data.data as LoginResponse;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Có lỗi xảy ra khi đăng nhập'));
    }
  },

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    try {
      await apiClient.post('/auth/register', {
        firstName, lastName, email, password, confirmPassword,
      });
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Đăng ký thất bại'));
    }
  },

  async getMe(): Promise<User> {
    try {
      const res = await apiClient.get('/auth/me');
      return res.data.data as User;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Không lấy được thông tin người dùng'));
    }
  },

  async googleLogin(credential: string): Promise<LoginResponse> {
    try {
      const res = await apiClient.post('/auth/google-login', { credential });
      return res.data.data as LoginResponse;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Đăng nhập Google thất bại'));
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await apiClient.post('/auth/forgot-password', { email });
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Email không tồn tại trong hệ thống'));
    }
  },

  async logout(refreshToken: string): Promise<void> {
    try {
      await apiClient.post('/auth/log-out', null, {
        headers: { 'x-refresh-token': refreshToken },
      });
    } catch {
      // Logout dù lỗi vẫn coi như xong (FE sẽ clear token)
    }
  },
};

export const loginAPI = async (email: string, password: string) => {
  const data = await authService.login(email, password);
  return { status: 200, message: 'OK', data };
};

export const registerAPI = async (
  firstName: string, lastName: string,
  email: string, password: string,
  confirmPassword: string
) => {
  await authService.register(firstName, lastName, email, password, confirmPassword);
  return { status: 201, message: 'OK' };
};

export const getMeAPI = async (_token?: string): Promise<User> => {
  return authService.getMe();
};

export const googleLoginAPI = async (credential: string) => {
  const data = await authService.googleLogin(credential);
  return { status: 200, message: 'OK', data };
};

export const forgotPasswordAPI = async (email: string) => {
  await authService.forgotPassword(email);
  return { status: 200, message: 'OK' };
};
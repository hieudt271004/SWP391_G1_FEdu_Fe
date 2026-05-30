import { apiClient, extractErrorMessage } from './api.client';

export const studentService = {
  async getDashboard(): Promise<unknown> {
    try {
      const res = await apiClient.get('/student/dashboard');
      return res.data.data;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Không tải được dashboard'));
    }
  },

  async getMyClassrooms(): Promise<unknown[]> {
    try {
      const res = await apiClient.get('/student/classrooms');
      return res.data.data as unknown[];
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Không tải được danh sách lớp học'));
    }
  },

  // TODO: getMilestoneById, submitMilestone, getProfile, updateProfile, ...
};
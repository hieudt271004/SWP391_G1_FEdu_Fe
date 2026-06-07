import { apiClient } from './api.client';
import { extractErrorMessage } from '../utils/apiError';

export const subMentorService = {
  /** Danh sách mentee đang hỗ trợ */
  async getMentees(): Promise<unknown[]> {
    try {
      const res = await apiClient.get('/support/mentees');
      return res.data.data as unknown[];
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Không tải được danh sách mentee'));
    }
  },

  async getDashboard(): Promise<unknown> {
    try {
      const res = await apiClient.get('/support/dashboard');
      return res.data.data;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Không tải được dashboard'));
    }
  },

  // TODO: reviewSubmission, getMenteeProgress, ...
};
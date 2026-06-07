import { apiClient } from './api.client';
import { extractErrorMessage } from '../utils/apiError';

export interface CreateLearningPathRequest {
  subjectId: number;
  pathName: string;
  description?: string;
}

export interface LearningPathResponse {
  pathId: number;
  subjectId: number;
  pathName: string;
  description: string;
  createdById: number;
  createdAt: string;
  updatedAt: string;
}

export interface LearningNodeResponse {
  nodeId: number;
  learningPathId?: number;
  classroomPathId?: number;
  title: string;
  description: string;
  nodeType: 'AT_HOME' | 'ON_CLASS';
  branchName?: string;
  displayOrder: number;
  status: 'LOCKED' | 'OPEN' | 'HIDDEN';
  isRequired: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NodeEdgeResponse {
  edgeId: number;
  fromNodeId: number;
  toNodeId: number;
  branchName?: string;
  minScore?: number;
  maxScore?: number;
}

export interface LearningPathGraphResponse {
  pathId: number;
  pathName: string;
  description: string;
  nodes: LearningNodeResponse[];
  edges: NodeEdgeResponse[];
}

export interface CreateLearningNodeRequest {
  learningPathId?: number;
  classroomPathId?: number;
  title: string;
  description?: string;
  nodeType: 'AT_HOME' | 'ON_CLASS';
  branchName?: string;
  displayOrder: number;
  status?: 'LOCKED' | 'OPEN' | 'HIDDEN';
  isRequired?: boolean;
}

export interface CreateNodeEdgeRequest {
  fromNodeId: number;
  toNodeId: number;
  branchName?: string;
  minScore?: number;
  maxScore?: number;
}

export const learningPathService = {
  async getSubjectLearningPaths(subjectId: number): Promise<LearningPathResponse[]> {
    try {
      const res = await apiClient.get(`/teacher-manage/subjects/${subjectId}/learning-paths`);
      return (res.data?.data || res.data) as LearningPathResponse[];
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Failed to fetch subject learning paths'));
    }
  },

  async createLearningPath(request: CreateLearningPathRequest): Promise<LearningPathResponse> {
    try {
      const res = await apiClient.post('/teacher-manage/learning-paths', request);
      return (res.data?.data || res.data) as LearningPathResponse;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Failed to create learning path'));
    }
  },

  async getLearningPathGraph(pathId: number): Promise<LearningPathGraphResponse> {
    try {
      const res = await apiClient.get(`/teacher-manage/learning-paths/${pathId}/graph`);
      return (res.data?.data || res.data) as LearningPathGraphResponse;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Failed to fetch learning path graph'));
    }
  },

  async getClassroomLearningPathGraph(classroomId: number): Promise<LearningPathGraphResponse> {
    try {
      const res = await apiClient.get(`/teacher-manage/classrooms/${classroomId}/graph`);
      return (res.data?.data || res.data) as LearningPathGraphResponse;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Failed to fetch classroom learning path graph'));
    }
  },

  async createLearningNode(request: CreateLearningNodeRequest): Promise<LearningNodeResponse> {
    try {
      const res = await apiClient.post('/teacher-manage/learning-nodes', request);
      return (res.data?.data || res.data) as LearningNodeResponse;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Failed to create learning node'));
    }
  },

  async deleteLearningNode(nodeId: number): Promise<void> {
    try {
      await apiClient.delete(`/teacher-manage/learning-nodes/${nodeId}`);
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Failed to delete learning node'));
    }
  },

  async createNodeEdge(request: CreateNodeEdgeRequest): Promise<NodeEdgeResponse> {
    try {
      const res = await apiClient.post('/teacher-manage/node-edges', request);
      return (res.data?.data || res.data) as NodeEdgeResponse;
    } catch (err) {
      throw new Error(extractErrorMessage(err, 'Failed to create node edge'));
    }
  },
};

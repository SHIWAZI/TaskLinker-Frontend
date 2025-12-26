import { api } from './axios';

/**
 * Get all tasks created by the logged-in client
 * Backend: GET /tasks
 */
export const getClientTasksApi = async () => {
  const res = await api.get('/tasks');
  return res.data;
};

/**
 * Get single task by ID
 * Backend: GET /tasks/:id
 */
export const getTaskByIdApi = async (taskId: string) => {
  const res = await api.get(`/tasks/${taskId}`);
  return res.data;
};

/**
 * Create a new task
 * Backend: POST /tasks
 */
export const createTaskApi = async (data: {
  title: string;
  description: string;
  service: string;
  budgetMin: number;
  budgetMax: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}) => {
  const res = await api.post('/tasks', data);
  return res.data;
};


export const getOpenTasks = async () => {
  const { data } = await api.get('/tasks/open');
  return data;
};

export const getAssignedTasks = async () => {
  const { data } = await api.get('/contractor/tasks');
  return data;
};

export const placeBid = async (
  taskId: string,
  payload: { amount: number; days: number; proposal?: string }
) => {
  const { data } = await api.post(`/tasks/${taskId}/bids`, payload);
  return data;
};

import { api } from './axios';

export const loginApi = async (data: {
  identifier: string;
  password: string;
}) => {
  const res = await api.post('/auth/login', data,{withCredentials: true});
  return res.data;
};

export const registerApi = async (data: {
  role: 'client' | 'contractor';
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

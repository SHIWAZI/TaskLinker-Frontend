import { api } from "./axios";


export const getChats = async () => {
  const res = await api.get('/chatRoute/chats');
  return res.data;
};

export const getMessages = async (taskId: string) => {
  const res = await api.get(`/chatRoute/chats/${taskId}`);
  return res.data;
};


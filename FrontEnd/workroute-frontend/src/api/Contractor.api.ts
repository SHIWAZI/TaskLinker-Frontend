import { api } from "./axios";

export const getContractorProfile = async () => {
  const { data } = await api.get('/contractor/profile',{withCredentials: true});
  return data;
};

export const updateContractorProfile = async (payload: any) => {
  const { data } = await api.put('/contractor/profile', payload);
  return data;
};

export const uploadPortfolio = async (payload: {
  url: string;
  type: 'image' | 'video';
}) => {
  const { data } = await api.post('/contractor/portfolio', payload);
  return data;
};

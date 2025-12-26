export type ChatTask = {
  id: string;
  title: string;
  status?: string;
};

export type ChatUser = {
  id: string;
  name: string;
  role: 'client' | 'contractor' | 'admin';
};

export type ChatMessage = {
  id: string;
  content: string;
  taskId: string;
  sender: ChatUser;
  createdAt?: string;
};

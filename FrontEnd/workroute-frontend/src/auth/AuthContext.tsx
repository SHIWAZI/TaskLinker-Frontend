import { createContext, useContext, useState } from 'react';
import { connectSocket, disconnectSocket } from '../socket/socket';

type User = {
  id: string;
  role: 'client' | 'contractor';
};

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string, user: User) => {
    localStorage.setItem('accessToken', token);
    setUser(user);
    connectSocket(token); // 🔥 CONNECT SOCKET HERE
  };

  const logout = () => {
    disconnectSocket();
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

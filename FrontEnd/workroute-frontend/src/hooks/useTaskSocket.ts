import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type ServerToClientEvents = {
  'chat:message': (message: any) => void;
};

type ClientToServerEvents = {
  'task:join': (taskId: string) => void;
  'chat:send': (payload: { taskId: string; content: string }) => void;
};

export function useTaskSocket() {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(
    null
  );

  useEffect(() => {
    if (socketRef.current) return;

    const token = localStorage.getItem('token');

    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return socketRef; // ✅ THIS WAS MISSING BEFORE
}

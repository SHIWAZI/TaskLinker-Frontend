import { useEffect, useState } from 'react';
import { getSocket } from '../socket/socket';

export function useLiveLocation(taskId: string) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handler = (data: any) => {
      if (data.taskId === taskId) {
        setLocation({ lat: data.lat, lng: data.lng });
      }
    };

    socket.on('location:update', handler);

    return () => {
      socket.off('location:update', handler);
    };
  }, [taskId]);

  return location;
}

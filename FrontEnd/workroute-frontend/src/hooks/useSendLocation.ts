import { useEffect, useRef } from 'react';
import { getSocket } from '../socket/socket';

type Options = {
  enabled: boolean;
  taskId: string;
};

export function useSendLocation({ enabled, taskId }: Options) {
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || !taskId) return;

    const socket = getSocket();
    if (!socket) return;

    // Start watching GPS
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        socket.emit('location:update', {
          taskId,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('GPS error:', error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000
      }
    );

    // Cleanup when disabled or unmount
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [enabled, taskId]);
}

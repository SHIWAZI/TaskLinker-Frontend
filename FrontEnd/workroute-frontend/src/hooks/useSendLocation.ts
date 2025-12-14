import { useEffect } from 'react';
import { getSocket } from '../socket/socket';

export function useSendLocation(taskId: string, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const socket = getSocket();
    if (!socket || !taskId) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        socket.emit('location:update', {
          taskId,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [taskId, enabled]);
}

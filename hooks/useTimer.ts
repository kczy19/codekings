import { useEffect } from 'react';
import { useRoomStore } from '../store/roomStore';

export function useTimer() {
  const { currentRoom, updateTimer } = useRoomStore();

  useEffect(() => {
    if (!currentRoom || currentRoom.status !== 'in-progress') return;

    const timer = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [currentRoom?.status]);
}
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { problems } from '../data/problems';
import type { Room, Participant } from '../types/room';

interface RoomStore {
  rooms: Record<string, Room>;
  currentRoom: Room | null;
  currentParticipantId: string | null;
  setCurrentRoom: (room: Room) => void;
  updateParticipant: (participantId: string, updates: Partial<Participant>) => void;
  updateCode: (participantId: string, code: string) => void;
  updateTimer: () => void;
  switchProblem: (index: number) => void;
  startRoom: () => void;
  getCurrentParticipant: () => Participant | undefined;
  setCurrentParticipantId: (id: string) => void;
  addRoom: (room: Room) => void;
  getRoom: (roomId: string) => Room | null;
}

export const useRoomStore = create<RoomStore>()(
  persist(
    (set, get) => ({
      rooms: {},
      currentRoom: null,
      currentParticipantId: null,
      
      addRoom: (room) => 
        set((state) => ({
          rooms: { ...state.rooms, [room.id]: room }
        })),
      
      getRoom: (roomId) => {
        const state = get();
        return state.rooms[roomId] || null;
      },
      
      setCurrentRoom: (room) => 
        set((state) => ({
          currentRoom: room,
          rooms: { ...state.rooms, [room.id]: room }
        })),
      
      getCurrentParticipant: () => {
        const state = get();
        return state.currentRoom?.participants.find(
          (p) => p.id === state.currentParticipantId
        );
      },
      
      setCurrentParticipantId: (id) => 
        set({ currentParticipantId: id }),
      
      updateParticipant: (participantId, updates) =>
        set((state) => {
          if (!state.currentRoom) return state;

          const updatedParticipants = state.currentRoom.participants.map((p) =>
            p.id === participantId ? { ...p, ...updates } : p
          );

          const readyCount = updatedParticipants.filter(p => p.isReady).length;
          const shouldStart = readyCount >= Math.ceil(updatedParticipants.length / 2);

          const updatedRoom = {
            ...state.currentRoom,
            participants: updatedParticipants,
            status: shouldStart ? 'in-progress' : state.currentRoom.status,
          };

          return {
            currentRoom: updatedRoom,
            rooms: { ...state.rooms, [updatedRoom.id]: updatedRoom }
          };
        }),
      
      updateCode: (participantId, code) =>
        set((state) => {
          if (!state.currentRoom) return state;
          
          const updatedRoom = {
            ...state.currentRoom,
            participants: state.currentRoom.participants.map((p) =>
              p.id === participantId ? { ...p, code } : p
            ),
          };

          return {
            currentRoom: updatedRoom,
            rooms: { ...state.rooms, [updatedRoom.id]: updatedRoom }
          };
        }),
      
      updateTimer: () =>
        set((state) => {
          if (!state.currentRoom || state.currentRoom.status !== 'in-progress') return state;
          
          const newTimeRemaining = Math.max(0, state.currentRoom.timeRemaining - 1);
          const updatedRoom = {
            ...state.currentRoom,
            timeRemaining: newTimeRemaining,
            status: newTimeRemaining === 0 ? 'completed' : state.currentRoom.status,
          };

          return {
            currentRoom: updatedRoom,
            rooms: { ...state.rooms, [updatedRoom.id]: updatedRoom }
          };
        }),
      
      switchProblem: (index) =>
        set((state) => {
          if (!state.currentRoom) return state;
          
          const updatedRoom = {
            ...state.currentRoom,
            currentProblemIndex: index,
          };

          return {
            currentRoom: updatedRoom,
            rooms: { ...state.rooms, [updatedRoom.id]: updatedRoom }
          };
        }),
      
      startRoom: () =>
        set((state) => {
          if (!state.currentRoom) return state;
          
          const updatedRoom = {
            ...state.currentRoom,
            status: 'in-progress',
            startTime: Date.now(),
          };

          return {
            currentRoom: updatedRoom,
            rooms: { ...state.rooms, [updatedRoom.id]: updatedRoom }
          };
        }),
    }),
    {
      name: 'room-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        rooms: state.rooms,
        currentParticipantId: state.currentParticipantId
      }),
    }
  )
);

// Add storage event listener to sync state across tabs
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'room-storage') {
      const newState = JSON.parse(e.newValue || '{}');
      if (newState.state?.rooms) {
        useRoomStore.setState({
          rooms: newState.state.rooms,
          currentRoom: useRoomStore.getState().currentRoom
            ? newState.state.rooms[useRoomStore.getState().currentRoom.id] || null
            : null
        });
      }
    }
  });
}
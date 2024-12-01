import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoomStore } from '../store/roomStore';
import { problems } from '../data/problems';

export function CreateRoom() {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();
  const { setCurrentRoom, setCurrentParticipantId, addRoom } = useRoomStore();

  const handleCreate = () => {
    if (!name || !roomName) return;

    const participantId = Date.now().toString();
    const roomId = Math.random().toString(36).substring(7);
    
    const newRoom = {
      id: roomId,
      name: roomName,
      participants: [{
        id: participantId,
        name,
        code: '',
        isReady: false,
        hasCompleted: false,
        problemResults: [],
      }],
      problems,
      currentProblemIndex: 0,
      status: 'waiting',
      maxParticipants: 10,
      timeRemaining: 1800,
    };

    setCurrentParticipantId(participantId);
    addRoom(newRoom);
    setCurrentRoom(newRoom);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Create Room</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Name
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter room name"
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={!name || !roomName}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}
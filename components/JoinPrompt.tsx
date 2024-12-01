import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoomStore } from '../store/roomStore';

interface JoinPromptProps {
  roomId: string;
  onJoin: () => void;
}

export function JoinPrompt({ roomId, onJoin }: JoinPromptProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getRoom, setCurrentRoom, setCurrentParticipantId } = useRoomStore();

  const handleJoin = () => {
    if (!name) {
      setError('Please enter your name');
      return;
    }

    const room = getRoom(roomId);
    if (!room) {
      setError('Room not found');
      navigate('/');
      return;
    }

    if (room.participants.length >= room.maxParticipants) {
      setError('Room is full');
      return;
    }

    const participantId = Date.now().toString();
    const newParticipant = {
      id: participantId,
      name,
      code: '',
      isReady: false,
      hasCompleted: false,
      problemResults: [],
    };

    const updatedRoom = {
      ...room,
      participants: [...room.participants, newParticipant],
    };

    setCurrentParticipantId(participantId);
    setCurrentRoom(updatedRoom);
    onJoin();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Join Room</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
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
              autoFocus
            />
          </div>
          <button
            onClick={handleJoin}
            disabled={!name}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoomStore } from '../store/roomStore';

export function JoinRoom() {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentRoom, setCurrentParticipantId, getRoom } = useRoomStore();

  const handleJoin = () => {
    if (!name || !roomId) {
      setError('Please fill in all fields');
      return;
    }

    const existingRoom = getRoom(roomId);

    if (!existingRoom) {
      setError('Room not found');
      return;
    }

    if (existingRoom.participants.length >= existingRoom.maxParticipants) {
      setError('Room is full!');
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
      ...existingRoom,
      participants: [...existingRoom.participants, newParticipant],
    };

    setCurrentParticipantId(participantId);
    setCurrentRoom(updatedRoom);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Join Room</h1>
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room ID
            </label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter room ID"
            />
          </div>
          <button
            onClick={handleJoin}
            disabled={!name || !roomId}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
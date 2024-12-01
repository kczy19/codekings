import { useState } from 'react';
import { Check, Users } from 'lucide-react';
import { useRoomStore } from '../store/roomStore';

export function ReadyScreen() {
  const { currentRoom, updateParticipant } = useRoomStore();
  const [isReady, setIsReady] = useState(false);

  if (!currentRoom) return null;

  const readyCount = currentRoom.participants.filter(p => p.isReady).length;
  const totalParticipants = currentRoom.participants.length;
  const readyPercentage = (readyCount / totalParticipants) * 100;
  const currentParticipant = currentRoom.participants[0];

  const handleReady = () => {
    setIsReady(true);
    updateParticipant(currentParticipant.id, { isReady: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Waiting for Players</h2>
        
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 text-lg mb-2">
            <Users size={24} />
            <span>{readyCount}/{totalParticipants} players ready</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${readyPercentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {currentRoom.participants.map(participant => (
              <div 
                key={participant.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span>{participant.name}</span>
                {participant.isReady && (
                  <Check className="text-green-500" size={20} />
                )}
              </div>
            ))}
          </div>

          {!isReady && (
            <button
              onClick={handleReady}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              I'm Ready
            </button>
          )}
        </div>

        {readyPercentage >= 50 && (
          <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg">
            50% of players are ready! The competition will begin shortly...
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Users, Timer, Trophy, Link as LinkIcon, Check } from 'lucide-react';
import { Room } from '../types/room';

interface RoomHeaderProps {
  room: Room;
  onProblemChange: (index: number) => void;
}

export function RoomHeader({ room, onProblemChange }: RoomHeaderProps) {
  const [showCopied, setShowCopied] = useState(false);
  const readyCount = room.participants.filter((p) => p.isReady).length;
  const completedCount = room.participants.filter((p) => p.hasCompleted).length;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/room/${room.id}`;
    navigator.clipboard.writeText(inviteLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{room.name}</h1>
          <button
            onClick={handleCopyInviteLink}
            className="mt-2 flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <LinkIcon size={16} />
            {showCopied ? (
              <span className="flex items-center gap-1">
                <Check size={16} className="text-green-400" />
                Copied!
              </span>
            ) : (
              'Copy invite link'
            )}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users size={20} />
            <span>{readyCount}/{room.participants.length} Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer size={20} />
            <span>Time: {formatTime(room.timeRemaining)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy size={20} />
            <span>{completedCount} Completed</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {room.problems.map((problem, index) => (
          <button
            key={problem.id}
            onClick={() => onProblemChange(index)}
            className={`px-4 py-2 rounded ${
              index === room.currentProblemIndex
                ? 'bg-blue-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Problem {index + 1}
            <span className={`ml-2 px-2 py-1 rounded text-sm ${
              problem.difficulty === 'easy'
                ? 'bg-green-500'
                : problem.difficulty === 'medium'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}>
              {problem.difficulty}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
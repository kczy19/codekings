import { User } from 'lucide-react';
import { Participant } from '../types/room';

interface ParticipantsListProps {
  participants: Participant[];
  maxParticipants: number;
}

export function ParticipantsList({ participants, maxParticipants }: ParticipantsListProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4">Participants ({participants.length}/{maxParticipants})</h3>
      <div className="space-y-2">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <User size={20} className="text-gray-600" />
              <span>{participant.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {participant.isReady && (
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Ready
                </span>
              )}
              {participant.hasCompleted && (
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
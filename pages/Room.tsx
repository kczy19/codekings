import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '../components/Editor';
import { RoomHeader } from '../components/RoomHeader';
import { Problem } from '../components/Problem';
import { TestResults } from '../components/TestResults';
import { ParticipantsList } from '../components/ParticipantsList';
import { CodeActions } from '../components/CodeActions';
import { ReadyScreen } from '../components/ReadyScreen';
import { JoinPrompt } from '../components/JoinPrompt';
import { useRoomStore } from '../store/roomStore';
import { runTestCase } from '../utils/codeRunner';
import { useTimer } from '../hooks/useTimer';
import type { TestResult } from '../types/room';

export function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { currentRoom, getCurrentParticipant, getRoom, updateCode, switchProblem } = useRoomStore();
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publicResults, setPublicResults] = useState<TestResult[]>([]);
  const [privateResults, setPrivateResults] = useState<TestResult[]>([]);
  const [showJoinPrompt, setShowJoinPrompt] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    
    const room = getRoom(roomId);
    if (!room) {
      navigate('/');
      return;
    }

    if (!getCurrentParticipant()) {
      setShowJoinPrompt(true);
    }
  }, [roomId, getCurrentParticipant, getRoom]);

  useTimer();

  const currentParticipant = getCurrentParticipant();

  if (!currentRoom) {
    return <div>Room not found</div>;
  }

  if (showJoinPrompt) {
    return <JoinPrompt roomId={roomId!} onJoin={() => setShowJoinPrompt(false)} />;
  }

  if (currentRoom.status === 'waiting') {
    return <ReadyScreen />;
  }

  const currentProblem = currentRoom.problems[currentRoom.currentProblemIndex];

  const handleRunTests = async () => {
    if (!currentProblem || !currentParticipant) return;
    
    setIsRunning(true);
    const code = currentParticipant.code || currentProblem.starterCode;
    
    const results = await Promise.all(
      currentProblem.publicTestCases.map(async (testCase) => {
        const result = await runTestCase(code, testCase);
        return {
          testCaseId: testCase.id,
          ...result,
        };
      })
    );
    
    setPublicResults(results);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if (!currentProblem || !currentParticipant) return;
    
    setIsSubmitting(true);
    const code = currentParticipant.code || currentProblem.starterCode;
    
    const results = await Promise.all([
      ...currentProblem.publicTestCases,
      ...currentProblem.privateTestCases,
    ].map(async (testCase) => {
      const result = await runTestCase(code, testCase);
      return {
        testCaseId: testCase.id,
        ...result,
      };
    }));
    
    setPublicResults(results.slice(0, currentProblem.publicTestCases.length));
    setPrivateResults(results.slice(currentProblem.publicTestCases.length));
    setIsSubmitting(false);

    const allPassed = results.every(result => result.passed);
    if (allPassed) {
      useRoomStore.getState().updateParticipant(currentParticipant.id, {
        hasCompleted: true,
        problemResults: [
          ...currentParticipant.problemResults,
          {
            problemIndex: currentRoom.currentProblemIndex,
            testResults: results,
          },
        ],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <RoomHeader 
        room={currentRoom} 
        onProblemChange={switchProblem}
      />
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Problem
            title={currentProblem.title}
            description={currentProblem.description}
          />
          <div className="bg-white rounded-lg p-4">
            <Editor
              code={currentParticipant?.code || currentProblem.starterCode}
              onChange={(code) => updateCode(currentParticipant?.id || '', code)}
            />
            <div className="mt-4">
              <CodeActions
                onRun={handleRunTests}
                onSubmit={handleSubmit}
                isRunning={isRunning}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
          {(publicResults.length > 0 || privateResults.length > 0) && (
            <div className="bg-white rounded-lg p-4 space-y-4">
              {publicResults.length > 0 && (
                <TestResults results={publicResults} isPublic={true} />
              )}
              {privateResults.length > 0 && (
                <TestResults results={privateResults} isPublic={false} />
              )}
            </div>
          )}
        </div>
        <div>
          <ParticipantsList
            participants={currentRoom.participants}
            maxParticipants={currentRoom.maxParticipants}
          />
        </div>
      </div>
    </div>
  );
}
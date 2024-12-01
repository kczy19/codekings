export interface Room {
  id: string;
  name: string;
  participants: Participant[];
  problems: Problem[];
  currentProblemIndex: number;
  status: 'waiting' | 'in-progress' | 'completed';
  maxParticipants: number;
  timeRemaining: number;
  startTime?: number;
}

export interface Participant {
  id: string;
  name: string;
  code: string;
  isReady: boolean;
  hasCompleted: boolean;
  problemResults: {
    problemIndex: number;
    testResults: TestResult[];
  }[];
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  publicTestCases: TestCase[];
  privateTestCases: TestCase[];
  starterCode: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  output?: string;
  expectedOutput?: string;
  error?: string;
}
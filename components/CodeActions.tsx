import { Play, Send } from 'lucide-react';

interface CodeActionsProps {
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
}

export function CodeActions({ onRun, onSubmit, isRunning, isSubmitting }: CodeActionsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onRun}
        disabled={isRunning}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        <Play size={20} />
        Run Tests
      </button>
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        <Send size={20} />
        Submit Solution
      </button>
    </div>
  );
}
import { TestResult } from '../types/room';
import { CheckCircle2, XCircle } from 'lucide-react';

interface TestResultsProps {
  results: TestResult[];
  isPublic?: boolean;
}

export function TestResults({ results, isPublic = true }: TestResultsProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">
        {isPublic ? 'Public Test Results' : 'Private Test Results'}
      </h3>
      <div className="space-y-2">
        {results.map((result, index) => (
          <div
            key={result.testCaseId}
            className={`p-3 rounded-lg ${
              result.passed ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {result.passed ? (
                <CheckCircle2 className="text-green-600" size={20} />
              ) : (
                <XCircle className="text-red-600" size={20} />
              )}
              <span className="font-medium">Test Case {index + 1}</span>
            </div>
            {isPublic && (
              <div className="text-sm space-y-1">
                {result.error ? (
                  <div className="text-red-600">{result.error}</div>
                ) : (
                  <>
                    <div className="text-gray-600">
                      Your Output: <code className="bg-gray-100 px-1 py-0.5 rounded">{result.output}</code>
                    </div>
                    <div className="text-gray-600">
                      Expected: <code className="bg-gray-100 px-1 py-0.5 rounded">{result.expectedOutput}</code>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
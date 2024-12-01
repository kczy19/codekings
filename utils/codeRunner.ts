import { TestCase } from '../types/room';

function safeJSONParse(str: string) {
  try {
    return JSON.parse(str);
  } catch (error) {
    // If it's already a string literal, wrap it in quotes
    if (typeof str === 'string' && !str.startsWith('"')) {
      return JSON.parse(`"${str}"`);
    }
    throw error;
  }
}

export async function runCode(code: string, input: string): Promise<string> {
  try {
    // Create a safe evaluation environment
    const fn = new Function('return ' + code)();
    
    // Parse input carefully
    let args;
    try {
      // Try parsing as a JSON array first
      args = JSON.parse(`[${input}]`);
    } catch {
      // If that fails, try parsing each argument individually
      args = input.split(',').map(arg => {
        const trimmed = arg.trim();
        try {
          return safeJSONParse(trimmed);
        } catch {
          return trimmed;
        }
      });
    }

    const result = fn(...args);
    
    // Ensure consistent string output
    return typeof result === 'string' && !result.startsWith('"') 
      ? `"${result}"` 
      : JSON.stringify(result);
  } catch (error) {
    throw new Error(`Runtime error: ${error.message}`);
  }
}

export async function runTestCase(code: string, testCase: TestCase) {
  try {
    const output = await runCode(code, testCase.input);
    const expectedOutput = testCase.expectedOutput.startsWith('"') 
      ? testCase.expectedOutput 
      : JSON.stringify(safeJSONParse(testCase.expectedOutput));
    
    return {
      passed: output === expectedOutput,
      output,
      expectedOutput,
    };
  } catch (error) {
    return {
      passed: false,
      error: error.message,
    };
  }
}
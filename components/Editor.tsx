import { Editor as MonacoEditor } from '@monaco-editor/react';

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export function Editor({ code, onChange, readOnly = false }: EditorProps) {
  return (
    <MonacoEditor
      height="60vh"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      onChange={(value) => onChange(value || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        readOnly,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}
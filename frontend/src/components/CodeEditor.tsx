import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play } from 'lucide-react';
import axios from 'axios';

const CodeEditor = ({ initialCode = '# Write your Python code here\nprint("Hello, Antigravity!")' }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...');
    try {
      // In a real app, this would point to the FastAPI endpoint
      const response = await axios.post('http://localhost:8000/api/execute', { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error executing code: ' + (error as any).message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="glass-panel flex flex-col h-[500px] overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-dark-800 bg-dark-900/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-sm text-dark-400 font-mono">main.py</span>
        </div>
        <button 
          onClick={runCode}
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <Play className="w-4 h-4" /> {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      
      <div className="flex-1 flex">
        <div className="flex-1 border-r border-dark-800 relative">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'Fira Code',
              padding: { top: 16 }
            }}
          />
        </div>
        <div className="w-1/3 bg-dark-950 p-4 font-mono text-sm">
          <div className="text-dark-400 mb-2 border-b border-dark-800 pb-2">Output terminal:</div>
          <pre className="text-gray-300 whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

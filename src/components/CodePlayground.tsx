import { useState } from 'react';
import { Play, Code, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useWebR } from './WebRProvider';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CodePlaygroundProps {
  initialCode: string;
}

export default function CodePlayground({ initialCode }: CodePlaygroundProps) {
  const { status, runCode } = useWebR();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (status !== 'ready') return;
    setIsRunning(true);
    setError(null);
    setOutput(null);

    try {
      const result = await runCode(code);
      setOutput(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setError(err.message || 'An error occurred while running the code.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-brutal-black brutal-border brutal-shadow-lg mb-12 overflow-hidden">
      <div className="bg-white/10 p-4 border-b-2 border-white/20 flex justify-between items-center">
        <div className="flex items-center gap-2 text-brutal-yellow font-mono font-bold uppercase tracking-widest text-xs">
          <Code size={16} />
          Interactive R Console
        </div>
        <div className="flex items-center gap-2">
          {status === 'loading' && (
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
              <Loader2 size={12} className="animate-spin" />
              Initializing R...
            </div>
          )}
          {status === 'ready' && (
            <div className="flex items-center gap-2 text-brutal-green text-[10px] font-black uppercase tracking-widest">
              <CheckCircle2 size={12} />
              R Engine Ready
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest">
              <AlertCircle size={12} />
              R Engine Error
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Editor */}
        <div className="p-6 border-r-2 border-white/10">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 bg-transparent text-brutal-green font-mono text-lg focus:outline-none resize-none"
            spellCheck={false}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleRun}
              disabled={status !== 'ready' || isRunning}
              className={cn(
                "bg-brutal-yellow brutal-border px-6 py-2 font-black flex items-center gap-2 brutal-3d transition-all",
                (status !== 'ready' || isRunning) && "opacity-50 grayscale cursor-not-allowed"
              )}
            >
              {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
              {isRunning ? 'RUNNING...' : 'RUN CODE'}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="p-6 bg-black/40 font-mono text-sm overflow-auto max-h-64">
          <div className="text-white/40 uppercase tracking-widest text-[10px] font-black mb-4">Output:</div>
          {output && (
            <pre className="text-white whitespace-pre-wrap">{output}</pre>
          )}
          {error && (
            <div className="text-red-400 flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-1" />
              <span>{error}</span>
            </div>
          )}
          {!output && !error && !isRunning && (
            <div className="text-white/20 italic">Run code to see output here...</div>
          )}
          {isRunning && (
            <div className="text-brutal-yellow animate-pulse">Executing R script...</div>
          )}
        </div>
      </div>
    </div>
  );
}

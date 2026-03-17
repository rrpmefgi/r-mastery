import React from 'react';
import { Terminal, Cpu, Image as ImageIcon } from 'lucide-react';

interface CodeOutputTableProps {
  code: string;
  output?: string[];
  plot?: string;
}

export const CodeOutputTable: React.FC<CodeOutputTableProps> = ({ code, output, plot }) => {
  React.useEffect(() => {
    if (output && output.length > 0) {
      console.log('R Output:', output.join('\n'));
    }
  }, [output]);

  return (
    <div className="my-8 border-4 border-black overflow-hidden bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
        {/* Code Section */}
        <div className="p-6 bg-white font-mono text-sm whitespace-pre overflow-x-auto leading-relaxed">
          <div className="text-[10px] font-black uppercase opacity-30 mb-2">Source Code</div>
          {code}
        </div>
        
        {/* Output Section */}
        <div className="p-6 bg-gray-50 font-mono text-sm overflow-x-auto">
          <div className="text-[10px] font-black uppercase opacity-30 mb-2">Output</div>
          {output && output.length > 0 ? (
            <div className="space-y-1">
              {output.map((line, i) => (
                <div key={i} className="flex gap-2">
                  <span className="opacity-50 shrink-0 select-none">{'>'}</span>
                  <span className="break-all">{line}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 opacity-40 italic">
              <p>No output generated</p>
            </div>
          )}
          
          {plot && (
            <div className="mt-6">
              <div className="p-2 bg-white border-2 border-black">
                <img 
                  src={plot} 
                  alt="R Plot Output" 
                  className="w-full h-auto" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

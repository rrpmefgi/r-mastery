import React, { createContext, useContext, useEffect, useState } from 'react';
import { WebR } from 'webr';

interface WebRContextType {
  webR: WebR | null;
  status: 'loading' | 'ready' | 'error';
  runCode: (code: string) => Promise<any>;
}

const WebRContext = createContext<WebRContextType | undefined>(undefined);

export function WebRProvider({ children }: { children: React.ReactNode }) {
  const [webR, setWebR] = useState<WebR | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const initWebR = async () => {
      try {
        const instance = new WebR();
        await instance.init();
        setWebR(instance);
        setStatus('ready');
      } catch (error) {
        console.error('Failed to initialize webR:', error);
        setStatus('error');
      }
    };

    initWebR();
  }, []);

  const runCode = async (code: string) => {
    if (!webR || status !== 'ready') {
      throw new Error('webR is not ready');
    }

    try {
      const shelter = await new webR.Shelter();
      const result = await shelter.evalR(code);
      const output = await result.toJs();
      await shelter.purge();
      return output;
    } catch (error) {
      console.error('Error running R code:', error);
      throw error;
    }
  };

  return (
    <WebRContext.Provider value={{ webR, status, runCode }}>
      {children}
    </WebRContext.Provider>
  );
}

export function useWebR() {
  const context = useContext(WebRContext);
  if (context === undefined) {
    throw new Error('useWebR must be used within a WebRProvider');
  }
  return context;
}

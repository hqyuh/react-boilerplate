import { useCallback, useEffect, useRef, useState } from 'react';

export const useWorker = () => {
  const [users, setUsers] = useState<any>();
  const workerRef = useRef<Worker>();

  const callWorker = useCallback((payload: any) => {
    if (payload) {
      workerRef.current?.postMessage(payload);
    }
  }, []);

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), {
      type: 'module'
    });
    workerRef.current = worker;

    workerRef.current.onmessage = (event) => {
      console.log('🐔 =>  event useWorker:', event);
      const { data } = event.data;
      setUsers({ data });
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = undefined;
      }
    };
  }, []);

  return {
    users,
    callWorker
  };
};

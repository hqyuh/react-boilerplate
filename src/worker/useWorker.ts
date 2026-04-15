import { useCallback, useEffect, useRef, useState } from 'react';

export const useWorker = () => {
  const [users, setUsers] = useState<any>();
  const workerRef = useRef<Worker | null>(null);

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

    worker.onmessage = (event) => {
      const { data } = event.data;
      setUsers({ data });
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  return {
    users,
    callWorker
  };
};

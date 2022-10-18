import { useCallback, useState } from 'react';

export function useRateLimit(rateLimit: number, callback: Function) {
  const [ready, setReady] = useState(true);
  return useCallback(
    (...args: any[]) => {
      if (ready) {
        setReady(false);
        callback(...args);
        setTimeout(() => {
          setReady(true);
        }, rateLimit);
      }
    },
    [ready, rateLimit, callback]
  );
}

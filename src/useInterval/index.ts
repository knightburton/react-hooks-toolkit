import { useRef, useEffect } from 'react';

const useInterval = (callback: () => void, delay: number | null): void => {
  const interval = useRef<NodeJS.Timeout>();
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) interval.current = setInterval(() => savedCallback?.current?.(), delay);
    return () => interval.current && clearInterval(interval.current);
  }, [delay]);
};

export default useInterval;

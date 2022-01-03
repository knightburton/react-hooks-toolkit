import { useRef, useEffect } from 'react';

const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return undefined;
    const intervalId = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(intervalId);
  }, [delay]);
};

export default useInterval;

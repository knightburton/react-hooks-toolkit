import { useRef, useEffect } from 'react';

const clear = (intervalId: NodeJS.Timer | null) => {
  if (intervalId) clearInterval(intervalId);
};

const useInterval = (callback: () => void, delay: number | null): void => {
  const interval = useRef<NodeJS.Timer | null>(null);
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => () => clear(interval.current), []);

  useEffect(() => {
    if (delay !== null) {
      clear(interval.current);
      interval.current = setInterval(() => savedCallback.current(), delay);
    }
  }, [delay]);
};

export default useInterval;

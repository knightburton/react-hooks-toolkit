import { useRef, useEffect } from 'react';

const clear = (timeoutId: NodeJS.Timeout | null) => {
  if (timeoutId) clearTimeout(timeoutId);
};

const useTimeout = (callback: () => void, delay: number | null): void => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => () => clear(timeout.current), []);

  useEffect(() => {
    if (delay !== null) {
      clear(timeout.current);
      timeout.current = setTimeout(() => savedCallback.current(), delay);
    }
  }, [delay]);
};

export default useTimeout;

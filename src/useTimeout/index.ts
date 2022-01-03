import { useRef, useEffect } from 'react';

const useTimeout = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return undefined;
    const timeoutId = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);
};

export default useTimeout;

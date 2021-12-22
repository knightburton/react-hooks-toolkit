import { useRef, useEffect } from 'react';

const useTimeout = (callback: () => void, delay: number | null): void => {
  const timeout = useRef<NodeJS.Timeout>();
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) timeout.current = setTimeout(() => savedCallback?.current?.(), delay);
    return () => timeout.current && clearTimeout(timeout.current);
  }, [delay]);
};

export default useTimeout;

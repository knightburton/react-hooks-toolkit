import { useRef, useEffect } from 'react';

const useTimeout = (callback: () => void, delay: number | null): void => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );

  useEffect(() => {
    if (delay !== null) timeout.current = setTimeout(() => savedCallback.current(), delay);
  }, [delay]);
};

export default useTimeout;

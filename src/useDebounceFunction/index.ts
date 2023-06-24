import { useCallback, useEffect, useRef } from 'react';

const clear = (timeoutId: NodeJS.Timeout | null) => {
  if (timeoutId) clearTimeout(timeoutId);
};

const useDebounceFunction = <T extends (...args: Parameters<T>) => void>(callback: T, delay = 500): ((...args: Parameters<T>) => void) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => () => clear(timeout.current), []);

  return useCallback(
    (...args) => {
      clear(timeout.current);
      timeout.current = setTimeout(() => {
        savedCallback.current(...args);
      }, delay);
    },
    [delay],
  );
};

export default useDebounceFunction;

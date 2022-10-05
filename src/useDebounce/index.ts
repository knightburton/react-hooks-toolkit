import { useEffect, useState, useRef } from 'react';

const clear = (timeoutId: NodeJS.Timeout | null) => {
  if (timeoutId) clearTimeout(timeoutId);
};

const useDebounce = <T>(value: T, delay = 500): T => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => () => clear(timeout.current), []);

  useEffect(() => {
    clear(timeout.current);
    timeout.current = setTimeout(() => setDebouncedValue(value), delay);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

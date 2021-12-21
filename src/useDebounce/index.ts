import { useEffect, useRef, useState } from 'react';

const useDebounce = <T>(value: T, delay = 500): T => {
  // To optimize memory usage store the handler in ref.
  const handler = useRef<NodeJS.Timeout>();
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    handler.current = setTimeout(() => setDebouncedValue(value), delay);
    return () => handler.current && clearTimeout(handler.current);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

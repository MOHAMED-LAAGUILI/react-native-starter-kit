import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(setDebounced, delayMs, value);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

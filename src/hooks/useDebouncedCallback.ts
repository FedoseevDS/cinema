import { useState, useEffect } from 'react';

const useDebounce = (value: string, wait: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => {
      clearTimeout(handler);
    };
  }, [value, wait]);

  return debouncedValue;
};

export default useDebounce;

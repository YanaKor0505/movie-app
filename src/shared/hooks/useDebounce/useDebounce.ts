import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 300): string {
  const [debouncedValue, setDbouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDbouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

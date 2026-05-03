import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of the value that updates after the delay.
 * @param {*} value - Value to debounce.
 * @param {number} delay - Debounce delay in milliseconds.
 * @returns {*} Debounced value.
 */
export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default useDebounce;

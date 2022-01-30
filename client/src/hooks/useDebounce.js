import { useEffect, useRef, useState } from 'react';

export const useButtonDebounce = (callback, delay) => {
  const latestCallback = useRef();
  const [callCount, setCallCount] = useState(0);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (callCount > 0) {
      const fire = () => {
        setCallCount(0);
        latestCallback.current();
      };

      const id = setTimeout(fire, delay);
      return () => clearTimeout(id);
    }
  }, [callCount, delay]);

  return () => setCallCount((callCount) => callCount + 1);
};

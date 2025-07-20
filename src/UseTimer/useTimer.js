// src/hooks/useTimer.js
import { useState, useRef, useEffect, useCallback } from 'react';

export function useTimer(duration = 0) {
  const [seconds, setSeconds] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // start counting down
  const start = useCallback(() => {
    if (isRunning) return;            // already running
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isRunning]);

  //stop the timer
  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  // if `duration` ever changes, reset the counter
  useEffect(() => {
    setSeconds(duration);
  }, [duration]);

  // cleanup on unmount
  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { seconds, isRunning, start, stop };
}

import React from 'react';
import { useTimer } from './hooks/useTimer';

const TOTAL_TIME = 5;

export default function Countdown() {
  const { isRunning, start, stop, seconds } = useTimer(TOTAL_TIME);

  return (
    <div>
      <h1>{seconds}s</h1>
      <button onClick={start} disabled={isRunning}>
        Start
      </button>
      <button onClick={stop} disabled={!isRunning}>
        Stop
      </button>
    </div>
  );
}

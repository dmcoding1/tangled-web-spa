import { useState, useEffect } from 'react';

const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 0.1), 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return {
    time: time.toFixed(1),
    resetTimer: handleReset,
    startTimer: () => setIsRunning(true),
    stopTimer: () => setIsRunning(false),
    isRunning,
  };
};

export default useStopwatch;

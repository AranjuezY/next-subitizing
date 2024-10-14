import React, { useEffect, useRef, useState } from 'react';

interface TimerProps {
  start: boolean;
  onTimeUpdate: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ start, onTimeUpdate }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const countRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      const startTime = Date.now() - elapsedTime;
      countRef.current = setInterval(() => {
        const time = Date.now() - startTime;
        setElapsedTime(time);
        onTimeUpdate(time);
      }, 10);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    if (countRef.current) {
      clearInterval(countRef.current);
    }
    setIsRunning(false);
    setElapsedTime(0);
    onTimeUpdate(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000) % 60;
    const seconds = Math.floor(time / 1000) % 60;
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (start) {
      handleStart();
    } else {
      handleReset();
    }

    return () => {
      if (countRef.current) {
        clearInterval(countRef.current);
      }
    };
  }, [start]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-4xl font-mono text-gray-800 bg-gray-100 p-4 rounded-md shadow-lg">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
};

export default Timer;

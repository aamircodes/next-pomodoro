'use client';
import { useEffect, useRef, useState } from 'react';

export type Stage = 0 | 1 | 2;

type TimerProps = {
  setCurrentStage: React.Dispatch<React.SetStateAction<Stage>>;
  currentStage: Stage;
  remainingMinutes: number;
  setRemainingMinutes: React.Dispatch<React.SetStateAction<number>>;
};

export const stageDetails = [
  { label: 'Pomodoro', duration: 25, color: 'bg-rose-400' },
  { label: 'Short Break', duration: 5, color: 'bg-emerald-400' },
  { label: 'Long Break', duration: 15, color: 'bg-teal-400' },
];

export default function Timer({
  setCurrentStage,
  currentStage,
  remainingMinutes,
  setRemainingMinutes,
}: TimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const alarmRef = useRef<HTMLAudioElement>();
  useEffect(() => {
    const timerInterval = isTimerRunning ? setInterval(tick, 1000) : null;

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isTimerRunning, remainingSeconds, currentStage]);

  const tick = () => {
    if (remainingMinutes === 0 && remainingSeconds === 0) {
      if (alarmRef.current) {
        alarmRef.current.play();
      }
      handleTimeUp();
    } else if (remainingSeconds === 0) {
      setRemainingMinutes(remainingMinutes - 1);
      setRemainingSeconds(59);
    } else {
      setRemainingSeconds(remainingSeconds - 1);
    }
  };

  const handleTimeUp = () => {
    let nextStage: Stage;
    let nextCount = completedPomodoros;

    if (currentStage === 0) {
      nextCount = completedPomodoros + 1;
      nextStage = nextCount % 4 === 0 ? 2 : 1;
    } else {
      nextStage = 0;
    }

    setCompletedPomodoros(nextCount);
    setCurrentStage(nextStage);
    resetTimer();
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setRemainingMinutes(stageDetails[currentStage].duration);
    setRemainingSeconds(0);
  };

  const handleStageSwitch = (newStage: Stage) => {
    if (isTimerRunning && currentStage !== newStage) {
      const shouldSwitch = confirm('Are you sure you want to switch?');
      if (shouldSwitch) {
        resetTimer();
        setCurrentStage(newStage);
      }
    } else if (!isTimerRunning) {
      resetTimer();
      setCurrentStage(newStage);
    }
  };

  return (
    <section className='text-center select-none px-6'>
      <div className='card bg-white bg-opacity-10 flex-col pt-6 pb-8 w-full'>
        <nav className='flex justify-around items-center'>
          {stageDetails.map((stage, index) => (
            <h1
              key={index}
              className={`${
                index === currentStage ? `bg-gray-500 bg-opacity-40` : ''
              } p-2 cursor-pointer rounded transition-all font-semibold`}
              onClick={() => handleStageSwitch(index)}
            >
              {stage.label}
            </h1>
          ))}
        </nav>
        <h1 className='font-semibold text-8xl md:text-9xl my-8 text-center'>
          {remainingMinutes.toString().padStart(2, '0')}:
          {remainingSeconds.toString().padStart(2, '0')}
        </h1>
        <div className='w-2/3 mx-auto flex justify-around items-center'>
          <audio ref={alarmRef}>
            <source src='/alarm.mp3' type='audio/mp3' />
          </audio>
          <button
            className='btn btn-neutral btn-lg'
            onClick={() => {
              if (alarmRef.current) {
                alarmRef.current.pause();
                alarmRef.current.currentTime = 0;
              }
              setIsTimerRunning(!isTimerRunning);
            }}
          >
            {isTimerRunning ? 'Pause' : 'Start'}
          </button>
          <button className='btn btn-neutral btn-lg' onClick={handleTimeUp}>
            Skip
          </button>
        </div>
      </div>
    </section>
  );
}

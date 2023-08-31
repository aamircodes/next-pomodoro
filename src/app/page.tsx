'use client';

import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Timer, { Stage, stageDetails } from './components/Timer';

export default function Home() {
  const [currentStage, setCurrentStage] = useState<Stage>(0);
  const [color, setColor] = useState(stageDetails[currentStage].color);
  const [remainingMinutes, setRemainingMinutes] = useState(
    stageDetails[currentStage].duration
  );

  useEffect(() => {
    setColor(stageDetails[currentStage].color);
    setRemainingMinutes(stageDetails[currentStage].duration);
  }, [currentStage]);

  return (
    <div className={`min-h-screen ${color}`}>
      <div className='max-w-2xl min-h-screen mx-auto flex flex-col space-y-12'>
        <Navigation />
        <Timer
          setCurrentStage={setCurrentStage}
          currentStage={currentStage}
          remainingMinutes={remainingMinutes}
          setRemainingMinutes={setRemainingMinutes}
        />
        <Footer />
      </div>
    </div>
  );
}

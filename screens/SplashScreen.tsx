import React from 'react';
import AnimatedBackground from '../components/AnimatedBackground';

const SplashScreen: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-white relative">
      <AnimatedBackground />
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tighter">Flowo</h1>
        <p className="text-white/70 mt-2">Your Home Maintenance Partner</p>
      </div>
    </div>
  );
};

export default SplashScreen;

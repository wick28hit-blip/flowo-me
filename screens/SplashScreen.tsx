import React from 'react';
import { ArrowRightIcon } from '../components/icons';

interface SplashScreenProps {
  onContinue: () => void;
}

const TopoPattern: React.FC = () => (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.05]" preserveAspectRatio="none">
        <path d="M-20 40 Q 80 150, 250 80 T 500 80" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-50 80 Q 50 200, 300 100 T 550 100" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-10 120 Q 100 250, 350 120 T 600 120" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-100 20 Q 100 180, 300 80 T 500 60" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-150 150 Q 50 300, 350 180 T 650 150" stroke="white" strokeWidth="2" fill="none" />
    </svg>
);


const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div className="w-full h-full flex flex-col bg-[#F0F2F5] relative overflow-hidden">
        <style>
        {`
            @keyframes spin-in {
                0% {
                    transform: rotate(-360deg) scale(0);
                    opacity: 0;
                }
                100% {
                    transform: rotate(0deg) scale(1);
                    opacity: 1;
                }
            }
            .animate-spin-in {
                animation: spin-in 1s ease-out 0.2s forwards;
                opacity: 0;
            }
        `}
        </style>
      <div className="absolute top-0 left-0 right-0 h-[55%] bg-[#253745] flex items-center justify-center">
        <TopoPattern />
        <h1 className="text-6xl font-bold text-white tracking-widest animate-spin-in" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
            FLOWO
        </h1>
      </div>
      <svg
        className="absolute top-[calc(55%-1px)] left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 220"
      >
        <path
          fill="#F0F2F5"
          d="M0,96 C480,200,960,80,1440,160 L1440,320 L0,320 Z"
        ></path>
      </svg>

      <div className="relative flex-1 flex flex-col justify-end p-8 pb-12">
        <div className="w-full mb-12">
            <h1 className="text-5xl font-bold text-[#253745] mb-4">Welcome</h1>
            <p className="text-[#4A5C6A] mb-8">
                Manage your home maintenance <br /> with ease and confidence.
            </p>
        </div>
        <div className="flex justify-end">
            <button 
              onClick={onContinue} 
              className="flex items-center space-x-4 text-[#253745] group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F0F2F5] focus:ring-[#253745] rounded-full p-2"
              aria-label="Continue to application"
            >
                <span className="font-semibold">Continue</span>
                <div className="w-12 h-12 rounded-full bg-[#253745] text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRightIcon className="w-6 h-6" />
                </div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
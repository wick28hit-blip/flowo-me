import React from 'react';
import { ArrowRightIcon } from '../components/icons';

const TopoPattern: React.FC = () => (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.05]" preserveAspectRatio="none">
        <path d="M-20 40 Q 80 150, 250 80 T 500 80" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-50 80 Q 50 200, 300 100 T 550 100" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-10 120 Q 100 250, 350 120 T 600 120" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-100 20 Q 100 180, 300 80 T 500 60" stroke="white" strokeWidth="2" fill="none" />
        <path d="M-150 150 Q 50 300, 350 180 T 650 150" stroke="white" strokeWidth="2" fill="none" />
    </svg>
);


const SplashScreen: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col bg-[#F0F2F5] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[55%] bg-[#253745]">
        <TopoPattern />
      </div>
      <svg
        className="absolute top-[calc(55%-1px)] left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 220"
      >
        <path
          fill="#F0F2F5"
          d="M0,96L48,117.3C96,139,192,181,288,181.3C384,181,480,139,576,112C672,85,768,75,864,90.7C960,107,1056,149,1152,170.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="relative flex-1 flex flex-col justify-end p-8 pb-12">
        <div className="w-full">
            <h1 className="text-5xl font-bold text-[#253745] mb-4">Welcome</h1>
            <p className="text-[#4A5C6A] mb-8">
                Manage your home maintenance <br /> with ease and confidence.
            </p>
            <div className="flex justify-end">
                <div className="flex items-center space-x-4 text-[#253745]">
                    <span className="font-semibold">Continue</span>
                    <div className="w-12 h-12 rounded-full bg-[#253745] text-white flex items-center justify-center">
                        <ArrowRightIcon className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

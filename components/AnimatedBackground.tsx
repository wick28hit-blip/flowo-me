import React from 'react';
import { CategoryIcons } from './icons';
import { PaintBrushIcon, WrenchIcon, HammerIcon, GearIcon } from './icons';
import { Category } from '../types';

const AnimatedBackground: React.FC = () => {
    const icons = [
        { Icon: CategoryIcons[Category.PLUMBER], className: 'w-10 h-10', style: { left: '10%', animation: 'float 25s infinite linear' } },
        { Icon: CategoryIcons[Category.ELECTRICIAN], className: 'w-8 h-8', style: { left: '20%', animation: 'float 18s infinite linear', animationDelay: '5s' } },
        { Icon: PaintBrushIcon, className: 'w-12 h-12', style: { left: '30%', animation: 'float 22s infinite linear', animationDelay: '2s' } },
        { Icon: CategoryIcons[Category.FRIDGE_REPAIR], className: 'w-10 h-10', style: { left: '45%', animation: 'float 28s infinite linear', animationDelay: '7s' } },
        { Icon: WrenchIcon, className: 'w-10 h-10', style: { left: '60%', animation: 'float 16s infinite linear', animationDelay: '1s' } },
        { Icon: HammerIcon, className: 'w-8 h-8', style: { left: '75%', animation: 'float 23s infinite linear', animationDelay: '4s' } },
        { Icon: GearIcon, className: 'w-12 h-12', style: { left: '85%', animation: 'float 20s infinite linear', animationDelay: '6s' } },
        { Icon: CategoryIcons[Category.WATER_FILTER], className: 'w-10 h-10', style: { left: '5%', animation: 'float 26s infinite linear', animationDelay: '10s' } },
        { Icon: CategoryIcons[Category.WASHING_MACHINE_REPAIR], className: 'w-10 h-10', style: { left: '90%', animation: 'float 19s infinite linear', animationDelay: '8s' } },
    ];

    return (
        <>
            <style>
                {`
                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-10vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                `}
            </style>
            <div className="absolute inset-0 overflow-hidden bg-zinc-900 -z-10">
                {icons.map(({ Icon, style }, index) => (
                    <div key={index} className="absolute bottom-0" style={style}>
                        <Icon className={`w-10 h-10 text-white/10`} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default AnimatedBackground;
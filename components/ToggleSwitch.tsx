import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  'aria-label': string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle, 'aria-label': ariaLabel }) => {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#06141B] focus:ring-white ${
        isOn ? 'bg-[#4A5C6A]' : 'bg-[#9BA8AB]'
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          isOn ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};
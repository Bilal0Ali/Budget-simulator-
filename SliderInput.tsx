
import React from 'react';
import { Sector } from '../types';
import { SECTOR_DISPLAY_DETAILS } from '../constants';

interface SliderInputProps {
  sector: Sector;
  value: number;
  onChange: (sector: Sector, value: number) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({ sector, value, onChange }) => {
  const details = SECTOR_DISPLAY_DETAILS[sector];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(sector, parseInt(e.target.value, 10));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numValue = parseInt(e.target.value, 10);
    if (isNaN(numValue)) {
      numValue = 0;
    }
    if (numValue < 0) numValue = 0;
    if (numValue > 100) numValue = 100;
    onChange(sector, numValue);
  };

  return (
    <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white/70">
      <label htmlFor={`${sector}-slider`} className="block text-lg font-semibold mb-2 ${details.colorClass.replace('bg-', 'text-')}">
        {details.icon} {details.name} : <span className="font-bold">{value}%</span>
      </label>
      <div className="flex items-center space-x-3">
        <input
          type="range"
          id={`${sector}-slider`}
          name={sector}
          min="0"
          max="100"
          value={value}
          onChange={handleSliderChange}
          className={`w-full h-3 rounded-lg appearance-none cursor-pointer ${details.colorClass}`}
          aria-label={`${details.name} allocation`}
        />
        <input
          type="number"
          min="0"
          max="100"
          value={value}
          onChange={handleNumberInputChange}
          className="w-20 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-indigo-500"
          aria-label={`${details.name} percentage input`}
        />
      </div>
    </div>
  );
};

export default SliderInput;
    
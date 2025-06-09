
import React from 'react';
import { SimulationResults } from '../types';

interface ResultsDisplayProps {
  results: SimulationResults;
}

const ResultCard: React.FC<{ title: string; value: string; emoji: string; color: string }> = ({ title, value, emoji, color }) => (
  <div className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ${color}`}>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <span className="text-3xl">{emoji}</span>
    </div>
    <p className="text-4xl font-bold text-white">{value}</p>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="mt-8 p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Simulation Outcomes 📊</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultCard title="GDP Growth" value={`${results.gdpGrowth}%`} emoji="📈" color="bg-green-500" />
        <ResultCard title="Employment Rate" value={`${results.employmentRate}%`} emoji="💼" color="bg-blue-500" />
        <ResultCard title="Inflation Rate" value={`${results.inflation}%`} emoji="📉" color="bg-red-500" />
        <ResultCard title="Happiness Score" value={`${results.happinessScore}/33.3`} emoji="😊" color="bg-yellow-500" />
      </div>
    </div>
  );
};

export default ResultsDisplay;
    
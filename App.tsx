
import React, { useState, useEffect, useCallback } from 'react';
import { Sector, Allocations, SimulationResults } from './types';
import { SECTORS_ARRAY, INITIAL_ALLOCATIONS, TOTAL_BUDGET_POINTS, SECTOR_DISPLAY_DETAILS } from './constants';
import SliderInput from './components/SliderInput';
import ResultsDisplay from './components/ResultsDisplay';
import AllocationChart from './components/AllocationChart';

const App: React.FC = () => {
  const [allocations, setAllocations] = useState<Allocations>(INITIAL_ALLOCATIONS);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [totalAllocated, setTotalAllocated] = useState<number>(TOTAL_BUDGET_POINTS);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  useEffect(() => {
    const currentTotal = SECTORS_ARRAY.reduce((sum, sector) => sum + allocations[sector], 0);
    setTotalAllocated(currentTotal);
    if (currentTotal !== TOTAL_BUDGET_POINTS) {
      setError(`Total allocation must be ${TOTAL_BUDGET_POINTS}%. Current: ${currentTotal}%. Adjust sliders.`);
    } else {
      setError(null);
    }
  }, [allocations]);

  const handleSliderChange = useCallback((sector: Sector, value: number) => {
    setAllocations(prevAllocations => ({
      ...prevAllocations,
      [sector]: value,
    }));
  }, []);

  const calculateResults = (): SimulationResults => {
    const edu = allocations[Sector.Education];
    const hlt = allocations[Sector.Health];
    const inf = allocations[Sector.Infrastructure];
    const wel = allocations[Sector.Welfare];
    const def = allocations[Sector.Defense];

    // GDP = (infra * 0.4 + education * 0.2 + welfare * 0.2 + health * 0.15 + defense * 0.05).toFixed(2)
    // Employment = (infra * 0.5 + welfare * 0.2).toFixed(2)
    // Inflation = (welfare * 0.3 + defense * 0.2).toFixed(2)
    // Happiness = (education + health + welfare) / 3

    const gdpGrowth = (inf * 0.4 + edu * 0.2 + wel * 0.2 + hlt * 0.15 + def * 0.05).toFixed(2);
    const employmentRate = (inf * 0.5 + wel * 0.2).toFixed(2);
    const inflation = (wel * 0.3 + def * 0.2).toFixed(2);
    const happinessScoreRaw = (edu + hlt + wel) / 3;
    const happinessScore = happinessScoreRaw.toFixed(1);
    
    updateFeedbackMessage(happinessScoreRaw);

    return { gdpGrowth, employmentRate, inflation, happinessScore };
  };
  
  const updateFeedbackMessage = (happiness: number) => {
    let message = '';
    const selectedSectorForMore = SECTORS_ARRAY[Math.floor(Math.random() * SECTORS_ARRAY.length)];
    const sectorForMoreName = SECTOR_DISPLAY_DETAILS[selectedSectorForMore].name;

    if (happiness > 28) {
      message = `Public Reaction: 🎉 'Excellent work, FM-ji! The nation rejoices and prosperity blooms!'`;
    } else if (happiness > 20) {
      message = `Public Reaction: 😊 'Good effort, FM-ji! People are generally content with this budget.'`;
    } else if (happiness > 10) {
      message = `Public Reaction: 🤔 'Hmm... Not bad, FM-ji. But next time, perhaps more for ${sectorForMoreName}?'`;
    } else {
      message = `Public Reaction: 😠 'The public is disappointed, FM-ji. Tough decisions have tough consequences. Consider rethinking priorities, especially for ${sectorForMoreName}.'`;
    }
    setFeedbackMessage(message);
  };


  const handleSimulate = () => {
    if (totalAllocated !== TOTAL_BUDGET_POINTS) {
      setError(`Cannot simulate. Total allocation must be ${TOTAL_BUDGET_POINTS}%. Current: ${totalAllocated}%.`);
      setResults(null); // Clear previous results if any
      setFeedbackMessage('');
      return;
    }
    setError(null);
    const newResults = calculateResults();
    setResults(newResults);
  };
  
  const resetAllocations = () => {
    setAllocations(INITIAL_ALLOCATIONS);
    setResults(null);
    setError(null);
    setFeedbackMessage('');
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <header className="text-center my-8">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="text-orange-500">Finance Minister</span> <span className="text-gray-700">for a Day:</span> <span className="text-green-600">India's Budget Challenge</span>
        </h1>
        <p className="text-lg text-gray-600 mt-2">Craft the nation's budget and see the impact!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 p-6 bg-white/70 backdrop-blur-md shadow-2xl rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Allocate Your Budget (Total: {TOTAL_BUDGET_POINTS}%)</h2>
          {SECTORS_ARRAY.map(sector => (
            <SliderInput
              key={sector}
              sector={sector}
              value={allocations[sector]}
              onChange={handleSliderChange}
            />
          ))}
          <div className={`mt-4 p-3 rounded-md text-center font-semibold ${totalAllocated === TOTAL_BUDGET_POINTS ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            Total Allocated: {totalAllocated}%
          </div>
           {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center font-medium animate-pulse">
              {error}
            </div>
          )}
        </div>

        <div className="md:col-span-1 flex flex-col space-y-6">
           <div className="p-6 bg-white/70 backdrop-blur-md shadow-2xl rounded-xl flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Actions</h2>
            <button
              onClick={handleSimulate}
              disabled={totalAllocated !== TOTAL_BUDGET_POINTS}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              Simulate Budget 🚀
            </button>
             <button
              onClick={resetAllocations}
              className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Reset Budget 🔄
            </button>
          </div>
          <AllocationChart allocations={allocations} />
        </div>
      </div>

      {results && (
        <>
          <ResultsDisplay results={results} />
          {feedbackMessage && (
            <div className="mt-8 p-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 text-white rounded-xl shadow-2xl text-center">
              <p className="text-xl font-semibold">{feedbackMessage}</p>
            </div>
          )}
        </>
      )}
      
      <footer className="text-center text-gray-500 mt-12 pb-8">
        <p>&copy; {new Date().getFullYear()} Budget Simulator. Become the FM India deserves!</p>
      </footer>
    </div>
  );
};

export default App;
    
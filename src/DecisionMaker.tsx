import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DecisionMaker: React.FC = () => {
  const [options, setOptions] = useState<string[]>(['', '']);
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const makeDecision = () => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      alert('Please enter at least 2 options');
      return;
    }

    setIsSpinning(true);
    setResult(null);

    // Animate through options
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * validOptions.length);
      setResult(validOptions[randomIndex]);
      count++;
      
      if (count > 15) {
        clearInterval(interval);
        setIsSpinning(false);
        const finalChoice = validOptions[Math.floor(Math.random() * validOptions.length)];
        setResult(finalChoice);
      }
    }, 100);
  };

  const reset = () => {
    setOptions(['', '']);
    setResult(null);
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-6">
            <Link to="/games" className="text-white/60 hover:text-white inline-flex items-center mb-4 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Games
            </Link>
            <h1 className="text-3xl font-bold text-white">Decision Maker</h1>
            <p className="text-white/60 mt-2">Can't decide? Let fate choose for you!</p>
          </div>

          {result && !isSpinning ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">🎲</span>
              </div>
              <p className="text-white/60 mb-2">The universe has spoken:</p>
              <div className="backdrop-blur-xl bg-gradient-to-br from-teal-500/20 to-green-500/20 border border-teal-500/30 rounded-2xl p-6 mb-8">
                <p className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                  {result}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={makeDecision}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white font-bold rounded-xl hover:shadow-teal-500/30 transition-all duration-300"
                >
                  Spin Again
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  New Options
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50"
                      disabled={isSpinning}
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all duration-300"
                        disabled={isSpinning}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {options.length < 10 && (
                <button
                  onClick={addOption}
                  className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-white/60 hover:border-white/40 hover:text-white/80 transition-all duration-300 mb-6"
                  disabled={isSpinning}
                >
                  + Add Option
                </button>
              )}

              {isSpinning && result && (
                <div className="text-center py-6 mb-6">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6 animate-pulse">
                    <p className="text-2xl font-bold text-white">{result}</p>
                  </div>
                </div>
              )}

              <button
                onClick={makeDecision}
                disabled={isSpinning || options.filter(o => o.trim()).length < 2}
                className={`w-full py-4 text-xl font-bold rounded-2xl transition-all duration-300
                  ${isSpinning || options.filter(o => o.trim()).length < 2
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-500 to-green-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105'
                  }`}
              >
                {isSpinning ? 'Choosing...' : 'Make Decision'}
              </button>
            </>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">💡 Tips</h3>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Add 2-10 options to choose from</li>
            <li>• Great for deciding where to eat, what to watch, or who goes first</li>
            <li>• The result is completely random!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DecisionMaker;
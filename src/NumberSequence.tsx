import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const NumberSequence: React.FC = () => {
  const [phase, setPhase] = useState<'ready' | 'showing' | 'input' | 'result'>('ready');
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState('');
  const [level, setLevel] = useState(3);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateSequence = useCallback((length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10));
  }, []);

  const startGame = () => {
    const newSequence = generateSequence(level);
    setSequence(newSequence);
    setUserInput('');
    setDisplayIndex(0);
    setIsCorrect(null);
    setPhase('showing');
  };

  useEffect(() => {
    if (phase === 'showing' && displayIndex < sequence.length) {
      const timer = setTimeout(() => {
        setDisplayIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (phase === 'showing' && displayIndex >= sequence.length) {
      setTimeout(() => {
        setPhase('input');
      }, 500);
    }
  }, [phase, displayIndex, sequence.length]);

  const handleSubmit = () => {
    const userSequence = userInput.split('').map(Number);
    const correct = JSON.stringify(userSequence) === JSON.stringify(sequence);
    
    setIsCorrect(correct);
    
    if (correct) {
      const newScore = score + level * 10;
      setScore(newScore);
      if (newScore > highScore) setHighScore(newScore);
      setLevel(prev => prev + 1);
    }
    
    setPhase('result');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.length === sequence.length) {
      handleSubmit();
    }
  };

  const resetGame = () => {
    setLevel(3);
    setScore(0);
    setPhase('ready');
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
            <h1 className="text-3xl font-bold text-white">Number Sequence</h1>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-between mb-8 px-4">
            <div className="text-center">
              <p className="text-white/40 text-sm">Level</p>
              <p className="text-2xl font-bold text-white">{level}</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-sm">Score</p>
              <p className="text-2xl font-bold text-cyan-400">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-sm">Best</p>
              <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
            </div>
          </div>

          {phase === 'ready' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">🔢</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Memory Challenge</h2>
              <p className="text-white/60 mb-8">Remember the sequence of numbers and type them back.</p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Game
              </button>
            </div>
          )}

          {phase === 'showing' && (
            <div className="text-center py-8">
              <p className="text-white/60 mb-6">Remember this sequence:</p>
              <div className="flex justify-center gap-3 mb-8">
                {sequence.map((num, i) => (
                  <div
                    key={i}
                    className={`w-16 h-20 rounded-xl flex items-center justify-center text-3xl font-bold transition-all duration-300
                      ${i < displayIndex 
                        ? 'bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30' 
                        : 'bg-white/10 text-transparent'}`}
                  >
                    {i < displayIndex ? num : '?'}
                  </div>
                ))}
              </div>
              <p className="text-white/40 animate-pulse">Memorizing...</p>
            </div>
          )}

          {phase === 'input' && (
            <div className="text-center py-8">
              <p className="text-white/60 mb-6">Enter the sequence:</p>
              <div className="flex justify-center gap-3 mb-6">
                {sequence.map((_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-20 rounded-xl flex items-center justify-center text-3xl font-bold
                      ${userInput[i] 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
                        : 'bg-white/10 border-2 border-dashed border-white/20 text-white/30'}`}
                  >
                    {userInput[i] || '?'}
                  </div>
                ))}
              </div>
              
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.replace(/\D/g, '').slice(0, sequence.length))}
                onKeyDown={handleKeyDown}
                className="w-full max-w-xs mx-auto bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white text-center text-2xl font-mono tracking-widest focus:outline-none focus:border-cyan-500/50"
                placeholder="Type numbers..."
                autoFocus
              />

              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={userInput.length !== sequence.length}
                  className={`px-8 py-3 text-white font-bold rounded-xl transition-all duration-300
                    ${userInput.length === sequence.length
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:shadow-lg hover:shadow-cyan-500/30'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {phase === 'result' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">{isCorrect ? '✅' : '❌'}</span>
              </div>
              <h2 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct!' : 'Wrong!'}
              </h2>
              
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 mb-6 max-w-xs mx-auto">
                <p className="text-white/60 text-sm mb-2">Correct sequence:</p>
                <p className="text-2xl font-mono font-bold text-white tracking-widest">
                  {sequence.join('')}
                </p>
              </div>

              {isCorrect ? (
                <button
                  onClick={startGame}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                >
                  Next Level
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Reset Game
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberSequence;

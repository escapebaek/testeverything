import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StroopTest: React.FC = () => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [totalRounds] = useState(20);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState({ text: '', color: '', correctAnswer: '' });
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const colors = [
    { name: 'RED', hex: '#ef4444' },
    { name: 'BLUE', hex: '#3b82f6' },
    { name: 'GREEN', hex: '#22c55e' },
    { name: 'YELLOW', hex: '#eab308' },
    { name: 'PURPLE', hex: '#a855f7' },
    { name: 'ORANGE', hex: '#f97316' },
  ];

  const generateWord = () => {
    const textColor = colors[Math.floor(Math.random() * colors.length)];
    let inkColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Make it more challenging - 70% chance of different colors
    if (Math.random() < 0.7) {
      while (inkColor.name === textColor.name) {
        inkColor = colors[Math.floor(Math.random() * colors.length)];
      }
    }

    setCurrentWord({
      text: textColor.name,
      color: inkColor.hex,
      correctAnswer: inkColor.name,
    });
  };

  const startGame = () => {
    setPhase('playing');
    setScore(0);
    setRound(0);
    setStartTime(Date.now());
    setFeedback(null);
    generateWord();
  };

  const handleAnswer = (colorName: string) => {
    if (phase !== 'playing') return;

    const isCorrect = colorName === currentWord.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      if (round + 1 >= totalRounds) {
        setEndTime(Date.now());
        setPhase('finished');
      } else {
        setRound(prev => prev + 1);
        generateWord();
      }
    }, 300);
  };

  const getTimeTaken = () => {
    return ((endTime - startTime) / 1000).toFixed(1);
  };

  const getAccuracy = () => {
    return Math.round((score / totalRounds) * 100);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Stroop Test',
          text: `I got ${getAccuracy()}% accuracy on the Stroop Test in ${getTimeTaken()}s! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I got ${getAccuracy()}% on the Stroop Test! Try it: ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
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
            <h1 className="text-3xl font-bold text-white">Stroop Test</h1>
          </div>

          {phase === 'ready' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">🎨</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Color vs Word Challenge</h2>
              <p className="text-white/60 mb-4">Identify the <strong className="text-cyan-400">INK COLOR</strong> of the word, not what the word says!</p>
              
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 mb-8 max-w-sm mx-auto">
                <p className="text-white/60 text-sm mb-2">Example:</p>
                <p className="text-3xl font-bold" style={{ color: '#3b82f6' }}>RED</p>
                <p className="text-white/40 text-sm mt-2">The answer is BLUE (the ink color)</p>
              </div>

              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Test
              </button>
            </div>
          )}

          {phase === 'playing' && (
            <>
              <div className="flex justify-between mb-6 px-4">
                <div className="text-white">
                  <span className="text-white/60">Round: </span>
                  <span className="font-bold">{round + 1}/{totalRounds}</span>
                </div>
                <div className="text-white">
                  <span className="text-white/60">Score: </span>
                  <span className="font-bold text-cyan-400">{score}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-1 mb-8">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${((round + 1) / totalRounds) * 100}%` }}
                />
              </div>

              {/* Word Display */}
              <div className={`text-center py-8 rounded-2xl mb-6 transition-all duration-200
                ${feedback === 'correct' ? 'bg-green-500/20' : feedback === 'wrong' ? 'bg-red-500/20' : 'bg-white/5'}`}
              >
                <p className="text-white/40 mb-4">What COLOR is this word printed in?</p>
                <p 
                  className="text-6xl font-black"
                  style={{ color: currentWord.color }}
                >
                  {currentWord.text}
                </p>
              </div>

              {/* Color Buttons */}
              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleAnswer(color.name)}
                    className="py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {phase === 'finished' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">{getAccuracy() >= 80 ? '🏆' : getAccuracy() >= 60 ? '👍' : '💪'}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Test Complete!</h2>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-cyan-400">{score}</p>
                  <p className="text-white/40 text-sm">Correct</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-green-400">{getAccuracy()}%</p>
                  <p className="text-white/40 text-sm">Accuracy</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-yellow-400">{getTimeTaken()}s</p>
                  <p className="text-white/40 text-sm">Time</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-purple-500/30 transition-all duration-300"
                >
                  Try Again
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Share Result
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">💡 About the Stroop Effect</h3>
          <p className="text-white/60 text-sm">
            The Stroop effect demonstrates the interference in reaction time when the color of a word doesn't match the word itself. It's used to measure cognitive flexibility and attention control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StroopTest;

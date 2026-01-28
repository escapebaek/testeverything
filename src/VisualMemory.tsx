import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const VisualMemory: React.FC = () => {
  const [phase, setPhase] = useState<'ready' | 'showing' | 'playing' | 'result' | 'finished'>('ready');
  const [gridSize, setGridSize] = useState(3);
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const getNumSquares = useCallback(() => {
    return Math.min(3 + Math.floor(level / 2), gridSize * gridSize - 2);
  }, [level, gridSize]);

  const generatePattern = useCallback(() => {
    const totalCells = gridSize * gridSize;
    const numSquares = getNumSquares();
    const newPattern: number[] = [];
    
    while (newPattern.length < numSquares) {
      const cell = Math.floor(Math.random() * totalCells);
      if (!newPattern.includes(cell)) {
        newPattern.push(cell);
      }
    }
    
    return newPattern;
  }, [gridSize, getNumSquares]);

  const startGame = () => {
    setLevel(1);
    setLives(3);
    setScore(0);
    setGridSize(3);
    startRound();
  };

  const startRound = useCallback(() => {
    // Increase grid size every 5 levels
    const newGridSize = Math.min(3 + Math.floor(level / 5), 6);
    setGridSize(newGridSize);
    
    const newPattern = generatePattern();
    setPattern(newPattern);
    setUserPattern([]);
    setPhase('showing');

    // Show pattern for a duration based on level
    const showDuration = Math.max(1500 - level * 50, 500);
    setTimeout(() => setPhase('playing'), showDuration);
  }, [level, generatePattern]);

  useEffect(() => {
    if (level > 1 && phase === 'result') {
      const timer = setTimeout(() => {
        startRound();
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, phase]);

  const handleCellClick = (index: number) => {
    if (phase !== 'playing') return;
    if (userPattern.includes(index)) return;

    const newUserPattern = [...userPattern, index];
    setUserPattern(newUserPattern);

    if (pattern.includes(index)) {
      // Correct
      if (newUserPattern.length === pattern.length) {
        // Completed the pattern
        setScore(prev => prev + level * 10);
        setLevel(prev => prev + 1);
        setPhase('result');
      }
    } else {
      // Wrong
      setLives(prev => prev - 1);
      if (lives <= 1) {
        setPhase('finished');
      } else {
        // Show correct pattern briefly
        setPhase('result');
        setTimeout(() => startRound(), 1500);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Visual Memory Test',
          text: `I reached level ${level} with ${score} points on Visual Memory! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I scored ${score} on Visual Memory! Try it: ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const getCellStyle = (index: number) => {
    const isInPattern = pattern.includes(index);
    const isUserSelected = userPattern.includes(index);
    const isCorrect = isInPattern && isUserSelected;
    const isWrong = !isInPattern && isUserSelected;

    if (phase === 'showing') {
      return isInPattern 
        ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30' 
        : 'bg-white/10';
    }

    if (phase === 'result' || phase === 'finished') {
      if (isCorrect) return 'bg-gradient-to-br from-green-400 to-emerald-500';
      if (isWrong) return 'bg-gradient-to-br from-red-400 to-red-600';
      if (isInPattern) return 'bg-gradient-to-br from-cyan-400 to-blue-500 opacity-50';
      return 'bg-white/10';
    }

    if (isUserSelected) {
      return isInPattern 
        ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
        : 'bg-gradient-to-br from-red-400 to-red-600';
    }

    return 'bg-white/10 hover:bg-white/20 cursor-pointer';
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
            <h1 className="text-3xl font-bold text-white">Visual Memory</h1>
          </div>

          {phase === 'ready' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">🧩</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Pattern Memory</h2>
              <p className="text-white/60 mb-8">
                Memorize the highlighted squares, then recreate the pattern. The grid gets larger and patterns get more complex as you progress!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Game
              </button>
            </div>
          )}

          {(phase === 'showing' || phase === 'playing' || phase === 'result') && (
            <>
              <div className="flex justify-between mb-6 px-4">
                <div className="text-center">
                  <p className="text-white/40 text-sm">Level</p>
                  <p className="text-2xl font-bold text-cyan-400">{level}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-sm">Score</p>
                  <p className="text-2xl font-bold text-yellow-400">{score}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-sm">Lives</p>
                  <p className="text-2xl font-bold text-red-400">{'❤️'.repeat(lives)}</p>
                </div>
              </div>

              <p className={`text-center text-lg font-bold mb-6 ${phase === 'showing' ? 'text-yellow-400 animate-pulse' : 'text-white/60'}`}>
                {phase === 'showing' ? 'Memorize!' : phase === 'playing' ? 'Recreate the pattern' : level > 1 ? 'Correct! Next level...' : ''}
              </p>

              <div 
                className="grid gap-2 mx-auto"
                style={{ 
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  maxWidth: `${gridSize * 60}px`
                }}
              >
                {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg transition-all duration-200 ${getCellStyle(index)}`}
                    onClick={() => handleCellClick(index)}
                  />
                ))}
              </div>

              {phase === 'playing' && (
                <p className="text-center text-white/40 mt-4">
                  {userPattern.length}/{pattern.length} squares selected
                </p>
              )}
            </>
          )}

          {phase === 'finished' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">{level >= 15 ? '🏆' : level >= 8 ? '⭐' : '💪'}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
              
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-cyan-400">{level}</p>
                  <p className="text-white/40 text-sm">Level</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-yellow-400">{score}</p>
                  <p className="text-white/40 text-sm">Score</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  Play Again
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
      </div>
    </div>
  );
};

export default VisualMemory;

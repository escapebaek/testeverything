import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Direction = 'left' | 'right' | 'up' | 'down';

const SimonSays: React.FC = () => {
  const [phase, setPhase] = useState<'ready' | 'showing' | 'playing' | 'finished'>('ready');
  const [sequence, setSequence] = useState<Direction[]>([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [activeButton, setActiveButton] = useState<Direction | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const directions: Direction[] = ['up', 'right', 'down', 'left'];

  const addToSequence = () => {
    const newDirection = directions[Math.floor(Math.random() * 4)];
    setSequence(prev => [...prev, newDirection]);
  };

  const startGame = () => {
    setSequence([]);
    setPlayerIndex(0);
    setScore(0);
    addToSequence();
    setPhase('showing');
  };

  const playSequence = async () => {
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setActiveButton(sequence[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveButton(null);
    }
    setPhase('playing');
  };

  useEffect(() => {
    if (phase === 'showing' && sequence.length > 0) {
      playSequence();
    }
  }, [phase, sequence]);

  const handleButtonClick = (direction: Direction) => {
    if (phase !== 'playing') return;

    setActiveButton(direction);
    setTimeout(() => setActiveButton(null), 150);

    if (direction === sequence[playerIndex]) {
      if (playerIndex + 1 === sequence.length) {
        // Completed the sequence
        const newScore = sequence.length;
        setScore(newScore);
        if (newScore > highScore) setHighScore(newScore);
        setPlayerIndex(0);
        addToSequence();
        setPhase('showing');
      } else {
        setPlayerIndex(prev => prev + 1);
      }
    } else {
      // Wrong answer
      setPhase('finished');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Simon Says',
          text: `I reached level ${score} on Simon Says! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I reached level ${score} on Simon Says! Try it: ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const getButtonStyle = (direction: Direction) => {
    const base = "w-20 h-20 rounded-2xl transition-all duration-150 flex items-center justify-center text-3xl";
    const colors = {
      up: { normal: 'bg-green-500/30 border-green-500/50', active: 'bg-green-500 shadow-lg shadow-green-500/50' },
      right: { normal: 'bg-red-500/30 border-red-500/50', active: 'bg-red-500 shadow-lg shadow-red-500/50' },
      down: { normal: 'bg-yellow-500/30 border-yellow-500/50', active: 'bg-yellow-500 shadow-lg shadow-yellow-500/50' },
      left: { normal: 'bg-blue-500/30 border-blue-500/50', active: 'bg-blue-500 shadow-lg shadow-blue-500/50' },
    };
    const isActive = activeButton === direction;
    return `${base} border-2 ${isActive ? colors[direction].active : colors[direction].normal} ${phase === 'playing' ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`;
  };

  const arrows = {
    up: '↑',
    right: '→',
    down: '↓',
    left: '←',
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
            <h1 className="text-3xl font-bold text-white">Simon Says</h1>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-between mb-8 px-4">
            <div className="text-center">
              <p className="text-white/40 text-sm">Level</p>
              <p className="text-2xl font-bold text-cyan-400">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-sm">Best</p>
              <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
            </div>
          </div>

          {phase === 'ready' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">🎮</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Memory Game</h2>
              <p className="text-white/60 mb-8">Watch the sequence, then repeat it! Each round adds one more step.</p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Game
              </button>
            </div>
          )}

          {(phase === 'showing' || phase === 'playing') && (
            <div className="py-8">
              <p className={`text-center text-xl font-bold mb-8 ${phase === 'showing' ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
                {phase === 'showing' ? 'Watch the pattern...' : 'Your turn!'}
              </p>

              {/* Game Buttons */}
              <div className="flex flex-col items-center gap-2">
                <button
                  className={getButtonStyle('up')}
                  onClick={() => handleButtonClick('up')}
                  disabled={phase !== 'playing'}
                >
                  {arrows.up}
                </button>
                <div className="flex gap-2">
                  <button
                    className={getButtonStyle('left')}
                    onClick={() => handleButtonClick('left')}
                    disabled={phase !== 'playing'}
                  >
                    {arrows.left}
                  </button>
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-white/40">{sequence.length}</span>
                  </div>
                  <button
                    className={getButtonStyle('right')}
                    onClick={() => handleButtonClick('right')}
                    disabled={phase !== 'playing'}
                  >
                    {arrows.right}
                  </button>
                </div>
                <button
                  className={getButtonStyle('down')}
                  onClick={() => handleButtonClick('down')}
                  disabled={phase !== 'playing'}
                >
                  {arrows.down}
                </button>
              </div>

              {phase === 'playing' && (
                <p className="text-center text-white/40 mt-6">
                  Step {playerIndex + 1} of {sequence.length}
                </p>
              )}
            </div>
          )}

          {phase === 'finished' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">{score >= 10 ? '🏆' : score >= 5 ? '⭐' : '💪'}</span>
              </div>
              <h2 className="text-3xl font-bold text-red-400 mb-2">Game Over!</h2>
              <p className="text-white/60 mb-8">You reached level {score}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-green-500/30 transition-all duration-300"
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

export default SimonSays;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ColorPerception: React.FC = () => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gridSize, setGridSize] = useState(2);
  const [differentIndex, setDifferentIndex] = useState(0);
  const [baseColor, setBaseColor] = useState({ h: 0, s: 50, l: 50 });

  const generatePuzzle = (currentLevel: number) => {
    const size = Math.min(2 + Math.floor(currentLevel / 3), 6);
    const h = Math.floor(Math.random() * 360);
    const s = 50 + Math.floor(Math.random() * 30);
    const l = 40 + Math.floor(Math.random() * 20);
    const diffIndex = Math.floor(Math.random() * (size * size));
    
    setGridSize(size);
    setBaseColor({ h, s, l });
    setDifferentIndex(diffIndex);
  };

  const getColorDifference = () => {
    const baseDiff = 20;
    const levelReduction = Math.min(level * 1.5, 15);
    return Math.max(baseDiff - levelReduction, 3);
  };

  const startGame = () => {
    setPhase('playing');
    setLevel(1);
    setScore(0);
    setLives(3);
    generatePuzzle(1);
  };

  const handleTileClick = (index: number) => {
    if (phase !== 'playing') return;

    if (index === differentIndex) {
      setScore(prev => prev + level * 10);
      setLevel(prev => prev + 1);
      generatePuzzz(level + 1);
    } else {
      setLives(prev => prev - 1);
      if (lives <= 1) {
        setPhase('finished');
      }
    }
  };

  const generatePuzzz = (lvl: number) => {
    generatePuzzle(lvl);
  };

  const getTileColor = (index: number) => {
    const diff = getColorDifference();
    if (index === differentIndex) {
      return `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l + diff}%)`;
    }
    return `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Color Perception Test',
          text: `I reached level ${level} with a score of ${score} on Color Perception! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I scored ${score} on Color Perception! Try it: ${window.location.href}`);
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
            <h1 className="text-3xl font-bold text-white">Color Perception</h1>
          </div>

          {phase === 'ready' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">🌈</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Spot the Difference</h2>
              <p className="text-white/60 mb-8">Find the tile with a slightly different color. The difference gets harder at each level!</p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Game
              </button>
            </div>
          )}

          {phase === 'playing' && (
            <>
              <div className="flex justify-between mb-6 px-4">
                <div className="text-white">
                  <span className="text-white/60">Level: </span>
                  <span className="font-bold text-purple-400">{level}</span>
                </div>
                <div className="text-white">
                  <span className="text-white/60">Score: </span>
                  <span className="font-bold text-cyan-400">{score}</span>
                </div>
                <div className="text-white">
                  <span className="text-white/60">Lives: </span>
                  <span className="font-bold text-red-400">{'❤️'.repeat(lives)}</span>
                </div>
              </div>

              <div 
                className="grid gap-2 p-4 bg-white/5 rounded-2xl mx-auto"
                style={{ 
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  maxWidth: `${Math.min(gridSize * 80, 400)}px`
                }}
              >
                {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: getTileColor(index) }}
                    onClick={() => handleTileClick(index)}
                  />
                ))}
              </div>

              <p className="text-center text-white/40 mt-4 text-sm">
                Tap the tile that looks different
              </p>
            </>
          )}

          {phase === 'finished' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">👁️</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
              
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-purple-400">{level}</p>
                  <p className="text-white/40 text-sm">Level Reached</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-cyan-400">{score}</p>
                  <p className="text-white/40 text-sm">Final Score</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-pink-500/30 transition-all duration-300"
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

export default ColorPerception;

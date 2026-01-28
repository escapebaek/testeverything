import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Target {
  x: number;
  y: number;
  size: number;
}

const AimTrainer: React.FC = () => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [target, setTarget] = useState<Target | null>(null);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [targetsHit, setTargetsHit] = useState(0);
  const [totalTargets, setTotalTargets] = useState(20);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [targetSpawnTime, setTargetSpawnTime] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const getDifficultySettings = () => {
    switch (difficulty) {
      case 'easy': return { size: 60, targets: 15 };
      case 'medium': return { size: 45, targets: 20 };
      case 'hard': return { size: 30, targets: 25 };
    }
  };

  const spawnTarget = () => {
    if (!gameAreaRef.current) return;
    const settings = getDifficultySettings();
    const rect = gameAreaRef.current.getBoundingClientRect();
    const size = settings.size;
    const x = Math.random() * (rect.width - size);
    const y = Math.random() * (rect.height - size);
    setTarget({ x, y, size });
    setTargetSpawnTime(performance.now());
  };

  const startGame = () => {
    const settings = getDifficultySettings();
    setPhase('playing');
    setScore(0);
    setMisses(0);
    setTargetsHit(0);
    setTotalTargets(settings.targets);
    setReactionTimes([]);
    setTimeout(spawnTarget, 500);
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const reactionTime = performance.now() - targetSpawnTime;
    setReactionTimes(prev => [...prev, reactionTime]);
    setScore(prev => prev + Math.max(100 - Math.floor(reactionTime / 10), 10));
    setTargetsHit(prev => prev + 1);

    if (targetsHit + 1 >= totalTargets) {
      setTarget(null);
      setPhase('finished');
    } else {
      spawnTarget();
    }
  };

  const handleMiss = () => {
    if (phase !== 'playing') return;
    setMisses(prev => prev + 1);
    setScore(prev => Math.max(0, prev - 25));
  };

  const getAverageReactionTime = () => {
    if (reactionTimes.length === 0) return 0;
    return Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
  };

  const getAccuracy = () => {
    const total = targetsHit + misses;
    if (total === 0) return 100;
    return Math.round((targetsHit / total) * 100);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Aim Trainer',
          text: `I scored ${score} points with ${getAccuracy()}% accuracy! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I scored ${score} points on Aim Trainer! Try it: ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-6">
            <Link to="/games" className="text-white/60 hover:text-white inline-flex items-center mb-4 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Games
            </Link>
            <h1 className="text-3xl font-bold text-white">Aim Trainer</h1>
          </div>

          {phase === 'ready' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Test Your Aim</h2>
              <p className="text-white/60 mb-6">Click the targets as fast as you can!</p>
              
              <div className="mb-8">
                <label className="text-white/60 mr-4">Difficulty:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-red-500/50"
                >
                  <option value="easy" className="bg-gray-800">Easy</option>
                  <option value="medium" className="bg-gray-800">Medium</option>
                  <option value="hard" className="bg-gray-800">Hard</option>
                </select>
              </div>

              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Game
              </button>
            </div>
          )}

          {phase === 'playing' && (
            <>
              <div className="flex justify-between mb-4 px-4">
                <div className="text-white">
                  <span className="text-white/60">Score: </span>
                  <span className="font-bold text-cyan-400">{score}</span>
                </div>
                <div className="text-white">
                  <span className="text-white/60">Targets: </span>
                  <span className="font-bold">{targetsHit}/{totalTargets}</span>
                </div>
                <div className="text-white">
                  <span className="text-white/60">Misses: </span>
                  <span className="font-bold text-red-400">{misses}</span>
                </div>
              </div>

              <div
                ref={gameAreaRef}
                className="relative h-96 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 cursor-crosshair overflow-hidden"
                onClick={handleMiss}
              >
                {target && (
                  <div
                    className="absolute rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-lg shadow-red-500/50 cursor-pointer transform hover:scale-110 transition-transform duration-100 flex items-center justify-center"
                    style={{
                      left: target.x,
                      top: target.y,
                      width: target.size,
                      height: target.size,
                    }}
                    onClick={handleTargetClick}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </>
          )}

          {phase === 'finished' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">🏆</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Game Over!</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto mb-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-cyan-400">{score}</p>
                  <p className="text-white/40 text-sm">Score</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-green-400">{getAccuracy()}%</p>
                  <p className="text-white/40 text-sm">Accuracy</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-yellow-400">{getAverageReactionTime()}</p>
                  <p className="text-white/40 text-sm">Avg ms</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-red-400">{misses}</p>
                  <p className="text-white/40 text-sm">Misses</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-red-500/30 transition-all duration-300"
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

export default AimTrainer;

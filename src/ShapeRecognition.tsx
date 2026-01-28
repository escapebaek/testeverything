import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Shape = 'circle' | 'square' | 'triangle' | 'diamond' | 'star' | 'hexagon';

const shapes: Shape[] = ['circle', 'square', 'triangle', 'diamond', 'star', 'hexagon'];

const ShapeRecognition: React.FC = () => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [targetShape, setTargetShape] = useState<Shape>('circle');
  const [displayedShapes, setDisplayedShapes] = useState<Shape[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (phase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'playing' && timeLeft === 0) {
      setPhase('finished');
    }
  }, [phase, timeLeft]);

  const generateRound = () => {
    const target = shapes[Math.floor(Math.random() * shapes.length)];
    const gridSize = Math.min(3 + Math.floor(level / 3), 6);
    const numShapes = gridSize * gridSize;
    const correctIndex = Math.floor(Math.random() * numShapes);
    
    const displayed: Shape[] = [];
    for (let i = 0; i < numShapes; i++) {
      if (i === correctIndex) {
        displayed.push(target);
      } else {
        const otherShapes = shapes.filter(s => s !== target);
        displayed.push(otherShapes[Math.floor(Math.random() * otherShapes.length)]);
      }
    }

    setTargetShape(target);
    setDisplayedShapes(displayed);
  };

  const startGame = () => {
    setPhase('playing');
    setScore(0);
    setTimeLeft(30);
    setLevel(1);
    generateRound();
  };

  const handleShapeClick = (index: number) => {
    if (phase !== 'playing') return;

    if (displayedShapes[index] === targetShape) {
      setScore(prev => prev + 10 + level * 2);
      setLevel(prev => prev + 1);
      generateRound();
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  const renderShape = (shape: Shape, size: number = 40) => {
    const shapeStyles: Record<Shape, React.ReactNode> = {
      circle: (
        <div 
          className="rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
          style={{ width: size, height: size }}
        />
      ),
      square: (
        <div 
          className="bg-gradient-to-br from-purple-400 to-pink-500"
          style={{ width: size, height: size }}
        />
      ),
      triangle: (
        <div 
          className="w-0 h-0"
          style={{ 
            borderLeft: `${size/2}px solid transparent`,
            borderRight: `${size/2}px solid transparent`,
            borderBottom: `${size}px solid #f97316`,
          }}
        />
      ),
      diamond: (
        <div 
          className="bg-gradient-to-br from-green-400 to-emerald-500 rotate-45"
          style={{ width: size * 0.7, height: size * 0.7 }}
        />
      ),
      star: (
        <div className="text-yellow-400" style={{ fontSize: size }}>★</div>
      ),
      hexagon: (
        <div className="text-rose-400" style={{ fontSize: size }}>⬡</div>
      ),
    };
    return shapeStyles[shape];
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shape Recognition',
          text: `I scored ${score} points on Shape Recognition! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I scored ${score} on Shape Recognition! Try it: ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const getGridSize = () => Math.min(3 + Math.floor(level / 3), 6);

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
            <h1 className="text-3xl font-bold text-white">Shape Recognition</h1>
          </div>

          {phase === 'ready' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">🔺</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Find the Shape!</h2>
              <p className="text-white/60 mb-8">Find and click the target shape as fast as you can. You have 30 seconds!</p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Game
              </button>
            </div>
          )}

          {phase === 'playing' && (
            <>
              <div className="flex justify-between items-center mb-6 px-4">
                <div className="text-white">
                  <span className="text-white/60">Score: </span>
                  <span className="font-bold text-cyan-400">{score}</span>
                </div>
                <div className="text-white">
                  <span className="text-white/60">Level: </span>
                  <span className="font-bold text-yellow-400">{level}</span>
                </div>
                <div className={`text-white font-mono font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : ''}`}>
                  {timeLeft}s
                </div>
              </div>

              {/* Target Shape */}
              <div className="text-center mb-6">
                <p className="text-white/60 mb-2">Find this shape:</p>
                <div className="inline-flex items-center justify-center w-20 h-20 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl">
                  {renderShape(targetShape, 50)}
                </div>
              </div>

              {/* Shape Grid */}
              <div 
                className="grid gap-3 p-4 bg-white/5 rounded-2xl mx-auto"
                style={{ 
                  gridTemplateColumns: `repeat(${getGridSize()}, 1fr)`,
                  maxWidth: `${getGridSize() * 70}px`
                }}
              >
                {displayedShapes.map((shape, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 hover:scale-105 transition-all duration-200"
                    onClick={() => handleShapeClick(index)}
                  >
                    {renderShape(shape, 35)}
                  </div>
                ))}
              </div>
            </>
          )}

          {phase === 'finished' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Time's Up!</h2>
              
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-cyan-400">{score}</p>
                  <p className="text-white/40 text-sm">Score</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-yellow-400">{level}</p>
                  <p className="text-white/40 text-sm">Level</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:shadow-orange-500/30 transition-all duration-300"
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

export default ShapeRecognition;
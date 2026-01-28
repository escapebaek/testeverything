import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ReactionTime: React.FC = () => {
  const [phase, setPhase] = useState('waiting');
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setPhase('ready');
    setStartTime(0);
    setEndTime(0);

    const randomDelay = Math.floor(Math.random() * 3000) + 1000;
    timeoutRef.current = setTimeout(() => {
      setPhase('go');
      setStartTime(performance.now());
    }, randomDelay);
  };

  const handleClick = () => {
    if (phase === 'ready') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase('too-early');
    } else if (phase === 'go') {
      const time = performance.now() - startTime;
      setEndTime(time);
      setHistory(prev => [...prev.slice(-4), time]);
      setPhase('clicked');
    }
  };

  const handleShare = async () => {
    const reactionTime = endTime.toFixed(0);
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Reaction Time Test',
          text: `I got ${reactionTime}ms on the Reaction Time Test! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I got ${reactionTime}ms on the Reaction Time Test! Try it: ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const getAverageTime = () => {
    if (history.length === 0) return null;
    return (history.reduce((a, b) => a + b, 0) / history.length).toFixed(0);
  };

  const getTimeRating = (time: number) => {
    if (time < 200) return { text: 'Incredible!', color: 'text-cyan-400', emoji: '🏆' };
    if (time < 250) return { text: 'Excellent!', color: 'text-green-400', emoji: '⚡' };
    if (time < 300) return { text: 'Great!', color: 'text-yellow-400', emoji: '👍' };
    if (time < 350) return { text: 'Good', color: 'text-orange-400', emoji: '👌' };
    return { text: 'Keep practicing!', color: 'text-red-400', emoji: '💪' };
  };

  const renderContent = () => {
    switch (phase) {
      case 'waiting':
        return (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
              <span className="text-6xl">⚡</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Ready to test your reflexes?</h2>
            <p className="text-white/60 mb-8">Click start, then click as fast as you can when the screen turns green.</p>
            <button
              onClick={startTest}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              Start Test
            </button>
          </div>
        );
      case 'ready':
        return (
          <div 
            className="text-center cursor-pointer py-20"
            onClick={handleClick}
          >
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-2 border-yellow-500/50 flex items-center justify-center animate-pulse">
              <span className="text-8xl">🟡</span>
            </div>
            <p className="text-3xl font-bold text-yellow-400 animate-pulse">Wait for green...</p>
            <p className="text-white/40 mt-4">Click anywhere when it turns green!</p>
          </div>
        );
      case 'go':
        return (
          <div 
            className="text-center cursor-pointer py-20"
            onClick={handleClick}
          >
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-2xl shadow-green-500/50 flex items-center justify-center animate-bounce">
              <span className="text-white text-4xl font-black">CLICK!</span>
            </div>
            <p className="text-3xl font-bold text-green-400">Click now!</p>
          </div>
        );
      case 'clicked':
        const reactionTime = endTime.toFixed(0);
        const rating = getTimeRating(endTime);
        const average = getAverageTime();
        return (
          <div className="text-center">
            <div className="mb-6">
              <span className="text-6xl">{rating.emoji}</span>
            </div>
            <p className={`text-2xl font-bold ${rating.color} mb-2`}>{rating.text}</p>
            <p className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {reactionTime}ms
            </p>
            <p className="text-white/40 mb-8">Your reaction time</p>

            {history.length > 1 && (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Average ({history.length} attempts)</span>
                  <span className="text-xl font-bold text-white">{average}ms</span>
                </div>
                <div className="flex gap-2 mt-3 justify-center">
                  {history.map((time, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-white/10 text-white/60 text-xs">
                      {time.toFixed(0)}ms
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startTest}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
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
        );
      case 'too-early':
        return (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 border-2 border-red-500/50 flex items-center justify-center">
              <span className="text-6xl">❌</span>
            </div>
            <p className="text-3xl font-bold text-red-400 mb-2">Too Early!</p>
            <p className="text-white/60 mb-8">Wait for the green light before clicking.</p>
            <button
              onClick={startTest}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <Link to="/games" className="text-white/60 hover:text-white inline-flex items-center mb-4 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Games
            </Link>
            <h1 className="text-3xl font-bold text-white">Reaction Time Test</h1>
          </div>
          {renderContent()}
        </div>

        {/* Info Section */}
        <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">💡 About This Test</h3>
          <p className="text-white/60 text-sm mb-4">
            This test measures your visual reaction time - how quickly you can respond to a visual stimulus. The average human reaction time is around 250ms.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-cyan-400 font-bold">&lt; 200ms</span>
              <p className="text-white/40">Exceptional</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-green-400 font-bold">200-250ms</span>
              <p className="text-white/40">Excellent</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-yellow-400 font-bold">250-300ms</span>
              <p className="text-white/40">Average</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-orange-400 font-bold">&gt; 300ms</span>
              <p className="text-white/40">Below Average</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionTime;

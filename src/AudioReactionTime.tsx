import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AudioReactionTime: React.FC = () => {
  const [phase, setPhase] = useState<'waiting' | 'ready' | 'listening' | 'clicked' | 'too-early'>('waiting');
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const playBeep = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
  };

  const startTest = () => {
    setPhase('ready');
    setStartTime(0);
    setEndTime(0);

    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    timeoutRef.current = setTimeout(() => {
      playBeep();
      setPhase('listening');
      setStartTime(performance.now());
    }, randomDelay);
  };

  const handleClick = () => {
    if (phase === 'ready') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase('too-early');
    } else if (phase === 'listening') {
      const time = performance.now() - startTime;
      setEndTime(time);
      setHistory(prev => [...prev.slice(-4), time]);
      setPhase('clicked');
    }
  };

  const getAverageTime = () => {
    if (history.length === 0) return null;
    return (history.reduce((a, b) => a + b, 0) / history.length).toFixed(0);
  };

  const getTimeRating = (time: number) => {
    if (time < 180) return { text: 'Incredible!', color: 'text-cyan-400', emoji: '🏆' };
    if (time < 220) return { text: 'Excellent!', color: 'text-green-400', emoji: '⚡' };
    if (time < 280) return { text: 'Great!', color: 'text-yellow-400', emoji: '👍' };
    if (time < 350) return { text: 'Good', color: 'text-orange-400', emoji: '👌' };
    return { text: 'Keep practicing!', color: 'text-red-400', emoji: '💪' };
  };

  const handleShare = async () => {
    const reactionTime = endTime.toFixed(0);
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Audio Reaction Time Test',
          text: `I got ${reactionTime}ms on the Audio Reaction Time Test! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I got ${reactionTime}ms! Try it: ${window.location.href}`);
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
            <h1 className="text-3xl font-bold text-white">Audio Reaction Time</h1>
          </div>

          {phase === 'waiting' && (
            <div className="text-center py-8">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-6xl">👂</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Listen and React!</h2>
              <p className="text-white/60 mb-8">Click as fast as you can when you hear the beep sound.</p>
              <button
                onClick={startTest}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Test
              </button>
            </div>
          )}

          {phase === 'ready' && (
            <div 
              className="text-center py-16 cursor-pointer"
              onClick={handleClick}
            >
              <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-2 border-yellow-500/50 flex items-center justify-center">
                <span className="text-8xl animate-pulse">🔇</span>
              </div>
              <p className="text-3xl font-bold text-yellow-400 animate-pulse">Wait for the sound...</p>
              <p className="text-white/40 mt-4">Click anywhere when you hear it!</p>
            </div>
          )}

          {phase === 'listening' && (
            <div 
              className="text-center py-16 cursor-pointer"
              onClick={handleClick}
            >
              <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-2xl shadow-green-500/50 flex items-center justify-center animate-pulse">
                <span className="text-8xl">🔊</span>
              </div>
              <p className="text-3xl font-bold text-green-400">Click now!</p>
            </div>
          )}

          {phase === 'clicked' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">{getTimeRating(endTime).emoji}</span>
              </div>
              <p className={`text-2xl font-bold ${getTimeRating(endTime).color} mb-2`}>
                {getTimeRating(endTime).text}
              </p>
              <p className="text-6xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {endTime.toFixed(0)}ms
              </p>
              <p className="text-white/40 mb-8">Your audio reaction time</p>

              {history.length > 1 && (
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Average ({history.length} attempts)</span>
                    <span className="text-xl font-bold text-white">{getAverageTime()}ms</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startTest}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-indigo-500/30 transition-all duration-300"
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

          {phase === 'too-early' && (
            <div className="text-center py-8">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 border-2 border-red-500/50 flex items-center justify-center">
                <span className="text-6xl">❌</span>
              </div>
              <p className="text-3xl font-bold text-red-400 mb-2">Too Early!</p>
              <p className="text-white/60 mb-8">Wait for the sound before clicking.</p>
              <button
                onClick={startTest}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">💡 Audio vs Visual Reaction</h3>
          <p className="text-white/60 text-sm">
            Audio reaction time is typically faster than visual reaction time! The average audio reaction time is around 170ms, while visual is around 250ms. This is because sound travels faster to your brain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioReactionTime;
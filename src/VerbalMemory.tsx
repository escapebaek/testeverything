import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VerbalMemory: React.FC = () => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [words, setWords] = useState<string[]>([]);
  const [seenWords, setSeenWords] = useState<Set<string>>(new Set());
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const wordList = [
    'apple', 'banana', 'cherry', 'dragon', 'elephant', 'forest', 'garden', 'horizon',
    'island', 'jungle', 'kingdom', 'library', 'mountain', 'nature', 'ocean', 'planet',
    'quantum', 'river', 'sunset', 'thunder', 'universe', 'volcano', 'whisper', 'yellow',
    'zebra', 'ancient', 'balance', 'cascade', 'destiny', 'eclipse', 'fantasy', 'gravity',
    'harmony', 'illusion', 'journey', 'kindness', 'lantern', 'mystery', 'nebula', 'oracle',
    'paradise', 'radiance', 'serenity', 'twilight', 'umbrella', 'velocity', 'waterfall',
    'crystal', 'diamond', 'emerald', 'fountain', 'glacier', 'harvest', 'infinity', 'jasmine',
    'maple', 'northstar', 'obsidian', 'phoenix', 'quartz', 'rainbow', 'sapphire', 'tempest',
  ];

  const getNewWord = () => {
    // 40% chance of showing a seen word if there are any
    if (seenWords.size > 0 && Math.random() < 0.4) {
      const seenArray = Array.from(seenWords);
      return seenArray[Math.floor(Math.random() * seenArray.length)];
    }
    
    // Get a new word
    const availableWords = wordList.filter(w => !words.includes(w));
    if (availableWords.length === 0) {
      // All words used, pick from seen
      const seenArray = Array.from(seenWords);
      return seenArray[Math.floor(Math.random() * seenArray.length)];
    }
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  };

  const startGame = () => {
    setPhase('playing');
    setWords([]);
    setSeenWords(new Set());
    setScore(0);
    setLives(3);
    setFeedback(null);
    
    const firstWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(firstWord);
    setWords([firstWord]);
  };

  const handleAnswer = (answer: 'seen' | 'new') => {
    if (phase !== 'playing') return;

    const hasSeenBefore = seenWords.has(currentWord);
    const isCorrect = (answer === 'seen') === hasSeenBefore;

    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
      if (lives <= 1) {
        setTimeout(() => {
          setPhase('finished');
        }, 500);
        return;
      }
    }

    // Mark as seen and get next word
    setSeenWords(prev => new Set(prev).add(currentWord));
    
    setTimeout(() => {
      setFeedback(null);
      const nextWord = getNewWord();
      setCurrentWord(nextWord);
      setWords(prev => [...prev, nextWord]);
    }, 400);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Verbal Memory Test',
          text: `I scored ${score} on the Verbal Memory Test! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I scored ${score} on Verbal Memory! Try it: ${window.location.href}`);
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
            <h1 className="text-3xl font-bold text-white">Verbal Memory</h1>
          </div>

          {phase === 'ready' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">📝</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Word Memory Test</h2>
              <p className="text-white/60 mb-8">
                You will see words one at a time. For each word, answer whether you've seen it before or if it's new.
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Test
              </button>
            </div>
          )}

          {phase === 'playing' && (
            <>
              <div className="flex justify-between mb-8 px-4">
                <div className="text-center">
                  <p className="text-white/40 text-sm">Score</p>
                  <p className="text-2xl font-bold text-cyan-400">{score}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-sm">Lives</p>
                  <p className="text-2xl font-bold text-red-400">{'❤️'.repeat(lives)}</p>
                </div>
              </div>

              <div className={`text-center py-12 rounded-2xl mb-8 transition-all duration-200
                ${feedback === 'correct' ? 'bg-green-500/20' : feedback === 'wrong' ? 'bg-red-500/20' : 'bg-white/5'}`}>
                <p className="text-5xl font-bold text-white">{currentWord}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleAnswer('seen')}
                  disabled={feedback !== null}
                  className="flex-1 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  SEEN
                </button>
                <button
                  onClick={() => handleAnswer('new')}
                  disabled={feedback !== null}
                  className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  NEW
                </button>
              </div>

              <p className="text-center text-white/40 mt-4">
                Words shown: {words.length}
              </p>
            </>
          )}

          {phase === 'finished' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">{score >= 30 ? '🏆' : score >= 15 ? '⭐' : '💪'}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
              
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 mb-8 max-w-xs mx-auto">
                <p className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{score}</p>
                <p className="text-white/40">Final Score</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-violet-500/30 transition-all duration-300"
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

export default VerbalMemory;

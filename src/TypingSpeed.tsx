import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "The five boxing wizards jump quickly.",
  "Sphinx of black quartz, judge my vow.",
  "Two driven jocks help fax my big quiz.",
  "The jay, pig, fox, zebra and my wolves quack!",
  "Crazy Frederick bought many very exquisite opal jewels.",
  "We promptly judged antique ivory buckles for the next prize.",
  "A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.",
];

const TypingSpeed: React.FC = () => {
  const [phase, setPhase] = useState<'ready' | 'typing' | 'finished'>('ready');
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const startTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput('');
    setErrors(0);
    setStartTime(null);
    setEndTime(null);
    setPhase('typing');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    // Count errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    setUserInput(value);

    if (value === text) {
      setEndTime(Date.now());
      setPhase('finished');
    }
  };

  const calculateWPM = () => {
    if (!startTime || !endTime) return 0;
    const minutes = (endTime - startTime) / 60000;
    const words = text.split(' ').length;
    return Math.round(words / minutes);
  };

  const calculateAccuracy = () => {
    if (userInput.length === 0) return 100;
    const correctChars = userInput.split('').filter((char, i) => char === text[i]).length;
    return Math.round((correctChars / text.length) * 100);
  };

  const getWPMRating = (wpm: number) => {
    if (wpm >= 80) return { text: 'Professional!', color: 'text-cyan-400', emoji: '🏆' };
    if (wpm >= 60) return { text: 'Excellent!', color: 'text-green-400', emoji: '⚡' };
    if (wpm >= 40) return { text: 'Good!', color: 'text-yellow-400', emoji: '👍' };
    if (wpm >= 25) return { text: 'Average', color: 'text-orange-400', emoji: '📝' };
    return { text: 'Keep practicing!', color: 'text-red-400', emoji: '💪' };
  };

  const handleShare = async () => {
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Typing Speed Test',
          text: `I typed at ${wpm} WPM with ${accuracy}% accuracy! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I typed at ${wpm} WPM with ${accuracy}% accuracy! Try it: ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const renderCharacter = (char: string, index: number) => {
    if (index >= userInput.length) {
      return <span key={index} className="text-white/40">{char}</span>;
    }
    if (userInput[index] === char) {
      return <span key={index} className="text-green-400">{char}</span>;
    }
    return <span key={index} className="text-red-400 bg-red-500/20">{char}</span>;
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-6">
            <Link to="/games" className="text-white/60 hover:text-white inline-flex items-center mb-4 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Games
            </Link>
            <h1 className="text-3xl font-bold text-white">Typing Speed Test</h1>
          </div>

          {phase === 'ready' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">⌨️</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Test Your Typing Speed</h2>
              <p className="text-white/60 mb-8">Type the text as fast and accurately as you can.</p>
              <button
                onClick={startTest}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Typing
              </button>
            </div>
          )}

          {phase === 'typing' && (
            <div className="py-4">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <p className="text-xl leading-relaxed font-mono">
                  {text.split('').map((char, i) => renderCharacter(char, i))}
                </p>
              </div>

              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white text-xl font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                placeholder="Start typing here..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />

              <div className="flex justify-between mt-4 text-white/60">
                <span>Characters: {userInput.length}/{text.length}</span>
                <span className={errors > 0 ? 'text-red-400' : ''}>Errors: {errors}</span>
              </div>
            </div>
          )}

          {phase === 'finished' && (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">{getWPMRating(calculateWPM()).emoji}</span>
              </div>
              <p className={`text-2xl font-bold ${getWPMRating(calculateWPM()).color} mb-2`}>
                {getWPMRating(calculateWPM()).text}
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {calculateWPM()}
                  </p>
                  <p className="text-white/40 text-sm">WPM</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {calculateAccuracy()}%
                  </p>
                  <p className="text-white/40 text-sm">Accuracy</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startTest}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-xl hover:shadow-blue-500/30 transition-all duration-300"
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
          <h3 className="text-lg font-bold text-white mb-3">💡 Typing Speed Benchmarks</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-cyan-400 font-bold">80+ WPM</span>
              <p className="text-white/40">Professional</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-green-400 font-bold">60-80 WPM</span>
              <p className="text-white/40">Fast</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-yellow-400 font-bold">40-60 WPM</span>
              <p className="text-white/40">Average</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <span className="text-orange-400 font-bold">&lt; 40 WPM</span>
              <p className="text-white/40">Beginner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingSpeed;

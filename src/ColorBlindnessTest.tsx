import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ColorBlindnessTest: React.FC = () => {
  const [currentPlate, setCurrentPlate] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Ishihara-style test plates (simplified version)
  const plates = [
    { number: '12', description: 'Number visible to everyone', colors: { bg: '#8B9B52', fg: '#C75C5C' } },
    { number: '8', description: 'Tests red-green deficiency', colors: { bg: '#B5C584', fg: '#CD7070' } },
    { number: '29', description: 'Tests red-green deficiency', colors: { bg: '#7AA870', fg: '#CD8162' } },
    { number: '5', description: 'Tests red-green deficiency', colors: { bg: '#9AAD6C', fg: '#C66A6A' } },
    { number: '3', description: 'Tests red-green deficiency', colors: { bg: '#85A870', fg: '#D47B5C' } },
    { number: '15', description: 'Tests red-green deficiency', colors: { bg: '#A5B879', fg: '#C86868' } },
    { number: '74', description: 'Tests red-green deficiency', colors: { bg: '#88AA68', fg: '#CC7865' } },
    { number: '6', description: 'Tests red-green deficiency', colors: { bg: '#95B272', fg: '#D06B6B' } },
  ];

  const generateDots = (plateIndex: number) => {
    const dots = [];
    const plate = plates[plateIndex];
    const digits = plate.number.split('');
    
    // Generate background dots
    for (let i = 0; i < 120; i++) {
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;
      const size = 8 + Math.random() * 12;
      dots.push({
        x,
        y,
        size,
        color: plate.colors.bg,
      });
    }

    return dots;
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentPlate < plates.length - 1) {
      setCurrentPlate(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    let correct = 0;
    plates.forEach((plate, index) => {
      if (answers[index] === plate.number) {
        correct++;
      }
    });
    return {
      correct,
      total: plates.length,
      percentage: Math.round((correct / plates.length) * 100),
    };
  };

  const getResultMessage = (percentage: number) => {
    if (percentage >= 90) return { text: 'Normal Color Vision', color: 'text-green-400', emoji: '✅' };
    if (percentage >= 70) return { text: 'Mild Color Deficiency', color: 'text-yellow-400', emoji: '⚠️' };
    if (percentage >= 50) return { text: 'Moderate Color Deficiency', color: 'text-orange-400', emoji: '🔶' };
    return { text: 'Significant Color Deficiency', color: 'text-red-400', emoji: '🔴' };
  };

  const resetTest = () => {
    setCurrentPlate(0);
    setAnswers([]);
    setShowResult(false);
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
            <h1 className="text-3xl font-bold text-white">Color Blindness Test</h1>
          </div>

          {!showResult ? (
            <>
              <div className="text-center mb-4">
                <span className="text-white/60">Plate {currentPlate + 1} of {plates.length}</span>
              </div>

              {/* Progress Bar */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-1 mb-8">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${((currentPlate + 1) / plates.length) * 100}%` }}
                />
              </div>

              {/* Plate Display */}
              <div className="flex justify-center mb-8">
                <div 
                  className="w-64 h-64 rounded-full relative overflow-hidden shadow-2xl"
                  style={{ backgroundColor: plates[currentPlate].colors.bg }}
                >
                  {/* Simulated Ishihara plate with CSS */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-8xl font-bold"
                      style={{ 
                        color: plates[currentPlate].colors.fg,
                        textShadow: `0 0 20px ${plates[currentPlate].colors.fg}40`
                      }}
                    >
                      {plates[currentPlate].number}
                    </span>
                  </div>
                  {/* Dot overlay effect */}
                  <svg className="absolute inset-0 w-full h-full opacity-30">
                    {[...Array(80)].map((_, i) => (
                      <circle
                        key={i}
                        cx={`${10 + Math.random() * 80}%`}
                        cy={`${10 + Math.random() * 80}%`}
                        r={4 + Math.random() * 6}
                        fill={Math.random() > 0.5 ? plates[currentPlate].colors.bg : plates[currentPlate].colors.fg}
                        opacity={0.5}
                      />
                    ))}
                  </svg>
                </div>
              </div>

              <p className="text-center text-white/60 mb-6">What number do you see?</p>

              {/* Answer Options */}
              <div className="grid grid-cols-4 gap-3">
                {['12', '8', '29', '5', '3', '15', '74', '6', '?', ''].map((num) => (
                  num && (
                    <button
                      key={num}
                      onClick={() => handleAnswer(num)}
                      className="py-4 bg-white/10 border border-white/20 rounded-xl text-white text-xl font-bold hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    >
                      {num}
                    </button>
                  )
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              {(() => {
                const result = calculateResult();
                const message = getResultMessage(result.percentage);
                return (
                  <>
                    <div className="mb-6">
                      <span className="text-6xl">{message.emoji}</span>
                    </div>
                    <h2 className={`text-2xl font-bold ${message.color} mb-2`}>{message.text}</h2>
                    <p className="text-white/60 mb-8">
                      You correctly identified {result.correct} out of {result.total} plates ({result.percentage}%)
                    </p>

                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-left">
                      <h3 className="text-white font-bold mb-2">⚠️ Disclaimer</h3>
                      <p className="text-white/50 text-sm">
                        This is a simplified screening test and should not be used for medical diagnosis. 
                        If you suspect color vision deficiency, please consult an eye care professional.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={resetTest}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-green-500/30 transition-all duration-300"
                      >
                        Take Again
                      </button>
                      <Link
                        to="/games"
                        className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                      >
                        More Games
                      </Link>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorBlindnessTest;
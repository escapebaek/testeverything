import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  traitA: 'D' | 'I' | 'S' | 'C';
  traitB: 'D' | 'I' | 'S' | 'C';
}

const DISCTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    { id: 1, text: "When facing a challenge, I prefer to:", optionA: "Take charge and make quick decisions", optionB: "Observe carefully before acting", traitA: 'D', traitB: 'C' },
    { id: 2, text: "In social situations, I tend to:", optionA: "Be the center of attention", optionB: "Support others from the background", traitA: 'I', traitB: 'S' },
    { id: 3, text: "When working on a project, I focus on:", optionA: "Getting results quickly", optionB: "Ensuring accuracy and quality", traitA: 'D', traitB: 'C' },
    { id: 4, text: "I prefer an environment that is:", optionA: "Dynamic and changing", optionB: "Stable and predictable", traitA: 'I', traitB: 'S' },
    { id: 5, text: "When making decisions, I rely more on:", optionA: "Logic and data", optionB: "Gut feelings and enthusiasm", traitA: 'C', traitB: 'I' },
    { id: 6, text: "In conflicts, I tend to:", optionA: "Address issues directly", optionB: "Seek compromise and harmony", traitA: 'D', traitB: 'S' },
    { id: 7, text: "I get energized by:", optionA: "Achieving goals and winning", optionB: "Connecting with people", traitA: 'D', traitB: 'I' },
    { id: 8, text: "When giving feedback, I am:", optionA: "Direct and to the point", optionB: "Diplomatic and considerate", traitA: 'D', traitB: 'S' },
    { id: 9, text: "I prefer tasks that are:", optionA: "Creative and varied", optionB: "Systematic and detailed", traitA: 'I', traitB: 'C' },
    { id: 10, text: "In a team, I naturally:", optionA: "Take the leadership role", optionB: "Facilitate and support others", traitA: 'D', traitB: 'S' },
    { id: 11, text: "I am more motivated by:", optionA: "Recognition and applause", optionB: "Being right and accurate", traitA: 'I', traitB: 'C' },
    { id: 12, text: "Under pressure, I:", optionA: "Become more assertive", optionB: "Become more analytical", traitA: 'D', traitB: 'C' },
    { id: 13, text: "I prefer communication that is:", optionA: "Brief and to the point", optionB: "Warm and personal", traitA: 'D', traitB: 'S' },
    { id: 14, text: "I value:", optionA: "Excitement and variety", optionB: "Consistency and loyalty", traitA: 'I', traitB: 'S' },
    { id: 15, text: "When solving problems, I:", optionA: "Trust my instincts", optionB: "Gather all the facts first", traitA: 'I', traitB: 'C' },
    { id: 16, text: "I am known for being:", optionA: "Ambitious and driven", optionB: "Patient and reliable", traitA: 'D', traitB: 'S' },
    { id: 17, text: "In meetings, I:", optionA: "Share ideas enthusiastically", optionB: "Listen carefully and take notes", traitA: 'I', traitB: 'C' },
    { id: 18, text: "I fear:", optionA: "Losing control", optionB: "Being criticized", traitA: 'D', traitB: 'C' },
    { id: 19, text: "I prefer:", optionA: "Taking risks for big rewards", optionB: "Steady progress with stability", traitA: 'D', traitB: 'S' },
    { id: 20, text: "Others see me as:", optionA: "Inspiring and optimistic", optionB: "Thoughtful and precise", traitA: 'I', traitB: 'C' },
  ];

  const handleAnswer = (trait: 'D' | 'I' | 'S' | 'C') => {
    setScores(prev => ({ ...prev, [trait]: prev[trait] + 1 }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const getDominantType = () => {
    const max = Math.max(scores.D, scores.I, scores.S, scores.C);
    if (scores.D === max) return 'D';
    if (scores.I === max) return 'I';
    if (scores.S === max) return 'S';
    return 'C';
  };

  const typeInfo = {
    D: {
      name: 'Dominance',
      emoji: '🦁',
      color: 'from-red-400 to-orange-400',
      description: 'You are results-oriented, confident, and decisive. You value competence, action, and tangible results.',
      strengths: ['Natural leader', 'Quick decision maker', 'Competitive', 'Self-confident'],
      challenges: ['Can be impatient', 'May overlook details', 'Can be seen as aggressive'],
    },
    I: {
      name: 'Influence',
      emoji: '🌟',
      color: 'from-yellow-400 to-orange-400',
      description: 'You are enthusiastic, optimistic, and collaborative. You value recognition, positive relationships, and fun.',
      strengths: ['Inspiring', 'Creative', 'Enthusiastic', 'Great communicator'],
      challenges: ['Can be disorganized', 'May avoid details', 'Can be impulsive'],
    },
    S: {
      name: 'Steadiness',
      emoji: '🕊️',
      color: 'from-green-400 to-teal-400',
      description: 'You are calm, patient, and supportive. You value stability, sincere appreciation, and cooperation.',
      strengths: ['Reliable', 'Patient', 'Loyal', 'Great listener'],
      challenges: ['May resist change', 'Can be too accommodating', 'May avoid conflict'],
    },
    C: {
      name: 'Conscientiousness',
      emoji: '🔬',
      color: 'from-blue-400 to-purple-400',
      description: 'You are analytical, systematic, and detail-oriented. You value accuracy, quality, and expertise.',
      strengths: ['Detail-oriented', 'Analytical', 'Systematic', 'High standards'],
      challenges: ['Can be overly critical', 'May over-analyze', 'Can be seen as cold'],
    },
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setScores({ D: 0, I: 0, S: 0, C: 0 });
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const dominant = getDominantType();
    const info = typeInfo[dominant];
    const total = scores.D + scores.I + scores.S + scores.C;

    return (
      <div className="min-h-screen pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <div className="mb-6">
              <span className="text-6xl">{info.emoji}</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Your DISC Type</h1>
            <h2 className={`text-4xl font-black bg-gradient-to-r ${info.color} bg-clip-text text-transparent mb-4`}>
              {info.name} ({dominant})
            </h2>
            <p className="text-white/60 mb-8">{info.description}</p>

            {/* Score Breakdown */}
            <div className="space-y-3 mb-8">
              {(['D', 'I', 'S', 'C'] as const).map((trait) => (
                <div key={trait} className="text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white flex items-center">
                      <span className="mr-2">{typeInfo[trait].emoji}</span>
                      {typeInfo[trait].name}
                    </span>
                    <span className="text-white/60">{Math.round((scores[trait] / total) * 100)}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${typeInfo[trait].color} transition-all duration-1000`}
                      style={{ width: `${(scores[trait] / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Challenges */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-left">
                <h3 className="text-green-400 font-bold mb-2">💪 Strengths</h3>
                <ul className="space-y-1">
                  {info.strengths.map((s, i) => (
                    <li key={i} className="text-white/60 text-sm">• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="backdrop-blur-xl bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 text-left">
                <h3 className="text-orange-400 font-bold mb-2">⚠️ Watch for</h3>
                <ul className="space-y-1">
                  {info.challenges.map((c, i) => (
                    <li key={i} className="text-white/60 text-sm">• {c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={resetTest}
                className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                Take Again
              </button>
              <Link
                to="/personality"
                className={`px-6 py-3 rounded-xl bg-gradient-to-r ${info.color} text-white font-medium hover:shadow-lg transition-all duration-300`}
              >
                More Tests
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/personality" className="text-white/60 hover:text-white inline-flex items-center mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tests
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">DISC Personality Test</h1>
          <p className="text-white/60">Discover your behavioral style</p>
        </div>

        {/* Progress Bar */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-1 mb-8">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <span className="text-white/40 text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            <h2 className="text-xl font-bold text-white mt-2">{questions[currentQuestion].text}</h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleAnswer(questions[currentQuestion].traitA)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              {questions[currentQuestion].optionA}
            </button>
            <button
              onClick={() => handleAnswer(questions[currentQuestion].traitB)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
            >
              {questions[currentQuestion].optionB}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DISCTest;

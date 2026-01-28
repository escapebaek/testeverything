import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: { value: number; label: string }[];
}

const StressTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    { id: 1, text: "How often do you feel overwhelmed by your responsibilities?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 2, text: "How often do you have trouble sleeping due to worries?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 3, text: "How often do you feel irritable or angry for no clear reason?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 4, text: "How often do you have difficulty concentrating?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 5, text: "How often do you experience physical symptoms like headaches or muscle tension?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 6, text: "How often do you feel like you have no control over your life?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 7, text: "How often do you feel exhausted even after a full night's sleep?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 8, text: "How often do you feel lonely or isolated?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 9, text: "How often do you skip meals or eat poorly due to stress?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 10, text: "How often do you feel anxious about the future?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 11, text: "How often do you have trouble making decisions?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 12, text: "How often do you feel like you're not good enough?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 13, text: "How often do you avoid social situations?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 14, text: "How often do you feel a rapid heartbeat or shortness of breath when stressed?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
    { id: 15, text: "How often do you feel like you need a break but can't take one?", options: [{ value: 0, label: "Never" }, { value: 1, label: "Rarely" }, { value: 2, label: "Sometimes" }, { value: 3, label: "Often" }, { value: 4, label: "Always" }] },
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  };

  const getStressLevel = (score: number) => {
    const maxScore = questions.length * 4;
    const percentage = (score / maxScore) * 100;

    if (percentage <= 20) return { level: 'Very Low', color: 'from-green-400 to-emerald-400', emoji: '😌', advice: 'Your stress levels are excellent! Keep up your healthy habits and continue practicing self-care.' };
    if (percentage <= 40) return { level: 'Low', color: 'from-teal-400 to-cyan-400', emoji: '🙂', advice: 'You\'re managing stress well. Consider maintaining your current routines and staying mindful of any changes.' };
    if (percentage <= 60) return { level: 'Moderate', color: 'from-yellow-400 to-orange-400', emoji: '😐', advice: 'You may benefit from stress management techniques like meditation, exercise, or talking to someone you trust.' };
    if (percentage <= 80) return { level: 'High', color: 'from-orange-400 to-red-400', emoji: '😟', advice: 'Your stress levels are elevated. Consider making lifestyle changes and seeking support from friends, family, or professionals.' };
    return { level: 'Very High', color: 'from-red-400 to-red-600', emoji: '😰', advice: 'Your stress levels are concerning. Please consider speaking with a mental health professional for personalized support.' };
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();
  const stressInfo = getStressLevel(score);

  if (showResult) {
    const percentage = (score / (questions.length * 4)) * 100;

    return (
      <div className="min-h-screen pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <div className="mb-6">
              <span className="text-6xl">{stressInfo.emoji}</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Your Stress Level</h1>
            <h2 className={`text-4xl font-black bg-gradient-to-r ${stressInfo.color} bg-clip-text text-transparent mb-6`}>
              {stressInfo.level}
            </h2>

            {/* Stress Meter */}
            <div className="mb-8">
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stressInfo.color} transition-all duration-1000`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-white/40 text-xs">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-white font-bold mb-2">💡 Recommendation</h3>
              <p className="text-white/60">{stressInfo.advice}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{score}</p>
                <p className="text-white/40 text-xs">Score</p>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{questions.length * 4}</p>
                <p className="text-white/40 text-xs">Max Score</p>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{percentage.toFixed(0)}%</p>
                <p className="text-white/40 text-xs">Percentile</p>
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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
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
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/personality" className="text-white/60 hover:text-white inline-flex items-center mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tests
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Stress Level Assessment</h1>
          <p className="text-white/60">Measure your current stress level</p>
        </div>

        {/* Progress Bar */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-1 mb-8">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
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
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 hover:border-red-500/50 transition-all duration-300"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressTest;

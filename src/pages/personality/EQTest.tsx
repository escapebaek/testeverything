import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: { value: number; label: string }[];
  category: 'self' | 'social' | 'motivation' | 'empathy' | 'regulation';
}

const EQTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    { id: 1, text: "I can easily identify my feelings at any given moment.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'self' },
    { id: 2, text: "I can understand why I react emotionally in certain situations.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'self' },
    { id: 3, text: "I can tell how others feel by looking at them.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'empathy' },
    { id: 4, text: "I find it easy to put myself in someone else's shoes.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'empathy' },
    { id: 5, text: "I can calm myself down quickly when I'm upset.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'regulation' },
    { id: 6, text: "I rarely lose my temper.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'regulation' },
    { id: 7, text: "I find it easy to start conversations with strangers.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'social' },
    { id: 8, text: "I am good at resolving conflicts between people.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'social' },
    { id: 9, text: "I stay motivated even when facing challenges.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'motivation' },
    { id: 10, text: "I can delay gratification to achieve long-term goals.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'motivation' },
    { id: 11, text: "I know my strengths and weaknesses well.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'self' },
    { id: 12, text: "I can sense the mood in a room.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'empathy' },
    { id: 13, text: "I think before I act, even when emotional.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'regulation' },
    { id: 14, text: "I can persuade others effectively.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'social' },
    { id: 15, text: "I am optimistic about the future.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'motivation' },
    { id: 16, text: "I can accurately describe my emotions.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'self' },
    { id: 17, text: "I feel what others feel.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'empathy' },
    { id: 18, text: "I can adapt my behavior to different situations.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'regulation' },
    { id: 19, text: "I build and maintain strong relationships.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'social' },
    { id: 20, text: "I find meaning and purpose in what I do.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'motivation' },
    { id: 21, text: "I understand the link between my emotions and behavior.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'self' },
    { id: 22, text: "I can comfort others when they're upset.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'empathy' },
    { id: 23, text: "I manage stress well.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'regulation' },
    { id: 24, text: "I am comfortable in social situations.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'social' },
    { id: 25, text: "I bounce back quickly from setbacks.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'motivation' },
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

  const calculateScores = () => {
    const categories = { self: 0, social: 0, motivation: 0, empathy: 0, regulation: 0 };
    const counts = { self: 0, social: 0, motivation: 0, empathy: 0, regulation: 0 };

    questions.forEach((q, index) => {
      if (answers[index]) {
        categories[q.category] += answers[index];
        counts[q.category]++;
      }
    });

    return {
      self: counts.self ? Math.round((categories.self / (counts.self * 5)) * 100) : 0,
      social: counts.social ? Math.round((categories.social / (counts.social * 5)) * 100) : 0,
      motivation: counts.motivation ? Math.round((categories.motivation / (counts.motivation * 5)) * 100) : 0,
      empathy: counts.empathy ? Math.round((categories.empathy / (counts.empathy * 5)) * 100) : 0,
      regulation: counts.regulation ? Math.round((categories.regulation / (counts.regulation * 5)) * 100) : 0,
    };
  };

  const getOverallEQ = (scores: ReturnType<typeof calculateScores>) => {
    const average = (scores.self + scores.social + scores.motivation + scores.empathy + scores.regulation) / 5;
    if (average >= 80) return { level: 'Excellent', color: 'from-green-400 to-emerald-400', emoji: '🌟' };
    if (average >= 60) return { level: 'Good', color: 'from-cyan-400 to-blue-400', emoji: '👍' };
    if (average >= 40) return { level: 'Average', color: 'from-yellow-400 to-orange-400', emoji: '📈' };
    return { level: 'Developing', color: 'from-orange-400 to-red-400', emoji: '🌱' };
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const scores = calculateScores();
    const overall = getOverallEQ(scores);
    const average = Math.round((scores.self + scores.social + scores.motivation + scores.empathy + scores.regulation) / 5);

    const categories = [
      { name: 'Self-Awareness', score: scores.self, icon: '🪞', color: 'from-purple-400 to-pink-400' },
      { name: 'Empathy', score: scores.empathy, icon: '💝', color: 'from-pink-400 to-rose-400' },
      { name: 'Self-Regulation', score: scores.regulation, icon: '⚖️', color: 'from-blue-400 to-cyan-400' },
      { name: 'Social Skills', score: scores.social, icon: '🤝', color: 'from-green-400 to-teal-400' },
      { name: 'Motivation', score: scores.motivation, icon: '🔥', color: 'from-orange-400 to-yellow-400' },
    ];

    return (
      <div className="min-h-screen pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <div className="mb-6">
              <span className="text-6xl">{overall.emoji}</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Your Emotional Intelligence</h1>
            <h2 className={`text-4xl font-black bg-gradient-to-r ${overall.color} bg-clip-text text-transparent mb-2`}>
              {overall.level}
            </h2>
            <p className="text-white/60 mb-8">Overall Score: {average}%</p>

            {/* Category Breakdown */}
            <div className="space-y-4 mb-8">
              {categories.map((cat) => (
                <div key={cat.name} className="text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white flex items-center">
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </span>
                    <span className="text-white/60">{cat.score}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-1000`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              ))}
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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
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
          <h1 className="text-3xl font-bold text-white mb-2">Emotional Intelligence Test</h1>
          <p className="text-white/60">Assess your EQ across 5 dimensions</p>
        </div>

        {/* Progress Bar */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-1 mb-8">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
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
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300"
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

export default EQTest;

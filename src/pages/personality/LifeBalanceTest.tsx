import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: { value: number; label: string }[];
  category: 'career' | 'relationships' | 'purpose' | 'health' | 'finances' | 'growth';
}

const LifeBalanceTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    { id: 1, text: "I feel fulfilled in my current career/work.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'career' },
    { id: 2, text: "I have a clear sense of purpose in life.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'purpose' },
    { id: 3, text: "My relationships with family are strong and supportive.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'relationships' },
    { id: 4, text: "I maintain good physical health habits.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'health' },
    { id: 5, text: "I am satisfied with my financial situation.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'finances' },
    { id: 6, text: "I regularly learn new things and grow personally.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'growth' },
    { id: 7, text: "I have opportunities for advancement at work.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'career' },
    { id: 8, text: "I have meaningful friendships.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'relationships' },
    { id: 9, text: "I make time for activities that bring me joy.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'purpose' },
    { id: 10, text: "I get enough sleep and rest.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'health' },
    { id: 11, text: "I have clear financial goals.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'finances' },
    { id: 12, text: "I step out of my comfort zone regularly.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'growth' },
    { id: 13, text: "My work-life balance is healthy.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'career' },
    { id: 14, text: "I feel connected to my community.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'relationships' },
    { id: 15, text: "I live according to my values.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'purpose' },
    { id: 16, text: "I exercise regularly.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'health' },
    { id: 17, text: "I save money regularly.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'finances' },
    { id: 18, text: "I read or educate myself frequently.", options: [{ value: 1, label: "Strongly Disagree" }, { value: 2, label: "Disagree" }, { value: 3, label: "Neutral" }, { value: 4, label: "Agree" }, { value: 5, label: "Strongly Agree" }], category: 'growth' },
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
    const categories = { career: 0, relationships: 0, purpose: 0, health: 0, finances: 0, growth: 0 };
    const counts = { career: 0, relationships: 0, purpose: 0, health: 0, finances: 0, growth: 0 };

    questions.forEach((q, index) => {
      if (answers[index]) {
        categories[q.category] += answers[index];
        counts[q.category]++;
      }
    });

    return {
      career: counts.career ? Math.round((categories.career / (counts.career * 5)) * 100) : 0,
      relationships: counts.relationships ? Math.round((categories.relationships / (counts.relationships * 5)) * 100) : 0,
      purpose: counts.purpose ? Math.round((categories.purpose / (counts.purpose * 5)) * 100) : 0,
      health: counts.health ? Math.round((categories.health / (counts.health * 5)) * 100) : 0,
      finances: counts.finances ? Math.round((categories.finances / (counts.finances * 5)) * 100) : 0,
      growth: counts.growth ? Math.round((categories.growth / (counts.growth * 5)) * 100) : 0,
    };
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const scores = calculateScores();
    const average = Math.round((scores.career + scores.relationships + scores.purpose + scores.health + scores.finances + scores.growth) / 6);

    const categories = [
      { name: 'Career', score: scores.career, icon: '💼', color: 'from-blue-400 to-indigo-400' },
      { name: 'Relationships', score: scores.relationships, icon: '💝', color: 'from-pink-400 to-rose-400' },
      { name: 'Purpose', score: scores.purpose, icon: '⭐', color: 'from-yellow-400 to-orange-400' },
      { name: 'Health', score: scores.health, icon: '💪', color: 'from-green-400 to-emerald-400' },
      { name: 'Finances', score: scores.finances, icon: '💰', color: 'from-cyan-400 to-blue-400' },
      { name: 'Growth', score: scores.growth, icon: '🌱', color: 'from-purple-400 to-violet-400' },
    ];

    // Find lowest scores for recommendations
    const sortedCategories = [...categories].sort((a, b) => a.score - b.score);
    const lowestTwo = sortedCategories.slice(0, 2);

    return (
      <div className="min-h-screen pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <div className="mb-6">
              <span className="text-6xl">⚖️</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Your Life Balance</h1>
            <p className="text-white/60 mb-2">Overall Score</p>
            <h2 className={`text-5xl font-black mb-6 ${
              average >= 80 ? 'text-green-400' : average >= 60 ? 'text-yellow-400' : 'text-orange-400'
            }`}>
              {average}%
            </h2>

            {/* Wheel/Radar style display would be ideal but using bars for simplicity */}
            <div className="space-y-4 mb-8">
              {categories.map((cat) => (
                <div key={cat.name} className="text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white flex items-center">
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </span>
                    <span className={`font-bold ${
                      cat.score >= 80 ? 'text-green-400' : cat.score >= 60 ? 'text-yellow-400' : 'text-orange-400'
                    }`}>{cat.score}%</span>
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

            {/* Recommendations */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-white font-bold mb-3">💡 Focus Areas</h3>
              <p className="text-white/60 text-sm mb-3">
                Consider investing more time in these areas:
              </p>
              <div className="space-y-2">
                {lowestTwo.map((cat) => (
                  <div key={cat.name} className="flex items-center text-white/80">
                    <span className="mr-2">{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span className="ml-auto text-orange-400">{cat.score}%</span>
                  </div>
                ))}
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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all duration-300"
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
          <h1 className="text-3xl font-bold text-white mb-2">Life Balance Assessment</h1>
          <p className="text-white/60">Evaluate balance across life areas</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-1 mb-8">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

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
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
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

export default LifeBalanceTest;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string }[];
}

const LearningStyleTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    { id: 1, text: "When learning something new, you prefer to:", options: [{ value: 'V', label: "Watch a demonstration or video" }, { value: 'A', label: "Listen to an explanation" }, { value: 'K', label: "Try it yourself hands-on" }] },
    { id: 2, text: "When giving directions, you tend to:", options: [{ value: 'V', label: "Draw a map or point" }, { value: 'A', label: "Give verbal directions" }, { value: 'K', label: "Walk the person there" }] },
    { id: 3, text: "When cooking a new recipe, you:", options: [{ value: 'V', label: "Follow the written recipe with pictures" }, { value: 'A', label: "Have someone explain it to you" }, { value: 'K', label: "Jump in and experiment" }] },
    { id: 4, text: "In your free time, you prefer:", options: [{ value: 'V', label: "Watching movies or reading" }, { value: 'A', label: "Listening to music or podcasts" }, { value: 'K', label: "Physical activities or crafts" }] },
    { id: 5, text: "When memorizing information, you:", options: [{ value: 'V', label: "Write it down or use flashcards" }, { value: 'A', label: "Repeat it out loud" }, { value: 'K', label: "Walk around while reviewing" }] },
    { id: 6, text: "When buying a new gadget, you:", options: [{ value: 'V', label: "Look at diagrams and pictures" }, { value: 'A', label: "Ask someone to explain features" }, { value: 'K', label: "Try it out in the store" }] },
    { id: 7, text: "In a classroom, you learn best when:", options: [{ value: 'V', label: "The teacher uses presentations and visuals" }, { value: 'A', label: "The teacher lectures and discusses" }, { value: 'K', label: "There are hands-on activities" }] },
    { id: 8, text: "When solving a problem, you:", options: [{ value: 'V', label: "Visualize the solution in your mind" }, { value: 'A', label: "Talk through the problem" }, { value: 'K', label: "Work it out physically" }] },
    { id: 9, text: "When assembling furniture, you:", options: [{ value: 'V', label: "Follow the diagrams carefully" }, { value: 'A', label: "Have someone read instructions aloud" }, { value: 'K', label: "Start building and figure it out" }] },
    { id: 10, text: "When bored, you tend to:", options: [{ value: 'V', label: "Doodle or look around" }, { value: 'A', label: "Hum or talk to yourself" }, { value: 'K', label: "Fidget or move around" }] },
    { id: 11, text: "When concentrating, you prefer:", options: [{ value: 'V', label: "A quiet, visually clean space" }, { value: 'A', label: "Background music or white noise" }, { value: 'K', label: "Freedom to move around" }] },
    { id: 12, text: "When meeting new people, you remember:", options: [{ value: 'V', label: "Their face and appearance" }, { value: 'A', label: "Their name and voice" }, { value: 'K', label: "What you did together" }] },
    { id: 13, text: "When telling a story, you:", options: [{ value: 'V', label: "Describe scenes in detail" }, { value: 'A', label: "Use different voices and sounds" }, { value: 'K', label: "Use lots of gestures" }] },
    { id: 14, text: "When choosing a restaurant, you rely on:", options: [{ value: 'V', label: "Photos of the food" }, { value: 'A', label: "Friend recommendations" }, { value: 'K', label: "Past experiences there" }] },
    { id: 15, text: "When learning a language, you prefer:", options: [{ value: 'V', label: "Reading and writing exercises" }, { value: 'A', label: "Listening and speaking practice" }, { value: 'K', label: "Role-playing conversations" }] },
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScores = () => {
    const scores = { V: 0, A: 0, K: 0 };
    Object.values(answers).forEach(val => {
      scores[val as keyof typeof scores]++;
    });
    return scores;
  };

  const getLearnightStyle = (scores: ReturnType<typeof calculateScores>) => {
    const max = Math.max(scores.V, scores.A, scores.K);
    if (scores.V === max) return { 
      type: 'Visual', 
      emoji: '👁️', 
      color: 'from-blue-400 to-purple-400',
      description: 'You learn best through seeing and visualizing. You prefer diagrams, charts, maps, and written instructions.',
      tips: ['Use color-coded notes and highlighters', 'Create mind maps and diagrams', 'Watch educational videos', 'Visualize concepts in your mind']
    };
    if (scores.A === max) return { 
      type: 'Auditory', 
      emoji: '👂', 
      color: 'from-green-400 to-teal-400',
      description: 'You learn best through listening and speaking. You prefer lectures, discussions, and verbal explanations.',
      tips: ['Listen to podcasts and audiobooks', 'Discuss topics with others', 'Record and listen to your notes', 'Read aloud when studying']
    };
    return { 
      type: 'Kinesthetic', 
      emoji: '✋', 
      color: 'from-orange-400 to-red-400',
      description: 'You learn best through doing and moving. You prefer hands-on activities and physical experiences.',
      tips: ['Use hands-on experiments', 'Take frequent breaks to move', 'Study while walking', 'Create physical models']
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
    const style = getLearnightStyle(scores);
    const total = scores.V + scores.A + scores.K;

    return (
      <div className="min-h-screen pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <div className="mb-6">
              <span className="text-6xl">{style.emoji}</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Your Learning Style</h1>
            <h2 className={`text-4xl font-black bg-gradient-to-r ${style.color} bg-clip-text text-transparent mb-4`}>
              {style.type} Learner
            </h2>
            <p className="text-white/60 mb-8">{style.description}</p>

            {/* Score Breakdown */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl mb-1">👁️</p>
                <p className="text-2xl font-bold text-white">{Math.round((scores.V / total) * 100)}%</p>
                <p className="text-white/40 text-xs">Visual</p>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl mb-1">👂</p>
                <p className="text-2xl font-bold text-white">{Math.round((scores.A / total) * 100)}%</p>
                <p className="text-white/40 text-xs">Auditory</p>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl mb-1">✋</p>
                <p className="text-2xl font-bold text-white">{Math.round((scores.K / total) * 100)}%</p>
                <p className="text-white/40 text-xs">Kinesthetic</p>
              </div>
            </div>

            {/* Tips */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-white font-bold mb-3">💡 Study Tips for You</h3>
              <ul className="space-y-2">
                {style.tips.map((tip, index) => (
                  <li key={index} className="text-white/60 flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
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
          <h1 className="text-3xl font-bold text-white mb-2">Learning Style Test</h1>
          <p className="text-white/60">Discover how you learn best</p>
        </div>

        {/* Progress Bar */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-1 mb-8">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
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
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
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

export default LearningStyleTest;

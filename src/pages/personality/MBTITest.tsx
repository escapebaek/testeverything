import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  dimensionA: string;
  dimensionB: string;
}

const MBTITest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    { id: 1, text: "At a party, you tend to:", optionA: "Interact with many, including strangers", optionB: "Interact with a few people you know", dimensionA: "E", dimensionB: "I" },
    { id: 2, text: "You are more attracted to:", optionA: "Facts and concrete information", optionB: "Ideas and possibilities", dimensionA: "S", dimensionB: "N" },
    { id: 3, text: "When making decisions, you prefer to:", optionA: "Consider logic and consistency", optionB: "Consider people and circumstances", dimensionA: "T", dimensionB: "F" },
    { id: 4, text: "You prefer to:", optionA: "Have things decided and settled", optionB: "Keep options open", dimensionA: "J", dimensionB: "P" },
    { id: 5, text: "You feel more energized after:", optionA: "Spending time with a group", optionB: "Spending time alone", dimensionA: "E", dimensionB: "I" },
    { id: 6, text: "You are more interested in:", optionA: "What is actual and present", optionB: "What is possible and future", dimensionA: "S", dimensionB: "N" },
    { id: 7, text: "When evaluating others, you are more influenced by:", optionA: "Logic and principles", optionB: "Values and emotions", dimensionA: "T", dimensionB: "F" },
    { id: 8, text: "You prefer work that is:", optionA: "Planned and predictable", optionB: "Flexible and spontaneous", dimensionA: "J", dimensionB: "P" },
    { id: 9, text: "In conversations, you tend to:", optionA: "Initiate topics and lead discussion", optionB: "Wait for others to initiate", dimensionA: "E", dimensionB: "I" },
    { id: 10, text: "You trust more:", optionA: "Experience and what you've seen", optionB: "Intuition and gut feelings", dimensionA: "S", dimensionB: "N" },
    { id: 11, text: "You are more comfortable with:", optionA: "Analyzing problems objectively", optionB: "Understanding how people feel", dimensionA: "T", dimensionB: "F" },
    { id: 12, text: "Your workspace is typically:", optionA: "Organized and tidy", optionB: "Casual and flexible", dimensionA: "J", dimensionB: "P" },
    { id: 13, text: "When meeting new people, you:", optionA: "Find it easy to start conversations", optionB: "Find it challenging to open up", dimensionA: "E", dimensionB: "I" },
    { id: 14, text: "You prefer information that is:", optionA: "Practical and applicable", optionB: "Theoretical and abstract", dimensionA: "S", dimensionB: "N" },
    { id: 15, text: "You are more likely to:", optionA: "Be direct and straightforward", optionB: "Be diplomatic and tactful", dimensionA: "T", dimensionB: "F" },
    { id: 16, text: "You prefer to:", optionA: "Make lists and stick to them", optionB: "Go with the flow", dimensionA: "J", dimensionB: "P" },
    { id: 17, text: "After a long week, you prefer:", optionA: "Going out with friends", optionB: "Relaxing at home alone", dimensionA: "E", dimensionB: "I" },
    { id: 18, text: "You are more drawn to:", optionA: "Tried and tested methods", optionB: "New and innovative approaches", dimensionA: "S", dimensionB: "N" },
    { id: 19, text: "When giving feedback, you focus on:", optionA: "What needs improvement", optionB: "What was done well", dimensionA: "T", dimensionB: "F" },
    { id: 20, text: "You prefer deadlines that are:", optionA: "Fixed and firm", optionB: "Flexible and adaptable", dimensionA: "J", dimensionB: "P" },
  ];

  const handleAnswer = (answer: 'A' | 'B') => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, 'A' | 'B'>) => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    questions.forEach((q, index) => {
      const answer = finalAnswers[index];
      if (answer === 'A') {
        scores[q.dimensionA as keyof typeof scores]++;
      } else {
        scores[q.dimensionB as keyof typeof scores]++;
      }
    });

    const type = [
      scores.E >= scores.I ? 'E' : 'I',
      scores.S >= scores.N ? 'S' : 'N',
      scores.T >= scores.F ? 'T' : 'F',
      scores.J >= scores.P ? 'J' : 'P',
    ].join('');

    setResult(type);
    setShowResult(true);
  };

  const getTypeDescription = (type: string) => {
    const descriptions: Record<string, { title: string; description: string; traits: string[] }> = {
      'INTJ': { title: 'The Architect', description: 'Strategic, independent, and determined. INTJs are natural planners who love solving complex problems.', traits: ['Strategic', 'Independent', 'Analytical', 'Determined'] },
      'INTP': { title: 'The Logician', description: 'Innovative, curious, and logical. INTPs are creative problem-solvers who love theoretical concepts.', traits: ['Innovative', 'Logical', 'Curious', 'Objective'] },
      'ENTJ': { title: 'The Commander', description: 'Bold, imaginative, and strong-willed. ENTJs are natural leaders who love challenges.', traits: ['Bold', 'Strategic', 'Confident', 'Decisive'] },
      'ENTP': { title: 'The Debater', description: 'Smart, curious, and open-minded. ENTPs love intellectual challenges and debates.', traits: ['Innovative', 'Strategic', 'Enterprising', 'Outspoken'] },
      'INFJ': { title: 'The Advocate', description: 'Quiet, mystical, and inspiring. INFJs are idealistic and principled.', traits: ['Insightful', 'Principled', 'Compassionate', 'Idealistic'] },
      'INFP': { title: 'The Mediator', description: 'Poetic, kind, and altruistic. INFPs are always eager to help a good cause.', traits: ['Idealistic', 'Empathetic', 'Creative', 'Passionate'] },
      'ENFJ': { title: 'The Protagonist', description: 'Charismatic, inspiring, and natural leaders. ENFJs love to help others realize their potential.', traits: ['Charismatic', 'Reliable', 'Altruistic', 'Natural Leaders'] },
      'ENFP': { title: 'The Campaigner', description: 'Enthusiastic, creative, and sociable. ENFPs are free spirits who embrace new ideas.', traits: ['Enthusiastic', 'Creative', 'Sociable', 'Optimistic'] },
      'ISTJ': { title: 'The Logistician', description: 'Practical, fact-minded, and reliable. ISTJs are responsible and dedicated.', traits: ['Responsible', 'Thorough', 'Dependable', 'Calm'] },
      'ISFJ': { title: 'The Defender', description: 'Dedicated, warm, and protective. ISFJs are always ready to help those in need.', traits: ['Supportive', 'Reliable', 'Patient', 'Observant'] },
      'ESTJ': { title: 'The Executive', description: 'Excellent administrators, organized and dedicated. ESTJs love to bring order.', traits: ['Organized', 'Dedicated', 'Strong-willed', 'Direct'] },
      'ESFJ': { title: 'The Consul', description: 'Caring, sociable, and popular. ESFJs are always eager to help others.', traits: ['Caring', 'Sociable', 'Loyal', 'Organized'] },
      'ISTP': { title: 'The Virtuoso', description: 'Bold, practical experimenters. ISTPs are masters of tools and techniques.', traits: ['Optimistic', 'Creative', 'Practical', 'Spontaneous'] },
      'ISFP': { title: 'The Adventurer', description: 'Flexible, charming, and artistic. ISFPs are always exploring new experiences.', traits: ['Charming', 'Sensitive', 'Imaginative', 'Passionate'] },
      'ESTP': { title: 'The Entrepreneur', description: 'Smart, energetic, and perceptive. ESTPs are always the life of the party.', traits: ['Bold', 'Direct', 'Perceptive', 'Sociable'] },
      'ESFP': { title: 'The Entertainer', description: 'Spontaneous, energetic, and fun-loving. ESFPs love to be the center of attention.', traits: ['Bold', 'Original', 'Aesthetic', 'Practical'] },
    };
    return descriptions[type] || { title: 'Unknown Type', description: 'Complete the test to see your result.', traits: [] };
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult && result) {
    const typeInfo = getTypeDescription(result);
    return (
      <div className="min-h-screen pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8 text-center">
            <div className="mb-6">
              <span className="text-6xl">🎭</span>
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {result}
            </h1>
            <h2 className="text-2xl font-bold text-white mb-4">{typeInfo.title}</h2>
            <p className="text-white/60 text-lg mb-8">{typeInfo.description}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {typeInfo.traits.map((trait, index) => (
                <span key={index} className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm">
                  {trait}
                </span>
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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
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
          <h1 className="text-3xl font-bold text-white mb-2">MBTI Personality Test</h1>
          <p className="text-white/60">Discover your personality type</p>
        </div>

        {/* Progress Bar */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-1 mb-8">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <span className="text-white/40 text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            <h2 className="text-2xl font-bold text-white mt-2">{questions[currentQuestion].text}</h2>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleAnswer('A')}
              className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <span className="text-purple-400 font-bold mr-3 group-hover:text-purple-300">A.</span>
              {questions[currentQuestion].optionA}
            </button>
            <button
              onClick={() => handleAnswer('B')}
              className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300 group"
            >
              <span className="text-pink-400 font-bold mr-3 group-hover:text-pink-300">B.</span>
              {questions[currentQuestion].optionB}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MBTITest;

import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead, FAQStructuredData, BreadcrumbStructuredData } from '../components/SEO';
import { AdBanner } from '../components/AdSense';

const tests = [
  { 
    id: 'mbti', 
    name: 'MBTI Type', 
    description: 'Discover your personality type among 16 possible profiles', 
    icon: '🧬', 
    color: 'from-purple-500 to-pink-600',
    questions: 20,
    time: '5 min'
  },
  { 
    id: 'stress', 
    name: 'Stress Level', 
    description: 'Assess your current stress levels and get recommendations', 
    icon: '😰', 
    color: 'from-red-500 to-orange-600',
    questions: 15,
    time: '3 min'
  },
  { 
    id: 'eq', 
    name: 'Emotional Intelligence', 
    description: 'Measure your EQ across 5 key dimensions', 
    icon: '💖', 
    color: 'from-pink-500 to-rose-600',
    questions: 25,
    time: '5 min'
  },
  { 
    id: 'learning', 
    name: 'Learning Style', 
    description: 'Find out if you are Visual, Auditory, or Kinesthetic learner', 
    icon: '📚', 
    color: 'from-blue-500 to-indigo-600',
    questions: 15,
    time: '3 min'
  },
  { 
    id: 'disc', 
    name: 'DISC Profile', 
    description: 'Understand your behavioral style at work and relationships', 
    icon: '🦁', 
    color: 'from-orange-500 to-red-600',
    questions: 20,
    time: '4 min'
  },
  { 
    id: 'lifebalance', 
    name: 'Life Balance', 
    description: 'Evaluate balance across career, health, relationships, and more', 
    icon: '⚖️', 
    color: 'from-teal-500 to-cyan-600',
    questions: 18,
    time: '4 min'
  },
];

const PersonalityHub: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Free Personality Tests - MBTI, EQ, DISC & More"
        description="Take free personality tests including MBTI, Emotional Intelligence (EQ), DISC Profile, Learning Style, Stress Level, and Life Balance assessments. Discover your true self!"
        keywords="personality test, MBTI test, EQ test, DISC profile, learning style test, stress test, free personality quiz, personality assessment, self-discovery"
        url="/personality"
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Personality Tests', url: '/personality' },
        ]}
      />
      <FAQStructuredData
        faqs={[
          { question: 'Are these personality tests free?', answer: 'Yes! All our personality tests are completely free to take without any registration required.' },
          { question: 'How accurate are online personality tests?', answer: 'Our tests are based on established psychological frameworks like MBTI and DISC. While they provide valuable insights, they are best used for self-reflection rather than clinical diagnosis.' },
          { question: 'Are my test results private?', answer: 'Absolutely. Your results are not stored on our servers. Everything is processed locally in your browser for complete privacy.' },
          { question: 'Which personality test should I take first?', answer: 'We recommend starting with the MBTI test as it provides a comprehensive overview of your personality type. From there, you can explore specific areas like EQ or learning style.' },
        ]}
      />
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Personality{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tests
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover insights about yourself through science-backed personality assessments. 
            Understand your strengths, preferences, and areas for growth.
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tests.map((test) => (
            <Link
              key={test.id}
              to={`/personality/${test.id}`}
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${test.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {test.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {test.name}
              </h3>
              <p className="text-white/50 text-sm mb-4">{test.description}</p>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center text-white/40">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {test.questions} questions
                </span>
                <span className="flex items-center text-white/40">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {test.time}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Understanding Personality Tests
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center text-3xl mb-4">
                🔬
              </div>
              <h3 className="text-white font-bold mb-2">Science-Based</h3>
              <p className="text-white/50 text-sm">
                Our tests are based on established psychological frameworks and research.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-3xl mb-4">
                🔒
              </div>
              <h3 className="text-white font-bold mb-2">Private & Secure</h3>
              <p className="text-white/50 text-sm">
                Your results are not stored. Take tests anonymously and privately.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center text-3xl mb-4">
                💡
              </div>
              <h3 className="text-white font-bold mb-2">Actionable Insights</h3>
              <p className="text-white/50 text-sm">
                Get personalized recommendations and insights you can apply.
              </p>
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="mt-8">
          <AdBanner adSlot="2222222222" adFormat="horizontal" />
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm max-w-2xl mx-auto">
            ⚠️ These tests are for self-discovery and entertainment purposes. 
            They are not substitutes for professional psychological evaluation.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default PersonalityHub;


import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// SEO Components
import { SEOHead, GameStructuredData, QuizStructuredData, BreadcrumbStructuredData } from './components/SEO';
import { AdBanner } from './components/AdSense';

// Page Components
import LandingPage from './components/LandingPage';
import GamesHub from './pages/GamesHub';
import PersonalityHub from './pages/PersonalityHub';
import BlogList from './pages/BlogList';
import BlogWrite from './pages/BlogWrite';
import BlogPost from './pages/BlogPost';
import DailyChallenge from './pages/DailyChallenge';
import Leaderboard from './pages/Leaderboard';

// Personality Tests
import MBTITest from './pages/personality/MBTITest';
import StressTest from './pages/personality/StressTest';
import EQTest from './pages/personality/EQTest';
import LearningStyleTest from './pages/personality/LearningStyleTest';
import DISCTest from './pages/personality/DISCTest';
import LifeBalanceTest from './pages/personality/LifeBalanceTest';

// Games (existing)
import ReactionTime from './ReactionTime';
import ColorPerception from './ColorPerception';
import MemoryMatch from './MemoryMatch';
import TypingSpeed from './TypingSpeed';
import NumberSequence from './NumberSequence';
import DecisionMaker from './DecisionMaker';
import AimTrainer from './AimTrainer';
import ColorBlindnessTest from './ColorBlindnessTest';
import AudioReactionTime from './AudioReactionTime';
import ShapeRecognition from './ShapeRecognition';

// New Games
import StroopTest from './StroopTest';
import SimonSays from './SimonSays';
import VerbalMemory from './VerbalMemory';
import VisualMemory from './VisualMemory';

// Game metadata for SEO
const gameMetadata: Record<string, { name: string; description: string; category: string; keywords: string }> = {
  'app1': { name: 'Reaction Time Test', description: 'Test and improve your visual reflexes with this reaction time test. Compare your results with others worldwide.', category: 'Reflex', keywords: 'reaction time test, reflex test, reaction speed, visual reflexes' },
  'app2': { name: 'Color Perception Test', description: 'Can you spot the different shade? Test your color perception abilities and see how your eyes compare.', category: 'Vision', keywords: 'color perception test, color vision, shade detection, color blindness' },
  'app3': { name: 'Memory Match Game', description: 'Challenge your memory with this card matching game. Find all pairs in the shortest time possible.', category: 'Memory', keywords: 'memory match, card matching game, memory test, brain training' },
  'app4': { name: 'Typing Speed Test', description: 'Measure your typing speed in WPM. Practice and improve your typing skills with this free test.', category: 'Speed', keywords: 'typing speed test, WPM test, typing practice, keyboard skills' },
  'app5': { name: 'Number Sequence Memory', description: 'How many numbers can you remember? Test your short-term memory with increasing number sequences.', category: 'Memory', keywords: 'number memory, sequence memory, digit span test, short-term memory' },
  'app6': { name: 'Decision Maker Tool', description: 'Can\'t decide? Let our random decision maker help you choose. Perfect for making quick decisions.', category: 'Tools', keywords: 'decision maker, random picker, choice helper, random decision' },
  'app7': { name: 'Aim Trainer', description: 'Improve your aim and precision with this target practice game. Track your accuracy and speed.', category: 'Reflex', keywords: 'aim trainer, precision test, target practice, mouse accuracy' },
  'app8': { name: 'Color Blindness Test', description: 'Screen your color vision with Ishihara-style tests. Detect potential color blindness easily.', category: 'Vision', keywords: 'color blindness test, Ishihara test, color vision test, colorblind test' },
  'app9': { name: 'Audio Reaction Time', description: 'Test how quickly you react to sound stimuli. Compare your audio vs visual reaction times.', category: 'Reflex', keywords: 'audio reaction test, sound reaction time, audio reflexes, hearing test' },
  'app10': { name: 'Shape Recognition Test', description: 'Train your visual processing with this shape recognition challenge. Find the target shape quickly.', category: 'Vision', keywords: 'shape recognition, visual processing, pattern recognition, vision test' },
  'app11': { name: 'Stroop Test', description: 'Challenge your brain with the classic Stroop effect test. Can you ignore the word and name the color?', category: 'Focus', keywords: 'stroop test, stroop effect, cognitive test, attention test' },
  'app12': { name: 'Simon Says Game', description: 'Follow the pattern in this classic Simon Says game. How long can you remember the sequence?', category: 'Memory', keywords: 'simon says, pattern memory, sequence game, memory game' },
  'app13': { name: 'Verbal Memory Test', description: 'Test your verbal memory. Remember words and identify if you\'ve seen them before.', category: 'Memory', keywords: 'verbal memory, word memory test, vocabulary memory, brain game' },
  'app14': { name: 'Visual Memory Test', description: 'Remember the pattern and recreate it. Test your visual memory with increasing difficulty.', category: 'Memory', keywords: 'visual memory test, pattern memory, visual recall, memory training' },
};

// Personality test metadata for SEO
const personalityMetadata: Record<string, { name: string; description: string; keywords: string; questionCount: number }> = {
  'mbti': { name: 'Free MBTI Personality Test', description: 'Discover your MBTI personality type with our free, comprehensive test. Find out if you\'re INTJ, ENFP, or one of 14 other types.', keywords: 'MBTI test, personality type, Myers-Briggs, 16 personalities, free MBTI', questionCount: 20 },
  'stress': { name: 'Stress Level Assessment', description: 'Check your current stress levels with this science-based assessment. Get personalized tips to manage stress.', keywords: 'stress test, stress level, anxiety test, stress assessment, mental health', questionCount: 15 },
  'eq': { name: 'Emotional Intelligence (EQ) Test', description: 'Measure your emotional intelligence quotient. Understand your ability to recognize and manage emotions.', keywords: 'EQ test, emotional intelligence, empathy test, emotion test, EI test', questionCount: 20 },
  'learning': { name: 'Learning Style Assessment', description: 'Discover your learning style - are you visual, auditory, or kinesthetic? Optimize your study methods.', keywords: 'learning style test, visual learner, auditory learner, study style, learning type', questionCount: 15 },
  'disc': { name: 'DISC Personality Profile', description: 'Take the DISC assessment to understand your behavioral style. Discover your Dominance, Influence, Steadiness, and Conscientiousness.', keywords: 'DISC test, DISC profile, behavioral test, personality assessment, work style', questionCount: 20 },
  'lifebalance': { name: 'Life Balance Assessment', description: 'Evaluate your work-life balance across key areas. Get insights on how to achieve better life harmony.', keywords: 'life balance test, work-life balance, wellness assessment, life satisfaction', questionCount: 15 },
};

// Layout wrapper component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Game router component
const GameRouter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const metadata = id ? gameMetadata[id] : null;

  const renderGame = () => {
    switch (id) {
      case 'app1': return <ReactionTime />;
      case 'app2': return <ColorPerception />;
      case 'app3': return <MemoryMatch />;
      case 'app4': return <TypingSpeed />;
      case 'app5': return <NumberSequence />;
      case 'app6': return <DecisionMaker />;
      case 'app7': return <AimTrainer />;
      case 'app8': return <ColorBlindnessTest />;
      case 'app9': return <AudioReactionTime />;
      case 'app10': return <ShapeRecognition />;
      case 'app11': return <StroopTest />;
      case 'app12': return <SimonSays />;
      case 'app13': return <VerbalMemory />;
      case 'app14': return <VisualMemory />;
      default:
        return (
          <div className="min-h-screen pt-28 pb-12 px-6 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Game Not Found</h1>
              <p className="text-white/60">The game you're looking for doesn't exist.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {metadata && (
        <>
          <SEOHead
            title={metadata.name}
            description={metadata.description}
            keywords={metadata.keywords}
            url={`/games/${id}`}
            type="website"
          />
          <GameStructuredData
            name={metadata.name}
            description={metadata.description}
            url={`/games/${id}`}
            category={metadata.category}
          />
          <BreadcrumbStructuredData
            items={[
              { name: 'Home', url: '/' },
              { name: 'Games', url: '/games' },
              { name: metadata.name, url: `/games/${id}` },
            ]}
          />
        </>
      )}
      {renderGame()}
      {/* Bottom Ad Banner */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdBanner adSlot="1234567890" adFormat="horizontal" />
      </div>
    </>
  );
};

// Personality test router
const PersonalityRouter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const metadata = id ? personalityMetadata[id] : null;

  const renderTest = () => {
    switch (id) {
      case 'mbti': return <MBTITest />;
      case 'stress': return <StressTest />;
      case 'eq': return <EQTest />;
      case 'learning': return <LearningStyleTest />;
      case 'disc': return <DISCTest />;
      case 'lifebalance': return <LifeBalanceTest />;
      default:
        return (
          <div className="min-h-screen pt-28 pb-12 px-6 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Test Not Found</h1>
              <p className="text-white/60">The test you're looking for doesn't exist.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {metadata && (
        <>
          <SEOHead
            title={metadata.name}
            description={metadata.description}
            keywords={metadata.keywords}
            url={`/personality/${id}`}
            type="website"
          />
          <QuizStructuredData
            name={metadata.name}
            description={metadata.description}
            url={`/personality/${id}`}
            questionCount={metadata.questionCount}
          />
          <BreadcrumbStructuredData
            items={[
              { name: 'Home', url: '/' },
              { name: 'Personality Tests', url: '/personality' },
              { name: metadata.name, url: `/personality/${id}` },
            ]}
          />
        </>
      )}
      {renderTest()}
      {/* Bottom Ad Banner */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdBanner adSlot="0987654321" adFormat="horizontal" />
      </div>
    </>
  );
};

// About page
const AboutPage: React.FC = () => (
  <div className="min-h-screen pt-28 pb-12 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          About{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            TestEverything
          </span>
        </h1>
        <p className="text-white/60 text-lg">
          Discover your potential through science-based tests and games.
        </p>
      </div>
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-white/60 mb-6">
          TestEverything is dedicated to helping you understand your cognitive abilities, personality traits, and potential through engaging, scientifically-designed assessments and brain training games.
        </p>
        <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
        <ul className="space-y-3 text-white/60">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-3">🎮</span>
            <span><strong className="text-white">14+ Instant Games</strong> - Quick brain training exercises to improve your cognitive skills.</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">🧠</span>
            <span><strong className="text-white">6 Personality Tests</strong> - Discover your personality type, emotional intelligence, and more.</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-3">🏆</span>
            <span><strong className="text-white">Daily Challenges</strong> - New challenges every day to keep you sharp.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">📊</span>
            <span><strong className="text-white">Leaderboards</strong> - Compete with players worldwide and track your progress.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Privacy policy
const PrivacyPage: React.FC = () => (
  <div className="min-h-screen pt-28 pb-12 px-6">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Information We Collect</h2>
          <p className="text-white/60">
            We collect minimal information necessary to provide our services. Test results are stored locally in your browser and are not sent to our servers.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-3">How We Use Your Information</h2>
          <p className="text-white/60">
            Any information collected is used solely to improve your experience and the accuracy of our assessments.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Data Security</h2>
          <p className="text-white/60">
            We implement industry-standard security measures to protect your data. Your test results remain private and are never shared with third parties.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
          <p className="text-white/60">
            If you have any questions about our privacy practices, please contact us.
          </p>
        </section>
      </div>
    </div>
  </div>
);

// Terms of Service
const TermsPage: React.FC = () => (
  <div className="min-h-screen pt-28 pb-12 px-6">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Acceptance of Terms</h2>
          <p className="text-white/60">
            By accessing and using TestEverything, you agree to be bound by these Terms of Service.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Use of Services</h2>
          <p className="text-white/60">
            Our tests and games are provided for entertainment and educational purposes. Results should not be considered professional medical or psychological advice.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Intellectual Property</h2>
          <p className="text-white/60">
            All content, including tests, games, and design elements, are the property of TestEverything and protected by copyright laws.
          </p>
        </section>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        {/* Main Pages with Layout */}
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
        <Route path="/games" element={<Layout><GamesHub /></Layout>} />
        <Route path="/personality" element={<Layout><PersonalityHub /></Layout>} />
        <Route path="/blog" element={<Layout><BlogList /></Layout>} />
        <Route path="/blog/write" element={<Layout><BlogWrite /></Layout>} />
        <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
        <Route path="/challenge" element={<Layout><DailyChallenge /></Layout>} />
        <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
        <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
        
        {/* Games with Layout */}
        <Route path="/games/:id" element={<Layout><GameRouter /></Layout>} />
        
        {/* Personality Tests with Layout */}
        <Route path="/personality/:id" element={<Layout><PersonalityRouter /></Layout>} />
        
        {/* Legacy routes - redirect old paths */}
        <Route path="/app/:id" element={<Layout><GameRouter /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
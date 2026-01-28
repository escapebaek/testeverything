import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

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

  return renderGame();
};

// Personality test router
const PersonalityRouter: React.FC = () => {
  const { id } = useParams<{ id: string }>();

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
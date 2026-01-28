import React from 'react';
import { Link } from 'react-router-dom';

const DailyChallenge: React.FC = () => {
  // Sample challenges - will be dynamic later
  const todayChallenge = {
    title: "Speed Master Challenge",
    description: "Complete the Reaction Time test 5 times and get an average under 250ms",
    reward: "🏅 Speed Master Badge",
    difficulty: "Medium",
    timeLeft: "12:34:56",
  };

  const pastChallenges = [
    { date: 'Yesterday', title: 'Memory Champion', completed: true, reward: '🧠' },
    { date: '2 days ago', title: 'Type Racer', completed: false, reward: '⌨️' },
    { date: '3 days ago', title: 'Color Expert', completed: true, reward: '🌈' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-6">
            <span className="text-yellow-400 text-sm font-medium">🏆 Daily Challenge</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Today's{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Challenge
            </span>
          </h1>
          <p className="text-white/60 text-lg">
            Complete daily challenges to earn badges and climb the leaderboard!
          </p>
        </div>

        {/* Today's Challenge Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-8 mb-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium border border-yellow-500/30">
                🔥 Active Now
              </span>
              <div className="text-right">
                <p className="text-white/40 text-xs mb-1">Time Remaining</p>
                <p className="text-2xl font-mono font-bold text-white">{todayChallenge.timeLeft}</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">{todayChallenge.title}</h2>
            <p className="text-white/60 text-lg mb-6">{todayChallenge.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center bg-white/5 rounded-xl px-4 py-2">
                <span className="text-white/40 text-sm mr-2">Difficulty:</span>
                <span className="text-yellow-400 font-medium">{todayChallenge.difficulty}</span>
              </div>
              <div className="flex items-center bg-white/5 rounded-xl px-4 py-2">
                <span className="text-white/40 text-sm mr-2">Reward:</span>
                <span className="text-white font-medium">{todayChallenge.reward}</span>
              </div>
            </div>

            <Link
              to="/games/app1"
              className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              Start Challenge
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Past Challenges */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Past Challenges</h3>
          <div className="space-y-3">
            {pastChallenges.map((challenge, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{challenge.reward}</span>
                  <div>
                    <p className="text-white font-medium">{challenge.title}</p>
                    <p className="text-white/40 text-sm">{challenge.date}</p>
                  </div>
                </div>
                {challenge.completed ? (
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30">
                    ✓ Completed
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/30">
                    Missed
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 text-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 inline-block">
            <p className="text-white/50 text-sm">
              🚧 Daily challenges with persistent tracking coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;

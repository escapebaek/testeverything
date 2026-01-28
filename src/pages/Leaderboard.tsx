import React, { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  badge: string;
  trend: 'up' | 'down' | 'same';
}

const Leaderboard: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState('all');
  const [timeRange, setTimeRange] = useState('week');

  const games = [
    { id: 'all', name: 'All Games', icon: '🎮' },
    { id: 'reaction', name: 'Reaction Time', icon: '⚡' },
    { id: 'memory', name: 'Memory Match', icon: '🧠' },
    { id: 'typing', name: 'Typing Speed', icon: '⌨️' },
    { id: 'aim', name: 'Aim Trainer', icon: '🎯' },
  ];

  // Sample leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, username: 'SpeedDemon', score: 9850, badge: '👑', trend: 'same' },
    { rank: 2, username: 'BrainMaster', score: 9720, badge: '🥈', trend: 'up' },
    { rank: 3, username: 'QuickFingers', score: 9650, badge: '🥉', trend: 'down' },
    { rank: 4, username: 'CognitiveKing', score: 9480, badge: '🏅', trend: 'up' },
    { rank: 5, username: 'NeuralNinja', score: 9350, badge: '🏅', trend: 'up' },
    { rank: 6, username: 'MindRunner', score: 9200, badge: '🏅', trend: 'down' },
    { rank: 7, username: 'FlashReact', score: 9100, badge: '🏅', trend: 'same' },
    { rank: 8, username: 'MemoryPro', score: 8950, badge: '🏅', trend: 'up' },
    { rank: 9, username: 'TypeMaster', score: 8800, badge: '🏅', trend: 'down' },
    { rank: 10, username: 'FocusKing', score: 8650, badge: '🏅', trend: 'same' },
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
    switch (trend) {
      case 'up': return <span className="text-green-400">↑</span>;
      case 'down': return <span className="text-red-400">↓</span>;
      default: return <span className="text-white/40">−</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-300/20 border-gray-400/30';
      case 3: return 'bg-gradient-to-r from-orange-600/20 to-orange-400/20 border-orange-500/30';
      default: return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
            <span className="text-green-400 text-sm font-medium">📊 Leaderboard</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Global{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Rankings
            </span>
          </h1>
          <p className="text-white/60 text-lg">
            See how you stack up against players worldwide!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Game Filter */}
          <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2 flex flex-wrap gap-2">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedGame === game.id
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{game.icon}</span>
                <span className="hidden sm:inline">{game.name}</span>
              </button>
            ))}
          </div>

          {/* Time Filter */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2 flex gap-2">
            {['day', 'week', 'month', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {range === 'all' ? 'All Time' : range}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-400/10 to-gray-300/10 border border-gray-400/20 rounded-3xl p-6 text-center mt-8">
            <div className="text-4xl mb-2">🥈</div>
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gray-400 to-gray-300 flex items-center justify-center text-2xl font-bold text-gray-800 mb-3">
              2
            </div>
            <p className="text-white font-bold truncate">BrainMaster</p>
            <p className="text-white/40 text-sm">9,720 pts</p>
          </div>

          {/* 1st Place */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-3xl p-6 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="text-4xl">👑</span>
            </div>
            <div className="text-4xl mb-2 mt-4">🥇</div>
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-3xl font-bold text-yellow-900 mb-3 shadow-lg shadow-yellow-500/30">
              1
            </div>
            <p className="text-white font-bold text-lg truncate">SpeedDemon</p>
            <p className="text-yellow-400 font-medium">9,850 pts</p>
          </div>

          {/* 3rd Place */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-orange-600/10 to-orange-400/10 border border-orange-500/20 rounded-3xl p-6 text-center mt-8">
            <div className="text-4xl mb-2">🥉</div>
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-2xl font-bold text-orange-900 mb-3">
              3
            </div>
            <p className="text-white font-bold truncate">QuickFingers</p>
            <p className="text-white/40 text-sm">9,650 pts</p>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white">Full Rankings</h3>
          </div>
          <div className="divide-y divide-white/5">
            {leaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-300 ${getRankStyle(entry.rank)} border-l-4`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 text-center">
                    <span className="text-white/60 font-mono text-lg">#{entry.rank}</span>
                  </div>
                  <span className="text-2xl">{entry.badge}</span>
                  <div>
                    <p className="text-white font-medium">{entry.username}</p>
                    <p className="text-white/40 text-sm">{entry.score.toLocaleString()} points</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(entry.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Ranking */}
        <div className="mt-8 backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center">
                <span className="text-white font-bold">You</span>
              </div>
              <div>
                <p className="text-white font-bold">Your Ranking</p>
                <p className="text-white/40 text-sm">Sign in to track your progress</p>
              </div>
            </div>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

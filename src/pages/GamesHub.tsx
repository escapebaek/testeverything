import React from 'react';
import { Link } from 'react-router-dom';

const games = [
  { id: 'app1', name: 'Reaction Time', description: 'Test your visual reflexes', icon: '⚡', color: 'from-cyan-500 to-blue-600', category: 'Reflex' },
  { id: 'app2', name: 'Color Perception', description: 'Spot the different shade', icon: '🌈', color: 'from-pink-500 to-purple-600', category: 'Vision' },
  { id: 'app3', name: 'Memory Match', description: 'Find matching pairs', icon: '🧠', color: 'from-purple-500 to-pink-600', category: 'Memory' },
  { id: 'app4', name: 'Typing Speed', description: 'Test your typing WPM', icon: '⌨️', color: 'from-blue-500 to-cyan-600', category: 'Speed' },
  { id: 'app5', name: 'Number Sequence', description: 'Remember the numbers', icon: '🔢', color: 'from-cyan-500 to-teal-600', category: 'Memory' },
  { id: 'app6', name: 'Decision Maker', description: 'Let fate decide for you', icon: '🎲', color: 'from-teal-500 to-green-600', category: 'Tools' },
  { id: 'app7', name: 'Aim Trainer', description: 'Improve your precision', icon: '🎯', color: 'from-red-500 to-pink-600', category: 'Reflex' },
  { id: 'app8', name: 'Color Blindness', description: 'Screen your color vision', icon: '👁️', color: 'from-green-500 to-emerald-600', category: 'Vision' },
  { id: 'app9', name: 'Audio Reaction', description: 'React to sound stimuli', icon: '👂', color: 'from-indigo-500 to-purple-600', category: 'Reflex' },
  { id: 'app10', name: 'Shape Recognition', description: 'Find the target shape', icon: '🔺', color: 'from-orange-500 to-red-600', category: 'Vision' },
  { id: 'app11', name: 'Stroop Test', description: 'Color vs word challenge', icon: '🎨', color: 'from-red-500 to-blue-600', category: 'Focus' },
  { id: 'app12', name: 'Simon Says', description: 'Follow the pattern', icon: '🎮', color: 'from-green-500 to-blue-600', category: 'Memory' },
  { id: 'app13', name: 'Verbal Memory', description: 'Remember the words', icon: '📝', color: 'from-violet-500 to-purple-600', category: 'Memory' },
  { id: 'app14', name: 'Visual Memory', description: 'Memorize the pattern', icon: '🧩', color: 'from-cyan-500 to-blue-600', category: 'Memory' },
];

const categories = ['All', 'Memory', 'Reflex', 'Vision', 'Focus', 'Speed', 'Tools'];

const GamesHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredGames = selectedCategory === 'All' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Instant{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Games
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Challenge your cognitive abilities with our collection of brain training games. 
            Track your progress and compete with others!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <Link
              key={game.id}
              to={`/games/${game.id}`}
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {game.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {game.name}
              </h3>
              <p className="text-white/50 text-sm mb-3">{game.description}</p>
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">
                {game.category}
              </span>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Why Play Brain Games?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-white font-bold mb-2">Improve Memory</h3>
              <p className="text-white/50 text-sm">Strengthen your short-term and working memory</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">Faster Reactions</h3>
              <p className="text-white/50 text-sm">Enhance your reflexes and response time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-white font-bold mb-2">Better Focus</h3>
              <p className="text-white/50 text-sm">Train your concentration and attention span</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-white font-bold mb-2">Track Progress</h3>
              <p className="text-white/50 text-sm">See your cognitive skills improve over time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesHub;

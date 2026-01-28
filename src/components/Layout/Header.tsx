import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/games', label: 'Games', icon: '🎮' },
    { path: '/personality', label: 'Personality', icon: '🧠' },
    { path: '/blog', label: 'Blog', icon: '📝' },
    { path: '/challenge', label: 'Challenge', icon: '🏆' },
    { path: '/leaderboard', label: 'Leaderboard', icon: '📊' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <nav className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TestEverything
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2
                      ${isActive(item.path)
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-white/20'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2
                        ${isActive(item.path)
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-white/20'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

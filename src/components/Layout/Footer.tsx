import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <div className="relative backdrop-blur-xl bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TestEverything
                </span>
              </Link>
              <p className="text-white/60 text-sm max-w-md">
                Discover your true potential with our collection of cognitive tests, personality assessments, and brain training games.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/games" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Instant Games</Link></li>
                <li><Link to="/personality" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Personality Tests</Link></li>
                <li><Link to="/blog" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Blog</Link></li>
                <li><Link to="/challenge" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Daily Challenge</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">About Us</Link></li>
                <li><Link to="/privacy" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/40 text-sm">
              © 2025 TestEverything. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300">
                <span>𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300">
                <span>📷</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300">
                <span>💼</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

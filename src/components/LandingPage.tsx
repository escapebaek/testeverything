import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: '🎮',
      title: 'Instant Games',
      description: '10+ brain training games to test your reflexes, memory, and cognitive abilities.',
      link: '/games',
      gradient: 'from-cyan-500 to-blue-600',
      delay: '0ms',
    },
    {
      icon: '🧠',
      title: 'Personality Tests',
      description: 'Discover your personality type, stress level, and psychological traits.',
      link: '/personality',
      gradient: 'from-purple-500 to-pink-600',
      delay: '100ms',
    },
    {
      icon: '📝',
      title: 'Blog',
      description: 'Expert insights on cognitive science, brain health, and self-improvement.',
      link: '/blog',
      gradient: 'from-orange-500 to-red-600',
      delay: '200ms',
    },
    {
      icon: '🏆',
      title: 'Daily Challenge',
      description: 'New challenges every day. Compete with players worldwide.',
      link: '/challenge',
      gradient: 'from-yellow-500 to-orange-600',
      delay: '300ms',
    },
    {
      icon: '📊',
      title: 'Leaderboard',
      description: 'Track your progress and see how you rank globally.',
      link: '/leaderboard',
      gradient: 'from-green-500 to-emerald-600',
      delay: '400ms',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="animate-pulse mr-2">✨</span>
            <span className="text-white/80 text-sm">Discover your true potential</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Test
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Everything
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Challenge your mind with our collection of cognitive tests,
            personality assessments, and brain training games.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/games"
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Start Playing</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/personality"
              className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Take a Test
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">10+</div>
              <div className="text-white/50 text-sm mt-1">Games</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">5+</div>
              <div className="text-white/50 text-sm mt-1">Tests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">∞</div>
              <div className="text-white/50 text-sm mt-1">Fun</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              From quick brain games to in-depth personality assessments, we've got everything you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group relative"
                style={{ animationDelay: feature.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10"
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
                <div className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-[1.02] group-hover:shadow-2xl">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center text-cyan-400 font-medium group-hover:text-cyan-300">
                    <span>Explore</span>
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Challenge Yourself?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of users who test and improve their cognitive abilities every day.
            </p>
            <Link
              to="/games"
              className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              Get Started Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

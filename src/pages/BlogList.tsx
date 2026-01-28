import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
}

const BlogList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Brain Health', 'Productivity', 'Psychology', 'Self-Improvement'];

  // Sample blog posts - these will be replaced with actual content later
  const posts: BlogPost[] = [
    {
      id: 'improve-reaction-time',
      title: 'How to Improve Your Reaction Time: Science-Backed Methods',
      excerpt: 'Discover proven techniques to enhance your reaction speed through targeted exercises and lifestyle changes.',
      category: 'Brain Health',
      readTime: '5 min read',
      date: 'Coming Soon',
      image: '⚡',
      author: 'TestEverything Team',
    },
    {
      id: 'memory-techniques',
      title: '10 Memory Techniques Used by World Champions',
      excerpt: 'Learn the memory palace method and other techniques used by memory champions to remember anything.',
      category: 'Brain Health',
      readTime: '8 min read',
      date: 'Coming Soon',
      image: '🧠',
      author: 'TestEverything Team',
    },
    {
      id: 'personality-types',
      title: 'Understanding the 16 Personality Types: A Complete Guide',
      excerpt: 'Explore the MBTI framework and discover what your personality type says about you.',
      category: 'Psychology',
      readTime: '12 min read',
      date: 'Coming Soon',
      image: '🎭',
      author: 'TestEverything Team',
    },
    {
      id: 'focus-deep-work',
      title: 'The Science of Focus: How to Achieve Deep Work',
      excerpt: 'Master the art of concentration and learn how to eliminate distractions for maximum productivity.',
      category: 'Productivity',
      readTime: '7 min read',
      date: 'Coming Soon',
      image: '🎯',
      author: 'TestEverything Team',
    },
    {
      id: 'color-psychology',
      title: 'Color Psychology: How Colors Affect Your Mood and Decisions',
      excerpt: 'Understand the psychological impact of colors and how they influence human behavior.',
      category: 'Psychology',
      readTime: '6 min read',
      date: 'Coming Soon',
      image: '🌈',
      author: 'TestEverything Team',
    },
    {
      id: 'brain-foods',
      title: 'Top 15 Brain Foods for Better Cognitive Performance',
      excerpt: 'Optimize your brain function with these scientifically-proven foods that boost memory and focus.',
      category: 'Brain Health',
      readTime: '9 min read',
      date: 'Coming Soon',
      image: '🥑',
      author: 'TestEverything Team',
    },
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Brain Health': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Productivity': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Psychology': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Self-Improvement': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 mb-6">
            <span className="text-orange-400 text-sm font-medium">📝 Blog</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Insights &{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Articles
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Expert articles on brain health, cognitive science, and personal development.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article key={post.id} className="group">
              <div className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-[1.02] group-hover:shadow-2xl">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-6xl">
                  {post.image}
                </div>

                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-white/40 text-xs">{post.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs">{post.readTime}</span>
                    <div className="flex items-center text-orange-400 font-medium text-sm group-hover:text-orange-300">
                      <span>Read More</span>
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Write Post CTA (for admin) */}
        <div className="mt-16 text-center">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-bold text-white mb-2">Content Coming Soon</h3>
            <p className="text-white/50 mb-6">
              We're working on bringing you high-quality articles about brain health and cognitive science.
            </p>
            <Link
              to="/blog/write"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;

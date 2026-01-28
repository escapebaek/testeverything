import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, categories } from '../data/blogPosts';

const BlogList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            The{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Insights, tips, and science-backed strategies for productivity, brain health, and personal growth.
          </p>
          
          <Link 
            to="/blog/write" 
            className="absolute top-0 right-0 hidden md:inline-flex px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Write Post
          </Link>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pl-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2
                ${selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-center text-white/40 mb-8">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
        </p>

        {/* Featured Post (First Post) */}
        {filteredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
          <Link
            to={`/blog/${filteredPosts[0].id}`}
            className="block mb-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-5xl">
                {filteredPosts[0].image}
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-sm text-cyan-400 mb-3">
                  Featured
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-white/60 mb-4">{filteredPosts[0].excerpt}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-white/40">
                  <span>{formatDate(filteredPosts[0].date)}</span>
                  <span>•</span>
                  <span>{filteredPosts[0].readTime} min read</span>
                  <span>•</span>
                  <span>{filteredPosts[0].author}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === 'all' && !searchQuery ? filteredPosts.slice(1) : filteredPosts).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-2xl">
                  {post.image}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
                  categories.find(c => c.id === post.category)?.color || 'from-gray-500 to-gray-600'
                } text-white`}>
                  {categories.find(c => c.id === post.category)?.name}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-white/50 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              
              <div className="flex justify-between items-center text-sm text-white/40">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime} min read</span>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-white/60">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">📬 Stay Updated</h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Get the latest articles, brain training tips, and exclusive content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;

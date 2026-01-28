import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BlogWrite: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Brain Health',
    readTime: '5 min read',
  });
  const [isPreview, setIsPreview] = useState(false);

  const categories = ['Brain Health', 'Productivity', 'Psychology', 'Self-Improvement'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log('Saving post:', formData);
    alert('Post saved! (In development - posts are not persisted yet)');
  };

  const handlePublish = () => {
    // In a real app, this would publish the post
    console.log('Publishing post:', formData);
    alert('Post published! (In development - posts are not persisted yet)');
    navigate('/blog');
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/blog" className="text-white/60 hover:text-white flex items-center mb-2 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            <h1 className="text-3xl font-bold text-white">Write New Post</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="px-4 py-2 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-all duration-300"
            >
              {isPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-all duration-300"
            >
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
            >
              Publish
            </button>
          </div>
        </div>

        {isPreview ? (
          /* Preview Mode */
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {formData.category}
              </span>
              <span className="text-white/40 text-sm ml-4">{formData.readTime}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {formData.title || 'Untitled Post'}
            </h1>
            <p className="text-white/60 text-lg mb-8 italic">
              {formData.excerpt || 'No excerpt provided'}
            </p>
            <div className="prose prose-invert max-w-none">
              <div className="text-white/80 whitespace-pre-wrap leading-relaxed">
                {formData.content || 'Start writing your content...'}
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <label className="block text-white/60 text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a compelling title..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-xl font-bold"
              />
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
                <label className="block text-white/60 text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                  ))}
                </select>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
                <label className="block text-white/60 text-sm font-medium mb-2">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="e.g., 5 min read"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <label className="block text-white/60 text-sm font-medium mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={2}
                placeholder="A brief summary of the post..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
              />
            </div>

            {/* Content */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <label className="block text-white/60 text-sm font-medium mb-2">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={20}
                placeholder="Write your post content here... (Markdown supported)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none font-mono"
              />
              <p className="text-white/40 text-xs mt-2">Tip: You can use Markdown for formatting</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogWrite;

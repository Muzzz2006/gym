import { useState } from "react";
import { Search, BookOpen, Clock, ArrowRight, ArrowLeft, Tag, Calendar, User } from "lucide-react";
import { gymDB } from "../utils/db";
import { BlogPost } from "../types/gym";

export default function Blog() {
  const blogs = gymDB.getBlogs();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = ["All", "Strength", "Nutrition", "Recovery", "Science"];

  const filteredBlogs = blogs.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="py-24 bg-gym-dark-card border-t border-b border-white/5 relative">
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-gym-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {readingPost ? (
          /* Detailed Blog Post Reader */
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            {/* Back button */}
            <button
              onClick={() => setReadingPost(null)}
              className="inline-flex items-center space-x-2 text-xs font-mono text-gym-gold hover:underline focus:outline-none uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Research Hub</span>
            </button>

            {/* Article Image Banner */}
            <div className="relative h-96 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl">
              <img
                src={readingPost.image}
                alt={readingPost.title}
                className="w-full h-full object-cover filter brightness-[0.75]"
              />
              <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 bg-gym-dark/80 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-gym-gold uppercase font-semibold">
                <Tag className="w-3.5 h-3.5" />
                <span>{readingPost.category}</span>
              </div>
            </div>

            {/* Title & Stats */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-xs font-mono text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{readingPost.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{readingPost.readTime}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase leading-tight">
                {readingPost.title}
              </h1>
            </div>

            {/* Author Profile Card */}
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <img
                src={readingPost.author.avatar}
                alt={readingPost.author.name}
                className="w-12 h-12 rounded-lg object-cover border border-white/10"
              />
              <div>
                <p className="text-xs font-semibold text-white">{readingPost.author.name}</p>
                <p className="text-[10px] text-gray-400 font-mono uppercase">{readingPost.author.role}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6 pt-4 border-t border-white/5">
              {readingPost.content.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
              {readingPost.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white/5 rounded border border-white/5 text-[10px] font-mono text-gray-400 uppercase"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ) : (
          /* Blog Post Feed Grid */
          <div className="space-y-12">
            
            {/* Header with Search and Filter bar */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/5">
              <div className="space-y-3">
                <span className="text-xs font-mono text-gym-gold uppercase tracking-widest font-bold block">RESEARCH JOURNAL</span>
                <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
                  AURA INTELLIGENCE WIRE
                </h2>
                <p className="text-gray-400 text-sm max-w-xl">
                  Explore science-backed audits regarding strength development, metabolic diagnostics, nutrition, and post-workout recovery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-md">
                {/* Search field */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search research logs..."
                    className="w-full pl-10 pr-4 py-2 bg-gym-dark border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gym-gold"
                  />
                </div>

                {/* Dropdown category filter */}
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="px-3 py-2 bg-gym-dark border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-gym-gold [&>option]:bg-gym-dark"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* List of articles */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredBlogs.map((post) => (
                  <div
                    key={post.id}
                    className="group rounded-2xl glass-panel border border-white/5 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-gym-gold/25"
                  >
                    
                    {/* Cover Photo */}
                    <div className="h-56 overflow-hidden bg-slate-900 relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.75]"
                      />
                      <span className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-2.5 py-1 bg-gym-dark/80 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono text-gym-gold font-bold uppercase">
                        {post.category}
                      </span>
                    </div>

                    {/* Metadata body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6 text-left">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-[10px] font-mono text-gray-500">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span>{post.readTime}</span>
                          </span>
                        </div>

                        <h3 className="text-lg font-display font-bold text-white uppercase group-hover:text-gym-gold transition-colors leading-tight">
                          {post.title}
                        </h3>

                        <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Read CTA */}
                      <button
                        onClick={() => setReadingPost(post)}
                        className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-gym-gold hover:underline focus:outline-none uppercase text-left cursor-pointer"
                      >
                        <span>Analyze Research Post</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="p-16 text-center rounded-2xl glass-panel max-w-lg mx-auto space-y-4">
                <BookOpen className="w-12 h-12 text-gray-600 mx-auto animate-pulse" />
                <h4 className="text-lg font-display font-semibold text-white">No Journals Found</h4>
                <p className="text-xs text-gray-400">
                  There are no research logs matching your search term "{search}". Refine your parameters or reset filters.
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}

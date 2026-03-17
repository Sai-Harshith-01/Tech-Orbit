import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MessageSquare, Send, User } from 'lucide-react';
import { articleService } from '../services/articleService';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const data = await articleService.getArticleById(id);
      setArticle(data);
    } catch (error) {
      toast.error('Failed to load article');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setPosting(true);
    try {
      await articleService.addComment(id, comment);
      toast.success('Comment added!');
      setComment('');
      fetchArticle(); // Refresh article to see new comment
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Article Not Found</h1>
        <Link to="/" className="text-brand-600 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Orbit
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/student/dashboard" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-600 transition-colors mb-8 group font-medium"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Dashboard
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-slate-900">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} className="text-brand-500" />
                <span className="font-bold text-slate-700">{article.student_email.split('@')[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={16} />
                <span>{article.comments?.length || 0} Comments</span>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-xl mb-12">
            <img 
              src={`http://127.0.0.1:8000/${article.image_url}`} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <article className="bg-white p-8 md:p-12 rounded-3xl mb-16 border border-slate-100 shadow-sm">
            <div className="text-slate-700 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </article>

          {/* Comments Section */}
          <section id="comments" className="relative">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-8 bg-brand-500 rounded-full shadow-lg shadow-brand-500/20"></div>
              <h2 className="text-3xl font-bold text-slate-900">Community Discussion</h2>
            </div>

            {/* Post Comment */}
            <form onSubmit={handleAddComment} className="mb-12">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 focus-within:border-brand-500 focus-within:bg-white transition-all">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What are your thoughts on this?"
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 resize-none min-h-[100px] mb-4"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={posting || !comment.trim()}
                    className="btn-premium flex items-center gap-2 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {posting ? 'Posting...' : (
                      <>
                        Post Comment <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-6">
              {article.comments && article.comments.length > 0 ? (
                article.comments.map((c, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-xs flex-shrink-0">
                      {c.user_email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-slate-900">{c.user_email.split('@')[0]}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                          {new Date(c.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {c.message}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-300 uppercase tracking-widest font-bold border-2 border-dashed border-slate-100 rounded-3xl">
                  No comments yet. Start the conversation!
                </div>
              )}
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default ArticleDetails;

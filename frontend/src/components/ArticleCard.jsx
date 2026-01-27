import { useState } from 'react';
import toast from 'react-hot-toast';
import { articleService } from '../services/articleService';
import { authService } from '../services/authService';
import { Trash2 } from 'lucide-react';

const ArticleCard = ({ article, onDelete }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const currentUserId = authService.getUserId();
  const isOwner = currentUserId && article.student_id &&
    String(article.student_id).trim() === String(currentUserId).trim();

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    try {
      await articleService.addComment(article.id, comment);
      toast.success('Comment added successfully!');
      setComment('');
      setShowCommentBox(false);
    } catch (error) {
      toast.error('Failed to add comment: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      await articleService.deleteArticle(article.id);
      toast.success('Article deleted successfully!');
      if (onDelete) onDelete();
    } catch (error) {
      toast.error('Failed to delete article: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="premium-card flex flex-col h-full group">
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`http://127.0.0.1:8000/${article.image_url}`}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors">
          {article.title}
        </h3>

        {/* Content */}
        <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
          {article.content}
        </p>

        {/* Author Info */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xs">
              {article.student_email.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-700">{article.student_email.split('@')[0]}</span>
              <span className="text-[10px] text-slate-400">
                {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {isOwner && (
            <button
              onClick={handleDelete}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Article"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => setShowCommentBox(!showCommentBox)}
            className={`w-full py-2.5 rounded-premium text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${showCommentBox
              ? 'bg-slate-100 text-slate-700'
              : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
              }`}
          >
            💬 {showCommentBox ? 'Hide Comments' : 'Add Comment'}
          </button>

          {/* Comment Box */}
          {showCommentBox && (
            <div className="pt-2 animate-in fade-in transition-all duration-300">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="input-premium resize-none text-sm"
                rows="3"
              />
              <button
                onClick={handleAddComment}
                disabled={loading}
                className="btn-premium w-full mt-3 text-sm"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Posting...
                  </div>
                ) : 'Post Comment'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

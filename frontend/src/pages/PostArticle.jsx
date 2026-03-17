import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import articleService from '../services/articleService';

const PostArticle = () => {
 const navigate = useNavigate();
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [image, setImage] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const MAX_CONTENT_LENGTH = 500;
 const remainingChars = MAX_CONTENT_LENGTH - content.length;

 const handleImageChange = (e) => {
  if (e.target.files && e.target.files[0]) {
   setImage(e.target.files[0]);
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (content.length > MAX_CONTENT_LENGTH) {
   setError(`Content exceeds ${MAX_CONTENT_LENGTH} characters`);
   return;
  }

  if (!image) {
   setError('Please select an image');
   return;
  }

  setError('');
  setLoading(true);

  try {
   const formData = new FormData();
   formData.append('title', title);
   formData.append('content', content);
   formData.append('image', image);

   await articleService.postArticle(formData);
   toast.success('Article posted successfully!');
   navigate('/student/dashboard');
  } catch (err) {
   const errorMsg = err.response?.data?.detail || 'Failed to post article';
   setError(errorMsg);
   toast.error(errorMsg);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen relative overflow-hidden bg-slate-50">
   <Navbar />

   {/* Background Decorative Blobs */}
   <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-200/20 blur-[120px] rounded-full"></div>
   <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full"></div>

   <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 animate-zoomIn">
    <div className="text-center mb-12">
     <div className="inline-block p-4 bg-brand-500 rounded-2xl shadow-brand-500/20 shadow-2xl mb-6">
      <span className="text-3xl text-white">✍️</span>
     </div>
     <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Post New Article</h1>
     <p className="text-slate-500 mt-2">Share your thoughts and insights with the student community.</p>
    </div>

    {error && (
     <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-premium mb-8 shadow-sm animate-fadeIn flex items-center gap-3">
      <span className="text-xl">⚠️</span>
      <span className="font-medium">{error}</span>
     </div>
    )}

    <div className="glass-panel p-8 md:p-10">
     <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title Section */}
      <div>
       <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Article Title</label>
       <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-premium py-3.5 text-lg font-medium"
        placeholder="Catchy headline for your story..."
        required
       />
      </div>

      {/* Content Section */}
      <div>
       <div className="flex justify-between items-end mb-3 ml-1">
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest">Story Content</label>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${remainingChars < 0 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
         }`}>
         {remainingChars} characters left
        </span>
       </div>
       <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="input-premium resize-none min-h-[200px]"
        placeholder="Deep dive into your insights here..."
        required
       />
      </div>

      {/* Image Upload Section */}
      <div>
       <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Cover Image</label>
       <div className="relative group">
        <input
         type="file"
         accept="image/*"
         onChange={handleImageChange}
         className="hidden"
         id="article-image-upload"
         required
        />
        <label
         htmlFor="article-image-upload"
         className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-premium p-8 cursor-pointer bg-slate-50/50 group-hover:border-brand-400 group-hover:bg-brand-50/30 transition-all duration-300"
        >
         <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <span className="text-2xl">🖼️</span>
         </div>
         <span className="text-sm font-semibold text-slate-700">
          {image ? image.name : 'Click to upload cover photo'}
         </span>
         <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</span>
        </label>
       </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
       <button
        type="submit"
        disabled={loading || remainingChars < 0}
        className="btn-premium flex-1 flex items-center justify-center gap-2 group"
       >
        {loading ? (
         <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Publishing...</span>
         </>
        ) : (
         <>
          <span>Publish Article</span>
          <span className="group-hover:translate-x-1 transition-transform">✨</span>
         </>
        )}
       </button>
       <button
        type="button"
        onClick={() => navigate('/student/dashboard')}
        className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-premium transition-all active:scale-95"
       >
        Cancel
       </button>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
};

export default PostArticle;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import ArticleCard from '../components/ArticleCard';
import newsService from '../services/newsService';
import articleService from '../services/articleService';

const StudentDashboard = () => {
 const [news, setNews] = useState([]);
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchData();
 }, []);

 const fetchData = async () => {
  try {
   const [newsData, articlesData] = await Promise.all([
    newsService.getLatestNews(),
    articleService.getAllArticles()
   ]);
   setNews(newsData);
   setArticles(articlesData);
  } catch (error) {
   console.error('Failed to fetch data:', error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen pb-12">
   <Navbar />

   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-zoomIn">
    {/* Header Section */}
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
     <div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
       Student <span className="text-brand-600">Dashboard</span>
      </h1>
      <p className="text-slate-500 mt-1">Welcome back. Here's what's happening in tech today.</p>
     </div>
     <Link to="/student/post-article" className="btn-premium flex items-center gap-2">
      <span className="text-lg">✍️</span> Post Article
     </Link>
    </header>

    {loading ? (
     <div className="flex flex-col justify-center items-center py-20 bg-white/30 backdrop-blur-sm rounded-card border border-white/50">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-medium">Synchronizing data...</p>
     </div>
    ) : (
     <div className="space-y-16">
      {/* Tech News Section */}
      <section>
       <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-brand-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-800">Latest Tech News</h2>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
         <div key={index} className="premium-card p-0 overflow-hidden group">
          <NewsCard news={item} />
         </div>
        ))}
       </div>
      </section>

      {/* Student Articles Section */}
      <section>
       <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-brand-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-800">Student Articles</h2>
       </div>
       {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {articles.map((article) => (
          <div key={article.id} className="premium-card p-0 overflow-hidden group">
           <ArticleCard article={article} onDelete={fetchData} />
          </div>
         ))}
        </div>
       ) : (
        <div className="premium-card py-16 text-center text-slate-500 flex flex-col items-center">
         <span className="text-4xl mb-4">📝</span>
         <p className="text-lg font-medium text-slate-600">No articles yet</p>
         <p className="mt-1">Be the first to share your insights with the community!</p>
         <Link to="/student/post-article" className="mt-6 text-brand-600 font-semibold hover:underline">
          Get started →
         </Link>
        </div>
       )}
      </section>
     </div>
    )}
   </main>
  </div>
 );
};

export default StudentDashboard;

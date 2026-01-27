const NewsCard = ({ news }) => {
 const handleReadMore = () => {
  window.open(news.link, '_blank');
 };

 // Deterministic rotation based on title length to keep it consistent
 const defaultImgIndex = (news.title ? news.title.length % 5 : 0) + 1;
 const defaultImg = `/news-default/img${defaultImgIndex}.png`;

 const imageSrc = news.urlToImage || news.image || defaultImg;

 return (
  <div
   className="bg-white/60 backdrop-blur-md rounded-card border border-white/50 shadow-premium hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden group h-full flex flex-col"
   onClick={handleReadMore}
  >
   {/* Image Container - Top */}
   <div className="relative h-48 overflow-hidden">
    <img
     src={imageSrc}
     alt={news.title}
     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute top-4 left-4">
     <span className="bg-white/90 backdrop-blur-md text-brand-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
      {news.source}
     </span>
    </div>
   </div>

   {/* Content Container */}
   <div className="flex flex-col flex-1 p-6">
    <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors">
     {news.title}
    </h3>

    <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
     {news.summary}
    </p>

    {/* Footer */}
    <div className="flex justify-between items-center pt-4 border-t border-slate-100/50">
     <div className="flex items-center text-slate-400 text-xs">
      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {new Date(news.published_at).toLocaleDateString('en-US', {
       month: 'short',
       day: 'numeric'
      })}
     </div>
     <span className="text-brand-600 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
      Explore
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
      </svg>
     </span>
    </div>
   </div>
  </div>
 );
};

export default NewsCard;

const StatsCard = ({ title, value, icon, color = 'blue' }) => {
 const colorClasses = {
  blue: 'bg-brand-50 text-brand-600 shadow-brand-500/10',
  green: 'bg-emerald-50 text-emerald-600 shadow-emerald-500/10',
  purple: 'bg-indigo-50 text-indigo-600 shadow-indigo-500/10',
  orange: 'bg-orange-50 text-orange-600 shadow-orange-500/10',
 };

 return (
  <div className="premium-card p-6 group hover:-translate-y-1 transition-all duration-300">
   <div className="flex items-center justify-between">
    <div>
     <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{title}</p>
     <div className="flex items-baseline gap-1">
      <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
      <span className="text-brand-500 text-xs font-bold bg-brand-50 px-1.5 py-0.5 rounded">↑</span>
     </div>
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:scale-110 duration-500 ${colorClasses[color]}`}>
     {icon}
    </div>
   </div>
  </div>
 );
};

export default StatsCard;

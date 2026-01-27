import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import adminService from '../services/adminService';

const AdminDashboard = () => {
 const [stats, setStats] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchStats();
 }, []);

 const fetchStats = async () => {
  try {
   const data = await adminService.getOverviewStats();
   setStats(data);
  } catch (error) {
   console.error('Failed to fetch stats:', error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen pb-20">
   <Navbar />

   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-zoomIn">
    {/* Header Section */}
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
     <div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
       Admin <span className="text-brand-600">Control</span>
      </h1>
      <p className="text-slate-500 mt-1">Platform overview and institutional management.</p>
     </div>
     <Link to="/admin/approve-colleges" className="btn-premium flex items-center gap-2">
      <span className="text-xl">👑</span> Approve Colleges
     </Link>
    </header>

    {loading ? (
     <div className="flex flex-col justify-center items-center py-20 bg-white/30 backdrop-blur-sm rounded-card border border-white/50">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-medium">Fetching global analytics...</p>
     </div>
    ) : stats ? (
     <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
       <StatsCard title="Total Students" value={stats.total_students} icon="👨‍🎓" color="blue" />
       <StatsCard title="Total Colleges" value={stats.total_colleges} icon="🏫" color="green" />
       <StatsCard title="Active Events" value={stats.total_hackathons} icon="🏆" color="purple" />
       <StatsCard title="Registrations" value={stats.total_registrations} icon="📝" color="orange" />
      </div>

      {/* Platform Metrics Table */}
      <section className="premium-card p-0 overflow-hidden">
       <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">Platform Health & Metrics</h2>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-100 px-2 py-1 rounded">Live Data</span>
       </div>
       <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
         <thead className="bg-slate-50/80 backdrop-blur-sm">
          <tr>
           <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metric Identifier</th>
           <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Value</th>
           <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">System Status</th>
          </tr>
         </thead>
         <tbody className="divide-y divide-slate-100">
          {[
           { label: 'Platform Users', val: stats.total_students, status: 'Active', color: 'text-brand-600 bg-brand-50' },
           { label: 'Partner Institutions', val: stats.total_colleges, status: 'Verified', color: 'text-indigo-600 bg-indigo-50' },
           { label: 'Credentialed Colleges', val: stats.approved_colleges, status: 'Approved', color: 'text-emerald-600 bg-emerald-50' },
           { label: 'Verification Queue', val: stats.pending_colleges, status: stats.pending_colleges > 0 ? 'Action Needed' : 'Clear', color: stats.pending_colleges > 0 ? 'text-amber-600 bg-amber-50' : 'text-slate-400 bg-slate-50' },
           { label: 'Global Hackathons', val: stats.total_hackathons, status: 'Synchronized', color: 'text-brand-600 bg-brand-50' },
           { label: 'Cumulative Registrations', val: stats.total_registrations, status: 'Validated', color: 'text-emerald-600 bg-emerald-50' },
          ].map((row, idx) => (
           <tr key={idx} className="hover:bg-slate-50 transition-colors duration-200 group">
            <td className="px-6 py-4 font-semibold text-slate-700">{row.label}</td>
            <td className="px-6 py-4">
             <span className="text-lg font-bold text-slate-900">{row.val}</span>
            </td>
            <td className="px-6 py-4 text-right">
             <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${row.color}`}>
              {row.status}
             </span>
            </td>
           </tr>
          ))}
         </tbody>
        </table>
       </div>
      </section>

      {/* Alert Banner */}
      {stats.pending_colleges > 0 && (
       <div className="premium-card bg-amber-50/50 border-amber-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse">
        <div className="flex items-center gap-6">
         <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
          ⚠️
         </div>
         <div>
          <h3 className="text-xl font-bold text-slate-900">Pending Approvals</h3>
          <p className="text-slate-600">{stats.pending_colleges} institutions are waiting for credentials review.</p>
         </div>
        </div>
        <Link to="/admin/approve-colleges" className="btn-premium !bg-amber-600 hover:!bg-amber-700 shadow-amber-600/20 whitespace-nowrap">
         Moderate Access
        </Link>
       </div>
      )}
     </div>
    ) : (
     <div className="premium-card py-20 text-center text-slate-500">
      <p>Unable to retrieve platform data. Please try again later.</p>
     </div>
    )}
   </main>
  </div>
 );
};

export default AdminDashboard;

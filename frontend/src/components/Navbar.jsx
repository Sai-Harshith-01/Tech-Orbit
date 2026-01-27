import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import NotificationBell from './NotificationBell';

const Navbar = () => {
 const navigate = useNavigate();
 const role = authService.getRole();

 const handleLogout = () => {
  authService.logout();
  navigate('/login');
 };

 const getDashboardLink = () => {
  if (role === 'STUDENT') return '/student/dashboard';
  if (role === 'COLLEGE') return '/college/dashboard';
  if (role === 'ADMIN') return '/admin/dashboard';
  return '/';
 };

 return (
  <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/40 shadow-sm">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
     {/* Logo */}
     <Link to={getDashboardLink()} className="flex items-center group">
      <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
       <span className="text-white text-xl font-bold">T</span>
      </div>
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
       TechOrbit
      </span>
     </Link>

     {/* Navigation Links */}
     <div className="flex items-center space-x-1">
      {role === 'STUDENT' && (
       <>
        <Link to="/student/dashboard" className="px-4 py-2 text-slate-700 hover:text-brand-600 hover:bg-white/50 rounded-premium transition-all">
         Dashboard
        </Link>
        <Link to="/student/hackathons" className="px-4 py-2 text-slate-700 hover:text-brand-600 hover:bg-white/50 rounded-premium transition-all">
         Hackathons
        </Link>
        <Link to="/student/post-article" className="px-4 py-2 text-slate-700 hover:text-brand-600 hover:bg-white/50 rounded-premium transition-all">
         Post Article
        </Link>
       </>
      )}

      {role === 'COLLEGE' && (
       <>
        <Link to="/college/dashboard" className="px-4 py-2 text-slate-700 hover:text-brand-600 hover:bg-white/50 rounded-premium transition-all">
         Dashboard
        </Link>
        <Link to="/college/create-hackathon" className="px-4 py-2 text-slate-700 hover:text-brand-600 hover:bg-white/50 rounded-premium transition-all">
         Create Hackathon
        </Link>
       </>
      )}

      {role === 'ADMIN' && (
       <>
        <Link to="/admin/dashboard" className="px-4 py-2 text-slate-700 hover:text-brand-600 hover:bg-white/50 rounded-premium transition-all">
         Dashboard
        </Link>
        <Link to="/admin/approve-colleges" className="px-4 py-2 text-slate-700 hover:text-brand-600 hover:bg-white/50 rounded-premium transition-all">
         Approve Colleges
        </Link>
       </>
      )}

      <div className="h-6 w-[1px] bg-slate-200 mx-2" />

      {/* Notification Bell */}
      <NotificationBell />

      {/* Logout Button */}
      <button
       onClick={handleLogout}
       className="ml-2 px-4 py-2 text-slate-600 font-medium hover:text-red-600 hover:bg-red-50 rounded-premium transition-all"
      >
       Logout
      </button>
     </div>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;

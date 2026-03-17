import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
   const { role } = await authService.login(email, password);

   // Redirect based on role
   if (role === 'STUDENT') navigate('/student/dashboard');
   else if (role === 'COLLEGE') navigate('/college/dashboard');
   else if (role === 'ADMIN') navigate('/admin/dashboard');
  } catch (err) {
   setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
   {/* Decorative Blobs */}
   <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-200/20 blur-[120px] rounded-full animate-pulse"></div>
   <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full"></div>

   <div className="glass-panel max-w-md w-full p-10 animate-zoomIn">
    <div className="text-center mb-10">
     <div className="inline-block p-4 bg-brand-500 rounded-2xl shadow-brand-500/20 shadow-2xl mb-6">
      <span className="text-3xl">🚀</span>
     </div>
     <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
      Welcome <span className="text-brand-600">Back</span>
     </h1>
     <p className="text-slate-500 font-medium">Continue your TechOrbit journey.</p>
    </div>

    {error && (
     <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-premium text-sm font-bold mb-6 flex items-center gap-3">
      <span className="text-lg">⚠️</span> {error}
     </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-6">
     <div>
      <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Email Identifier</label>
      <input
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="input-premium"
       placeholder="name@example.com"
       required
      />
     </div>

     <div>
      <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Security Key</label>
      <input
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="input-premium"
       placeholder="••••••••"
       required
      />
     </div>

     <button
      type="submit"
      disabled={loading}
      className="btn-premium w-full py-4 flex items-center justify-center gap-2 shadow-xl"
     >
      {loading ? (
       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : 'Sign In'}
     </button>
    </form>

    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
     <p className="text-slate-500 text-sm font-medium">
      New to the orbit?{' '}
      <Link to="/register" className="text-brand-600 font-bold hover:text-brand-700 transition-colors">
       Create an Account
      </Link>
     </p>
    </div>
   </div>
  </div>
 );
};

export default Login;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (userType === 'STUDENT') {
        await authService.registerStudent(email, password);
        setSuccess('Student registered successfully! Please login.');
      } else {
        await authService.registerCollege(email, website, password);
        setSuccess('College registered successfully! Pending admin approval. You will be notified once approved.');
      }

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-200/20 blur-[120px] rounded-full animate-pulse"></div>

      <div className="glass-panel max-w-md w-full p-10 animate-zoomIn">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-indigo-500 rounded-2xl shadow-indigo-500/20 shadow-2xl mb-6">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Join the <span className="text-brand-600">Orbit</span>
          </h1>
          <p className="text-slate-500 font-medium">Start your journey with TechOrbit.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-premium text-sm font-bold mb-6 flex items-center gap-3">
            <span className="text-lg">⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-premium text-sm font-bold mb-6 flex items-center gap-3">
            <span className="text-lg">✅</span> {success}
          </div>
        )}

        {/* User Type Selection */}
        <div className="flex p-1 bg-slate-100 rounded-premium mb-8">
          <button
            type="button"
            onClick={() => setUserType('STUDENT')}
            className={`flex-1 py-3 rounded-[10px] text-xs font-bold tracking-widest uppercase transition-all duration-300 ${userType === 'STUDENT'
              ? 'bg-white text-brand-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setUserType('COLLEGE')}
            className={`flex-1 py-3 rounded-[10px] text-xs font-bold tracking-widest uppercase transition-all duration-300 ${userType === 'COLLEGE'
              ? 'bg-white text-brand-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            College
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-premium"
              placeholder="name@example.com"
              required
            />
          </div>

          {userType === 'COLLEGE' && (
            <div className="animate-fadeIn">
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Institution Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="input-premium"
                placeholder="https://www.college.edu"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Secure Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-premium"
              placeholder="••••••••"
              minLength={6}
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
            ) : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Already a member?{' '}
            <Link to="/login" className="text-brand-600 font-bold hover:text-brand-700 transition-colors">
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

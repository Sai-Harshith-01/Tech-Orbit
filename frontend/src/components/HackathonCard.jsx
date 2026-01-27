import { useState } from 'react';
import toast from 'react-hot-toast';
import { hackathonService } from '../services/hackathonService';

const HackathonCard = ({ hackathon, onRegister }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await hackathonService.registerForHackathon(hackathon.id);
      toast.success(
        (t) => (
          <span>
            <b>Registration Successful!</b>
            <br />
            Your Unique Code: <strong className="text-blue-600">{response.unique_code}</strong>
            <br />
            Please save this code for verification.
          </span>
        ),
        { duration: 6000 }
      );
      if (onRegister) onRegister();
    } catch (error) {
      toast.error('Registration failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-card flex flex-col h-full group">
      {/* Hackathon Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`http://127.0.0.1:8000/${hackathon.hackathon_image_url}`}
          alt={hackathon.hackathon_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm backdrop-blur-md ${hackathon.status === 'UPCOMING' ? 'bg-blue-500/90 text-white' :
              hackathon.status === 'ONGOING' ? 'bg-emerald-500/90 text-white' :
                'bg-slate-500/90 text-white'
            }`}>
            {hackathon.status}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Hackathon Name */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors">
          {hackathon.hackathon_name}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {hackathon.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Schedule</span>
            <div className="flex items-center text-slate-700 text-xs font-medium">
              <span className="mr-1.5 opacity-70">📅</span>
              {hackathon.start_date.split('-').slice(1).join('/')}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Availability</span>
            <div className={`flex items-center text-xs font-bold ${hackathon.remaining_slots > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              <span className="mr-1.5 opacity-70">👥</span>
              {hackathon.remaining_slots} slots
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="mt-auto pt-6 border-t border-slate-100/50">
          {hackathon.remaining_slots > 0 ? (
            <button
              onClick={handleRegister}
              disabled={loading}
              className="btn-premium w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : '🎯 Register Now'}
            </button>
          ) : (
            <button disabled className="w-full bg-slate-100 text-slate-400 py-3 rounded-premium font-bold text-sm cursor-not-allowed">
              Registration Closed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;

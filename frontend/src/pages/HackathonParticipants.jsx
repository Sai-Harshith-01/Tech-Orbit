import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import hackathonService from '../services/hackathonService';

const HackathonParticipants = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadParticipants();
  }, [id]);

  const loadParticipants = async () => {
    try {
      const data = await hackathonService.getHackathonRegistrations(id);
      setParticipants(data);
    } catch (error) {
      toast.error('Failed to load participants');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (registrationId, status) => {
      setVerifyingId(registrationId);
      try {
        await hackathonService.verifyRegistration(registrationId, status);
        toast.success(`Registration ${status.toLowerCase()} successfully`);
        loadParticipants();
      } catch (error) {
        const msg = error.response?.data?.detail || error.message || 'Verification failed';
        toast.error(typeof msg === 'string' ? msg : JSON.stringify(msg));
        console.error('Verification error:', error.response?.data || error);
      } finally {
        setVerifyingId(null);
      }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <header className="flex justify-between items-center mb-10">
          <div>
            <button 
              onClick={() => navigate('/college/dashboard')}
              className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 mb-2 text-sm font-medium"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-slate-900">Event <span className="text-brand-600">Roster</span></h1>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 bg-white/30 backdrop-blur-sm rounded-card border border-white/50">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600 font-medium">Fetching participant data...</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Student</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Payment Proof</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {participants.length > 0 ? participants.map((p) => (
                    <tr key={p.registration_id} className={`transition-colors ${p.status === 'PENDING_VERIFICATION' ? 'bg-amber-50/50 hover:bg-amber-100/50 border-l-4 border-amber-400' : 'hover:bg-slate-50/50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{p.student_email}</span>
                          <span className="text-[10px] text-slate-400 font-mono tracking-tighter">ID: {p.student_id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {p.payment_proof_url ? (
                          <a 
                            href={`http://127.0.0.1:8000/${p.payment_proof_url}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1.5 rounded-xl border border-brand-100 transition-all"
                          >
                            👁️ View Proof
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {p.transaction_id || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          p.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                          p.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {p.status === 'PENDING_VERIFICATION' ? (
                          <div className="flex justify-end gap-2">
                            <button
                              disabled={verifyingId !== null}
                              onClick={() => handleVerify(p.registration_id, 'APPROVED')}
                              className="bg-emerald-500 text-white p-2 rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all text-xs font-bold"
                            >
                              Approve
                            </button>
                            <button
                              disabled={verifyingId !== null}
                              onClick={() => handleVerify(p.registration_id, 'REJECTED')}
                              className="bg-red-500 text-white p-2 rounded-xl shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all text-xs font-bold"
                            >
                              Reject
                            </button>
                          </div>
                        ) : p.status === 'APPROVED' ? (
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Pass Code</span>
                            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded border border-brand-100">{p.unique_code}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium italic">Verification Resolved</span>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-4xl mb-4">📭</span>
                          <p className="text-slate-500">No registrations found for this event.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HackathonParticipants;

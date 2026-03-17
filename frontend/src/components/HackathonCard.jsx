import { useState } from 'react';
import toast from 'react-hot-toast';
import { hackathonService } from '../services/hackathonService';

const HackathonCard = ({ hackathon, onRegister, registration }) => {
  const [loading, setLoading] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [transactionId, setTransactionId] = useState('');

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    
    if (hackathon.is_paid && !showPaymentModal) {
      setShowPaymentModal(true);
      return;
    }

    setLoading(true);
    try {
      let response;
      if (hackathon.is_paid) {
        if (!paymentProof) {
          toast.error('Please upload payment proof');
          setLoading(false);
          return;
        }
        const data = new FormData();
        data.append('payment_proof_image', paymentProof);
        if (transactionId) data.append('transaction_id', transactionId);
        response = await hackathonService.registerForHackathon(hackathon.id, data);
      } else {
        response = await hackathonService.registerForHackathon(hackathon.id);
      }

      if (response.status === 'PENDING_VERIFICATION') {
        toast.success('Registration request sent! Please wait for college approval.', { duration: 5000 });
        setShowPaymentModal(false);
      } else {
        toast.success(
          (t) => (
            <span>
              <b>Registration Successful!</b>
              <br />
              Code: <strong className="text-blue-600">{response.unique_code}</strong>
              <br />
              Save this code for verification.
            </span>
          ),
          { duration: 6000 }
        );
      }
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
        <div className="absolute top-4 right-4 z-10">
          <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-[0.15em] uppercase shadow-lg border border-white/20 ${hackathon.status === 'UPCOMING' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' :
              hackathon.status === 'ONGOING' ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white' :
                'bg-gradient-to-r from-slate-600 to-slate-500 text-white'
            }`}>
            {hackathon.status}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-4 py-2 rounded-xl text-[11px] font-black tracking-tight shadow-xl border-2 border-white/40 flex items-center gap-1.5 leading-none ${hackathon.is_paid ? 'bg-indigo-600 text-white' : 'bg-emerald-500 text-white'}`}>
            {hackathon.is_paid ? (
              <>
                <span className="opacity-80">ENTRY:</span>
                <span className="text-[13px]">₹{hackathon.entry_fee}</span>
              </>
            ) : (
              <>
                <span className="opacity-80">ENTRY:</span>
                <span className="text-[13px] tracking-widest">FREE</span>
              </>
            )}
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

        {/* Location & College Details */}
        <div className="space-y-3 mb-8 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5">🏫</span>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Host Institution</p>
              <p className="text-xs font-bold text-slate-700">{hackathon.college_name}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5">📍</span>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Venue</p>
              <p className="text-[11px] text-slate-600 leading-tight mb-2">{hackathon.college_address}</p>
              <a 
                href={hackathon.google_map_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold text-brand-600 hover:text-brand-700 transition-colors bg-brand-50 px-2 py-1 rounded-lg"
              >
                🛰️ Open in Maps
              </a>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="mt-auto pt-6 border-t border-slate-100/50">
          {registration ? (
            <div className="flex flex-col gap-3">
              {registration.registration_status === 'APPROVED' ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-premium p-4 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">✅ Registered</span>
                  <p className="text-xs font-bold text-slate-700">Code: <span className="text-emerald-600 font-mono tracking-widest text-lg">{registration.unique_code}</span></p>
                </div>
              ) : registration.registration_status === 'PENDING_VERIFICATION' ? (
                <div className="bg-amber-50 border border-amber-100 rounded-premium p-4 flex flex-col items-center animate-pulse">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">⏳ Verification Pending</span>
                  <p className="text-[11px] text-amber-700 text-center font-medium">Wait for college approval to get your code.</p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-100 rounded-premium p-4 flex flex-col items-center">
                   <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">❌ Payment Rejected</span>
                   <p className="text-[11px] text-red-700 text-center">Contact host institution for details.</p>
                </div>
              )}
            </div>
          ) : hackathon.remaining_slots > 0 ? (
            <button
              onClick={handleRegister}
              disabled={loading}
              className="btn-premium w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : `🎯 ${hackathon.is_paid ? 'Pay & Register' : 'Register Now'}`}
            </button>
          ) : (
            <button disabled className="w-full bg-slate-100 text-slate-400 py-3 rounded-premium font-bold text-sm cursor-not-allowed">
              Registration Closed
            </button>
          )}
        </div>
      </div>
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Finalize Registration</h3>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-slate-500 mb-6">Scan the QR code below to pay <span className="font-bold text-slate-900">₹{hackathon.entry_fee}</span> to the hosting college.</p>
                <div className="relative mx-auto w-56 h-56 p-4 bg-white rounded-2xl border-4 border-indigo-50 shadow-inner">
                  <img 
                    src={`http://127.0.0.1:8000/${hackathon.upi_qr_image_url}`} 
                    className="w-full h-full object-contain"
                    alt="Merchant QR"
                  />
                  <div className="absolute -top-3 -right-3 bg-brand-500 text-white p-2 rounded-full shadow-lg">
                    <span className="text-sm">🛡️</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Transaction ID / Reference Number</label>
                  <input 
                    type="text" 
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. 1234567890"
                    className="input-premium w-full"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Upload Payment Screenshot <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setPaymentProof(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      required
                    />
                    <div className="input-premium py-4 flex flex-col items-center justify-center border-dashed border-2 group-hover:border-indigo-300 transition-all">
                      <span className="text-2xl mb-1">📸</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {paymentProof ? paymentProof.name : 'Choose Screenshot'}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleRegister}
                  disabled={loading}
                  className="btn-premium w-full flex items-center justify-center gap-2 py-4"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : '✅ Submit for Verification'}
                </button>
                <p className="text-center text-[10px] text-slate-400">
                  By clicking submit, you confirm that the payment has been made.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonCard;

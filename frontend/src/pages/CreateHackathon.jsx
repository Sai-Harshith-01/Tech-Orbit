import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import hackathonService from '../services/hackathonService';

const CreateHackathon = () => {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
  hackathon_name: '',
  description: '',
  max_participants: '',
  start_date: '',
  end_date: '',
 });
 const [hackathonImage, setHackathonImage] = useState(null);
 const [paymentQrImage, setPaymentQrImage] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!hackathonImage || !paymentQrImage) {
   setError('Please upload both images');
   return;
  }

  setError('');
  setLoading(true);

  try {
   const data = new FormData();
   data.append('hackathon_name', formData.hackathon_name);
   data.append('description', formData.description);
   data.append('max_participants', formData.max_participants);
   data.append('start_date', formData.start_date);
   data.append('end_date', formData.end_date);
   data.append('hackathon_image', hackathonImage);
   data.append('payment_qr_image', paymentQrImage);

   await hackathonService.createHackathon(data);
   toast.success('Hackathon created successfully!');
   navigate('/college/dashboard');
  } catch (err) {
   const errorMsg = err.response?.data?.detail || 'Failed to create hackathon';
   setError(errorMsg);
   toast.error(errorMsg);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen pb-12">
   <Navbar />

   <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-zoomIn">
    {/* Header Section */}
    <header className="mb-10 flex items-center justify-between">
     <div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
       Create <span className="text-brand-600">Hackathon</span>
      </h1>
      <p className="text-slate-500 mt-1">Configure your event and attract participants.</p>
     </div>
     <button
      onClick={() => navigate('/college/dashboard')}
      className="text-slate-400 hover:text-slate-600 font-bold text-sm uppercase tracking-widest transition-colors"
     >
      ← Back
     </button>
    </header>

    {error && (
     <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-premium text-sm font-bold mb-8 flex items-center gap-3 shadow-sm">
      <span className="text-lg">⚠️</span> {error}
     </div>
    )}

    <div className="glass-panel p-8 md:p-12 shadow-2xl relative overflow-hidden">
     {/* Simple decoration */}
     <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

     <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
      {/* Core Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="md:col-span-2">
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Event Master Title</label>
        <input
         type="text"
         name="hackathon_name"
         value={formData.hackathon_name}
         onChange={handleChange}
         className="input-premium"
         placeholder="e.g. AI Innovation Summit 2025"
         required
        />
       </div>

       <div className="md:col-span-2">
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Event Description & Vision</label>
        <textarea
         name="description"
         value={formData.description}
         onChange={handleChange}
         className="input-premium h-40 resize-none leading-relaxed"
         placeholder="What makes this hackathon unique? Define the challenge, prizes, and expectations."
         required
        />
       </div>

       <div>
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Participant Capacity</label>
        <div className="relative">
         <input
          type="number"
          name="max_participants"
          value={formData.max_participants}
          onChange={handleChange}
          className="input-premium pl-12"
          placeholder="250"
          min="1"
          required
         />
         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50">👥</span>
        </div>
       </div>

       <div>
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Timeline (Start → End)</label>
        <div className="flex items-center gap-2">
         <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="input-premium text-sm"
          required
         />
         <span className="text-slate-300">→</span>
         <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="input-premium text-sm"
          required
         />
        </div>
       </div>
      </div>

      <hr className="border-slate-100" />

      {/* Media Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div>
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Primary Banner Artwork</label>
        <div className="relative group">
         <input
          type="file"
          accept="image/*"
          onChange={(e) => setHackathonImage(e.target.files[0])}
          className="input-premium opacity-0 absolute inset-0 cursor-pointer z-20"
          required
         />
         <div className="input-premium flex flex-col items-center justify-center py-10 border-dashed border-2 group-hover:border-brand-300 transition-all bg-slate-50/50">
          <span className="text-3xl mb-2">🖼️</span>
          <span className="text-xs font-bold text-slate-500 uppercase">
           {hackathonImage ? hackathonImage.name : 'Upload Event Banner'}
          </span>
          <span className="text-[10px] text-slate-400 mt-1">Recommended: 1200x600px</span>
         </div>
        </div>
       </div>

       <div>
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Payment Gateway QR</label>
        <div className="relative group">
         <input
          type="file"
          accept="image/*"
          onChange={(e) => setPaymentQrImage(e.target.files[0])}
          className="input-premium opacity-0 absolute inset-0 cursor-pointer z-20"
          required
         />
         <div className="input-premium flex flex-col items-center justify-center py-10 border-dashed border-2 group-hover:border-indigo-300 transition-all bg-slate-50/50">
          <span className="text-3xl mb-2">📱</span>
          <span className="text-xs font-bold text-slate-500 uppercase">
           {paymentQrImage ? paymentQrImage.name : 'Upload Merchant QR'}
          </span>
          <span className="text-[10px] text-slate-400 mt-1">Clear high-res scan required</span>
         </div>
        </div>
       </div>
      </div>

      {/* Submit Action */}
      <div className="pt-6">
       <button
        type="submit"
        disabled={loading}
        className="btn-premium w-full py-5 text-lg flex items-center justify-center gap-3 shadow-2xl transition-all hover:-translate-y-1 active:scale-[0.98]"
       >
        {loading ? (
         <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
         <>🚀 Publish Hackathon</>
        )}
       </button>
      </div>
     </form>
    </div>
   </main>
  </div>
 );
};

export default CreateHackathon;

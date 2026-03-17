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
  college_name: '',
  college_address: '',
  google_map_link: '',
  is_paid: false,
  entry_fee: '',
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

  if (!hackathonImage || (formData.is_paid && !paymentQrImage)) {
   setError(`Please upload ${!hackathonImage ? 'banner' : 'payment QR'}`);
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
   data.append('college_name', formData.college_name);
   data.append('college_address', formData.college_address);
   data.append('google_map_link', formData.google_map_link);
   data.append('is_paid', formData.is_paid);
   data.append('entry_fee', formData.is_paid ? formData.entry_fee : 0);
   data.append('hackathon_image', hackathonImage);
   if (formData.is_paid && paymentQrImage) {
    data.append('payment_qr_image', paymentQrImage);
   }

   await hackathonService.createHackathon(data);
   toast.success('Event created successfully!');
   navigate('/college/dashboard');
  } catch (err) {
   const errorMsg = err.response?.data?.detail || 'Failed to create event';
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
       Create <span className="text-brand-600">Event</span>
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

       {/* New College Details Section */}
       <div className="md:col-span-2">
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Hosting College Name</label>
        <div className="relative">
         <input
          type="text"
          name="college_name"
          value={formData.college_name}
          onChange={handleChange}
          className="input-premium pl-12"
          placeholder="e.g. Stanford University of Technology"
          required
         />
         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50">🏫</span>
        </div>
       </div>

       <div className="md:col-span-2">
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Campus Address</label>
        <div className="relative">
         <input
          type="text"
          name="college_address"
          value={formData.college_address}
          onChange={handleChange}
          className="input-premium pl-12"
          placeholder="e.g. 123 Education Square, Tech City"
          required
         />
         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50">📍</span>
        </div>
       </div>

       <div className="md:col-span-2">
        <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Google Maps Location Link</label>
        <div className="relative">
         <input
          type="url"
          name="google_map_link"
          value={formData.google_map_link}
          onChange={handleChange}
          className="input-premium pl-12"
          placeholder="Paste Google Maps URL here"
          required
         />
         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50">🧭</span>
        </div>
       </div>
      </div>

      <hr className="border-slate-100" />

      {/* Media Uploads */}
      {/* Financial & Media Assets */}
      <div className="space-y-10">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner Upload */}
        <div className="md:col-span-1">
         <label className="block text-slate-700 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Event Banner Artwork</label>
         <div className="relative group rounded-3xl overflow-hidden h-full min-h-[160px]">
          <input
           type="file"
           accept="image/*"
           onChange={(e) => setHackathonImage(e.target.files[0])}
           className="opacity-0 absolute inset-0 cursor-pointer z-20"
           required
          />
          <div className="h-full flex flex-col items-center justify-center py-10 border-dashed border-2 border-slate-200 group-hover:border-brand-300 transition-all bg-slate-50 relative">
           <span className="text-3xl mb-2">🖼️</span>
           <span className="text-xs font-bold text-slate-700 uppercase">
            {hackathonImage ? hackathonImage.name : 'Upload Event Banner'}
           </span>
           <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">Recommended: 1200x600px</span>
          </div>
         </div>
        </div>

        {/* Entry Protocol Selection */}
        <div className="md:col-span-1 bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner flex flex-col justify-center">
         <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-1">Entry Protocol</p>
         <div className="flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm w-full">
          <button
           type="button"
           onClick={() => setFormData({ ...formData, is_paid: false })}
           className={`flex-1 py-3 rounded-xl text-xs font-black transition-all duration-300 ${!formData.is_paid ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
           FREE ACCESS
          </button>
          <button
           type="button"
           onClick={() => setFormData({ ...formData, is_paid: true })}
           className={`flex-1 py-3 rounded-xl text-xs font-black transition-all duration-300 ${formData.is_paid ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
           PAID ENTRY
          </button>
         </div>
        </div>
       </div>

       {/* Conditional Fee and QR Upload */}
       <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ${formData.is_paid ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute w-0 h-0 overflow-hidden'}`}>
        <div>
         <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Registration Fee (INR)</p>
         <div className="relative">
          <input
           type="number"
           name="entry_fee"
           value={formData.entry_fee}
           onChange={handleChange}
           className="input-premium pl-12 py-4 shadow-sm"
           placeholder="0.00"
           required={formData.is_paid}
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">₹</span>
         </div>
        </div>

        <div>
         <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Payment Gateway QR</p>
         <div className="relative group overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 hover:border-indigo-300 bg-slate-50 transition-all">
          <input
           type="file"
           accept="image/*"
           onChange={(e) => setPaymentQrImage(e.target.files[0])}
           className="opacity-0 absolute inset-0 cursor-pointer z-20"
           required={formData.is_paid}
          />
          <div className="flex items-center gap-4 p-4 min-h-[82px] group-hover:bg-indigo-50/50 transition-colors">
           <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">📱</div>
           <div className="flex-1 overflow-hidden">
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest truncate">
             {paymentQrImage ? paymentQrImage.name : 'Click to Upload QR Image'}
            </p>
            <p className="text-[9px] text-slate-400 uppercase tracking-tighter">Mandatory for paid events</p>
           </div>
          </div>
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
         <>🚀 Publish Event</>
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

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import ConfirmModal from '../components/ConfirmModal';
import adminService from '../services/adminService';

const ApproveColleges = () => {
 const [colleges, setColleges] = useState([]);
 const [loading, setLoading] = useState(true);
 const [rejectModal, setRejectModal] = useState({ isOpen: false, collegeId: null });

 useEffect(() => {
  fetchPendingColleges();
 }, []);

 const fetchPendingColleges = async () => {
  try {
   const data = await adminService.getPendingColleges();
   setColleges(data);
  } catch (error) {
   console.error('Failed to fetch colleges:', error);
  } finally {
   setLoading(false);
  }
 };

 const handleApprove = async (collegeId) => {
  try {
   await adminService.approveCollege(collegeId);
   toast.success('College approved successfully!');
   fetchPendingColleges();
  } catch (error) {
   toast.error('Failed to approve: ' + (error.response?.data?.detail || error.message));
  }
 };

 const handleReject = (collegeId) => {
  setRejectModal({ isOpen: true, collegeId });
 };

 const confirmReject = async () => {
  try {
   await adminService.rejectCollege(rejectModal.collegeId);
   toast.success('College rejected');
   fetchPendingColleges();
  } catch (error) {
   toast.error('Failed to reject: ' + (error.response?.data?.detail || error.message));
  } finally {
   setRejectModal({ isOpen: false, collegeId: null });
  }
 };

 return (
  <div className="min-h-screen pb-12">
   <Navbar />

   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-zoomIn">
    {/* Header Section */}
    <header className="mb-10">
     <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
      Institutional <span className="text-brand-600">Verification</span>
     </h1>
     <p className="text-slate-500 mt-1">Review and manage college access credentials.</p>
    </header>

    {loading ? (
     <div className="flex flex-col justify-center items-center py-20 bg-white/30 backdrop-blur-sm rounded-card border border-white/50">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-medium">Validating credentials...</p>
     </div>
    ) : (
     <div className="space-y-8">
      {colleges.length === 0 ? (
       <div className="premium-card py-20 text-center text-slate-500 flex flex-col items-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl mb-4">
         ✅
        </div>
        <p className="text-xl font-bold text-slate-700">Verification Queue Clear</p>
        <p className="mt-2 text-slate-500 max-w-md mx-auto">
         All institutions have been reviewed. Excellent work maintenance!
        </p>
       </div>
      ) : (
       <section className="premium-card p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
         <h2 className="text-lg font-bold text-slate-800">Pending Requests</h2>
         <span className="text-[10px] font-bold text-brand-600 bg-brand-50 border border-brand-100 px-2 py-1 rounded">
          {colleges.length} Application{colleges.length > 1 ? 's' : ''}
         </span>
        </div>
        <div className="overflow-x-auto">
         <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/80 backdrop-blur-sm">
           <tr>
            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institution Email</th>
            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Website URI</th>
            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
           </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
           {colleges.map((college) => (
            <tr key={college.id} className="hover:bg-slate-50 transition-colors duration-200 group">
             <td className="px-6 py-5 font-semibold text-slate-700">{college.email}</td>
             <td className="px-6 py-5">
              <a
               href={college.website}
               target="_blank"
               rel="noopener noreferrer"
               className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1.5"
              >
               <span>🔗</span> {college.website.replace(/^https?:\/\//, '')}
              </a>
             </td>
             <td className="px-6 py-5">
              <div className="flex justify-center gap-3">
               <button
                onClick={() => handleApprove(college.id)}
                className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-premium text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all duration-300"
               >
                ✓ Approve
               </button>
               <button
                onClick={() => handleReject(college.id)}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-premium text-xs font-bold hover:bg-red-600 hover:text-white transition-all duration-300"
               >
                ✗ Reject
               </button>
              </div>
             </td>
            </tr>
           ))}
          </tbody>
         </table>
        </div>
       </section>
      )}
     </div>
    )}
   </main>

   <ConfirmModal
    isOpen={rejectModal.isOpen}
    onClose={() => setRejectModal({ ...rejectModal, isOpen: false })}
    onConfirm={confirmReject}
    title="Revoke Application"
    message="Are you sure you want to reject this institution? This action will prevent portal access."
    confirmText="Revoke Access"
    type="danger"
   />
  </div>
 );
};

export default ApproveColleges;

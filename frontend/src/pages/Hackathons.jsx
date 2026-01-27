import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HackathonCard from '../components/HackathonCard';
import hackathonService from '../services/hackathonService';

const Hackathons = () => {
 const [hackathons, setHackathons] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchHackathons();
 }, []);

 const fetchHackathons = async () => {
  try {
   const data = await hackathonService.getAllHackathons();
   setHackathons(data);
  } catch (error) {
   console.error('Failed to fetch hackathons:', error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen pb-12">
   <Navbar />

   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-zoomIn">
    {/* Header Section */}
    <header className="mb-10">
     <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
      🏆 Available <span className="text-brand-600">Hackathons</span>
     </h1>
     <p className="text-slate-500 mt-1">Discover opportunities to build, compete, and win.</p>
    </header>

    {loading ? (
     <div className="flex flex-col justify-center items-center py-20 bg-white/30 backdrop-blur-sm rounded-card border border-white/50">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-medium">Fetching opportunities...</p>
     </div>
    ) : (
     <>
      {hackathons.length > 0 ? (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hackathons.map((hackathon) => (
         <HackathonCard
          key={hackathon.id}
          hackathon={hackathon}
          onRegister={fetchHackathons}
         />
        ))}
       </div>
      ) : (
       <div className="premium-card py-20 text-center text-slate-500 flex flex-col items-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl mb-4">
         🏆
        </div>
        <p className="text-xl font-bold text-slate-700">No hackathons live yet</p>
        <p className="mt-2 text-slate-500 max-w-md mx-auto">
         We're currently preparing some exciting challenges. Please check back soon!
        </p>
       </div>
      )}
     </>
    )}
   </main>
  </div>
 );
};

export default Hackathons;

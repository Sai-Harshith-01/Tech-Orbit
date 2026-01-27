import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import ConfirmModal from '../components/ConfirmModal';
import hackathonService from '../services/hackathonService';

const CollegeDashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadHackathons();
  }, []);

  const loadHackathons = async () => {
    try {
      const [hackathonsData, statsData] = await Promise.all([
        hackathonService.getCollegeHackathons(),
        hackathonService.getCollegeStats()
      ]);
      setHackathons(hackathonsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (hackathonId, hackathonName) => {
    setDeleteModal({ isOpen: true, id: hackathonId, name: hackathonName });
  };

  const confirmDelete = async () => {
    try {
      await hackathonService.deleteHackathon(deleteModal.id);
      toast.success('Hackathon deleted successfully');
      loadHackathons();
      setDeleteModal({ isOpen: false, id: null, name: '' });
    } catch (error) {
      toast.error('Failed to delete: ' + (error.response?.data?.detail || error.message));
      setDeleteModal({ isOpen: false, id: null, name: '' });
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-zoomIn">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              College <span className="text-brand-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 mt-1">Manage institutional events and track student engagement.</p>
          </div>
          <button
            onClick={() => navigate('/college/create-hackathon')}
            className="btn-premium flex items-center gap-2"
          >
            <span className="text-xl">➕</span> Create Hackathon
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 bg-white/30 backdrop-blur-sm rounded-card border border-white/50">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600 font-medium">Synchronizing portal data...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Stats Section */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StatsCard
                  title="Active Hackathons"
                  value={stats.total_hackathons}
                  icon="🏆"
                  color="purple"
                />
                <StatsCard
                  title="Total Registrations"
                  value={stats.total_students_registered}
                  icon="👥"
                  color="blue"
                />
              </div>
            )}

            {/* Hackathons Grid */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-brand-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-800 text-center md:text-left">Event Management</h2>
              </div>

              {hackathons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {hackathons.map((hackathon) => (
                    <div key={hackathon.id} className="premium-card flex flex-col h-full group overflow-hidden">
                      {/* Banner Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={`http://127.0.0.1:8000${hackathon.hackathon_image_url}`}
                          alt={hackathon.hackathon_name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1504384308090-c89eecaaad73?auto=format&fit=crop&q=80&w=400';
                          }}
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm backdrop-blur-md ${hackathon.status === 'UPCOMING' ? 'bg-blue-500/90 text-white' :
                            hackathon.status === 'ONGOING' ? 'bg-emerald-500/90 text-white' :
                              'bg-slate-500/90 text-white'
                            }`}>
                            {hackathon.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-1 group-hover:text-brand-600 transition-colors">
                          {hackathon.hackathon_name}
                        </h3>

                        {/* Progress Section */}
                        <div className="bg-slate-50 border border-slate-100 rounded-premium p-4 mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-tighter">Registration Fill</span>
                            <span className="text-sm font-bold text-brand-600">
                              {hackathon.total_registered_students} <span className="text-slate-400 font-medium">/ {hackathon.max_participants}</span>
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-brand-500 h-full rounded-full transition-all duration-700"
                              style={{ width: `${Math.min((hackathon.total_registered_students / hackathon.max_participants) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Grid */}
                        <div className="grid grid-cols-1 gap-3 mt-auto">
                          <Link
                            to={`/college/hackathons/${hackathon.id}/participants`}
                            className="bg-brand-50 text-brand-600 py-2.5 rounded-premium text-sm font-bold text-center hover:bg-brand-100 transition-all flex items-center justify-center gap-2"
                          >
                            👁️ View Roster
                          </Link>
                          <button
                            onClick={() => handleDelete(hackathon.id, hackathon.hackathon_name)}
                            className="text-red-500 py-2 text-sm font-semibold hover:text-red-700 transition-all"
                          >
                            🗑️ Delete Event
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="premium-card py-24 text-center text-slate-500 flex flex-col items-center border-dashed border-2">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                    🚀
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Launch Your First Event</h3>
                  <p className="text-slate-500 max-w-sm px-4">
                    Ready to discover talent? Create a hackathon to start receiving registrations from students.
                  </p>
                  <button
                    onClick={() => navigate('/college/create-hackathon')}
                    className="mt-8 btn-premium"
                  >
                    Quick Start
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={confirmDelete}
        title="Delete Hackathon"
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default CollegeDashboard;

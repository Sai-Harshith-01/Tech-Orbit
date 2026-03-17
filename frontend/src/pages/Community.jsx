import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://ideawaves-frontend-ten.vercel.app/";
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    window.location.href = "https://ideawaves-frontend-ten.vercel.app/";
  };

  return (
    <div className="min-h-screen bg-[#030612] flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)] border border-white/10 bg-black">
        <video 
          autoPlay 
          muted 
          playsInline
          className="w-full h-full object-contain"
          onEnded={handleVideoEnd}
        >
          <source src="/video/ideawavesintro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute bottom-8 right-8">
          <button 
            onClick={handleVideoEnd}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/70 text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 transition-all"
          >
            Skip Intro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;

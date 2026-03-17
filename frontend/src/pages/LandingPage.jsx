import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
 Rocket,
 Newspaper,
 BookOpen,
 Trophy,
 Cpu,
 Shield,
 Globe,
 Code,
 MessageSquare,
 ArrowRight,
 Sparkles,
 Zap,
 Users,
 Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
 const { scrollYProgress } = useScroll();
 const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
 });

 const { scrollY } = useScroll();
 const y1 = useTransform(scrollY, [0, 500], [0, 200]);
 const opacity = useTransform(scrollY, [0, 400], [1, 0]);
 const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
 const heroRotate = useTransform(scrollY, [0, 500], [0, 5]);

 return (
  <div className="min-h-screen space-theme overflow-hidden selection:bg-orbit-accent/30">
   {/* Scroll Progress Bar */}
   <motion.div
    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orbit-accent via-orbit-glow to-orbit-purple z-[100] origin-left"
    style={{ scaleX }}
   />
   {/* Decorative Background Elements */}
   <div className="fixed inset-0 pointer-events-none">
    <div className="orbit-glow w-[500px] h-[500px] -top-48 -left-48 bg-orbit-accent/20" />
    <div className="orbit-glow w-[600px] h-[600px] top-1/2 -right-48 bg-orbit-purple/10" />
    <div className="orbit-glow w-[400px] h-[400px] bottom-0 left-1/4 bg-orbit-glow/10" />
   </div>

   {/* Navbar */}
   <nav className="fixed top-0 w-full z-50 px-6 py-4 nav-blur">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
     <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gradient-to-br from-orbit-accent to-orbit-purple rounded-xl flex items-center justify-center shadow-neon-blue">
       <Globe className="text-white w-6 h-6" />
      </div>
       <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
        Tech<span className="text-orbit-accent">Orbit</span>
       </span>
     </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
       <a href="#news" className="hover:text-orbit-accent transition-colors">News</a>
       <a href="#articles" className="hover:text-orbit-accent transition-colors">Articles</a>
       <a href="#hackathons" className="hover:text-orbit-accent transition-colors">Hackathons</a>
       <a href="#orbiton" className="hover:text-orbit-accent transition-colors">Orbiton AI</a>
      </div>
     <div className="flex gap-4 items-center">
       <Link to="/login" className="text-white hover:text-orbit-accent px-4 py-2 transition-colors">Login</Link>
      <Link to="/register" className="btn-orbit-primary hidden sm:block">Join Now</Link>
     </div>
    </div>
   </nav>

   {/* Hero Section */}
   <section className="relative pt-40 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-start text-left">
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8 }}
     className="relative z-10"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orbit-glow text-sm font-medium mb-6">
       <Sparkles className="w-4 h-4" />
       <span>Redefining Student Tech Ecosystem</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase italic max-w-4xl">
       Your Daily <span className="text-gradient-space text-shadow-neon">Orbit</span> <br />
       <span className="text-white/90">Knowledge & Innovation</span>
      </h1>
      <p className="text-lg md:text-xl text-white/50 max-w-xl mb-12 leading-relaxed">
       Connect with colleges, master tech trends, and showcase your skills through
       curated articles and national-level hackathons.
      </p>
     <div className="flex flex-col sm:flex-row gap-6 justify-start w-full sm:w-auto">
      <Link to="/register" className="btn-orbit-primary flex items-center gap-3 justify-center px-10">
       Explore TechOrbit <ArrowRight className="w-5 h-5" />
      </Link>
      <Link to="/student/hackathons" className="btn-orbit-secondary flex items-center gap-3 justify-center px-10">
       View Hackathons <Trophy className="w-5 h-5" />
      </Link>
     </div>
    </motion.div>

    {/* Hero Illustration */}
    <motion.div
      style={{ scale: heroScale, rotate: heroRotate }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
      className="mt-24 relative w-full max-w-6xl aspect-[21/9] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl group"
    >
      <div className="absolute inset-0 bg-orbit-accent/5 mix-blend-overlay group-hover:bg-orbit-accent/10 transition-colors duration-700" />
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
        alt="Space Tech"
        className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2s]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-orbit-background via-orbit-background/20 to-transparent" />

      {/* Animated Orbiting Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-[80%] h-[80%] border border-white/10 rounded-full absolute"
        >
          <div className="w-14 h-14 bg-orbit-accent rounded-2xl absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center shadow-neon-blue rotate-45">
            <Code className="text-white w-7 h-7 -rotate-45" />
          </div>
        </motion.div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="w-[110%] h-[110%] border border-white/5 rounded-full absolute"
        >
          <div className="w-12 h-12 bg-orbit-purple rounded-full absolute top-1/2 -right-6 -translate-y-1/2 flex items-center justify-center shadow-neon-purple animate-pulse">
            <Rocket className="text-white w-6 h-6" />
          </div>
        </motion.div>
      </div>
    </motion.div>
   </section>

   {/* Daily Tech News */}
   <section id="news" className="py-32 px-6 max-w-7xl mx-auto relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-orbit-accent to-transparent opacity-30" />
    
    <div className="flex flex-col items-start text-left mb-20">
     <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-orbit-accent text-sm font-bold tracking-[0.3em] uppercase mb-4"
     >
      Intelligence Feed
     </motion.div>
     <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Daily Tech <span className="text-gradient-space">Pulse</span></h2>
     <p className="text-white/50 max-w-2xl text-lg">Stay ahead of the curve with our curated stream of tech intelligence, synchronized from the global tech orbit.</p>
    </div>

    {/* Ticker */}
    <div className="mb-16 overflow-hidden py-4 border-y border-white/5 bg-white/[0.02]">
     <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex gap-12 whitespace-nowrap text-xs font-mono text-orbit-accent/60"
     >
      {[
       "SYSTEM STATUS: ALL ORBITS GO", "NEW HACKATHON ADDED: STANFORD AI 2024", "TECH TREND: QUANTUM COMPUTING IN JS", 
       "COMMUNITY UPDATE: 5,000+ ARTICLES PUBLISHED", "ORBITON AI: VERSION 2.1 ONLINE", "MISSION OBJECTIVE: MASTER THE STACK",
       "SYSTEM STATUS: ALL ORBITS GO", "NEW HACKATHON ADDED: STANFORD AI 2024", "TECH TREND: QUANTUM COMPUTING IN JS"
      ].map((text, i) => (
       <div key={i} className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-orbit-accent animate-pulse" />
        {text}
       </div>
      ))}
     </motion.div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
     {[
      { icon: <Cpu />, title: "AI & ML", desc: "Neural networks, LLM architectures and generative intelligence.", color: "blue" },
      { icon: <Shield />, title: "Cybersecurity", desc: "Zero-trust protocols and quantum-resistant encryption.", color: "purple" },
      { icon: <Globe />, title: "Web Tech", desc: "Next-gen frameworks and decentralized web architectures.", color: "blue" },
      { icon: <Zap />, title: "Emerging Tech", desc: "Robotics, IoT and future hardware breakthroughs.", color: "purple" }
     ].map((item, idx) => (
      <motion.div
       key={idx}
       whileHover={{ y: -15, scale: 1.02 }}
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ delay: idx * 0.1 }}
       className="glass-card p-10 flex flex-col items-start group relative overflow-hidden"
      >
       <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent -rotate-45 translate-x-12 -translate-y-12" />
       <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${item.color === 'blue' ? 'bg-orbit-accent/20 text-orbit-accent shadow-neon-blue' : 'bg-orbit-purple/20 text-orbit-purple shadow-neon-purple'}`}>
        {React.cloneElement(item.icon, { className: "w-7 h-7" })}
       </div>
       <h3 className="text-2xl font-bold mb-3 group-hover:text-orbit-accent transition-colors">{item.title}</h3>
       <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
       <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-orbit-accent transition-colors">
        View Stream <ArrowRight className="w-3 h-3" />
       </div>
      </motion.div>
     ))}
    </div>
   </section>

   {/* Articles & Communication */}
   <section id="articles" className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orbit-purple/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
     <div className="order-2 lg:order-1 relative">
      <motion.div 
       initial={{ rotate: -5, x: -20, opacity: 0 }}
       whileInView={{ rotate: -3, x: 0, opacity: 1 }}
       className="glass-premium p-8 absolute top-0 -left-4 z-10 w-72 shadow-2xl"
      >
       <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10" />
        <div>
         <div className="text-sm font-bold">Alex Chen</div>
         <div className="text-xs text-white/40">Researcher @ Stanford</div>
        </div>
       </div>
       <p className="text-sm text-white/70 mb-4 leading-relaxed italic">"The transition to React 19 concurrent rendering is a paradigm shift for student projects..."</p>
       <div className="flex gap-3 text-xs font-bold text-orbit-accent uppercase tracking-tighter">
        <span>#React19</span> <span>#WebDev</span>
       </div>
      </motion.div>
      <motion.div 
       initial={{ rotate: 5, x: 20, opacity: 0 }}
       whileInView={{ rotate: 3, x: 0, opacity: 1 }}
       transition={{ delay: 0.2 }}
       className="glass-card p-8 mt-40 ml-20 relative z-20 w-80 border-orbit-purple/20 bg-orbit-purple/[0.02]"
      >
       <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-orbit-purple/20 flex items-center justify-center">
         <MessageSquare className="w-4 h-4 text-orbit-purple" />
        </div>
        <span className="text-sm font-bold uppercase tracking-widest">Global Thread</span>
       </div>
       <div className="space-y-4">
        <div className="h-2 w-full bg-slate-100 rounded-full" />
        <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
        <div className="h-10 w-full bg-orbit-purple/10 border border-orbit-purple/20 rounded-xl flex items-center px-4 text-xs font-medium text-orbit-purple/60">
         Join the brainstorm...
        </div>
       </div>
      </motion.div>
     </div>
     <div className="order-1 lg:order-2">
      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
       <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">Student Voices, <br /><span className="text-gradient-space">Global Reach</span></h2>
       <p className="text-white/50 text-xl mb-10 leading-relaxed max-w-xl">
        Scale your impact by publishing research, technical deep-dives, and project post-mortems. Engage with a global high-intelligence network.
       </p>
       <ul className="space-y-6">
        {[
         { icon: <BookOpen />, text: "Professional Grade Article Editor", color: "text-orbit-accent" },
         { icon: <Shield />, text: "Peer Review & Verification System", color: "text-orbit-glow" },
         { icon: <Users />, text: "Real-time Discussion Infrastructure", color: "text-orbit-purple" }
        ].map((item, idx) => (
         <motion.li 
          key={idx} 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-center gap-5 text-lg font-medium text-white/80 group"
         >
          <div className={`${item.color} group-hover:scale-125 transition-transform duration-300`}>{item.icon}</div>
          {item.text}
         </motion.li>
        ))}
       </ul>
      </motion.div>
     </div>
    </div>
   </section>

   {/* College Hackathons */}
   <section id="hackathons" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col items-start text-left mb-24">
     <motion.div 
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      className="w-20 h-20 rounded-full bg-orbit-glow/10 flex items-center justify-center mb-6 border border-orbit-glow/20"
     >
      <Trophy className="w-10 h-10 text-orbit-glow shadow-neon-blue" />
     </motion.div>
     <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">The Innovation <span className="text-gradient-space">Arena</span></h2>
     <p className="text-white/50 text-xl max-w-2xl">A unified high-stakes platform for academic institutions and elite student developers.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
     <motion.div 
      whileHover={{ y: -10 }}
      className="glass-premium p-12 rounded-[40px] border-l-8 border-orbit-accent group"
     >
      <div className="w-16 h-16 rounded-2xl bg-orbit-accent/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
       <Globe className="w-8 h-8 text-orbit-accent" />
      </div>
      <h3 className="text-3xl font-black mb-6 uppercase italic">For Institutions</h3>
      <p className="text-white/50 text-lg mb-8 leading-relaxed">Host legendary hackathons with industrial-grade control. Manage scale, track global registrations, and verify excellence through a single command center.</p>
      <Link to="/register" className="inline-flex items-center gap-3 text-orbit-accent font-black uppercase tracking-widest hover:gap-5 transition-all">
       Deploy Hackathon <ArrowRight className="w-5 h-5" />
      </Link>
     </motion.div>
     
     <motion.div 
      whileHover={{ y: -10 }}
      className="glass-premium p-12 rounded-[40px] border-l-8 border-orbit-purple group"
     >
      <div className="w-16 h-16 rounded-2xl bg-orbit-purple/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
       <Users className="w-8 h-8 text-orbit-purple" />
      </div>
      <h3 className="text-3xl font-black mb-6 uppercase italic">For Developers</h3>
      <p className="text-white/50 text-lg mb-8 leading-relaxed">Universal profile, unlimited potential. Execute registrations across national events instantly and secure your Participation ID within the orbit.</p>
      <Link to="/student/hackathons" className="inline-flex items-center gap-3 text-orbit-purple font-black uppercase tracking-widest hover:gap-5 transition-all">
       Secure Entry <ArrowRight className="w-5 h-5" />
      </Link>
     </motion.div>
    </div>

    {/* Unique Code Visual */}
    <motion.div 
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     className="mt-20 glass-premium p-1 p-[1px] rounded-[40px] overflow-hidden bg-gradient-to-r from-orbit-accent/50 via-orbit-purple/50 to-orbit-accent/50"
    >
     <div className="bg-orbit-background/95 rounded-[39px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="max-w-xl">
       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-accent/10 text-orbit-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-orbit-accent/20">
        Secure Protocol
       </div>
       <h3 className="text-4xl font-black mb-6 leading-tight uppercase italic text-white/90">Unique Participation <br /><span className="text-orbit-accent">Signature</span></h3>
       <p className="text-white/40 text-lg leading-relaxed">Every mission registration generates an immutable, encrypted participation code. Automated check-ins, instant verification, total security.</p>
      </div>
      <div className="relative group">
       <div className="absolute inset-0 bg-orbit-accent/20 blur-[60px] group-hover:bg-orbit-accent/40 transition-colors" />
       <div className="w-72 h-40 glass-premium rounded-3xl flex flex-col items-center justify-center p-8 relative z-10 border-white/20">
        <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] mb-4 font-black">Authentication Code</div>
        <div className="text-3xl font-mono text-orbit-glow font-black tracking-[0.2em] text-shadow-neon">TO-2024-X9Z8</div>
        <div className="mt-4 flex gap-1">
         {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 rounded-full bg-orbit-glow/20" />)}
        </div>
       </div>
      </div>
     </div>
    </motion.div>
   </section>

   {/* Orbiton AI Section */}
   <section id="orbiton" className="py-32 bg-gradient-to-b from-transparent to-orbit-accent/5 relative border-y border-white/5 overflow-hidden">
    <div className="orbit-glow w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orbit-accent/10 opacity-30" />
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
     <motion.div 
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-28 h-28 rounded-3xl bg-gradient-to-br from-orbit-accent to-orbit-purple p-1 mb-10 shadow-[0_0_50px_rgba(59,130,246,0.5)]"
     >
      <div className="w-full h-full rounded-[20px] bg-orbit-background flex items-center justify-center">
       <Cpu className="w-14 h-14 text-orbit-accent animate-pulse" />
      </div>
     </motion.div>
     <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">Meet <span className="text-gradient-space">Orbiton</span></h2>
     <p className="text-xl text-white/50 max-w-3xl mb-16 leading-relaxed">
      Your personal AI orbital assistant. From summarizing tech news to helping you find
      the best hackathon for your tech stack, Orbiton is always online and evolving.
     </p>

     <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl glass-premium p-4 rounded-[32px] overflow-hidden"
     >
      <div className="bg-[#05081a] rounded-[24px] p-8 h-[450px] flex flex-col text-left border border-white/5">
       <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
         <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-orbit-accent/20 flex items-center justify-center">
           <Zap className="w-6 h-6 text-orbit-accent" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-4 border-[#05081a]" />
         </div>
         <div>
          <div className="text-lg font-bold">Orbiton Core</div>
          <div className="text-xs text-white/30 uppercase tracking-widest font-black">Neural Link Established</div>
         </div>
        </div>
        <div className="flex gap-2">
         <div className="w-2 h-2 rounded-full bg-white/10" />
         <div className="w-2 h-2 rounded-full bg-white/10" />
         <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
       </div>
       
       <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
        <motion.div 
         initial={{ opacity: 0, x: -20 }}
         whileInView={{ opacity: 1, x: 0 }}
         className="flex gap-4"
        >
         <div className="w-8 h-8 rounded-lg bg-orbit-accent/10 flex-shrink-0 flex items-center justify-center">
          <Code className="w-4 h-4 text-orbit-accent" />
         </div>
         <div className="bg-white/5 rounded-2xl rounded-tl-none p-5 text-sm max-w-[85%] leading-relaxed border border-white/5">
          Welcome to Mission Control. I've scanned the current tech landscape: 12 new research papers, 4 active hackathons, and 156 community articles need your attention. Where should we start?
         </div>
        </motion.div>
        
        <motion.div 
         initial={{ opacity: 0, x: 20 }}
         whileInView={{ opacity: 1, x: 0 }}
         className="flex gap-4 flex-row-reverse"
        >
         <div className="w-8 h-8 rounded-lg bg-orbit-purple/10 flex-shrink-0 flex items-center justify-center">
          <Users className="w-4 h-4 text-orbit-purple" />
         </div>
         <div className="bg-orbit-accent/10 border border-orbit-accent/20 rounded-2xl rounded-tr-none p-5 text-sm max-w-[85%] text-white/90 leading-relaxed shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          Search for AI-focused hackathons within the next 30 days.
         </div>
        </motion.div>

        <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         className="flex gap-4"
        >
         <div className="w-8 h-8 rounded-lg bg-orbit-accent/10 flex-shrink-0 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-orbit-accent" />
         </div>
         <div className="flex flex-col gap-3 max-w-[85%]">
          <div className="bg-white/5 rounded-2xl rounded-tl-none p-5 text-sm leading-relaxed border border-white/5">
           Scanning databases... Found 2 matches:
           <div className="mt-3 p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-orbit-accent/30 transition-colors">
            <span className="font-bold text-orbit-accent">Stanford AI Hack 2024</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </div>
          </div>
         </div>
        </motion.div>
       </div>

       <div className="mt-8 relative">
        <div className="h-14 w-full bg-white/[0.03] border border-white/10 rounded-2xl flex items-center px-6 text-white/20 text-sm">
         Initiate command sequence...
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-orbit-accent flex items-center justify-center shadow-neon-blue">
         <Zap className="w-4 h-4 text-white" />
        </div>
       </div>
      </div>
     </motion.div>
    </div>
   </section>

   {/* Mission Roadmap */}
   <section className="py-32 px-6 max-w-7xl mx-auto relative">
    <div className="text-left mb-24">
     <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase italic tracking-tighter">Mission <span className="text-orbit-purple">Roadmap</span></h2>
     <p className="text-white/40 text-lg">Your trajectory from orbit to successful landing.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
     {[
      { step: "01", title: "Ignition", desc: "Construct your student profile with your core tech stack." },
      { step: "02", title: "Scan", desc: "Analyze daily tech intelligence and community broadcasts." },
      { step: "03", title: "Pilot", desc: "Broadcast your technical research and project findings." },
      { step: "04", title: "Launch", desc: "Deploy for national hackathons with your unique signature." },
      { step: "05", title: "Orbit", desc: "Accelerate your career network and dominate the arena." }
     ].map((item, idx) => (
      <motion.div 
       key={idx} 
       initial={{ opacity: 0, scale: 0.9 }}
       whileInView={{ opacity: 1, scale: 1 }}
       transition={{ delay: idx * 0.1 }}
       className="relative group"
      >
       <div className="text-7xl font-black text-white/5 mb-8 group-hover:text-orbit-accent/10 transition-colors uppercase tracking-[0.2em]">{item.step}</div>
       <h4 className="text-xl font-black mb-4 text-white uppercase italic tracking-widest">{item.title}</h4>
       <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
       {idx < 4 && (
        <div className="hidden lg:block absolute top-16 -right-5 text-white/10 group-hover:text-orbit-accent/30 transition-colors">
         <ArrowRight className="w-8 h-8" />
        </div>
       )}
      </motion.div>
     ))}
    </div>
   </section>

   {/* Footer CTA */}
   <section className="py-40 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-orbit-accent/30 to-orbit-purple/30 blur-[150px] -z-10 opacity-40 scale-110" />
    <motion.div 
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     className="max-w-6xl mx-auto glass-premium p-16 md:p-24 flex flex-col items-start text-left rounded-[60px] border-white/20 overflow-hidden relative"
    >
     <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-10 rotate-12 group-hover:rotate-0 transition-transform">
      <Rocket className="w-10 h-10 text-orbit-accent shadow-neon-blue" />
     </div>
     <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic">Ready for <span className="text-gradient-space">Liftoff?</span></h2>
     <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-3xl leading-relaxed">
      Synchronize with thousands of student innovators. Master the orbit. Build the future of technology today.
     </p>
     <div className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto">
      <Link to="/register" className="btn-orbit-primary text-xl px-16 py-6 rounded-3xl">
       Initiate Mission Free
      </Link>
      <Link to="/login" className="btn-orbit-secondary text-xl px-16 py-6 rounded-3xl">
       Command Center
      </Link>
     </div>
    </motion.div>
   </section>

   {/* Footer Meta */}
   <footer className="py-12 px-6 border-t border-white/5 text-center text-white/30 text-sm">
    <div className="flex justify-center gap-8 mb-8">
     <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
     <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
     <a href="#" className="hover:text-white transition-colors">Contact Missions</a>
    </div>
    <p>&copy; 2024 TechOrbit Mission Control. All rights reserved.</p>
   </footer>
  </div>
 );
};

export default LandingPage;

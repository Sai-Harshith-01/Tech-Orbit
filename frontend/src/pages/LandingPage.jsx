import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
 const { scrollY } = useScroll();
 const y1 = useTransform(scrollY, [0, 500], [0, 200]);
 const opacity = useTransform(scrollY, [0, 300], [1, 0]);

 return (
  <div className="min-h-screen space-theme overflow-hidden">
   {/* Decorative Background Elements */}
   <div className="fixed inset-0 pointer-events-none">
    <div className="orbit-glow w-[500px] h-[500px] -top-48 -left-48 bg-orbit-accent/20" />
    <div className="orbit-glow w-[600px] h-[600px] top-1/2 -right-48 bg-orbit-purple/10" />
    <div className="orbit-glow w-[400px] h-[400px] bottom-0 left-1/4 bg-orbit-glow/10" />
   </div>

   {/* Navbar */}
   <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
     <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gradient-to-br from-orbit-accent to-orbit-purple rounded-xl flex items-center justify-center shadow-neon-blue">
       <Globe className="text-white w-6 h-6" />
      </div>
      <span className="text-2xl font-bold tracking-tighter text-white">
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
   <section className="relative pt-40 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
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
     <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
      Your Daily <span className="text-gradient-space">Orbit</span> of <br />
      Knowledge & Innovation
     </h1>
     <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
      Connect with colleges, master tech trends, and showcase your skills through
      curated articles and national-level hackathons.
     </p>
     <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/register" className="btn-orbit-primary flex items-center gap-2 justify-center">
       Explore TechOrbit <ArrowRight className="w-5 h-5" />
      </Link>
      <Link to="/student/hackathons" className="btn-orbit-secondary flex items-center gap-2 justify-center">
       View Hackathons <Trophy className="w-5 h-5" />
      </Link>
     </div>
    </motion.div>

    {/* Hero Illustration */}
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 0.5, duration: 1 }}
     className="mt-24 relative w-full max-w-5xl aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-glow"
    >
     <img
      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
      alt="Space Tech"
      className="w-full h-full object-cover opacity-60"
     />
     <div className="absolute inset-0 bg-gradient-to-t from-orbit-background via-transparent to-transparent" />

     {/* Animated Orbiting Elements */}
     <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 border border-white/10 rounded-full animate-orbit-slow absolute">
       <div className="w-12 h-12 bg-orbit-accent rounded-full absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center shadow-neon-blue">
        <Code className="text-white w-6 h-6" />
       </div>
      </div>
      <div className="w-96 h-96 border border-white/5 rounded-full animate-spin-slow absolute">
       <div className="w-10 h-10 bg-orbit-purple rounded-full absolute top-1/2 -right-5 -translate-y-1/2 flex items-center justify-center shadow-neon-purple">
        <Rocket className="text-white w-5 h-5" />
       </div>
      </div>
     </div>
    </motion.div>
   </section>

   {/* Daily Tech News */}
   <section id="news" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col items-center text-center mb-16">
     <h2 className="text-3xl md:text-5xl font-bold mb-4">Daily Tech <span className="text-orbit-accent">Pulse</span></h2>
     <p className="text-white/50 max-w-xl">Stay ahead of the curve with our curated stream of tech intelligence.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
     {[
      { icon: <Cpu />, title: "AI & ML", desc: "The latest in neural networks and generative AI.", color: "blue" },
      { icon: <Shield />, title: "Cybersecurity", desc: "Protecting the digital frontier from emerging threats.", color: "purple" },
      { icon: <Globe />, title: "Web Tech", desc: "Vanguard web frameworks and distributed systems.", color: "blue" },
      { icon: <Zap />, title: "Emerging Tech", desc: "Quantum computing, IoT and the future of hardware.", color: "purple" }
     ].map((item, idx) => (
      <motion.div
       key={idx}
       whileHover={{ y: -10 }}
       className="glass-card p-8 flex flex-col items-start"
      >
       <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${item.color === 'blue' ? 'bg-orbit-accent/20 text-orbit-accent shadow-neon-blue' : 'bg-orbit-purple/20 text-orbit-purple shadow-neon-purple'}`}>
        {item.icon}
       </div>
       <h3 className="text-xl font-bold mb-2">{item.title}</h3>
       <p className="text-white/40 text-sm">{item.desc}</p>
      </motion.div>
     ))}
    </div>
   </section>

   {/* Articles & Communication */}
   <section id="articles" className="py-24 bg-white/5 border-y border-white/5 relative">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
     <div className="order-2 lg:order-1 relative">
      <div className="glass-card p-6 rotate-[-3deg] absolute top-0 -left-4 z-10 w-64">
       <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-slate-700" />
        <div>
         <div className="text-xs font-bold">Alex Chen</div>
         <div className="text-[10px] text-white/40">Student @ Stanford</div>
        </div>
       </div>
       <p className="text-xs text-white/60 mb-3">Published: "The Evolution of React 19 and why it matters..."</p>
       <div className="flex gap-2 text-[10px] text-orbit-accent">
        <span>#ReactJS</span> <span>#WebDev</span>
       </div>
      </div>
      <div className="glass-card p-6 rotate-[3deg] mt-32 ml-16 relative z-20 w-80">
       <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-4 h-4 text-orbit-glow" />
        <span className="text-xs font-medium">New Discussion</span>
       </div>
       <div className="space-y-3">
        <div className="h-2 w-full bg-white/10 rounded" />
        <div className="h-2 w-3/4 bg-white/10 rounded" />
        <div className="h-8 w-full bg-orbit-accent/10 border border-orbit-accent/20 rounded flex items-center px-4 text-[10px]">
         Join the conversation...
        </div>
       </div>
      </div>
     </div>
     <div className="order-1 lg:order-2">
      <h2 className="text-3xl md:text-5xl font-bold mb-6">Student Voices, <br /><span className="text-orbit-purple">Global Reach</span></h2>
      <p className="text-white/60 text-lg mb-8 leading-relaxed">
       Publish your research, technical blogs, and project breakdowns. Engage with a community
       of peers who are as passionate about technology as you are.
      </p>
      <ul className="space-y-4">
       {[
        { icon: <BookOpen />, text: "Structured Article Editor" },
        { icon: <Users />, text: "Peer Review & Verification" },
        { icon: <MessageSquare />, text: "Interactive Discussion Threads" }
       ].map((item, idx) => (
        <li key={idx} className="flex items-center gap-4 text-white/80">
         <div className="text-orbit-accent">{item.icon}</div>
         {item.text}
        </li>
       ))}
      </ul>
     </div>
    </div>
   </section>

   {/* College Hackathons */}
   <section id="hackathons" className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16">
     <h2 className="text-3xl md:text-5xl font-bold mb-4">The Arena of <span className="text-orbit-glow">Innovation</span></h2>
     <p className="text-white/50">Unified platform for colleges and students to battle it out.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
     <div className="glass-card p-10 border-l-4 border-orbit-accent">
      <Trophy className="w-12 h-12 text-orbit-accent mb-6" />
      <h3 className="text-2xl font-bold mb-4">For Colleges</h3>
      <p className="text-white/60 mb-6">Easily host and manage national-level hackathons. Track registrations, verify participants, and streamline the entire process from one dashboard.</p>
      <Link to="/register" className="text-orbit-accent font-medium hover:underline flex items-center gap-2">
       Post your hackathon <ArrowRight className="w-4 h-4" />
      </Link>
     </div>
     <div className="glass-card p-10 border-l-4 border-orbit-glow">
      <Users className="w-12 h-12 text-orbit-glow mb-6" />
      <h3 className="text-2xl font-bold mb-4">For Students</h3>
      <p className="text-white/60 mb-6">One profile, infinite opportunities. Register for any college hackathon with a single click and receive your unique participation code instantly.</p>
      <Link to="/student/hackathons" className="text-orbit-glow font-medium hover:underline flex items-center gap-2">
       Find your next challenge <ArrowRight className="w-4 h-4" />
      </Link>
     </div>
    </div>

    {/* Unique Code Visual */}
    <div className="mt-20 glass-card p-12 overflow-hidden relative group">
     <div className="absolute top-0 right-0 w-64 h-64 bg-orbit-accent/10 blur-[100px] group-hover:bg-orbit-accent/20 transition-all" />
     <div className="flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="max-w-md">
       <h3 className="text-3xl font-bold mb-4">Unique Registration ID</h3>
       <p className="text-white/50 mb-6">Every registration generates a secure, unique participation code stored in your dashboard for seamless check-ins during events.</p>
      </div>
      <div className="relative">
       <div className="w-64 h-32 bg-orbit-card border border-white/20 rounded-xl flex flex-col items-center justify-center shadow-lg relative z-10">
        <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Participation Code</div>
        <div className="text-2xl font-mono text-orbit-glow font-bold tracking-widest">TO-2024-X9Z8</div>
        <div className="absolute -bottom-2 -right-2 w-full h-full border border-orbit-accent/30 rounded-xl -z-10" />
       </div>
      </div>
     </div>
    </div>
   </section>

   {/* Orbiton AI Section */}
   <section id="orbiton" className="py-24 bg-gradient-to-b from-transparent to-white/5 relative">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
     <div className="w-24 h-24 rounded-full bg-orbit-accent/20 flex items-center justify-center mb-10 shadow-glow animate-pulse-glow">
      <Cpu className="w-12 h-12 text-orbit-accent" />
     </div>
     <h2 className="text-4xl md:text-6xl font-black mb-6">Meet <span className="text-gradient-space">Orbiton</span></h2>
     <p className="text-xl text-white/60 max-w-2xl mb-12">
      Your personal AI orbital assistant. From summarizing tech news to helping you find
      the best hackathon for your tech stack, Orbiton is always online.
     </p>

     <div className="w-full max-w-2xl glass-card p-3 rounded-3xl overflow-hidden">
      <div className="bg-orbit-background/50 rounded-2xl p-6 h-80 flex flex-col text-left">
       <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-orbit-accent/30 flex items-center justify-center ring-2 ring-orbit-accent/50 animate-pulse">
         <div className="w-2 h-2 rounded-full bg-orbit-accent" />
        </div>
        <span className="text-sm font-bold">Orbiton AI</span>
        <span className="text-[10px] bg-orbit-accent/20 text-orbit-accent px-2 py-0.5 rounded-full uppercase tracking-tighter">Online</span>
       </div>
       <div className="space-y-4 overflow-y-auto">
        <div className="bg-white/5 rounded-2xl p-4 text-sm max-w-[80%]">
         "Hello! Ready to launch your next project? There are 4 hackathons currently accepting registrations."
        </div>
        <div className="bg-orbit-accent/10 border border-orbit-accent/20 rounded-2xl p-4 text-sm ml-auto max-w-[80%] text-right self-end">
         "Show me details for the Stanford AI hackathon."
        </div>
        <div className="bg-white/5 rounded-2xl p-4 text-sm max-w-[80%] animate-pulse">
         Processing request...
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>

   {/* How It Works */}
   <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-20">
     <h2 className="text-3xl md:text-5xl font-bold mb-4">Mission <span className="text-orbit-purple">Roadmap</span></h2>
     <p className="text-white/50">Your journey from orbit to landing.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
     {[
      { step: "01", title: "Ignition", desc: "Create your student profile with your tech stack." },
      { step: "02", title: "Scan", desc: "Browse daily tech news and community articles." },
      { step: "03", title: "Pilot", desc: "Write articles and contribute to the knowledge base." },
      { step: "04", title: "Launch", desc: "Register for hackathons with your unique code." },
      { step: "05", title: "Orbit", desc: "Win, collaborate and grow your career network." }
     ].map((item, idx) => (
      <div key={idx} className="relative group">
       <div className="text-5xl font-black text-white/5 mb-6 group-hover:text-orbit-accent/10 transition-colors uppercase tracking-widest">{item.step}</div>
       <h4 className="text-lg font-bold mb-2 text-white/80">{item.title}</h4>
       <p className="text-sm text-white/40">{item.desc}</p>
       {idx < 4 && (
        <div className="hidden lg:block absolute top-12 -right-4 text-white/10">
         <ArrowRight className="w-6 h-6" />
        </div>
       )}
      </div>
     ))}
    </div>
   </section>

   {/* Footer CTA */}
   <section className="py-24 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-orbit-accent/20 to-orbit-purple/20 blur-[120px] -z-10 opacity-30" />
    <div className="max-w-5xl mx-auto glass-card p-12 md:p-20 flex flex-col items-center text-center">
     <h2 className="text-4xl md:text-6xl font-black mb-8">Ready for <span className="text-orbit-accent">Liftoff?</span></h2>
     <p className="text-xl text-white/70 mb-12 max-w-2xl">
      Stay Updated. Share Knowledge. Participate in Innovation. Join thousands of
      students building the future of technology today.
     </p>
     <div className="flex flex-col sm:flex-row gap-6">
      <Link to="/register" className="btn-orbit-primary text-lg px-12 py-4">
       Get Started for Free
      </Link>
      <Link to="/login" className="btn-orbit-secondary text-lg px-12 py-4">
       Return to Control Center
      </Link>
     </div>
    </div>
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

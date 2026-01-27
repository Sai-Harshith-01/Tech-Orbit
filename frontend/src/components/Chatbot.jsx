import React, { useState, useRef, useEffect } from 'react';
import { hackathonService } from '../services/hackathonService';
import { articleService } from '../services/articleService';
import { newsService } from '../services/newsService';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Default position: bottom right
  const [position, setPosition] = useState({
    x: window.innerWidth - 100,
    y: window.innerHeight - 100
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartOffset = useRef({ x: 0, y: 0 });

  const [messages, setMessages] = useState([
    { text: "Hello! I'm Orbiton, your TechOrbit assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Drag logic
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    dragStartOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.preventDefault(); // Prevent text selection
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      // Boundaries: keep within viewport with small padding
      const padding = 20;
      const newX = Math.min(Math.max(padding, e.clientX - dragStartOffset.current.x), window.innerWidth - 80);
      const newY = Math.min(Math.max(padding, e.clientY - dragStartOffset.current.y), window.innerHeight - 80);

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const generateResponse = async (input) => {
    const lowerInput = input.toLowerCase();
    const role = localStorage.getItem('role');

    try {
      // 1. Personalized News Feed
      if (lowerInput.includes('news') || lowerInput.includes('brief') || lowerInput.includes('trending')) {
        const news = await newsService.getLatestNews();
        if (!news || news.length === 0) return "Connection to the tech pulse is a bit weak right now. Try again in a moment!";

        if (lowerInput.includes('ai')) {
          const aiNews = news.filter(n => n.title.toLowerCase().includes('ai') || n.title.toLowerCase().includes('intelligence')).slice(0, 3);
          if (aiNews.length > 0) {
            return `🚀 **Latest in AI:**\n\n${aiNews.map((n, i) => `${i + 1}. ${n.title}`).join('\n')}\n\nWould you like a summary of any of these?`;
          }
        }

        if (lowerInput.includes('web') || lowerInput.includes('dev')) {
          const webNews = news.filter(n => n.title.toLowerCase().includes('web') || n.title.toLowerCase().includes('react') || n.title.toLowerCase().includes('js')).slice(0, 3);
          if (webNews.length > 0) {
            return `🌐 **Web Dev Trending:**\n\n${webNews.map((n, i) => `${i + 1}. ${n.title}`).join('\n')}`;
          }
        }

        if (lowerInput.includes('brief') || lowerInput.includes('1 minute')) {
          const brief = news.slice(0, 3).map((n, i) => `🔹 ${n.title}`).join('\n');
          return `⏰ **Your 1-Minute Daily Tech Brief:**\n\n${brief}\n\nStay ahead of the curve!`;
        }

        return `📈 **Trending Highlights Today:**\n\n${news.slice(0, 5).map((n, i) => `${i + 1}. ${n.title}`).join('\n')}`;
      }

      // 2. Hackathon Reminders & User Context
      if (lowerInput.includes('hackathon') || lowerInput.includes('event')) {
        const allHackathons = await hackathonService.getAllHackathons();

        if (lowerInput.includes('my') || lowerInput.includes('register')) {
          const myRegs = await hackathonService.getMyRegistrations();
          if (myRegs.length > 0) {
            return `✅ **Your Active Missions:**\n\n${myRegs.map(h => `🏆 ${h.hackathon_name} (Code: **${h.registration_code}**)`).join('\n')}`;
          }
          return "You haven't joined any hackathons yet! Check the 'Hackathons' tab to start your first mission.";
        }

        if (lowerInput.includes('ending') || lowerInput.includes('deadline') || lowerInput.includes('this week')) {
          const upcoming = allHackathons.filter(h => {
            const endDate = new Date(h.end_date);
            const today = new Date();
            const diff = (endDate - today) / (1000 * 60 * 60 * 24);
            return diff > 0 && diff <= 7;
          });
          if (upcoming.length > 0) {
            return `⚠️ **Critical Deadlines (Ending within 7 days):**\n\n${upcoming.map(h => `❗ ${h.hackathon_name} - Ends ${new Date(h.end_date).toLocaleDateString()}`).join('\n')}`;
          }
          return "No immediate deadlines this week. Plenty of time to build!";
        }

        const open = allHackathons.filter(h => h.status === 'UPCOMING' || h.status === 'ONGOING').slice(0, 3);
        return `🚀 **Open Opportunities:**\n\n${open.map((h, i) => `${i + 1}. ${h.hackathon_name} (Ends: ${h.end_date})`).join('\n')}`;
      }

      // 3. Article Discovery & Summaries
      if (lowerInput.includes('article') || lowerInput.includes('post')) {
        if (lowerInput.includes('how') || lowerInput.includes('write')) {
          return "To post an article:\n1. Go to your **Dashboard**.\n2. Click the **'Post Article'** button at the top.\n3. Add a catchy title, your content, and a cover image.\n4. Hit **Publish**! ✨";
        }

        const articles = await articleService.getAllArticles();
        if (lowerInput.includes('trending') || lowerInput.includes('popular')) {
          return `📝 **Trending Stories from Students:**\n\n${articles.slice(0, 3).map(a => `📖 "${a.title}"`).join('\n')}\n\nWant me to summarize the top one for you?`;
        }

        if (lowerInput.includes('summary') || lowerInput.includes('summarize')) {
          if (articles.length > 0) {
            const top = articles[0];
            return `📋 **Quick Summary of "${top.title}":**\n\n${top.content.substring(0, 150)}...\n\n(Find the full story on your dashboard!)`;
          }
        }

        return "I can help you discover articles or guide you on how to publish your own. Just ask!";
      }

      // 4. Platform Help & FAQs
      if (lowerInput.includes('how') || lowerInput.includes('help') || lowerInput.includes('where') || lowerInput.includes('rule') || lowerInput.includes('guide')) {
        if (lowerInput.includes('code') || lowerInput.includes('id')) {
          return "Your unique registration codes are stored in your **Dashboard**. Click on any hackathon you've joined to see your personal participation ID!";
        }
        if (lowerInput.includes('register')) {
          return "To join a hackathon, head over to the **Hackathons** page, pick an event that excites you, and click **'Join'**. I'll generate your unique code instantly!";
        }
        if (lowerInput.includes('rule') || lowerInput.includes('guideline')) {
          return "📜 **TechOrbit Rules:**\n1. Articles must be original and tech-related.\n2. One registration code per hackathon.\n3. Respectful community engagement in discussions.\n\nType 'how to post' for more specific help!";
        }
        return "I'm Orbiton, your TechOrbit guide! I can help you find news, track hackathon deadlines, or manage your articles. What's on your mind?";
      }

      // 5. User Specific Info
      if (lowerInput.includes('my profile') || lowerInput.includes('who am i')) {
        return `You are currently logged in as a **${role}**. Access your full control center via the Dashboard!`;
      }

      // Global Info
      if (lowerInput.includes('founder') || lowerInput.includes('creator')) {
        return "TechOrbit was founded by **Sai Harshith** and **Siddharth**, who wanted to build a better launchpad for student innovators.";
      }

      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        return "Hello! I'm Orbiton, your TechOrbit navigator. Ready for liftoff? Ask me about news, hackathons, or how to use the platform!";
      }

      return "I'm here to serve the TechOrbit mission! Ask me about tech news, upcoming hackathons, article summaries, or platform help.";
    } catch (error) {
      console.error(error);
      return "My sensors are experiencing a brief interference. Could you try asking that again?";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    setTimeout(async () => {
      const responseText = await generateResponse(currentInput);
      setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div
      className="fixed z-50 transition-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        // Disable global transition during drag for smoothness
        transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      {/* Chat Window */}
      {isOpen && (
        <div
          className="bg-white rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.15)] w-[380px] overflow-hidden border border-white/50 flex flex-col h-[520px] animate-zoomIn origin-bottom-right backdrop-blur-sm"
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '0px'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-500 to-brand-800 p-6 text-white flex justify-between items-center shadow-lg cursor-default">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/30">
                🤖
              </div>
              <div>
                <h3 className="font-extrabold text-xl tracking-tight">Orbiton</h3>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-100">Neural Assistant</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 mr-3 flex-shrink-0 mt-1 bg-white rounded-lg shadow-sm flex items-center justify-center border border-slate-100">
                    <span className="text-lg">🤖</span>
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                    ? 'bg-brand-500 text-white rounded-tr-none'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="w-8 h-8 mr-3 flex-shrink-0 mt-1 bg-white rounded-lg shadow-sm flex items-center justify-center border border-slate-100">
                  <span className="text-lg animate-bounce">🤖</span>
                </div>
                <div className="bg-white border border-slate-100 text-slate-400 rounded-2xl p-4 text-xs font-bold uppercase tracking-widest flex items-center space-x-3 shadow-sm">
                  <span>Thinking</span>
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me..."
                className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-brand-500/20 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all shadow-lg active:scale-90 ${inputText.trim() ? 'bg-brand-500 active:bg-brand-600' : 'bg-slate-200'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onMouseDown={handleMouseDown}
        onClick={() => !isDragging && setIsOpen(!isOpen)}
        className={`w-[60px] h-[60px] bg-gradient-to-br from-brand-500 to-indigo-900 border-2 border-white/20 text-white rounded-full shadow-2xl flex items-center justify-center group relative overflow-hidden transition-transform active:scale-95 ${isDragging ? 'cursor-grabbing' : 'cursor-grab animate-cosmic-orbit'}`}
      >
        <div className="absolute inset-0 bg-brand-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <svg
          className="w-9 h-9 relative z-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-40 animate-spin-slow" />
          <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-60 animate-spin-reverse-medium" />
          <circle cx="12" cy="12" r="2.5" className="fill-white shadow-lg animate-pulse" />
          <g className="animate-spin-fast">
            <circle cx="12" cy="3" r="1.5" className="fill-brand-200" />
          </g>
          <g className="animate-spin-reverse-slow">
            <circle cx="18" cy="18" r="1.2" className="fill-indigo-300" />
          </g>
        </svg>
      </button>

      {/* Tooltip */}
      {!isDragging && !isOpen && (
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-premium opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-xl border border-white/10">
          Move or Chat 🤖
        </span>
      )}

      <style>{`
        @keyframes slide-in-from-bottom-2 {
          from { transform: translateY(1rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: slide-in-from-bottom-2 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;

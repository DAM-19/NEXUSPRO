
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Maximize2, Minimize2, Terminal as TerminalIcon } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { AppState } from '../types';

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: string;
}

export const Chatbot: React.FC<{ state: AppState }> = ({ state }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "CANAL ESTABLECIDO. Soy Nexus Core v4.0. Consultas de ranking y estado operativo listas. ¿Cuál es tu comando?", time: new Date().toLocaleTimeString() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg, time: new Date().toLocaleTimeString() }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg, state);
    setMessages(prev => [...prev, { role: 'bot', text: response || 'FALLO DE ENLACE.', time: new Date().toLocaleTimeString() }]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-20 h-20 rounded-[2rem] glass border theme-border-accent/40 flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary-glow-rgb),0.3)] hover:scale-110 hover:rotate-3 transition-all duration-500 z-50 group overflow-hidden"
      >
        <div className="absolute inset-0 theme-bg-accent opacity-0 group-hover:opacity-10 transition-opacity" />
        <Bot className="theme-accent group-hover:animate-pulse" size={32} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-8 right-8 glass border border-white/10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50 flex flex-col transition-all duration-500 animate-in slide-in-from-bottom-10 ${isMinimized ? 'w-72 h-20' : 'w-[400px] h-[600px]'}`}>
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/60 rounded-t-[2.5rem] backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 theme-bg-accent/10 rounded-xl flex items-center justify-center border theme-border-accent/40 shadow-inner">
            <TerminalIcon className="theme-accent" size={20} />
          </div>
          <div>
            <h3 className="font-black text-xs tracking-[0.2em] text-white">NEXUS_CORE_V4</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[9px] text-emerald-400 font-black uppercase tracking-tighter">Latencia: 12ms</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 text-slate-500 hover:text-white transition-colors">
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-rose-400 transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-xs font-medium leading-relaxed shadow-xl border ${
                  msg.role === 'user' 
                    ? 'theme-bg-accent text-slate-950 rounded-tr-none theme-border-accent/30' 
                    : 'bg-slate-900/80 text-slate-200 border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-2 px-2">{msg.time}</span>
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="bg-slate-900/80 p-5 rounded-3xl rounded-tl-none border border-white/5">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 theme-bg-accent rounded-full animate-bounce" />
                    <div className="w-2 h-2 theme-bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 theme-bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-900/40 rounded-b-[2.5rem]">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Introducir comando..."
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-xs font-bold focus:outline-none theme-border-accent/50 transition-all text-white shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-3 top-2.5 p-2 theme-accent hover:opacity-80 disabled:opacity-50 transition-all active:scale-90"
              >
                <Send size={22} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

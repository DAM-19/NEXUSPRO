
import React from 'react';
import { LayoutDashboard, Users, MessageSquare, Award, LogOut, Terminal, Settings } from 'lucide-react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, onLogout }) => {
  const navItems = [
    { id: 'dashboard' as View, label: 'Consola', icon: LayoutDashboard },
    { id: 'teams' as View, label: 'Escuadrones', icon: Users },
    { id: 'proposals' as View, label: 'Estrategia', icon: MessageSquare },
    { id: 'awards' as View, label: 'Méritos', icon: Award },
    { id: 'settings' as View, label: 'Núcleo', icon: Settings },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 md:w-64 glass border-r border-white/10 flex flex-col z-50 animate-in slide-in-from-left duration-500">
      <div className="p-8 flex items-center gap-4 mb-10">
        <div className="w-12 h-12 theme-bg-accent rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-glow-rgb),0.5)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <Terminal className="text-slate-950" size={26} />
        </div>
        <div className="hidden md:block">
          <span className="font-black text-2xl tracking-tighter neon-text leading-none block">NEXUS</span>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Grid OS</span>
        </div>
      </div>

      <div className="flex-1 px-4 space-y-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-5 p-4 rounded-[1.25rem] transition-all duration-500 group relative overflow-hidden ${
              currentView === item.id 
                ? 'theme-bg-accent/10 border border-white/10' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            {currentView === item.id && (
              <div className="absolute left-0 top-0 w-1 h-full theme-bg-accent shadow-[0_0_15px_rgba(var(--primary-glow-rgb),0.8)]" />
            )}
            <item.icon size={24} className={`${currentView === item.id ? 'theme-accent animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
            <span className="hidden md:block font-black text-[11px] uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-5 p-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all border border-transparent hover:border-rose-500/20 group"
        >
          <LogOut size={24} className="group-hover:translate-x-1 transition-transform" />
          <span className="hidden md:block font-black text-[11px] uppercase tracking-widest">Desconectar</span>
        </button>
      </div>
    </nav>
  );
};

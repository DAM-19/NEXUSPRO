
import React, { useState, useEffect } from 'react';
import { 
  Trophy, TrendingUp, Users, Zap, Star, 
  ChevronUp, ChevronDown, Plus, PlusCircle,
  BarChart3, Camera, Palette, Shield,
  User as UserIcon, Activity, Target, Cpu
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Navigation } from './components/Navigation';
import { Chatbot } from './components/Chatbot';
import { MOCK_USERS, MOCK_TEAMS, MOCK_PROPOSALS, BADGES } from './mockData';
import { User, Team, Proposal, View, AppState, AppTheme } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [theme, setTheme] = useState<AppTheme>('cyan');
  const [state, setState] = useState<AppState>({
    currentUser: MOCK_USERS[0],
    teams: MOCK_TEAMS,
    proposals: MOCK_PROPOSALS,
    rankings: MOCK_USERS.map(u => ({ userId: u.id, score: u.points }))
  });

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const themes: AppTheme[] = ['cyan', 'purple', 'emerald', 'rose'];
    themes.forEach(t => document.body.classList.remove(`dynamic-bg-${t}`));
    document.body.classList.add(`dynamic-bg-${theme}`);
  }, [theme]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const toggleVote = (id: string, delta: number) => {
    setState(prev => ({
      ...prev,
      proposals: prev.proposals.map(p => p.id === id ? { ...p, votes: p.votes + delta } : p)
    }));
  };

  const createProposal = () => {
    const title = prompt("Especifique el objetivo de la propuesta:");
    if (!title) return;
    const newProp: Proposal = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      title,
      description: "Propuesta de optimización estratégica enviada al núcleo de decisión.",
      authorId: state.currentUser!.id,
      authorName: state.currentUser!.name,
      votes: 1,
      status: 'pendiente',
      createdAt: new Date().toISOString()
    };
    setState(prev => ({ ...prev, proposals: [newProp, ...prev.proposals] }));
  };

  const updateProfile = (updates: Partial<User>) => {
    setState(prev => ({
      ...prev,
      currentUser: prev.currentUser ? { ...prev.currentUser, ...updates } : null
    }));
  };

  const updateTeam = (teamId: string, updates: Partial<Team>) => {
    setState(prev => ({
      ...prev,
      teams: prev.teams.map(t => t.id === teamId ? { ...t, ...updates } : t)
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(var(--primary-glow-rgb),0.2)_0%,_transparent_50%)]" />
        </div>
        
        <div className="w-full max-w-md premium-border p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative z-10 animate-view">
          <div className="text-center mb-10">
            <div className="relative inline-block p-6 rounded-3xl bg-slate-900/50 border border-white/5 mb-8 group overflow-hidden">
              <div className="absolute inset-0 theme-bg-accent opacity-10 group-hover:opacity-30 blur-2xl transition-opacity duration-700" />
              <Zap className="theme-accent w-12 h-12 relative z-10 animate-pulse" />
            </div>
            <h1 className="text-5xl font-black font-space tracking-tighter mb-2 neon-text">NEXUS CORE</h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[9px] opacity-70">Despliegue de Red v4.0</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              {authMode === 'register' && (
                <div className="group">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within:theme-accent">Alias Neural</label>
                  <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 theme-border-accent/30 transition-all text-white" placeholder="SPECTRA_OPERATOR" />
                </div>
              )}
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within:theme-accent">Identificador (Email)</label>
                <input type="email" required className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 theme-border-accent/30 transition-all text-white" placeholder="user@nexus.io" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within:theme-accent">Código de Acceso</label>
                <input type="password" required className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 theme-border-accent/30 transition-all text-white" placeholder="••••••••" />
              </div>
            </div>
            
            <button type="submit" className="w-full theme-bg-accent hover:opacity-90 text-slate-950 font-black py-5 rounded-2xl shadow-[0_0_30px_rgba(var(--primary-glow-rgb),0.5)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
              <Cpu size={20} className="animate-spin-slow" />
              {authMode === 'login' ? 'INICIAR ENLACE' : 'CREAR IDENTIDAD'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all">
              {authMode === 'login' ? "// Solicitar Nuevo Vínculo" : "// Retornar a Consola de Acceso"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentUserTeam = state.teams.find(t => t.id === state.currentUser?.teamId);

  return (
    <div className="min-h-screen flex bg-[#010410]">
      <Navigation currentView={currentView} setView={setCurrentView} onLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 ml-20 md:ml-64 p-10 transition-all relative">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20 animate-view">
          <div className="space-y-2">
            <p className="text-[10px] font-black theme-accent uppercase tracking-[0.4em]">Núcleo Conectado • Latencia Baja</p>
            <h2 className="text-6xl font-black font-space tracking-tighter text-white">
              SISTEMA <span className="theme-accent">{state.currentUser?.name.toUpperCase()}</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 glass p-3 pr-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 theme-border-accent shadow-[0_0_20px_rgba(var(--primary-glow-rgb),0.4)]">
              <img src={state.currentUser?.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xl font-black text-white leading-none mb-1">{state.currentUser?.name}</p>
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full theme-bg-accent animate-ping" />
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{currentUserTeam ? currentUserTeam.name : 'Agente Libre'}</p>
              </div>
            </div>
          </div>
        </header>

        <div key={currentView} className="animate-view">
          {currentView === 'dashboard' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Sincronía', value: '99.9%', icon: Target, color: 'theme-accent' },
                  { label: 'Carga XP', value: '+3.1k', icon: TrendingUp, color: 'text-emerald-400' },
                  { label: 'Procesos', value: '28', icon: Cpu, color: 'text-purple-400' },
                  { label: 'Ranking', value: '#01', icon: Trophy, color: 'text-amber-400' },
                ].map((stat, i) => (
                  <div key={i} className="glass-card premium-border p-8 group overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:theme-border-accent transition-all duration-500 shadow-2xl">
                        <stat.icon className={stat.color} size={32} />
                      </div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-4xl font-black font-space text-white">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 glass-card premium-border p-10 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-xl font-black font-space uppercase tracking-[0.2em]">Monitor de Flujo</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-500 uppercase">Red Activa</span>
                    </div>
                  </div>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { n: 'V0', v: 800 }, { n: 'V1', v: 1400 }, { n: 'V2', v: 1100 }, 
                        { n: 'V3', v: 2800 }, { n: 'V4', v: 2100 }, { n: 'V5', v: 3800 }, { n: 'V6', v: 3100 }
                      ]}>
                        <defs>
                          <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-glow)" stopOpacity={0.5}/>
                            <stop offset="100%" stopColor="var(--primary-glow)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                        <XAxis dataKey="n" stroke="#334155" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                        <YAxis stroke="#334155" fontSize={10} axisLine={false} tickLine={false} dx={-10} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}
                          itemStyle={{ color: 'var(--primary-glow)', fontWeight: '900' }}
                        />
                        <Area type="monotone" dataKey="v" stroke="var(--primary-glow)" strokeWidth={5} fillOpacity={1} fill="url(#glowGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-card premium-border p-10">
                  <h3 className="text-xl font-black font-space mb-10 uppercase tracking-[0.2em]">Jerarquía de Red</h3>
                  <div className="space-y-10">
                    {state.teams.map((team, idx) => (
                      <div key={team.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-4xl shadow-2xl border border-white/5 group-hover:theme-border-accent transition-all duration-500">
                            {team.logo}
                          </div>
                          <div>
                            <p className="font-black text-white text-lg group-hover:theme-accent transition-all">{team.name}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{team.members.length} Agentes</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-white text-xl">{team.points.toLocaleString()}</p>
                          <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${idx === 0 ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-500'}`}>
                            TOP {idx + 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setCurrentView('teams')} className="w-full mt-12 py-5 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl border border-white/5 transition-all">
                    Visualizar Ranking Total
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'settings' && (
            <div className="max-w-6xl space-y-12">
              <h3 className="text-6xl font-black font-space mb-16 uppercase tracking-tighter">CONFIGURACIÓN <span className="theme-accent">NÚCLEO</span></h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="glass-card premium-border p-10 space-y-10">
                  <div className="flex items-center gap-5">
                    <Palette className="theme-accent" size={32} />
                    <h4 className="font-black font-space uppercase tracking-widest text-lg">Interfaz</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {(['cyan', 'purple', 'emerald', 'rose'] as AppTheme[]).map(t => (
                      <button 
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`h-24 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${
                          theme === t ? 'theme-border-accent bg-white/5 shadow-2xl scale-105' : 'border-transparent bg-slate-950 hover:bg-slate-900'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full dynamic-bg-${t} theme-bg-accent shadow-[0_0_20px_currentColor]`} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 glass-card premium-border p-10 space-y-12">
                  <div className="flex items-center gap-5">
                    <UserIcon className="theme-accent" size={32} />
                    <h4 className="font-black font-space uppercase tracking-widest text-lg">Ficha de Identidad</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Codename Operativo</label>
                      <input 
                        type="text" 
                        defaultValue={state.currentUser?.name}
                        onBlur={(e) => updateProfile({ name: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white font-bold focus:outline-none theme-border-accent transition-all" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Enlace de Comunicación</label>
                      <input 
                        type="email" 
                        defaultValue={state.currentUser?.email}
                        onBlur={(e) => updateProfile({ email: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 text-white font-bold focus:outline-none theme-border-accent transition-all" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-12 p-10 bg-slate-950 rounded-[2.5rem] border border-white/5 shadow-inner">
                    <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 theme-border-accent shadow-[0_0_30px_rgba(var(--primary-glow-rgb),0.3)] relative group">
                      <img src={state.currentUser?.avatar} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <button className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                        <Camera className="text-white" size={40} />
                      </button>
                    </div>
                    <div className="text-center sm:text-left space-y-6">
                      <p className="text-3xl font-black text-white">Biométrica de Red</p>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">Su avatar es una huella digital cifrada basada en su semilla neural actual.</p>
                      <button 
                        onClick={() => updateProfile({ avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}` })}
                        className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl border border-white/5 transition-all shadow-xl"
                      >
                        Recalibrar Imagen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Vistas adicionales (Equipos, Propuestas, Premios) siguen la misma estética Premium */}
          {currentView === 'teams' && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <h3 className="text-6xl font-black font-space uppercase tracking-tighter">ESCUADRONES <span className="theme-accent">ACTIVOS</span></h3>
                <button className="flex items-center gap-4 theme-bg-accent text-slate-950 font-black px-10 py-5 rounded-[1.5rem] shadow-2xl hover:-translate-y-2 transition-all active:scale-95">
                  <PlusCircle size={24} />
                  INICIALIZAR ESCUADRÓN
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {state.teams.map((team) => (
                  <div key={team.id} className="glass-card premium-border p-12 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                      <span className="text-7xl opacity-5 font-black font-space italic">#{team.rank}</span>
                    </div>
                    <div className="text-7xl mb-10 bg-slate-950 w-28 h-28 rounded-[2rem] flex items-center justify-center border border-white/5 group-hover:theme-border-accent transition-all duration-700 shadow-2xl">
                      {team.logo}
                    </div>
                    <h4 className="text-3xl font-black font-space text-white mb-4 group-hover:theme-accent transition-all">{team.name}</h4>
                    <p className="text-slate-500 text-base mb-12 leading-relaxed line-clamp-2 font-medium">{team.description}</p>
                    <button className="w-full py-5 bg-slate-950 hover:theme-bg-accent hover:text-slate-950 text-white font-black rounded-2xl transition-all border border-white/5 uppercase text-[11px] tracking-[0.3em] shadow-xl">
                      Acceso a Terminal de Datos
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentView === 'proposals' && (
            <div className="space-y-12">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-10 mb-16">
                <h3 className="text-6xl font-black font-space uppercase tracking-tighter">PROPUESTAS <span className="text-purple-400">ESTRATÉGICAS</span></h3>
                <button onClick={createProposal} className="flex items-center gap-4 bg-purple-600 hover:bg-purple-500 text-white font-black px-10 py-5 rounded-[1.5rem] shadow-2xl hover:-translate-y-2 transition-all">
                  <Plus size={24} />
                  NUEVA ORDEN
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {state.proposals.map((prop) => (
                  <div key={prop.id} className="glass-card premium-border p-10 flex gap-10 group">
                    <div className="flex flex-col items-center gap-5">
                      <button onClick={() => toggleVote(prop.id, 1)} className="p-5 bg-slate-950 rounded-2xl text-slate-500 hover:theme-accent hover:bg-white/5 transition-all border border-white/5 shadow-2xl">
                        <ChevronUp size={32} />
                      </button>
                      <span className="font-black font-space text-3xl py-2">{prop.votes}</span>
                      <button onClick={() => toggleVote(prop.id, -1)} className="p-5 bg-slate-950 rounded-2xl text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/5 shadow-2xl">
                        <ChevronDown size={32} />
                      </button>
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full theme-bg-accent animate-pulse" />
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">REF_{prop.id}</span>
                      </div>
                      <h4 className="text-3xl font-black font-space text-white group-hover:theme-accent transition-all uppercase leading-tight">{prop.title}</h4>
                      <p className="text-slate-500 text-base leading-relaxed font-medium">{prop.description}</p>
                      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Agente: {prop.authorName}</span>
                        <span className="text-[11px] font-black text-purple-400 uppercase tracking-[0.2em] px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">{prop.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'awards' && (
            <div className="space-y-12">
              <h3 className="text-6xl font-black font-space mb-16 uppercase tracking-tighter">RECONOCIMIENTOS <span className="text-amber-400">NEXUS</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                {BADGES.map((badge) => {
                  const isUnlocked = state.currentUser?.badges.some(b => b.id === badge.id);
                  return (
                    <div key={badge.id} className={`glass-card premium-border p-12 relative overflow-hidden flex flex-col items-center text-center group transition-all duration-700 ${isUnlocked ? 'border-amber-500/40 bg-amber-500/5' : 'opacity-40 grayscale blur-[2px]'}`}>
                      <div className={`w-36 h-36 rounded-[3rem] flex items-center justify-center text-7xl mb-10 shadow-2xl transition-all duration-1000 group-hover:scale-110 group-hover:rotate-12 ${isUnlocked ? 'bg-amber-500/20 border-2 border-amber-500/30' : 'bg-slate-950'}`}>
                        {badge.icon}
                      </div>
                      <h4 className={`text-2xl font-black font-space mb-4 ${isUnlocked ? 'text-amber-400' : 'text-slate-400'} uppercase tracking-tight`}>{badge.name}</h4>
                      <p className="text-slate-500 text-sm font-bold leading-relaxed mb-10">{badge.description}</p>
                      <div className="w-full mt-auto">
                        <div className={`py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] ${isUnlocked ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500 shadow-2xl' : 'bg-slate-950 border border-white/5 text-slate-600'}`}>
                          {isUnlocked ? 'NIVEL ALCANZADO' : 'ACCESO RESTRINGIDO'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <Chatbot state={state} />
    </div>
  );
};

export default App;

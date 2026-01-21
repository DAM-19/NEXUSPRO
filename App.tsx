
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
    const title = prompt("Título de la propuesta estratégica:");
    if (!title) return;
    const newProp: Proposal = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description: "Protocolo de desarrollo propuesto para optimización del sistema central.",
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="w-full max-w-md glass p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 animate-in fade-in zoom-in duration-700">
          <div className="text-center mb-10">
            <div className="relative inline-block p-5 rounded-2xl bg-slate-900/80 border border-white/10 mb-6 group transition-all duration-500">
              <div className="absolute inset-0 theme-bg-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
              <Zap className="theme-accent w-10 h-10 relative z-10 animate-pulse" />
            </div>
            <h1 className="text-5xl font-black font-space tracking-tighter mb-2 neon-text">NEXUS CORE</h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Neural Interface v3.2</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              {authMode === 'register' && (
                <div className="group">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within:theme-accent">Codename</label>
                  <input type="text" className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-4 focus:outline-none theme-border-accent/50 transition-all text-white placeholder:text-slate-700" placeholder="Ej. SPECTRA_01" />
                </div>
              )}
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within:theme-accent">Identificador de Enlace</label>
                <input type="email" required className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-4 focus:outline-none theme-border-accent/50 transition-all text-white placeholder:text-slate-700" placeholder="nombre@nexus.io" />
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 transition-colors group-focus-within:theme-accent">Encriptación (Password)</label>
                <input type="password" required className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-4 focus:outline-none theme-border-accent/50 transition-all text-white placeholder:text-slate-700" placeholder="••••••••" />
              </div>
            </div>
            
            <button type="submit" className="w-full theme-bg-accent hover:opacity-90 text-slate-950 font-black py-5 rounded-2xl shadow-[0_0_30px_rgba(var(--primary-glow-rgb),0.3)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 btn-glow">
              <Cpu size={20} className="animate-spin-slow" />
              {authMode === 'login' ? 'INICIAR SECUENCIA' : 'GENERAR PERFIL NEURAL'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-slate-500 hover:theme-accent text-[11px] font-bold uppercase tracking-widest transition-colors">
              {authMode === 'login' ? "// ¿Sin credenciales? Solicitar acceso" : "// ¿Credenciales activas? Retornar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentUserTeam = state.teams.find(t => t.id === state.currentUser?.teamId);

  return (
    <div className="min-h-screen flex">
      <Navigation currentView={currentView} setView={setCurrentView} onLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 ml-20 md:ml-64 p-8 transition-all relative">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Activity size={120} className="theme-accent animate-pulse" />
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative z-10">
          <div className="animate-in slide-in-from-left duration-700">
            <p className="text-[10px] font-black theme-accent uppercase tracking-[0.3em] mb-2">Sistema Operativo Conectado</p>
            <h2 className="text-5xl font-black font-space tracking-tighter text-white">
              SISTEMA <span className="theme-accent">{state.currentUser?.name.toUpperCase()}</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 glass p-3 pr-6 rounded-[2rem] border border-white/5 shadow-2xl animate-in slide-in-from-right duration-700">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 theme-border-accent/50 shadow-[0_0_15px_rgba(var(--primary-glow-rgb),0.3)]">
              <img src={state.currentUser?.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-black text-white leading-none mb-1">{state.currentUser?.name}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full theme-bg-accent animate-pulse" />
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{currentUserTeam ? currentUserTeam.name : 'Independiente'}</p>
              </div>
            </div>
          </div>
        </header>

        {currentView === 'dashboard' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Sincronía', value: '98.2%', icon: Target, color: 'theme-accent' },
                { label: 'Delta XP', value: '+2,450', icon: TrendingUp, color: 'text-emerald-400' },
                { label: 'Hilos Activos', value: '14', icon: Cpu, color: 'text-purple-400' },
                { label: 'Tier Global', value: '#01', icon: Trophy, color: 'text-amber-400' },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-8 rounded-[2rem] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-[5rem] -mr-8 -mt-8 group-hover:scale-110 transition-transform" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-slate-900/80 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:theme-border-accent transition-all duration-500 shadow-xl">
                      <stat.icon className={stat.color} size={28} />
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                    <p className="text-3xl font-black font-space text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 glass-card p-10 rounded-[2.5rem] relative overflow-hidden scan-line">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-xl font-black font-space uppercase tracking-widest">Flujo de Rendimiento</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Tiempo Real</span>
                  </div>
                </div>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { n: 'V0', v: 400 }, { n: 'V1', v: 1200 }, { n: 'V2', v: 900 }, 
                      { n: 'V3', v: 2400 }, { n: 'V4', v: 1800 }, { n: 'V5', v: 3200 }, { n: 'V6', v: 2800 }
                    ]}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary-glow)" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="var(--primary-glow)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="n" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                      <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} dx={-10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                        itemStyle={{ color: 'var(--primary-glow)', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="v" stroke="var(--primary-glow)" strokeWidth={4} fillOpacity={1} fill="url(#chartGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card p-10 rounded-[2.5rem]">
                <h3 className="text-xl font-black font-space mb-10 uppercase tracking-widest">Escuadrones Líderes</h3>
                <div className="space-y-8">
                  {state.teams.map((team, idx) => (
                    <div key={team.id} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-slate-900/80 rounded-[1.25rem] flex items-center justify-center text-3xl shadow-2xl border border-white/5 group-hover:theme-border-accent transition-all duration-500">
                          {team.logo}
                        </div>
                        <div>
                          <p className="font-black text-white group-hover:theme-accent transition-all duration-300">{team.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{team.members.length} Unidades</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-white text-lg">{team.points.toLocaleString()}</p>
                        <div className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase inline-block ${idx === 0 ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-500'}`}>
                          POS {idx + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentView('teams')}
                  className="w-full mt-12 py-4 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-white/5 transition-all duration-500"
                >
                  Analizar Clasificación Completa
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-10">
            <h3 className="text-5xl font-black font-space mb-12 uppercase tracking-tighter">CONFIGURACIÓN <span className="theme-accent">NÚCLEO</span></h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-10 rounded-[2.5rem] space-y-8">
                <div className="flex items-center gap-4 text-white">
                  <Palette className="theme-accent" size={24} />
                  <h4 className="font-black font-space uppercase tracking-widest text-sm">Estética de Red</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {(['cyan', 'purple', 'emerald', 'rose'] as AppTheme[]).map(t => (
                    <button 
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`h-16 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 group ${
                        theme === t ? 'theme-border-accent bg-white/5' : 'border-transparent bg-slate-900/80 hover:bg-slate-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full dynamic-bg-${t} theme-bg-accent shadow-[0_0_10px_currentColor]`} />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 glass-card p-10 rounded-[2.5rem] space-y-10">
                <div className="flex items-center gap-4 text-white">
                  <UserIcon className="theme-accent" size={24} />
                  <h4 className="font-black font-space uppercase tracking-widest text-sm">Ficha de Identidad</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Alias Operativo</label>
                    <input 
                      type="text" 
                      defaultValue={state.currentUser?.name}
                      onBlur={(e) => updateProfile({ name: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none theme-border-accent/50 transition-all shadow-inner" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Canal de Enlace</label>
                    <input 
                      type="email" 
                      defaultValue={state.currentUser?.email}
                      onBlur={(e) => updateProfile({ email: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none theme-border-accent/50 transition-all shadow-inner" 
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-10 p-8 bg-slate-950/50 rounded-3xl border border-white/5">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 theme-border-accent/30 relative group shadow-2xl">
                    <img src={state.currentUser?.avatar} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <Camera className="text-white" size={32} />
                    </button>
                  </div>
                  <div className="text-center sm:text-left space-y-4">
                    <p className="text-xl font-black text-white">Generador de Biométrica</p>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs">Tu avatar es una representación visual única de tu semilla de datos en el sistema.</p>
                    <button 
                      onClick={() => updateProfile({ avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}` })}
                      className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/10 transition-all active:scale-95"
                    >
                      Mutar Datos de Imagen
                    </button>
                  </div>
                </div>
              </div>

              {state.currentUser?.isTeamAdmin && currentUserTeam && (
                <div className="md:col-span-3 glass-card p-10 rounded-[2.5rem] space-y-10 border-l-4 theme-border-accent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white">
                      <Shield className="theme-accent" size={24} />
                      <h4 className="font-black font-space uppercase tracking-widest text-sm text-white">Control de Comando: {currentUserTeam.name}</h4>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-emerald-500/20">
                      Privilegios de Administrador
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Nombre del Escuadrón</label>
                        <input 
                          type="text" 
                          defaultValue={currentUserTeam.name}
                          onBlur={(e) => updateTeam(currentUserTeam.id, { name: e.target.value })}
                          className="w-full bg-slate-950/80 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none theme-border-accent/50" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Misión Operativa</label>
                        <textarea 
                          defaultValue={currentUserTeam.description}
                          onBlur={(e) => updateTeam(currentUserTeam.id, { description: e.target.value })}
                          rows={4}
                          className="w-full bg-slate-950/80 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none theme-border-accent/50 resize-none" 
                        />
                      </div>
                    </div>
                    <div className="bg-slate-950/80 p-10 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center group">
                      <div className="text-7xl mb-8 bg-slate-900 w-32 h-32 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 group-hover:theme-border-accent transition-all duration-500">
                        {currentUserTeam.logo}
                      </div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Emblema del Escuadrón</p>
                      <div className="flex gap-4">
                        {['🐲', '🌑', '🛡️', '⚡', '🔥'].map(emoji => (
                          <button 
                            key={emoji}
                            onClick={() => updateTeam(currentUserTeam.id, { logo: emoji })}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl hover:scale-110 transition-all ${currentUserTeam.logo === emoji ? 'theme-bg-accent/20 border-2 theme-border-accent' : 'bg-slate-900 border border-white/5'}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Las demás vistas (teams, proposals, awards) con estilo mejorado */}
        {currentView === 'teams' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h3 className="text-5xl font-black font-space uppercase tracking-tighter">ESCUADRONES <span className="theme-accent">ACTIVOS</span></h3>
              <button className="flex items-center gap-3 theme-bg-accent text-slate-950 font-black px-8 py-4 rounded-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 btn-glow">
                <PlusCircle size={22} />
                CREAR NUEVO ESCUADRÓN
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {state.teams.map((team) => (
                <div key={team.id} className="glass-card p-10 rounded-[2.5rem] group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-6">
                    <span className="text-6xl opacity-5 font-black font-space italic">#{team.rank}</span>
                  </div>
                  <div className="text-6xl mb-8 bg-slate-900/80 w-24 h-24 rounded-[2rem] flex items-center justify-center border border-white/5 group-hover:theme-border-accent transition-all duration-500 shadow-2xl">
                    {team.logo}
                  </div>
                  <h4 className="text-2xl font-black font-space text-white mb-3 group-hover:theme-accent transition-colors">{team.name}</h4>
                  <p className="text-slate-500 text-sm mb-10 leading-relaxed line-clamp-2 font-medium">{team.description}</p>
                  <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all border border-white/5 uppercase text-[10px] tracking-[0.2em] group-hover:theme-border-accent/50 shadow-lg">
                    Acceder a Datos de Misión
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'proposals' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-12">
              <h3 className="text-5xl font-black font-space uppercase tracking-tighter">PROPUESTAS <span className="text-purple-400">ESTRATÉGICAS</span></h3>
              <button onClick={createProposal} className="flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl hover:-translate-y-1 btn-glow">
                <Plus size={22} />
                ENVIAR PROPUESTA
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {state.proposals.map((prop) => (
                <div key={prop.id} className="glass-card p-10 rounded-[2.5rem] flex gap-8 group">
                  <div className="flex flex-col items-center gap-3">
                    <button onClick={() => toggleVote(prop.id, 1)} className="p-4 bg-slate-900/80 rounded-2xl text-slate-500 hover:theme-accent hover:bg-white/5 transition-all border border-white/5 group-hover:theme-border-accent/30 shadow-xl">
                      <ChevronUp size={28} />
                    </button>
                    <span className="font-black font-space text-2xl py-2">{prop.votes}</span>
                    <button onClick={() => toggleVote(prop.id, -1)} className="p-4 bg-slate-900/80 rounded-2xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all border border-white/5 shadow-xl">
                      <ChevronDown size={28} />
                    </button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full theme-bg-accent" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">PROPUESTA ID-{prop.id.toUpperCase()}</span>
                    </div>
                    <h4 className="text-2xl font-black font-space text-white group-hover:theme-accent transition-colors uppercase leading-tight">{prop.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{prop.description}</p>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agente: {prop.authorName}</span>
                      <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">{prop.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'awards' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-5xl font-black font-space mb-12 uppercase tracking-tighter">RECONOCIMIENTOS <span className="text-amber-400">NEXUS</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {BADGES.map((badge) => {
                const isUnlocked = state.currentUser?.badges.some(b => b.id === badge.id);
                return (
                  <div key={badge.id} className={`glass-card p-10 rounded-[3rem] relative overflow-hidden flex flex-col items-center text-center group transition-all duration-700 ${isUnlocked ? 'border-amber-500/40 bg-amber-500/5 shadow-[0_0_40px_rgba(245,158,11,0.1)]' : 'opacity-60 grayscale'}`}>
                    <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-6xl mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 ${isUnlocked ? 'bg-amber-500/20 border-2 border-amber-500/30' : 'bg-slate-900'}`}>
                      {badge.icon}
                    </div>
                    <h4 className={`text-xl font-black font-space mb-3 ${isUnlocked ? 'text-amber-400' : 'text-slate-400'} uppercase tracking-tighter`}>{badge.name}</h4>
                    <p className="text-slate-500 text-xs font-bold leading-relaxed mb-8">{badge.description}</p>
                    <div className="w-full mt-auto">
                      <div className={`py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] ${isUnlocked ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-slate-900 border border-white/5 text-slate-600'}`}>
                        {isUnlocked ? 'Protocolo Activo' : 'Cifrado'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Chatbot state={state} />
    </div>
  );
};

export default App;

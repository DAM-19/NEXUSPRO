
import { User, Team, Proposal, Badge } from './types';

export const BADGES: Badge[] = [
  { id: '1', name: 'Pionero Élite', icon: '🚀', description: 'Primeros 100 participantes' },
  { id: '2', name: 'Samurái del Código', icon: '⚔️', description: 'Completa 10 tareas técnicas' },
  { id: '3', name: 'Visionario de Equipo', icon: '🧠', description: 'Crea un equipo ganador' },
  { id: '4', name: 'Voz de la Comunidad', icon: '📣', description: 'Envía 5 propuestas aprobadas' },
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Neo Spectra',
    email: 'neo@nexus.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neo',
    points: 2450,
    rank: 1,
    teamId: 't1',
    isTeamAdmin: true,
    badges: [BADGES[0], BADGES[1]],
  },
  {
    id: 'u2',
    name: 'Ghost Protocol',
    email: 'ghost@nexus.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ghost',
    points: 2100,
    rank: 2,
    teamId: 't1',
    badges: [BADGES[0]],
  },
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 't1',
    name: 'Dragones Cibernéticos',
    logo: '🐲',
    description: 'Desarrollo de alta velocidad y máximo riesgo.',
    points: 4550,
    rank: 1,
    members: ['u1', 'u2'],
  },
  {
    id: 't2',
    name: 'Nómadas del Vacío',
    logo: '🌑',
    description: 'Dominando los horizontes desconocidos del código.',
    points: 3900,
    rank: 2,
    members: [],
  },
];

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'p1',
    title: 'Depurador IA Integrado',
    description: 'Un asistente de IA en tiempo real para identificar cuellos de botella en la lógica central.',
    authorId: 'u1',
    authorName: 'Neo Spectra',
    votes: 42,
    status: 'activa',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    title: 'Sincronización de Latencia Cero',
    description: 'Nuevo protocolo para sincronizar nodos de competición distribuidos.',
    authorId: 'u2',
    authorName: 'Ghost Protocol',
    votes: 28,
    status: 'pendiente',
    createdAt: new Date().toISOString(),
  },
];

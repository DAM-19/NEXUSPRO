
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  rank: number;
  teamId?: string;
  isTeamAdmin?: boolean;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  description: string;
  points: number;
  rank: number;
  members: string[]; 
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  votes: number;
  status: 'pendiente' | 'activa' | 'completada';
  createdAt: string;
}

export type View = 'dashboard' | 'teams' | 'proposals' | 'awards' | 'settings';

export type AppTheme = 'cyan' | 'purple' | 'emerald' | 'rose';

export interface AppState {
  currentUser: User | null;
  teams: Team[];
  proposals: Proposal[];
  rankings: { userId: string; score: number }[];
}

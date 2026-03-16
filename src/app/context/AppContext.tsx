import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Interview {
  id: string;
  date: string;
  topic: string;
  role: string;
  score: number;
  accuracy: number;
  confidence: number;
  communication: number;
  badge: string;
  pointsEarned: number;
  transcript: Array<{ speaker: string; text: string }>;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  pointsRequired: number;
  unlocked: boolean;
}

export interface User {
  name: string;
  email: string;
  points: number;
  currentBadge: string;
  totalInterviews: number;
  avatarUrl: string;
}

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  badges: Badge[];
  unlockBadge: (badgeId: string) => void;
  currentInterview: Interview | null;
  setCurrentInterview: (interview: Interview | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const initialBadges: Badge[] = [
  { id: 'seed', name: 'Seed', icon: '🌱', pointsRequired: 0, unlocked: true },
  { id: 'fish', name: 'Fish', icon: '🐟', pointsRequired: 100, unlocked: false },
  { id: 'deer', name: 'Deer', icon: '🦌', pointsRequired: 300, unlocked: false },
  { id: 'wolf', name: 'Wolf', icon: '🐺', pointsRequired: 600, unlocked: false },
  { id: 'eagle', name: 'Eagle', icon: '🦅', pointsRequired: 1000, unlocked: false },
  { id: 'tiger', name: 'Tiger', icon: '🐅', pointsRequired: 1500, unlocked: false },
  { id: 'dragon', name: 'Dragon', icon: '🐉', pointsRequired: 2500, unlocked: false },
];

const sampleInterviews: Interview[] = [
  {
    id: '1',
    date: '2026-03-15',
    topic: 'System Design',
    role: 'Software Engineer',
    score: 85,
    accuracy: 88,
    confidence: 82,
    communication: 85,
    badge: 'deer',
    pointsEarned: 150,
    transcript: [
      { speaker: 'AI', text: 'Tell me about how you would design a URL shortener service.' },
      { speaker: 'User', text: 'I would start by understanding the requirements...' },
    ],
    feedback: {
      strengths: ['Clear communication', 'Good system thinking'],
      weaknesses: ['Need more detail on database schema'],
      improvements: ['Practice scaling considerations', 'Learn more about caching strategies'],
    },
  },
  {
    id: '2',
    date: '2026-03-10',
    topic: 'Machine Learning',
    role: 'Data Scientist',
    score: 78,
    accuracy: 75,
    confidence: 80,
    communication: 79,
    badge: 'fish',
    pointsEarned: 130,
    transcript: [
      { speaker: 'AI', text: 'Explain the difference between supervised and unsupervised learning.' },
      { speaker: 'User', text: 'Supervised learning uses labeled data...' },
    ],
    feedback: {
      strengths: ['Good understanding of concepts'],
      weaknesses: ['Could improve on practical examples'],
      improvements: ['Study more real-world ML applications'],
    },
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({
    name: 'Alex Morgan',
    email: 'alex@example.com',
    points: 450,
    currentBadge: 'deer',
    totalInterviews: 12,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  });
  const [interviews, setInterviews] = useState<Interview[]>(sampleInterviews);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(null);

  const addInterview = (interview: Interview) => {
    setInterviews(prev => [interview, ...prev]);
    setUser(prev => ({
      ...prev,
      points: prev.points + interview.pointsEarned,
      totalInterviews: prev.totalInterviews + 1,
    }));
    
    // Check for badge unlocks
    const newPoints = user.points + interview.pointsEarned;
    badges.forEach(badge => {
      if (!badge.unlocked && newPoints >= badge.pointsRequired) {
        unlockBadge(badge.id);
        setUser(prev => ({ ...prev, currentBadge: badge.id }));
      }
    });
  };

  const unlockBadge = (badgeId: string) => {
    setBadges(prev =>
      prev.map(badge =>
        badge.id === badgeId ? { ...badge, unlocked: true } : badge
      )
    );
  };

  const login = (email: string, password: string) => {
    setIsAuthenticated(true);
  };

  const signup = (name: string, email: string, password: string) => {
    setUser(prev => ({ ...prev, name, email }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        interviews,
        addInterview,
        badges,
        unlockBadge,
        currentInterview,
        setCurrentInterview,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

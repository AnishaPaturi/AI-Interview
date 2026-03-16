import { Link, useLocation } from 'react-router';
import { Home, Video, Play, History, Award, Trophy, User, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useApp();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/interview-setup', icon: Video, label: 'Start Interview' },
    { path: '/practice', icon: Play, label: 'Practice Mode' },
    { path: '/history', icon: History, label: 'Interview History' },
    { path: '/badges', icon: Award, label: 'Badges & Achievements' },
    { path: '/leaderboard', icon: Trophy, label: 'Points & Leaderboard' },
    { path: '/profile', icon: User, label: 'Profile Settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0f0c29] via-[#1a1535] to-[#0f0c29] border-r border-purple-500/20">
      {/* Logo */}
      <div className="p-6 border-b border-purple-500/20">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#6a11cb] via-[#8a2be2] to-[#00c6ff] bg-clip-text text-transparent">
          AI Interview Pro
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#6a11cb]/20 to-[#00c6ff]/20 text-white border border-purple-500/50 shadow-lg shadow-purple-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-500/20">
        <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full border-2 border-purple-500"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{user.name}</div>
            <div className="text-xs text-purple-300">{user.points} points</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

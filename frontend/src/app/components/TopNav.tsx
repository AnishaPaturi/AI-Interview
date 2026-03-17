import { Bell, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopNav = () => {
  const { user, badges } = useApp();
  const currentBadge = badges.find(b => b.id === user.currentBadge);

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-[#0f0c29]/80 backdrop-blur-xl border-b border-purple-500/20 z-10">
      <div className="flex items-center justify-end gap-4 h-full px-6">
        {/* Points Counter */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-yellow-400">{user.points} Points</span>
        </div>

        {/* Badge Icon */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
          <Award className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">
            {currentBadge?.icon} {currentBadge?.name}
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-all">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#00c6ff] rounded-full animate-pulse"></span>
        </button>

        {/* User Profile */}
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-9 h-9 rounded-full border-2 border-purple-500"
        />
      </div>
    </div>
  );
};

const Trophy = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

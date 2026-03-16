import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { useApp } from '../context/AppContext';
import { Lock } from 'lucide-react';
import { motion } from 'motion/react';

export const Badges = () => {
  const { user, badges } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">
      <Sidebar />
      <TopNav />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Badges & Achievements</h1>
            <p className="text-gray-400">Unlock badges as you progress through your interview journey</p>
          </div>

          {/* Current Progress */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Your Progress</h2>
                <p className="text-sm text-gray-400">Current Badge: {badges.find(b => b.id === user.currentBadge)?.name}</p>
              </div>
              <div className="text-6xl">
                {badges.find(b => b.id === user.currentBadge)?.icon}
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(user.points / 2500) * 100}%` }}
                className="h-full bg-gradient-to-r from-[#6a11cb] to-[#00c6ff]"
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>{user.points} points</span>
              <span>2500 points (Max)</span>
            </div>
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border-2 transition-all ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-gray-700/30'
                }`}
              >
                {/* Lock Overlay for Locked Badges */}
                {!badge.unlocked && (
                  <div className="absolute inset-0 backdrop-blur-sm bg-black/40 rounded-xl flex items-center justify-center">
                    <Lock className="w-12 h-12 text-gray-500" />
                  </div>
                )}

                <div className="text-center">
                  <div className={`text-6xl mb-3 ${!badge.unlocked && 'grayscale opacity-30'}`}>
                    {badge.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${badge.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {badge.name}
                  </h3>
                  <p className={`text-sm mb-4 ${badge.unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                    {badge.pointsRequired} points required
                  </p>
                  {badge.unlocked ? (
                    <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs text-green-400">
                      ✓ Unlocked
                    </div>
                  ) : (
                    <div className="inline-block px-3 py-1 bg-gray-700/20 border border-gray-700/50 rounded-full text-xs text-gray-500">
                      {badge.pointsRequired - user.points} points needed
                    </div>
                  )}
                </div>

                {/* Glow Effect for Unlocked Badges */}
                {badge.unlocked && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl -z-10"></div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Badge Hierarchy Info */}
          <div className="mt-8 bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Badge Hierarchy</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                <div className="text-3xl">🌱</div>
                <div className="flex-1">
                  <div className="text-white font-medium">Seed (Beginner)</div>
                  <div className="text-sm text-gray-400">Starting your journey - 0 points</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                <div className="text-3xl">🐟</div>
                <div className="flex-1">
                  <div className="text-white font-medium">Fish</div>
                  <div className="text-sm text-gray-400">Getting comfortable - 100 points</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                <div className="text-3xl">🦌</div>
                <div className="flex-1">
                  <div className="text-white font-medium">Deer</div>
                  <div className="text-sm text-gray-400">Building confidence - 300 points</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                <div className="text-3xl">🐺</div>
                <div className="flex-1">
                  <div className="text-white font-medium">Wolf</div>
                  <div className="text-sm text-gray-400">Showing strength - 600 points</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                <div className="text-3xl">🦅</div>
                <div className="flex-1">
                  <div className="text-white font-medium">Eagle</div>
                  <div className="text-sm text-gray-400">Soaring high - 1000 points</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                <div className="text-3xl">🐅</div>
                <div className="flex-1">
                  <div className="text-white font-medium">Tiger</div>
                  <div className="text-sm text-gray-400">Master level - 1500 points</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
                <div className="text-3xl">🐉</div>
                <div className="flex-1">
                  <div className="text-white font-medium">Dragon (Elite)</div>
                  <div className="text-sm text-purple-400">Ultimate achievement - 2500 points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

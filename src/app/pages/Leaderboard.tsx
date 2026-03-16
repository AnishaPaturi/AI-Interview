import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Trophy, Medal, TrendingUp } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Sarah Chen', points: 2850, badge: '🐉', interviews: 28, accuracy: 94, streak: 15 },
  { rank: 2, name: 'Marcus Lee', points: 2340, badge: '🐅', interviews: 24, accuracy: 91, streak: 12 },
  { rank: 3, name: 'Elena Rodriguez', points: 1820, badge: '🐅', interviews: 22, accuracy: 88, streak: 10 },
  { rank: 4, name: 'Yuki Tanaka', points: 1450, badge: '🦅', interviews: 18, accuracy: 87, streak: 8 },
  { rank: 5, name: 'Omar Hassan', points: 1120, badge: '🦅', interviews: 16, accuracy: 85, streak: 7 },
  { rank: 6, name: 'Alex Morgan', points: 450, badge: '🦌', interviews: 12, accuracy: 84, streak: 5, isCurrentUser: true },
  { rank: 7, name: 'Emma Wilson', points: 380, badge: '🦌', interviews: 10, accuracy: 82, streak: 4 },
  { rank: 8, name: 'James Park', points: 290, badge: '🐟', interviews: 8, accuracy: 80, streak: 3 },
  { rank: 9, name: 'Lisa Zhang', points: 220, badge: '🐟', interviews: 7, accuracy: 78, streak: 2 },
  { rank: 10, name: 'David Kim', points: 150, badge: '🐟', interviews: 5, accuracy: 75, streak: 2 },
];

export const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">
      <Sidebar />
      <TopNav />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Global Leaderboard</h1>
            <p className="text-gray-400">Compete with others and climb the ranks</p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <div className="bg-gradient-to-br from-gray-400/10 to-gray-500/10 border border-gray-400/30 rounded-xl p-6 text-center mt-8">
              <div className="text-5xl mb-3">🥈</div>
              <div className="text-3xl mb-2">{leaderboardData[1].badge}</div>
              <h3 className="text-lg font-semibold text-white mb-1">{leaderboardData[1].name}</h3>
              <div className="text-2xl font-bold text-gray-300 mb-1">{leaderboardData[1].points}</div>
              <div className="text-xs text-gray-500">points</div>
            </div>

            {/* 1st Place */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500/50 rounded-xl p-6 text-center shadow-lg shadow-yellow-500/20">
              <div className="text-6xl mb-3">🥇</div>
              <div className="text-4xl mb-2">{leaderboardData[0].badge}</div>
              <h3 className="text-xl font-semibold text-white mb-1">{leaderboardData[0].name}</h3>
              <div className="text-3xl font-bold text-yellow-400 mb-1">{leaderboardData[0].points}</div>
              <div className="text-sm text-yellow-500">points</div>
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mt-3" />
            </div>

            {/* 3rd Place */}
            <div className="bg-gradient-to-br from-amber-700/10 to-orange-700/10 border border-amber-700/30 rounded-xl p-6 text-center mt-8">
              <div className="text-5xl mb-3">🥉</div>
              <div className="text-3xl mb-2">{leaderboardData[2].badge}</div>
              <h3 className="text-lg font-semibold text-white mb-1">{leaderboardData[2].name}</h3>
              <div className="text-2xl font-bold text-amber-600 mb-1">{leaderboardData[2].points}</div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>

          {/* Full Leaderboard Table */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-purple-500/20">
              <h2 className="text-xl font-semibold text-white">Full Rankings</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20 bg-white/5">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Badge</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Points</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Interviews</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Accuracy</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((user) => (
                    <tr
                      key={user.rank}
                      className={`border-b border-purple-500/10 transition-all ${
                        user.isCurrentUser
                          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-y-2 border-purple-500/50'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                          user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                          user.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                          user.rank === 3 ? 'bg-amber-700/20 text-amber-600' :
                          'bg-white/10 text-gray-400'
                        }`}>
                          {user.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border-2 border-purple-500"
                          />
                          <div>
                            <div className={`font-medium ${user.isCurrentUser ? 'text-white' : 'text-gray-200'}`}>
                              {user.name} {user.isCurrentUser && '(You)'}
                            </div>
                            {user.rank <= 3 && (
                              <div className="flex items-center gap-1 text-xs text-yellow-500">
                                <Medal className="w-3 h-3" />
                                Top Performer
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-3xl">{user.badge}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="font-bold text-white">{user.points}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{user.interviews}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-white/10 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${user.accuracy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-white">{user.accuracy}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-sm text-orange-400 w-fit">
                          🔥 {user.streak}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Your Global Rank</div>
              <div className="text-2xl font-bold text-white">#6</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Points to Next Rank</div>
              <div className="text-2xl font-bold text-white">670</div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">Your Percentile</div>
              <div className="text-2xl font-bold text-white">Top 40%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { useApp } from '../context/AppContext';
import { Calendar, TrendingUp, Award, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';

export const History = () => {
  const { interviews } = useApp();
  const navigate = useNavigate();

  const viewDetails = (interviewId: string) => {
    navigate('/interview-feedback');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">
      <Sidebar />
      <TopNav />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Interview History</h1>
            <p className="text-gray-400">Review your past interviews and track progress</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Total Interviews</div>
                  <div className="text-3xl font-bold text-white">{interviews.length}</div>
                </div>
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Average Score</div>
                  <div className="text-3xl font-bold text-white">
                    {Math.round(interviews.reduce((sum, i) => sum + i.score, 0) / interviews.length)}
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Total Points Earned</div>
                  <div className="text-3xl font-bold text-white">
                    {interviews.reduce((sum, i) => sum + i.pointsEarned, 0)}
                  </div>
                </div>
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Interview List */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Topic</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Badge Earned</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Points</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((interview) => (
                    <tr
                      key={interview.id}
                      className="border-b border-purple-500/10 hover:bg-white/5 transition-all"
                    >
                      <td className="px-6 py-4 text-sm text-white">
                        {new Date(interview.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{interview.topic}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{interview.role}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-white/10 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                interview.score >= 80
                                  ? 'bg-green-500'
                                  : interview.score >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${interview.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-white">{interview.score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-2xl">{interview.badge === 'deer' ? '🦌' : '🐟'}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-400">
                          +{interview.pointsEarned}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => viewDetails(interview.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-400 hover:bg-purple-500/30 transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

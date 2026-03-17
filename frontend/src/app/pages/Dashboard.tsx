import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { useApp } from '../context/AppContext';
import { TrendingUp, Target, Award, Zap, Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const Dashboard = () => {

  const { user, interviews, badges } = useApp();

  /* -------------------- DYNAMIC CHART DATA -------------------- */

  const performanceData = interviews.map((interview) => ({
    date: new Date(interview.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    }),
    score: interview.accuracy
  }));

  const pointsData = interviews.map((interview, index) => ({
    date: `Interview ${index + 1}`,
    points: interview.pointsEarned ?? interview.points ?? 0
  }));

  const topicScores: Record<string, { total: number; count: number }> = {};

  interviews.forEach((interview) => {
    const topic = interview.topic || "General";

    if (!topicScores[topic]) {
      topicScores[topic] = { total: 0, count: 0 };
    }

    topicScores[topic].total += interview.accuracy;
    topicScores[topic].count += 1;
  });

  const topicMasteryData = Object.keys(topicScores).map((topic) => ({
    topic,
    score: Math.round(topicScores[topic].total / topicScores[topic].count)
  }));

  const leaderboardData = [
    {
      rank: 1,
      name: user?.name || "You",
      points: interviews.reduce(
        (sum, i) => sum + (i.pointsEarned ?? i.points ?? 0),
        0
      ),
      badge: "🏆",
      isCurrentUser: true
    }
  ];

  /* -------------------- USER STATS -------------------- */

  const currentBadge = badges.find(b => b.id === user.currentBadge);
  const nextBadge = badges.find(b => !b.unlocked && b.pointsRequired > user.points);

  const totalInterviews = interviews.length;

  const avgAccuracy =
    interviews.length > 0
      ? Math.round(
          interviews.reduce((sum, i) => sum + i.accuracy, 0) /
          interviews.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">
      <Sidebar />
      <TopNav />

      <div className="ml-64 pt-16 p-8">

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-400">
            Track your progress and continue your interview journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Total Points */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-yellow-400" />
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{user.points}</div>
                <div className="text-xs text-yellow-400">Total Points</div>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              {nextBadge
                ? `${nextBadge.pointsRequired - user.points} to ${nextBadge.icon} ${nextBadge.name}`
                : "Max level reached!"}
            </div>
          </div>

          {/* Current Badge */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-purple-400" />
              <div className="text-right">
                <div className="text-3xl">{currentBadge?.icon}</div>
                <div className="text-xs text-purple-400">Current Badge</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">{currentBadge?.name} Level</div>
          </div>

          {/* Interviews Completed */}
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-blue-400" />
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{totalInterviews}</div>
                <div className="text-xs text-blue-400">Interviews</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">Total Completed</div>
          </div>

          {/* Accuracy */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{avgAccuracy}%</div>
                <div className="text-xs text-green-400">Accuracy</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">Average Score</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Performance */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Interview Performance
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8a2be2"
                  fill="#8a2be2"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Points */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Points Progression
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={pointsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#00c6ff"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Topic Radar */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Topic Mastery
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={topicMasteryData}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="topic" stroke="#9ca3af" />
                <PolarRadiusAxis stroke="#9ca3af" />

                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#8a2be2"
                  fill="#8a2be2"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Download, Share2, RotateCcw, TrendingUp } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const performanceData = [
  { metric: 'Accuracy', score: 85 },
  { metric: 'Confidence', score: 82 },
  { metric: 'Communication', score: 88 },
  { metric: 'Technical Depth', score: 78 },
  { metric: 'Problem Solving', score: 80 },
];

const answerQuality = [
  { question: 'Q1', quality: 85 },
  { question: 'Q2', quality: 78 },
  { question: 'Q3', quality: 92 },
  { question: 'Q4', quality: 75 },
];

export const InterviewResults = () => {
  const navigate = useNavigate();
  const pointsEarned = 150; // 100 base + 50 bonus
  const correctAnswers = 5;

  useEffect(() => {
    // Celebrate with confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const downloadTranscript = () => {
    // Simulate download
    alert('Transcript download started!');
  };

  const shareResults = () => {
    // Simulate share
    alert('Share your results on social media!');
  };

  const viewFeedback = () => {
    navigate('/interview-feedback');
  };

  const retryInterview = () => {
    navigate('/interview-setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">
      <Sidebar />
      <TopNav />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Success Banner */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-8 mb-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Interview Completed!</h1>
            <p className="text-green-400">Great job! You've earned valuable points and insights.</p>
          </motion.div>

          {/* Points Earned */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-6 text-center"
            >
              <div className="text-5xl font-bold text-yellow-400 mb-2">{pointsEarned}</div>
              <div className="text-sm text-gray-400">Points Earned</div>
              <div className="text-xs text-yellow-500 mt-1">
                Base: 100 + Bonus: 50
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 text-center"
            >
              <div className="text-5xl font-bold text-blue-400 mb-2">{correctAnswers}</div>
              <div className="text-sm text-gray-400">Correct Answers</div>
              <div className="text-xs text-blue-500 mt-1">
                +10 points each
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center"
            >
              <div className="text-5xl mb-2">🦌</div>
              <div className="text-sm text-gray-400">Badge Progress</div>
              <div className="text-xs text-purple-400 mt-1">
                150 more points to 🐺 Wolf
              </div>
            </motion.div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Overall Performance */}
            <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Performance Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="#ffffff20" />
                  <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
                  <PolarRadiusAxis stroke="#9ca3af" />
                  <Radar name="Score" dataKey="score" stroke="#8a2be2" fill="#8a2be2" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Answer Quality */}
            <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Answer Quality</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={answerQuality}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="question" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1535', border: '1px solid #6a11cb' }}
                  />
                  <Bar dataKey="quality" fill="#00c6ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Detailed Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Accuracy Score</div>
                <div className="text-3xl font-bold text-green-400">85%</div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Confidence Score</div>
                <div className="text-3xl font-bold text-blue-400">82%</div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Communication Score</div>
                <div className="text-3xl font-bold text-purple-400">88%</div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={viewFeedback}
              className="py-3 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-lg font-medium text-white hover:shadow-lg transition-all"
            >
              View Detailed Feedback
            </button>

            <button
              onClick={downloadTranscript}
              className="py-3 bg-white/5 border border-purple-500/30 rounded-lg font-medium text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Transcript
            </button>

            <button
              onClick={shareResults}
              className="py-3 bg-white/5 border border-purple-500/30 rounded-lg font-medium text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Results
            </button>

            <button
              onClick={retryInterview}
              className="py-3 bg-white/5 border border-purple-500/30 rounded-lg font-medium text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retry Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

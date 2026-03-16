import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Clock, Zap, CheckCircle } from 'lucide-react';

const topics = ['Algorithms', 'System Design', 'Machine Learning', 'Databases', 'Networking'];

const quickQuestions = [
  'What is the time complexity of binary search?',
  'Explain the CAP theorem.',
  'What is overfitting in machine learning?',
  'Difference between SQL and NoSQL?',
  'What is a load balancer?',
];

export const Practice = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(30);
  const [answeredCount, setAnsweredCount] = useState(0);

  const startPractice = () => {
    if (selectedTopic) {
      setIsActive(true);
      setCurrentQuestion(0);
      setAnsweredCount(0);
    }
  };

  const nextQuestion = () => {
    setAnsweredCount(prev => prev + 1);
    if (currentQuestion < quickQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">
      <Sidebar />
      <TopNav />
      
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Practice Mode</h1>
            <p className="text-gray-400">Quick fire interview practice - No scoring, just learning</p>
          </div>

          {!isActive ? (
            <>
              {/* Topic Selection */}
              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Select Topic</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTopic === topic
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-purple-500/30 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:text-white'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Practice Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">5</div>
                  <div className="text-sm text-gray-400">Quick Questions</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                  <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">30s</div>
                  <div className="text-sm text-gray-400">Per Question</div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">No</div>
                  <div className="text-sm text-gray-400">Scoring</div>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={startPractice}
                disabled={!selectedTopic}
                className="w-full py-4 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-xl font-bold text-lg text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Start Practice Session
              </button>
            </>
          ) : (
            <>
              {/* Practice Session */}
              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-400">
                    Question {currentQuestion + 1} of {quickQuestions.length}
                  </div>
                  <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 font-medium">
                    {selectedTopic}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {quickQuestions[currentQuestion]}
                  </h2>
                  <p className="text-gray-400">Think about your answer and practice explaining it clearly.</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                  <div
                    className="h-2 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / quickQuestions.length) * 100}%` }}
                  ></div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full py-3 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-lg font-medium text-white hover:shadow-lg transition-all"
                >
                  {currentQuestion < quickQuestions.length - 1 ? 'Next Question' : 'Finish Practice'}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{answeredCount}</div>
                  <div className="text-sm text-gray-400">Answered</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{quickQuestions.length - currentQuestion - 1}</div>
                  <div className="text-sm text-gray-400">Remaining</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

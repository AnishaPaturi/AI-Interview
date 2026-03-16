import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Mic, MicOff, Video, VideoOff, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AI_AVATAR = 'https://images.unsplash.com/photo-1648526605865-e39384690567?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGhvbG9ncmFwaGljJTIwYXZhdGFyJTIwYXNzaXN0YW50fGVufDF8fHx8MTc3MzY1MzEyNHww&ixlib=rb-4.1.0&q=80&w=1080';

const SAMPLE_QUESTIONS = [
  "Tell me about a challenging project you've worked on and how you overcame the obstacles.",
  "How would you design a URL shortener service?",
  "Explain the difference between supervised and unsupervised learning.",
  "What's your approach to handling tight deadlines?",
];

export const InterviewRoom = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(SAMPLE_QUESTIONS[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const [transcript, setTranscript] = useState<Array<{ speaker: string; text: string }>>([
    { speaker: 'AI', text: SAMPLE_QUESTIONS[0] },
  ]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tab visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
        setShowTabWarning(true);
        
        if (tabSwitchCount >= 2) {
          // Auto-terminate interview
          endInterview();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [tabSwitchCount]);

  // Simulate AI interaction
  useEffect(() => {
    if (isListening) {
      const timeout = setTimeout(() => {
        setIsListening(false);
        setIsAiThinking(true);
        setConfidenceLevel(Math.floor(Math.random() * 30) + 70);
        
        setTimeout(() => {
          setIsAiThinking(false);
          askFollowUp();
        }, 2000);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isListening]);

  const askFollowUp = () => {
    if (questionIndex < SAMPLE_QUESTIONS.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setCurrentQuestion(SAMPLE_QUESTIONS[nextIndex]);
      setTranscript(prev => [...prev, { speaker: 'AI', text: SAMPLE_QUESTIONS[nextIndex] }]);
    }
  };

  const simulateAnswer = () => {
    const answer = "This is a simulated user answer for demonstration purposes...";
    setTranscript(prev => [...prev, { speaker: 'User', text: answer }]);
    setIsListening(true);
  };

  const endInterview = () => {
    navigate('/interview-results');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">
      {/* Tab Warning Modal */}
      <AnimatePresence>
        {showTabWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500 rounded-xl p-8 max-w-md mx-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-bold text-white">Focus Lost!</h3>
              </div>
              <p className="text-gray-300 mb-2">
                Switching tabs will terminate the interview.
              </p>
              <p className="text-sm text-red-400 mb-6">
                Warning {tabSwitchCount}/3 - Interview will end on next tab switch.
              </p>
              <button
                onClick={() => setShowTabWarning(false)}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-medium text-white"
              >
                I Understand
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-screen">
        {/* Main Interview Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Panel - Current Question */}
          <div className="bg-white/5 backdrop-blur-xl border-b border-purple-500/20 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 animate-pulse"></div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Current Question</div>
                  <p className="text-lg text-white font-medium">{currentQuestion}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 p-4">
            {/* User Video */}
            <div className="relative bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isCameraOn ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-6xl">👤</div>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <VideoOff className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-sm">Camera Off</p>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur rounded-full text-sm text-white">
                You
              </div>
            </div>

            {/* AI Interviewer */}
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl overflow-hidden">
              <img
                src={AI_AVATAR}
                alt="AI Interviewer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur rounded-full text-sm text-white flex items-center gap-2">
                AI Interviewer
                {isAiThinking && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                  </motion.div>
                )}
              </div>
              
              {/* AI Status Indicators */}
              {isListening && (
                <div className="absolute top-4 right-4 px-3 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-sm text-green-400 flex items-center gap-2">
                  <div className="flex gap-1">
                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-1 bg-green-400 rounded-full" />
                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="w-1 bg-green-400 rounded-full" />
                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} className="w-1 bg-green-400 rounded-full" />
                  </div>
                  AI Listening...
                </div>
              )}
              
              {isAiThinking && (
                <div className="absolute top-4 right-4 px-3 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-sm text-purple-400">
                  AI analyzing response...
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white/5 backdrop-blur-xl border-t border-purple-500/20 p-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isRecording && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-red-400">Recording</span>
                  </div>
                )}
                <div className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-400">
                  {formatTime(timer)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-4 rounded-full transition-all ${
                    isMicOn
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  className={`p-4 rounded-full transition-all ${
                    isCameraOn
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={simulateAnswer}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-medium text-white hover:shadow-lg transition-all"
                >
                  Simulate Answer
                </button>
                
                <button
                  onClick={endInterview}
                  className="p-4 bg-red-500/20 hover:bg-red-500/30 rounded-full text-red-400 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {confidenceLevel > 0 && (
                <div className="px-3 py-2 bg-white/5 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Confidence</div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${confidenceLevel}%` }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      />
                    </div>
                    <span className="text-xs text-white">{confidenceLevel}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Transcript Panel */}
        <div className="w-96 bg-white/5 backdrop-blur-xl border-l border-purple-500/20 flex flex-col">
          <div className="p-4 border-b border-purple-500/20">
            <h3 className="text-lg font-semibold text-white">Live Transcript</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {transcript.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg ${
                  entry.speaker === 'AI'
                    ? 'bg-purple-500/10 border border-purple-500/30'
                    : 'bg-blue-500/10 border border-blue-500/30'
                }`}
              >
                <div className="text-xs font-semibold mb-1 text-gray-400">{entry.speaker}</div>
                <p className="text-sm text-white">{entry.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

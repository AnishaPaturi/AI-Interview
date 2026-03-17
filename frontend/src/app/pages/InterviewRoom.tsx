import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Mic, MicOff, Video, VideoOff, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InterviewRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { role, topics } = location.state || {};

  // STATES
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState(0);

  const [transcript, setTranscript] = useState<Array<{ speaker: string; text: string }>>([]);

  // AVATAR COMPONENT
  const Avatar = ({ name, type = 'ai' }: { name: string; type?: 'ai' | 'user' }) => {
    const initials = name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase();

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold ${
            type === 'ai'
              ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
              : 'bg-white/10 text-white border border-purple-400'
          }`}
        >
          {initials}
        </div>
        <p className="mt-3 text-sm text-gray-300">{name}</p>
      </div>
    );
  };

  // ⏱ TIMER
  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // ⚠️ TAB SWITCH DETECTION
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
        setShowTabWarning(true);

        if (tabSwitchCount >= 2) {
          endInterview();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [tabSwitchCount]);

  // 🔥 FETCH QUESTIONS (DYNAMIC)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/practice/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: role || 'Software Engineer',
            topics: topics || ['DSA', 'System Design']
          })
        });

        const data = await res.json();

        if (data.questions?.length > 0) {
          setQuestions(data.questions);
          setCurrentQuestion(data.questions[0]);

          setTranscript([{ speaker: 'AI', text: data.questions[0] }]);
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    fetchQuestions();
  }, []);

  // 🤖 AI RESPONSE FLOW
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

  // 🔁 FOLLOW-UP QUESTIONS
  const askFollowUp = async () => {
    try {
      const lastAnswer = transcript[transcript.length - 1]?.text;

      const res = await fetch('http://localhost:5000/api/practice/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion,
          answer: lastAnswer
        })
      });

      const data = await res.json();

      if (data.followUp) {
        setCurrentQuestion(data.followUp);
        setTranscript(prev => [...prev, { speaker: 'AI', text: data.followUp }]);
      }

    } catch (err) {
      console.error('Follow-up error:', err);
    }
  };

  // 🧪 SIMULATE ANSWER
  const simulateAnswer = () => {
    const answer = "This is a simulated user answer...";
    setTranscript(prev => [...prev, { speaker: 'User', text: answer }]);
    setIsListening(true);
  };

  const endInterview = () => navigate('/interview-results');

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">

      {/* ⚠️ TAB WARNING */}
      <AnimatePresence>
        {showTabWarning && (
          <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-8">
              <h3 className="text-white font-bold text-xl mb-2">Focus Lost!</h3>
              <p className="text-gray-300">Warning {tabSwitchCount}/3</p>
              <button onClick={() => setShowTabWarning(false)} className="mt-4 bg-red-500 px-4 py-2 rounded text-white">
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-screen">

        {/* LEFT */}
        <div className="flex-1 flex flex-col">

          {/* QUESTION */}
          <div className="p-6 border-b border-purple-500/20">
            <p className="text-gray-400 text-sm">Current Question</p>
            <p className="text-white text-lg">{currentQuestion}</p>
          </div>

          {/* VIDEO GRID */}
          <div className="flex-1 grid grid-cols-2 gap-4 p-4">

            {/* USER */}
            <div className="relative bg-white/5 rounded-xl flex items-center justify-center">
              {isCameraOn ? <Avatar name="You" type="user" /> : <VideoOff />}
            </div>

            {/* AI */}
            <div className="relative bg-white/5 rounded-xl flex items-center justify-center">
              <Avatar name="AI Interviewer" type="ai" />

              {isAiThinking && (
                <div className="absolute top-4 right-4 text-purple-400 text-sm">
                  Thinking...
                </div>
              )}
            </div>
          </div>

          {/* CONTROLS */}
          <div className="p-4 flex justify-between items-center">

            <div>{formatTime(timer)}</div>

            <div className="flex gap-3">
              <button onClick={() => setIsMicOn(!isMicOn)}>
                {isMicOn ? <Mic /> : <MicOff />}
              </button>

              <button onClick={() => setIsCameraOn(!isCameraOn)}>
                {isCameraOn ? <Video /> : <VideoOff />}
              </button>

              <button onClick={simulateAnswer} className="bg-green-500 px-4 py-2 rounded text-white">
                Answer
              </button>

              <button onClick={endInterview} className="bg-red-500 px-4 py-2 rounded text-white">
                End
              </button>
            </div>

            {confidenceLevel > 0 && (
              <div className="text-white">{confidenceLevel}%</div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-96 border-l border-purple-500/20 p-4 overflow-y-auto">
          <h3 className="text-white mb-4">Transcript</h3>

          {transcript.map((t, i) => (
            <div key={i} className="mb-3">
              <div className="text-xs text-gray-400">{t.speaker}</div>
              <div className="text-white text-sm">{t.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
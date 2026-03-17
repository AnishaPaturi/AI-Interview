import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Mic, MicOff, Video, VideoOff, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InterviewRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, topics } = location.state || {};

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);

  // 🎤 Speech Recognition
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
  }

  // 🔊 AI Voice
  const speak = (text: string, callback?: () => void) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      callback && callback();
    };

    speechSynthesis.speak(utterance);
  };

  // 🎤 Start Listening
  const startListening = () => {
    if (!recognition || !isMicOn) return;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;

      setTranscript(prev => [...prev, { speaker: 'User', text: speechText }]);

      setIsListening(false);
      setIsAiThinking(true);

      generateFollowUp(speechText);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  // 🤖 Generate Follow-Up
  const generateFollowUp = async (answer: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/practice/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: currentQuestion, answer })
      });

      const data = await res.json();
      const nextQ = data.followUp;

      setCurrentQuestion(nextQ);
      setTranscript(prev => [...prev, { speaker: 'AI', text: nextQ }]);
      setIsAiThinking(false);

      // 🔥 Speak + loop
      speak(nextQ, () => {
        startListening();
      });

    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Fetch First Question
  useEffect(() => {
    const fetchQ = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/practice/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: role || 'Software Engineer',
            topics: topics || ['DSA']
          })
        });

        const data = await res.json();
        const firstQ = data.questions?.[0];

        if (firstQ) {
          setCurrentQuestion(firstQ);
          setTranscript([{ speaker: 'AI', text: firstQ }]);

          speak(firstQ, () => {
            startListening();
          });
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchQ();
  }, []);

  // ⏱ Timer
  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // ⚠️ Tab detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
        setShowTabWarning(true);

        if (tabSwitchCount >= 2) navigate('/interview-results');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [tabSwitchCount]);

  // 👤 Avatar
  const Avatar = ({ name }: { name: string }) => {
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase();

    return (
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl">
          {initials}
        </div>
        <p className="text-gray-300 mt-2">{name}</p>
      </div>
    );
  };

  const endInterview = () => navigate('/interview-results');

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white">

      {/* ⚠️ Warning */}
      <AnimatePresence>
        {showTabWarning && (
          <motion.div className="fixed inset-0 bg-black/80 flex justify-center items-center">
            <div className="bg-red-500 p-6 rounded">
              Tab switch detected ({tabSwitchCount}/3)
              <button onClick={() => setShowTabWarning(false)}>OK</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-screen">

        {/* LEFT */}
        <div className="flex-1 flex flex-col">

          {/* Question */}
          <div className="p-6 border-b">
            <p className="text-gray-400">Question</p>
            <p>{currentQuestion}</p>
          </div>

          {/* Video */}
          <div className="flex-1 grid grid-cols-2 gap-4 p-4">

            <div className="bg-white/5 flex items-center justify-center rounded">
              {isCameraOn ? <Avatar name="You" /> : <VideoOff />}
            </div>

            <div className="bg-white/5 flex items-center justify-center rounded">
              <Avatar name="AI Interviewer" />

              {isListening && (
                <div className="absolute top-4 right-4 text-green-400">
                  🎤 Listening...
                </div>
              )}

              {isAiThinking && (
                <div className="absolute top-4 right-4 text-purple-400">
                  🤖 Thinking...
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 flex justify-between">

            <div>{formatTime(timer)}</div>

            <div className="flex gap-3">
              <button onClick={() => setIsMicOn(!isMicOn)}>
                {isMicOn ? <Mic /> : <MicOff />}
              </button>

              <button onClick={() => setIsCameraOn(!isCameraOn)}>
                {isCameraOn ? <Video /> : <VideoOff />}
              </button>

              <button onClick={endInterview}>
                <X />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-80 border-l p-4 overflow-y-auto">
          <h3>Transcript</h3>

          {transcript.map((t, i) => (
            <div key={i}>
              <b>{t.speaker}:</b> {t.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
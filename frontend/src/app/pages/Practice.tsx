import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";
import { Clock, Zap, CheckCircle } from "lucide-react";

const topics = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Stacks",
  "Queues",
  "Hash Tables",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Binary Search",
  "Heap / Priority Queue",
  "Sliding Window",
  "Two Pointers",
  "Bit Manipulation",
  "System Design",
  "Databases",
  "Operating Systems",
  "Networking",
];

export const Practice = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestions = async (topic: string) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/practice/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API ERROR:", text);
        throw new Error("API failed");
      }

      const data = await res.json();

      setQuestions(data.questions);

    } catch (err) {
      console.error(err);
      alert("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  const startPractice = async () => {
    if (!selectedTopic) return;

    await generateQuestions(selectedTopic);

    setIsActive(true);
    setCurrentQuestion(0);
    setAnsweredCount(0);
    setAnswer("");
  };

  const nextQuestion = () => {
    setAnsweredCount((prev) => prev + 1);
    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
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
            <h1 className="text-3xl font-bold text-white mb-2">
              Practice Mode
            </h1>
            <p className="text-gray-400">
              Quick fire interview practice - AI generated questions
            </p>
          </div>

          {!isActive ? (
            <>
              {/* Topic Selection */}

              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Select Topic
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTopic === topic
                          ? "border-purple-500 bg-purple-500/20 text-white"
                          : "border-purple-500/30 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:text-white"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">
                    AI Generated
                  </div>
                  <div className="text-sm text-gray-400">Questions</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                  <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">
                    Unlimited
                  </div>
                  <div className="text-sm text-gray-400">Practice</div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">
                    No
                  </div>
                  <div className="text-sm text-gray-400">Scoring</div>
                </div>
              </div>

              {/* Start Button */}

              <button
                onClick={startPractice}
                disabled={!selectedTopic || loading}
                className="w-full py-4 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-xl font-bold text-lg text-white"
              >
                {loading ? "Generating Questions..." : "Start Practice"}
              </button>
            </>
          ) : (
            <>
              {/* Question */}

              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </div>

                  <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 font-medium">
                    {selectedTopic}
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-white mb-4">
                  {questions[currentQuestion]}
                </h2>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-4 bg-white/5 border border-purple-500/20 rounded-lg text-white mb-6"
                  rows={5}
                />

                {/* Progress */}

                <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                  <div
                    className="h-2 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-full"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full py-3 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-lg text-white"
                >
                  {currentQuestion < questions.length - 1
                    ? "Next Question"
                    : "Finish Practice"}
                </button>
              </div>

              {/* Stats */}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {answeredCount}
                  </div>
                  <div className="text-sm text-gray-400">Answered</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {questions.length - currentQuestion - 1}
                  </div>
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
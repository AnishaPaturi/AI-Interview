import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

const ROLES = ['Software Engineer', 'Data Scientist', 'Product Manager', 'Designer'];

const TOPIC_CATEGORIES = {
  "Core CS": ["DSA", "Operating Systems", "DBMS", "Computer Networks", "OOP", "System Design"],
  "Programming": ["Java", "Python", "C++", "Multithreading", "Debugging"],
  "Web Dev": ["HTML", "CSS", "JavaScript", "React", "Node.js", "APIs"],
  "Backend & DevOps": ["Microservices", "Docker", "Kubernetes", "CI/CD", "Caching", "Kafka"],
  "Data & AI": ["Machine Learning", "Deep Learning", "NLP", "Data Analysis"],
  "Databases": ["SQL", "MongoDB", "Indexing", "Query Optimization"],
  "Security": ["Cybersecurity", "Encryption", "Authentication"]
};

export const InterviewSetup = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [topicInput, setTopicInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; type: string }>>([]);

  // 🔥 Toggle topic (select/deselect)
  const toggleTopic = (topic: string) => {
    if (topics.includes(topic)) {
      setTopics(topics.filter(t => t !== topic));
    } else {
      if (topics.length >= 8) return; // optional limit
      setTopics([...topics, topic]);
    }
  };

  // ➕ Add custom topic
  const addTopic = () => {
    if (topicInput.trim() && !topics.includes(topicInput.trim())) {
      setTopics([...topics, topicInput.trim()]);
      setTopicInput('');
    }
  };

  // ❌ Remove topic
  const removeTopic = (topic: string) => {
    setTopics(topics.filter(t => t !== topic));
  };

  // 📂 File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map(f => ({ name: f.name, type: f.type }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter(f => f.name !== fileName));
  };

  // 🤖 Auto-select topics based on role (smart UX)
  useEffect(() => {
    if (selectedRole === "Software Engineer") {
      setTopics(["DSA", "System Design", "DBMS"]);
    }
    if (selectedRole === "Data Scientist") {
      setTopics(["Machine Learning", "Data Analysis", "Python"]);
    }
  }, [selectedRole]);

  // 🚀 Start Interview
  const startInterview = () => {
    navigate('/interview-room', {
      state: {
        role: selectedRole || customTopic,
        topics,
        files: uploadedFiles
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">
      <Sidebar />
      <TopNav />

      <div className="ml-64 pt-16 p-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Setup Your Interview</h1>
            <p className="text-gray-400">Configure your AI interview session</p>
          </div>

          {/* Interview Type */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Interview Type</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedRole === role
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'border-purple-500/30 bg-white/5 text-gray-400 hover:border-purple-500/50 hover:text-white'
                  }`}
                >
                  <div className="text-sm font-medium">{role}</div>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">Or enter a custom role</label>
              <input
                type="text"
                placeholder="e.g., Blockchain Developer"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white"
              />
            </div>
          </div>

          {/* 🔥 Topic Section (UPGRADED) */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Interview Topics</h2>

            {/* CATEGORY CHIPS */}
            <div className="space-y-6 mb-6">
              {Object.entries(TOPIC_CATEGORIES).map(([category, topicList]) => (
                <div key={category}>
                  <h3 className="text-sm text-purple-300 mb-2">{category}</h3>

                  <div className="flex flex-wrap gap-2">
                    {topicList.map((topic) => {
                      const isSelected = topics.includes(topic);

                      return (
                        <button
                          key={topic}
                          onClick={() => toggleTopic(topic)}
                          className={`px-3 py-2 rounded-full text-sm border transition-all ${
                            isSelected
                              ? 'bg-purple-500 text-white border-purple-500'
                              : 'bg-white/5 text-gray-400 border-purple-500/30 hover:border-purple-500 hover:text-white'
                          }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* CUSTOM INPUT */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add custom topic..."
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTopic()}
                className="flex-1 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white"
              />
              <button
                onClick={addTopic}
                className="px-6 py-3 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-lg text-white"
              >
                Add
              </button>
            </div>

            {/* SELECTED TOPICS */}
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-white"
                >
                  <span className="text-sm">{topic}</span>
                  <button onClick={() => removeTopic(topic)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {topics.length === 0 && (
                <p className="text-gray-500 text-sm">Select or add topics</p>
              )}
            </div>
          </div>

          {/* Upload */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Materials</h2>

            <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />

              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <p className="text-white">Click to upload</p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.name} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    {file.type.includes('pdf') ? (
                      <FileText className="w-5 h-5 text-red-400" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-blue-400" />
                    )}

                    <span className="flex-1 text-sm text-white">{file.name}</span>

                    <button onClick={() => removeFile(file.name)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Start Button */}
          <button
            onClick={startInterview}
            disabled={!selectedRole && !customTopic && topics.length === 0}
            className="w-full py-4 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-xl text-white font-bold"
          >
            Start Interview
          </button>

        </div>
      </div>
    </div>
  );
};
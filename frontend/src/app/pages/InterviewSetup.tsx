import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

const ROLES = ['Software Engineer', 'Data Scientist', 'Product Manager', 'Designer'];

export const InterviewSetup = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [topicInput, setTopicInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; type: string }>>([]);

  const addTopic = () => {
    if (topicInput.trim() && !topics.includes(topicInput.trim())) {
      setTopics([...topics, topicInput.trim()]);
      setTopicInput('');
    }
  };

  const removeTopic = (topic: string) => {
    setTopics(topics.filter(t => t !== topic));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map(f => ({ name: f.name, type: f.type }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter(f => f.name !== fileName));
  };

  const startInterview = () => {
    navigate('/interview-room');
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

          {/* Interview Type Selection */}
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
              <label className="block text-sm text-gray-400 mb-2">Or enter a custom topic</label>
              <input
                type="text"
                placeholder="e.g., Blockchain Developer"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
          </div>

          {/* Topic Tags */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Interview Topics</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add topic (e.g., System Design, Algorithms)"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTopic()}
                className="flex-1 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <button
                onClick={addTopic}
                className="px-6 py-3 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-lg font-medium text-white hover:shadow-lg transition-all"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-white"
                >
                  <span className="text-sm">{topic}</span>
                  <button
                    onClick={() => removeTopic(topic)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {topics.length === 0 && (
                <p className="text-gray-500 text-sm">Add topics to customize your interview questions</p>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Materials</h2>
            <p className="text-sm text-gray-400 mb-4">
              Upload your resume, lecture notes, or project documents. AI will generate questions based on your content.
            </p>
            
            <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center hover:border-purple-500/50 transition-all cursor-pointer">
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
                <p className="text-white font-medium mb-1">Click to upload files</p>
                <p className="text-sm text-gray-400">PDF, JPEG, or PNG (Max 10MB)</p>
              </label>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-purple-500/20 rounded-lg"
                  >
                    {file.type.includes('pdf') ? (
                      <FileText className="w-5 h-5 text-red-400" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-blue-400" />
                    )}
                    <span className="flex-1 text-sm text-white truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(file.name)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Start Interview Button */}
          <button
            onClick={startInterview}
            disabled={!selectedRole && !customTopic}
            className="w-full py-4 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-xl font-bold text-lg text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};

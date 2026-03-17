import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { useApp } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Mail, MapPin, Briefcase, Edit } from 'lucide-react';

export const Profile = () => {

  const { user, setUser, interviews, badges, logout } = useApp();
  const currentBadge = badges.find(b => b.id === user.currentBadge);

  /* ---------------- DYNAMIC STATS ---------------- */

  const avgAccuracy =
    interviews.length > 0
      ? Math.round(
          interviews.reduce((sum, i) => sum + i.accuracy, 0) /
          interviews.length
        )
      : 0;

  const pointsHistory = interviews.map((interview, index) => ({
    month: `Interview ${index + 1}`,
    points: interview.pointsEarned
  }));

  /* ---------------- BUTTON HANDLERS ---------------- */

  const handleEditProfile = () => {
    const newName = prompt("Enter new username");

    if (!newName) return;

    const updatedUser = {
      ...user,
      name: newName,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newName}`
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleChangePassword = () => {
    const password = prompt("Enter your new password");

    if (password) {
      alert("Password updated successfully");
    }
  };

  const handleNotifications = () => {
    alert("Notification settings coming soon.");
  };

  const handlePrivacy = () => {
    alert("Privacy settings coming soon.");
  };

  const handleDeleteAccount = () => {

    const confirmDelete = confirm("Are you sure you want to delete your account?");

    if (!confirmDelete) return;

    localStorage.removeItem("user");
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0f0c29]">
      <Sidebar />
      <TopNav />

      <div className="ml-64 pt-16 p-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-gray-400">Manage your account and view statistics</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">

                <div className="text-center mb-6">

                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-purple-500 mx-auto mb-4"
                  />

                  <h2 className="text-xl font-semibold text-white mb-1">{user.name}</h2>

                  <p className="text-sm text-gray-400">{user.email}</p>

                </div>

                <div className="space-y-3 mb-6">

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm text-white">{user.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">Current Badge</div>
                      <div className="text-sm text-white">
                        {currentBadge?.icon} {currentBadge?.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">Member Since</div>
                      <div className="text-sm text-white">January 2026</div>
                    </div>
                  </div>

                </div>

                {/* EDIT PROFILE BUTTON */}

                <button
                  onClick={handleEditProfile}
                  className="w-full py-3 bg-gradient-to-r from-[#6a11cb] to-[#00c6ff] rounded-lg font-medium text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>

              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {/* STATS */}

              <div className="grid grid-cols-3 gap-4">

                <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-400">{user.points}</div>
                  <div className="text-sm text-gray-400 mt-1">Total Points</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400">{user.totalInterviews}</div>
                  <div className="text-sm text-gray-400 mt-1">Interviews</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400">{avgAccuracy}%</div>
                  <div className="text-sm text-gray-400 mt-1">Avg Accuracy</div>
                </div>

              </div>

              {/* GRAPH */}

              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">

                <h3 className="text-lg font-semibold text-white mb-4">
                  Points History
                </h3>

                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={pointsHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Line type="monotone" dataKey="points" stroke="#00c6ff" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>

              </div>

              {/* RECENT ACTIVITY */}

              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">

                <h3 className="text-lg font-semibold text-white mb-4">
                  Recent Activity
                </h3>

                <div className="space-y-3">

                  {interviews.slice(0, 5).map((interview) => (

                    <div key={interview.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">

                      <div className="w-10 h-10 flex items-center justify-center bg-purple-500/20 rounded-lg text-xl">
                        📝
                      </div>

                      <div className="flex-1">

                        <div className="text-sm text-white font-medium">
                          {interview.topic}
                        </div>

                        <div className="text-xs text-gray-400">
                          {new Date(interview.date).toLocaleDateString()} • Score: {interview.score}
                        </div>

                      </div>

                      <div className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-400">
                        +{interview.pointsEarned}
                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* ACCOUNT SETTINGS */}

              <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">

                <h3 className="text-lg font-semibold text-white mb-4">
                  Account Settings
                </h3>

                <div className="space-y-3">

                  <button
                    onClick={handleChangePassword}
                    className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all"
                  >
                    Change Password
                  </button>

                  <button
                    onClick={handleNotifications}
                    className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all"
                  >
                    Notification Settings
                  </button>

                  <button
                    onClick={handlePrivacy}
                    className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all"
                  >
                    Privacy Settings
                  </button>

                  <button
                    onClick={handleDeleteAccount}
                    className="w-full text-left px-4 py-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-all"
                  >
                    Delete Account
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
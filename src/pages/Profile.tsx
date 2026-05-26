import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  User,
  Camera,
  Save,
  Mail,
  Globe,
  Clock,
  Target,
  Zap,
  Flame,
  Trophy,
  Timer,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getInitials } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const GOALS_OPTIONS = [
  "Improve focus and concentration",
  "Build consistent daily habits",
  "Increase work output and quality",
  "Reduce distractions and interruptions",
  "Achieve work-life balance",
  "Manage stress and prevent burnout",
  "Improve time management",
  "Complete a major project",
];

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    timezone: user?.timezone || "America/New_York",
    bio: "Product manager by day, productivity nerd by night. Passionate about deep work and building sustainable habits.",
    goals: user?.goals || [],
  });

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSaving(false);
    toast.success("Profile updated successfully!");
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground">Profile</span>
          </nav>
          <h1 className="font-display text-3xl font-bold text-foreground">Your Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information and productivity goals.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Avatar Card */}
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="relative inline-block mb-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                  />
                ) : (
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(user.name)}
                  </div>
                )}
                <button
                  onClick={() => toast.info("Photo upload coming soon!")}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors border-2 border-card"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="font-semibold text-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full capitalize">
                {user.role} Plan
              </span>
            </div>

            {/* Achievement Stats */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Performance Stats</h3>
              <div className="space-y-3">
                {[
                  { icon: Flame, label: "Current Streak", value: `${user.currentStreak} days`, color: "text-orange-500" },
                  { icon: Timer, label: "Total Focus Hours", value: `${user.totalFocusHours}h`, color: "text-blue-600" },
                  { icon: Zap, label: "Experience Points", value: `${user.xp.toLocaleString()} XP`, color: "text-yellow-500" },
                  { icon: Trophy, label: "Current Level", value: `Level ${user.level}`, color: "text-purple-500" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${color}`} />
                      <span className="text-sm text-muted-foreground">{label}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Basic Info */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-base font-semibold text-foreground mb-5">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Timezone</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      className="input-field pl-10 cursor-pointer"
                    >
                      {[
                        "America/New_York",
                        "America/Los_Angeles",
                        "America/Chicago",
                        "Europe/London",
                        "Europe/Paris",
                        "Asia/Tokyo",
                        "Asia/Singapore",
                        "Australia/Sydney",
                      ].map((tz) => (
                        <option key={tz} value={tz}>{tz.replace("_", " ")}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-semibold text-foreground">Productivity Goals</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                Select the goals you want to achieve with ForceFocus. This helps the AI personalize your experience.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {GOALS_OPTIONS.map((goal) => {
                  const isSelected = formData.goals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`text-left p-3.5 rounded-xl border text-sm transition-all duration-200 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-foreground font-medium"
                          : "border-border hover:border-blue-300 dark:hover:border-blue-700 text-muted-foreground"
                      }`}
                    >
                      <span className="mr-2">{isSelected ? "✓" : "○"}</span>
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary flex items-center gap-2 disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

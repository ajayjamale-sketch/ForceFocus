import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FocusTimer from "@/components/features/FocusTimer";
import { Flame, Music, Shield, Brain, Clock, Target, Plus } from "lucide-react";
import { toast } from "sonner";

interface Session {
  id: string;
  task: string;
  duration: number; // in minutes
  type: string;
  score: number;
  ago: string; // relative time, we'll store timestamp and compute on render
  timestamp: number;
}

export default function FocusPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Toggle states for focus features
  const [features, setFeatures] = useState({
    distractionBlock: true,
    focusMusic: true,
    aiCoaching: true,
    autoBreak: false,
    taskLinked: true,
    streakMode: true,
  });

  // Stats
  const [focusMinutesToday, setFocusMinutesToday] = useState(0);
  const [sessionsCount, setSessionsCount] = useState(0);
  const [distractionsBlocked, setDistractionsBlocked] = useState(0);
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);

  // Compute focus score as average of last 5 session scores (or 0)
  const focusScore = recentSessions.length > 0
    ? Math.round(recentSessions.slice(0, 5).reduce((sum, s) => sum + s.score, 0) / Math.min(5, recentSessions.length))
    : 0;

  // Load stats from localStorage on mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const saved = localStorage.getItem("focusPageStats");
    if (saved) {
      const data = JSON.parse(saved);
      setFocusMinutesToday(data.focusMinutesToday || 0);
      setSessionsCount(data.sessionsCount || 0);
      setDistractionsBlocked(data.distractionsBlocked || 0);
      setRecentSessions(data.recentSessions || []);
      setFeatures(data.features || features);
    }
  }, [user, navigate]);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem("focusPageStats", JSON.stringify({
        focusMinutesToday,
        sessionsCount,
        distractionsBlocked,
        recentSessions,
        features,
      }));
    }
  }, [focusMinutesToday, sessionsCount, distractionsBlocked, recentSessions, features, user]);

  const handleToggleFeature = (feature: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
    toast.info(`${feature.replace(/([A-Z])/g, ' $1').trim()} ${!features[feature] ? "enabled" : "disabled"}`);
  };

  const handleSessionComplete = useCallback((type: string, durationMinutes: number, taskName?: string) => {
    // Generate a score based on duration and type (mock for demo)
    const baseScore = Math.min(100, 70 + Math.floor(durationMinutes / 10) * 5);
    const score = Math.min(100, baseScore + (features.aiCoaching ? 5 : 0) + (features.streakMode ? 3 : 0));
    
    const newSession: Session = {
      id: Date.now().toString(),
      task: taskName || (type === "Pomodoro" ? "Focus session" : "Deep work session"),
      duration: durationMinutes,
      type,
      score,
      timestamp: Date.now(),
      ago: "Just now",
    };

    setRecentSessions(prev => [newSession, ...prev].slice(0, 10)); // keep last 10
    setFocusMinutesToday(prev => prev + durationMinutes);
    setSessionsCount(prev => prev + 1);

    // Add XP or additional effects
    toast.success(`🎯 ${durationMinutes}min ${type} session completed! +${Math.floor(durationMinutes * 2)} XP`);
  }, [features.aiCoaching, features.streakMode]);

  const handleReportDistraction = () => {
    setDistractionsBlocked(prev => prev + 1);
    toast.warning("Distraction reported! Shield active.");
  };

  const formatRelativeTime = (timestamp: number): string => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Focus Session</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter deep work mode and eliminate distractions.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timer */}
          <div className="lg:col-span-1">
            <FocusTimer onSessionComplete={handleSessionComplete} />
          </div>

          {/* Settings & Stats */}
          <div className="lg:col-span-2 space-y-4">
            {/* Focus Mode Options */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-foreground">Session Settings</h3>
                <button
                  onClick={handleReportDistraction}
                  className="text-xs flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800"
                >
                  <Shield className="w-3 h-3" /> Report Distraction
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: "distractionBlock" as const, icon: Shield, label: "Distraction Block", color: "text-red-500" },
                  { key: "focusMusic" as const, icon: Music, label: "Focus Music", color: "text-blue-500" },
                  { key: "aiCoaching" as const, icon: Brain, label: "AI Coaching", color: "text-purple-500" },
                  { key: "autoBreak" as const, icon: Clock, label: "Auto-Break", color: "text-emerald-500" },
                  { key: "taskLinked" as const, icon: Target, label: "Task Linked", color: "text-orange-500" },
                  { key: "streakMode" as const, icon: Flame, label: "Streak Mode", color: "text-yellow-500" },
                ].map(({ key, icon: Icon, label, color }) => (
                  <button
                    key={key}
                    onClick={() => handleToggleFeature(key)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                      features[key]
                        ? "border-primary/30 bg-primary/5 text-foreground"
                        : "border-border bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${features[key] ? color : "text-muted-foreground"}`} />
                    <span className="truncate">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Session Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Today's Focus", value: `${Math.floor(focusMinutesToday / 60)}h ${focusMinutesToday % 60}m`, icon: "⏱" },
                { label: "Sessions Done", value: sessionsCount.toString(), icon: "✅" },
                { label: "Distractions Blocked", value: distractionsBlocked.toString(), icon: "🛡" },
                { label: "Focus Score", value: `${focusScore}/100`, icon: "⚡" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Sessions */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-foreground">Recent Sessions</h3>
                <button
                  onClick={() => {
                    // Demo: add a mock session for testing
                    handleSessionComplete("Demo", 15, "Test focus block");
                  }}
                  className="text-xs flex items-center gap-1 px-2 py-1 rounded-lg bg-muted hover:bg-muted/80"
                >
                  <Plus className="w-3 h-3" /> Add Sample
                </button>
              </div>
              <div className="space-y-2">
                {recentSessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No sessions yet. Start a timer above!</p>
                ) : (
                  recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/50 transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{session.task}</p>
                          <p className="text-xs text-muted-foreground">{session.type} • {formatRelativeTime(session.timestamp)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-sm font-medium text-foreground">{session.duration}min</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          session.score >= 90
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}>
                          {session.score}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
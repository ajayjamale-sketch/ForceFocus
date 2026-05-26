import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FocusTimer from "@/components/features/FocusTimer";
import { Flame, Music, Shield, Brain, Clock, Target } from "lucide-react";
import { toast } from "sonner";

const recentSessions = [
  { task: "Deep work: API design", duration: 25, type: "Pomodoro", score: 96, ago: "1h ago" },
  { task: "Code review sprint", duration: 50, type: "Deep Work", score: 88, ago: "3h ago" },
  { task: "Writing documentation", duration: 25, type: "Pomodoro", score: 92, ago: "Yesterday" },
  { task: "Strategic planning", duration: 90, type: "Deep Work", score: 85, ago: "Yesterday" },
];

export default function FocusPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleSessionComplete = (type: string, duration: number) => {
    toast.success(`🎯 ${Math.round(duration / 60)}min ${type} session completed! +50 XP`);
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
              <h3 className="text-base font-semibold text-foreground mb-4">Session Settings</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: Shield, label: "Distraction Block", active: true, color: "text-red-500" },
                  { icon: Music, label: "Focus Music", active: true, color: "text-blue-500" },
                  { icon: Brain, label: "AI Coaching", active: true, color: "text-purple-500" },
                  { icon: Clock, label: "Auto-Break", active: false, color: "text-emerald-500" },
                  { icon: Target, label: "Task Linked", active: true, color: "text-orange-500" },
                  { icon: Flame, label: "Streak Mode", active: true, color: "text-yellow-500" },
                ].map(({ icon: Icon, label, active, color }) => (
                  <button
                    key={label}
                    onClick={() => toast.info(`${label} ${active ? "disabled" : "enabled"}`)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                      active
                        ? "border-blue-500/30 bg-blue-50 dark:bg-blue-900/20 text-foreground"
                        : "border-border bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? color : "text-muted-foreground"}`} />
                    <span className="truncate">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Session Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Today's Focus", value: "2h 22m", icon: "⏱" },
                { label: "Sessions Done", value: "5", icon: "✅" },
                { label: "Distractions Blocked", value: "23", icon: "🛡" },
                { label: "Focus Score", value: "94/100", icon: "⚡" },
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
              <h3 className="text-base font-semibold text-foreground mb-4">Recent Sessions</h3>
              <div className="space-y-2">
                {recentSessions.map((session, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{session.task}</p>
                        <p className="text-xs text-muted-foreground">{session.type} • {session.ago}</p>
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Heart, Brain, Zap, Moon, Sun, Wind, Droplets, Battery, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle2, Activity, Coffee } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const wellnessMetrics = [
  { id: "energy", label: "Energy Level", value: 72, unit: "%", icon: Battery, color: "text-yellow-500", gradient: "from-yellow-400 to-yellow-600", trend: +5, desc: "Moderate energy. Consider a 10-min walk." },
  { id: "stress", label: "Stress Level", value: 38, unit: "%", icon: Brain, color: "text-red-500", gradient: "from-red-400 to-red-600", trend: -8, desc: "Stress is manageable. Keep breathing exercises." },
  { id: "focus", label: "Mental Clarity", value: 84, unit: "%", icon: Zap, color: "text-blue-500", gradient: "from-blue-400 to-blue-600", trend: +12, desc: "High clarity — great time for deep work." },
  { id: "recovery", label: "Recovery Score", value: 66, unit: "%", icon: Heart, color: "text-pink-500", gradient: "from-pink-400 to-pink-600", trend: -3, desc: "Average recovery. Prioritize sleep tonight." },
];

const weeklyData = [
  { day: "Mon", energy: 65, stress: 45, focus: 70 },
  { day: "Tue", energy: 78, stress: 38, focus: 82 },
  { day: "Wed", energy: 55, stress: 60, focus: 65 },
  { day: "Thu", energy: 80, stress: 30, focus: 88 },
  { day: "Fri", energy: 72, stress: 38, focus: 84 },
  { day: "Sat", energy: 88, stress: 22, focus: 75 },
  { day: "Sun", energy: 82, stress: 25, focus: 78 },
];

const recommendations = [
  { icon: Coffee, title: "Caffeine Timing", desc: "You've been consuming caffeine after 2 PM this week. This may be affecting your sleep quality and recovery scores.", action: "View sleep data", priority: "warning", color: "border-yellow-500/30 bg-yellow-50 dark:bg-yellow-900/10" },
  { icon: Wind, title: "Box Breathing Exercise", desc: "Your stress levels spike at 3 PM daily. A 5-minute box breathing session could reduce this by ~40% based on your patterns.", action: "Start now", priority: "tip", color: "border-blue-500/30 bg-blue-50 dark:bg-blue-900/10" },
  { icon: Moon, title: "Sleep Consistency", desc: "Your bedtime varied by 2.5 hours this week. Consistent sleep timing improves recovery by 23% and focus by 18%.", action: "Set sleep reminder", priority: "alert", color: "border-red-500/30 bg-red-50 dark:bg-red-900/10" },
  { icon: Activity, title: "Movement Break", desc: "You've been seated for 3h 20min. A 10-minute walk now will boost your afternoon focus and energy by 35%.", action: "Start timer", priority: "tip", color: "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-900/10" },
];

const wellnessLogs = [
  { time: "9:00 AM", event: "Completed morning meditation", type: "positive" },
  { time: "10:45 AM", event: "Focus session: 90min deep work", type: "positive" },
  { time: "12:30 PM", event: "Energy dip detected — lunch break taken", type: "neutral" },
  { time: "2:15 PM", event: "Stress spike detected after meeting", type: "warning" },
  { time: "3:00 PM", event: "Short walk completed", type: "positive" },
  { time: "4:30 PM", event: "Second focus session: 45min", type: "positive" },
];

export default function WellnessPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [energyChecked, setEnergyChecked] = useState(false);

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  const handleMoodLog = (rating: number) => {
    setMoodRating(rating);
    toast.success(`Mood logged: ${rating}/5. AI coach updated your wellness model.`);
  };

  const burnoutRisk = 28; // low

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Wellness & Recovery</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor your mental performance and prevent burnout.</p>
        </div>

        {/* Burnout Risk Banner */}
        <div className={cn("rounded-2xl p-5 flex items-start gap-4 border", burnoutRisk < 30 ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" : burnoutRisk < 60 ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800" : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800")}>
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", burnoutRisk < 30 ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-yellow-100")}>
            {burnoutRisk < 30 ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-yellow-600" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Burnout Risk: <span className={burnoutRisk < 30 ? "text-emerald-600" : "text-yellow-600"}>{burnoutRisk < 30 ? "Low" : burnoutRisk < 60 ? "Moderate" : "High"} ({burnoutRisk}%)</span></p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {burnoutRisk < 30
                ? "You're in excellent shape. Keep maintaining your current work-rest balance."
                : "Some signs of stress accumulation detected. Review recovery recommendations below."}
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-16 h-16 relative">
              <svg className="transform -rotate-90 w-16 h-16">
                <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
                <circle cx="32" cy="32" r="26" fill="none" stroke={burnoutRisk < 30 ? "#10B981" : "#F59E0B"} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 26}`} strokeDashoffset={`${2 * Math.PI * 26 * (1 - burnoutRisk / 100)}`} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">{burnoutRisk}%</span>
            </div>
          </div>
        </div>

        {/* Wellness Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wellnessMetrics.map(metric => {
            const Icon = metric.icon;
            const trendPositive = metric.trend > 0;
            return (
              <div key={metric.id} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center">
                    <Icon className={cn("w-4 h-4", metric.color)} />
                  </div>
                  <span className={cn("flex items-center gap-1 text-xs font-medium", trendPositive ? "text-emerald-600" : metric.trend < 0 && metric.id === "stress" ? "text-emerald-600" : "text-red-500")}>
                    {metric.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(metric.trend)}%
                  </span>
                </div>
                <p className="font-display text-3xl font-bold text-foreground mb-0.5">{metric.value}<span className="text-base text-muted-foreground">{metric.unit}</span></p>
                <p className="text-xs font-medium text-foreground mb-1">{metric.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{metric.desc}</p>
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", metric.gradient)} style={{ width: `${metric.value}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mood Check */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">How are you feeling right now?</h3>
          <p className="text-xs text-muted-foreground mb-4">Log your mood to help AI better understand your patterns.</p>
          <div className="flex gap-3">
            {[
              { rating: 1, emoji: "😔", label: "Rough" },
              { rating: 2, emoji: "😐", label: "Meh" },
              { rating: 3, emoji: "🙂", label: "Okay" },
              { rating: 4, emoji: "😊", label: "Good" },
              { rating: 5, emoji: "🚀", label: "Great" },
            ].map(m => (
              <button key={m.rating} onClick={() => handleMoodLog(m.rating)}
                className={cn("flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all duration-200",
                  moodRating === m.rating ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-border hover:border-blue-300 dark:hover:border-blue-700"
                )}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations + Log in 2 cols */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">AI Recommendations</h3>
            {recommendations.map(rec => {
              const Icon = rec.icon;
              return (
                <div key={rec.title} className={cn("rounded-xl border p-4", rec.color)}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white dark:bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground mb-0.5">{rec.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">{rec.desc}</p>
                      <button onClick={() => toast.info(`${rec.title}: ${rec.action}`)} className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        {rec.action} →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Daily Log */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Today's Wellness Log</h3>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {wellnessLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0">
                  <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", log.type === "positive" ? "bg-emerald-500" : log.type === "warning" ? "bg-orange-400" : "bg-gray-400")} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{log.event}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly trend mini chart */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">7-Day Wellness Trend</h3>
          <div className="flex items-end gap-2 h-24">
            {weeklyData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col gap-0.5 items-center justify-end" style={{ height: "80px" }}>
                  <div className="w-full bg-blue-500/80 rounded-sm transition-all" style={{ height: `${d.focus * 0.8}px` }} title={`Focus: ${d.focus}%`} />
                </div>
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-blue-500/80" /><span className="text-xs text-muted-foreground">Focus Score</span></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

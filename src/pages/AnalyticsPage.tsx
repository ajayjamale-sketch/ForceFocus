import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  FocusAreaChart,
  ProductivityBarChart,
  HabitCompletionChart,
  MonthlyTrendChart,
} from "@/components/features/ProductivityChart";
import StatsCard from "@/components/features/StatsCard";
import { Timer, TrendingUp, Target, Award, BarChart3, Brain } from "lucide-react";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState("7 Days");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Deep insights into your productivity patterns and performance trends.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 flex-wrap">
          {["Today", "7 Days", "30 Days", "90 Days", "Year"].map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activePeriod === period
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Focus Time" value="28.4h" subtitle="This week" trend={23} trendLabel="vs last week" icon={Timer} iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" accentColor="from-blue-600" />
          <StatsCard title="Productivity Score" value="91" subtitle="Weekly average" trend={8} trendLabel="vs last week" icon={TrendingUp} iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" accentColor="from-emerald-500" />
          <StatsCard title="Goals Achieved" value="4/6" subtitle="Active goals" icon={Target} iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" accentColor="from-purple-500" />
          <StatsCard title="XP Earned" value="1,240" subtitle="This week" trend={15} icon={Award} iconColor="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" accentColor="from-yellow-500" />
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <FocusAreaChart />
          <ProductivityBarChart />
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthlyTrendChart />
          </div>
          <HabitCompletionChart />
        </div>

        {/* AI Insights */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-base font-semibold text-foreground">AI Performance Insights</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Peak Performance Window",
                insight: "Your best focus hours are 9–11 AM. Schedule complex tasks here for maximum output.",
                type: "optimization",
                color: "border-blue-500/30 bg-blue-50 dark:bg-blue-900/10",
              },
              {
                title: "Distraction Pattern",
                insight: "You check social media most frequently between 2–3 PM. Consider blocking it during this window.",
                type: "warning",
                color: "border-orange-500/30 bg-orange-50 dark:bg-orange-900/10",
              },
              {
                title: "Streak at Risk",
                insight: "Your Wednesday focus sessions are consistently shorter. Pre-schedule your session to protect the streak.",
                type: "alert",
                color: "border-yellow-500/30 bg-yellow-50 dark:bg-yellow-900/10",
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-xl border p-4 ${item.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

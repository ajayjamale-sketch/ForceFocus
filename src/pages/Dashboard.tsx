import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Timer,
  Target,
  CheckSquare,
  TrendingUp,
  Flame,
  Trophy,
  Plus,
  ArrowRight,
  Play,
  Brain,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/features/StatsCard";
import {
  FocusAreaChart,
  ProductivityBarChart,
  HabitCompletionChart,
} from "@/components/features/ProductivityChart";
import { formatMinutes } from "@/lib/utils";

const mockTasks = [
  { id: "1", title: "Review Q2 performance report", priority: "high", status: "in-progress", dueDate: "Today" },
  { id: "2", title: "Prepare presentation slides", priority: "urgent", status: "todo", dueDate: "Today" },
  { id: "3", title: "Team standup call", priority: "medium", status: "completed", dueDate: "Done" },
  { id: "4", title: "Write blog post draft", priority: "low", status: "todo", dueDate: "Tomorrow" },
  { id: "5", title: "Code review for PR #247", priority: "high", status: "todo", dueDate: "Today" },
];

const mockHabits = [
  { id: "1", name: "Morning meditation", streak: 24, completed: true, icon: "🧘" },
  { id: "2", name: "Deep work session", streak: 18, completed: true, icon: "🎯" },
  { id: "3", name: "Evening review", streak: 12, completed: false, icon: "📝" },
  { id: "4", name: "No social media before 10am", streak: 7, completed: true, icon: "🚫" },
];

const priorityColors: Record<string, string> = {
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  urgent: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-muted rounded-xl" />
        <div className="w-16 h-5 bg-muted rounded-full" />
      </div>
      <div className="w-20 h-7 bg-muted rounded-lg mb-2" />
      <div className="w-28 h-4 bg-muted rounded-lg" />
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState(mockTasks);
  const [completedHabits, setCompletedHabits] = useState(
    mockHabits.filter((h) => h.completed).map((h) => h.id)
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "completed" ? "todo" : "completed" }
          : t
      )
    );
  };

  const toggleHabit = (id: string) => {
    setCompletedHabits((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  const completedTasksCount = tasks.filter((t) => t.status === "completed").length;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {greeting()}, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Link
            to="/dashboard/focus"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-premium hover:shadow-blue-glow hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4" />
            Start Focus Session
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <>
              <StatsCard
                title="Focus Today"
                value={formatMinutes(142)}
                subtitle="Goal: 4 hours"
                trend={12}
                trendLabel="vs yesterday"
                icon={Timer}
                iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                accentColor="from-blue-600"
              />
              <StatsCard
                title="Tasks Completed"
                value={`${completedTasksCount}/${tasks.length}`}
                subtitle="Today's tasks"
                trend={5}
                trendLabel="on track"
                icon={CheckSquare}
                iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                accentColor="from-emerald-500"
              />
              <StatsCard
                title="Current Streak"
                value={`${user.currentStreak}d`}
                subtitle="Keep it going!"
                icon={Flame}
                iconColor="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                accentColor="from-orange-500"
              />
              <StatsCard
                title="Productivity Score"
                value="94"
                subtitle="Out of 100"
                trend={8}
                trendLabel="vs last week"
                icon={TrendingUp}
                iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                accentColor="from-purple-500"
              />
            </>
          )}
        </div>

        {/* AI Coach Banner */}
        {!isLoading && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">AI Coach Insight</p>
              <p className="text-blue-100 text-sm mt-0.5 truncate">
                Your peak focus window is 9–11 AM. You have 47 minutes left — start your most complex task now.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/analytics")}
              className="flex-shrink-0 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-xl transition-colors duration-200"
            >
              View Insights
            </button>
          </div>
        )}

        {/* Charts Row */}
        {!isLoading && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FocusAreaChart />
            </div>
            <ProductivityBarChart />
          </div>
        )}

        {/* Tasks + Habits Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Tasks */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-semibold text-foreground">Today's Tasks</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {completedTasksCount}/{tasks.length} completed
                </p>
              </div>
              <Link
                to="/dashboard/tasks"
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(completedTasksCount / tasks.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {isLoading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted rounded-xl animate-pulse" />
                  ))
                : tasks.slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors duration-150 group cursor-pointer"
                      onClick={() => toggleTask(task.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          task.status === "completed"
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-border group-hover:border-blue-500"
                        }`}
                      >
                        {task.status === "completed" && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`flex-1 text-sm font-medium truncate transition-all duration-200 ${
                          task.status === "completed"
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {task.title}
                      </span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${priorityColors[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  ))}
            </div>

            <button
              onClick={() => navigate("/dashboard/tasks")}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border hover:border-blue-500 text-sm text-muted-foreground hover:text-blue-600 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add task
            </button>
          </div>

          {/* Habits + Habit Chart */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Today's Habits</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {completedHabits.length}/{mockHabits.length} completed
                  </p>
                </div>
                <Link
                  to="/dashboard/habits"
                  className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Manage <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {mockHabits.map((habit) => {
                  const isDone = completedHabits.includes(habit.id);
                  return (
                    <div
                      key={habit.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors duration-150 cursor-pointer"
                      onClick={() => toggleHabit(habit.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{habit.icon}</span>
                        <div>
                          <p className={`text-sm font-medium ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {habit.name}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Flame className="w-3 h-3 text-orange-400" />
                            <span className="text-xs text-muted-foreground">{habit.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          isDone ? "bg-emerald-500 border-emerald-500" : "border-border"
                        }`}
                      >
                        {isDone && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <HabitCompletionChart />
          </div>
        </div>

        {/* Quick Actions */}
        {!isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Timer, label: "Focus Session", href: "/dashboard/focus", color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" },
              { icon: Target, label: "Set Goal", href: "/dashboard/goals", color: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400" },
              { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400" },
              { icon: Trophy, label: "Achievements", href: "/dashboard/achievements", color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400" },
            ].map(({ icon: Icon, label, href, color }) => (
              <Link
                key={href}
                to={href}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border card-hover transition-all duration-200 ${color}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

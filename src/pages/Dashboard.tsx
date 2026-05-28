import { useEffect, useMemo, useState } from "react";
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
  BarChart3,
  Users,
  Heart,
  ShieldCheck,
  Brain,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/features/StatsCard";
import { formatMinutes } from "@/lib/utils";

type Role = "individual" | "student" | "team_member" | "team_manager" | "hr_admin" | "platform_admin";

const roleCopy: Record<Role, { title: string; subtitle: string; primaryCta: string; heroHint: string }> = {
  individual: { title: "Personal Productivity Hub", subtitle: "Deep work, habits, and goals for focused professionals.", primaryCta: "Start Focus Session", heroHint: "Optimize your day" },
  student: { title: "Study Performance Hub", subtitle: "Plan study blocks, protect attention, and improve results.", primaryCta: "Start Study Session", heroHint: "Win the next exam" },
  team_member: { title: "Team Workspace", subtitle: "Stay aligned, complete tasks, and collaborate with your team.", primaryCta: "Open Team Space", heroHint: "Be a reliable teammate" },
  team_manager: { title: "Team Leadership Hub", subtitle: "Monitor team output, run challenges, and unblock delivery.", primaryCta: "Review Team Progress", heroHint: "Keep the team moving" },
  hr_admin: { title: "Organization Insights", subtitle: "Track department performance, wellbeing, and policy adoption.", primaryCta: "Open Org Analytics", heroHint: "Protect workforce health" },
  platform_admin: { title: "Platform Control Center", subtitle: "Manage users, growth, subscriptions, and platform health.", primaryCta: "Manage Platform", heroHint: "Operate at scale" },
};

const roleStats: Record<Role, { focus: number; tasks: number; streak: number; score: number }> = {
  individual: { focus: 142, tasks: 3, streak: 24, score: 94 },
  student: { focus: 180, tasks: 4, streak: 11, score: 90 },
  team_member: { focus: 128, tasks: 5, streak: 16, score: 88 },
  team_manager: { focus: 156, tasks: 6, streak: 31, score: 92 },
  hr_admin: { focus: 120, tasks: 8, streak: 21, score: 89 },
  platform_admin: { focus: 98, tasks: 10, streak: 44, score: 97 },
};

const roleActions: Record<Role, Array<{ label: string; href: string; icon: typeof Play; description: string }>> = {
  individual: [
    { label: "Focus Session", href: "/dashboard/focus", icon: Timer, description: "Launch deep work mode with Pomodoro or deep work." },
    { label: "Set Goal", href: "/dashboard/goals", icon: Target, description: "Add a personal productivity goal and milestones." },
    { label: "Check Analytics", href: "/dashboard/analytics", icon: BarChart3, description: "Review focus trends and performance patterns." },
    { label: "Update Habits", href: "/dashboard/habits", icon: Flame, description: "Track routines and keep streaks alive." },
  ],
  student: [
    { label: "Study Session", href: "/dashboard/focus", icon: Timer, description: "Run a distraction-free study sprint." },
    { label: "Study Plan", href: "/dashboard/goals", icon: CalendarDays, description: "Organize assignments, exam prep, and milestones." },
    { label: "Study Analytics", href: "/dashboard/analytics", icon: BarChart3, description: "See where study time and focus are strongest." },
    { label: "Healthy Breaks", href: "/dashboard/wellness", icon: Heart, description: "Monitor energy, stress, and recovery." },
  ],
  team_member: [
    { label: "Start Work Block", href: "/dashboard/focus", icon: Timer, description: "Begin a focus block linked to your task." },
    { label: "Open Team Space", href: "/dashboard/team", icon: Users, description: "See team goals, live status, and updates." },
    { label: "Update Tasks", href: "/dashboard/tasks", icon: CheckSquare, description: "Move assigned work forward and report progress." },
    { label: "View Team Analytics", href: "/dashboard/analytics", icon: BarChart3, description: "Check your contribution and team signals." },
  ],
  team_manager: [
    { label: "Run Team Challenge", href: "/dashboard/team", icon: Trophy, description: "Launch a team focus challenge or leaderboard." },
    { label: "Assign Tasks", href: "/dashboard/tasks", icon: CheckSquare, description: "Create and reassign work for your team." },
    { label: "Review Goals", href: "/dashboard/goals", icon: Target, description: "Track team goals and milestone completion." },
    { label: "Read Analytics", href: "/dashboard/analytics", icon: BarChart3, description: "Monitor productivity, patterns, and bottlenecks." },
  ],
  hr_admin: [
    { label: "Department View", href: "/dashboard/team", icon: Users, description: "Review workspace activity and collaboration health." },
    { label: "Policy Controls", href: "/admin/settings", icon: ShieldCheck, description: "Adjust org settings and governance." },
    { label: "Workforce Analytics", href: "/dashboard/analytics", icon: BarChart3, description: "Spot workload, focus, and wellness trends." },
    { label: "Wellbeing Review", href: "/dashboard/wellness", icon: Heart, description: "Track burnout risk and recovery signals." },
  ],
  platform_admin: [
    { label: "Manage Users", href: "/admin/users", icon: Users, description: "Edit access, status, and roles across the platform." },
    { label: "System Settings", href: "/admin/settings", icon: ShieldCheck, description: "Tune platform-level settings and policies." },
    { label: "Subscription Review", href: "/pricing", icon: Trophy, description: "Inspect plans and subscription growth." },
    { label: "Platform Analytics", href: "/dashboard/analytics", icon: BarChart3, description: "Monitor adoption, retention, and usage." },
  ],
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const role = (user?.role || "individual") as Role;
  const copy = roleCopy[role];
  const stats = roleStats[role];
  const actions = roleActions[role];

  const metrics = useMemo(() => {
    const base = [
      { title: "Focus Today", value: formatMinutes(stats.focus), subtitle: "Goal driven progress", trend: 12, trendLabel: "vs yesterday", icon: Timer, iconColor: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400", accentColor: "from-blue-600" },
      { title: "Completed Items", value: `${stats.tasks}/10`, subtitle: "Active work items", trend: 5, trendLabel: "on track", icon: CheckSquare, iconColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400", accentColor: "from-emerald-500" },
      { title: "Current Streak", value: `${stats.streak}d`, subtitle: copy.heroHint, icon: Flame, iconColor: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400", accentColor: "from-orange-500" },
      { title: "Performance Score", value: `${stats.score}`, subtitle: "Out of 100", trend: 8, trendLabel: "vs last week", icon: TrendingUp, iconColor: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400", accentColor: "from-purple-500" },
    ];
    if (role === "hr_admin" || role === "platform_admin") {
      base[1] = { ...base[1], title: role === "platform_admin" ? "Managed Users" : "Departments Reviewed", value: role === "platform_admin" ? "124" : "8/12", subtitle: role === "platform_admin" ? "Across the platform" : "Across the org" };
      base[2] = { ...base[2], title: role === "platform_admin" ? "Uptime" : "Burnout Risk", value: role === "platform_admin" ? "99.98%" : "Low", subtitle: role === "platform_admin" ? "Platform health" : "Wellness monitoring" };
    }
    if (role === "team_member" || role === "team_manager") {
      base[1] = { ...base[1], title: role === "team_member" ? "Assigned Tasks" : "Team Tasks", value: role === "team_member" ? "5" : "14", subtitle: role === "team_member" ? "Assigned to you" : "Across team projects" };
    }
    if (role === "student") {
      base[1] = { ...base[1], title: "Study Blocks", value: "4", subtitle: "Planned today" };
      base[2] = { ...base[2], title: "Study Streak", value: `${stats.streak}d`, subtitle: "Keep momentum" };
    }
    return base;
  }, [copy.heroHint, role, stats.focus, stats.score, stats.streak, stats.tasks]);

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold mb-3">
              {copy.title}
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {user.name.split(" ")[0]}, {copy.heroHint}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{copy.subtitle}</p>
          </div>
          <Link
            to={actions[0].href}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-premium hover:shadow-blue-glow hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4" />
            {copy.primaryCta}
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading
            ? [...Array(4)].map((_, i) => <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse h-28" />)
            : metrics.map((metric) => (
                <StatsCard key={metric.title} {...metric} />
              ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-semibold text-foreground">Recommended Actions</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Actions available for your role.</p>
              </div>
              <span className="text-xs text-muted-foreground">{role.replace("_", " ")}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {actions.map(({ label, href, icon: Icon, description }) => (
                <Link
                  key={label}
                  to={href}
                  className="group rounded-2xl border border-border bg-background p-4 hover:border-blue-500 hover:shadow-card-hover transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-semibold text-foreground">Today&apos;s Focus</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{role === "platform_admin" || role === "hr_admin" ? "Governance and analytics actions" : "Deep work and execution priorities"}</p>
              </div>
              <Link to="/dashboard/analytics" className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Review <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                role === "student" ? "Complete two study focus blocks" : "Complete one deep work session",
                role === "team_member" ? "Update your assigned tasks before standup" : role === "team_manager" ? "Review team blockers and assign priorities" : role === "hr_admin" ? "Check department wellbeing and workload" : role === "platform_admin" ? "Review platform health and active users" : "Review your top 3 priorities",
                role === "student" ? "Log your study habit streak" : role === "team_member" ? "Sync with your team workspace" : role === "team_manager" ? "Run a team focus challenge" : role === "hr_admin" ? "Inspect policy compliance and alerts" : role === "platform_admin" ? "Check subscriptions and growth" : "Log a wellness break",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {role === "individual" || role === "student" ? (
            <>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3"><Brain className="w-4 h-4 text-purple-500" /><h3 className="font-semibold text-foreground">AI Coach</h3></div>
                <p className="text-sm text-muted-foreground">Your best work window is 9-11 AM. Schedule hard tasks there and keep breaks short.</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3"><Heart className="w-4 h-4 text-emerald-500" /><h3 className="font-semibold text-foreground">Wellness Check</h3></div>
                <p className="text-sm text-muted-foreground">Energy is stable. A short movement break now will protect your afternoon focus.</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3"><Trophy className="w-4 h-4 text-yellow-500" /><h3 className="font-semibold text-foreground">Achievements</h3></div>
                <p className="text-sm text-muted-foreground">You are close to unlocking the next focus streak badge. Keep the session chain alive.</p>
              </div>
            </>
          ) : role === "team_member" ? (
            <>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3"><Users className="w-4 h-4 text-blue-500" /><h3 className="font-semibold text-foreground">Team Status</h3></div>
                <p className="text-sm text-muted-foreground">2 teammates are currently focusing. Your next shared sync is in 45 minutes.</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3"><CheckSquare className="w-4 h-4 text-emerald-500" /><h3 className="font-semibold text-foreground">Assigned Work</h3></div>
                <p className="text-sm text-muted-foreground">3 tasks are ready for review and 1 needs follow-up before the end of day.</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3"><BarChart3 className="w-4 h-4 text-purple-500" /><h3 className="font-semibold text-foreground">Contribution</h3></div>
                <p className="text-sm text-muted-foreground">Your contribution score improved this week. Keep focus blocks linked to assigned tasks.</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3"><Users className="w-4 h-4 text-blue-500" /><h3 className="font-semibold text-foreground">People Health</h3></div>
                <p className="text-sm text-muted-foreground">3 departments need attention for workload balance. Two teams are within healthy thresholds.</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3"><Heart className="w-4 h-4 text-emerald-500" /><h3 className="font-semibold text-foreground">Burnout Risk</h3></div>
                <p className="text-sm text-muted-foreground">No critical burnout alerts. One team shows elevated stress due to meeting density.</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-4 h-4 text-purple-500" /><h3 className="font-semibold text-foreground">Governance</h3></div>
                <p className="text-sm text-muted-foreground">Policy coverage is current. Platform and org settings can be adjusted from admin pages.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

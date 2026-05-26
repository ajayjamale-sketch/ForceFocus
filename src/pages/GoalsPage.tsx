import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Target, CheckCircle2, Circle, ChevronDown, ChevronUp, Flame, X, Calendar, TrendingUp, Trophy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  progress: number;
  milestones: Milestone[];
  color: string;
  status: "active" | "completed" | "paused";
}

const INITIAL_GOALS: Goal[] = [
  {
    id: "1", title: "Ship product v2.0", description: "Complete redesign and feature rollout for the second major version.", category: "Work",
    deadline: "Jul 31, 2026", progress: 65, color: "bg-blue-500", status: "active",
    milestones: [
      { id: "m1", title: "Design system complete", completed: true },
      { id: "m2", title: "Frontend refactor done", completed: true },
      { id: "m3", title: "Backend API v2 deployed", completed: false },
      { id: "m4", title: "QA testing complete", completed: false },
      { id: "m5", title: "Public launch", completed: false },
    ],
  },
  {
    id: "2", title: "Run a half marathon", description: "Train consistently and complete a 21km race by end of year.", category: "Health",
    deadline: "Oct 15, 2026", progress: 40, color: "bg-emerald-500", status: "active",
    milestones: [
      { id: "m1", title: "Run 5km without stopping", completed: true },
      { id: "m2", title: "Complete 10km race", completed: true },
      { id: "m3", title: "Run 15km long run", completed: false },
      { id: "m4", title: "Half marathon race day", completed: false },
    ],
  },
  {
    id: "3", title: "Read 24 books this year", description: "One book every two weeks across business, science, and fiction.", category: "Learning",
    deadline: "Dec 31, 2026", progress: 33, color: "bg-purple-500", status: "active",
    milestones: [
      { id: "m1", title: "Q1: 6 books", completed: true },
      { id: "m2", title: "Q2: 6 books", completed: false },
      { id: "m3", title: "Q3: 6 books", completed: false },
      { id: "m4", title: "Q4: 6 books", completed: false },
    ],
  },
  {
    id: "4", title: "Build emergency fund", description: "Save 6 months of living expenses as financial security.", category: "Finance",
    deadline: "Sep 30, 2026", progress: 78, color: "bg-yellow-500", status: "active",
    milestones: [
      { id: "m1", title: "Save 1 month expenses", completed: true },
      { id: "m2", title: "Save 3 months expenses", completed: true },
      { id: "m3", title: "Save 5 months expenses", completed: true },
      { id: "m4", title: "Full 6 months saved", completed: false },
    ],
  },
];

function AddGoalModal({ onAdd, onClose }: { onAdd: (goal: Omit<Goal, "id" | "milestones" | "progress">) => void; onClose: () => void }) {
  const [form, setForm] = useState({ title: "", description: "", category: "Work", deadline: "", color: "bg-blue-500", status: "active" as const });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Goal title is required."); return; }
    onAdd(form);
    onClose();
    toast.success("Goal created!");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-foreground">Create New Goal</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"><X className="w-4 h-4 text-muted-foreground" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Goal Title *</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="What do you want to achieve?" autoFocus />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="input-field resize-none" placeholder="Why is this goal important?" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
                <option>Work</option><option>Health</option><option>Learning</option><option>Finance</option><option>Personal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Color</label>
              <div className="flex gap-2 pt-1">
                {["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-yellow-500", "bg-pink-500"].map(c => (
                  <button key={c} type="button" onClick={() => setForm({ ...form, color: c })} className={cn("w-7 h-7 rounded-full", c, form.color === c ? "ring-2 ring-offset-2 ring-foreground" : "")} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">Create Goal</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function GoalsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [expanded, setExpanded] = useState<string | null>("1");
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  const filtered = goals.filter(g => activeFilter === "all" || g.status === activeFilter);

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(g => g.id === goalId ? {
      ...g,
      milestones: g.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m),
      progress: Math.round((g.milestones.filter(m => m.id === milestoneId ? !m.completed : m.completed).length / g.milestones.length) * 100),
    } : g));
  };

  const addGoal = (goal: Omit<Goal, "id" | "milestones" | "progress">) => {
    setGoals(prev => [{ ...goal, id: Date.now().toString(), milestones: [], progress: 0 }, ...prev]);
  };

  const categoryColors: Record<string, string> = {
    Work: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Health: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Learning: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Finance: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Personal: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  };

  return (
    <DashboardLayout>
      {showAddModal && <AddGoalModal onAdd={addGoal} onClose={() => setShowAddModal(false)} />}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Goals</h1>
            <p className="text-sm text-muted-foreground mt-1">Track your long-term goals and milestones.</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Set New Goal
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Active Goals", value: goals.filter(g => g.status === "active").length, icon: Target, color: "text-blue-600" },
            { label: "Completed", value: goals.filter(g => g.status === "completed").length, icon: Trophy, color: "text-emerald-600" },
            { label: "Avg. Progress", value: Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length) + "%", icon: TrendingUp, color: "text-purple-600" },
            { label: "Milestones Done", value: goals.flatMap(g => g.milestones).filter(m => m.completed).length, icon: CheckCircle2, color: "text-orange-500" },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                <Icon className={cn("w-5 h-5 mb-2", s.color)} />
                <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(["all", "active", "completed"] as const).map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={cn("px-4 py-1.5 rounded-full text-sm font-medium border transition-all capitalize", activeFilter === f ? "bg-blue-600 text-white border-blue-600" : "border-border text-muted-foreground hover:text-foreground")}>{f}</button>
          ))}
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {filtered.map(goal => (
            <div key={goal.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div
                className="p-5 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpanded(expanded === goal.id ? null : goal.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={cn("w-3 h-3 rounded-full mt-1.5 flex-shrink-0", goal.color)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-foreground">{goal.title}</h3>
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", categoryColors[goal.category] || "bg-muted text-muted-foreground")}>{goal.category}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{goal.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex-1 max-w-xs">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold text-foreground">{goal.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all duration-500", goal.color)} style={{ width: `${goal.progress}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          {goal.deadline}
                        </div>
                      </div>
                    </div>
                  </div>
                  {expanded === goal.id ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />}
                </div>
              </div>

              {expanded === goal.id && goal.milestones.length > 0 && (
                <div className="border-t border-border px-5 pb-5 pt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Milestones ({goal.milestones.filter(m => m.completed).length}/{goal.milestones.length})
                  </p>
                  <div className="space-y-2">
                    {goal.milestones.map(m => (
                      <div key={m.id} className="flex items-center gap-3 group cursor-pointer" onClick={() => toggleMilestone(goal.id, m.id)}>
                        <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200", m.completed ? "bg-emerald-500 border-emerald-500" : "border-border group-hover:border-blue-500")}>
                          {m.completed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={cn("text-sm transition-all", m.completed ? "line-through text-muted-foreground" : "text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400")}>{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Target className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground text-sm">No goals here. Set one to get started!</p>
              <button onClick={() => setShowAddModal(true)} className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">Create Goal</button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

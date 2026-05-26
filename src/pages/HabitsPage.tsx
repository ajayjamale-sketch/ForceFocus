import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Flame, CheckCircle2, X, BarChart3, Calendar, Repeat, Trophy, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Habit {
  id: string;
  name: string;
  icon: string;
  category: string;
  frequency: "daily" | "weekly";
  streak: number;
  bestStreak: number;
  completedDates: string[];
  color: string;
}

// Last 7 days for tracking
const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

const today = new Date().toISOString().split("T")[0];

const INITIAL_HABITS: Habit[] = [
  { id: "1", name: "Morning meditation", icon: "🧘", category: "Wellness", frequency: "daily", streak: 24, bestStreak: 31, completedDates: getLast7Days().slice(0, 6), color: "bg-blue-500" },
  { id: "2", name: "Deep work session", icon: "🎯", category: "Productivity", frequency: "daily", streak: 18, bestStreak: 22, completedDates: getLast7Days().slice(0, 5), color: "bg-emerald-500" },
  { id: "3", name: "Evening reflection", icon: "📝", category: "Mindfulness", frequency: "daily", streak: 12, bestStreak: 15, completedDates: getLast7Days().slice(0, 4), color: "bg-purple-500" },
  { id: "4", name: "No social media before 10am", icon: "🚫", category: "Focus", frequency: "daily", streak: 7, bestStreak: 14, completedDates: getLast7Days(), color: "bg-red-500" },
  { id: "5", name: "Read for 30 minutes", icon: "📚", category: "Learning", frequency: "daily", streak: 5, bestStreak: 20, completedDates: getLast7Days().slice(2), color: "bg-yellow-500" },
  { id: "6", name: "Exercise or walk", icon: "🏃", category: "Health", frequency: "daily", streak: 9, bestStreak: 12, completedDates: getLast7Days().slice(0, 6), color: "bg-pink-500" },
];

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function AddHabitModal({ onAdd, onClose }: { onAdd: (h: Omit<Habit, "id" | "streak" | "bestStreak" | "completedDates">) => void; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", icon: "✅", category: "Productivity", frequency: "daily" as const, color: "bg-blue-500" });
  const icons = ["✅", "🎯", "🧘", "📚", "🏃", "🚫", "💧", "🌙", "☀️", "💪", "🍎", "📝"];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Habit name required."); return; }
    onAdd(form);
    onClose();
    toast.success("Habit created! Start your streak today 🔥");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-foreground">Create Habit</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"><X className="w-4 h-4 text-muted-foreground" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Habit Name *</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g., Morning walk for 20 minutes" autoFocus />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Icon</label>
            <div className="flex flex-wrap gap-2">
              {icons.map(icon => (
                <button key={icon} type="button" onClick={() => setForm({ ...form, icon })} className={cn("w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all", form.icon === icon ? "bg-blue-600 ring-2 ring-blue-400" : "bg-muted hover:bg-muted/80")}>{icon}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
                <option>Productivity</option><option>Wellness</option><option>Health</option><option>Learning</option><option>Mindfulness</option><option>Focus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Frequency</label>
              <select value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value as "daily" | "weekly" })} className="input-field">
                <option value="daily">Daily</option><option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">Create Habit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function HabitsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [showAddModal, setShowAddModal] = useState(false);
  const last7 = getLast7Days();

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  const toggleToday = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const alreadyDone = h.completedDates.includes(today);
      const newDates = alreadyDone ? h.completedDates.filter(d => d !== today) : [...h.completedDates, today];
      const newStreak = alreadyDone ? Math.max(0, h.streak - 1) : h.streak + 1;
      return { ...h, completedDates: newDates, streak: newStreak, bestStreak: Math.max(h.bestStreak, newStreak) };
    }));
  };

  const addHabit = (h: Omit<Habit, "id" | "streak" | "bestStreak" | "completedDates">) => {
    setHabits(prev => [{ ...h, id: Date.now().toString(), streak: 0, bestStreak: 0, completedDates: [] }, ...prev]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
    toast.success("Habit removed.");
  };

  const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
  const totalStreak = habits.reduce((a, h) => a + h.streak, 0);
  const longestStreak = Math.max(...habits.map(h => h.bestStreak));

  return (
    <DashboardLayout>
      {showAddModal && <AddHabitModal onAdd={addHabit} onClose={() => setShowAddModal(false)} />}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Habits</h1>
            <p className="text-sm text-muted-foreground mt-1">Build lasting habits through daily consistency.</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Add Habit
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: CheckCircle2, label: "Done Today", value: `${completedToday}/${habits.length}`, color: "text-emerald-600" },
            { icon: Flame, label: "Total Streak Days", value: totalStreak, color: "text-orange-500" },
            { icon: Trophy, label: "Longest Streak", value: `${longestStreak}d`, color: "text-yellow-500" },
            { icon: TrendingUp, label: "Completion Rate", value: habits.length ? Math.round((completedToday / habits.length) * 100) + "%" : "0%", color: "text-blue-600" },
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

        {/* Habits */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Today's Check-In</h3>
            <div className="flex items-center gap-1.5">
              {last7.map((d, i) => (
                <div key={d} className="hidden sm:flex flex-col items-center gap-0.5">
                  <span className="text-xs text-muted-foreground">{DAY_LABELS[new Date(d + "T12:00:00").getDay()]}</span>
                </div>
              ))}
            </div>
          </div>

          {habits.map(habit => {
            const isDoneToday = habit.completedDates.includes(today);
            return (
              <div key={habit.id} className="flex items-center gap-3 px-5 py-4 border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors group">
                <span className="text-2xl flex-shrink-0">{habit.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{habit.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">{habit.category}</span>
                    <span className="flex items-center gap-1 text-xs text-orange-500 font-medium">
                      <Flame className="w-3 h-3" />{habit.streak}d
                    </span>
                  </div>
                </div>
                {/* 7-day tracker */}
                <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                  {last7.map(d => {
                    const done = habit.completedDates.includes(d);
                    const isToday = d === today;
                    return (
                      <div key={d} className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-all",
                        done ? "bg-emerald-500 text-white" : isToday ? "border-2 border-dashed border-border text-muted-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {done ? "✓" : "·"}
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => toggleToday(habit.id)}
                  className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0",
                    isDoneToday ? "bg-emerald-500 text-white hover:bg-emerald-600" : "border-2 border-border hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-muted-foreground"
                  )}
                >
                  {isDoneToday ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">+</span>}
                </button>
                <button onClick={() => deleteHabit(habit.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 text-muted-foreground transition-colors opacity-0 group-hover:opacity-100">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add habit prompt */}
        <button onClick={() => setShowAddModal(true)} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-border hover:border-blue-500 text-sm text-muted-foreground hover:text-blue-600 transition-all duration-200">
          <Plus className="w-4 h-4" /> Create a new habit
        </button>
      </div>
    </DashboardLayout>
  );
}

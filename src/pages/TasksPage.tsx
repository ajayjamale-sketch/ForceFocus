import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Search, Filter, CheckSquare, Clock, Flag, Trash2, Edit3, X, Calendar, Tag } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Priority = "low" | "medium" | "high" | "urgent";
type Status = "todo" | "in-progress" | "completed";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  category: string;
}

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Review Q2 performance report", description: "Analyze key metrics and prepare summary for leadership.", priority: "high", status: "in-progress", dueDate: "Today", category: "Work" },
  { id: "2", title: "Prepare presentation slides", description: "Create slides for Thursday all-hands meeting.", priority: "urgent", status: "todo", dueDate: "Today", category: "Work" },
  { id: "3", title: "Team standup call", description: "Daily 15-minute sync with engineering team.", priority: "medium", status: "completed", dueDate: "Done", category: "Work" },
  { id: "4", title: "Write blog post draft", description: "Draft about deep work techniques for productivity blog.", priority: "low", status: "todo", dueDate: "Tomorrow", category: "Personal" },
  { id: "5", title: "Code review for PR #247", description: "Review authentication refactor PR from Marcus.", priority: "high", status: "todo", dueDate: "Today", category: "Work" },
  { id: "6", title: "Read 30 pages of Deep Work", description: "Continue reading Cal Newport book.", priority: "low", status: "todo", dueDate: "This week", category: "Learning" },
  { id: "7", title: "Renew gym membership", description: "Expires end of month.", priority: "medium", status: "todo", dueDate: "This month", category: "Personal" },
  { id: "8", title: "Set up Notion workspace", description: "Migrate project notes to new Notion structure.", priority: "medium", status: "in-progress", dueDate: "This week", category: "Work" },
];

const priorityConfig: Record<Priority, { label: string; color: string; dot: string }> = {
  low: { label: "Low", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400", dot: "bg-gray-400" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", dot: "bg-yellow-500" },
  high: { label: "High", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", dot: "bg-orange-500" },
  urgent: { label: "Urgent", color: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400", dot: "bg-red-500" },
};

const statusConfig: Record<Status, { label: string; color: string }> = {
  todo: { label: "To Do", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
};

function AddTaskModal({ onAdd, onClose }: { onAdd: (task: Omit<Task, "id">) => void; onClose: () => void }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" as Priority, status: "todo" as Status, dueDate: "Today", category: "Work" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Task title is required."); return; }
    onAdd(form);
    onClose();
    toast.success("Task added!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-foreground">Add New Task</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Task Title *</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="What needs to be done?" autoFocus />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="input-field resize-none" placeholder="Add more details..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Priority</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as Priority })} className="input-field">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Due Date</label>
              <select value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className="input-field">
                <option>Today</option>
                <option>Tomorrow</option>
                <option>This week</option>
                <option>This month</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
              <option>Work</option>
              <option>Personal</option>
              <option>Learning</option>
              <option>Health</option>
              <option>Finance</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeView, setActiveView] = useState<"list" | "board">("list");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const filtered = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    const matchesPriority = filterPriority === "all" || t.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === "completed" ? "todo" : "completed" } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast.success("Task deleted.");
  };

  const addTask = (task: Omit<Task, "id">) => {
    setTasks(prev => [{ ...task, id: Date.now().toString() }, ...prev]);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    urgent: tasks.filter(t => t.priority === "urgent" && t.status !== "completed").length,
  };

  return (
    <DashboardLayout>
      {showAddModal && <AddTaskModal onAdd={addTask} onClose={() => setShowAddModal(false)} />}
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Tasks</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and track all your tasks in one place.</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5">
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Tasks", value: stats.total, color: "text-foreground" },
            { label: "Completed", value: stats.completed, color: "text-emerald-600 dark:text-emerald-400" },
            { label: "In Progress", value: stats.inProgress, color: "text-blue-600 dark:text-blue-400" },
            { label: "Urgent", value: stats.urgent, color: "text-red-600 dark:text-red-400" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
              <p className={cn("font-display text-2xl font-bold", s.color)}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="input-field pl-9 py-2 text-sm" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as Status | "all")} className="input-field py-2 text-sm w-auto">
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value as Priority | "all")} className="input-field py-2 text-sm w-auto">
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div className="flex border border-border rounded-xl overflow-hidden">
            {(["list", "board"] as const).map(v => (
              <button key={v} onClick={() => setActiveView(v)} className={cn("px-3 py-2 text-xs font-medium capitalize transition-colors", activeView === v ? "bg-blue-600 text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>{v}</button>
            ))}
          </div>
        </div>

        {/* Task List */}
        {activeView === "list" ? (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <CheckSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">No tasks found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map(task => (
                  <div key={task.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors group">
                    <button
                      onClick={() => toggleStatus(task.id)}
                      className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
                        task.status === "completed" ? "bg-emerald-500 border-emerald-500" : "border-border hover:border-blue-500"
                      )}
                    >
                      {task.status === "completed" && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium truncate", task.status === "completed" && "line-through text-muted-foreground")}>{task.title}</p>
                      {task.description && <p className="text-xs text-muted-foreground truncate mt-0.5">{task.description}</p>}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity">
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium hidden sm:inline-flex items-center gap-1", priorityConfig[task.priority].color)}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", priorityConfig[task.priority].dot)} />
                        {priorityConfig[task.priority].label}
                      </span>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium hidden md:inline", statusConfig[task.status].color)}>{statusConfig[task.status].label}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground hidden sm:flex">
                        <Calendar className="w-3 h-3" />
                        {task.dueDate}
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full hidden lg:inline">{task.category}</span>
                      <button onClick={() => deleteTask(task.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 text-muted-foreground transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Board View
          <div className="grid sm:grid-cols-3 gap-4">
            {(["todo", "in-progress", "completed"] as Status[]).map(status => {
              const columnTasks = filtered.filter(t => t.status === status);
              return (
                <div key={status} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground capitalize">{statusConfig[status].label}</h3>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold", statusConfig[status].color)}>{columnTasks.length}</span>
                  </div>
                  <div className="space-y-2">
                    {columnTasks.map(task => (
                      <div key={task.id} className="bg-muted/50 border border-border rounded-xl p-3">
                        <p className="text-sm font-medium text-foreground mb-2 leading-snug">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", priorityConfig[task.priority].color)}>{priorityConfig[task.priority].label}</span>
                          <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                        </div>
                      </div>
                    ))}
                    {columnTasks.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-4">No tasks</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

import {
  Plus,
  Search,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock3,
  Circle,
  X,
  Calendar,
  Tag,
  Flag,
} from "lucide-react";

import { toast } from "sonner";

type Priority = "low" | "medium" | "high" | "urgent";
type Status = "todo" | "in-progress" | "done";

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
  {
    id: "1",
    title: "Design dashboard UI",
    description: "Create responsive dashboard cards and charts",
    priority: "high",
    status: "todo",
    dueDate: "Today",
    category: "Work",
  },
  {
    id: "2",
    title: "Fix authentication bugs",
    description: "Resolve login token issue",
    priority: "urgent",
    status: "in-progress",
    dueDate: "Tomorrow",
    category: "Development",
  },
  {
    id: "3",
    title: "Push latest changes",
    description: "Deploy updated build to production",
    priority: "medium",
    status: "done",
    dueDate: "Completed",
    category: "DevOps",
  },
];

const priorityStyles = {
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusStyles = {
  todo: "border-gray-300",
  "in-progress": "border-blue-500",
  done: "border-emerald-500",
};

interface TaskModalProps {
  task?: Task | null;
  onClose: () => void;
  onSave: (task: Task | Omit<Task, "id">) => void;
}

function TaskModal({ task, onClose, onSave }: TaskModalProps) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: (task?.priority || "medium") as Priority,
    status: (task?.status || "todo") as Status,
    dueDate: task?.dueDate || "Today",
    category: task?.category || "Work",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    if (task) {
      onSave({
        ...task,
        ...form,
      });
      toast.success("Task updated");
    } else {
      onSave(form);
      toast.success("Task created");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {task ? "Edit Task" : "Create Task"}
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Task Title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="input-field"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Description
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="input-field resize-none"
              placeholder="Task details..."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Priority
              </label>

              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value as Priority,
                  })
                }
                className="input-field"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Status,
                  })
                }
                className="input-field"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Due Date
              </label>

              <input
                type="text"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Category
              </label>

              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="input-field"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-border rounded-xl hover:bg-muted transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              {task ? "Save Changes" : "Create Task"}
            </button>
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

  const [showModal, setShowModal] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [
      {
        ...task,
        id: crypto.randomUUID(),
      },
      ...prev,
    ]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    toast.success("Task deleted");
  };

  const moveTask = (id: string, status: Status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task
      )
    );
  };

  const columns: {
    title: string;
    status: Status;
    icon: JSX.Element;
  }[] = [
    {
      title: "To Do",
      status: "todo",
      icon: <Circle className="w-4 h-4" />,
    },
    {
      title: "In Progress",
      status: "in-progress",
      icon: <Clock3 className="w-4 h-4" />,
    },
    {
      title: "Done",
      status: "done",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  return (
    <DashboardLayout>
      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={(task) => {
            if ("id" in task) {
              updateTask(task);
            } else {
              addTask(task);
            }
          }}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Task Manager
            </h1>

            <p className="text-muted-foreground mt-1">
              Manage your tasks efficiently
            </p>
          </div>

          <button
            onClick={() => {
              setEditingTask(null);
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-12 py-3"
          />
        </div>

        {/* Task Board */}
        <div className="grid lg:grid-cols-3 gap-5">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.status
            );

            return (
              <div
                key={column.status}
                className={cn(
                  "bg-card border-2 rounded-3xl p-4",
                  statusStyles[column.status]
                )}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    {column.icon}

                    <h2 className="font-bold text-foreground">
                      {column.title}
                    </h2>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-background border border-border rounded-2xl p-4 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {task.title}
                          </h3>

                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingTask(task);
                              setShowModal(true);
                            }}
                            className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => deleteTask(task.id)}
                            className="w-9 h-9 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            priorityStyles[task.priority]
                          )}
                        >
                          <Flag className="w-3 h-3 inline mr-1" />
                          {task.priority}
                        </span>

                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {task.dueDate}
                        </span>

                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                          <Tag className="w-3 h-3 inline mr-1" />
                          {task.category}
                        </span>
                      </div>

                      {/* Move Buttons */}
                      <div className="flex gap-2 mt-5">
                        {task.status !== "todo" && (
                          <button
                            onClick={() =>
                              moveTask(task.id, "todo")
                            }
                            className="flex-1 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors"
                          >
                            To Do
                          </button>
                        )}

                        {task.status !== "in-progress" && (
                          <button
                            onClick={() =>
                              moveTask(task.id, "in-progress")
                            }
                            className="flex-1 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors"
                          >
                            In Progress
                          </button>
                        )}

                        {task.status !== "done" && (
                          <button
                            onClick={() =>
                              moveTask(task.id, "done")
                            }
                            className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm transition-colors"
                          >
                            Done
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="border border-dashed border-border rounded-2xl py-10 text-center">
                      <p className="text-sm text-muted-foreground">
                        No tasks available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
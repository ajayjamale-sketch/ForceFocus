import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

export function getRelativeTime(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(date);
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: "text-gray-500 bg-gray-100 dark:bg-gray-800",
    medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
    high: "text-orange-600 bg-orange-100 dark:bg-orange-900/30",
    urgent: "text-red-600 bg-red-100 dark:bg-red-900/30",
  };
  return colors[priority] || colors.medium;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    todo: "text-gray-500 bg-gray-100 dark:bg-gray-800",
    "in-progress": "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
    completed: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
    cancelled: "text-red-500 bg-red-100 dark:bg-red-900/30",
  };
  return colors[status] || colors.todo;
}

export function calculateProductivityScore(
  focusMinutes: number,
  tasksCompleted: number,
  habitsCompleted: number
): number {
  const focusScore = Math.min((focusMinutes / 240) * 40, 40);
  const taskScore = Math.min(tasksCompleted * 5, 35);
  const habitScore = Math.min(habitsCompleted * 5, 25);
  return Math.round(focusScore + taskScore + habitScore);
}

export function getMockUser() {
  const stored = localStorage.getItem("ff_user");
  if (stored) return JSON.parse(stored);
  return null;
}

export function saveMockUser(user: object) {
  localStorage.setItem("ff_user", JSON.stringify(user));
}

export function clearMockUser() {
  localStorage.removeItem("ff_user");
}

export function getTheme(): "light" | "dark" {
  const stored = localStorage.getItem("ff_theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function saveTheme(theme: "light" | "dark") {
  localStorage.setItem("ff_theme", theme);
}

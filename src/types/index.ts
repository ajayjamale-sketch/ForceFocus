export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "free" | "pro" | "team" | "enterprise";
  joinedAt: string;
  timezone: string;
  goals: string[];
  totalFocusHours: number;
  currentStreak: number;
  xp: number;
  level: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "completed" | "cancelled";
  dueDate?: string;
  tags: string[];
  projectId?: string;
  estimatedMinutes?: number;
  completedAt?: string;
  createdAt: string;
}

export interface FocusSession {
  id: string;
  type: "pomodoro" | "deep-work" | "custom";
  duration: number;
  completedAt?: string;
  taskId?: string;
  focusScore: number;
  distractionsBlocked: number;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: "daily" | "weekly" | "monthly";
  currentStreak: number;
  longestStreak: number;
  completedDates: string[];
  color: string;
  icon: string;
  category: "productivity" | "wellness" | "learning" | "health" | "custom";
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  progress: number;
  taskCount: number;
  completedTasks: number;
  dueDate?: string;
  status: "active" | "completed" | "paused" | "archived";
  members: string[];
}

export interface AnalyticsData {
  date: string;
  focusMinutes: number;
  tasksCompleted: number;
  productivityScore: number;
  distractionsBlocked: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  coverImage: string;
  slug: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  metric: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

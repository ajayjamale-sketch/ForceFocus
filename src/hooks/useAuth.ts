import { useState, useCallback } from "react";
import type { User } from "@/types";
import { getMockUser, saveMockUser, clearMockUser, generateId } from "@/lib/utils";

const MOCK_USER: User = {
  id: "usr_demo123",
  name: "Alex Morgan",
  email: "alex@forcefocus.app",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  role: "individual",
  joinedAt: "2025-01-15",
  timezone: "America/New_York",
  goals: ["Complete deep work sessions", "Build morning routine", "Reduce distractions"],
  totalFocusHours: 312,
  currentStreak: 24,
  xp: 8450,
  level: 12,
};

export const DEMO_USERS: Record<string, User> = {
  professional: {
    id: "usr_pro",
    name: "Alex Morgan",
    email: "alex.morgan@forcefocus.app",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    role: "individual",
    joinedAt: "2025-01-15",
    timezone: "America/New_York",
    goals: ["Complete deep work sessions", "Build morning routine", "Reduce distractions"],
    totalFocusHours: 312,
    currentStreak: 24,
    xp: 8450,
    level: 12,
  },
  student: {
    id: "usr_student",
    name: "Jamie Chen",
    email: "jamie.chen@university.edu",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    role: "student",
    joinedAt: "2025-09-01",
    timezone: "America/Los_Angeles",
    goals: ["Study 4 hours daily", "Complete thesis draft", "Build exam routine"],
    totalFocusHours: 98,
    currentStreak: 7,
    xp: 2100,
    level: 4,
  },
  manager: {
    id: "usr_manager",
    name: "Priya Nair",
    email: "priya.nair@techcorp.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    role: "team_manager",
    joinedAt: "2024-06-10",
    timezone: "Asia/Kolkata",
    goals: ["Improve team velocity", "Weekly sprint reviews", "Reduce meeting overload"],
    totalFocusHours: 540,
    currentStreak: 31,
    xp: 14200,
    level: 18,
  },
  teamMember: {
    id: "usr_team_member",
    name: "Taylor Brooks",
    email: "taylor.brooks@techcorp.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    role: "team_member",
    joinedAt: "2024-09-12",
    timezone: "Europe/London",
    goals: ["Ship sprint tasks", "Protect deep work blocks", "Support the team"],
    totalFocusHours: 188,
    currentStreak: 16,
    xp: 5200,
    level: 8,
  },
  hrAdmin: {
    id: "usr_hr_admin",
    name: "Morgan Patel",
    email: "morgan.patel@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop&crop=face",
    role: "hr_admin",
    joinedAt: "2023-02-18",
    timezone: "Asia/Kolkata",
    goals: ["Monitor department productivity", "Support team wellbeing", "Reduce burnout risk"],
    totalFocusHours: 401,
    currentStreak: 21,
    xp: 16400,
    level: 20,
  },
  admin: {
    id: "usr_admin",
    name: "Jordan Lee",
    email: "jordan.lee@forcefocus.app",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
    role: "platform_admin",
    joinedAt: "2022-01-01",
    timezone: "America/Chicago",
    goals: ["Monitor platform health", "Grow user base", "Optimize onboarding"],
    totalFocusHours: 1024,
    currentStreak: 60,
    xp: 52000,
    level: 35,
  },
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const impersonated = localStorage.getItem("ff_impersonated_user");
    if (impersonated) {
      try {
        return JSON.parse(impersonated) as User;
      } catch {
        return getMockUser();
      }
    }
    return getMockUser();
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const loggedUser = { ...MOCK_USER, email };
    saveMockUser(loggedUser);
    setUser(loggedUser);
    setIsLoading(false);
  }, []);

  const loginAsDemo = useCallback(async (demoKey: keyof typeof DEMO_USERS) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    const demoUser = DEMO_USERS[demoKey];
    saveMockUser(demoUser);
    setUser(demoUser);
    setIsLoading(false);
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newUser: User = {
        ...MOCK_USER,
        id: generateId(),
        name,
        email,
        role: "individual",
        joinedAt: new Date().toISOString(),
        totalFocusHours: 0,
        currentStreak: 0,
        xp: 0,
        level: 1,
      };
      saveMockUser(newUser);
      setUser(newUser);
      setIsLoading(false);
    },
    []
  );

  const logout = useCallback(() => {
    clearMockUser();
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    login,
    loginAsDemo,
    register,
    logout,
    isLoading,
  };
}

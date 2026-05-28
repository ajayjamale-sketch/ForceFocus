import { User, GlobalRole } from "@/types";

export interface AdminPolicySettings {
  focusLockEnabled: boolean;
  teamAnalyticsEnabled: boolean;
  strictModeEnabled: boolean;
  billingEnabled: boolean;
  onboardingRequired: boolean;
}

export interface AdminAuditLog {
  id: string;
  action: string;
  actor: string;
  target?: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
}

export interface AdminOrgMetrics {
  totalUsers: number;
  activeUsers: number;
  teamCount: number;
  adminCount: number;
  hrCount: number;
  activeSubscriptions: number;
}

export interface AdminDashboardData {
  metrics: AdminOrgMetrics;
  policies: AdminPolicySettings;
  logs: AdminAuditLog[];
}

let mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Admin",
    email: "admin@forcefocus.com",
    role: "platform_admin",
    teamIds: ["team-1"],
    active: true,
    joinedAt: new Date().toISOString(),
    timezone: "UTC",
    goals: [],
    totalFocusHours: 120,
    currentStreak: 15,
    xp: 5000,
    level: 10,
  },
  {
    id: "user-2",
    name: "Sam Student",
    email: "sam@example.com",
    role: "student",
    teamIds: [],
    active: true,
    joinedAt: new Date().toISOString(),
    timezone: "UTC",
    goals: [],
    totalFocusHours: 40,
    currentStreak: 3,
    xp: 1200,
    level: 3,
  },
];

let policySettings: AdminPolicySettings = {
  focusLockEnabled: true,
  teamAnalyticsEnabled: true,
  strictModeEnabled: false,
  billingEnabled: true,
  onboardingRequired: true,
};

let auditLogs: AdminAuditLog[] = [
  { id: "log-1", action: "Created platform admin account", actor: "System", target: "Alex Admin", timestamp: new Date().toISOString(), severity: "low" },
  { id: "log-2", action: "Updated role to student", actor: "Alex Admin", target: "Sam Student", timestamp: new Date().toISOString(), severity: "medium" },
];

const USER_KEY = "ff_admin_users";
const POLICY_KEY = "ff_admin_policies";
const LOG_KEY = "ff_admin_audit_logs";

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const syncState = () => {
  if (typeof window === "undefined") return;
  mockUsers = readStorage<User[]>(USER_KEY, mockUsers);
  policySettings = readStorage<AdminPolicySettings>(POLICY_KEY, policySettings);
  auditLogs = readStorage<AdminAuditLog[]>(LOG_KEY, auditLogs);
};

const pushLog = (action: string, actor: string, target?: string, severity: AdminAuditLog["severity"] = "low") => {
  auditLogs = [
    {
      id: `log-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      action,
      actor,
      target,
      timestamp: new Date().toISOString(),
      severity,
    },
    ...auditLogs,
  ].slice(0, 25);
  writeStorage(LOG_KEY, auditLogs);
};

export const userService = {
  fetchAllUsers: async (): Promise<User[]> => {
    syncState();
    return [...mockUsers];
  },

  fetchUser: async (id: string): Promise<User | null> => {
    syncState();
    const user = mockUsers.find(u => u.id === id);
    return user ? { ...user } : null;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User | null> => {
    syncState();
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) return null;
    mockUsers[index] = { ...mockUsers[index], ...data };
    writeStorage(USER_KEY, mockUsers);
    pushLog(`Updated user profile`, "Admin", mockUsers[index].name, "medium");
    return mockUsers[index];
  },

  deactivateUser: async (id: string): Promise<boolean> => {
    syncState();
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) return false;
    mockUsers[index].active = false;
    writeStorage(USER_KEY, mockUsers);
    pushLog("Deactivated user", "Admin", mockUsers[index].name, "high");
    return true;
  },

  activateUser: async (id: string): Promise<boolean> => {
    syncState();
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) return false;
    mockUsers[index].active = true;
    writeStorage(USER_KEY, mockUsers);
    pushLog("Reactivated user", "Admin", mockUsers[index].name, "medium");
    return true;
  },

  deleteUser: async (id: string): Promise<boolean> => {
    syncState();
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) return false;
    const [removed] = mockUsers.splice(index, 1);
    writeStorage(USER_KEY, mockUsers);
    pushLog("Deleted user", "Admin", removed.name, "high");
    return true;
  },

  fetchDashboardData: async (): Promise<AdminDashboardData> => {
    syncState();
    const adminCount = mockUsers.filter((u) => u.role === "platform_admin").length;
    const hrCount = mockUsers.filter((u) => u.role === "hr_admin").length;
    return {
      metrics: {
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter((u) => u.active).length,
        teamCount: Math.max(1, mockUsers.reduce((sum, u) => sum + u.teamIds.length, 0)),
        adminCount,
        hrCount,
        activeSubscriptions: 42,
      },
      policies: { ...policySettings },
      logs: [...auditLogs],
    };
  },

  updatePolicies: async (updates: Partial<AdminPolicySettings>): Promise<AdminPolicySettings> => {
    syncState();
    policySettings = { ...policySettings, ...updates };
    writeStorage(POLICY_KEY, policySettings);
    pushLog("Updated organization policy settings", "HR/Admin", undefined, "medium");
    return { ...policySettings };
  },

  exportUsers: async (): Promise<string> => {
    syncState();
    pushLog("Exported user list", "Admin", undefined, "low");
    return JSON.stringify(mockUsers, null, 2);
  },

  resetUserPassword: async (id: string): Promise<boolean> => {
    syncState();
    const user = mockUsers.find((u) => u.id === id);
    if (!user) return false;
    pushLog("Reset user password", "Admin", user.name, "medium");
    return true;
  },

  impersonateUser: async (id: string): Promise<boolean> => {
    syncState();
    const user = mockUsers.find((u) => u.id === id);
    if (!user) return false;
    localStorage.setItem("ff_impersonated_user", JSON.stringify(user));
    pushLog("Started impersonation session", "Admin", user.name, "high");
    return true;
  },
};

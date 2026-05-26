import { User, GlobalRole } from "@/types";

// Note: In a real app, this would be handled by the backend.
// We are mocking a user database for the admin panel.

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

export const userService = {
  fetchAllUsers: async (): Promise<User[]> => {
    return [...mockUsers];
  },

  fetchUser: async (id: string): Promise<User | null> => {
    const user = mockUsers.find(u => u.id === id);
    return user ? { ...user } : null;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User | null> => {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) return null;
    mockUsers[index] = { ...mockUsers[index], ...data };
    return mockUsers[index];
  },

  deactivateUser: async (id: string): Promise<boolean> => {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) return false;
    mockUsers[index].active = false;
    return true;
  }
};

import { Team, TeamMember } from "@/types";

const TEAM_STORAGE_KEY = "ff_teams";

const defaultTeams: Team[] = [
  {
    id: "team-1",
    name: "Design Team",
    description: "UI/UX design team",
    createdAt: new Date().toISOString(),
    createdBy: "user-1",
    members: [{ userId: "user-1", role: "manager", joinedAt: new Date().toISOString() }],
    projects: [],
  },
];

const loadTeams = (): Team[] => {
  try {
    const raw = localStorage.getItem(TEAM_STORAGE_KEY);
    if (!raw) return defaultTeams;
    const parsed = JSON.parse(raw) as Team[];
    return Array.isArray(parsed) ? parsed : defaultTeams;
  } catch {
    return defaultTeams;
  }
};

const persistTeams = (teams: Team[]) => {
  localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teams));
};

let mockTeams: Team[] = loadTeams();

export const teamService = {
  fetchTeams: async (userId: string): Promise<Team[]> => {
    // Return teams where user is a member
    mockTeams = loadTeams();
    return mockTeams.filter(team => 
      team.members.some(m => m.userId === userId)
    );
  },

  fetchTeamDetails: async (teamId: string): Promise<Team | null> => {
    mockTeams = loadTeams();
    const team = mockTeams.find(t => t.id === teamId);
    return team || null;
  },

  createTeam: async (data: Omit<Team, "id" | "createdAt" | "members" | "projects"> & { creatorId: string }): Promise<Team> => {
    const newTeam: Team = {
      ...data,
      id: `team-${Date.now()}`,
      createdAt: new Date().toISOString(),
      members: [{ userId: data.creatorId, role: "manager", joinedAt: new Date().toISOString() }],
      projects: [],
    };
    mockTeams.push(newTeam);
    persistTeams(mockTeams);
    return newTeam;
  },

  updateTeam: async (teamId: string, data: Partial<Team>): Promise<Team | null> => {
    const index = mockTeams.findIndex(t => t.id === teamId);
    if (index === -1) return null;
    mockTeams[index] = { ...mockTeams[index], ...data };
    persistTeams(mockTeams);
    return mockTeams[index];
  },

  inviteMember: async (teamId: string, email: string, role: TeamMember["role"]): Promise<boolean> => {
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) return false;
    const userId = email.split("@")[0].trim().toLowerCase();
    const existing = team.members.find(m => m.userId === userId);
    if (existing) {
      existing.role = role;
    } else {
      team.members.push({ userId, role, joinedAt: new Date().toISOString() });
    }
    persistTeams(mockTeams);
    return true;
  },

  removeMember: async (teamId: string, userId: string): Promise<boolean> => {
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) return false;
    team.members = team.members.filter(m => m.userId !== userId);
    persistTeams(mockTeams);
    return true;
  },

  changeMemberRole: async (teamId: string, userId: string, role: TeamMember["role"]): Promise<boolean> => {
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) return false;
    const member = team.members.find(m => m.userId === userId);
    if (member) member.role = role;
    persistTeams(mockTeams);
    return true;
  },
};

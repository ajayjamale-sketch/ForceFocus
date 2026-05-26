import { Team, TeamMember } from "@/types";

// Mock data storage
let mockTeams: Team[] = [
  {
    id: "team-1",
    name: "Design Team",
    description: "UI/UX design team",
    createdAt: new Date().toISOString(),
    createdBy: "user-1",
    members: [
      { userId: "user-1", role: "manager", joinedAt: new Date().toISOString() },
    ],
    projects: [],
  }
];

export const teamService = {
  fetchTeams: async (userId: string): Promise<Team[]> => {
    // Return teams where user is a member
    return mockTeams.filter(team => 
      team.members.some(m => m.userId === userId)
    );
  },

  fetchTeamDetails: async (teamId: string): Promise<Team | null> => {
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
    return newTeam;
  },

  updateTeam: async (teamId: string, data: Partial<Team>): Promise<Team | null> => {
    const index = mockTeams.findIndex(t => t.id === teamId);
    if (index === -1) return null;
    mockTeams[index] = { ...mockTeams[index], ...data };
    return mockTeams[index];
  },

  inviteMember: async (teamId: string, email: string, role: TeamMember["role"]): Promise<boolean> => {
    // In a real app, this sends an invite email. Here we just pretend it succeeds.
    console.log(`Invited ${email} as ${role} to team ${teamId}`);
    return true;
  },

  removeMember: async (teamId: string, userId: string): Promise<boolean> => {
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) return false;
    team.members = team.members.filter(m => m.userId !== userId);
    return true;
  },

  changeMemberRole: async (teamId: string, userId: string, role: TeamMember["role"]): Promise<boolean> => {
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) return false;
    const member = team.members.find(m => m.userId === userId);
    if (member) member.role = role;
    return true;
  }
};

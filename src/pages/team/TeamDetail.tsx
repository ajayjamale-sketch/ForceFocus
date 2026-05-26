import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { teamService } from "@/services/teamService";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { TeamMembers } from "@/components/team/TeamMembers";
import { TeamInviteModal } from "@/components/team/TeamInviteModal";
import { RoleGuard } from "@/components/RoleGuard";
import { Team, TeamMember } from "@/types";
import { ArrowLeft, Loader2, Users, Briefcase, Activity, UserPlus, Settings } from "lucide-react";

export default function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    if (teamId) {
      teamService.fetchTeamDetails(teamId).then((data) => {
        setTeam(data);
        setIsLoading(false);
      });
    }
  }, [teamId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (!team) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-foreground">Team not found</h2>
          <button onClick={() => navigate("/team")} className="text-blue-600 mt-2">Go back to teams</button>
        </div>
      </DashboardLayout>
    );
  }

  const handleRemoveMember = async (userId: string) => {
    if (teamId) {
      const success = await teamService.removeMember(teamId, userId);
      if (success) {
        setTeam({ ...team, members: team.members.filter(m => m.userId !== userId) });
      }
    }
  };

  const handleChangeRole = async (userId: string, role: TeamMember["role"]) => {
    if (teamId) {
      const success = await teamService.changeMemberRole(teamId, userId, role);
      if (success) {
        setTeam({
          ...team,
          members: team.members.map(m => m.userId === userId ? { ...m, role } : m)
        });
      }
    }
  };

  const handleInvite = async (email: string, role: TeamMember["role"]) => {
    if (teamId) {
      await teamService.inviteMember(teamId, email, role);
      // Mocking the addition of a member
      const newMember: TeamMember = { userId: email.split("@")[0], role, joinedAt: new Date().toISOString() };
      setTeam({ ...team, members: [...team.members, newMember] });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => navigate("/team")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teams
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{team.name}</h1>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                  {team.description || "No description provided."}
                </p>
              </div>
            </div>

            <RoleGuard allowedRoles={["team_manager", "hr_admin", "platform_admin"]}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-premium"
                >
                  <UserPlus className="w-4 h-4" />
                  Invite Member
                </button>
                <button className="p-2 bg-card border border-border hover:bg-muted text-muted-foreground rounded-xl transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </RoleGuard>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Team Members</p>
              <p className="text-xl font-semibold text-foreground">{team.members.length}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
              <p className="text-xl font-semibold text-foreground">{team.projects.length}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
              <p className="text-xl font-semibold text-foreground">0</p>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Activity className="w-10 h-10 mb-2 opacity-20" />
                <p>No recent activity in this team.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <TeamMembers
              members={team.members}
              onRemove={handleRemoveMember}
              onChangeRole={handleChangeRole}
            />
          </div>
        </div>
      </div>

      <TeamInviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </DashboardLayout>
  );
}

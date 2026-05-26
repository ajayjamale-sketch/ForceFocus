import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { teamService } from "@/services/teamService";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Team } from "@/types";
import { Users, Plus, Loader2 } from "lucide-react";
import { RoleGuard } from "@/components/RoleGuard";

export default function TeamList() {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      teamService.fetchTeams(user.id).then((fetchedTeams) => {
        setTeams(fetchedTeams);
        setIsLoading(false);
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Teams</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Collaborate and manage your workspaces.
            </p>
          </div>
          
          <RoleGuard allowedRoles={["team_manager", "hr_admin", "platform_admin"]}>
            <Link
              to="/team/create"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-premium"
            >
              <Plus className="w-4 h-4" />
              Create Team
            </Link>
          </RoleGuard>
        </div>

        {teams.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">No Teams Yet</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              You haven't joined any teams. Contact your organization administrator to be added to a team.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <Link
                key={team.id}
                to={`/team/${team.id}`}
                className="bg-card border border-border rounded-2xl p-6 card-hover flex flex-col group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                    {team.members.length} Members
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{team.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                  {team.description || "No description provided."}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

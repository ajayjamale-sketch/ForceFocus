import { useState } from "react";
import { TeamMember } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { MoreVertical, Shield, Trash2, UserCog } from "lucide-react";
import { RoleGuard } from "@/components/RoleGuard";

interface TeamMembersProps {
  members: TeamMember[];
  onRemove: (userId: string) => Promise<void>;
  onChangeRole: (userId: string, role: TeamMember["role"]) => Promise<void>;
}

export function TeamMembers({ members, onRemove, onChangeRole }: TeamMembersProps) {
  const { user } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isManagerOrAdmin = ["team_manager", "hr_admin", "platform_admin"].includes(user?.role || "");

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="font-semibold text-foreground">Team Members</h3>
      </div>
      <div className="divide-y divide-border">
        {members.map((member) => (
          <div key={member.userId} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                {member.userId.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{member.userId} {member.userId === user?.id && "(You)"}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Shield className="w-3 h-3" />
                  <span className="capitalize">{member.role}</span>
                </p>
              </div>
            </div>

            {isManagerOrAdmin && member.userId !== user?.id && (
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === member.userId ? null : member.userId)}
                  className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {openDropdown === member.userId && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-10 py-1 overflow-hidden">
                    <button
                      onClick={() => {
                        onChangeRole(member.userId, member.role === "manager" ? "member" : "manager");
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center gap-2"
                    >
                      <UserCog className="w-4 h-4" />
                      Make {member.role === "manager" ? "Member" : "Manager"}
                    </button>
                    <button
                      onClick={() => {
                        onRemove(member.userId);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove from Team
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

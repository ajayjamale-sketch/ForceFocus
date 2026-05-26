import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, Target, Trophy, TrendingUp, Plus, CheckCircle2, Flame, BarChart3, Star, Crown, ArrowRight, MessageCircle, UserPlus, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const teamMembers = [
  { id: "1", name: "Sarah Chen", role: "Product Manager", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", focusHours: 6.4, streak: 18, score: 94, status: "focusing" },
  { id: "2", name: "Marcus Johnson", role: "Engineer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", focusHours: 5.8, streak: 24, score: 91, status: "online" },
  { id: "3", name: "Priya Sharma", role: "Designer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", focusHours: 4.2, streak: 9, score: 82, status: "break" },
  { id: "4", name: "David Park", role: "Data Analyst", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", focusHours: 7.1, streak: 31, score: 97, status: "focusing" },
  { id: "5", name: "Elena Rodriguez", role: "Marketing", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", focusHours: 3.9, streak: 5, score: 75, status: "offline" },
];

const teamGoals = [
  { id: "1", title: "Launch Q3 product features", progress: 68, dueDate: "Aug 1", members: 4, category: "Product" },
  { id: "2", title: "Grow user base to 50K", progress: 82, dueDate: "Jul 31", members: 3, category: "Growth" },
  { id: "3", title: "Improve team focus score to 90+", progress: 55, dueDate: "Sep 1", members: 5, category: "Performance" },
];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  focusing: { label: "Focusing", color: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500 animate-pulse" },
  online: { label: "Online", color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
  break: { label: "On Break", color: "text-yellow-600 dark:text-yellow-400", dot: "bg-yellow-500" },
  offline: { label: "Offline", color: "text-muted-foreground", dot: "bg-gray-300 dark:bg-gray-600" },
};

export default function TeamPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "leaderboard" | "goals">("overview");

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.includes("@")) { toast.error("Enter a valid email."); return; }
    toast.success(`Invitation sent to ${inviteEmail}!`);
    setInviteEmail("");
    setShowInvite(false);
  };

  const sorted = [...teamMembers].sort((a, b) => b.score - a.score);

  return (
    <DashboardLayout>
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-foreground">Invite Team Member</h2>
              <button onClick={() => setShowInvite(false)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted"><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <form onSubmit={handleInvite} className="space-y-3">
              <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="input-field" placeholder="colleague@company.com" autoFocus />
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowInvite(false)} className="flex-1 py-2.5 border border-border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Team Workspace</h1>
            <p className="text-sm text-muted-foreground mt-1">Collaborate, compete, and achieve together.</p>
          </div>
          <button onClick={() => setShowInvite(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5">
            <UserPlus className="w-4 h-4" /> Invite Member
          </button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Team Members", value: teamMembers.length, icon: Users, color: "text-blue-600" },
            { label: "Focusing Now", value: teamMembers.filter(m => m.status === "focusing").length, icon: Target, color: "text-emerald-600" },
            { label: "Avg Focus Score", value: Math.round(teamMembers.reduce((a, m) => a + m.score, 0) / teamMembers.length), icon: BarChart3, color: "text-purple-600" },
            { label: "Team Streak", value: "12d", icon: Flame, color: "text-orange-500" },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                <Icon className={cn("w-5 h-5 mb-2", s.color)} />
                <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit">
          {(["overview", "leaderboard", "goals"] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={cn("px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200", activeTab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{t}</button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Team Members — Live Status</h3>
              </div>
              <div className="divide-y divide-border">
                {teamMembers.map(member => {
                  const sc = statusConfig[member.status];
                  return (
                    <div key={member.id} className="flex items-center gap-3 px-5 py-4 hover:bg-muted/20 transition-colors">
                      <div className="relative flex-shrink-0">
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                        <span className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card", sc.dot)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-xs">
                        <div className="text-center">
                          <p className="font-semibold text-foreground">{member.focusHours}h</p>
                          <p className="text-muted-foreground">Focus today</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-orange-500 flex items-center gap-1"><Flame className="w-3 h-3" />{member.streak}d</p>
                          <p className="text-muted-foreground">Streak</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-blue-600 dark:text-blue-400">{member.score}</p>
                          <p className="text-muted-foreground">Score</p>
                        </div>
                      </div>
                      <span className={cn("text-xs font-medium flex-shrink-0", sc.color)}>{sc.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <h3 className="text-sm font-semibold text-foreground">Weekly Productivity Leaderboard</h3>
            </div>
            <div className="divide-y divide-border">
              {sorted.map((member, i) => (
                <div key={member.id} className={cn("flex items-center gap-3 px-5 py-4 hover:bg-muted/20 transition-colors", i === 0 && "bg-yellow-50 dark:bg-yellow-900/10")}>
                  <div className="w-8 text-center flex-shrink-0">
                    {i === 0 ? <Crown className="w-5 h-5 text-yellow-500 mx-auto" /> :
                      i === 1 ? <span className="text-base font-bold text-gray-400">2</span> :
                        i === 2 ? <span className="text-base font-bold text-amber-600">3</span> :
                          <span className="text-sm font-medium text-muted-foreground">{i + 1}</span>}
                  </div>
                  <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.focusHours}h focus · <span className="text-orange-500">{member.streak}d 🔥</span></p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-lg font-bold text-foreground">{member.score}</p>
                    <p className="text-xs text-muted-foreground">score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === "goals" && (
          <div className="space-y-4">
            {teamGoals.map(goal => (
              <div key={goal.id} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{goal.title}</h3>
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">{goal.category}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{goal.members} members · Due {goal.dueDate}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${goal.progress}%` }} />
                </div>
              </div>
            ))}
            <button onClick={() => toast.info("Team goal creation coming soon!")} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-border hover:border-blue-500 text-sm text-muted-foreground hover:text-blue-600 transition-all">
              <Plus className="w-4 h-4" /> Add Team Goal
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

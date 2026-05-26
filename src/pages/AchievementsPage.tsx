import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Trophy, Zap, Star, Lock, Crown, Flame, Target, Timer, Repeat, Users, Shield, TrendingUp, CheckCircle2, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  iconEmoji: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earned: boolean;
  earnedDate?: string;
  xp: number;
  progress?: number;
  total?: number;
}

const badges: Badge[] = [
  { id: "1", name: "First Focus", description: "Complete your first focus session.", icon: Timer, iconEmoji: "⏱", rarity: "common", earned: true, earnedDate: "Jan 15, 2026", xp: 50 },
  { id: "2", name: "Deep Worker", description: "Complete 50 focus sessions.", icon: Target, iconEmoji: "🎯", rarity: "rare", earned: true, earnedDate: "Feb 20, 2026", xp: 200 },
  { id: "3", name: "Habit Architect", description: "Maintain 3 habits for 30 consecutive days.", icon: Repeat, iconEmoji: "🔄", rarity: "epic", earned: true, earnedDate: "Mar 10, 2026", xp: 500 },
  { id: "4", name: "Streak Legend", description: "Achieve a 30-day focus streak.", icon: Flame, iconEmoji: "🔥", rarity: "legendary", earned: true, earnedDate: "Apr 5, 2026", xp: 1000 },
  { id: "5", name: "Goal Crusher", description: "Complete 10 major goals.", icon: Trophy, iconEmoji: "🏆", rarity: "epic", earned: false, progress: 6, total: 10, xp: 500 },
  { id: "6", name: "Team Player", description: "Participate in 5 team focus challenges.", icon: Users, iconEmoji: "👥", rarity: "rare", earned: false, progress: 3, total: 5, xp: 200 },
  { id: "7", name: "Distraction Slayer", description: "Block 1,000 distractions total.", icon: Shield, iconEmoji: "🛡", rarity: "rare", earned: false, progress: 640, total: 1000, xp: 200 },
  { id: "8", name: "Productivity God", description: "Achieve a 95+ productivity score for 7 days straight.", icon: Crown, iconEmoji: "👑", rarity: "legendary", earned: false, progress: 4, total: 7, xp: 2000 },
  { id: "9", name: "Early Riser", description: "Complete 20 focus sessions before 8 AM.", icon: Star, iconEmoji: "☀️", rarity: "common", earned: true, earnedDate: "Mar 1, 2026", xp: 100 },
  { id: "10", name: "Centurion", description: "Log 100 total hours of deep work.", icon: TrendingUp, iconEmoji: "💯", rarity: "epic", earned: false, progress: 72, total: 100, xp: 500 },
  { id: "11", name: "Wellness Champion", description: "Complete 30 wellness check-ins.", icon: CheckCircle2, iconEmoji: "💚", rarity: "common", earned: true, earnedDate: "Apr 12, 2026", xp: 100 },
  { id: "12", name: "XP Millionaire", description: "Accumulate 10,000 XP total.", icon: Zap, iconEmoji: "⚡", rarity: "legendary", earned: false, progress: 8450, total: 10000, xp: 3000 },
];

const rarityConfig = {
  common: { label: "Common", color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-800", border: "border-gray-200 dark:border-gray-700", glow: "" },
  rare: { label: "Rare", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800", glow: "shadow-[0_0_12px_rgba(37,99,235,0.3)]" },
  epic: { label: "Epic", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800", glow: "shadow-[0_0_12px_rgba(139,92,246,0.3)]" },
  legendary: { label: "Legendary", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-800", glow: "shadow-[0_0_16px_rgba(245,158,11,0.4)]" },
};

const challenges = [
  { title: "5-Day Deep Work Sprint", desc: "Complete a 90-minute deep work session every day for 5 days.", progress: 3, total: 5, xpReward: 300, daysLeft: 2, category: "Focus" },
  { title: "Habit Streak Challenge", desc: "Complete all your habits for 7 consecutive days this week.", progress: 4, total: 7, xpReward: 250, daysLeft: 3, category: "Habits" },
  { title: "Morning Champion", desc: "Start a focus session before 8 AM for 3 days this week.", progress: 1, total: 3, xpReward: 150, daysLeft: 4, category: "Routine" },
];

export default function AchievementsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<"all" | "earned" | "locked">("all");
  const [activeRarity, setActiveRarity] = useState<"all" | "common" | "rare" | "epic" | "legendary">("all");

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  const filtered = badges.filter(b => {
    const statusMatch = activeFilter === "all" || (activeFilter === "earned" ? b.earned : !b.earned);
    const rarityMatch = activeRarity === "all" || b.rarity === activeRarity;
    return statusMatch && rarityMatch;
  });

  const earnedCount = badges.filter(b => b.earned).length;
  const totalXP = badges.filter(b => b.earned).reduce((a, b) => a + b.xp, 0);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Achievements</h1>
          <p className="text-sm text-muted-foreground mt-1">Your badges, XP, and active challenges.</p>
        </div>

        {/* XP + Level Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
              <Crown className="w-8 h-8 text-yellow-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-display text-2xl font-bold">Level {user?.level || 12}</p>
                <span className="px-3 py-0.5 bg-white/20 rounded-full text-sm font-medium">Focus Master</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-blue-200 text-sm">{user?.xp?.toLocaleString() || "8,450"} XP total</span>
                <span className="text-blue-300">·</span>
                <span className="text-blue-200 text-sm">{1000 - ((user?.xp || 8450) % 1000)} XP to Level {(user?.level || 12) + 1}</span>
              </div>
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden max-w-sm">
                <div className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" style={{ width: `${((user?.xp || 8450) % 1000) / 10}%` }} />
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-display text-3xl font-bold">{earnedCount}</p>
              <p className="text-blue-200 text-sm">badges earned</p>
            </div>
          </div>
        </div>

        {/* Active Challenges */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Active Challenges</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {challenges.map(ch => (
              <div key={ch.title} className="bg-card border border-border rounded-2xl p-4 card-hover">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">{ch.category}</span>
                  <span className="text-xs text-muted-foreground">{ch.daysLeft}d left</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1 leading-snug">{ch.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{ch.desc}</p>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{ch.progress}/{ch.total}</span>
                    <span className="text-yellow-500 font-semibold">+{ch.xpReward} XP</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{ width: `${(ch.progress / ch.total) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h3 className="text-sm font-semibold text-foreground mr-2">Badges</h3>
            <div className="flex gap-1.5">
              {(["all", "earned", "locked"] as const).map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} className={cn("px-3 py-1 rounded-full text-xs font-medium border capitalize transition-all", activeFilter === f ? "bg-blue-600 text-white border-blue-600" : "border-border text-muted-foreground hover:text-foreground")}>{f}</button>
              ))}
            </div>
            <div className="flex gap-1.5 ml-auto">
              {(["all", "common", "rare", "epic", "legendary"] as const).map(r => {
                const rc = rarityConfig[r === "all" ? "common" : r];
                return (
                  <button key={r} onClick={() => setActiveRarity(r)} className={cn("px-2.5 py-1 rounded-full text-xs font-medium border capitalize transition-all hidden sm:block", activeRarity === r ? "bg-blue-600 text-white border-blue-600" : "border-border text-muted-foreground hover:text-foreground")}>{r}</button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(badge => {
              const rc = rarityConfig[badge.rarity];
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  onClick={() => badge.earned && toast.success(`${badge.name}: earned on ${badge.earnedDate}!`)}
                  className={cn(
                    "relative rounded-2xl p-4 border transition-all duration-200 text-center",
                    badge.earned ? cn("cursor-pointer card-hover", rc.bg, rc.border, rc.glow) : "bg-muted/30 border-border opacity-60 cursor-default"
                  )}
                >
                  {!badge.earned && <Lock className="absolute top-3 right-3 w-3.5 h-3.5 text-muted-foreground" />}
                  {badge.rarity === "legendary" && badge.earned && <span className="absolute top-2 right-2 text-xs">✨</span>}

                  <div className={cn("w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-3xl", badge.earned ? rc.bg : "bg-muted")}>
                    {badge.iconEmoji}
                  </div>

                  <p className="text-xs font-bold text-foreground mb-0.5 leading-tight">{badge.name}</p>
                  <p className={cn("text-xs font-semibold mb-1", badge.earned ? rc.color : "text-muted-foreground")}>{rc.label}</p>
                  <p className="text-xs text-muted-foreground leading-tight mb-2 hidden sm:block">{badge.description}</p>

                  {badge.earned ? (
                    <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">+{badge.xp} XP</span>
                  ) : badge.progress !== undefined ? (
                    <div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(badge.progress / badge.total!) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{badge.progress}/{badge.total}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Locked</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

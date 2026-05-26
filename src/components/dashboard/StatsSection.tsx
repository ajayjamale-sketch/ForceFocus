import React from "react";
import StatsCard from "@/components/features/StatsCard";
import { formatMinutes } from "@/lib/utils";
import { User } from "@/types"; // adjust if user type is defined elsewhere

interface StatsSectionProps {
  isLoading: boolean;
  tasks: { id: string; title: string; priority: string; status: string; dueDate: string }[];
  completedTasksCount: number;
  user: User;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ isLoading, tasks, completedTasksCount, user }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading ? (
        [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
      ) : (
        <>
          <StatsCard
            title="Focus Today"
            value={formatMinutes(0)} // replace with real value if available
            subtitle="Goal: 4 hours"
            trend={12}
            trendLabel="vs yesterday"
            icon={Timer}
            iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            accentColor="from-blue-600"
          />
          <StatsCard
            title="Tasks Completed"
            value={`${completedTasksCount}/${tasks.length}`}
            subtitle="Today's tasks"
            trend={5}
            trendLabel="on track"
            icon={CheckSquare}
            iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
            accentColor="from-emerald-500"
          />
          <StatsCard
            title="Current Streak"
            value={`${user.currentStreak}d`}
            subtitle="Keep it going!"
            icon={Flame}
            iconColor="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
            accentColor="from-orange-500"
          />
          <StatsCard
            title="Productivity Score"
            value="94"
            subtitle="Out of 100"
            trend={8}
            trendLabel="vs last week"
            icon={TrendingUp}
            iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            accentColor="from-purple-500"
          />
        </>
      )}
    </div>
  );
};

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-muted rounded-xl" />
        <div className="w-16 h-5 bg-muted rounded-full" />
      </div>
      <div className="w-20 h-7 bg-muted rounded-lg mb-2" />
      <div className="w-28 h-4 bg-muted rounded-lg" />
    </div>
  );
}

// Icons used in StatsCard – import them locally
import { Timer, CheckSquare, Flame, TrendingUp } from "lucide-react";

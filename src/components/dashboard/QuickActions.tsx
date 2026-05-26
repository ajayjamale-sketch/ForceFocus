import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, ArrowRight, CheckSquare } from "lucide-react";
import { formatMinutes } from "@/lib/utils";
import StatsCard from "@/components/features/StatsCard";
import { Timer, Target, BarChart3, Trophy } from "lucide-react";

interface QuickActionsProps {}

export const QuickActions: React.FC<QuickActionsProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[
        {
          icon: Timer,
          label: "Focus Session",
          href: "/dashboard/focus",
          color:
            "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400",
        },
        {
          icon: Target,
          label: "Set Goal",
          href: "/dashboard/goals",
          color:
            "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400",
        },
        {
          icon: BarChart3,
          label: "Analytics",
          href: "/dashboard/analytics",
          color:
            "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400",
        },
        {
          icon: Trophy,
          label: "Achievements",
          href: "/dashboard/achievements",
          color:
            "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400",
        },
      ].map(({ icon: Icon, label, href, color }) => (
        <Link
          key={href}
          to={href}
          className={`flex flex-col items-center gap-3 p-4 rounded-2xl border card-hover transition-all duration-200 ${color}`}
        >
          <Icon className="w-6 h-6" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </Link>
      ))}
    </div>
  );
};

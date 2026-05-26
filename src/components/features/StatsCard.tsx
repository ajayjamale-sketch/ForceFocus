import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  accentColor?: string;
  className?: string;
  isLoading?: boolean;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon: Icon,
  iconColor = "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  accentColor = "from-blue-600",
  className,
  isLoading,
}: StatsCardProps) {
  if (isLoading) {
    return (
      <div className={cn("bg-card border border-border rounded-2xl p-6", className)}>
        <div className="flex items-start justify-between mb-4">
          <div className="skeleton w-10 h-10 rounded-xl" />
          <div className="skeleton w-16 h-5 rounded-full" />
        </div>
        <div className="skeleton w-24 h-8 rounded-lg mb-2" />
        <div className="skeleton w-32 h-4 rounded-lg" />
      </div>
    );
  }

  const TrendIcon =
    trend === undefined || trend === 0
      ? Minus
      : trend > 0
      ? TrendingUp
      : TrendingDown;
  const trendColor =
    trend === undefined || trend === 0
      ? "text-muted-foreground"
      : trend > 0
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-red-500";

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl p-6 card-hover group",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("feature-icon", iconColor)}>
          <Icon className="w-5 h-5" />
        </div>

        {trend !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
              trend > 0
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : trend < 0
                ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                : "bg-muted text-muted-foreground"
            )}
          >
            <TrendIcon className="w-3 h-3" />
            <span>
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="text-2xl font-display font-bold text-foreground mb-1">
          {value}
        </p>
        <p className="text-sm font-medium text-foreground/70">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trendLabel && (
          <p className={cn("text-xs mt-1", trendColor)}>{trendLabel}</p>
        )}
      </div>

      {/* Bottom accent line */}
      <div
        className={cn(
          "mt-4 h-0.5 w-0 group-hover:w-full rounded-full bg-gradient-to-r transition-all duration-500",
          accentColor,
          "to-transparent"
        )}
      />
    </div>
  );
}

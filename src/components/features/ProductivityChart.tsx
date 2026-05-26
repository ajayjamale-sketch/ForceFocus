import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

function ChartCard({ title, subtitle, children, className, actions }: ChartCardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-2xl p-6", className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-3 py-2.5 shadow-card-hover">
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold text-foreground">
          <span style={{ color: entry.color }}>●</span>{" "}
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const weekData = [
  { day: "Mon", focus: 145, tasks: 8, score: 82 },
  { day: "Tue", focus: 210, tasks: 12, score: 91 },
  { day: "Wed", focus: 90, tasks: 5, score: 65 },
  { day: "Thu", focus: 260, tasks: 14, score: 95 },
  { day: "Fri", focus: 195, tasks: 10, score: 87 },
  { day: "Sat", focus: 120, tasks: 6, score: 74 },
  { day: "Sun", focus: 80, tasks: 4, score: 60 },
];

const monthData = Array.from({ length: 30 }, (_, i) => ({
  date: `May ${i + 1}`,
  focusHours: Math.floor(Math.random() * 5 + 2),
  productivity: Math.floor(Math.random() * 40 + 55),
}));

const habitData = [
  { name: "Morning Routine", value: 85, color: "#2563EB" },
  { name: "Deep Work", value: 92, color: "#10B981" },
  { name: "Exercise", value: 67, color: "#8B5CF6" },
  { name: "Reading", value: 78, color: "#F59E0B" },
];

export function FocusAreaChart() {
  return (
    <ChartCard
      title="Weekly Focus Minutes"
      subtitle="Total deep work time per day"
    >
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={weekData}>
          <defs>
            <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="focus"
            name="Minutes"
            stroke="#2563EB"
            strokeWidth={2.5}
            fill="url(#focusGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ProductivityBarChart() {
  return (
    <ChartCard
      title="Productivity Score"
      subtitle="Daily performance rating"
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={weekData} barSize={24}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="score"
            name="Score"
            fill="#10B981"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function HabitCompletionChart() {
  return (
    <ChartCard title="Habit Completion" subtitle="This week's habit rates">
      <div className="space-y-4">
        {habitData.map((habit) => (
          <div key={habit.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground">{habit.name}</span>
              <span className="text-sm font-semibold" style={{ color: habit.color }}>
                {habit.value}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${habit.value}%`,
                  backgroundColor: habit.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

export function MonthlyTrendChart() {
  return (
    <ChartCard
      title="Monthly Focus Hours"
      subtitle="30-day rolling trend"
      className="col-span-full"
    >
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={monthData.slice(-14)}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="focusHours"
            name="Hours"
            stroke="url(#lineGradient)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#2563EB" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

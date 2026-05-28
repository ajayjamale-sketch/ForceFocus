import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Timer,
  CheckSquare,
  Target,
  BarChart3,
  Repeat,
  Users,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Trophy,
  Bell,
  User,
  LogOut,
  Flame,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { cn, getInitials } from "@/lib/utils";
import Navbar from "./Navbar";
import NotificationPane from "./NotificationPane";

const sidebarItemsByRole = {
  individual: [
    { section: "PRODUCTIVITY", items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Timer, label: "Focus", href: "/dashboard/focus" },
      { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
      { icon: Target, label: "Goals", href: "/dashboard/goals" },
    ]},
    { section: "TRACKING", items: [
      { icon: Repeat, label: "Habits", href: "/dashboard/habits" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Heart, label: "Wellness", href: "/dashboard/wellness" },
    ]},
    { section: "MOTIVATION", items: [
      { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
    ]},
  ],
  student: [
    { section: "STUDY FLOW", items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Timer, label: "Focus", href: "/dashboard/focus" },
      { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
      { icon: Target, label: "Study Goals", href: "/dashboard/goals" },
    ]},
    { section: "TRACKING", items: [
      { icon: Repeat, label: "Habits", href: "/dashboard/habits" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Heart, label: "Wellness", href: "/dashboard/wellness" },
    ]},
    { section: "MOTIVATION", items: [
      { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
    ]},
  ],
  team_member: [
    { section: "WORKSPACE", items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Timer, label: "Focus", href: "/dashboard/focus" },
      { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
      { icon: Users, label: "Team Space", href: "/dashboard/team" },
    ]},
    { section: "TRACKING", items: [
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Heart, label: "Wellness", href: "/dashboard/wellness" },
      { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
    ]},
  ],
  team_manager: [
    { section: "LEADERSHIP", items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Timer, label: "Focus", href: "/dashboard/focus" },
      { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
      { icon: Target, label: "Goals", href: "/dashboard/goals" },
      { icon: Users, label: "Team Space", href: "/dashboard/team" },
    ]},
    { section: "TRACKING", items: [
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Heart, label: "Wellness", href: "/dashboard/wellness" },
      { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
    ]},
  ],
  hr_admin: [
    { section: "ORGANIZATION", items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Users, label: "Team Space", href: "/dashboard/team" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Heart, label: "Wellness", href: "/dashboard/wellness" },
    ]},
    { section: "OPERATIONS", items: [
      { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
      { icon: Target, label: "Goals", href: "/dashboard/goals" },
      { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
    ]},
  ],
  platform_admin: [
    { section: "PLATFORM", items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Users, label: "Team Space", href: "/dashboard/team" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Heart, label: "Wellness", href: "/dashboard/wellness" },
    ]},
    { section: "ADMIN", items: [
      { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
      { icon: Target, label: "Goals", href: "/dashboard/goals" },
      { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
    ]},
  ],
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarItems = sidebarItemsByRole[user?.role ?? "individual"];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link
        to="/"
        className={cn(
          "flex items-center gap-2 px-4 py-5 border-b border-border hover:bg-muted/50 transition-colors duration-200",
          isCollapsed && "justify-center"
        )}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-display font-bold text-base text-foreground">
            Force<span className="text-blue-600">Focus</span>
          </span>
        )}
      </Link>

      {/* User Summary */}
      {!isCollapsed && user && (
        <div className="mx-3 mt-4 p-3 bg-gradient-to-r from-blue-600/10 to-emerald-500/10 rounded-xl border border-blue-500/20">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {getInitials(user.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.name}
              </p>
              <div className="flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-orange-500" />
                <span className="text-xs text-muted-foreground">
                  {user.currentStreak}d streak
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2.5">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Level {user.level}</span>
              <span className="text-blue-500 font-medium">{user.xp} XP</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                style={{ width: `${(user.xp % 1000) / 10}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-4 overflow-y-auto scrollbar-hide">
        {sidebarItems.map((group) => (
          <div key={group.section}>
            {!isCollapsed && (
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.section}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map(({ icon: Icon, label, href }) => {
                const isActive =
                  href === "/dashboard"
                    ? location.pathname === href
                    : location.pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                      isCollapsed && "justify-center",
                      isActive
                        ? "bg-blue-600 text-white shadow-premium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    title={isCollapsed ? label : undefined}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 flex-shrink-0 transition-transform duration-200",
                        !isActive && "group-hover:scale-110"
                      )}
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200",
            isCollapsed && "justify-center"
          )}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent />

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
          )}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          "lg:ml-64",
          isCollapsed && "lg:ml-16"
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden btn-ghost w-10 h-10 flex items-center justify-center rounded-xl"
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-base font-semibold text-foreground">
                  {(() => {
                    for (const group of sidebarItems) {
                      const item = group.items.find((item) =>
                        item.href === "/dashboard"
                          ? location.pathname === item.href
                          : location.pathname.startsWith(item.href)
                      );
                      if (item) return item.label;
                    }
                    return "Dashboard";
                  })()}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
              >
                <User className="w-4 h-4" />
                View Profile
              </Link>
              <Link
                to="/dashboard/focus"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors duration-200"
              >
                <Timer className="w-4 h-4" />
                Start Focus
              </Link>
              <button
                onClick={toggleTheme}
                className="btn-ghost w-11 h-11 flex items-center justify-center rounded-xl"
                aria-label="Toggle theme"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsNotificationsOpen((open) => !open)}
                className="btn-ghost w-11 h-11 flex items-center justify-center rounded-xl relative"
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
              </button>
              <Link to="/profile" aria-label="View profile">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold cursor-pointer">
                    {getInitials(user?.name || "U")}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>

      <NotificationPane
        open={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}

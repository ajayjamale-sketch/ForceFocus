import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, Settings, Shield, ChevronLeft, ChevronRight, LogOut, LayoutDashboard, Sun, Moon, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { cn, getInitials } from "@/lib/utils";
import { NotificationPanel } from "./NotificationPanel";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: Shield, label: "Roles & Permissions", href: "/admin/roles" },
  { icon: Settings, label: "Platform Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-5 border-b border-border",
          isCollapsed && "justify-center"
        )}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-display font-bold text-base text-foreground">
            ForceFocus <span className="text-blue-600 font-normal text-sm">Admin</span>
          </span>
        )}
      </div>

      {!isCollapsed && user && (
        <div className="mx-3 mt-4 p-3 bg-gradient-to-r from-blue-600/10 to-emerald-500/10 rounded-xl border border-blue-500/20">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {getInitials(user.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role.replace("_", " ")}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto scrollbar-hide">
        {sidebarItems.map(({ icon: Icon, label, href }) => {
          const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              to={href}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isCollapsed && "justify-center",
                isActive ? "bg-blue-600 text-white shadow-premium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              title={isCollapsed ? label : undefined}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0 transition-transform duration-200", !isActive && "group-hover:scale-110")} />
              {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-2">
        <Link
          to="/profile"
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200",
            isCollapsed && "justify-center"
          )}
        >
          <Users className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">View Profile</span>}
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
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3 text-muted-foreground" /> : <ChevronLeft className="w-3 h-3 text-muted-foreground" />}
        </button>
      </aside>

      {isMobileSidebarOpen && <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)} />}

      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          "lg:ml-64",
          isCollapsed && "lg:ml-16"
        )}
      >
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden btn-ghost w-10 h-10 flex items-center justify-center rounded-xl"
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
              <h1 className="text-base font-semibold text-foreground">Admin Control Panel</h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="btn-ghost w-11 h-11 flex items-center justify-center rounded-xl"
                aria-label="Toggle theme"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <NotificationPanel />
              <Link to="/profile">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-border" />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {getInitials(user?.name || "A")}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

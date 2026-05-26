import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Zap,
  Sun,
  Moon,
  ChevronDown,
  Bell,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { cn, getInitials } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-user-menu]")) setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background/90 backdrop-blur-xl border-b border-border"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-blue-glow group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Force<span className="text-blue-600">Focus</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "nav-link px-4 py-2 rounded-lg",
                  location.pathname === item.href && "nav-link-active bg-primary/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-ghost w-10 h-10 flex items-center justify-center rounded-xl"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="btn-ghost w-10 h-10 flex items-center justify-center rounded-xl relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
                </button>

                {/* Dashboard Link */}
                <Link
                  to="/dashboard"
                  className="hidden md:flex items-center gap-2 btn-ghost px-3 py-2 rounded-xl"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>

                {/* User Menu */}
                <div className="relative" data-user-menu>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-muted transition-colors duration-200"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {getInitials(user?.name || "U")}
                      </div>
                    )}
                    <span className="hidden md:block text-sm font-medium text-foreground">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 text-muted-foreground transition-transform duration-200",
                        isUserMenuOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-2xl shadow-card-hover animate-scale-in overflow-hidden">
                      <div className="p-3 border-b border-border">
                        <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mt-1 capitalize">
                          {user?.role} Plan
                        </span>
                      </div>
                      <div className="py-2">
                        {[
                          { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
                          { icon: User, label: "Profile", href: "/profile" },
                          { icon: Settings, label: "Settings", href: "/settings" },
                        ].map(({ icon: Icon, label, href }) => (
                          <Link
                            key={href}
                            to={href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                          >
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            {label}
                          </Link>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors duration-150"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-sm">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">
                  Get Started Free
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden btn-ghost w-10 h-10 flex items-center justify-center rounded-xl"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors duration-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors duration-200"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="pt-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center btn-primary text-sm"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

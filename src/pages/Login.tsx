import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, ArrowRight, Users, GraduationCap, Settings, Briefcase } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { DEMO_USERS } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const getPostLoginRoute = (role: string) => {
  if (role === "team_member" || role === "team_manager") return "/team";
  if (role === "hr_admin" || role === "platform_admin") return "/admin/dashboard";
  return "/dashboard";
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, loginAsDemo, isLoading } = useAuth();
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const DEMO_ACCOUNTS = [
    {
      key: "professional" as const,
      label: "Individual Pro",
      role: "Individual",
      icon: Briefcase,
      color: "from-blue-500 to-blue-700",
      badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      border: "hover:border-blue-400",
      user: DEMO_USERS.professional,
    },
    {
      key: "student" as const,
      label: "Student",
      role: "Student",
      icon: GraduationCap,
      color: "from-emerald-500 to-emerald-700",
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      border: "hover:border-emerald-400",
      user: DEMO_USERS.student,
    },
    {
      key: "manager" as const,
      label: "Team Manager",
      role: "Team Manager",
      icon: Users,
      color: "from-purple-500 to-purple-700",
      badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      border: "hover:border-purple-400",
      user: DEMO_USERS.manager,
    },
    {
      key: "teamMember" as const,
      label: "Team Member",
      role: "Collaborator",
      icon: Users,
      color: "from-cyan-500 to-cyan-700",
      badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
      border: "hover:border-cyan-400",
      user: DEMO_USERS.teamMember,
    },
    {
      key: "hrAdmin" as const,
      label: "HR Admin",
      role: "Org Admin",
      icon: Settings,
      color: "from-slate-600 to-slate-800",
      badge: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300",
      border: "hover:border-slate-400",
      user: DEMO_USERS.hrAdmin,
    },
    {
      key: "admin" as const,
      label: "Platform Admin",
      role: "Platform Admin",
      icon: Settings,
      color: "from-orange-500 to-orange-700",
      badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      border: "hover:border-orange-400",
      user: DEMO_USERS.admin,
    },
  ];

  const handleDemoLogin = async (key: keyof typeof DEMO_USERS) => {
    setDemoLoading(key);
    await loginAsDemo(key);
    const acc = DEMO_ACCOUNTS.find((a) => a.key === key)!;
    toast.success(`Logged in as ${acc.user.name} (${acc.label})`);
    navigate(getPostLoginRoute(acc.user.role));
    setDemoLoading(null);
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email || !email.includes("@")) newErrors.email = "Enter a valid email address";
    if (!password || password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(email, password);
      toast.success("Welcome back! 🎯");
      navigate(getPostLoginRoute("individual"));
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    toast.info("Connecting to Google...");
    await loginAsDemo("professional");
    toast.success("Signed in with Google!");
    navigate(getPostLoginRoute("individual"));
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Force<span className="text-blue-600">Focus</span>
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground mb-6">
            Sign in to continue your productivity journey.
          </p>

          <div className="mb-6 p-4 rounded-2xl border border-dashed border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Demo - Skip Login</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map(({ key, label, role, icon: Icon, color, badge, border, user: demoUser }) => (
                <button
                  key={key}
                  onClick={() => handleDemoLogin(key)}
                  disabled={isLoading || demoLoading !== null}
                  className={cn(
                    "relative flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-all duration-200 text-left group disabled:opacity-60 disabled:cursor-not-allowed",
                    border
                  )}
                >
                  {demoLoading === key ? (
                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br", color)}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground leading-tight truncate">{label}</p>
                    <span className={cn("text-[10px] font-medium rounded-full px-1.5 py-0.5", badge)}>{role}</span>
                  </div>
                  <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2.5 text-center">
              Explore the app instantly - no credentials needed
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-xl text-foreground font-medium hover:bg-muted transition-all duration-200 mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-background text-muted-foreground text-sm">
                or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={cn("input-field", errors.email && "border-red-500 focus:ring-red-500/50")}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn("input-field pr-12", errors.password && "border-red-500 focus:ring-red-500/50")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
              Start free
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#0F172A] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center max-w-sm">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gray-300 text-sm mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            2.4M+ users in deep focus
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Your best work is waiting.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Sign in to resume your focus sessions, review your productivity insights,
            and continue building momentum.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Avg Focus Score", value: "94/100" },
              { label: "Sessions Today", value: "0/5" },
              { label: "Streak", value: "24 days" },
              { label: "Weekly Goal", value: "72%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-left">
                <p className="text-white font-bold text-lg">{stat.value}</p>
                <p className="text-gray-400 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

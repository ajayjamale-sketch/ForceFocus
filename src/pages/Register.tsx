import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Enter a valid email address";
    if (!formData.password || formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!agreedToTerms) newErrors.terms = "Please accept the terms to continue";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strength = passwordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success("Account created! Welcome to ForceFocus 🎯");
      navigate("/dashboard");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    toast.info("Connecting to Google...");
    await new Promise((r) => setTimeout(r, 1000));
    await register("Alex Morgan", "alex@gmail.com", "google-auth");
    toast.success("Account created with Google!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#0F172A] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-sm">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Force<span className="text-blue-400">Focus</span>
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Join 2.4M+ people performing at their peak
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Start your free 14-day trial. No credit card required. Cancel anytime.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "AI-powered focus session management",
              "Distraction blocker & app control",
              "Habit tracking with streak system",
              "Burnout detection & wellness insights",
              "Team workspaces & leaderboards",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Force<span className="text-blue-600">Focus</span>
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-muted-foreground mb-8">
            Start your 14-day free Pro trial. No credit card needed.
          </p>

          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
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
                or register with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Morgan"
                className={cn("input-field", errors.name && "border-red-500")}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className={cn("input-field", errors.email && "border-red-500")}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  className={cn("input-field pr-12", errors.password && "border-red-500")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-all duration-300",
                          i < strength ? strengthColors[strength - 1] : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password strength:{" "}
                    <span className={cn("font-medium", strength > 0 && "text-foreground")}>
                      {strength > 0 ? strengthLabels[strength - 1] : "Too weak"}
                    </span>
                  </p>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Confirm password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter your password"
                className={cn("input-field", errors.confirmPassword && "border-red-500")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all duration-200 flex-shrink-0",
                    agreedToTerms
                      ? "bg-blue-600 border-blue-600"
                      : "border-border"
                  )}
                >
                  {agreedToTerms && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-muted-foreground">
                  I agree to ForceFocus's{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs mt-1 ml-8">{errors.terms}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

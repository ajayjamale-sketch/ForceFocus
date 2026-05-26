import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Step = "email" | "sent";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setStep("sent");
    toast.success("Password reset email sent!");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Force<span className="text-blue-600">Focus</span>
          </span>
        </Link>

        {step === "email" ? (
          <>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>

            <div className="mb-8">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Reset password
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Enter your email address and we'll send you a link to reset your
                password. Check your spam folder if it doesn't arrive within a few minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className={cn("input-field", error && "border-red-500 focus:ring-red-500/50")}
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                Sign in
              </Link>
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Check your inbox
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We've sent a password reset link to:
            </p>
            <p className="font-semibold text-foreground text-lg mb-8">{email}</p>

            <div className="bg-muted/50 rounded-2xl p-6 text-left mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-3">Next steps:</h3>
              <ol className="space-y-2.5">
                {[
                  "Check your email inbox (and spam folder)",
                  "Click the password reset link in the email",
                  "Choose a strong, unique new password",
                  "Sign in with your new password",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => { setStep("email"); setEmail(""); }}
                className="w-full btn-secondary text-sm"
              >
                Try a different email
              </button>
              <Link to="/login" className="block w-full text-center btn-primary text-sm">
                Back to Sign In
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              The link will expire in 1 hour for security reasons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

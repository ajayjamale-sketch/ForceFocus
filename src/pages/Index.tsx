import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  Play,
  Zap,
  Timer,
  Target,
  Brain,
  Shield,
  TrendingUp,
  Users,
  Repeat,
  Heart,
  CheckCircle2,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  Sparkles,
  BarChart3,
  Lightbulb,
  Leaf,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import {
  TESTIMONIALS,
  PRICING_PLANS,
  FAQ_ITEMS,
  STATS,
  FEATURES_LIST,
  WORKFLOW_STEPS,
} from "@/lib/constants";
import heroImage from "@/assets/hero-dashboard.jpg";

// Animated counter
function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(end * eased));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, started]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// FAQ Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border rounded-2xl overflow-hidden transition-all duration-200 hover:border-blue-500/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-muted/50 transition-colors duration-200"
      >
        <span className="text-base font-semibold text-foreground leading-snug">
          {question}
        </span>
        <span className="flex-shrink-0 mt-0.5">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 animate-accordion-down">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

const ICON_MAP: Record<string, React.ElementType> = {
  Timer,
  Target,
  Brain,
  Shield,
  TrendingUp,
  Users,
  Repeat,
  Heart,
  Zap,
  Lightbulb,
  Leaf,
  BarChart3,
};

export default function Index() {
  const [pricingBilling, setPricingBilling] = useState<"monthly" | "yearly">("monthly");
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0F1E]">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Productivity Platform
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
                Master Your{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-emerald-400 bg-clip-text text-transparent">
                  Focus.
                </span>
                <br />
                Own Your{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Day.
                </span>
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
                ForceFocus combines AI-powered focus sessions, habit tracking,
                distraction blocking, and behavioral analytics to help you reach
                peak performance — every single day.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-blue-glow hover:-translate-y-0.5 text-base"
                >
                  Start for Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-200 text-base">
                  <Play className="w-4 h-4 text-blue-400" />
                  Watch Demo
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-[#0A0F1E] object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-yellow-400 text-sm font-semibold ml-1">4.9</span>
                  </div>
                  <p className="text-gray-400 text-xs">Loved by 2.4M+ professionals</p>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  No credit card required
                </div>
              </div>
            </div>

            {/* Right: Hero Visual */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={heroImage}
                  alt="ForceFocus Dashboard Preview"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/50 to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-6 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3.5 animate-float hidden lg:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Timer className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Focus Session</p>
                    <p className="text-emerald-400 text-xs">25:00 ●  Active</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3.5 animate-float hidden lg:block" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">+37% Productivity</p>
                    <p className="text-blue-300 text-xs">This week vs last</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-500 text-xs">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </section>

      {/* ==================== STATS BANNER ==================== */}
      <section className="bg-blue-600 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 24, suffix: "M+", label: "Active Users", prefix: "" },
              { value: 98, suffix: "%", label: "Productivity Increase", prefix: "" },
              { value: 49, suffix: "/5", label: "Average Rating", prefix: "4." },
              { value: 500, suffix: "K+", label: "Hours Focused Daily", prefix: "" },
            ].map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <p className="font-display text-4xl font-bold mb-1">
                  {stat.prefix}
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="py-24 bg-background" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-badge mb-4">
              <Zap className="w-3.5 h-3.5" />
              Everything You Need
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Built for peak{" "}
              <span className="gradient-text">performance</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nine powerful modules that work together to eliminate distractions,
              build habits, and help you do your best work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES_LIST.map((feature, i) => {
              const Icon = ICON_MAP[feature.icon] || Zap;
              return (
                <div
                  key={feature.title}
                  className="group bg-card border border-border rounded-2xl p-6 card-hover"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={cn("feature-icon mb-4", feature.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/features"
              className="inline-flex items-center gap-2 btn-secondary text-sm"
            >
              View All Features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT WORKFLOW SECTION ==================== */}
      <section className="py-24 bg-[#0A0F1E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 text-gray-300 border border-white/20 mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              How It Works
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Your daily{" "}
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                performance loop
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A science-backed workflow that compounds over time. Four simple
              steps to sustainable peak performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = ICON_MAP[step.icon] || Zap;
              return (
                <div key={step.step} className="relative">
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(100%+1rem)] w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent z-10" />
                  )}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-white/8 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                          step.color
                        )}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-display text-4xl font-bold text-white/10">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-blue-glow"
            >
              Start Your First Focus Session
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS SECTION ==================== */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-badge mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                Why ForceFocus
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
                The science of{" "}
                <span className="gradient-text">deep work</span>,<br />
                made effortless
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                ForceFocus isn't just a timer app. It's a complete behavioral
                change system designed around neuroscience and performance
                psychology to help you consistently reach flow states.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Brain,
                    title: "AI that learns your patterns",
                    desc: "The more you use ForceFocus, the smarter it gets about predicting your peak performance windows.",
                    color: "text-purple-500",
                    bg: "bg-purple-100 dark:bg-purple-900/20",
                  },
                  {
                    icon: Shield,
                    title: "Distraction-proof environment",
                    desc: "System-level blocking removes willpower from the equation. You can't fail what you can't access.",
                    color: "text-blue-600",
                    bg: "bg-blue-100 dark:bg-blue-900/20",
                  },
                  {
                    icon: TrendingUp,
                    title: "Compound productivity growth",
                    desc: "Users report 98% average productivity improvement within 30 days through habit formation.",
                    color: "text-emerald-600",
                    bg: "bg-emerald-100 dark:bg-emerald-900/20",
                  },
                ].map(({ icon: Icon, title, desc, color, bg }) => (
                  <div
                    key={title}
                    className="flex gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors duration-200"
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", bg)}>
                      <Icon className={cn("w-5 h-5", color)} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Focus Score", value: "94", suffix: "/100", color: "from-blue-500 to-blue-700", bg: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40", border: "border-blue-200 dark:border-blue-800" },
                  { label: "Streak", value: "24", suffix: " days", color: "from-orange-500 to-orange-700", bg: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/40", border: "border-orange-200 dark:border-orange-800" },
                  { label: "Tasks Done", value: "142", suffix: " this month", color: "from-emerald-500 to-emerald-700", bg: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/40", border: "border-emerald-200 dark:border-emerald-800" },
                  { label: "Hours Focused", value: "312", suffix: " hrs total", color: "from-purple-500 to-purple-700", bg: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/40", border: "border-purple-200 dark:border-purple-800" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className={cn(
                      "rounded-2xl border p-6 card-hover",
                      card.bg,
                      card.border
                    )}
                  >
                    <p className={cn("font-display text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-1", card.color)}>
                      {card.value}
                      <span className="text-base font-normal">{card.suffix}</span>
                    </p>
                    <p className="text-sm font-medium text-foreground/70">{card.label}</p>
                  </div>
                ))}
              </div>

              {/* Center AI Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-card border-2 border-blue-500/30 rounded-2xl p-4 shadow-blue-glow backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-foreground mt-2 text-center">AI Coach</p>
                  <p className="text-xs text-muted-foreground text-center">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DASHBOARD PREVIEW SECTION ==================== */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-badge mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              Live Dashboard
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Intelligence at a{" "}
              <span className="gradient-text">glance</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your personal performance command center. Every metric that matters,
              beautifully visualized.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4 py-1 px-3 bg-background rounded-md text-xs text-muted-foreground border border-border">
                  app.forcefocus.io/dashboard
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 bg-background">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Focus Score", value: "94", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Tasks Done", value: "12/15", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Deep Hours", value: "4.2h", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
                    { label: "Streak", value: "24d 🔥", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
                  ].map((stat) => (
                    <div key={stat.label} className={cn("rounded-xl p-4 border border-border", stat.bg)}>
                      <p className={cn("font-display text-xl font-bold", stat.color)}>{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Chart Bars (simplified visual) */}
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm font-semibold text-foreground mb-4">Weekly Focus Minutes</p>
                  <div className="flex items-end gap-2 h-24">
                    {[65, 85, 45, 95, 78, 52, 40].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-700"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {["M", "T", "W", "T", "F", "S", "S"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-radial from-blue-500/10 to-transparent rounded-3xl -z-10 blur-2xl" />
          </div>

          <div className="text-center mt-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 btn-primary text-sm"
            >
              Explore Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-badge mb-4">
              <Star className="w-3.5 h-3.5" />
              Loved by Professionals
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Real results from real{" "}
              <span className="gradient-text">people</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join 2.4M+ professionals, students, and teams who transformed their
              productivity with ForceFocus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-card border border-border rounded-2xl p-6 card-hover flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full">
                    {t.metric}
                  </span>
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-6">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} at {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRICING SECTION ==================== */}
      <section className="py-24 bg-muted/30" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-badge mb-4">
              <Zap className="w-3.5 h-3.5" />
              Simple Pricing
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Invest in your{" "}
              <span className="gradient-text">performance</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Start free. Upgrade when you're ready to unlock your full potential.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 bg-muted rounded-xl p-1">
              <button
                onClick={() => setPricingBilling("monthly")}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pricingBilling === "monthly"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setPricingBilling("yearly")}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  pricingBilling === "yearly"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Yearly
                <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-xs rounded-full">
                  -33%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-card rounded-2xl p-8 flex flex-col transition-all duration-300",
                  plan.popular
                    ? "border-2 border-blue-500 shadow-premium scale-105 shadow-blue-glow"
                    : "border border-border card-hover"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-foreground">
                      ${pricingBilling === "yearly"
                        ? Math.round(plan.price.yearly / 12)
                        : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                  {pricingBilling === "yearly" && plan.price.yearly > 0 && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                      ${plan.price.yearly}/year — save ${plan.price.monthly * 12 - plan.price.yearly}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={cn(
                    "w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-premium hover:shadow-blue-glow hover:-translate-y-0.5"
                      : "border border-border hover:bg-muted text-foreground"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="py-24 bg-background" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-badge mb-4">
              <Brain className="w-3.5 h-3.5" />
              Common Questions
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Frequently asked{" "}
              <span className="gradient-text">questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground text-sm mb-4">
              Still have questions?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 btn-secondary text-sm"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER SECTION ==================== */}
      <section className="py-24 bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gray-300 text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Join 2.4M+ high-performers
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your most productive year
            <br />
            starts{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              today
            </span>
          </h2>

          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Stop losing hours to distraction. Start building the focus habits that
            compound into an extraordinary life. Your first month is completely free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-blue-glow text-base hover:-translate-y-0.5"
            >
              Start Free — No Card Needed
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-200 text-base"
            >
              View Pricing
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            {["Free 14-day trial", "No credit card required", "Cancel anytime", "SOC 2 Compliant"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER SECTION ==================== */}
      <Footer />
    </div>
  );
}

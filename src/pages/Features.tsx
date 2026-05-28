import { Link } from "react-router-dom";
import {
  Timer, Target, Brain, Shield, TrendingUp, Users,
  Repeat, Heart, Zap, Check, ArrowRight, Play
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FEATURES_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Timer, Target, Brain, Shield, TrendingUp, Users, Repeat, Heart, Zap,
};

const detailedFeatures = [
  {
    category: "Focus Engine",
    icon: Timer,
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    features: [
      "Pomodoro & custom interval timers",
      "Deep work mode with ambient sounds",
      "AI-optimized session length recommendations",
      "Real-time focus score calculation",
      "Smart break timing based on flow state",
      "Session templates for different work types",
    ],
  },
  {
    category: "AI Coaching",
    icon: Brain,
    color: "from-purple-500 to-purple-700",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
    features: [
      "Personalized productivity recommendations",
      "Peak performance window detection",
      "Burnout risk prediction & prevention",
      "Work pattern analysis & feedback",
      "Goal achievement probability scoring",
      "Adaptive coaching based on behavior",
    ],
  },
  {
    category: "Distraction Control",
    icon: Shield,
    color: "from-red-500 to-red-700",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    features: [
      "Website & app blocking during sessions",
      "Focus lock mode (strict enforcement)",
      "Custom blocklist management",
      "Social media restriction schedules",
      "Emergency bypass with accountability code",
      "Distraction attempt logging & reporting",
    ],
  },
  {
    category: "Analytics & Insights",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
    features: [
      "Daily, weekly & monthly focus reports",
      "Productivity trend analysis",
      "Goal achievement tracking",
      "Comparative performance metrics",
      "Habit consistency scoring",
      "AI-generated performance predictions",
    ],
  },
  {
    category: "Team Collaboration",
    icon: Users,
    color: "from-cyan-500 to-cyan-700",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    border: "border-cyan-200 dark:border-cyan-800",
    features: [
      "Shared team workspaces",
      "Collaborative goal setting",
      "Focus challenges & competitions",
      "Team productivity leaderboards",
      "Manager analytics dashboard",
      "Accountability partner system",
    ],
  },
  {
    category: "Wellness & Recovery",
    icon: Heart,
    color: "from-pink-500 to-pink-700",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    border: "border-pink-200 dark:border-pink-800",
    features: [
      "Stress level monitoring",
      "Energy tracking throughout day",
      "Guided micro-meditation breaks",
      "Work-life balance reporting",
      "Burnout prevention alerts",
      "Recovery time recommendations",
    ],
  },
];

const integrations = [
  { name: "Google Calendar", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/48px-Google_Calendar_icon_%282020%29.svg.png" },
  { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/48px-Slack_icon_2019.svg.png" },
  { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/48px-Notion-logo.svg.png" },
  { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/48px-Octicons-mark-github.svg.png" },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:bg-[#0A0F1E]">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 dark:bg-white/10 dark:border-white/20 dark:text-gray-300 text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            Full Platform Overview
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground dark:text-white mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              perform at your peak
            </span>
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Nine powerful modules engineered to eliminate distraction, build habits, and maximize your output — all in one cohesive platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn-primary inline-flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors font-medium inline-flex items-center gap-2">
              <Play className="w-4 h-4" /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-badge mb-4">Core Modules</span>
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Nine modules, one{" "}
              <span className="gradient-text">platform</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES_LIST.map((feature) => {
              const Icon = ICON_MAP[feature.icon] || Zap;
              return (
                <div key={feature.title} className="group bg-card border border-border rounded-2xl p-6 card-hover">
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
        </div>
      </section>

      {/* Detailed Feature Sections */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-badge mb-4">Deep Dive</span>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Every feature, in detail
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedFeatures.map(({ category, icon: Icon, color, bg, border, features }) => (
              <div key={category} className={cn("rounded-2xl border p-6", bg, border)}>
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br text-white mb-4", color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-4">{category}</h3>
                <ul className="space-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="section-badge mb-4">Integrations</span>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Works with your existing tools
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            ForceFocus plugs into your workflow — not the other way around.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["Google Calendar", "Outlook", "Slack", "Microsoft Teams", "Notion", "Jira", "GitHub", "Asana", "Zapier", "Linear"].map((tool) => (
              <span key={tool} className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200 cursor-pointer">
                {tool}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            And 5,000+ more apps via Zapier. <Link to="/contact" className="text-blue-600 hover:underline">Request an integration →</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to experience the difference?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Start your 14-day free trial. No credit card needed.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

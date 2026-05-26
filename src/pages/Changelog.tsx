import { Link } from "react-router-dom";
import { Zap, ArrowRight, CheckCircle2, Circle, Sparkles, Wrench, Shield, Bug } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const releases = [
  {
    version: "3.4.0",
    date: "May 20, 2026",
    type: "major",
    title: "AI Burnout Detection 2.0 + Team Deep Work Sync",
    highlights: [
      "Redesigned burnout risk model with 94% detection accuracy",
      "Team-wide synchronized focus sessions with real-time status",
      "New Wellness Score dashboard widget",
    ],
    changes: [
      { type: "new", text: "AI Burnout Detection 2.0 with personalized risk thresholds" },
      { type: "new", text: "Team Deep Work Sync — start a focus session with your whole team" },
      { type: "new", text: "Wellness Score — composite metric of sleep, focus, and recovery" },
      { type: "new", text: "Focus streak calendar with heatmap visualization" },
      { type: "improved", text: "AI coach response latency reduced by 60%" },
      { type: "improved", text: "Mobile focus timer redesigned with haptic feedback support" },
      { type: "improved", text: "Dark mode contrast improvements across all chart components" },
      { type: "fix", text: "Fixed streak count not resetting correctly at midnight in non-UTC timezones" },
      { type: "fix", text: "Resolved Slack integration token refresh issue" },
    ],
  },
  {
    version: "3.3.0",
    date: "April 28, 2026",
    type: "feature",
    title: "Goals 2.0 — Milestone Tracking + AI Goal Coach",
    highlights: [
      "Completely rebuilt goal management system with milestone trees",
      "AI Goal Coach predicts completion probability in real-time",
      "Google Calendar two-way sync",
    ],
    changes: [
      { type: "new", text: "Goals 2.0: milestone tree, progress rings, and probability scoring" },
      { type: "new", text: "Google Calendar two-way sync for tasks and focus sessions" },
      { type: "new", text: "AI Goal Coach with deadline prediction and actionable nudges" },
      { type: "new", text: "Shared goals in team workspaces with individual contribution tracking" },
      { type: "improved", text: "Task prioritization algorithm updated with urgency decay model" },
      { type: "improved", text: "Onboarding flow reduced from 12 steps to 5" },
      { type: "fix", text: "Analytics date range filter now correctly handles DST transitions" },
      { type: "security", text: "Upgraded auth token rotation interval to 15 minutes" },
    ],
  },
  {
    version: "3.2.1",
    date: "April 10, 2026",
    type: "patch",
    title: "Performance Fixes & Accessibility Improvements",
    highlights: [
      "Significant load time improvements on mobile",
      "Full keyboard navigation support added",
      "12 bug fixes across timers and analytics",
    ],
    changes: [
      { type: "improved", text: "Initial load time on mobile reduced by 40% via bundle splitting" },
      { type: "improved", text: "Full keyboard navigation and ARIA label support across all interactive elements" },
      { type: "fix", text: "Timer sound not stopping on session skip — fixed" },
      { type: "fix", text: "Analytics bar chart tooltips overlapping on small screens" },
      { type: "fix", text: "Profile picture upload failing for files > 3MB" },
      { type: "fix", text: "Habit completion toggle occasionally double-triggering on mobile" },
    ],
  },
  {
    version: "3.2.0",
    date: "March 22, 2026",
    type: "feature",
    title: "Gamification Engine Launch + Global Leaderboards",
    highlights: [
      "Full XP and achievement badge system launched",
      "Global and friend leaderboards",
      "Weekly focus challenges with prizes",
    ],
    changes: [
      { type: "new", text: "XP system: earn points for focus sessions, habits, and goals" },
      { type: "new", text: "Achievement badges: 48 unique badges across 8 categories" },
      { type: "new", text: "Global leaderboard with weekly, monthly, and all-time rankings" },
      { type: "new", text: "Friends & rivals: follow other users and compare stats" },
      { type: "new", text: "Weekly focus challenges with streak bonuses" },
      { type: "improved", text: "Dashboard widget system now fully drag-and-drop" },
      { type: "security", text: "SOC 2 Type II certification completed" },
    ],
  },
  {
    version: "3.1.0",
    date: "February 14, 2026",
    type: "feature",
    title: "Distraction Blocker 3.0 — System-Level Blocking",
    highlights: [
      "System-level app blocking on macOS and Windows",
      "Smart block schedules tied to focus session type",
      "Emergency bypass with manager approval for teams",
    ],
    changes: [
      { type: "new", text: "System-level app blocking for macOS (v12+) and Windows 10/11" },
      { type: "new", text: "Smart block schedules: automatically configure blocklist per session type" },
      { type: "new", text: "Emergency bypass with configurable delay and manager approval" },
      { type: "new", text: "Blocklist templates: Social Media Pack, Gaming Pack, Entertainment Pack" },
      { type: "improved", text: "Chrome extension blocking now works in incognito mode" },
      { type: "fix", text: "Block list not syncing across devices — resolved" },
    ],
  },
  {
    version: "3.0.0",
    date: "January 6, 2026",
    type: "major",
    title: "ForceFocus 3.0 — Complete Platform Redesign",
    highlights: [
      "Ground-up UI redesign with new design system",
      "All-new AI engine with GPT-5 integration",
      "Launched Team Workspaces for organizations",
    ],
    changes: [
      { type: "new", text: "Complete UI redesign — faster, cleaner, more accessible" },
      { type: "new", text: "AI engine upgraded to GPT-5 with 3x faster coaching responses" },
      { type: "new", text: "Team Workspaces with roles, permissions, and org-level analytics" },
      { type: "new", text: "ForceFocus API v2 with webhooks, expanded endpoints, and rate limit increases" },
      { type: "new", text: "Offline mode — core features now work without internet" },
      { type: "improved", text: "End-to-end encrypted personal journal notes" },
      { type: "security", text: "GDPR compliance center with data export, deletion, and consent management" },
    ],
  },
];

const typeConfig = {
  major: { label: "Major Release", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
  feature: { label: "Feature Release", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" },
  patch: { label: "Patch", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700" },
};

const changeTypeConfig = {
  new: { icon: Sparkles, color: "text-blue-600 dark:text-blue-400", label: "New" },
  improved: { icon: Wrench, color: "text-emerald-600 dark:text-emerald-400", label: "Improved" },
  fix: { icon: Bug, color: "text-orange-600 dark:text-orange-400", label: "Fix" },
  security: { icon: Shield, color: "text-purple-600 dark:text-purple-400", label: "Security" },
};

export default function Changelog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0A0F1E] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gray-300 text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            What's New
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Changelog
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Every improvement, fix, and new feature — documented and organized. We ship meaningful updates every two weeks.
          </p>
        </div>
      </section>

      {/* Releases */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-12">
            {releases.map((release, idx) => {
              const tConfig = typeConfig[release.type as keyof typeof typeConfig];
              return (
                <article key={release.version} className="relative">
                  {/* Timeline connector */}
                  {idx < releases.length - 1 && (
                    <div className="absolute left-5 top-14 bottom-0 w-px bg-border -translate-x-1/2 z-0" style={{ height: "calc(100% + 3rem)" }} />
                  )}

                  <div className="flex gap-6">
                    {/* Version dot */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center z-10 relative shadow-premium">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 pb-2 min-w-0">
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-display font-bold text-xl text-foreground">v{release.version}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${tConfig.color}`}>
                          {tConfig.label}
                        </span>
                        <span className="text-sm text-muted-foreground">{release.date}</span>
                      </div>

                      <h2 className="font-display text-xl font-bold text-foreground mb-3 leading-snug">
                        {release.title}
                      </h2>

                      {/* Highlights */}
                      <div className="bg-muted/50 rounded-xl p-4 mb-5 border border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Release Highlights</p>
                        <ul className="space-y-1.5">
                          {release.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Changes list */}
                      <div className="space-y-2">
                        {release.changes.map((change, i) => {
                          const ctc = changeTypeConfig[change.type as keyof typeof changeTypeConfig];
                          const Icon = ctc.icon;
                          return (
                            <div key={i} className="flex items-start gap-3">
                              <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                                <Icon className={`w-3.5 h-3.5 ${ctc.color}`} />
                                <span className={`text-xs font-semibold w-16 ${ctc.color}`}>{ctc.label}</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{change.text}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Load older */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-blue-500 transition-all duration-200">
              Load older releases
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Stay up to date</h2>
          <p className="text-muted-foreground text-sm mb-6">Get notified when we ship major updates. No noise — only signal.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              import("sonner").then(({ toast }) => toast.success("You'll be notified of new releases!"));
            }}
            className="flex gap-3 max-w-sm mx-auto"
          >
            <input type="email" placeholder="your@email.com" className="input-field flex-1" />
            <button type="submit" className="btn-primary flex-shrink-0 px-5 py-3">Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

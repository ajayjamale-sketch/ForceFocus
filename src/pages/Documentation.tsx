import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Code2, Timer, Target, Repeat, Shield, BarChart3, Users,
  ChevronRight, Search, Zap, ArrowRight, ExternalLink, Terminal,
  Lightbulb, Copy, Check
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sections = [
  {
    id: "getting-started",
    icon: Zap,
    title: "Getting Started",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    articles: [
      { title: "Quick Start Guide", time: "5 min", popular: true },
      { title: "Account Setup & Onboarding", time: "3 min" },
      { title: "Connecting Your Calendar", time: "4 min" },
      { title: "Installing the Desktop App", time: "2 min" },
      { title: "Installing the Chrome Extension", time: "2 min", popular: true },
      { title: "Configuring Your Productivity Profile", time: "6 min" },
    ],
  },
  {
    id: "focus-sessions",
    icon: Timer,
    title: "Focus Sessions",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    articles: [
      { title: "Starting Your First Focus Session", time: "3 min", popular: true },
      { title: "Pomodoro vs Deep Work Mode", time: "5 min" },
      { title: "Custom Session Templates", time: "4 min" },
      { title: "Focus Music Integration", time: "3 min" },
      { title: "Session Analytics & Reports", time: "6 min" },
      { title: "Break Management & Recovery", time: "4 min" },
    ],
  },
  {
    id: "tasks-goals",
    icon: Target,
    title: "Tasks & Goals",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    articles: [
      { title: "Creating and Organizing Tasks", time: "5 min" },
      { title: "Setting Up Goals & Milestones", time: "7 min", popular: true },
      { title: "AI Task Prioritization", time: "4 min" },
      { title: "Daily & Weekly Planning", time: "6 min" },
      { title: "Project Tracking", time: "5 min" },
      { title: "Importing Tasks from Other Apps", time: "4 min" },
    ],
  },
  {
    id: "habits",
    icon: Repeat,
    title: "Habit Builder",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
    articles: [
      { title: "Creating Your First Habit", time: "3 min", popular: true },
      { title: "Habit Streaks & Accountability", time: "4 min" },
      { title: "Morning & Evening Routines", time: "6 min" },
      { title: "Habit Analytics & Trends", time: "5 min" },
      { title: "Habit Templates Library", time: "3 min" },
    ],
  },
  {
    id: "distraction-blocker",
    icon: Shield,
    title: "Distraction Blocker",
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    articles: [
      { title: "Setting Up Your Block List", time: "5 min", popular: true },
      { title: "System-Level App Blocking", time: "6 min" },
      { title: "Smart Schedule Blocks", time: "4 min" },
      { title: "Emergency Bypass Configuration", time: "3 min" },
      { title: "Team Blocking Policies", time: "5 min" },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    articles: [
      { title: "Understanding Your Productivity Score", time: "5 min" },
      { title: "Focus Time Reports", time: "4 min" },
      { title: "Goal Achievement Analytics", time: "5 min", popular: true },
      { title: "Exporting Your Data", time: "3 min" },
    ],
  },
  {
    id: "team",
    icon: Users,
    title: "Team Workspaces",
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
    articles: [
      { title: "Creating a Team Workspace", time: "5 min", popular: true },
      { title: "Inviting Team Members", time: "3 min" },
      { title: "Team Focus Challenges", time: "5 min" },
      { title: "Manager Analytics & Reports", time: "6 min" },
      { title: "Roles & Permissions", time: "4 min" },
    ],
  },
  {
    id: "api",
    icon: Code2,
    title: "API Reference",
    color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    articles: [
      { title: "Authentication & API Keys", time: "5 min" },
      { title: "Focus Sessions API", time: "8 min", popular: true },
      { title: "Tasks & Goals API", time: "7 min" },
      { title: "Webhooks & Events", time: "9 min" },
      { title: "Rate Limits & Quotas", time: "3 min" },
    ],
  },
];

const codeExample = `// Start a focus session via API
const response = await fetch('https://api.forcefocus.app/v2/sessions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'deep_work',
    duration: 90,
    tasks: ['task_abc123'],
    block_list: 'default'
  })
});

const session = await response.json();
console.log(session.id); // "sess_xyz789"`;

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-[#0F172A] rounded-xl overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs text-gray-400 font-mono">JavaScript</span>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-300 font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function Documentation() {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("getting-started");

  const filtered = sections.map((s) => ({
    ...s,
    articles: s.articles.filter(
      (a) => !search || a.title.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => !search || s.articles.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:bg-[#0A0F1E]">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 dark:bg-white/10 dark:border-white/20 dark:text-gray-300 text-sm font-medium mb-8">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            Documentation
          </span>
          <h1 className="font-display text-5xl font-bold text-foreground dark:text-white mb-4">
            Everything you need to get started
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 text-lg mb-8">
            Guides, API references, tutorials, and best practices for ForceFocus.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documentation..."
              className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-white/10 border border-border dark:border-white/20 rounded-xl text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-1">
                {sections.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSection(s.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                        activeSection === s.id
                          ? "bg-blue-600 text-white"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {s.title}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0 space-y-10">
              {/* Quick links */}
              {!search && (
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Zap, title: "Quick Start", desc: "Up and running in 5 minutes", href: "#getting-started", color: "border-blue-500/30 bg-blue-50 dark:bg-blue-900/10" },
                    { icon: Lightbulb, title: "Tutorials", desc: "Step-by-step walkthroughs", href: "#", color: "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-900/10" },
                    { icon: Code2, title: "API Reference", desc: "Full API documentation", href: "#api", color: "border-purple-500/30 bg-purple-50 dark:bg-purple-900/10" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <a key={item.title} href={item.href} className={`flex items-center gap-4 p-4 rounded-xl border card-hover ${item.color}`}>
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Doc sections */}
              {filtered.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${section.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h2 className="font-display text-xl font-bold text-foreground">{section.title}</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {section.articles.map((article) => (
                        <a
                          key={article.title}
                          href="#"
                          className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-3">
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            <div>
                              <span className="text-sm font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {article.title}
                              </span>
                              {article.popular && (
                                <span className="ml-2 px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-medium rounded">Popular</span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-3">{article.time}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* API Code Example */}
              {!search && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                      <Terminal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base">API Quick Example</h3>
                      <p className="text-sm text-muted-foreground">Start a focus session programmatically</p>
                    </div>
                  </div>
                  <CodeBlock code={codeExample} />
                  <div className="flex items-center gap-3 mt-4">
                    <a href="#" className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                      Full API Reference <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-muted-foreground text-sm">·</span>
                    <a href="#" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                      SDKs & Libraries <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

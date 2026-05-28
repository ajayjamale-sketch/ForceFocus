import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap, Calendar, MessageSquare, Code2, BarChart2, Globe, CheckCircle2,
  ArrowRight, ExternalLink, Puzzle, Slack, Mail, Chrome, Monitor
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const categories = ["All", "Calendars", "Communication", "Project Management", "Development", "Analytics", "Browser"];

const integrations = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    category: "Calendars",
    description: "Sync your focus sessions and tasks directly to Google Calendar. Auto-block time for deep work based on your schedule.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
    status: "available",
    popular: true,
    features: ["Two-way sync", "Auto focus blocks", "Meeting gap detection", "Smart scheduling"],
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    category: "Calendars",
    description: "Connect your Outlook calendar for seamless focus session scheduling across your Microsoft 365 ecosystem.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg",
    status: "available",
    popular: true,
    features: ["Two-way sync", "Teams meeting blocks", "Availability status sync"],
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description: "Automatically set your Slack status during focus sessions and pause non-urgent notifications.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
    status: "available",
    popular: true,
    features: ["Auto-status updates", "DND during sessions", "Focus summaries in channels", "Daily standup bot"],
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    category: "Communication",
    description: "Block focus time in Teams, mute notifications automatically, and share your productivity status with colleagues.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg",
    status: "available",
    popular: false,
    features: ["Status sync", "Focus room booking", "Team productivity cards"],
  },
  {
    id: "notion",
    name: "Notion",
    category: "Project Management",
    description: "Push completed tasks and focus sessions to Notion databases. Keep your workspace and productivity data in sync.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    status: "available",
    popular: true,
    features: ["Task sync", "Database push", "Focus log pages", "Goal tracking tables"],
  },
  {
    id: "jira",
    name: "Jira",
    category: "Project Management",
    description: "Link Jira tickets to ForceFocus tasks, track development sprints with focus data, and sync status updates.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Jira_Logo.svg",
    status: "available",
    popular: false,
    features: ["Issue sync", "Sprint tracking", "Time logging", "Status updates"],
  },
  {
    id: "asana",
    name: "Asana",
    category: "Project Management",
    description: "Import Asana tasks into ForceFocus and track deep work time against project timelines.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg",
    status: "available",
    popular: false,
    features: ["Task import", "Project sync", "Time tracking", "Focus reports"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "Development",
    description: "Connect commits, PRs, and issues to focus sessions. Track your coding output alongside your deep work metrics.",
    logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    status: "available",
    popular: true,
    features: ["Commit tracking", "PR focus sessions", "Issue linking", "Code output metrics"],
  },
  {
    id: "linear",
    name: "Linear",
    category: "Development",
    description: "The best issue tracker meets the best focus tool. Sync Linear issues to ForceFocus for developer-first productivity.",
    logo: "https://linear.app/favicon.ico",
    status: "available",
    popular: false,
    features: ["Issue sync", "Sprint sessions", "Status automation"],
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Development",
    description: "Connect ForceFocus to 5,000+ apps via Zapier. Build custom automation workflows without code.",
    logo: "https://cdn.zapier.com/zapier/images/favicon.ico",
    status: "available",
    popular: true,
    features: ["5,000+ app connections", "Custom triggers", "Automated workflows", "No-code setup"],
  },
  {
    id: "chrome",
    name: "Chrome Extension",
    category: "Browser",
    description: "The ForceFocus browser extension blocks distracting sites, tracks active tabs, and shows your focus timer in every tab.",
    logo: "https://www.google.com/chrome/static/images/chrome-logo.svg",
    status: "available",
    popular: true,
    features: ["Site blocking", "Tab tracking", "Focus overlay", "Quick timer launch"],
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    category: "Analytics",
    description: "Export ForceFocus productivity data to Google Analytics for custom dashboards and reporting.",
    logo: "https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg",
    status: "coming-soon",
    popular: false,
    features: ["Custom dimensions", "Event tracking", "Dashboard integration"],
  },
];

export default function Integrations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [connectedIds, setConnectedIds] = useState<string[]>(["slack", "google-calendar"]);

  const filtered = integrations.filter(
    (i) => activeCategory === "All" || i.category === activeCategory
  );

  const toggleConnect = (id: string) => {
    setConnectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
    const integration = integrations.find((i) => i.id === id);
    if (!connectedIds.includes(id)) {
      toast.success(`${integration?.name} connected successfully!`);
    } else {
      toast.info(`${integration?.name} disconnected.`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:bg-[#0A0F1E]">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 dark:bg-white/10 dark:border-white/20 dark:text-gray-300 text-sm font-medium mb-8">
            <Puzzle className="w-3.5 h-3.5 text-blue-400" />
            Integrations
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground dark:text-white mb-6 leading-tight">
            Connect your entire{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              workflow
            </span>
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            ForceFocus integrates with the tools you already use. Keep your workflow unified and your productivity data in sync everywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-foreground dark:text-white">
            {[
              { value: "50+", label: "Integrations" },
              { value: "5,000+", label: "Via Zapier" },
              { value: "Free", label: "All Plans" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-foreground dark:text-white">{s.value}</p>
                <p className="text-muted-foreground dark:text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((integration) => {
              const isConnected = connectedIds.includes(integration.id);
              return (
                <div key={integration.id} className="bg-card border border-border rounded-2xl p-5 card-hover flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 dark:border-gray-700 flex items-center justify-center p-2 overflow-hidden flex-shrink-0">
                        <img
                          src={integration.logo}
                          alt={integration.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const t = e.target as HTMLImageElement;
                            t.style.display = "none";
                            t.parentElement!.innerHTML = `<span class="text-lg font-bold text-gray-600">${integration.name[0]}</span>`;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{integration.name}</h3>
                        <span className="text-xs text-muted-foreground">{integration.category}</span>
                      </div>
                    </div>
                    {integration.popular && (
                      <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full flex-shrink-0">
                        Popular
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{integration.description}</p>

                  <div className="space-y-1.5 mb-5">
                    {integration.features.slice(0, 3).map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {integration.status === "coming-soon" ? (
                    <button
                      onClick={() => toast.info(`${integration.name} integration coming soon! We'll notify you.`)}
                      className="w-full py-2.5 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                    >
                      Notify Me
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleConnect(integration.id)}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isConnected
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 hover:bg-red-100 hover:text-red-600 hover:border-red-300"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {isConnected ? "✓ Connected — Click to Disconnect" : "Connect"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Request integration */}
          <div className="mt-12 bg-muted/30 border border-border rounded-2xl p-8 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Puzzle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Don't see what you need?</h3>
            <p className="text-muted-foreground text-sm mb-5">
              We're constantly adding new integrations. Request yours or build your own via our API.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => toast.success("Integration request submitted! We'll review it shortly.")}
                className="btn-primary text-sm"
              >
                Request Integration
              </button>
              <Link to="/docs" className="px-5 py-2.5 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-blue-500 transition-all duration-200 inline-flex items-center gap-2">
                View API Docs <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

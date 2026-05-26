import { Link } from "react-router-dom";
import { MapPin, Clock, Briefcase, ArrowRight, Zap, Users, Heart, TrendingUp, Globe, Coffee, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { toast } from "sonner";

const openRoles = [
  {
    id: "1",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US/EU)",
    type: "Full-time",
    level: "Senior",
    description: "Build the core productivity engine powering 2.4M+ users. Own full-stack features from backend logic to polished UI.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "2",
    title: "AI / ML Engineer",
    department: "AI",
    location: "Remote (Worldwide)",
    type: "Full-time",
    level: "Mid–Senior",
    description: "Design and fine-tune the behavioral models that power our AI Productivity Coach and burnout detection systems.",
    tags: ["Python", "PyTorch", "LLMs", "Behavioral ML"],
  },
  {
    id: "3",
    title: "Product Designer (UI/UX)",
    department: "Design",
    location: "Remote (US/EU)",
    type: "Full-time",
    level: "Mid–Senior",
    description: "Craft the world's most focused productivity UI. Shape design systems, flows, and micro-interactions that millions rely on daily.",
    tags: ["Figma", "Design Systems", "Motion", "Research"],
  },
  {
    id: "4",
    title: "Product Manager — Growth",
    department: "Product",
    location: "San Francisco / Remote",
    type: "Full-time",
    level: "Senior",
    description: "Own growth funnels from onboarding to activation. Work across data, design, and engineering to move key retention metrics.",
    tags: ["PLG", "Analytics", "A/B Testing", "Activation"],
  },
  {
    id: "5",
    title: "Developer Advocate",
    department: "Developer Relations",
    location: "Remote (Worldwide)",
    type: "Full-time",
    level: "Mid",
    description: "Build the ForceFocus developer community. Create tutorials, integrations, and partner with the productivity developer ecosystem.",
    tags: ["APIs", "Content", "Community", "Demos"],
  },
  {
    id: "6",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid",
    description: "Own the health and expansion of our top 200 enterprise accounts. Be the trusted advisor for productivity transformation.",
    tags: ["Enterprise", "Onboarding", "Retention", "Upsell"],
  },
  {
    id: "7",
    title: "Data Analyst",
    department: "Data",
    location: "Remote (US/EU)",
    type: "Full-time",
    level: "Mid",
    description: "Turn behavioral data from millions of focus sessions into actionable product insights. Drive decision-making across all teams.",
    tags: ["SQL", "dbt", "Metabase", "Python"],
  },
  {
    id: "8",
    title: "Content Strategist & Writer",
    department: "Marketing",
    location: "Remote (Worldwide)",
    type: "Full-time",
    level: "Mid",
    description: "Create research-backed content that positions ForceFocus as the authority on productivity science and deep work.",
    tags: ["SEO", "Long-form", "Research", "Newsletter"],
  },
];

const perks = [
  { icon: Globe, title: "Fully Remote", desc: "Work from anywhere. Async-first culture with quarterly in-person retreats." },
  { icon: TrendingUp, title: "Equity for Everyone", desc: "Meaningful equity grants for all full-time employees, not just executives." },
  { icon: Heart, title: "Health & Wellness", desc: "Top-tier health, dental, vision + $150/month wellness stipend." },
  { icon: Coffee, title: "$500 Home Office Stipend", desc: "Set up your ideal deep work environment, on us." },
  { icon: Star, title: "Learning Budget", desc: "$2,000/year for courses, books, conferences, and coaching." },
  { icon: Clock, title: "Flexible PTO", desc: "Unlimited PTO with a 2-week annual minimum. We mean it." },
  { icon: Users, title: "Small, High-Impact Team", desc: "42 people. Every engineer ships features used by millions." },
  { icon: Briefcase, title: "Top-of-Market Pay", desc: "Competitive compensation benchmarked at 90th percentile." },
];

const deptColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  AI: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Design: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Product: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Developer Relations": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  "Customer Success": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Data: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Marketing: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

export default function Careers() {
  const [activeDept, setActiveDept] = useState("All");
  const departments = ["All", ...Array.from(new Set(openRoles.map((r) => r.department)))];

  const filtered = activeDept === "All" ? openRoles : openRoles.filter((r) => r.department === activeDept);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0A0F1E] pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gray-300 text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            We're Hiring
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Help us build the future of{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              human performance
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            We're a small, remote team of 42 building productivity tools used by 2.4M+ people worldwide. Join us.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { value: "42", label: "Team Members" },
              { value: "8", label: "Open Roles" },
              { value: "12", label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-white">{s.value}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">Why ForceFocus?</h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">We build the tools we wish existed. Small team, massive impact. Here's what makes working here different.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-5 card-hover text-left">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 bg-background" id="open-roles">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="section-badge mb-4">Open Positions</span>
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">
              {filtered.length} open role{filtered.length !== 1 ? "s" : ""}
            </h2>
          </div>

          {/* Department filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeDept === d
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((role) => (
              <div key={role.id} className="bg-card border border-border rounded-2xl p-6 card-hover group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${deptColors[role.department]}`}>
                        {role.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {role.level}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {role.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{role.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{role.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-muted rounded-lg text-xs font-medium text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => toast.success(`Application for ${role.title} submitted!`)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 flex-shrink-0"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* General application */}
          <div className="mt-10 bg-gradient-to-r from-blue-600/10 to-emerald-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Don't see your role?</h3>
            <p className="text-sm text-muted-foreground mb-5">
              We're always looking for exceptional people. Send us your CV and a note about what you'd build at ForceFocus.
            </p>
            <a
              href="mailto:careers@forcefocus.app"
              className="btn-primary inline-flex items-center gap-2"
            >
              Send General Application
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

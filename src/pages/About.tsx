import { Link } from "react-router-dom";
import {
  Zap, Users, Target, Heart, Award, ArrowRight,
  Linkedin, Twitter, Globe, Star
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const team = [
  {
    name: "Jordan Lee",
    role: "CEO & Co-founder",
    bio: "Former deep work researcher at Stanford. Built 3 startups before ForceFocus.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Priya Nair",
    role: "CTO & Co-founder",
    bio: "10 years engineering at Google. Obsessed with systems that scale to millions.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Marcus Webb",
    role: "Head of Design",
    bio: "Ex-Figma & Linear. Believes beautiful software makes people perform better.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sofia Andersen",
    role: "Head of AI",
    bio: "PhD in behavioral psychology. Translates neuroscience into product features.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Kevin Zhang",
    role: "VP of Engineering",
    bio: "Built real-time systems at Stripe. Loves distributed architecture.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Amara Osei",
    role: "Head of Growth",
    bio: "Scaled Notion to 10M users. Growth specialist with a product mindset.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    linkedin: "#",
    twitter: "#",
  },
];

const values = [
  {
    icon: Target,
    title: "Intentionality First",
    desc: "We design every feature to deepen focus, not fragment it. No dark patterns. No engagement traps.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    icon: Users,
    title: "Human-Centered",
    desc: "We study how real people work and build tools that adapt to humans, not the other way around.",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    icon: Heart,
    title: "Wellness Over Output",
    desc: "Sustainable performance requires recovery. We measure success by wellbeing, not just hours worked.",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    icon: Award,
    title: "Excellence in Craft",
    desc: "Every pixel, every algorithm, every word matters. We ship things we're genuinely proud of.",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
];

const milestones = [
  { year: "2022", title: "Founded in San Francisco", desc: "Jordan and Priya met at a deep work retreat and saw the opportunity to build the world's best focus platform." },
  { year: "2023 Q1", title: "Seed Round: $3.2M", desc: "Raised from Andreessen Horowitz and angels including the founders of Notion and Linear." },
  { year: "2023 Q3", title: "100,000 Users", desc: "Reached our first 100K users in just 6 months — entirely through word of mouth." },
  { year: "2024 Q1", title: "Series A: $18M", desc: "Led by Sequoia Capital. Expanded the team to 42 people across 12 countries." },
  { year: "2024 Q4", title: "1 Million Users", desc: "Crossed 1M active users. Launched team workspaces and enterprise features." },
  { year: "2026", title: "2.4M Users & Growing", desc: "Serving individuals, students, and Fortune 500 companies across 80+ countries." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:bg-[#0A0F1E]">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 dark:bg-white/10 dark:border-white/20 dark:text-gray-300 text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            Our Story
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground dark:text-white mb-6 leading-tight">
            We're building the world's best{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              focus platform
            </span>
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            ForceFocus was born from a simple belief: the most important work in the world requires deep, uninterrupted concentration. We built the tools we wished existed.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-foreground dark:text-white">
            {[
              { value: "2.4M+", label: "Active Users" },
              { value: "80+", label: "Countries" },
              { value: "500K+", label: "Focus Hours Daily" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-foreground dark:text-white">{stat.value}</p>
                <p className="text-muted-foreground dark:text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="section-badge mb-4">Our Mission</span>
          <h2 className="font-display text-4xl font-bold text-foreground mb-6">
            Helping humanity do its{" "}
            <span className="gradient-text">best work</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We live in the most distracted era in human history. Every app, notification, and platform competes for your most precious resource: attention. ForceFocus exists to give that attention back to you — and direct it toward the work that truly matters. We believe that when people can focus deeply, they solve harder problems, build better things, and live more fulfilling lives.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-badge mb-4">Our Values</span>
            <h2 className="font-display text-4xl font-bold text-foreground">What we stand for</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 card-hover">
                <div className={`feature-icon mb-4 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-badge mb-4">Our Journey</span>
            <h2 className="font-display text-4xl font-bold text-foreground">How we got here</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 pl-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 z-10 shadow-premium">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="pb-2">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{m.year}</span>
                    <h3 className="text-base font-semibold text-foreground mt-1 mb-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30" id="team">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="section-badge mb-4">The Team</span>
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Built by people who care about focus
            </h2>
            <p className="text-lg text-muted-foreground">
              A small, high-output team obsessed with productivity science.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-card border border-border rounded-2xl p-6 card-hover">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-2xl object-cover mb-4"
                />
                <h3 className="text-base font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                <div className="flex gap-2">
                  <a href={member.linkedin} className="w-8 h-8 rounded-lg bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 flex items-center justify-center transition-colors">
                    <Linkedin className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>
                  <a href={member.twitter} className="w-8 h-8 rounded-lg bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 flex items-center justify-center transition-colors">
                    <Twitter className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 text-sm">
            <span className="font-medium text-foreground">We're hiring!</span>{" "}
            <a href="#careers" className="text-blue-600 hover:underline">View open roles →</a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-[#0F172A] dark:to-[#1E3A5F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Join us on the mission</h2>
          <p className="text-blue-100 dark:text-gray-400 mb-8">
            Whether as a user, team member, or investor — there are many ways to be part of ForceFocus.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn-primary">Start for Free</Link>
            <Link to="/contact" className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

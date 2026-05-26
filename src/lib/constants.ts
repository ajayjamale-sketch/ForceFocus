import type { PricingPlan, Testimonial, BlogPost } from "@/types";

export const APP_NAME = "ForceFocus";
export const APP_TAGLINE = "AI-Powered Productivity Platform";
export const APP_DESCRIPTION =
  "Eliminate distractions, build deep work habits, and maximize productivity through intelligent focus sessions and behavioral insights.";

export const NAV_ITEMS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for individuals getting started with focused work.",
    features: [
      "5 focus sessions/day",
      "Basic task management",
      "Pomodoro timer",
      "7-day analytics",
      "2 habit trackers",
      "Mobile app access",
    ],
    cta: "Start Free",
    color: "border-border",
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 12, yearly: 96 },
    description: "For serious professionals who demand peak performance.",
    features: [
      "Unlimited focus sessions",
      "AI productivity coach",
      "Advanced task & goal management",
      "90-day analytics & trends",
      "Unlimited habit tracking",
      "Distraction blocker",
      "Focus music integration",
      "Priority support",
    ],
    popular: true,
    cta: "Start Pro Trial",
    color: "border-blue-500",
  },
  {
    id: "team",
    name: "Team",
    price: { monthly: 28, yearly: 224 },
    description: "Built for teams that want to reach collective flow states.",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Shared goals & projects",
      "Team analytics dashboard",
      "Focus challenges",
      "Productivity leaderboards",
      "Admin controls",
      "Slack & Teams integration",
      "Dedicated account manager",
    ],
    cta: "Start Team Trial",
    color: "border-emerald-500",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior Product Manager",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    content:
      "ForceFocus completely transformed how I structure my workday. My deep work hours increased by 3x in the first month. The AI coaching is genuinely insightful.",
    rating: 5,
    metric: "+3x Deep Work",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Software Engineer",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    content:
      "The distraction blocking is so seamless I forget it's running. My coding output went from 4 to 7 meaningful commits per day. Nothing else comes close.",
    rating: 5,
    metric: "+75% Output",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "PhD Researcher",
    company: "MIT",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    content:
      "Writing my dissertation felt impossible until ForceFocus. The habit system helped me write 2,000 words daily without burnout. Finished 3 months ahead of schedule.",
    rating: 5,
    metric: "3 Months Early",
  },
  {
    id: "4",
    name: "David Park",
    role: "Startup Founder",
    company: "NovaTech",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    content:
      "Managing a remote team was chaotic. ForceFocus team workspaces gave us alignment and visibility we never had. Productivity metrics improved across the board.",
    rating: 5,
    metric: "Team Sync +60%",
  },
  {
    id: "5",
    name: "Elena Rodriguez",
    role: "UX Designer",
    company: "Adobe",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    content:
      "The wellness insights saved me from burnout twice. It actually detected my stress patterns before I did and suggested recovery plans. Genuinely impressed.",
    rating: 5,
    metric: "Burnout Prevention",
  },
  {
    id: "6",
    name: "James O'Brien",
    role: "Financial Analyst",
    company: "Goldman Sachs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    content:
      "In finance, focus is everything. ForceFocus gave me the edge to process more data, make better decisions, and leave the office on time for the first time in years.",
    rating: 5,
    metric: "Work-Life Balance",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Science Behind Deep Work: Why 4 Hours Beats 10 Hours of Shallow Focus",
    excerpt: "Research shows that deep work sessions of 90-120 minutes produce more output than full days of distracted work. Here's the neuroscience behind why.",
    content: "",
    author: "Dr. Alex Kumar",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
    publishedAt: "2026-05-18",
    readTime: 8,
    category: "Productivity Science",
    tags: ["deep work", "neuroscience", "focus"],
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop",
    slug: "science-behind-deep-work",
  },
  {
    id: "2",
    title: "How to Build an Unbreakable Morning Routine in 21 Days",
    excerpt: "The most productive people don't rely on motivation — they rely on systems. This step-by-step guide will help you design a morning routine that sticks.",
    content: "",
    author: "Maya Patel",
    authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    publishedAt: "2026-05-12",
    readTime: 6,
    category: "Habits & Routines",
    tags: ["morning routine", "habits", "discipline"],
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
    slug: "unbreakable-morning-routine",
  },
  {
    id: "3",
    title: "AI-Powered Time Management: How ForceFocus Predicts Your Peak Hours",
    excerpt: "Your brain isn't equally sharp all day. ForceFocus's AI analyzes your behavior to identify your personal peak performance windows and optimize your schedule.",
    content: "",
    author: "Chris Taylor",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
    publishedAt: "2026-05-05",
    readTime: 10,
    category: "AI & Technology",
    tags: ["AI", "time management", "optimization"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    slug: "ai-powered-time-management",
  },
  {
    id: "4",
    title: "The Hidden Cost of Task Switching: Why Multitasking is Destroying Your Brain",
    excerpt: "Every time you switch tasks, you pay a cognitive penalty. Learn how the 'attention residue' effect is costing you 40% of your productive capacity.",
    content: "",
    author: "Dr. Alex Kumar",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
    publishedAt: "2026-04-28",
    readTime: 7,
    category: "Productivity Science",
    tags: ["multitasking", "attention", "cognitive performance"],
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
    slug: "hidden-cost-task-switching",
  },
  {
    id: "5",
    title: "Team Flow States: How to Get Your Entire Team Into Deep Work Together",
    excerpt: "Individual focus is powerful — but synchronized team flow is transformative. Here's how leading organizations are coordinating deep work at scale.",
    content: "",
    author: "Maya Patel",
    authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    publishedAt: "2026-04-20",
    readTime: 9,
    category: "Team Productivity",
    tags: ["team", "flow state", "collaboration"],
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
    slug: "team-flow-states",
  },
  {
    id: "6",
    title: "Burnout Recovery: A 30-Day Protocol to Rebuild Your Cognitive Capacity",
    excerpt: "Burnout isn't just tiredness — it's a fundamental depletion of neural resources. This evidence-based protocol helps you restore peak mental performance.",
    content: "",
    author: "Chris Taylor",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
    publishedAt: "2026-04-14",
    readTime: 12,
    category: "Wellness",
    tags: ["burnout", "recovery", "mental health"],
    coverImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=450&fit=crop",
    slug: "burnout-recovery-protocol",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What makes ForceFocus different from other productivity apps?",
    answer:
      "ForceFocus combines AI-powered coaching, deep work session management, distraction blocking, habit formation, and team collaboration into a single unified platform. Unlike apps that only track time or only block sites, ForceFocus analyzes your behavioral patterns to provide personalized recommendations and predictive insights that actually improve your performance over time.",
  },
  {
    question: "How does the AI Productivity Coach work?",
    answer:
      "The AI Coach analyzes your focus session data, task completion patterns, and wellness indicators to build a personalized performance model. It identifies your peak hours, recurring distraction patterns, burnout risk factors, and provides actionable recommendations. The more you use ForceFocus, the smarter and more personalized the coaching becomes.",
  },
  {
    question: "Does ForceFocus work on all my devices?",
    answer:
      "Yes. ForceFocus is available as a web app, iOS app, Android app, Chrome extension, and desktop app for Mac and Windows. All your data syncs in real-time across devices. The distraction blocking feature works at the system level when you install the desktop app or browser extension.",
  },
  {
    question: "Can I use ForceFocus for team collaboration?",
    answer:
      "Absolutely. Our Team plan supports collaborative workspaces, shared goals and projects, team focus challenges, productivity leaderboards, and comprehensive team analytics. Managers get detailed reports on team performance, while individual members maintain privacy over their personal productivity data.",
  },
  {
    question: "Is there a free trial for the Pro plan?",
    answer:
      "Yes — both Pro and Team plans include a 14-day free trial with no credit card required. You get full access to all features during the trial period. If you don't upgrade, you automatically revert to the Starter (free) plan without losing your data.",
  },
  {
    question: "How does the distraction blocking work?",
    answer:
      "ForceFocus uses a combination of browser extension and system-level blocking to restrict access to distracting websites and apps during focus sessions. You configure your blocklist, and during active sessions, blocked sites show a motivating ForceFocus overlay instead. You can set emergency bypass codes for genuinely urgent situations.",
  },
  {
    question: "What integrations does ForceFocus support?",
    answer:
      "ForceFocus integrates with Google Calendar, Outlook, Slack, Microsoft Teams, Notion, Jira, Asana, GitHub, and more. We also offer a Zapier integration for connecting to 5,000+ apps. Enterprise customers get custom API access and SSO/SAML integration.",
  },
  {
    question: "How is my data protected?",
    answer:
      "Your data is encrypted at rest (AES-256) and in transit (TLS 1.3). We're SOC 2 Type II compliant, GDPR compliant, and CCPA compliant. We never sell your data to third parties. You can export or delete all your data at any time from your account settings.",
  },
];

export const FEATURES_LIST = [
  {
    icon: "Timer",
    title: "AI Focus Sessions",
    description: "Intelligent Pomodoro and deep work sessions that adapt to your energy levels and optimize break timing.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    icon: "Target",
    title: "Goal & Task Management",
    description: "AI-prioritized tasks with milestone tracking, deadline management, and progress visualization.",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    gradient: "from-emerald-500 to-emerald-700",
  },
  {
    icon: "Brain",
    title: "AI Productivity Coach",
    description: "Personalized coaching that learns your patterns and provides actionable recommendations to improve performance.",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    icon: "Shield",
    title: "Distraction Blocker",
    description: "Smart website and app blocking with focus lock mode. Never lose concentration to social media again.",
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    gradient: "from-red-500 to-red-700",
  },
  {
    icon: "TrendingUp",
    title: "Performance Analytics",
    description: "Deep insights into your productivity patterns, focus trends, and goal achievement with predictive analytics.",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    gradient: "from-orange-500 to-orange-700",
  },
  {
    icon: "Users",
    title: "Team Workspaces",
    description: "Collaborative focus sessions, shared goals, team challenges, and performance leaderboards for maximum team output.",
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
    gradient: "from-cyan-500 to-cyan-700",
  },
  {
    icon: "Repeat",
    title: "Habit Builder",
    description: "Build productive habits with streak tracking, routine templates, and evidence-based behavior change systems.",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
    gradient: "from-pink-500 to-pink-700",
  },
  {
    icon: "Heart",
    title: "Wellness & Recovery",
    description: "Monitor stress levels, track energy patterns, and get personalized recovery recommendations to prevent burnout.",
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
    gradient: "from-teal-500 to-teal-700",
  },
  {
    icon: "Zap",
    title: "Gamification Engine",
    description: "XP systems, achievement badges, focus challenges, and global leaderboards that make productivity addictive.",
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    gradient: "from-yellow-500 to-yellow-600",
  },
];

export const STATS = [
  { value: "2.4M+", label: "Active Users", suffix: "" },
  { value: "98", label: "Productivity Increase", suffix: "%" },
  { value: "4.9", label: "Average Rating", suffix: "/5" },
  { value: "500K+", label: "Hours Focused Daily", suffix: "" },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Set Your Intentions",
    description: "Define your goals for the day with AI-assisted prioritization. ForceFocus analyzes your workload and energy forecast to build an optimal daily plan.",
    icon: "Lightbulb",
    color: "bg-blue-500",
  },
  {
    step: "02",
    title: "Enter Deep Focus",
    description: "Start a focus session and let ForceFocus block distractions, play focus music, and track your concentration. The AI adapts session length to your flow state.",
    icon: "Zap",
    color: "bg-emerald-500",
  },
  {
    step: "03",
    title: "Recover Smartly",
    description: "Evidence-based break recommendations ensure you recover fully. Micro-meditations, movement reminders, and energy tracking keep you sharp all day.",
    icon: "Leaf",
    color: "bg-teal-500",
  },
  {
    step: "04",
    title: "Review & Improve",
    description: "End-of-day reflections and AI-generated insights surface patterns in your productivity. Each day, ForceFocus gets smarter about what works for you.",
    icon: "BarChart3",
    color: "bg-purple-500",
  },
];

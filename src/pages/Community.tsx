import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, MessageCircle, Trophy, Globe, Zap, ArrowRight, Star,
  Hash, TrendingUp, Heart, Share2, Bookmark, ThumbsUp, ExternalLink
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const stats = [
  { value: "2.4M+", label: "Community Members" },
  { value: "80+", label: "Countries" },
  { value: "12K+", label: "Forum Posts/Month" },
  { value: "98%", label: "Questions Answered" },
];

const channels = [
  { icon: Hash, name: "#general", desc: "General productivity chat, introductions, and announcements", members: "18,400", color: "text-blue-500" },
  { icon: Hash, name: "#deep-work-tips", desc: "Share your best strategies for distraction-free focus", members: "12,200", color: "text-emerald-500" },
  { icon: Hash, name: "#habit-accountability", desc: "Daily check-ins and habit streak celebrations", members: "9,800", color: "text-pink-500" },
  { icon: Hash, name: "#ai-productivity", desc: "Discuss AI tools, automation, and smart workflows", members: "8,100", color: "text-purple-500" },
  { icon: Hash, name: "#team-productivity", desc: "For managers and team leads optimizing group performance", members: "5,400", color: "text-cyan-500" },
  { icon: Hash, name: "#student-focus", desc: "Study strategies, exam prep, and academic deep work", members: "14,300", color: "text-orange-500" },
];

const forumPosts = [
  {
    id: "1",
    title: "How I went from 2 hours to 6 hours of deep work per day in 30 days",
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    category: "Success Stories",
    replies: 142,
    likes: 847,
    time: "2 hours ago",
    pinned: true,
  },
  {
    id: "2",
    title: "Best ForceFocus settings for software engineers? Share your configs",
    author: "Marcus Dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    category: "Tips & Configs",
    replies: 98,
    likes: 421,
    time: "5 hours ago",
    pinned: false,
  },
  {
    id: "3",
    title: "Struggling with afternoon energy crashes — what works for you?",
    author: "Priya S.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    category: "Wellness",
    replies: 67,
    likes: 193,
    time: "1 day ago",
    pinned: false,
  },
  {
    id: "4",
    title: "I analyzed 6 months of my focus data — here's what I found",
    author: "Data_Kevin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    category: "Analytics",
    replies: 213,
    likes: 1240,
    time: "3 days ago",
    pinned: true,
  },
  {
    id: "5",
    title: "Feature Request: Habit templates for different career types",
    author: "Amara O.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    category: "Feature Requests",
    replies: 34,
    likes: 187,
    time: "4 days ago",
    pinned: false,
  },
  {
    id: "6",
    title: "Weekly Focus Challenge — May Week 4: The 'Single Task' Sprint",
    author: "ForceFocus Team",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
    category: "Challenges",
    replies: 445,
    likes: 2100,
    time: "5 days ago",
    pinned: true,
  },
];

const categoryColors: Record<string, string> = {
  "Success Stories": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Tips & Configs": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Wellness: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Analytics: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Feature Requests": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Challenges: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

const weeklyChallenge = {
  title: "The 'Single Task' Sprint",
  description: "Work on one and only one task per focus session this week. No multitasking, no tab switching. Track your focus quality score at the end.",
  participants: 3841,
  daysLeft: 3,
  prize: "Exclusive 'Laser Focus' badge + 500 XP",
};

export default function Community() {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [joined, setJoined] = useState(false);

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:bg-[#0A0F1E]">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 dark:bg-white/10 dark:border-white/20 dark:text-gray-300 text-sm font-medium mb-8">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            Community
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground dark:text-white mb-6 leading-tight">
            2.4M people focused on{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              doing great work
            </span>
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Share strategies, celebrate wins, join challenges, and connect with the most motivated people on the planet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => { setJoined(true); toast.success("Welcome to the ForceFocus Community!"); }}
              className={`px-8 py-3 font-semibold rounded-xl transition-all duration-200 ${joined ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              {joined ? "✓ Joined Community" : "Join Community — Free"}
            </button>
            <a href="#forum" className="px-8 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors font-medium">
              Browse Forum
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Challenge */}
      <section className="py-14 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-300" />
                <span className="text-yellow-300 text-sm font-semibold uppercase tracking-wide">Weekly Challenge</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">{weeklyChallenge.title}</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-5 max-w-xl">{weeklyChallenge.description}</p>
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div>
                  <p className="text-2xl font-bold text-white">{weeklyChallenge.participants.toLocaleString()}</p>
                  <p className="text-blue-200 text-xs">Participants</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{weeklyChallenge.daysLeft}</p>
                  <p className="text-blue-200 text-xs">Days Left</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-100">🏆 Prize: {weeklyChallenge.prize}</p>
                </div>
              </div>
              <button
                onClick={() => toast.success("You've joined the weekly challenge!")}
                className="px-6 py-2.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm"
              >
                Join Challenge
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-14 bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Discord Channels</h2>
            <p className="text-muted-foreground">Join topic-specific channels on our Discord server</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.name}
                  href="#"
                  className="bg-card border border-border rounded-xl p-4 card-hover flex items-start gap-3 group"
                >
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${ch.color}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{ch.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{ch.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1.5">{ch.members} members</p>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <a href="#" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
              Join our Discord server <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Forum */}
      <section className="py-16 bg-background" id="forum">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Community Forum</h2>
              <p className="text-muted-foreground text-sm mt-1">Discussions, insights, and announcements</p>
            </div>
            <button
              onClick={() => toast.info("Forum post creation coming soon!")}
              className="btn-primary text-sm px-4 py-2"
            >
              New Post
            </button>
          </div>

          <div className="space-y-3">
            {forumPosts.map((post) => (
              <div key={post.id} className="bg-card border border-border rounded-xl p-5 card-hover">
                <div className="flex items-start gap-4">
                  <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {post.pinned && (
                        <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold rounded">📌 Pinned</span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>{post.category}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug mb-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/70">{post.author}</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 text-muted-foreground">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${likedPosts.includes(post.id) ? "text-red-500" : "hover:text-red-500"}`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedPosts.includes(post.id) ? "fill-red-500" : ""}`} />
                      {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </button>
                    <div className="flex items-center gap-1 text-xs">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {post.replies}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-blue-500 transition-all duration-200">
              Load more discussions <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

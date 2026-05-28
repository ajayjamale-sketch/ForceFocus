import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users, MessageCircle, Trophy, Globe, Zap, ArrowRight, Star,
  Hash, TrendingUp, Heart, Share2, Bookmark, ThumbsUp, ExternalLink,
  Plus, X, Send
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Types
interface ForumPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  category: string;
  replies: number;
  likes: number;
  time: string;
  pinned: boolean;
  timestamp: number; // for sorting
}

// Extended posts data (original + more for pagination)
const basePosts: ForumPost[] = [
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
    timestamp: Date.now() - 2 * 3600000,
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
    timestamp: Date.now() - 5 * 3600000,
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
    timestamp: Date.now() - 86400000,
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
    timestamp: Date.now() - 3 * 86400000,
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
    timestamp: Date.now() - 4 * 86400000,
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
    timestamp: Date.now() - 5 * 86400000,
  },
];

// Generate additional posts for pagination demo
const generateMorePosts = (count: number): ForumPost[] => {
  const categories = ["Success Stories", "Tips & Configs", "Wellness", "Analytics", "Feature Requests", "Challenges"];
  const authors = ["Alex Rivera", "Jamie L.", "Taylor Swift", "Jordan Lee", "Casey Kim", "Riley Wong"];
  const titles = [
    "My morning routine that doubled my productivity",
    "How to handle interruptions in an open office",
    "The Pomodoro technique actually works – here's proof",
    "Using ForceFocus with ADHD: a personal journey",
    "Team focus: how we improved sprint velocity by 40%",
    "Deep work vs shallow work: recognizing the difference",
  ];
  const posts: ForumPost[] = [];
  for (let i = 0; i < count; i++) {
    posts.push({
      id: `extra-${i}`,
      title: `${titles[i % titles.length]} (${i + 1})`,
      author: authors[i % authors.length],
      avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"}/${i}.jpg`,
      category: categories[i % categories.length],
      replies: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 500),
      time: `${Math.floor(Math.random() * 10) + 1} days ago`,
      pinned: false,
      timestamp: Date.now() - (Math.random() * 30 * 86400000),
    });
  }
  return posts;
};

const allPosts = [...basePosts, ...generateMorePosts(15)];

// Storage keys
const STORAGE_KEYS = {
  JOINED_COMMUNITY: "ff_community_joined",
  JOINED_CHALLENGE: "ff_joined_challenge",
  LIKED_POSTS: "ff_liked_posts",
  USER_POSTS: "ff_user_posts",
};

const stats = [
  { value: "2.4M+", label: "Community Members" },
  { value: "80+", label: "Countries" },
  { value: "12K+", label: "Forum Posts/Month" },
  { value: "98%", label: "Questions Answered" },
];

const channels = [
  { icon: Hash, name: "#general", desc: "General productivity chat, introductions, and announcements", members: "18,400", color: "text-blue-500", invite: "https://discord.gg/forcefocus-general" },
  { icon: Hash, name: "#deep-work-tips", desc: "Share your best strategies for distraction-free focus", members: "12,200", color: "text-emerald-500", invite: "https://discord.gg/forcefocus-deepwork" },
  { icon: Hash, name: "#habit-accountability", desc: "Daily check-ins and habit streak celebrations", members: "9,800", color: "text-pink-500", invite: "https://discord.gg/forcefocus-habits" },
  { icon: Hash, name: "#ai-productivity", desc: "Discuss AI tools, automation, and smart workflows", members: "8,100", color: "text-purple-500", invite: "https://discord.gg/forcefocus-ai" },
  { icon: Hash, name: "#team-productivity", desc: "For managers and team leads optimizing group performance", members: "5,400", color: "text-cyan-500", invite: "https://discord.gg/forcefocus-teams" },
  { icon: Hash, name: "#student-focus", desc: "Study strategies, exam prep, and academic deep work", members: "14,300", color: "text-orange-500", invite: "https://discord.gg/forcefocus-students" },
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
  const [joined, setJoined] = useState(false);
  const [joinedChallenge, setJoinedChallenge] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<ForumPost[]>([]);
  const [postLimit, setPostLimit] = useState(6);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", category: "General", content: "" });
  const [userPosts, setUserPosts] = useState<ForumPost[]>([]);

  // Load persisted state
  useEffect(() => {
    const storedJoined = localStorage.getItem(STORAGE_KEYS.JOINED_COMMUNITY);
    if (storedJoined === "true") setJoined(true);

    const storedChallenge = localStorage.getItem(STORAGE_KEYS.JOINED_CHALLENGE);
    if (storedChallenge === "true") setJoinedChallenge(true);

    const storedLikes = localStorage.getItem(STORAGE_KEYS.LIKED_POSTS);
    if (storedLikes) setLikedPosts(JSON.parse(storedLikes));

    const storedUserPosts = localStorage.getItem(STORAGE_KEYS.USER_POSTS);
    if (storedUserPosts) setUserPosts(JSON.parse(storedUserPosts));
  }, []);

  // Update visible posts when limit or posts change
  useEffect(() => {
    const allPostsWithUser = [...allPosts, ...userPosts].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.timestamp - a.timestamp;
    });
    setVisiblePosts(allPostsWithUser.slice(0, postLimit));
  }, [postLimit, userPosts]);

  const saveLikes = (newLikes: string[]) => {
    setLikedPosts(newLikes);
    localStorage.setItem(STORAGE_KEYS.LIKED_POSTS, JSON.stringify(newLikes));
  };

  const toggleLike = (postId: string) => {
    const newLikes = likedPosts.includes(postId)
      ? likedPosts.filter(id => id !== postId)
      : [...likedPosts, postId];
    saveLikes(newLikes);
    // Update like count in visible posts for immediate UI feedback
    setVisiblePosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + (likedPosts.includes(postId) ? -1 : 1) }
          : post
      )
    );
  };

  const handleJoinCommunity = () => {
    setJoined(true);
    localStorage.setItem(STORAGE_KEYS.JOINED_COMMUNITY, "true");
    toast.success("Welcome to the ForceFocus Community!");
  };

  const handleJoinChallenge = () => {
    if (joinedChallenge) {
      toast.info("You've already joined this challenge!");
      return;
    }
    setJoinedChallenge(true);
    localStorage.setItem(STORAGE_KEYS.JOINED_CHALLENGE, "true");
    toast.success(`You've joined the weekly challenge! ${weeklyChallenge.prize}`);
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error("Please fill in both title and content.");
      return;
    }
    const newForumPost: ForumPost = {
      id: `user-${Date.now()}`,
      title: newPost.title,
      author: "You", // In real app, get from auth
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
      category: newPost.category,
      replies: 0,
      likes: 0,
      time: "Just now",
      pinned: false,
      timestamp: Date.now(),
    };
    const updatedUserPosts = [newForumPost, ...userPosts];
    setUserPosts(updatedUserPosts);
    localStorage.setItem(STORAGE_KEYS.USER_POSTS, JSON.stringify(updatedUserPosts));
    setIsNewPostModalOpen(false);
    setNewPost({ title: "", category: "General", content: "" });
    toast.success("Your post has been published!");
  };

  const loadMore = () => {
    setPostLimit(prev => prev + 6);
    toast.success("Loading more discussions...");
  };

  const openDiscordInvite = (inviteUrl: string) => {
    window.open(inviteUrl, "_blank");
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
              onClick={handleJoinCommunity}
              disabled={joined}
              className={cn(
                "px-8 py-3 font-semibold rounded-xl transition-all duration-200",
                joined
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              )}
            >
              {joined ? "✓ Joined Community" : "Join Community — Free"}
            </button>
            <a href="#forum" className="px-8 py-3 border border-border text-foreground rounded-xl hover:bg-muted transition-colors font-medium">
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
                onClick={handleJoinChallenge}
                disabled={joinedChallenge}
                className={cn(
                  "px-6 py-2.5 font-semibold rounded-xl transition-colors text-sm",
                  joinedChallenge
                    ? "bg-emerald-600 text-white cursor-default"
                    : "bg-white text-blue-700 hover:bg-blue-50"
                )}
              >
                {joinedChallenge ? "✓ Joined" : "Join Challenge"}
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
                <button
                  key={ch.name}
                  onClick={() => openDiscordInvite(ch.invite)}
                  className="bg-card border border-border rounded-xl p-4 card-hover flex items-start gap-3 group text-left w-full"
                >
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${ch.color}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{ch.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{ch.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1.5">{ch.members} members</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0" />
                </button>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => window.open("https://discord.gg/forcefocus", "_blank")}
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Join our Discord server <ExternalLink className="w-3.5 h-3.5" />
            </button>
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
              onClick={() => setIsNewPostModalOpen(true)}
              className="btn-primary text-sm px-4 py-2 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>

          <div className="space-y-3">
            {visiblePosts.map((post) => (
              <div key={post.id} className="bg-card border border-border rounded-xl p-5 card-hover">
                <div className="flex items-start gap-4">
                  <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {post.pinned && (
                        <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold rounded">📌 Pinned</span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                        {post.category}
                      </span>
                    </div>
                    <button
                      onClick={() => toast.info("Post detail page coming soon!")}
                      className="text-sm font-semibold text-foreground leading-snug mb-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors text-left"
                    >
                      {post.title}
                    </button>
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

          {visiblePosts.length < allPosts.length + userPosts.length && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-blue-500 transition-all duration-200"
              >
                Load more discussions <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-display text-xl font-bold text-foreground">Create New Post</h3>
              <button onClick={() => setIsNewPostModalOpen(false)} className="p-1 rounded-lg hover:bg-muted">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What's your question or insight?"
                  className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {Object.keys(categoryColors).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  placeholder="Share your thoughts..."
                  className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-border">
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Publish
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
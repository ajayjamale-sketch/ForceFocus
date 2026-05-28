import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, ArrowRight, BookOpen, Tag, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

const categories = ["All", "Productivity Science", "Habits & Routines", "AI & Technology", "Team Productivity", "Wellness"];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = BLOG_POSTS.filter((post) => {
    const matchSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const featured = BLOG_POSTS[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:bg-[#0A0F1E]">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 dark:bg-white/10 dark:border-white/20 dark:text-gray-300 text-sm font-medium mb-8">
            <BookOpen className="w-3.5 h-3.5" />
            The Productivity Journal
          </span>
          <h1 className="font-display text-5xl font-bold text-foreground dark:text-white mb-4">
            Science-backed insights for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              peak performers
            </span>
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 text-lg mb-8">
            Research, strategies, and real-world tactics to help you work at your best.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-white/10 border border-border dark:border-white/20 rounded-xl text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-blue-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {activeCategory === "All" && !search && (
            <div className="mb-10">
              <Link to={`/blog/${featured.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden card-hover">
                <div className="grid lg:grid-cols-2">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full">
                        Featured
                      </span>
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                        {featured.category}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <img src={featured.authorAvatar} alt={featured.author} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{featured.author}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(featured.publishedAt)}
                          <span>·</span>
                          <Clock className="w-3 h-3" />
                          {featured.readTime} min read
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Post Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground text-lg mb-2">No articles found</h3>
              <p className="text-muted-foreground text-sm">Try a different search term or category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === "All" && !search ? rest : filtered).map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden card-hover flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{post.author}</p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min
                          <span>·</span>
                          {formatDate(post.publishedAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
            <h3 className="font-display text-2xl font-bold mb-2">Get weekly insights in your inbox</h3>
            <p className="text-blue-100 text-sm mb-6">Join 50,000+ readers. No spam, unsubscribe anytime.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem("email") as HTMLInputElement;
                if (input.value && input.value.includes("@")) {
                  import("sonner").then(({ toast }) => toast.success("You're subscribed!"));
                  input.value = "";
                }
              }}
              className="flex gap-3 max-w-sm mx-auto"
            >
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
              />
              <button type="submit" className="px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm flex-shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

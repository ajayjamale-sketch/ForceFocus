import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Copy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import NotFound from "./NotFound";
import { toast } from "sonner";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Article Header */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between border-t border-b border-border py-6">
            <div className="flex items-center gap-4">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-blue-100 hover:text-blue-600 transition-colors"
                title="Copy Link"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-[400px] sm:h-[500px] object-cover rounded-3xl"
          />
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-lg dark:prose-invert prose-blue max-w-none">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="py-8">
              <p>
                This is a placeholder for the full article content. The <strong>{post.title}</strong> article discusses how {post.excerpt.toLowerCase()}
              </p>
              <h2>The Core Concept</h2>
              <p>
                In the context of <em>{post.category}</em>, it is vital to understand the underlying principles before applying them to your daily routine. Many professionals struggle with this aspect because they lack the necessary systems and tools. ForceFocus bridges this gap by providing an intuitive platform designed around science-backed methods.
              </p>
              <blockquote>
                "The key is not to prioritize what's on your schedule, but to schedule your priorities." - Stephen Covey
              </blockquote>
              <h2>Actionable Takeaways</h2>
              <ul>
                <li>Start small and build momentum gradually.</li>
                <li>Leverage the right tools to minimize friction.</li>
                <li>Stay consistent, even on days when motivation is low.</li>
              </ul>
              <p>
                By implementing these strategies, you'll see a marked improvement in your overall performance and wellbeing. Stay tuned for more insights from our team!
              </p>
            </div>
          )}
        </article>

        {/* Tags */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

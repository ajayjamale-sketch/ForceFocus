import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, BookOpen, Zap, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Extended FAQs with explicit categories
const extraFaqs = [
  {
    question: "How do I get started with ForceFocus?",
    answer: "Getting started is easy. Create a free account, complete the 5-minute productivity assessment, and ForceFocus will build a personalized plan based on your goals and work style. Your first focus session can start within minutes of signing up.",
    category: "Getting Started",
  },
  {
    question: "Can I import my existing tasks and projects?",
    answer: "Yes. ForceFocus supports CSV import for tasks and integrates with Asana, Jira, Notion, Trello, and Linear to import existing projects. You can also connect Google Tasks and Microsoft To-Do.",
    category: "Features",
  },
  {
    question: "Does ForceFocus work offline?",
    answer: "The focus timer and local task management work offline. Your data syncs automatically when you reconnect. Analytics, AI coaching, and team features require an internet connection.",
    category: "Technical",
  },
];

// Ensure all FAQ_ITEMS have a category (fallback to "General" if missing)
const normalizedFaqItems = FAQ_ITEMS.map(item => ({
  ...item,
  category: (item as any).category || "General",
}));

const allFaqs = [...normalizedFaqItems, ...extraFaqs];

const categories = ["All", "Getting Started", "Features", "Pricing", "Privacy", "Technical", "Teams", "General"];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allFaqs.filter(
    (item) =>
      (activeCategory === "All" || item.category === activeCategory) &&
      (!search ||
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero section - unchanged */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:bg-[#0A0F1E]">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 dark:bg-white/10 dark:border-white/20 dark:text-gray-300 text-sm font-medium mb-8">
            <BookOpen className="w-3.5 h-3.5" />
            Help Center
          </span>
          <h1 className="font-display text-5xl font-bold text-foreground dark:text-white mb-4">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              questions
            </span>
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 text-lg mb-8">
            Find answers to everything about ForceFocus.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-white/10 border border-border dark:border-white/20 rounded-xl text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
                  activeCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { value: `${filtered.length}`, label: "Questions answered" },
              { value: "2h", label: "Avg response time" },
              { value: "98%", label: "Satisfaction rate" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
                <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground text-sm mb-6">Try different keywords or contact support.</p>
              <Link to="/contact" className="btn-primary text-sm inline-flex items-center gap-2">
                Contact Support <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, idx) => {
                const id = `faq-${idx}`;
                const isOpen = openId === id;
                return (
                  <div
                    key={id}
                    className={cn(
                      "border rounded-2xl overflow-hidden transition-all duration-200",
                      isOpen
                        ? "border-blue-500/40 shadow-premium"
                        : "border-border hover:border-blue-300 dark:hover:border-blue-700"
                    )}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : id)}
                      className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-muted/30 transition-colors duration-200"
                    >
                      <span className="text-base font-semibold text-foreground leading-snug">
                        {item.question}
                      </span>
                      <span className="flex-shrink-0 mt-0.5">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 animate-accordion-down">
                        <p className="text-muted-foreground leading-relaxed text-sm">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Still need help? */}
          <div className="mt-14 bg-muted/50 border border-border rounded-2xl p-8 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Our team is ready to help. Typically respond within 2 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary text-sm">
                Contact Support
              </Link>
              <Link to="/blog" className="btn-secondary text-sm">
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
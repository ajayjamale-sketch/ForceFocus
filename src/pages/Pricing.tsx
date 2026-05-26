import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowRight, Zap, HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRICING_PLANS, FAQ_ITEMS } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground">{question}</span>
        <HelpCircle
          className={cn(
            "w-4 h-4 flex-shrink-0 transition-colors",
            open ? "text-blue-600" : "text-muted-foreground"
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePlanClick = (planId: string) => {
    if (isAuthenticated) {
      if (planId === "free") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard?upgrade=" + planId);
      }
    } else {
      navigate("/register?plan=" + planId);
    }
  };

  const enterpriseFeatures = [
    "Everything in Team",
    "Unlimited team members",
    "Custom integrations & API",
    "SSO / SAML authentication",
    "Advanced compliance reporting",
    "Dedicated account manager",
    "SLA guarantee (99.9% uptime)",
    "Custom AI model training",
    "On-premise deployment option",
    "24/7 priority support",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0A0F1E] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gray-300 text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            Simple, Transparent Pricing
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
            Invest in your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              performance
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Start free. Upgrade when you're ready. Cancel anytime with no questions asked.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-white/10 rounded-xl p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                billing === "monthly"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-300 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                billing === "yearly"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-300 hover:text-white"
              )}
            >
              Yearly
              <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-xs rounded-full font-bold">
                -33%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-card rounded-2xl p-8 flex flex-col transition-all duration-300",
                  plan.popular
                    ? "border-2 border-blue-500 shadow-blue-glow shadow-premium"
                    : "border border-border card-hover"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-display text-5xl font-bold text-foreground">
                      ${billing === "yearly"
                        ? Math.round(plan.price.yearly / 12)
                        : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  {billing === "yearly" && plan.price.yearly > 0 && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                      Billed ${plan.price.yearly}/year — save $
                      {plan.price.monthly * 12 - plan.price.yearly}
                    </p>
                  )}
                  {plan.price.monthly === 0 && (
                    <p className="text-sm text-muted-foreground">Forever free</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick(plan.id)}
                  className={cn(
                    "w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer",
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-premium hover:shadow-blue-glow hover:-translate-y-0.5"
                      : "border-2 border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 text-foreground"
                  )}
                >
                  {isAuthenticated && plan.id === "free"
                    ? "Go to Dashboard"
                    : isAuthenticated
                    ? "Upgrade to " + plan.name
                    : plan.cta}
                </button>

                {!isAuthenticated && plan.price.monthly > 0 && (
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    14-day free trial · No credit card required
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] rounded-2xl p-8 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 text-gray-300 border border-white/20 mb-4">
                  Enterprise
                </span>
                <h3 className="font-display text-3xl font-bold text-white mb-3">
                  Built for large organizations
                </h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  Custom pricing for teams of 50+. Includes everything in Team plus
                  advanced security, compliance, dedicated support, and custom AI
                  training.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Talk to Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {enterpriseFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Compare plans
            </h2>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground w-1/2">
                      Feature
                    </th>
                    {["Starter", "Pro", "Team"].map((plan) => (
                      <th
                        key={plan}
                        className="p-4 font-semibold text-center text-foreground"
                      >
                        {plan}
                        {plan === "Pro" && (
                          <span className="block text-xs text-blue-500 font-normal">
                            Most Popular
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Focus sessions/day", "5", "Unlimited", "Unlimited"],
                    ["AI coaching", "—", "✓", "✓"],
                    ["Distraction blocker", "—", "✓", "✓"],
                    ["Analytics history", "7 days", "90 days", "1 year"],
                    ["Habit trackers", "2", "Unlimited", "Unlimited"],
                    ["Team workspaces", "—", "—", "✓"],
                    ["Team analytics", "—", "—", "✓"],
                    ["Priority support", "—", "✓", "✓"],
                    ["API access", "—", "—", "Enterprise"],
                  ].map(([feature, ...values]) => (
                    <tr
                      key={feature}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 text-foreground/80">{feature}</td>
                      {values.map((v, i) => (
                        <td key={i} className="p-4 text-center font-medium">
                          {v === "✓" ? (
                            <span className="text-emerald-500">✓</span>
                          ) : v === "—" ? (
                            <span className="text-muted-foreground">—</span>
                          ) : (
                            <span className="text-foreground">{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { value: "2.4M+", label: "Active Users" },
              { value: "4.9★", label: "App Store Rating" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "14-day", label: "Free Trial" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-foreground">
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Pricing questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know before upgrading.
            </p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.slice(4, 8).map((item) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0F1E]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Start for free today
          </h2>
          <p className="text-gray-400 mb-8">
            No credit card required. Get access to all Starter features instantly.
          </p>
          <button
            onClick={() => handlePlanClick("free")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-premium"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

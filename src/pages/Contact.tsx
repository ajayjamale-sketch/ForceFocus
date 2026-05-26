import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, MessageSquare, Clock, ArrowRight, CheckCircle2, Zap, Twitter, Linkedin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", type: "general" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 20) e.message = "Message must be at least 20 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We'll reply within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0A0F1E] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gray-300 text-sm font-medium mb-8">
            <MessageSquare className="w-3.5 h-3.5" />
            Get in Touch
          </span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            We'd love to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              hear from you
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Our team typically responds within a few hours.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-display font-bold text-lg text-foreground">ForceFocus</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI-powered productivity platform helping 2.4M+ professionals achieve peak performance.
                </p>
              </div>

              {[
                { icon: Mail, title: "Email", value: "hello@forcefocus.app", sub: "hello@forcefocus.app", href: "mailto:hello@forcefocus.app" },
                { icon: MessageSquare, title: "Live Chat", value: "Available in app", sub: "Mon–Fri, 9am–6pm EST", href: "/dashboard" },
                { icon: MapPin, title: "Office", value: "San Francisco, CA", sub: "555 Mission St, Suite 300", href: "#" },
                { icon: Clock, title: "Response Time", value: "Within 24 hours", sub: "Typically under 2 hours", href: "#" },
              ].map(({ icon: Icon, title, value, sub, href }) => (
                <div key={title} className="flex gap-4 p-4 bg-card border border-border rounded-2xl hover:border-blue-500/30 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">{title}</p>
                    <p className="text-sm font-semibold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-3">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:hello@forcefocus.app", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 rounded-xl bg-card border border-border hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 flex items-center justify-center transition-all duration-200"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">Message sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "", type: "general" }); }}
                      className="btn-secondary text-sm"
                    >
                      Send another message
                    </button>
                    <Link to="/" className="btn-primary text-sm">Back to Home</Link>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send a message</h2>

                  {/* Inquiry Type */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      { value: "general", label: "General" },
                      { value: "sales", label: "Sales" },
                      { value: "support", label: "Support" },
                      { value: "enterprise", label: "Enterprise" },
                      { value: "press", label: "Press" },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setForm((p) => ({ ...p, type: value }))}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
                          form.type === value
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                        <input
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Alex Morgan"
                          className={cn("input-field", errors.name && "border-red-500")}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          placeholder="you@company.com"
                          className={cn("input-field", errors.email && "border-red-500")}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                      <input
                        value={form.subject}
                        onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                        placeholder="How can we help?"
                        className={cn("input-field", errors.subject && "border-red-500")}
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        rows={6}
                        placeholder="Tell us more about your question or project..."
                        className={cn("input-field resize-none", errors.message && "border-red-500")}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message ? (
                          <p className="text-red-500 text-xs">{errors.message}</p>
                        ) : <span />}
                        <p className="text-xs text-muted-foreground">{form.message.length}/1000</p>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                      ) : (
                        <>Send Message <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Other ways to get help</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, title: "Help Center", desc: "Browse 200+ articles, guides, and tutorials in our knowledge base.", href: "/faq", cta: "Visit Help Center" },
              { icon: Clock, title: "FAQ", desc: "Find quick answers to the most common questions about ForceFocus.", href: "/faq", cta: "View FAQ" },
              { icon: Mail, title: "Enterprise Sales", desc: "Interested in ForceFocus for your organization? Talk to our sales team.", href: "/contact", cta: "Talk to Sales" },
            ].map(({ icon: Icon, title, desc, href, cta }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 text-center card-hover">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                <Link to={href} className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-1">
                  {cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

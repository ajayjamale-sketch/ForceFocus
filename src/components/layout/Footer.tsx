import { Link } from "react-router-dom";
import { Zap, Twitter, Github, Linkedin, Youtube, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubscribing(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("You're subscribed! Welcome to the ForceFocus community.");
    setEmail("");
    setIsSubscribing(false);
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Changelog", href: "/changelog" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
    Resources: [
      { label: "Documentation", href: "/docs" },
      { label: "Help Center", href: "/faq" },
      { label: "Community", href: "/community" },
      { label: "Integrations", href: "/integrations" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "GDPR", href: "/gdpr" },
    ],
  };

  return (
    <footer className="bg-[#0A0F1E] text-gray-300 border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Force<span className="text-blue-400">Focus</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              AI-powered productivity platform helping 2.4M+ professionals achieve deep work, build lasting habits, and perform at their peak every day.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">
                Get productivity insights
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2.5 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-0"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 flex-shrink-0 disabled:opacity-60"
                >
                  {isSubscribing ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Mail, href: "mailto:hello@forcefocus.app", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} ForceFocus, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

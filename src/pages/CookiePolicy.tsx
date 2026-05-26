import { Link } from "react-router-dom";
import { Shield, Cookie, Settings, ChevronRight, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cookieTypes = [
  {
    name: "Strictly Necessary Cookies",
    required: true,
    description:
      "These cookies are essential for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.",
    examples: [
      "Session authentication token",
      "CSRF protection token",
      "Load balancer routing",
      "Cookie consent preferences",
    ],
    retention: "Session to 1 year",
  },
  {
    name: "Performance & Analytics Cookies",
    required: false,
    description:
      "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
    examples: [
      "Page view tracking",
      "Feature usage analytics",
      "Error and performance monitoring",
      "A/B testing assignments",
    ],
    retention: "2 years",
  },
  {
    name: "Functional Cookies",
    required: false,
    description:
      "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.",
    examples: [
      "Theme preference (dark/light mode)",
      "Language and locale settings",
      "Dashboard layout preferences",
      "Notification settings",
    ],
    retention: "1 year",
  },
  {
    name: "Targeting & Advertising Cookies",
    required: false,
    description:
      "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
    examples: [
      "Retargeting pixel",
      "Ad conversion tracking",
      "Audience segmentation",
    ],
    retention: "90 days",
  },
];

const thirdParties = [
  { name: "Segment", purpose: "Product analytics and user behavior tracking", privacy: "https://segment.com/legal/privacy/" },
  { name: "PostHog", purpose: "Feature flag management and funnel analytics", privacy: "https://posthog.com/privacy" },
  { name: "Sentry", purpose: "Error monitoring and crash reporting", privacy: "https://sentry.io/privacy/" },
  { name: "Intercom", purpose: "Customer support chat widget", privacy: "https://www.intercom.com/legal/privacy" },
  { name: "Google Analytics", purpose: "Traffic analytics (anonymized)", privacy: "https://policies.google.com/privacy" },
];

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0A0F1E] pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-gray-400 text-lg">Last updated: May 20, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Quick Nav */}
          <nav className="bg-muted/50 border border-border rounded-2xl p-5 mb-10">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Contents</p>
            <ul className="space-y-2">
              {["What Are Cookies", "Types of Cookies We Use", "Third-Party Cookies", "Managing Your Preferences", "Changes to This Policy", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    <ChevronRight className="w-3.5 h-3.5" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Introduction */}
          <div className="prose-custom space-y-6 mb-12">
            <div id="what-are-cookies">
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                ForceFocus uses cookies and similar tracking technologies (such as local storage, session storage, and pixels) to enhance your experience, analyze usage patterns, and provide personalized features. This policy explains what cookies we use and why.
              </p>
            </div>
          </div>

          {/* Cookie Types */}
          <div id="types-of-cookies-we-use" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Types of Cookies We Use</h2>
            <div className="space-y-5">
              {cookieTypes.map((ct) => (
                <div key={ct.name} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-base font-semibold text-foreground">{ct.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                      ct.required
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {ct.required ? "Required" : "Optional"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{ct.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Examples</p>
                      <ul className="space-y-1">
                        {ct.examples.map((ex) => (
                          <li key={ex} className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Retention Period</p>
                      <p className="text-xs text-muted-foreground">{ct.retention}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Third Parties */}
          <div id="third-party-cookies" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground text-sm mb-5">The following third-party services may set cookies on your device when you use ForceFocus:</p>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Service</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Purpose</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {thirdParties.map((tp) => (
                    <tr key={tp.name} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-foreground">{tp.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{tp.purpose}</td>
                      <td className="p-4 hidden sm:table-cell">
                        <a href={tp.privacy} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                          View Policy →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Managing Preferences */}
          <div id="managing-your-preferences" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Managing Your Preferences</h2>
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 mb-5">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Cookie Preferences Center</p>
                  <p className="text-sm text-muted-foreground">You can manage your cookie preferences at any time from your account settings or by clicking the "Cookie Settings" link in the footer.</p>
                  <Link to="/settings" className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 font-medium mt-2 hover:underline">
                    Open Cookie Settings <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">You can also control cookies through your browser settings. Please note that disabling certain cookies may impact the functionality of ForceFocus. Strictly necessary cookies cannot be disabled as they are required for the platform to operate.</p>
          </div>

          {/* Changes */}
          <div id="changes-to-this-policy" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Changes to This Policy</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">We may update this Cookie Policy periodically. We will notify you of significant changes by email or through a prominent notice on our website. We encourage you to review this policy regularly.</p>
          </div>

          {/* Contact */}
          <div id="contact-us" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Contact Us</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">If you have questions about this Cookie Policy, please contact our Privacy team:</p>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-foreground font-medium">ForceFocus Privacy Team</p>
              <p className="text-sm text-muted-foreground">privacy@forcefocus.app</p>
              <p className="text-sm text-muted-foreground">548 Market St, San Francisco, CA 94104</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
            <Link to="/privacy" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</Link>
            <Link to="/gdpr" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">GDPR Policy</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

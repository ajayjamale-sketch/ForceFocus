import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  const lastUpdated = "May 1, 2026";

  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.\n\n**Account Information**: Name, email address, password (hashed), profile picture, and timezone.\n\n**Productivity Data**: Focus session logs, task completion data, habit tracking records, goal progress, and productivity scores.\n\n**Usage Information**: How you interact with ForceFocus, features you use, and in-app behavior patterns used to improve AI coaching accuracy.\n\n**Device Information**: Device type, operating system, browser type, and IP address for security and performance optimization.\n\n**Payment Information**: Billing address and last four digits of payment card (full card details are processed by Stripe and never stored on our servers).`,
    },
    {
      id: "use",
      title: "2. How We Use Your Information",
      content: `We use your information to provide, maintain, and improve ForceFocus services:\n\n• **Service Delivery**: To operate the platform, process your focus sessions, and sync data across your devices.\n\n• **AI Personalization**: To train and improve our AI coaching models specific to your productivity patterns. Your data is never used to train models for other users.\n\n• **Communications**: To send service updates, security alerts, and optional product newsletters (which you can unsubscribe from at any time).\n\n• **Security**: To detect, investigate, and prevent fraudulent activity, abuse, and security incidents.\n\n• **Analytics**: To understand how our platform is used in aggregate to improve the product experience.`,
    },
    {
      id: "sharing",
      title: "3. Information Sharing",
      content: `We do not sell, rent, or share your personal information with third parties for marketing purposes. Period.\n\n**Service Providers**: We work with trusted third-party service providers who help operate our platform (payment processing, cloud hosting, email delivery). These providers are contractually bound to use your information only to provide services to ForceFocus.\n\n**Team Workspaces**: If you're part of a team workspace, your team manager will have access to aggregated productivity metrics (not individual session details unless you configure sharing).\n\n**Legal Requirements**: We may disclose information when required by law, court order, or to protect the rights and safety of ForceFocus and its users.\n\n**Business Transfers**: In the event of a merger or acquisition, your information may be transferred. We will notify you before any such transfer and provide choices about your data.`,
    },
    {
      id: "security",
      title: "4. Data Security",
      content: `We implement industry-standard security measures to protect your personal information:\n\n• **Encryption**: All data is encrypted at rest using AES-256 and in transit using TLS 1.3.\n\n• **Access Controls**: Employee access to user data is strictly limited and logged. Only engineers with a legitimate need-to-know basis can access production data.\n\n• **SOC 2 Type II**: We maintain SOC 2 Type II certification, audited annually by an independent third party.\n\n• **Security Testing**: We conduct regular penetration testing and vulnerability assessments.\n\n• **Incident Response**: We have a documented incident response plan and will notify you within 72 hours of any confirmed data breach affecting your personal data.`,
    },
    {
      id: "rights",
      title: "5. Your Rights & Choices",
      content: `Depending on your location, you have various rights regarding your personal data:\n\n**Access**: Request a copy of all personal data we hold about you.\n\n**Correction**: Request correction of inaccurate personal data.\n\n**Deletion**: Request deletion of your account and all associated data (subject to legal retention requirements).\n\n**Data Portability**: Export your productivity data in JSON format from Settings → Privacy → Export My Data.\n\n**Opt-out**: Unsubscribe from marketing communications at any time from email preferences or Settings.\n\n**GDPR Rights (EU users)**: Right to object to processing, right to restrict processing, and right to lodge a complaint with your local supervisory authority.\n\nTo exercise any of these rights, contact us at privacy@forcefocus.app or use the self-service tools in your account settings.`,
    },
    {
      id: "cookies",
      title: "6. Cookies & Tracking",
      content: `We use essential cookies to provide the ForceFocus service (authentication, security, preferences). We also use optional analytics cookies to understand how our platform is used.\n\n**Essential Cookies**: Required for login, security, and core functionality. Cannot be disabled.\n\n**Analytics Cookies**: Help us understand usage patterns in aggregate. Can be disabled via cookie preferences.\n\n**No Third-Party Advertising**: We do not use advertising cookies or sell data to advertising networks.`,
    },
    {
      id: "retention",
      title: "7. Data Retention",
      content: `We retain your personal data for as long as your account is active. After account deletion, we:\n\n• Delete personal identifiers within 30 days\n• Remove productivity data within 60 days\n• Retain anonymized aggregate statistics that cannot be linked to you\n• Keep billing records for 7 years as required by tax law\n\nYou can delete your account at any time from Settings → Account → Delete Account.`,
    },
    {
      id: "children",
      title: "8. Children's Privacy",
      content: `ForceFocus is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us immediately at privacy@forcefocus.app and we will delete that information.`,
    },
    {
      id: "changes",
      title: "9. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. When we make material changes, we will:\n\n• Send an email notification to your registered email address\n• Display a prominent notice in the ForceFocus app\n• Update the "Last Updated" date at the top of this policy\n\nWe encourage you to review this policy periodically. Continued use of ForceFocus after changes take effect constitutes acceptance of the updated policy.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0A0F1E] pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg mb-3">
            Your privacy is fundamental to how we build ForceFocus.
          </p>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* TOC */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Contents</p>
                <nav className="space-y-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Body */}
            <div className="lg:col-span-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
                <h2 className="text-base font-semibold text-foreground mb-2">TL;DR — The short version</h2>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ We collect data to provide and improve our service</li>
                  <li>✓ We never sell your data or use it for advertising</li>
                  <li>✓ Your productivity data is private to you (and your team, if you opt in)</li>
                  <li>✓ You can export or delete your data at any time</li>
                  <li>✓ We're SOC 2 Type II certified and GDPR compliant</li>
                </ul>
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                {sections.map((section) => (
                  <div key={section.id} id={section.id}>
                    <h2 className="font-display text-xl font-bold text-foreground mb-4">{section.title}</h2>
                    <div className="space-y-3">
                      {section.content.split("\n\n").map((para, i) => (
                        <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                          {para.replace(/\*\*/g, "")}
                        </p>
                      ))}
                    </div>
                    <div className="border-t border-border mt-8" />
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-2">Questions about this policy?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact our Privacy Team at{" "}
                  <a href="mailto:privacy@forcefocus.app" className="text-blue-600 hover:underline">
                    privacy@forcefocus.app
                  </a>
                </p>
                <Link to="/contact" className="btn-primary text-sm inline-flex">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

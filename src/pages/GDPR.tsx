import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield, ChevronRight, Download, Mail, FileText, Globe, Lock,
  Eye, Trash2, RefreshCw, UserCheck, AlertTriangle
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const rights = [
  {
    icon: Eye,
    title: "Right to Access",
    article: "Art. 15 GDPR",
    description: "You have the right to request a copy of all personal data we hold about you, including how it is used and with whom it is shared.",
    action: "Request Data Export",
    actionType: "toast",
    toastMsg: "Data export request submitted. You'll receive your data within 30 days.",
  },
  {
    icon: RefreshCw,
    title: "Right to Rectification",
    article: "Art. 16 GDPR",
    description: "You have the right to have inaccurate or incomplete personal data corrected or completed without undue delay.",
    action: "Update Profile",
    actionType: "link",
    href: "/profile",
  },
  {
    icon: Trash2,
    title: "Right to Erasure",
    article: "Art. 17 GDPR",
    description: "You have the right to request the deletion of your personal data when it is no longer necessary for the purpose it was collected.",
    action: "Delete My Account",
    actionType: "confirm",
    confirmMsg: "Are you sure you want to request account deletion? This action is irreversible and your data will be permanently removed within 30 days.",
    toastMsg: "Account deletion request initiated. Our team will contact you within 72 hours.",
  },
  {
    icon: Lock,
    title: "Right to Restrict Processing",
    article: "Art. 18 GDPR",
    description: "You have the right to request restriction of processing your personal data in certain circumstances, such as when you contest the accuracy of the data.",
    action: "Submit Request",
    actionType: "toast",
    toastMsg: "Processing restriction request received.",
  },
  {
    icon: Download,
    title: "Right to Data Portability",
    article: "Art. 20 GDPR",
    description: "You have the right to receive your personal data in a structured, commonly used, machine-readable format and to transmit it to another controller.",
    action: "Export as JSON/CSV",
    actionType: "toast",
    toastMsg: "Your data export (JSON + CSV) is being prepared.",
  },
  {
    icon: UserCheck,
    title: "Right to Object",
    article: "Art. 21 GDPR",
    description: "You have the right to object to processing of your personal data where we are relying on a legitimate interest as our legal basis for processing.",
    action: "File Objection",
    actionType: "toast",
    toastMsg: "Your objection has been logged. We'll respond within 30 days.",
  },
];

const dataCategories = [
  { category: "Account & Identity Data", examples: "Name, email, password (hashed), profile picture", basis: "Contract Performance", retention: "Until account deletion + 30 days" },
  { category: "Productivity & Focus Data", examples: "Focus sessions, task lists, habit logs, goal data", basis: "Contract Performance", retention: "Until account deletion" },
  { category: "Usage & Analytics Data", examples: "Feature interactions, page views, session duration", basis: "Legitimate Interest", retention: "24 months" },
  { category: "Device & Technical Data", examples: "IP address, browser type, device identifiers", basis: "Legitimate Interest", retention: "12 months" },
  { category: "Payment Data", examples: "Billing address, last 4 digits (full card data via Stripe)", basis: "Contract Performance", retention: "7 years (legal requirement)" },
  { category: "Communications", examples: "Support tickets, emails, in-app messages", basis: "Contract Performance", retention: "3 years" },
];

const transfers = [
  { country: "United States", safeguard: "Standard Contractual Clauses (SCCs)", providers: "AWS, Stripe, Segment" },
  { country: "European Union", safeguard: "Adequacy Decision", providers: "Hetzner, Cloudflare EU" },
  { country: "United Kingdom", safeguard: "UK Adequacy Regulations", providers: "Cloudflare UK" },
];

export default function GDPR() {
  const [gdprRequestLoading, setGdprRequestLoading] = useState(false);

  const handleAction = (right: typeof rights[0]) => {
    if (right.actionType === "toast") {
      toast.success(right.toastMsg);
    } else if (right.actionType === "confirm") {
      if (window.confirm(right.confirmMsg!)) {
        toast.success(right.toastMsg);
      }
    }
  };

  const handleGDPRRequest = () => {
    setGdprRequestLoading(true);
    setTimeout(() => {
      setGdprRequestLoading(false);
      toast.success("GDPR request submitted. We'll respond within 30 days.");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero - now adapts to theme */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:from-[#0A0F1E] dark:via-[#0A0F1E] dark:to-[#0A0F1E]">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 bg-primary/10 dark:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-7 h-7 text-primary dark:text-blue-400" />
          </div>
          <h1 className="font-display text-5xl font-bold text-foreground dark:text-white mb-4">GDPR Compliance</h1>
          <p className="text-muted-foreground dark:text-gray-400 text-lg max-w-xl mx-auto">
            ForceFocus is fully compliant with the General Data Protection Regulation (EU) 2016/679. Your privacy rights are central to everything we build.
          </p>
          <p className="text-muted-foreground/70 dark:text-gray-500 text-sm mt-4">
            Last updated: May 20, 2026 · Effective: May 25, 2018
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Quick Nav */}
          <nav className="bg-card border border-border rounded-2xl p-5 mb-12 shadow-sm">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">On this page</p>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {[
                "Data Controller",
                "Legal Bases for Processing",
                "Data We Collect",
                "International Transfers",
                "Your Rights",
                "Data Retention",
                "Security Measures",
                "Contact DPO",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                  {item}
                </a>
              ))}
            </div>
          </nav>

          {/* Data Controller */}
          <div id="data-controller" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Data Controller</h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                ForceFocus, Inc. acts as the <strong className="text-foreground">Data Controller</strong> for personal data processed through the ForceFocus platform. As the Data Controller, we determine the purposes and means of processing your personal data.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-foreground">Legal Entity</p>
                  <p className="text-muted-foreground">ForceFocus, Inc.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Registered Address</p>
                  <p className="text-muted-foreground">548 Market St, PMB 12345<br />San Francisco, CA 94104, USA</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">EU Representative</p>
                  <p className="text-muted-foreground">ForceFocus EU Ltd.<br />Dublin, Ireland</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Data Protection Officer</p>
                  <p className="text-muted-foreground">dpo@forcefocus.app</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Bases */}
          <div id="legal-bases-for-processing" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Legal Bases for Processing</h2>
            <p className="text-muted-foreground text-sm mb-5">Under GDPR Article 6, we process your personal data on the following legal bases:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { basis: "Contract Performance (Art. 6(1)(b))", desc: "Processing necessary to fulfill your ForceFocus subscription and provide the services you've requested." },
                { basis: "Legitimate Interests (Art. 6(1)(f))", desc: "Analytics, security monitoring, fraud prevention, and product improvement — balanced against your fundamental rights." },
                { basis: "Consent (Art. 6(1)(a))", desc: "Marketing communications and optional analytics features. Consent is always freely given, specific, and withdrawable." },
                { basis: "Legal Obligation (Art. 6(1)(c))", desc: "Tax records, fraud prevention requirements, and other regulatory compliance obligations." },
              ].map((item) => (
                <div key={item.basis} className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm font-semibold text-foreground mb-1.5">{item.basis}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Categories Table */}
          <div id="data-we-collect" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Data We Collect</h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Examples</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Legal Basis</th>
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Retention</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {dataCategories.map((row) => (
                      <tr key={row.category} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-medium text-foreground text-sm whitespace-nowrap">{row.category}</td>
                        <td className="p-4 text-muted-foreground text-xs max-w-xs">{row.examples}</td>
                        <td className="p-4 text-muted-foreground text-xs hidden md:table-cell whitespace-nowrap">{row.basis}</td>
                        <td className="p-4 text-muted-foreground text-xs hidden lg:table-cell">{row.retention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* International Transfers */}
          <div id="international-transfers" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">International Data Transfers</h2>
            <p className="text-muted-foreground text-sm mb-5">
              Your data may be transferred to and processed in countries outside the European Economic Area (EEA). We ensure adequate safeguards are in place for all transfers:
            </p>
            <div className="space-y-3">
              {transfers.map((t) => (
                <div key={t.country} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground w-36">{t.country}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Safeguard:</span> {t.safeguard}</p>
                    <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Providers:</span> {t.providers}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Rights Cards */}
          <div id="your-rights" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your Rights Under GDPR</h2>
            <p className="text-muted-foreground text-sm mb-6">As a data subject, you have the following rights. You can exercise them directly from your account or by contacting our DPO.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {rights.map((right) => {
                const Icon = right.icon;
                return (
                  <div key={right.title} className="bg-card border border-border rounded-2xl p-5 card-hover">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-primary/10 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{right.title}</p>
                        <p className="text-xs text-muted-foreground">{right.article}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{right.description}</p>
                    {right.actionType === "link" ? (
                      <Link to={right.href!} className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1">
                        {right.action} <ChevronRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAction(right)}
                        className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                      >
                        {right.action} <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Measures */}
          <div id="security-measures" className="mb-12 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Security Measures</h2>
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "AES-256 encryption at rest",
                  "TLS 1.3 encryption in transit",
                  "SOC 2 Type II certified",
                  "Annual penetration testing",
                  "PBKDF2 password hashing",
                  "15-minute auth token rotation",
                  "Multi-region disaster recovery",
                  "Zero-trust network architecture",
                ].map((measure) => (
                  <div key={measure} className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-foreground">{measure}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact DPO */}
          <div id="contact-dpo" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Our Data Protection Officer</h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                If you have questions about how we process your data, wish to exercise your rights, or have a complaint, please contact our Data Protection Officer. We respond to all requests within 30 days.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm mb-5">
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a href="mailto:dpo@forcefocus.app" className="text-primary hover:underline">dpo@forcefocus.app</a>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Supervisory Authority</p>
                  <p className="text-muted-foreground">Irish Data Protection Commission (DPC)</p>
                </div>
              </div>
              <button
                onClick={handleGDPRRequest}
                disabled={gdprRequestLoading}
                className="btn-primary text-sm inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {gdprRequestLoading ? "Submitting..." : "Submit GDPR Request"}
              </button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
            <Link to="/privacy" className="text-sm text-primary hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-primary hover:underline">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-sm text-primary hover:underline">Cookie Policy</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
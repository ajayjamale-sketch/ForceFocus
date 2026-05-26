import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsAndConditions() {
  const lastUpdated = "May 1, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing or using ForceFocus ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.\n\nThese Terms apply to all visitors, users, and others who access or use the Service. By creating an account, you represent that you are at least 13 years of age and have the legal authority to enter into these Terms.`,
    },
    {
      id: "accounts",
      title: "2. User Accounts",
      content: `**Account Creation**: You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials.\n\n**Account Security**: You are responsible for all activities that occur under your account. You must immediately notify us of any unauthorized use. ForceFocus is not liable for losses caused by unauthorized account access that results from your failure to follow security best practices.\n\n**Account Termination**: We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or remain inactive for more than 24 months.`,
    },
    {
      id: "use",
      title: "3. Acceptable Use",
      content: `You agree to use ForceFocus only for lawful purposes. You may NOT:\n\n• Use the service to harm, harass, threaten, or abuse other users\n• Attempt to gain unauthorized access to our systems or other users' accounts\n• Upload malicious code, viruses, or any software that may harm the Service\n• Use the Service for any commercial purpose without written permission\n• Reverse engineer, decompile, or attempt to extract source code\n• Create multiple accounts to circumvent restrictions or abuse free trial limits\n• Share your account credentials with others (team plans have multi-seat licenses for this purpose)`,
    },
    {
      id: "subscriptions",
      title: "4. Subscriptions & Billing",
      content: `**Free Plan**: The Starter plan is provided free of charge with usage limitations as described on our pricing page.\n\n**Paid Plans**: Pro and Team plans are billed on a monthly or annual basis. Annual plans receive a discounted rate.\n\n**Free Trial**: Paid plans include a 14-day free trial. No credit card is required to start the trial. At the end of the trial period, you will be prompted to enter payment information to continue.\n\n**Billing**: Subscriptions automatically renew at the end of each billing period. You authorize us to charge your payment method on file.\n\n**Cancellation**: You may cancel your subscription at any time from Settings → Billing. Cancellation takes effect at the end of the current billing period.\n\n**Refunds**: We offer a 30-day money-back guarantee for new Pro and Team subscriptions. Contact billing@forcefocus.app within 30 days of initial purchase.`,
    },
    {
      id: "ip",
      title: "5. Intellectual Property",
      content: `**Our Property**: The ForceFocus platform, including all software, designs, logos, and content, is owned by ForceFocus Inc. and protected by copyright, trademark, and other laws.\n\n**Your Content**: You retain ownership of the content you create in ForceFocus (tasks, notes, goals). By using the Service, you grant us a limited license to store and process your content solely to provide the Service to you.\n\n**Feedback**: If you provide suggestions or feedback, you grant us a perpetual, irrevocable license to use that feedback without compensation.`,
    },
    {
      id: "privacy",
      title: "6. Privacy",
      content: `Your use of ForceFocus is also governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy to understand our practices regarding your personal information.`,
    },
    {
      id: "disclaimer",
      title: "7. Disclaimer of Warranties",
      content: `THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not warrant that the Service will be uninterrupted, error-free, or completely secure. ForceFocus makes no representations about the accuracy, reliability, or completeness of any content.\n\nForceFocus is a productivity tool and does not provide medical, psychological, or therapeutic advice. If you are experiencing serious mental health issues, please consult a qualified healthcare professional.`,
    },
    {
      id: "liability",
      title: "8. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, FORCEFOCUS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION.\n\nOur aggregate liability to you for all claims arising from these Terms shall not exceed the amount you paid to ForceFocus in the 12 months preceding the claim.`,
    },
    {
      id: "changes",
      title: "9. Changes to Terms",
      content: `We may modify these Terms from time to time. When we make material changes, we will notify you by email and display a notice in the app at least 14 days before the changes take effect.\n\nContinued use of the Service after changes take effect constitutes your acceptance of the revised Terms. If you do not agree to the new Terms, you must stop using the Service and cancel your subscription.`,
    },
    {
      id: "governing",
      title: "10. Governing Law",
      content: `These Terms are governed by the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved through binding arbitration in San Francisco, California, in accordance with the rules of the American Arbitration Association.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-[#0A0F1E] pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400 text-lg mb-3">
            Please read these terms carefully before using ForceFocus.
          </p>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
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

            <div className="lg:col-span-3">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 mb-8">
                <p className="text-sm text-foreground font-semibold mb-1">⚖️ Summary</p>
                <p className="text-sm text-muted-foreground">
                  By using ForceFocus, you agree to use it responsibly. We provide the service as-is, you own your content, subscriptions auto-renew (cancel anytime), and California law governs any disputes.
                </p>
              </div>

              <div className="space-y-8">
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
                <h3 className="font-semibold text-foreground mb-2">Questions about these terms?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact our legal team at{" "}
                  <a href="mailto:legal@forcefocus.app" className="text-blue-600 hover:underline">
                    legal@forcefocus.app
                  </a>
                </p>
                <Link to="/contact" className="btn-primary text-sm inline-flex">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

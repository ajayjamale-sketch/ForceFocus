import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bell, Brain, CreditCard, Download, FileCheck2, Settings2, ShieldCheck, Sparkles, RefreshCw } from "lucide-react";
import { userService, type AdminDashboardData } from "@/services/userService";
import { cn } from "@/lib/utils";

export default function AdminSettings() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [running, setRunning] = useState<string | null>(null);

  useEffect(() => {
    userService.fetchDashboardData().then(setData);
  }, []);

  const refresh = async () => {
    setData(await userService.fetchDashboardData());
    toast.success("Admin settings refreshed");
  };

  const exportAudit = async () => {
    const snapshot = await userService.fetchDashboardData();
    const blob = new Blob([JSON.stringify(snapshot.logs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "forcefocus-audit-log.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Audit log exported");
  };

  const runAutomation = async (key: string) => {
    setRunning(key);
    await new Promise((r) => setTimeout(r, 500));
    setRunning(null);
    toast.success(`${key} executed`);
  };

  const metrics = data?.metrics;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Operational controls for HR admins and platform admins.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportAudit} className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Export Audit
          </button>
          <button onClick={refresh} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">
            <Settings2 className="w-4 h-4" />
            Refresh Data
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: metrics?.totalUsers ?? 0, icon: Sparkles, color: "text-blue-600" },
          { label: "Active Users", value: metrics?.activeUsers ?? 0, icon: FileCheck2, color: "text-emerald-600" },
          { label: "HR Accounts", value: metrics?.hrCount ?? 0, icon: ShieldCheck, color: "text-purple-600" },
          { label: "Subscriptions", value: metrics?.activeSubscriptions ?? 0, icon: CreditCard, color: "text-amber-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-5">
            <Icon className={cn("w-5 h-5 mb-3", color)} />
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-foreground">Automation Controls</h2>
            </div>
            <div className="space-y-3">
              {[
                { key: "onboarding", item: "Auto-create onboarding checklist for new users" },
                { key: "hr-alerts", item: "Notify HR when focus time drops below threshold" },
                { key: "weekly-summary", item: "Generate weekly team performance summaries" },
                { key: "policy-review", item: "Flag policy violations for admin review" },
              ].map(({ key, item }) => (
                <button
                  key={key}
                  onClick={() => runAutomation(key)}
                  className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors text-left"
                >
                  <div className="flex items-start gap-3">
                    <Bell className="w-4 h-4 text-blue-500 mt-0.5" />
                    <p className="text-sm text-foreground">{item}</p>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">
                    {running === key ? "Running..." : "Run now"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="font-semibold text-foreground">Governance Notes</h2>
            </div>
            <div className="space-y-3">
              {[
                "User access updates are immediate and logged.",
                "HR admins can review teams and policy enforcement.",
                "Platform admins can manage the whole org safely.",
                "Exports are generated locally and ready for download.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                  <FileCheck2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-foreground">Latest Audit Events</h2>
            <p className="text-sm text-muted-foreground">Recent actions recorded by the admin system.</p>
          </div>
          <button onClick={refresh} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors text-sm">
            <RefreshCw className="w-4 h-4" />
            Sync
          </button>
        </div>
        <div className="space-y-3">
          {data?.logs.slice(0, 6).map((log) => (
            <div key={log.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">{log.action}</p>
                <p className="text-xs text-muted-foreground">Actor: {log.actor}{log.target ? ` · Target: ${log.target}` : ""}</p>
              </div>
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", log.severity === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" : log.severity === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400")}>
                {log.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, Lock, FileDown, RefreshCw, CheckCircle2, AlertTriangle, Bell, Eye, Activity } from "lucide-react";
import { toast } from "sonner";
import { userService, type AdminDashboardData } from "@/services/userService";
import { cn } from "@/lib/utils";

const rolePolicies = [
  { key: "teamAnalyticsEnabled", label: "Team analytics", desc: "Allow managers and HR to view team performance dashboards." },
  { key: "focusLockEnabled", label: "Focus lock", desc: "Enable distraction blocking for managed users." },
  { key: "strictModeEnabled", label: "Strict mode", desc: "Prevent users from bypassing focus restrictions." },
  { key: "onboardingRequired", label: "Onboarding required", desc: "Require new users to complete assessment and setup." },
  { key: "billingEnabled", label: "Billing enabled", desc: "Allow subscription and plan management." },
] as const;

export default function AdminRoles() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState<string | null>(null);

  useEffect(() => {
    userService.fetchDashboardData().then(setData);
  }, []);

  const togglePolicy = async (key: keyof AdminDashboardData["policies"]) => {
    if (!data) return;
    setSaving(String(key));
    const updated = await userService.updatePolicies({ [key]: !data.policies[key] });
    setData({ ...data, policies: updated });
    toast.success(`${String(key).replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())} updated`);
    setSaving(null);
  };

  const exportRoles = async () => {
    const payload = await userService.exportUsers();
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "forcefocus-users.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("User export generated");
  };

  const refreshData = async () => {
    setData(await userService.fetchDashboardData());
    toast.success("Policy data refreshed");
  };

  const enableAllPolicies = async () => {
    setBulkAction("enable-all");
    const updated = await userService.updatePolicies({
      teamAnalyticsEnabled: true,
      focusLockEnabled: true,
      strictModeEnabled: true,
      onboardingRequired: true,
      billingEnabled: true,
    });
    setData((prev) => prev ? { ...prev, policies: updated } : prev);
    toast.success("All policy protections enabled");
    setBulkAction(null);
  };

  const disableStrictMode = async () => {
    setBulkAction("disable-strict");
    const updated = await userService.updatePolicies({ strictModeEnabled: false });
    setData((prev) => prev ? { ...prev, policies: updated } : prev);
    toast.success("Strict mode disabled");
    setBulkAction(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Roles & Permissions</h1>
          <p className="text-sm text-muted-foreground mt-1">Control which capabilities are enabled across the organization.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={refreshData} className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button onClick={exportRoles} className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <FileDown className="w-4 h-4" />
            Export Access List
          </button>
          <Link to="/admin/users" className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">
            <Users className="w-4 h-4" />
            Manage Users
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Managers", value: "Team leaders", icon: ShieldCheck, color: "text-blue-600" },
          { label: "HR Access", value: "People analytics", icon: Bell, color: "text-emerald-600" },
          { label: "Org Guardrails", value: "Policy enforcement", icon: Lock, color: "text-purple-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-5">
            <Icon className={cn("w-5 h-5 mb-3", color)} />
            <p className="font-semibold text-foreground">{label}</p>
            <p className="text-sm text-muted-foreground mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={enableAllPolicies}
          disabled={bulkAction !== null}
          className="bg-card border border-border rounded-2xl p-5 text-left hover:border-blue-500 hover:bg-muted/30 transition-all"
        >
          <p className="font-semibold text-foreground mb-1">Enable all protections</p>
          <p className="text-sm text-muted-foreground">Turns on the safest org-wide policy defaults for managed workspaces.</p>
        </button>
        <button
          onClick={disableStrictMode}
          disabled={bulkAction !== null}
          className="bg-card border border-border rounded-2xl p-5 text-left hover:border-blue-500 hover:bg-muted/30 transition-all"
        >
          <p className="font-semibold text-foreground mb-1">Disable strict mode</p>
          <p className="text-sm text-muted-foreground">Relax session restrictions for rollout testing or pilot groups.</p>
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-foreground">Policy switches</h2>
            <p className="text-sm text-muted-foreground">Every toggle updates live and writes an audit log entry.</p>
          </div>
          <button onClick={() => userService.fetchDashboardData().then(setData)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors text-sm">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="grid gap-3">
          {rolePolicies.map((policy) => {
            const enabled = data?.policies[policy.key] ?? false;
            return (
              <button
                key={policy.key}
                onClick={() => togglePolicy(policy.key)}
                disabled={saving === policy.key}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-border hover:border-blue-500 hover:bg-muted/30 transition-all text-left"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{policy.label}</p>
                    {enabled ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{policy.desc}</p>
                </div>
                <span className={cn("px-3 py-1.5 rounded-full text-xs font-semibold", enabled ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground")}>
                  {saving === policy.key ? "Saving..." : enabled ? "Enabled" : "Disabled"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { title: "Permission Review", desc: "Review who can access admin and HR controls.", icon: Eye },
          { title: "Audit Trail", desc: "All policy updates are logged automatically.", icon: Activity },
          { title: "Action Ready", desc: "Use the user list to edit roles, active status, and resets.", icon: ShieldCheck },
        ].map(({ title, desc, icon: Icon }) => (
          <div key={title} className="bg-card border border-border rounded-2xl p-5">
            <Icon className="w-5 h-5 text-blue-600 mb-3" />
            <p className="font-semibold text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

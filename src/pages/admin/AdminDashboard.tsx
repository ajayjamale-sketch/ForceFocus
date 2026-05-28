import { Link } from "react-router-dom";
import { BarChart3, Users, ShieldCheck, Settings2, ArrowRight, Activity, CreditCard, Bell, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { userService, type AdminDashboardData } from "@/services/userService";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [data, setData] = useState<AdminDashboardData | null>(null);

  useEffect(() => {
    userService.fetchDashboardData().then(setData);
  }, []);

  const metrics = data?.metrics;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold mb-3">
            Admin Workspace
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Admin Overview</h1>
          <p className="text-muted-foreground mt-1">Monitor users, policies, and system health from one place.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/admin/users" className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">
            <Users className="w-4 h-4" />
            Manage Users
          </Link>
          <Link to="/admin/settings" className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <Settings2 className="w-4 h-4" />
            Settings
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: metrics?.totalUsers ?? 0, icon: Users, color: "text-blue-600" },
          { label: "Active Users", value: metrics?.activeUsers ?? 0, icon: Activity, color: "text-emerald-600" },
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

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-blue-600" /><h3 className="font-semibold text-foreground">Quick Actions</h3></div>
          <div className="space-y-3">
            {[
              { label: "Review user access", href: "/admin/users" },
              { label: "Adjust role policies", href: "/admin/roles" },
              { label: "Export audit log", href: "/admin/settings" },
            ].map((item) => (
              <Link key={item.label} to={item.href} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3"><BarChart3 className="w-4 h-4 text-emerald-600" /><h3 className="font-semibold text-foreground">System Health</h3></div>
          <p className="text-sm text-muted-foreground">Platform uptime and policy enforcement are healthy. Refresh the admin settings page for the latest audit events.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3"><Bell className="w-4 h-4 text-purple-600" /><h3 className="font-semibold text-foreground">Notifications</h3></div>
          <p className="text-sm text-muted-foreground">New user signups, policy updates, and account changes will appear in the audit stream.</p>
        </div>
      </div>
    </div>
  );
}

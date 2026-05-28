import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { userService } from "@/services/userService";
import { GlobalRole, User } from "@/types";
import { Loader2, Search, Edit, Shield, CheckCircle2, XCircle, Download, Power, PowerOff, Eye, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const roleFilters: Array<"all" | GlobalRole> = ["all", "individual", "student", "team_member", "team_manager", "hr_admin", "platform_admin"];

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | GlobalRole>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUsers = async () => {
    setIsLoading(true);
    setUsers(await userService.fetchAllUsers());
    setIsLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const toggleActive = async (user: User) => {
    if (user.active) {
      await userService.deactivateUser(user.id);
      toast.success(`${user.name} deactivated`);
    } else {
      await userService.activateUser(user.id);
      toast.success(`${user.name} reactivated`);
    }
    await loadUsers();
  };

  const resetPassword = async (user: User) => {
    await userService.resetUserPassword(user.id);
    toast.success(`Password reset sent to ${user.name}`);
  };

  const exportUsers = async () => {
    const payload = await userService.exportUsers();
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "forcefocus-users.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("User export downloaded");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all users, roles, access, and account status across the platform.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={loadUsers} className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button onClick={exportUsers} className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {[
          { label: "Total Users", value: users.length, icon: Eye },
          { label: "Active", value: users.filter((u) => u.active).length, icon: CheckCircle2 },
          { label: "Admins", value: users.filter((u) => u.role === "platform_admin" || u.role === "hr_admin").length, icon: Shield },
          { label: "Inactive", value: users.filter((u) => !u.active).length, icon: XCircle },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-4">
            <Icon className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {roleFilters.map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-semibold capitalize border transition-colors",
                    roleFilter === role ? "bg-blue-600 text-white border-blue-600" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {role === "all" ? "All Roles" : role.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/40 border-b border-border text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">User</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Teams</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-muted-foreground text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Shield className="w-3.5 h-3.5" />
                        <span className="capitalize">{user.role.replace("_", " ")}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{user.teamIds.length} team(s)</td>
                    <td className="px-6 py-4">
                      {user.active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          <XCircle className="w-3.5 h-3.5" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title={`View ${user.name} details`}
                          aria-label={`View ${user.name} details`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => resetPassword(user)} className="p-2 text-muted-foreground hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors" title="Reset password">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleActive(user)} className="p-2 text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title={user.active ? "Deactivate" : "Activate"}>
                          {user.active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                        </button>
                        <Link
                          to={`/admin/users/${user.id}/edit`}
                          className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit user"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No users found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center text-xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedUser.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close user card"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Role</p>
                <p className="mt-1 text-sm font-semibold text-foreground capitalize">{selectedUser.role.replace("_", " ")}</p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Status</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{selectedUser.active ? "Active" : "Inactive"}</p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Teams</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{selectedUser.teamIds.length} team(s)</p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Experience</p>
                <p className="mt-1 text-sm font-semibold text-foreground">Level {selectedUser.level}</p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:col-span-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Focus Stats</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">XP</span>
                  <span className="font-semibold text-foreground">{selectedUser.xp}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                    style={{ width: `${Math.min(100, (selectedUser.xp % 1000) / 10)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

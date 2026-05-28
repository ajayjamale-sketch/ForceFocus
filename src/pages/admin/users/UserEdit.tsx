import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { userService } from "@/services/userService";
import { User, GlobalRole } from "@/types";
import { ArrowLeft, Loader2, Save, User as UserIcon, Power, PowerOff, KeyRound, Shield, UserRound } from "lucide-react";
import { toast } from "sonner";

export default function AdminUserEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<GlobalRole>("individual");
  const [active, setActive] = useState(true);

  const load = async () => {
    if (!id) return;
    setIsLoading(true);
    const data = await userService.fetchUser(id);
    if (data) {
      setUser(data);
      setName(data.name);
      setRole(data.role);
      setActive(data.active);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-foreground">User not found</h2>
        <button onClick={() => navigate("/admin/users")} className="text-blue-600 mt-2">Back to users</button>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsSaving(true);
    await userService.updateUser(id, { name, role, active });
    toast.success("User updated");
    navigate("/admin/users");
    setIsSaving(false);
  };

  const handleDeactivate = async () => {
    if (!id) return;
    await userService.deactivateUser(id);
    setActive(false);
    toast.success("User deactivated");
    await load();
  };

  const handleReactivate = async () => {
    if (!id) return;
    await userService.activateUser(id);
    setActive(true);
    toast.success("User reactivated");
    await load();
  };

  const handleResetPassword = async () => {
    if (!id) return;
    await userService.resetUserPassword(id);
    toast.success("Password reset sent");
  };

  const handleImpersonate = async () => {
    if (!id) return;
    if (!confirm(`Start an impersonation session for ${user.name}?`)) return;
    await userService.impersonateUser(id);
    toast.info(`Impersonation session started for ${user.name}`);
    window.location.assign("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate("/admin/users")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Users
      </button>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
            <UserIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit User</h1>
            <p className="text-sm text-muted-foreground mt-1">Update {user.email}'s details and permissions.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-6">
          <button onClick={handleImpersonate} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
            <UserRound className="w-4 h-4" /> Impersonate
          </button>
          <button onClick={handleResetPassword} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
            <KeyRound className="w-4 h-4" /> Reset Password
          </button>
          <button onClick={active ? handleDeactivate : handleReactivate} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
            {active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
            {active ? "Deactivate" : "Reactivate"}
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</label>
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-foreground">Global Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as GlobalRole)}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-500 outline-none transition-all capitalize"
            >
              <option value="individual">Individual</option>
              <option value="student">Student</option>
              <option value="team_member">Team Member</option>
              <option value="team_manager">Team Manager</option>
              <option value="hr_admin">HR Admin</option>
              <option value="platform_admin">Platform Admin</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-xl">
            <div>
              <p className="font-medium text-foreground">Account Status</p>
              <p className="text-sm text-muted-foreground">{active ? "User can log in and access the platform." : "User is deactivated and cannot log in."}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
              {active ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="pt-6 border-t border-border flex justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-sm"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

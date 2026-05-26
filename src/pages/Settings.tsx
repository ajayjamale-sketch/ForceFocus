import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Bell, Shield, Palette, Timer, Globe, CreditCard,
  ChevronRight, Sun, Moon, Save, Trash2, Download, Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsTab = "notifications" | "appearance" | "focus" | "privacy" | "billing" | "account";

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "focus", label: "Focus & Sessions", icon: Timer },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "account", label: "Account", icon: Globe },
];

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none",
        checked ? "bg-blue-600" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

export default function Settings() {
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>("notifications");
  const [isSaving, setIsSaving] = useState(false);

  const [notifSettings, setNotifSettings] = useState({
    focusReminders: true,
    habitReminders: true,
    weeklyReport: true,
    teamUpdates: false,
    marketingEmails: false,
    pushNotifications: true,
    soundAlerts: true,
  });

  const [focusSettings, setFocusSettings] = useState({
    pomodoroDuration: "25",
    shortBreak: "5",
    longBreak: "15",
    sessionsBeforeLongBreak: "4",
    autoStartBreaks: true,
    autoStartPomodoros: false,
    strictMode: false,
    allowEmergencyBypass: true,
  });

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success("Settings saved successfully!");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground">Settings</span>
          </nav>
          <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Customize your ForceFocus experience.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    activeTab === id
                      ? "bg-blue-600 text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold text-foreground mb-6">Notification Preferences</h3>
                <div className="space-y-5">
                  {[
                    { key: "focusReminders", label: "Focus session reminders", desc: "Get reminded to start your scheduled focus sessions" },
                    { key: "habitReminders", label: "Habit check-in reminders", desc: "Daily reminders to complete your habit checklist" },
                    { key: "weeklyReport", label: "Weekly performance report", desc: "Receive your productivity summary every Monday" },
                    { key: "teamUpdates", label: "Team activity updates", desc: "Notifications when teammates complete goals" },
                    { key: "marketingEmails", label: "Product updates & tips", desc: "New features, productivity tips, and best practices" },
                    { key: "pushNotifications", label: "Browser push notifications", desc: "Allow push notifications in your browser" },
                    { key: "soundAlerts", label: "Session sound alerts", desc: "Play sounds when focus sessions start and end" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                      <ToggleSwitch
                        checked={notifSettings[key as keyof typeof notifSettings]}
                        onChange={(v) => setNotifSettings((p) => ({ ...p, [key]: v }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === "appearance" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold text-foreground mb-6">Appearance</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Theme</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "light", icon: Sun, label: "Light Mode" },
                        { value: "dark", icon: Moon, label: "Dark Mode" },
                      ].map(({ value, icon: Icon, label }) => (
                        <button
                          key={value}
                          onClick={() => { if (theme !== value) toggleTheme(); }}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                            theme === value
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-border hover:border-blue-300"
                          )}
                        >
                          <Icon className="w-5 h-5 text-foreground" />
                          <span className="text-sm font-medium text-foreground">{label}</span>
                          {theme === value && (
                            <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Accent Color</p>
                    <div className="flex gap-3">
                      {["#2563EB", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4"].map((color) => (
                        <button
                          key={color}
                          style={{ backgroundColor: color }}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all duration-200",
                            color === "#2563EB" ? "border-foreground scale-110" : "border-transparent hover:scale-110"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Font Size</p>
                    <div className="flex gap-2">
                      {["Small", "Medium", "Large"].map((size, i) => (
                        <button
                          key={size}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                            i === 1
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-foreground"
                              : "border-border text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Focus */}
            {activeTab === "focus" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold text-foreground mb-6">Focus & Session Settings</h3>
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: "pomodoroDuration", label: "Pomodoro Duration (min)", min: 5, max: 90 },
                      { key: "shortBreak", label: "Short Break (min)", min: 1, max: 30 },
                      { key: "longBreak", label: "Long Break (min)", min: 5, max: 60 },
                      { key: "sessionsBeforeLongBreak", label: "Sessions Before Long Break", min: 2, max: 8 },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                        <input
                          type="number"
                          value={focusSettings[key as keyof typeof focusSettings] as string}
                          onChange={(e) => setFocusSettings((p) => ({ ...p, [key]: e.target.value }))}
                          className="input-field"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 pt-2 border-t border-border">
                    {[
                      { key: "autoStartBreaks", label: "Auto-start breaks", desc: "Automatically start break timer after focus session" },
                      { key: "autoStartPomodoros", label: "Auto-start next session", desc: "Automatically start next focus session after break" },
                      { key: "strictMode", label: "Strict mode", desc: "Prevent pausing or stopping sessions once started" },
                      { key: "allowEmergencyBypass", label: "Allow emergency bypass", desc: "Allow bypassing distraction blocker with a code" },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        </div>
                        <ToggleSwitch
                          checked={focusSettings[key as keyof typeof focusSettings] as boolean}
                          onChange={(v) => setFocusSettings((p) => ({ ...p, [key]: v }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy */}
            {activeTab === "privacy" && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-foreground mb-5">Privacy & Security</h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => toast.info("Password change form coming soon!")}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4 text-blue-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">Change Password</p>
                          <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => toast.info("2FA setup coming soon!")}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                          <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">Not enabled</span>
                    </button>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-foreground mb-5">Data & Privacy</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => toast.success("Data export started. You'll receive an email shortly.")}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors"
                    >
                      <Download className="w-4 h-4 text-blue-600" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Export My Data</p>
                        <p className="text-xs text-muted-foreground">Download all your productivity data as JSON</p>
                      </div>
                    </button>
                    <button
                      onClick={() => toast.error("Account deletion requires email confirmation.")}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-red-600">Delete Account</p>
                        <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Billing */}
            {activeTab === "billing" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-blue-200 mb-1">Current Plan</p>
                      <p className="font-display text-2xl font-bold capitalize">{user.role} Plan</p>
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">Active</span>
                  </div>
                  <p className="text-blue-100 text-sm mb-5">Next billing date: June 15, 2026</p>
                  <div className="flex gap-3">
                    <Link to="/pricing" className="px-4 py-2 bg-white text-blue-600 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors">
                      Upgrade Plan
                    </Link>
                    <button onClick={() => toast.info("Manage subscription at billing portal.")} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-xl transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-foreground mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/27</p>
                      </div>
                    </div>
                    <button onClick={() => toast.info("Update payment method coming soon!")} className="text-sm text-blue-600 hover:underline font-medium">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account */}
            {activeTab === "account" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold text-foreground mb-6">Account Settings</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Language</label>
                    <select className="input-field">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Date Format</label>
                    <select className="input-field">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Week Starts On</label>
                    <select className="input-field">
                      <option>Monday</option>
                      <option>Sunday</option>
                      <option>Saturday</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save */}
            {activeTab !== "billing" && (
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary flex items-center gap-2 disabled:opacity-60"
                >
                  {isSaving ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                  ) : (
                    <><Save className="w-4 h-4" />Save Settings</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

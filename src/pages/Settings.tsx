import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "sonner";


import {
  Bell, Shield, Palette, Timer, Globe, CreditCard,
  ChevronRight, Sun, Moon, Save, Trash2, Download, Lock,
  LogOut, RefreshCw, FileDown, MonitorCog, Sparkles, Mail, Volume2, Eye
} from "lucide-react";
import { cn, getStoredSettings, removeStoredSettings, saveStoredSettings } from "@/lib/utils";

type SettingsTab = "notifications" | "appearance" | "focus" | "privacy" | "billing" | "account";

type NotificationSettings = {
  focusReminders: boolean;
  habitReminders: boolean;
  weeklyReport: boolean;
  teamUpdates: boolean;
  marketingEmails: boolean;
  pushNotifications: boolean;
  soundAlerts: boolean;
};

type FocusSettings = {
  pomodoroDuration: string;
  shortBreak: string;
  longBreak: string;
  sessionsBeforeLongBreak: string;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  strictMode: boolean;
  allowEmergencyBypass: boolean;
};

type PrivacySettings = {
  dataSharing: boolean;
  activityTracking: boolean;
  analyticsCollection: boolean;
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
};

type AccountSettings = {
  language: string;
  dateFormat: string;
  weekStartsOn: string;
  timezone: string;
};

type SettingsState = {
  notifications: NotificationSettings;
  focus: FocusSettings;
  privacy: PrivacySettings;
  account: AccountSettings;
  appearance: {
    accentColor: string;
    fontSize: "Small" | "Medium" | "Large";
  };
};

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
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background",
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

const DEFAULT_SETTINGS: SettingsState = {
  notifications: {
    focusReminders: true,
    habitReminders: true,
    weeklyReport: true,
    teamUpdates: false,
    marketingEmails: false,
    pushNotifications: true,
    soundAlerts: true,
  },
  focus: {
    pomodoroDuration: "25",
    shortBreak: "5",
    longBreak: "15",
    sessionsBeforeLongBreak: "4",
    autoStartBreaks: true,
    autoStartPomodoros: false,
    strictMode: false,
    allowEmergencyBypass: true,
  },
  privacy: {
    dataSharing: false,
    activityTracking: true,
    analyticsCollection: true,
    twoFactorEnabled: false,
    loginAlerts: true,
  },
  account: {
    language: "English (US)",
    dateFormat: "MM/DD/YYYY",
    weekStartsOn: "Monday",
    timezone: "Auto-detect",
  },
  appearance: {
    accentColor: "#2563EB",
    fontSize: "Medium",
  },
};

export default function Settings() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>("notifications");
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);

  const storageKey = useMemo(() => `ff_settings_${user?.id || "guest"}`, [user?.id]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) return;
    const loaded = getStoredSettings<SettingsState>(storageKey, DEFAULT_SETTINGS);
    setSettings(loaded);
  }, [storageKey, user]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", settings.appearance.accentColor === "#2563EB" ? "221 83% 53%" : "221 83% 53%");
    root.style.setProperty("--accent-color", settings.appearance.accentColor);
    root.dataset.fontSize = settings.appearance.fontSize.toLowerCase();
  }, [settings.appearance.accentColor, settings.appearance.fontSize]);

  const patchSettings = <K extends keyof SettingsState>(section: K, value: Partial<SettingsState[K]>) => {
    setSettings((prev) => ({ ...prev, [section]: { ...prev[section], ...value } }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    saveStoredSettings(storageKey, settings);
    if (settings.privacy.twoFactorEnabled) {
      toast.success("Two-factor authentication is enabled.");
    }
    if (settings.notifications.pushNotifications) {
      toast.info("Push notifications are enabled.");
    }
    await new Promise((r) => setTimeout(r, 600));
    setIsSaving(false);
    toast.success("Settings saved successfully!");
  };

  const exportSettings = async () => {
    const payload = { user: user?.email, settings };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "forcefocus-settings.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Settings export downloaded");
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    removeStoredSettings(storageKey);
    toast.success("Settings reset to defaults");
  };

  const handleDeleteAccount = () => {
    if (!confirm("This will remove your local demo account data and settings. Continue?")) return;
    removeStoredSettings(storageKey);
    localStorage.removeItem(`ff_user_${user?.id}`);
    logout();
    toast.success("Account data cleared");
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground">Settings</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Customize your ForceFocus experience and save it locally.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={exportSettings} className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                <FileDown className="w-4 h-4" />
                Export
              </button>
              <button onClick={resetSettings} className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-2 sticky top-24">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    activeTab === id
                      ? "bg-blue-600 text-white shadow-premium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {activeTab === "notifications" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-semibold text-foreground">Notification Preferences</h3>
                </div>
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
                        checked={settings.notifications[key as keyof NotificationSettings]}
                        onChange={(v) => patchSettings("notifications", { [key]: v } as Partial<NotificationSettings>)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-semibold text-foreground">Appearance</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Theme</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ value: "light", icon: Sun, label: "Light Mode" }, { value: "dark", icon: Moon, label: "Dark Mode" }].map(({ value, icon: Icon, label }) => (
                        <button
                          key={value}
                          onClick={() => {
                            if (theme !== value) toggleTheme();
                            toast.success(`${label} applied`);
                          }}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                            theme === value ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-border hover:border-blue-300"
                          )}
                        >
                          <Icon className="w-5 h-5 text-foreground" />
                          <span className="text-sm font-medium text-foreground">{label}</span>
                          {theme === value && <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Accent Color</p>
                    <div className="flex gap-3 flex-wrap">
                      {["#2563EB", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4"].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            patchSettings("appearance", { accentColor: color });
                            toast.success("Accent color saved");
                          }}
                          style={{ backgroundColor: color }}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all duration-200",
                            settings.appearance.accentColor === color ? "border-foreground scale-110" : "border-transparent hover:scale-110"
                          )}
                          aria-label={`Set accent color ${color}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Font Size</p>
                    <div className="flex gap-2 flex-wrap">
                      {(["Small", "Medium", "Large"] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            patchSettings("appearance", { fontSize: size });
                            toast.success(`Font size set to ${size}`);
                          }}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                            settings.appearance.fontSize === size ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
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

            {activeTab === "focus" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Timer className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-semibold text-foreground">Focus & Session Settings</h3>
                </div>
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: "pomodoroDuration", label: "Pomodoro Duration (min)" },
                      { key: "shortBreak", label: "Short Break (min)" },
                      { key: "longBreak", label: "Long Break (min)" },
                      { key: "sessionsBeforeLongBreak", label: "Sessions Before Long Break" },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                        <input
                          type="number"
                          value={settings.focus[key as keyof FocusSettings] as string}
                          min={1}
                          onChange={(e) => patchSettings("focus", { [key]: e.target.value } as Partial<FocusSettings>)}
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
                          checked={settings.focus[key as keyof FocusSettings] as boolean}
                          onChange={(v) => patchSettings("focus", { [key]: v } as Partial<FocusSettings>)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-semibold text-foreground">Privacy & Security</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { key: "dataSharing", label: "Allow data sharing for AI coaching", desc: "Share anonymized data to improve coaching suggestions" },
                      { key: "activityTracking", label: "Activity tracking", desc: "Track active work and focus session activity" },
                      { key: "analyticsCollection", label: "Analytics collection", desc: "Collect usage data for reports and insights" },
                      { key: "twoFactorEnabled", label: "Two-factor authentication", desc: "Add an extra layer of security to your account" },
                      { key: "loginAlerts", label: "Login alerts", desc: "Get notified when your account signs in on a new device" },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-start justify-between gap-4 border border-border rounded-xl p-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        </div>
                        <ToggleSwitch
                          checked={settings.privacy[key as keyof PrivacySettings]}
                          onChange={(v) => patchSettings("privacy", { [key]: v } as Partial<PrivacySettings>)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Download className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-semibold text-foreground">Data & Privacy Actions</h3>
                  </div>
                  <div className="space-y-3">
                    <button onClick={exportSettings} className="w-full flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Export My Data</p>
                        <p className="text-xs text-muted-foreground">Download your settings and preferences as JSON</p>
                      </div>
                    </button>
                    <button onClick={() => toast.success("Privacy policy consent updated") } className="w-full flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors">
                      <Eye className="w-4 h-4 text-emerald-600" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Review Privacy Policy</p>
                        <p className="text-xs text-muted-foreground">Open the privacy policy and consent details</p>
                      </div>
                    </button>
                    <button onClick={handleDeleteAccount} className="w-full flex items-center gap-3 p-4 rounded-xl border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-red-600">Delete Account</p>
                        <p className="text-xs text-muted-foreground">Clear local account data and sign out</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-blue-200 mb-1">Current Plan</p>
                      <p className="font-display text-2xl font-bold capitalize">{user.role.replace("_", " ")} Plan</p>
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">Active</span>
                  </div>
                  <p className="text-blue-100 text-sm mb-5">Next billing date: June 15, 2026</p>
                  <div className="flex gap-3 flex-wrap">
                    <Link to="/pricing" className="px-4 py-2 bg-white text-blue-600 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors">
                      Upgrade Plan
                    </Link>
                    <button onClick={() => toast.info("Billing portal is not connected yet. Use pricing to compare plans.")} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-xl transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-foreground mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between gap-4 p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/27</p>
                      </div>
                    </div>
                    <button onClick={() => toast.info("Payment update flow is not connected yet.")} className="text-sm text-blue-600 hover:underline font-medium">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-semibold text-foreground">Account Settings</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Language</label>
                    <select
                      className="input-field"
                      value={settings.account.language}
                      onChange={(e) => patchSettings("account", { language: e.target.value })}
                    >
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
                    <select
                      className="input-field"
                      value={settings.account.dateFormat}
                      onChange={(e) => patchSettings("account", { dateFormat: e.target.value })}
                    >
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Week Starts On</label>
                    <select
                      className="input-field"
                      value={settings.account.weekStartsOn}
                      onChange={(e) => patchSettings("account", { weekStartsOn: e.target.value })}
                    >
                      <option>Monday</option>
                      <option>Sunday</option>
                      <option>Saturday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Timezone</label>
                    <select
                      className="input-field"
                      value={settings.account.timezone}
                      onChange={(e) => patchSettings("account", { timezone: e.target.value })}
                    >
                      <option>Auto-detect</option>
                      <option>Asia/Calcutta</option>
                      <option>America/New_York</option>
                      <option>Europe/London</option>
                      <option>America/Los_Angeles</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <button onClick={handleLogout} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                    <button onClick={exportSettings} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button onClick={handleDeleteAccount} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 dark:border-red-900/30 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

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

    </div>
  );
}

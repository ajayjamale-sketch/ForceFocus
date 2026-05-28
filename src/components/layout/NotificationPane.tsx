import { Bell, CheckCheck, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, getStoredSettings, saveStoredSettings } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  href?: string;
  unread?: boolean;
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "focus-reminder",
    title: "Focus session ready",
    message: "Your next deep work block starts in 10 minutes.",
    time: "2m ago",
    href: "/dashboard/focus",
    unread: true,
  },
  {
    id: "team-update",
    title: "Team activity update",
    message: "3 teammates completed goals today.",
    time: "18m ago",
    href: "/team",
    unread: true,
  },
  {
    id: "admin-audit",
    title: "Audit log synced",
    message: "A new policy update was recorded in admin logs.",
    time: "1h ago",
    href: "/admin/settings",
    unread: false,
  },
];

const STORAGE_KEY = "ff_notifications";

function loadNotifications(): NotificationItem[] {
  return getStoredSettings(STORAGE_KEY, defaultNotifications);
}

export function markNotificationsRead() {
  const next = loadNotifications().map((n) => ({ ...n, unread: false }));
  saveStoredSettings(STORAGE_KEY, next);
}

interface NotificationPaneProps {
  open: boolean;
  onClose: () => void;
  align?: "right" | "left";
}

export default function NotificationPane({ open, onClose, align = "right" }: NotificationPaneProps) {
  const notifications = loadNotifications();
  const unreadCount = notifications.filter((n) => n.unread).length;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/30"
      onClick={onClose}
    >
      <div
        className={cn(
          "absolute top-20 w-[92vw] max-w-sm rounded-3xl border border-border bg-card shadow-2xl overflow-hidden",
          align === "right" ? "right-4 sm:right-6" : "left-4 sm:left-6"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
          </div>
          <button
            onClick={() => {
              markNotificationsRead();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark read
          </button>
        </div>

        <div className="max-h-[60vh] overflow-auto divide-y divide-border">
          {notifications.map((notification) => (
            <Link
              key={notification.id}
              to={notification.href ?? "#"}
              onClick={() => {
                markNotificationsRead();
                onClose();
              }}
              className="flex items-start gap-3 px-5 py-4 hover:bg-muted/40 transition-colors"
            >
              <div className={cn("mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl", notification.unread ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground")}>
                <Bell className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                  {notification.unread && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>{notification.time}</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="border-t border-border px-5 py-3">
          <Link
            to="/settings"
            onClick={onClose}
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Notification preferences
          </Link>
        </div>
      </div>
    </div>
  );
}

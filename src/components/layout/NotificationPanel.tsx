import { useState } from "react";
import { Bell, Check, Trash2, Zap, Heart, Trophy } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock notifications for now
const initialNotifications = [
  { id: 1, title: "Daily Goal Reached", description: "You completed your 4 hours of focus time!", time: "2 hours ago", icon: Trophy, read: false, type: "success" },
  { id: 2, title: "New Feature", description: "Check out the new team analytics dashboard.", time: "5 hours ago", icon: Zap, read: true, type: "info" },
  { id: 3, title: "Wellness Reminder", description: "You've been focusing for 2 hours. Take a short break!", time: "1 day ago", icon: Heart, read: true, type: "warning" },
];

export function NotificationPanel() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="btn-ghost w-11 h-11 flex items-center justify-center rounded-xl relative hover:bg-muted" aria-label="Notifications">
          <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-blue-500 border-2 border-background rounded-full" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0 mr-4 shadow-xl border-border/50" align="end" sideOffset={8}>
        <div className="p-4 border-b border-border/50 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Notifications</h4>
            <div className="flex items-center gap-2">
              <button onClick={markAllAsRead} className="text-xs text-muted-foreground hover:text-foreground transition-colors" title="Mark all as read">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-red-500 transition-colors" title="Clear all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            You have {unreadCount} unread messages.
          </p>
        </div>
        
        <div className="flex flex-col max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Bell className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div 
                  key={notification.id} 
                  className={cn(
                    "flex gap-4 p-4 border-b border-border/30 last:border-0 transition-all duration-200 cursor-pointer hover:bg-muted/30",
                    notification.read ? "opacity-70 bg-transparent" : "bg-blue-500/5"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    notification.type === "success" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                    notification.type === "warning" ? "bg-orange-500/10 text-orange-600 dark:text-orange-400" :
                    "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-sm font-medium truncate", !notification.read ? "text-foreground" : "text-muted-foreground")}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 self-center flex-shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

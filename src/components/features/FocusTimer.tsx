import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, SkipForward, Coffee, Volume2, VolumeX } from "lucide-react";
import { cn, formatTime } from "@/lib/utils";

type SessionType = "focus" | "short-break" | "long-break";

const SESSION_CONFIGS: Record<SessionType, { label: string; duration: number; color: string }> = {
  focus: { label: "Focus", duration: 25 * 60, color: "from-blue-600 to-blue-800" },
  "short-break": { label: "Short Break", duration: 5 * 60, color: "from-emerald-500 to-emerald-700" },
  "long-break": { label: "Long Break", duration: 15 * 60, color: "from-teal-500 to-teal-700" },
};

const SETTINGS_KEY = () => {
  try {
    const storedUser = localStorage.getItem("ff_user");
    if (!storedUser) return "ff_settings_guest";
    const parsed = JSON.parse(storedUser) as { id?: string };
    return `ff_settings_${parsed.id || "guest"}`;
  } catch {
    return "ff_settings_guest";
  }
};

const readStoredSettings = () => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY());
    if (!stored) return null;
    return JSON.parse(stored) as {
      focus?: {
        pomodoroDuration?: string;
        shortBreak?: string;
        longBreak?: string;
        sessionsBeforeLongBreak?: string;
        autoStartBreaks?: boolean;
        autoStartPomodoros?: boolean;
        strictMode?: boolean;
        allowEmergencyBypass?: boolean;
      };
      notifications?: {
        soundAlerts?: boolean;
      };
    };
  } catch {
    return null;
  }
};

interface FocusTimerProps {
  onSessionComplete?: (type: SessionType, duration: number) => void;
}

export default function FocusTimer({ onSessionComplete }: FocusTimerProps) {
  const [sessionType, setSessionType] = useState<SessionType>("focus");
  const storedSettings = readStoredSettings();
  const focusDuration = Number(storedSettings?.focus?.pomodoroDuration || 25) * 60;
  const shortBreakDuration = Number(storedSettings?.focus?.shortBreak || 5) * 60;
  const longBreakDuration = Number(storedSettings?.focus?.longBreak || 15) * 60;
  const sessionsBeforeLongBreak = Number(storedSettings?.focus?.sessionsBeforeLongBreak || 4);
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isMuted, setIsMuted] = useState(!(storedSettings?.notifications?.soundAlerts ?? true));

  const config = {
    ...SESSION_CONFIGS[sessionType],
    duration:
      sessionType === "focus"
        ? focusDuration
        : sessionType === "short-break"
          ? shortBreakDuration
          : longBreakDuration,
  };
  const totalDuration = config.duration;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(sessionType === "focus" ? focusDuration : sessionType === "short-break" ? shortBreakDuration : longBreakDuration);
  }, [sessionType, focusDuration, shortBreakDuration, longBreakDuration]);

  const handleSessionTypeChange = (type: SessionType) => {
    setSessionType(type);
    setIsRunning(false);
    setTimeLeft(type === "focus" ? focusDuration : type === "short-break" ? shortBreakDuration : longBreakDuration);
  };

  const handleSkip = () => {
    if (sessionType === "focus") {
      const nextSessions = sessionsCompleted + 1;
      setSessionsCompleted(nextSessions);
      handleSessionTypeChange(nextSessions % sessionsBeforeLongBreak === 0 ? "long-break" : "short-break");
    } else {
      handleSessionTypeChange("focus");
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          if (sessionType === "focus") {
            setSessionsCompleted((s) => s + 1);
            onSessionComplete?.(sessionType, config.duration);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, sessionType, config.duration, onSessionComplete]);

  useEffect(() => {
    setTimeLeft(
      sessionType === "focus"
        ? focusDuration
        : sessionType === "short-break"
          ? shortBreakDuration
          : longBreakDuration
    );
  }, [sessionType, focusDuration, shortBreakDuration, longBreakDuration]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      {/* Session Type Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 mb-8">
        {(Object.entries(SESSION_CONFIGS) as [SessionType, typeof config][]).map(
          ([type, cfg]) => (
            <button
              key={type}
              onClick={() => handleSessionTypeChange(type)}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200",
                sessionType === type
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cfg.label}
            </button>
          )
        )}
      </div>

      {/* Timer Circle */}
      <div className="flex flex-col items-center mb-8">
        <div className={cn("relative", isRunning && "timer-active")}>
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx="110"
              cy="110"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="110"
              cy="110"
              r="90"
              fill="none"
              stroke="url(#timerGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-5xl font-bold text-foreground tabular-nums">
              {formatTime(timeLeft)}
            </span>
            <span className="text-sm text-muted-foreground mt-1 font-medium">
              {config.label}
            </span>
            {isRunning && (
              <span className="mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-500 font-medium">In Focus</span>
              </span>
            )}
          </div>
        </div>

        {/* Sessions completed */}
        <div className="flex items-center gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                i < (sessionsCompleted % 4)
                  ? "bg-blue-600 scale-110"
                  : "bg-muted"
              )}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            {sessionsCompleted} sessions today
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={resetTimer}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg",
            isRunning
              ? "bg-muted hover:bg-muted/80 text-foreground"
              : "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-glow hover:-translate-y-0.5"
          )}
        >
          {isRunning ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </button>

        <button
          onClick={handleSkip}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Sound Toggle */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          {isMuted ? "Sound off" : "Focus sounds on"}
        </button>
      </div>
    </div>
  );
}

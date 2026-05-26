import { useState, useEffect, useCallback } from "react";
import { getTheme, saveTheme } from "@/lib/utils";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(getTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggleTheme };
}

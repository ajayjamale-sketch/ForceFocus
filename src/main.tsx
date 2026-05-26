import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Apply saved theme before render to prevent flash
const savedTheme = localStorage.getItem("ff_theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = savedTheme || (prefersDark ? "dark" : "light");
document.documentElement.classList.add(theme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

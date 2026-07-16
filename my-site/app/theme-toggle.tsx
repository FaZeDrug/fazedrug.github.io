"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    posthog.capture("theme_toggled", { theme: nextTheme });
  }

  return (
    <button
      type="button"
      className="theme-switch"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
    >
      <span className="theme-switch__knob" aria-hidden="true" />
    </button>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // initial load
  useEffect(() => {
    const saved = localStorage.getItem("studynook-theme");

    const preferred =
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    const initial = saved || preferred;

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");

    setMounted(true);
  }, []);

  // whenever theme changes
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("studynook-theme", theme);

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
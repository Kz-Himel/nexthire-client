"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5" />
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      isIconOnly
      size="sm"
      variant="bordered"
      onPress={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <HiSun className="h-4 w-4 text-yellow-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <HiMoon className="h-4 w-4 text-indigo-600" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={toggleTheme}
            className="relative p-2 rounded-full bg-glass-bg border border-glass-border backdrop-blur-sm transition-colors hover:bg-primary/20"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-yellow-400" />
                ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                )}
            </motion.div>
        </motion.button>
    );
}

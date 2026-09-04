"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Code2, ArrowRight, MapPin, CheckCircle2, Cpu, Shield, Database, Server, Cloud, Workflow, Award } from "lucide-react";

const TERMINAL_LOGS = [
  { time: "0.1s", text: "docker compose up -d --build (postgres, redis, api)", color: "text-blue-400" },
  { time: "0.8s", text: "jenkins.pipeline({ stages: 7, status: 'PASSED' });", color: "text-purple-400" },
  { time: "1.6s", text: "terraform.apply({ provider: 'AWS', vpc: 'active' });", color: "text-amber-400" },
  { time: "2.4s", text: "helm.deploy({ charts: 11, namespace: 'aurabank' });", color: "text-emerald-400" },
  { time: "3.1s", text: "Cloud-Native Infrastructure Online // 100% Ready", color: "text-cyan-400 font-bold" },
];

const EXPERTISE_TAGS = [
  { icon: Cloud, label: "AWS Cloud Infrastructure" },
  { icon: Server, label: "Docker & Kubernetes" },
  { icon: Workflow, label: "7-Stage CI/CD & Jenkins" },
  { icon: Terminal, label: "Bash & Linux Sysadmin" },
];

export default function PortfolioWelcome() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING CLOUD-NATIVE STACK...");
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    const isReload =
      (typeof window !== "undefined" &&
        ((window.performance?.getEntriesByType?.("navigation")?.[0] as any)?.type === "reload" ||
          (window.performance as any)?.navigation?.type === 1)) ||
      (typeof window !== "undefined" && sessionStorage.getItem("portfolio_welcome_viewed") === "true");

    setIsRefresh(isReload);

    // EXACT TIMING:
    // First load: 5000ms total (4400ms progress + 200ms hold + 400ms exit = 5000ms / 5.0s)
    // Refresh: 3000ms total (2400ms progress + 200ms hold + 400ms exit = 3000ms / 3.0s)
    const totalDuration = isReload ? 2000 : 4000;
    const exitDuration = 400;
    const holdDuration = 200;
    const fillDuration = totalDuration - exitDuration - holdDuration;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / fillDuration) * 100));
      setProgress(pct);

      if (elapsed >= fillDuration) {
        setProgress(100);
        setStatusText("SYSTEM ONLINE // WELCOME TO MY PORTFOLIO");
        setCurrentLogIndex(4);
        clearInterval(interval);

        if (typeof window !== "undefined") {
          sessionStorage.setItem("portfolio_welcome_viewed", "true");
        }

        setTimeout(() => {
          setVisible(false);
        }, holdDuration);
      } else {
        if (pct < 20) {
          setStatusText("INITIALIZING CLOUD-NATIVE STACK...");
          setCurrentLogIndex(0);
        } else if (pct < 45) {
          setStatusText("VERIFYING DOCKER & KUBERNETES CONFIGS...");
          setCurrentLogIndex(1);
        } else if (pct < 70) {
          setStatusText("INITIALIZING 7-STAGE JENKINS CI/CD...");
          setCurrentLogIndex(2);
        } else if (pct < 90) {
          setStatusText("PROVISIONING TERRAFORM AWS INFRASTRUCTURE...");
          setCurrentLogIndex(3);
        } else {
          setStatusText("FINALIZING HEALTHCHECKS & METRICS...");
          setCurrentLogIndex(4);
        }
      }
    }, 25);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("portfolio_welcome_viewed", "true");
        }
        setVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("portfolio_welcome_viewed", "true");
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-3.5 sm:p-6 md:p-8 bg-background text-foreground select-none overflow-y-auto sm:overflow-hidden min-h-[100dvh] h-[100dvh]"
        >
          {/* ── Top Navigation Bar ── */}
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-10 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs text-text-tertiary">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span className="font-bold text-text-primary hidden sm:inline">KONDA BALAJI RAO</span>
              <span className="text-text-muted hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-text-tertiary">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" /> Andhra Pradesh, India
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[11px] font-mono border border-border bg-card-bg/60 text-text-tertiary">
                {isRefresh ? "⚡ Fast Mode (3s)" : "🚀 Boot Sequence (5s)"}
              </span>
              <button
                onClick={handleSkip}
                className="text-[11px] sm:text-xs font-mono text-text-tertiary hover:text-primary transition-colors px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-card-bg hover:bg-card-bg-hover cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <span>Skip (Esc)</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>

          {/* ── Center Content: Developer Name, Expertise & Live Terminal ── */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-5 py-2">
            {/* Monogram Badge */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-2xl relative z-10 backdrop-blur-md">
                <Code2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl animate-pulse" />
            </motion.div>

            {/* Main Title & Role */}
            <div>
              <motion.h1
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-text-primary"
              >
                Konda Balaji Rao
              </motion.h1>

              <motion.p
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-2 sm:mt-3 text-[11px] sm:text-sm md:text-base text-primary font-mono font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 sm:gap-2 px-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Cloud &amp; DevOps Engineer · Roles &amp; Internships</span>
              </motion.p>
            </div>

            {/* Expertise Badges Pill Grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1 max-w-xl"
            >
              {EXPERTISE_TAGS.map((tag) => {
                const Icon = tag.icon;
                return (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-card-bg border border-border text-[10px] sm:text-xs font-mono text-text-secondary shadow-sm"
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    {tag.label}
                  </span>
                );
              })}
            </motion.div>

            {/* Live Terminal Log Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full max-w-lg rounded-xl border border-slate-700/60 bg-gray-950/95 dark:bg-card-bg/95 p-3 sm:p-4 text-left font-mono text-[10px] sm:text-xs shadow-2xl backdrop-blur-md text-slate-200"
            >
              <div className="flex items-center justify-between pb-1.5 sm:pb-2 mb-1.5 sm:mb-2 border-b border-white/10 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                  <span className="text-[9px] sm:text-[10px] ml-1.5 text-slate-400">devops-deploy.log</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-cyan-400 font-bold">AWS / SRE</span>
              </div>

              <div className="space-y-1 sm:space-y-1.5 max-h-[105px] sm:max-h-none overflow-hidden">
                {TERMINAL_LOGS.slice(0, currentLogIndex + 1).map((log, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 sm:gap-2 animate-fadeIn truncate">
                    <span className="text-slate-500 text-[9px] sm:text-[10px] shrink-0">[{log.time}]</span>
                    <span className={`${log.color} truncate`}>{log.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Bottom Progress Bar & Counter ── */}
          <div className="relative z-10 w-full max-w-xl mx-auto space-y-2 sm:space-y-2.5 shrink-0">
            <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-text-tertiary">
              <span className="flex items-center gap-1.5 sm:gap-2 truncate pr-2">
                <Terminal className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
                <span className="truncate">{statusText}</span>
              </span>
              <span className="font-bold text-text-primary text-sm sm:text-base tabular-nums shrink-0">{progress}%</span>
            </div>

            {/* Glowing Line Loader */}
            <div className="relative h-1.5 sm:h-2 w-full bg-card-bg rounded-full overflow-hidden border border-border shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-blue-500 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Live Metrics Row */}
            <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-text-tertiary pt-0.5">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> AWS Cloud Practitioner
              </span>
              <span className="flex items-center gap-1">
                <Server className="w-3 h-3 text-blue-500 shrink-0" /> Docker &amp; Kubernetes
              </span>
              <span className="hidden xs:flex sm:flex items-center gap-1">
                <Shield className="w-3 h-3 text-purple-500 shrink-0" /> 7-Stage CI/CD
              </span>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[150px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

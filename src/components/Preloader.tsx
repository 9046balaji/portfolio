"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

let hasShownPreloader = false;

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">(() => {
    if (hasShownPreloader) return "done";
    return "loading";
  });
  const [count, setCount] = useState(0);
  const [shutterOpen, setShutterOpen] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    // Skip preloader if user has already seen it this session or in this navigation
    if (hasShownPreloader || sessionStorage.getItem("preloader-shown")) {
      setPhase("done");
      hasShownPreloader = true;
      return;
    }

    let current = 0;

    intervalRef.current = setInterval(() => {
      const increment = Math.floor(Math.random() * 4) + 1;

      current = Math.min(100, current + increment);
      setCount(current);

      if (current >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        timeoutRefs.current.push(
          setTimeout(() => {
            if (!reduceMotion) {
              setShutterOpen(true);
            }
          }, reduceMotion ? 0 : 180),
          setTimeout(() => setPhase("reveal"), reduceMotion ? 220 : 820),
          setTimeout(() => {
            setPhase("done");
            sessionStorage.setItem("preloader-shown", "true");
            hasShownPreloader = true;
          }, reduceMotion ? 900 : 1800),
        );
      }
    }, reduceMotion ? 34 : 24);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [reduceMotion]);

  const grainStyle: CSSProperties = useMemo(
    () => ({
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
      backgroundSize: "150px",
    }),
    [],
  );

  const curtainTransition = reduceMotion
    ? {
      duration: 0.45,
      ease: "easeOut" as const,
    }
    : {
      duration: 0.95,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: 0.04,
    };

  const statusText = useMemo(() => {
    if (count < 25) return "INITIALIZING SYSTEM CORE...";
    if (count < 55) return "CALIBRATING 3D ENVIRONMENT...";
    if (count < 80) return "COMPILING SHADERS & MATRICES...";
    if (count < 100) return "OPTIMIZING SPACE INTERFACE...";
    return "SYSTEM READY";
  }, [count]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-overlay-bg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Ambient Atmosphere */}
          <div className="absolute inset-0 z-0">
            <motion.div
              className="absolute inset-0 opacity-[0.04]"
              style={grainStyle}
            />

            <motion.div
              className="absolute left-1/2 top-1/2 h-[45rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18)_0%,rgba(37,99,235,0.06)_35%,transparent_75%)] blur-3xl"
              animate={
                reduceMotion
                  ? { opacity: 0.75 }
                  : {
                    scale: [1, 1.05, 1],
                    opacity: [0.65, 1, 0.65],
                  }
              }
              transition={
                reduceMotion
                  ? { duration: 0.5 }
                  : {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
              }
            />
          </div>

          {/* Top Curtain */}
          <motion.div
            className="absolute top-0 left-0 h-1/2 w-full border-b border-glass-border/50 bg-overlay-bg"
            animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
            transition={curtainTransition}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={grainStyle} />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.1,
              }}
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-glass-border to-transparent"
            />
          </motion.div>

          {/* Bottom Curtain */}
          <motion.div
            className="absolute bottom-0 left-0 h-1/2 w-full border-t border-glass-border/50 bg-overlay-bg"
            animate={phase === "reveal" ? { y: "100%" } : { y: 0 }}
            transition={curtainTransition}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={grainStyle} />
          </motion.div>

          {/* Centered Cinematic Loading HUD */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center"
            animate={
              shutterOpen
                ? { opacity: 0, scale: 0.88, filter: "blur(10px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Shutter Circle / Iris */}
            <div className="relative flex flex-col items-center">
              <div className="absolute h-28 w-28 rounded-full border border-glass-border bg-glass-bg shadow-[0_0_30px_rgba(37,99,235,0.05)]" />
              <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18)_0%,transparent_70%)] blur-2xl animate-pulse" />

              <svg viewBox="0 0 120 120" className="relative z-10 h-28 w-28">
                <motion.circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />

                <motion.circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 55}`}
                  strokeDashoffset={`${2 * Math.PI * 55 * (1 - count / 100)}`}
                  transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />

                {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                  <motion.path
                    key={index}
                    d="M60,60 L56,26 A5,5 0 0,1 64,26 Z"
                    fill={
                      shutterOpen
                        ? "rgba(37,99,235,0.55)"
                        : "rgba(255,255,255,0.92)"
                    }
                    style={{ transformOrigin: "60px 60px" }}
                    transform={`rotate(${angle} 60 60)`}
                    animate={{
                      scale: shutterOpen ? 0.1 : 1,
                      opacity: shutterOpen ? 0 : 1,
                    }}
                    transition={{
                      duration: reduceMotion ? 0.2 : 0.42,
                      ease: [0.4, 0, 0.2, 1],
                      delay: index * 0.02,
                    }}
                  />
                ))}

                <motion.circle
                  cx="60"
                  cy="60"
                  r="5"
                  fill="#2563eb"
                  animate={{
                    r: shutterOpen ? 28 : 5,
                    opacity: shutterOpen ? 0 : 1,
                  }}
                  transition={{
                    duration: reduceMotion ? 0.2 : 0.45,
                    ease: "easeOut",
                  }}
                />
              </svg>
            </div>

            {/* Dynamic Progress Percentage */}
            <motion.div
              className="mt-6 font-mono text-[3.2rem] font-extralight tracking-[0.22em] text-foreground/90 pl-3 tabular-nums select-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {String(count).padStart(3, "0")}
            </motion.div>

            {/* Pulsing Status Label */}
            <motion.div
              animate={{ opacity: [0.42, 1, 0.42] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.45em] text-primary/80 select-none"
            >
              {statusText}
            </motion.div>
          </motion.div>

          {/* Cinematic Transitions Flash */}
          <AnimatePresence>
            {shutterOpen && !reduceMotion && (
              <motion.div
                className="absolute inset-0 z-30 bg-white"
                initial={{ opacity: 0.48 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

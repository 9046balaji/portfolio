"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [count, setCount] = useState(0);
  const [shutterOpen, setShutterOpen] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
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
          setTimeout(() => setPhase("done"), reduceMotion ? 900 : 1800),
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

  const cardTransition = reduceMotion
    ? {
      duration: 0.4,
      ease: "easeOut" as const,
    }
    : {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#040404] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Ambient Atmosphere */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 opacity-[0.04]"
              style={grainStyle}
            />

            <motion.div
              className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16)_0%,rgba(59,130,246,0.06)_28%,transparent_72%)] blur-3xl"
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
            className="absolute top-0 left-0 flex h-1/2 w-full items-end justify-center overflow-hidden border-b border-white/5 bg-[#040404] pb-14"
            animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
            transition={curtainTransition}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={grainStyle} />

            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="absolute top-8 right-8 font-mono text-[11px] tracking-[0.2em] text-white/18 tabular-nums"
            >
              {String(count).padStart(3, "0")}
            </motion.div>

            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
              <div className="relative flex flex-col items-center">
                <div className="absolute h-28 w-28 rounded-full border border-white/10" />
                <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18)_0%,transparent_70%)] blur-2xl" />

                <svg viewBox="0 0 120 120" className="relative z-10 h-28 w-28">
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
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

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className="mt-5 font-mono text-[10px] uppercase tracking-[0.42em] text-white/25"
              >
                Initialising
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.1,
              }}
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </motion.div>

          {/* Bottom Curtain */}
          <motion.div
            className="absolute bottom-0 left-0 flex h-1/2 w-full items-start justify-center overflow-hidden border-t border-white/5 bg-[#040404] pt-14"
            animate={phase === "reveal" ? { y: "100%" } : { y: 0 }}
            transition={curtainTransition}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={grainStyle} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-7 left-8 flex items-center gap-2"
            >
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-2 rounded-sm border border-white/8"
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Welcome Card */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10 w-[min(92vw,56rem)] -translate-x-1/2 -translate-y-1/2 px-5"
            initial={false}
            animate={
              phase === "reveal"
                ? {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }
                : {
                  opacity: 0.96,
                  scale: 0.985,
                  y: 6,
                }
            }
            transition={cardTransition}
          >
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/[0.045] px-6 py-10 text-center shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-3xl md:px-12 md:py-12">
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1)_0%,transparent_42%),linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]"
                animate={
                  reduceMotion
                    ? { opacity: 0.3 }
                    : { x: ["-20%", "20%", "-20%"] }
                }
                transition={
                  reduceMotion
                    ? { duration: 0.5 }
                    : {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                }
              />

              <motion.div
                className="relative mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
              >
                <Sparkles className="h-4 w-4 text-blue-400" />

                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
                  Premium Introduction
                </span>
              </motion.div>

              <motion.h1
                className="relative text-balance text-4xl font-semibold tracking-[-0.06em] text-white md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.85,
                  delay: 0.28,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="block bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-transparent">
                  Welcome
                </span>

                <span className="mt-2 block text-[0.68em] text-white/78 md:text-[0.66em] lg:text-[0.64em]">
                  to my portfolio
                </span>
              </motion.h1>

              <motion.div
                className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.42 }}
              />

              <motion.p
                className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-7 text-white/58 md:text-base"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Crafted to feel calm, premium, and memorable — a first impression built with clarity,
                elegance, and thoughtful engineering.
              </motion.p>

              <motion.div
                className="mt-5 flex flex-wrap items-center justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.6 }}
              >
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/40">
                  Clean
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/40">
                  Elegant
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/40">
                  High-end
                </span>
              </motion.div>

              <motion.p
                className="mt-5 text-[11px] uppercase tracking-[0.35em] text-white/28"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.72 }}
              >
                Entering the experience
              </motion.p>
            </div>
          </motion.div>

          {/* Flash */}
          <AnimatePresence>
            {shutterOpen && !reduceMotion && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0.42 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

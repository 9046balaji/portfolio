"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

let hasShownWelcome = false;

export default function PremiumWelcome() {
  const [mounted, setMounted] = useState(false);
  const [isReturn, setIsReturn] = useState(() => hasShownWelcome);

  // 3D Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    
    // Check if user already saw the welcome animation this session or navigation
    if (hasShownWelcome || sessionStorage.getItem("welcome-shown")) {
      setIsReturn(true);
      hasShownWelcome = true;
    } else {
      sessionStorage.setItem("welcome-shown", "true");
      hasShownWelcome = true;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -0.5 to 0.5
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth springs for 3D rotation of the main content
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 40, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 40, stiffness: 150 });

  // Parallax offsets for background elements to create depth
  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), { damping: 40, stiffness: 100 });
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), { damping: 40, stiffness: 100 });

  // Parallax offsets for floating cubes
  const cube1X = useTransform(bgX, v => v * 1.5);
  const cube1Y = useTransform(bgY, v => v * 1.5);
  
  const cube2X = useTransform(bgX, v => v * 2);
  const cube2Y = useTransform(bgY, v => v * 2);

  if (!mounted) {
    return null; // Return null so we don't have a flash of a blank screen taking up space
  }

  if (isReturn) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden selection:bg-primary/10 font-sans perspective-[1200px]">
      
      {/* ─── Layer 1: Deep Ambient Background ─── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ x: bgX, y: bgY }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isReturn ? 0 : 3 }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(60,100,255,0.04)_0%,transparent_60%)] blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isReturn ? 0 : 3, delay: isReturn ? 0 : 0.5 }}
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(255,80,150,0.03)_0%,transparent_60%)] blur-[120px]"
        />
      </motion.div>

      {/* ─── Layer 2: Floating 3D Geometry ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        {/* Large slow rotating 3D Ring */}
        <motion.div
          className="absolute rounded-full border border-glass-border/50"
          style={{ width: "70vw", height: "70vw", x: bgX, y: bgY }}
          animate={{ rotateX: [70, 70], rotateZ: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute rounded-full border border-glass-border border-dashed"
          style={{ width: "45vw", height: "45vw", x: bgX, y: bgY }}
          animate={{ rotateX: [60, 60], rotateY: [20, 20], rotateZ: [360, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Glass Cube 1 */}
        <motion.div
          className="absolute top-[20%] left-[15%] w-24 h-24 rounded-2xl backdrop-blur-xl border border-glass-border bg-gradient-to-br from-glass-highlight to-transparent shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          style={{ x: cube1X, y: cube1Y }}
          animate={{ rotateX: [0, 180, 360], rotateY: [0, 180, 360], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Glass Cube 2 */}
        <motion.div
          className="absolute bottom-[25%] right-[15%] w-32 h-32 rounded-3xl backdrop-blur-xl border border-glass-border bg-gradient-to-tr from-glass-highlight to-transparent shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          style={{ x: cube2X, y: cube2Y }}
          animate={{ rotateX: [360, 180, 0], rotateY: [0, 180, 360], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ─── Layer 3: Interactive 3D Content Container ─── */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto w-full"
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
      >
        
        {/* 1. Welcome Tag popping out in 3D */}
        <motion.div
          initial={{ opacity: 0, y: isReturn ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isReturn ? 0 : 1, delay: isReturn ? 0 : 1 }}
          className="mb-8"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-glass-border bg-glass-bg backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-text-secondary text-xs md:text-sm font-mono uppercase tracking-[0.3em] pt-0.5">
              Portfolio
            </span>
          </div>
        </motion.div>

        {/* 2. Developer Name & Role */}
        <div className="flex flex-col items-center text-center w-full" style={{ transformStyle: "preserve-3d" }}>
          <motion.div style={{ transform: "translateZ(120px)" }}>
            <motion.h1
              initial={{ scale: isReturn ? 1 : 0.9, opacity: 0, filter: isReturn ? "blur(0px)" : "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: isReturn ? 0 : 1.2, delay: isReturn ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 drop-shadow-xl dark:drop-shadow-2xl pb-2"
            >
              Konda Balaji
            </motion.h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: isReturn ? 0 : 1.2, delay: isReturn ? 0 : 1.8 }}
            className="mt-4"
            style={{ transform: "translateZ(60px)" }}
          >
            <h2 className="text-2xl md:text-4xl text-primary/90 font-light tracking-[0.2em] uppercase">
              AI/ML & Cloud Engineer
            </h2>
          </motion.div>
        </div>

        {/* 3. Professional Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isReturn ? 0 : 1, delay: isReturn ? 0 : 2.2 }}
          className="mt-12 text-center max-w-2xl"
          style={{ transform: "translateZ(40px)" }}
        >
          <p className="text-base md:text-xl text-text-tertiary leading-relaxed font-light tracking-wide">
            Building scalable, elegant, and high-performance digital experiences.
            Specializing in intelligent architectures and seamless user interfaces.
          </p>
        </motion.div>

        {/* 4. 3D Glassmorphism CTA */}
        <motion.div
          initial={{ opacity: 0, scale: isReturn ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: isReturn ? 0 : 1, delay: isReturn ? 0 : 2.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
          style={{ transform: "translateZ(90px)" }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            {/* Background & Border */}
            <div className="absolute inset-0 bg-glass-highlight backdrop-blur-xl rounded-full border border-glass-border group-hover:border-foreground/40 transition-colors duration-500" />
            
            {/* 3D Inner Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 transition-opacity duration-500" />

            <span className="relative z-10 text-sm md:text-base font-semibold tracking-[0.15em] text-foreground uppercase mt-0.5 drop-shadow-md">
              Explore My Work
            </span>
            <div className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-glass-border group-hover:bg-foreground/20 dark:group-hover:bg-foreground/30 transition-colors duration-300">
              <ArrowRight className="w-4 h-4 text-foreground group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ─── Layer 4: Deep Foreground Particles (Popping out) ─── */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" style={{ perspective: "800px" }}>
        {[...Array(25)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-foreground/40 shadow-[0_0_10px_rgba(255,255,255,0.8)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: "100%",
              }}
              animate={{
                y: ["0vh", "-120vh"],
                x: [0, (Math.random() - 0.5) * 100],
                rotateZ: [0, Math.random() * 360],
                scale: [0, Math.random() * 1.5 + 0.5, 0],
                opacity: [0, Math.random() * 0.5 + 0.2, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            />
          );
        })}
      </div>
      
      {/* Bottom gradient mask */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />
    </div>
  );
}

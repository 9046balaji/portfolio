"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Award, Calendar, X, Trophy, ZoomIn, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "all" | "cloud" | "hackathon" | "competitive" | "academic" | "other";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  icon: string;
  certificateImage: string;
  category: Category;
  description?: string;
  grade?: string;
  score?: string;
  details?: string[];
  featured?: boolean;
  tilt?: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const certifications: Certificate[] = [
  // ─── TOP 6 PREMIER HIGHLIGHTS (DISPLAYED INITIALLY) ───────────────
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "June 2026",
    icon: "☁️",
    certificateImage: "/certificates/AWS Certified Cloud Practitioner certificate_page-0001.jpg",
    category: "cloud",
    featured: true,
    tilt: -1.2,
    description: "Industry-recognized credential validating overall understanding of the AWS Cloud platform, architecture, security, and global infrastructure",
    score: "Active Credential",
    grade: "ID: 4c6743076c134cbabbe0ec9c90b7e628",
    details: ["Cloud Concepts & Architecture", "AWS Security & Compliance", "Cloud Billing & Economics", "Core AWS Cloud Services"],
  },
  {
    title: "Cloud Computing — NPTEL Elite",
    issuer: "IIT Kharagpur / NPTEL (SWAYAM)",
    date: "Jan–Apr 2026",
    icon: "☁️",
    certificateImage: "/certificates/Cloud_page-0001.jpg",
    category: "cloud",
    featured: true,
    tilt: 1.1,
    description: "Elite certification awarded by IIT Kharagpur with a consolidated score of 79% (Assignments: 25/25, Exam: 54.26/75)",
    score: "Elite Tag (Score: 79%)",
    grade: "Roll No: NPTEL26CS55S1350802130",
    details: ["Distributed Cloud Architecture", "Virtualization & Security", "Cloud Storage & Elasticity", "IIT Kharagpur 12-Week Rigorous Course"],
  },
  {
    title: "PwC Advisory Launchpad",
    issuer: "PwC AC India",
    date: "August 2026",
    icon: "🏢",
    certificateImage: "/certificates/PWC_Lanchpad_page-0001.jpg",
    category: "cloud",
    featured: true,
    tilt: -1.5,
    description: "Certificate of Participation for completing the prestigious Advisory Launchpad Program by PwC AC India",
    score: "Launchpad Graduate",
    details: ["Enterprise Advisory Strategy", "Consulting Problem Solving", "Industry Readiness"],
  },
  {
    title: "Cambridge English PET",
    issuer: "Cambridge University",
    date: "May 2024",
    icon: "🇬🇧",
    certificateImage: "/certificates/pet_exam.webp",
    category: "academic",
    featured: true,
    tilt: 2.1,
    description: "International B1 Vantage qualification validating professional English reading, writing, listening, and speaking proficiency",
    grade: "Grade C — B1 Level",
    score: "Score: 141 (CEFR B1)",
    details: ["Reading: 137", "Writing: 148", "Listening: 132", "Speaking: 147"],
  },
  {
    title: "Generative AI",
    issuer: "Professional Certification",
    date: "2024",
    icon: "✨",
    certificateImage: "/certificates/generative_ai_certificate.webp",
    category: "academic",
    featured: true,
    tilt: -1.7,
    description: "Comprehensive certification covering LLM architectures, prompt engineering, diffusion models, and generative AI pipelines",
    score: "Certified Practitioner",
    details: ["LLM Fundamentals & Attention Mechanisms", "Prompt Engineering & Few-Shot Learning", "Generative Image & Multimodal Models"],
  },
  {
    title: "Agentic AI Hackathon",
    issuer: "Hackathon Competition",
    date: "April 2026",
    icon: "🤖",
    certificateImage: "/certificates/agentic ai hackthon.webp",
    category: "hackathon",
    featured: true,
    tilt: -1.5,
    description: "Individual recognition for building autonomous AI systems in a competitive Agentic AI hackathon",
  },

  // ─── ADDITIONAL CREDENTIALS (SHOWN IN VIEW ALL & TABS) ─────────────
  {
    title: "Agentic AI Hackathon — Team",
    issuer: "Hackathon Competition",
    date: "April 2026",
    icon: "🏆",
    certificateImage: "/certificates/agentic ai hackthon team.webp",
    category: "hackathon",
    tilt: 1.2,
    description: "Team award for collaborative design and deployment of an Agentic AI solution",
  },
  {
    title: "Full Stack Hackathon",
    issuer: "Dept. of ACSE, Vignan's Foundation",
    date: "2024",
    icon: "🚀",
    tilt: -0.8,
    certificateImage: "/certificates/hackton.webp",
    category: "hackathon",
    description: "Consolation position — Full Stack Development hackathon showcasing creativity and teamwork",
  },
  {
    title: "Full Stack Hackathon — Team",
    issuer: "Dept. of ACSE, Vignan's Foundation",
    date: "2024",
    icon: "🤝",
    tilt: 2.0,
    certificateImage: "/certificates/hackton_team.webp",
    category: "hackathon",
    description: "Team certificate for collaborative Full Stack Development hackathon delivery",
  },
  {
    title: "E-Business",
    issuer: "NPTEL / SWAYAM",
    date: "2024",
    icon: "💼",
    tilt: 1.1,
    certificateImage: "/certificates/E-Business.webp",
    category: "academic",
    description: "Electronic business strategies, digital commerce & enterprise frameworks",
  },
  {
    title: "Principles of Management",
    issuer: "NPTEL / SWAYAM",
    date: "2025",
    icon: "📋",
    tilt: -2.5,
    certificateImage: "/certificates/Principles of Management_page-0001.webp",
    category: "other",
    description: "Certified in core management principles — planning, organizing, leading, and controlling",
  },
  {
    title: "Organisational Behaviour",
    issuer: "NPTEL / SWAYAM",
    date: "2024",
    icon: "🏛️",
    tilt: 1.6,
    certificateImage: "/certificates/Organizational Behaviour.webp",
    category: "other",
    description: "Organizational dynamics, leadership, and management behaviour",
  },
  {
    title: "ML Neurothon",
    issuer: "Neurothon ML Competition",
    date: "May 2026",
    icon: "🧠",
    tilt: -2.1,
    certificateImage: "/certificates/Ml-neurothon.webp",
    category: "competitive",
    description: "Machine learning competition focused on neural network design and real-world problem-solving",
  },
  {
    title: "HackerRank Hackathon",
    issuer: "HackerRank",
    date: "May 2026",
    icon: "💻",
    tilt: 1.8,
    certificateImage: "/certificates/Hackerrank-Hackthon.webp",
    category: "competitive",
    description: "Competitive programming hackathon recognition for algorithmic problem-solving performance",
  },
  {
    title: "HackerRank Leaderboard",
    issuer: "HackerRank",
    date: "May 2026",
    icon: "📊",
    tilt: -1.0,
    certificateImage: "/certificates/hacker rank leaderboard.webp",
    category: "competitive",
    description: "Top leaderboard ranking recognition for consistent competitive coding performance",
  },
  {
    title: "UEAC Volunteering",
    issuer: "Vignan's Foundation",
    date: "2024–2025",
    icon: "💛",
    tilt: -1.3,
    certificateImage: "/certificates/ueac.webp",
    category: "other",
    description: "30 hours of active volunteering — teamwork, leadership & community engagement",
  },
];

const CATEGORIES: { id: Category; label: string; icon: string; aperture: string }[] = [
  { id: "all",         label: "All",         icon: "⬤", aperture: "f/∞" },
  { id: "cloud",       label: "Cloud & Industry", icon: "☁️", aperture: "f/1.4" },
  { id: "hackathon",   label: "Hackathons",  icon: "⚡", aperture: "f/1.2" },
  { id: "competitive", label: "Competitive", icon: "🏅", aperture: "f/1.8" },
  { id: "academic",    label: "Academic",    icon: "🎓", aperture: "f/2.8" },
  { id: "other",       label: "Other",       icon: "📌", aperture: "f/4.0" },
];

const CAT_COLOR: Record<Category, string> = {
  all:         "#2563eb",
  cloud:       "#f97316",
  hackathon:   "#f59e0b",
  competitive: "#06b6d4",
  academic:    "#8b5cf6",
  other:       "#10b981",
};

// ─── Developing shimmer — photo darkroom effect ──────────────────────────────

function DevelopingSkeleton() {
  return (
    <motion.div
      className="absolute inset-0 rounded-t-sm overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="w-full h-full bg-[#1a0a00]" />
      <motion.div
        className="absolute inset-0"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,150,50,0.15), transparent)",
        }}
      />
    </motion.div>
  );
}

// ─── Lightbox / Darkroom Modal ────────────────────────────────────────────────

function DarkroomModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      {/* Darkroom backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Red darkroom safelight glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 100%, rgba(180,20,20,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Panel */}
      <motion.div
        layoutId={`cert-${cert.title}`}
        className="relative w-full max-w-3xl rounded-none overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        {/* Polaroid-style white frame */}
        <div className="bg-[#f5f0e8] p-2.5 sm:p-3 pb-8 sm:pb-12 shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[90vh]">
          {/* Image container */}
          <div className="relative bg-[#1a0a00] overflow-hidden min-h-[220px] sm:min-h-[300px] flex items-center justify-center">
            {!imgLoaded && <DevelopingSkeleton />}

            <motion.div
              animate={{
                filter: imgLoaded ? "saturate(1) brightness(1)" : "saturate(0) brightness(0.3)",
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full flex items-center justify-center"
            >
              <Image
                src={cert.certificateImage}
                alt={`${cert.title} certificate`}
                width={1200}
                height={900}
                className="w-full h-auto max-h-[58vh] sm:max-h-[65vh] object-contain"
                quality={95}
                priority
                onLoad={() => setImgLoaded(true)}
              />
            </motion.div>

            {/* Developing overlay text */}
            <AnimatePresence>
              {!imgLoaded && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.p
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-[10px] sm:text-[11px] tracking-[0.4em] text-orange-400/60 uppercase font-mono"
                  >
                    Developing…
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Polaroid caption */}
          <div className="flex items-end justify-between pt-2.5 sm:pt-3 px-1">
            <div className="min-w-0 pr-2">
              <p className="font-bold text-[#1a1a1a] text-xs sm:text-sm truncate" style={{ fontFamily: "'Georgia', serif" }}>
                {cert.title}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#374151] font-medium mt-0.5 truncate">{cert.issuer} · {cert.date}</p>
              {cert.score && (
                <p className="text-[10px] sm:text-[11px] font-bold text-[#1d4ed8] mt-0.5 truncate">{cert.score}</p>
              )}
            </div>
            <span className="text-xl sm:text-2xl shrink-0">{cert.icon}</span>
          </div>
        </div>

        {/* Close button with 44px tap target */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white/90 hover:text-white hover:bg-black transition-colors border border-glass-border shadow-md active:scale-95"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Polaroid Certificate Card ────────────────────────────────────────────────

function PolaroidCard({
  cert,
  onClick,
  reducedMotion,
  index,
}: {
  cert: Certificate;
  onClick: () => void;
  reducedMotion: boolean;
  index: number;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const tiltDeg = cert.tilt ?? 0;

  return (
    <motion.div
      layoutId={`cert-${cert.title}`}
      layout
      initial={{ opacity: 0, scale: 0.85, rotate: tiltDeg - 5 }}
      animate={{ opacity: 1, scale: 1, rotate: isHover ? 0 : tiltDeg }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        opacity: { duration: 0.4, delay: index * 0.06 },
        scale: { type: "spring", stiffness: 280, damping: 22, delay: index * 0.06 },
        rotate: isHover
          ? { type: "spring", stiffness: 400, damping: 20 }
          : { duration: 0.5, delay: index * 0.06 },
      }}
      className="cursor-pointer origin-bottom"
      onClick={onClick}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      style={{ willChange: "transform" }}
    >
      <motion.div
        animate={{
          y: isHover ? -10 : 0,
          boxShadow: isHover
            ? "0 30px 70px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)"
            : "0 8px 24px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        className="bg-[#f5f0e8] p-3 pb-12 rounded-sm"
      >
        {/* Photo area */}
        <div
          className="relative overflow-hidden bg-[#1a0a00] h-44 sm:h-48"
        >
          {/* Skeleton developing effect */}
          {!imgLoaded && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="w-full h-full bg-[#1a0a00]" />
              <motion.div
                className="absolute inset-0"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,150,50,0.18), transparent)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.p
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="text-[9px] tracking-[0.5em] text-orange-400/50 uppercase font-mono"
                >
                  Developing
                </motion.p>
              </div>
            </div>
          )}

          <motion.div
            animate={{
              filter: imgLoaded ? "saturate(1) brightness(1)" : "saturate(0) brightness(0)",
            }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={cert.certificateImage}
              alt={cert.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              quality={80}
              onLoad={() => setImgLoaded(true)}
            />
          </motion.div>

          {/* Photo overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Featured badge */}
          {cert.featured && (
            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest bg-amber-500/90 text-white shadow-lg">
              <Trophy className="w-2.5 h-2.5" />
              Featured
            </div>
          )}

          {/* View hint */}
          <motion.div
            animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/90 text-[#1a1a1a] text-[10px] font-semibold shadow-lg"
          >
            <ZoomIn className="w-3 h-3" />
            View
          </motion.div>
        </div>

        {/* Polaroid caption area */}
        <div className="pt-3 px-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p
                className="font-bold text-[#1a1a1a] text-[12px] leading-tight truncate"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {cert.title}
              </p>
              <p className="text-[10px] text-[#374151] font-medium mt-0.5 truncate">{cert.issuer}</p>
            </div>
            <span className="text-lg shrink-0">{cert.icon}</span>
          </div>

          {cert.score && (
            <p className="text-[10px] font-bold text-[#1d4ed8] mt-1.5">{cert.score}</p>
          )}

          <div className="flex items-center gap-1 mt-2">
            <Calendar className="w-2.5 h-2.5 text-[#4b5563]" />
            <span className="text-[9px] text-[#4b5563] font-mono font-medium">{cert.date}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const reducedMotion = useReducedMotion() ?? false;

  const counts = CATEGORIES.reduce<Record<Category, number>>(
    (acc, cat) => {
      acc[cat.id] =
        cat.id === "all"
          ? certifications.length
          : certifications.filter((c) => c.category === cat.id).length;
      return acc;
    },
    {} as Record<Category, number>
  );

  const allFiltered = certifications
    .filter((c) => activeCategory === "all" || c.category === activeCategory)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const INITIAL_CERT_COUNT = 6;
  const shouldLimit = activeCategory === "all" && !isExpanded && allFiltered.length > INITIAL_CERT_COUNT;
  const visible = shouldLimit ? allFiltered.slice(0, INITIAL_CERT_COUNT) : allFiltered;
  const remainingCount = allFiltered.length - INITIAL_CERT_COUNT;

  const accentColor = CAT_COLOR[activeCategory];

  return (
    <section
      id="certifications"
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: "var(--section-alt)" }}
    >
      {/* Dark room ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[130px] opacity-30"
          style={{ background: accentColor, transition: "background 0.6s ease" }} />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full blur-[110px] opacity-20"
          style={{ background: accentColor, transition: "background 0.6s ease" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-5 backdrop-blur-md"
            style={{
              background: `${accentColor}14`,
              borderColor: `${accentColor}30`,
              transition: "background 0.5s, border-color 0.5s",
            }}
          >
            <Award className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-sm font-semibold tracking-wide" style={{ color: accentColor }}>
              Achievements
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-text-primary">
            Certifications{" "}
            <span className="text-text-tertiary font-normal text-3xl">&amp; Awards</span>
          </h2>
          <p className="text-text-tertiary text-sm max-w-md mx-auto">
            {certifications.length} credentials — click any photo to develop it in full
          </p>
        </motion.div>

        {/* ── Camera aperture filter tabs ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-10 md:mb-14 px-1"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const color = CAT_COLOR[cat.id];
            return (
              <motion.button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setIsExpanded(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-sm text-xs sm:text-sm font-medium transition-all duration-300 border overflow-hidden font-mono active:scale-95"
                style={{
                  background: isActive ? color : "var(--glass-bg)",
                  borderColor: isActive ? color : "var(--glass-border)",
                  color: isActive ? (cat.id === "hackathon" ? "#0f172a" : "#ffffff") : "var(--text-secondary)",
                }}
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[9px] sm:text-[10px] opacity-75">{cat.aperture}</span>
                  <span>{cat.label}</span>
                  <span
                    className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-sm font-bold"
                    style={{
                      background: isActive ? (cat.id === "hackathon" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)") : "var(--glass-bg)",
                    }}
                  >
                    {counts[cat.id]}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Photography album grid ─────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((cert, i) => (
              <PolaroidCard
                key={cert.title}
                cert={cert}
                index={i}
                onClick={() => setSelectedCert(cert)}
                reducedMotion={reducedMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Show More / Show Less Button ─────────────────────── */}
        {allFiltered.length > INITIAL_CERT_COUNT && activeCategory === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 bg-card-bg border border-border hover:border-primary text-text-primary hover:text-primary shadow-lg hover:shadow-primary/15 cursor-pointer backdrop-blur-md group font-mono"
            >
              <span>
                {isExpanded
                  ? "Show Less Certifications"
                  : `View All ${allFiltered.length} Certifications (+${remainingCount} more)`}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </motion.div>
        )}

        {/* Empty state */}
        <AnimatePresence>
          {visible.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-text-tertiary text-sm py-20"
            >
              No certificates in this category yet.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Darkroom Lightbox Modal ─────────────────────────────── */}
      <AnimatePresence>
        {selectedCert && (
          <DarkroomModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

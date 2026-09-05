"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  X,
  Trophy,
  ZoomIn,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Cloud,
  Cpu,
  Terminal,
  GraduationCap
} from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "all" | "cloud" | "ai" | "hackathons" | "academic";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: Category;
  credentialId?: string;
  badgeText: string;
  score?: string;
  grade?: string;
  featured?: boolean;
  image: string;
  description: string;
  skills: string[];
  verificationUrl?: string;
}

// ─── Verified Credentials & Honors Dataset ────────────────────────────────────

const certifications: Certificate[] = [
  // ─── PREMIER CLOUD & DEVOPS CREDENTIALS ───────────────────────────
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "June 2024",
    category: "cloud",
    credentialId: "4c6743076c134cbabbe0ec9c90b7e628",
    badgeText: "Verified AWS Credential",
    score: "Active Professional Credential",
    featured: true,
    image: "/certificates/AWS Certified Cloud Practitioner certificate_page-0001.webp",
    description:
      "Industry-standard cloud certification validating foundational expertise in AWS global architecture, IAM identity security, VPC networking, high-availability multi-AZ services, CloudWatch observability, and cloud economics.",
    skills: [
      "AWS Cloud Architecture",
      "IAM & Security Best Practices",
      "VPC & Hybrid Networking",
      "S3 & Block Storage",
      "EC2 & Elastic Compute",
      "CloudWatch Telemetry"
    ],
    verificationUrl: "https://aws.amazon.com/verification"
  },
  {
    id: "iit-cloud-computing",
    title: "Cloud Computing — NPTEL Elite",
    issuer: "IIT Kharagpur / NPTEL (SWAYAM)",
    date: "Jan–Apr 2024",
    category: "cloud",
    credentialId: "NPTEL26CS55S1350802130",
    badgeText: "IIT Kharagpur Elite (79%)",
    score: "Consolidated Score: 79% (Assignments: 25/25, Proctored Exam: 54.26/75)",
    featured: true,
    image: "/certificates/Cloud_page-0001.webp",
    description:
      "Elite academic distinction awarded by IIT Kharagpur for an intensive 12-week advanced cloud engineering curriculum covering virtualization layers, distributed storage, multi-tenant cloud architectures, and cloud security SLAs.",
    skills: [
      "Distributed Systems",
      "Virtualization Architectures",
      "Cloud Storage & Elasticity",
      "Multi-Tenant Infrastructure",
      "Cloud Security & SLAs"
    ]
  },
  {
    id: "pwc-advisory-launchpad",
    title: "PwC Advisory Launchpad",
    issuer: "PwC AC India",
    date: "August 2024",
    category: "cloud",
    badgeText: "PwC Executive Mentorship",
    score: "Advisory Launchpad Graduate",
    featured: true,
    image: "/certificates/PWC_Lanchpad_page-0001.webp",
    description:
      "Selective executive mentorship program by PwC AC India focused on enterprise business transformation, modern tech delivery models, cloud governance, and large-scale technical advisory problem-solving.",
    skills: [
      "Enterprise Architecture",
      "Technology Consulting",
      "Cloud Governance",
      "System Problem Solving",
      "Delivery Operations"
    ]
  },

  // ─── AI & MACHINE LEARNING CREDENTIALS ────────────────────────────
  {
    id: "generative-ai",
    title: "Generative AI & LLM Engineering",
    issuer: "Professional Specialization",
    date: "2024",
    category: "ai",
    badgeText: "Applied AI / LLMs",
    score: "Certified Practitioner",
    featured: true,
    image: "/certificates/generative_ai_certificate.webp",
    description:
      "Rigorous technical specialization covering deep learning Transformer architectures, self-attention mechanisms, retrieval-augmented generation (RAG) pipelines, parameter-efficient fine-tuning (PEFT), and prompt engineering.",
    skills: [
      "Transformer Architectures",
      "RAG Pipelines",
      "Prompt Engineering",
      "Attention Mechanisms",
      "Vector Search & Embeddings"
    ]
  },
  {
    id: "agentic-ai-hackathon-individual",
    title: "Agentic AI Hackathon — Winner",
    issuer: "ACSE · Vignan's Foundation",
    date: "April 2024",
    category: "hackathons",
    badgeText: "Autonomous AI Systems",
    score: "Individual Innovation Award",
    featured: true,
    image: "/certificates/agentic ai hackthon.webp",
    description:
      "Engineered and deployed an autonomous multi-agent system with real-time decision loops, automated tool execution, and self-evaluating workflows under competitive timed hackathon conditions.",
    skills: [
      "Agentic Workflows",
      "LangGraph / LangChain",
      "Autonomous Decision Loops",
      "Tool Calling & API Actions",
      "FastAPI Microservices"
    ]
  },
  {
    id: "cambridge-english-pet",
    title: "Cambridge English (PET) — CEFR B1",
    issuer: "Cambridge Assessment English",
    date: "May 2024",
    category: "academic",
    badgeText: "International Standard",
    score: "Overall Score: 141 (Grade C — CEFR B1)",
    grade: "Writing: 148 · Speaking: 147 · Reading: 137 · Listening: 132",
    featured: true,
    image: "/certificates/pet_exam.webp",
    description:
      "International language qualification validating professional verbal and written English communication across global corporate engineering environments with high-bracket scores in technical writing and speaking.",
    skills: [
      "Professional Communication",
      "Technical Documentation",
      "Cross-Functional Dialogue",
      "Spoken Delivery"
    ]
  },

  // ─── ADDITIONAL CREDENTIALS & HACKATHON AWARDS ─────────────────────
  {
    id: "agentic-ai-hackathon-team",
    title: "Agentic AI Hackathon — Team Award",
    issuer: "ACSE · Vignan's Foundation",
    date: "April 2024",
    category: "hackathons",
    badgeText: "Collaborative AI",
    score: "Team Finalist Recognition",
    image: "/certificates/agentic ai hackthon team.webp",
    description:
      "Led the backend architecture and agent routing logic for a collaborative team entry, integrating asynchronous Redis message queues and vector storage for real-time agent multi-turn responses.",
    skills: [
      "Multi-Agent Orchestration",
      "System Integration",
      "Asynchronous Queues",
      "Team Leadership"
    ]
  },
  {
    id: "ml-neurothon",
    title: "ML Neurothon Challenge",
    issuer: "Neurothon Machine Learning Challenge",
    date: "May 2024",
    category: "hackathons",
    badgeText: "Deep Learning Sprint",
    score: "Competition Finalist",
    image: "/certificates/Ml-neurothon.webp",
    description:
      "Competitive machine learning hackathon benchmarking neural network architectures on complex clinical datasets with custom loss functions, Optuna hyperparameter optimization, and SHAP explainability.",
    skills: [
      "Neural Network Design",
      "Predictive Modeling",
      "Optuna Optimization",
      "SHAP Explainability"
    ]
  },
  {
    id: "hackerrank-hackathon",
    title: "HackerRank Algorithmic Hackathon",
    issuer: "HackerRank Coding Challenge",
    date: "May 2024",
    category: "hackathons",
    badgeText: "Algorithmic Sprint",
    score: "Top Performer Award",
    image: "/certificates/Hackerrank-Hackthon.webp",
    description:
      "Competitive programming sprint validating structured data structures, graph traversals, and algorithmic problem-solving under strict execution time limits and memory bounds.",
    skills: [
      "Competitive Algorithms",
      "Data Structures",
      "Graph Theory",
      "Time Complexity Profiling"
    ]
  },
  {
    id: "hackerrank-leaderboard",
    title: "HackerRank Global Leaderboard",
    issuer: "HackerRank",
    date: "May 2024",
    category: "hackathons",
    badgeText: "Verified Leaderboard",
    score: "Top Ranked Problem Solver",
    image: "/certificates/hacker rank leaderboard.webp",
    description:
      "Verified ranking achievement on HackerRank competitive coding leaderboard reflecting consistent speed and accuracy in solving dynamic programming and algorithmic challenges.",
    skills: [
      "Dynamic Programming",
      "Algorithmic Problem Solving",
      "Memory Efficiency",
      "Systematic Debugging"
    ]
  },
  {
    id: "full-stack-hackathon-individual",
    title: "Full Stack Hackathon — Prototype",
    issuer: "Dept. of ACSE · VFSTR",
    date: "2024",
    category: "hackathons",
    badgeText: "Rapid Prototyping",
    score: "Consolation Position",
    image: "/certificates/hackton.webp",
    description:
      "Architected and shipped an end-to-end full-stack web platform within 24 hours, featuring relational database constraints, RESTful APIs, and automated containerization.",
    skills: [
      "Full Stack Development",
      "RESTful API Architecture",
      "PostgreSQL Constraints",
      "Dockerized Deployment"
    ]
  },
  {
    id: "full-stack-hackathon-team",
    title: "Full Stack Hackathon — Team",
    issuer: "Dept. of ACSE · VFSTR",
    date: "2024",
    category: "hackathons",
    badgeText: "Team Delivery",
    score: "Collaborative Team Certificate",
    image: "/certificates/hackton_team.webp",
    description:
      "Collaborative team award for rapid development, sprint coordination, and seamless frontend-backend integration during the university annual hackathon.",
    skills: [
      "Agile Prototyping",
      "Version Control Workflows",
      "API Contract Design",
      "Cross-Stack Integration"
    ]
  },
  {
    id: "nptel-ebusiness",
    title: "E-Business Frameworks",
    issuer: "NPTEL / SWAYAM",
    date: "2024",
    category: "academic",
    badgeText: "Digital Commerce",
    score: "Certified Credential",
    image: "/certificates/E-Business.webp",
    description:
      "Comprehensive curriculum examining digital enterprise strategies, electronic payment gateways, supply chain automation, and high-volume e-commerce architectures.",
    skills: [
      "Digital Commerce Architecture",
      "Enterprise Systems",
      "Payment Workflows",
      "Supply Chain Operations"
    ]
  },
  {
    id: "nptel-principles-of-management",
    title: "Principles of Management",
    issuer: "NPTEL / SWAYAM",
    date: "2024",
    category: "academic",
    badgeText: "Management & Governance",
    score: "Certified Distinction",
    image: "/certificates/Principles of Management_page-0001.webp",
    description:
      "Accredited certification covering enterprise management fundamentals, organizational resource allocation, agile team dynamics, and structured decision analysis.",
    skills: [
      "Project Management",
      "Agile Methodologies",
      "Resource Allocation",
      "Engineering Leadership"
    ]
  },
  {
    id: "nptel-organisational-behaviour",
    title: "Organisational Behaviour",
    issuer: "NPTEL / SWAYAM",
    date: "2024",
    category: "academic",
    badgeText: "Team Leadership",
    score: "Certified Credential",
    image: "/certificates/Organizational Behaviour.webp",
    description:
      "Academic coursework analyzing team performance metrics, psychological safety in engineering teams, conflict resolution, and modern organizational culture.",
    skills: [
      "Team Dynamics",
      "Cross-Functional Leadership",
      "Conflict Resolution",
      "Workplace Psychology"
    ]
  },
  {
    id: "ueac-volunteering",
    title: "UEAC Community Leadership",
    issuer: "Vignan's Foundation (UEAC)",
    date: "2024–2025",
    category: "academic",
    badgeText: "Community Leadership",
    score: "30+ Service Hours Completed",
    image: "/certificates/ueac.webp",
    description:
      "Recognized for 30 hours of active leadership, coordinating university technical symposia, managing volunteer teams, and orchestrating student welfare initiatives.",
    skills: [
      "Institutional Leadership",
      "Event Coordination",
      "Team Mentorship",
      "Stakeholder Communication"
    ]
  }
];

const CATEGORIES: { id: Category; label: string; icon: typeof Award }[] = [
  { id: "all", label: "All Credentials", icon: Award },
  { id: "cloud", label: "Cloud & DevOps", icon: Cloud },
  { id: "ai", label: "AI & Machine Learning", icon: Cpu },
  { id: "hackathons", label: "Hackathons & Coding", icon: Trophy },
  { id: "academic", label: "Academic & Honors", icon: GraduationCap }
];

// ─── 3D Tilt Card Component ───────────────────────────────────────────────────

function CredentialCard({
  cert,
  onClick,
  index
}: {
  cert: Certificate;
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle 3D tilt (max 8 degrees)
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className="group cursor-pointer relative rounded-2xl transition-shadow duration-300"
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="relative flex flex-col justify-between h-full rounded-2xl border border-glass-border bg-card-bg/90 hover:border-primary/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 overflow-hidden backdrop-blur-md transition-colors"
      >
        {/* Dynamic Radial Mouse Spotlight Glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(59, 130, 246, 0.18), transparent 60%)`
          }}
        />

        {/* Certificate Image Frame */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40 border-b border-glass-border flex items-center justify-center">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-surface/80 flex items-center justify-center">
              <div className="flex items-center gap-2 text-xs font-mono text-primary animate-pulse">
                <ShieldCheck className="w-4 h-4" />
                <span>Verifying Asset...</span>
              </div>
            </div>
          )}

          <Image
            src={cert.image}
            alt={cert.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent pointer-events-none" />

          {/* Top Status Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold backdrop-blur-md bg-background/80 text-text-primary border border-glass-border shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {cert.badgeText}
            </span>

            {cert.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30 backdrop-blur-md">
                <Trophy className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>

          {/* Hover Inspect Hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-900 shadow-xl">
              <ZoomIn className="w-3.5 h-3.5" />
              Inspect Credential
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3.5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-xs text-text-tertiary font-mono">
              <span className="truncate">{cert.issuer}</span>
              <span className="shrink-0 flex items-center gap-1 text-[11px]">
                <Calendar className="w-3 h-3 text-text-muted" />
                {cert.date}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
              {cert.title}
            </h3>

            {cert.score && (
              <p className="text-[11px] font-mono font-semibold text-primary truncate">
                {cert.score}
              </p>
            )}

            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed pt-0.5">
              {cert.description}
            </p>
          </div>

          {/* Validated Skills Tags */}
          <div className="pt-2 border-t border-glass-border">
            <div className="flex flex-wrap gap-1">
              {cert.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
              {cert.skills.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-card-bg-hover text-text-muted border border-border">
                  +{cert.skills.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Verification Inspection Modal ────────────────────────────────────────────

function VerificationModal({
  cert,
  onClose,
  onPrev,
  onNext
}: {
  cert: Certificate;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [copied, setCopied] = useState(false);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  const handleCopyId = () => {
    if (!cert.credentialId) return;
    navigator.clipboard.writeText(cert.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-5xl rounded-3xl border border-glass-border bg-background shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-glass-border bg-card-bg/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
              Verified Credential Verification System
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Next/Prev on desktop header */}
            <div className="hidden sm:flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={onPrev}
                className="w-8 h-8 rounded-lg border border-border hover:border-primary/40 bg-card-bg hover:bg-card-bg-hover flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                title="Previous Credential (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="w-8 h-8 rounded-lg border border-border hover:border-primary/40 bg-card-bg hover:bg-card-bg-hover flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                title="Next Credential (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-border bg-card-bg hover:bg-card-bg-hover flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Split View (Image on Left, Technical Breakdown on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto max-h-[calc(92vh-58px)]">
          {/* Left Column: Certificate Preview (Col 7) */}
          <div className="lg:col-span-7 bg-black/60 p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[260px] sm:min-h-[400px]">
            <div className="relative w-full h-full max-h-[55vh] flex items-center justify-center rounded-xl overflow-hidden border border-glass-border bg-black/40 shadow-2xl">
              <Image
                src={cert.image}
                alt={cert.title}
                width={1600}
                height={1100}
                quality={95}
                priority
                className="w-auto h-auto max-h-[52vh] max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="mt-3 flex items-center gap-3 text-xs font-mono text-text-tertiary">
              <a
                href={cert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Full-Resolution Asset</span>
              </a>
            </div>
          </div>

          {/* Right Column: Metadata & Technical Verification (Col 5) */}
          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-5 bg-card-bg/80 border-t lg:border-t-0 lg:border-l border-glass-border">
            <div className="space-y-4">
              {/* Category & Verified Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {cert.badgeText}
                </span>
                <span className="text-xs font-mono text-text-muted">{cert.date}</span>
              </div>

              {/* Title & Issuer */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                  {cert.title}
                </h2>
                <p className="text-sm font-medium text-secondary mt-1">{cert.issuer}</p>
              </div>

              {/* Credential ID / Verification Chip */}
              {cert.credentialId && (
                <div className="rounded-xl border border-glass-border bg-card-bg p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted font-bold">
                      Credential ID
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-primary hover:underline cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-mono text-text-secondary font-semibold break-all">
                    {cert.credentialId}
                  </p>
                </div>
              )}

              {/* Score / Grade Breakdown */}
              {cert.score && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block">
                    Distinction &amp; Standing
                  </span>
                  <p className="text-xs font-semibold text-text-primary mt-0.5">{cert.score}</p>
                  {cert.grade && (
                    <p className="text-[11px] font-mono text-text-tertiary mt-1">{cert.grade}</p>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                {cert.description}
              </p>

              {/* Validated Skills */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary block">
                  Core Competencies Validated
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-card-bg border border-border text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Controls */}
            <div className="pt-4 border-t border-glass-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-3 py-2 rounded-xl border border-border hover:border-primary/40 bg-card-bg hover:bg-card-bg-hover text-xs font-medium text-text-primary transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="px-3 py-2 rounded-xl border border-border hover:border-primary/40 bg-card-bg hover:bg-card-bg-hover text-xs font-medium text-text-primary transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-md shadow-primary/20 transition-all flex items-center gap-1.5"
                >
                  <span>Verify Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Certifications Showcase Component ───────────────────────────────────

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Category counts
  const counts = CATEGORIES.reduce<Record<Category, number>>((acc, cat) => {
    acc[cat.id] =
      cat.id === "all"
        ? certifications.length
        : certifications.filter((c) => c.category === cat.id).length;
    return acc;
  }, {} as Record<Category, number>);

  // Filter and sort credentials
  const allFiltered = certifications
    .filter((c) => activeCategory === "all" || c.category === activeCategory)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const INITIAL_COUNT = 6;
  const shouldLimit = activeCategory === "all" && !isExpanded && allFiltered.length > INITIAL_COUNT;
  const visible = shouldLimit ? allFiltered.slice(0, INITIAL_COUNT) : allFiltered;
  const remainingCount = allFiltered.length - INITIAL_COUNT;

  // Next / Prev navigation within modal
  const handleNext = () => {
    if (!selectedCert) return;
    const currentIndex = allFiltered.findIndex((c) => c.id === selectedCert.id);
    const nextIndex = (currentIndex + 1) % allFiltered.length;
    setSelectedCert(allFiltered[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedCert) return;
    const currentIndex = allFiltered.findIndex((c) => c.id === selectedCert.id);
    const prevIndex = (currentIndex - 1 + allFiltered.length) % allFiltered.length;
    setSelectedCert(allFiltered[prevIndex]);
  };

  return (
    <section id="certifications" className="py-24 px-4 relative overflow-hidden bg-section-alt">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[26rem] h-[26rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.07)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-text-tertiary backdrop-blur-md mb-3">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Verified Credentials &amp; Honors
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-3 text-text-primary tracking-tight">
            Industry Certifications{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-secondary">
              &amp; Awards
            </span>
          </h2>

          <p className="text-text-tertiary text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {certifications.length} verified credentials, competitive hackathon awards, and industry distinctions validating cloud architecture, AI systems, and engineering excellence.
          </p>
        </motion.div>

        {/* ── Category Filter Tabs (Swipeable on Mobile) ─────── */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-10 overflow-x-auto no-scrollbar py-1 px-1 -mx-2 px-2 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setIsExpanded(false);
                }}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30 border border-primary"
                    : "text-text-secondary hover:text-text-primary bg-card-bg border border-border hover:border-primary/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-card-bg-hover text-text-muted"
                  }`}
                >
                  {counts[cat.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Credentials Grid ───────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((cert, index) => (
              <CredentialCard
                key={cert.id}
                cert={cert}
                index={index}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Show More / Show Less Button ─────────────────────── */}
        {allFiltered.length > INITIAL_COUNT && activeCategory === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 bg-card-bg border border-border hover:border-primary text-text-primary hover:text-primary shadow-lg hover:shadow-primary/15 cursor-pointer backdrop-blur-md group font-mono"
            >
              <span>
                {isExpanded
                  ? "Show Less Credentials"
                  : `Explore All ${allFiltered.length} Credentials (+${remainingCount} more)`}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Technical Verification Lightbox Modal ────────────── */}
      <AnimatePresence>
        {selectedCert && (
          <VerificationModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

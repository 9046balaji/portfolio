"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cloud,
    Cpu,
    Database,
    GitBranch,
    Server,
    Sparkles,
    Terminal,
    Layers,
    Boxes,
    Activity,
    Workflow,
    Gauge,
    HardDrive,
    Radio
} from "lucide-react";

type CategoryTab = "devops" | "aiml" | "backend";

interface ToolBadge {
    name: string;
    tag?: string;
    color: string;
}

interface DomainPillar {
    id: string;
    title: string;
    icon: typeof Cloud;
    accentColor: string;
    tools: ToolBadge[];
    architectureHighlight: string;
    stats: string;
}

// ── Stream 1: DevOps & Cloud Infrastructure (Flowing Left) — Matched 1:1 with Resume ──
const devopsStream = [
    { name: "Docker", tag: "Multi-Stage", color: "#0db7ed" },
    { name: "Docker Compose", tag: "Multi-Service", color: "#2496ed" },
    { name: "Kubernetes", tag: "Core Concepts", color: "#326ce5" },
    { name: "Helm", tag: "11 Charts", color: "#0f1689" },
    { name: "AWS VPC & EC2", tag: "Cloud Arch", color: "#ff9900" },
    { name: "AWS ECS & ECR", tag: "Containers", color: "#f59e0b" },
    { name: "Auto Scaling & ALB", tag: "Load Balancer", color: "#ec4899" },
    { name: "Terraform IaC", tag: "Modular HCL", color: "#844fba" },
    { name: "GitHub Actions", tag: "CI/CD Workflows", color: "#2088ff" },
    { name: "Jenkins", tag: "7-Stage Pipelines", color: "#d33833" },
    { name: "SSH Remoting Agents", tag: "Distributed", color: "#10b981" },
    { name: "Prometheus", tag: "Port 9090/9100", color: "#e6522c" },
    { name: "Grafana", tag: "SRE Dashboards", color: "#f46800" },
    { name: "AWS CloudWatch", tag: "Log Telemetry", color: "#ff4f00" },
    { name: "Node Exporter", tag: "Host Metrics", color: "#00d2ff" },
    { name: "Nginx", tag: "Reverse Proxy", color: "#009639" },
    { name: "Bash Scripting", tag: "Log Rotation", color: "#4eaa25" },
    { name: "Linux Admin", tag: "Kernel & Systemd", color: "#fcc624" },
    { name: "YAML Configs", tag: "Pipelines & K8s", color: "#cb171e" },
];

// ── Stream 2: AI / MLOps & Backends (Flowing Right) — TurboQuant completely removed ──
const aimlStream = [
    { name: "LangGraph", tag: "Agentic Graphs", color: "#6366f1" },
    { name: "FastAPI", tag: "Async APIs", color: "#009688" },
    { name: "ONNX Runtime", tag: "Edge AI Engine", color: "#0284c7" },
    { name: "FAISS", tag: "Vector Indexing", color: "#ec4899" },
    { name: "ChromaDB", tag: "Vector DB", color: "#d946ef" },
    { name: "Hugging Face", tag: "Transformers", color: "#eab308" },
    { name: "PyTorch", tag: "Deep Learning", color: "#ee4c2c" },
    { name: "MLflow", tag: "Experiment MLOps", color: "#0194e2" },
    { name: "Ollama", tag: "Local LLM Serving", color: "#a855f7" },
    { name: "Python 3.11", tag: "Asyncio Core", color: "#3776ab" },
    { name: "C Language", tag: "Systems Core", color: "#64748b" },
    { name: "PostgreSQL 16", tag: "ACID Ledgers", color: "#336791" },
    { name: "Redis", tag: "In-Memory Cache", color: "#dc382d" },
    { name: "Apache Kafka", tag: "Event Pub/Sub", color: "#231f20" },
    { name: "Celery", tag: "Async Workers", color: "#37814a" },
    { name: "Git & GitHub", tag: "Version Control", color: "#f05032" },
];

// ── Compact Domain Bento Matrix (One clean row on desktop, eliminates vertical scroll bloat) ──
const domainCategories: Record<
    CategoryTab,
    {
        label: string;
        icon: typeof Cloud;
        toolCount: number;
        pillars: DomainPillar[];
    }
> = {
    devops: {
        label: "DevOps & Cloud",
        icon: Cloud,
        toolCount: 18,
        pillars: [
            {
                id: "containers-orchestration",
                title: "Containers & Orchestration",
                icon: Boxes,
                accentColor: "#0db7ed",
                stats: "11 Charts · ECS · -68% Size",
                architectureHighlight:
                    "Alpine multi-stage builds across Go, Node, Python & Spring PetClinic with Docker Compose, AWS ECS & 11 Helm charts.",
                tools: [
                    { name: "Docker Multi-Stage", color: "#0db7ed" },
                    { name: "Docker Compose", color: "#2496ed" },
                    { name: "Kubernetes (K8s)", color: "#326ce5" },
                    { name: "Helm & AWS ECS", color: "#0f1689" },
                ],
            },
            {
                id: "cicd-delivery",
                title: "CI/CD & Pipeline Automation",
                icon: GitBranch,
                accentColor: "#d33833",
                stats: "7 Stages · GitHub Actions · Zero CVEs",
                architectureHighlight:
                    "Automated GitHub Actions CI/CD workflows, 7-stage Jenkins pipelines with distributed SSH agents & YAML configs.",
                tools: [
                    { name: "GitHub Actions", color: "#2088ff" },
                    { name: "Jenkins Declarative", color: "#d33833" },
                    { name: "SSH Remoting Agents", color: "#10b981" },
                    { name: "YAML Automation", color: "#cb171e" },
                ],
            },
            {
                id: "cloud-iac",
                title: "AWS Cloud & Infrastructure (IaC)",
                icon: Layers,
                accentColor: "#844fba",
                stats: "VPC · ALB · Auto Scaling · S3 Lock",
                architectureHighlight:
                    "AWS EC2, S3, VPC, ECR, Elastic Load Balancer (ALB), Auto Scaling groups, and Terraform modular HCL with state locking.",
                tools: [
                    { name: "AWS (VPC · EC2 · S3)", color: "#ff9900" },
                    { name: "ALB & Auto Scaling", color: "#ec4899" },
                    { name: "ECR & IAM Security", color: "#f59e0b" },
                    { name: "Terraform IaC", color: "#844fba" },
                ],
            },
            {
                id: "observability-systems",
                title: "Observability, SRE & Linux",
                icon: Activity,
                accentColor: "#f46800",
                stats: "99.9% SLA · CloudWatch · Node Exporter",
                architectureHighlight:
                    "Host & container telemetry with Node Exporter, CloudWatch, Prometheus, Grafana, Nginx proxy, and automated Bash log rotation.",
                tools: [
                    { name: "Prometheus & Grafana", color: "#f46800" },
                    { name: "AWS CloudWatch", color: "#ff4f00" },
                    { name: "Node Exporter & Nginx", color: "#00d2ff" },
                    { name: "Bash & Linux Admin", color: "#4eaa25" },
                ],
            },
        ],
    },
    aiml: {
        label: "AI & MLOps",
        icon: Cpu,
        toolCount: 14,
        pillars: [
            {
                id: "agentic-graphs",
                title: "Agentic Graphs & RAG",
                icon: Cpu,
                accentColor: "#6366f1",
                stats: "10 Agents · 125K+ Papers",
                architectureHighlight:
                    "Self-correcting verification graphs with LangGraph, dynamic clinical routing, and grounded retrieval over vector stores.",
                tools: [
                    { name: "LangGraph Multi-Agent", color: "#6366f1" },
                    { name: "LangChain Chains", color: "#818cf8" },
                    { name: "Self-RAG Verifier", color: "#a855f7" },
                    { name: "Semantic Chunking", color: "#c084fc" },
                ],
            },
            {
                id: "model-serving-edge",
                title: "Inference & Edge AI",
                icon: Server,
                accentColor: "#009688",
                stats: "<180ms P95 · Real-Time Edge",
                architectureHighlight:
                    "High-throughput async inference with FastAPI, ONNX Runtime edge pipelines, and local Ollama execution.",
                tools: [
                    { name: "FastAPI Async", color: "#009688" },
                    { name: "ONNX Runtime", color: "#0284c7" },
                    { name: "Ollama Local LLM", color: "#a855f7" },
                    { name: "Hugging Face APIs", color: "#eab308" },
                ],
            },
            {
                id: "vector-intelligence",
                title: "Vector Databases & Search",
                icon: Database,
                accentColor: "#ec4899",
                stats: "Cosine Index · High Dim",
                architectureHighlight:
                    "High-dimensional similarity indexing with FAISS and ChromaDB for instant face enrollment and medical Q&A.",
                tools: [
                    { name: "ChromaDB", color: "#ec4899" },
                    { name: "FAISS Vector Index", color: "#d946ef" },
                    { name: "Sentence Transformers", color: "#f43f5e" },
                    { name: "Embedding Pipelines", color: "#fb7185" },
                ],
            },
            {
                id: "mlops-lifecycle",
                title: "MLOps & Model Lifecycle",
                icon: Workflow,
                accentColor: "#0194e2",
                stats: "Tracked Runs · Versioned",
                architectureHighlight:
                    "Automated experiment tracking with MLflow, PyTorch neural networks, LightGBM classifiers, and model registry.",
                tools: [
                    { name: "MLflow Registry", color: "#0194e2" },
                    { name: "PyTorch Deep Learning", color: "#ee4c2c" },
                    { name: "LightGBM & Scikit", color: "#10b981" },
                    { name: "Dataset Pipelines", color: "#38bdf8" },
                ],
            },
        ],
    },
    backend: {
        label: "Languages & Core Systems",
        icon: Database,
        toolCount: 16,
        pillars: [
            {
                id: "core-languages",
                title: "Core Languages & Systems",
                icon: Terminal,
                accentColor: "#3776ab",
                stats: "Asyncio · Systems C · Type Safe",
                architectureHighlight:
                    "High-concurrency Python 3.11+ asyncio event loops, systems-level C programming, TypeScript type safety, and Go services.",
                tools: [
                    { name: "Python 3.11+ (Async)", color: "#3776ab" },
                    { name: "C Programming", color: "#64748b" },
                    { name: "TypeScript 5", color: "#3178c6" },
                    { name: "Node.js & Go", color: "#22c55e" },
                ],
            },
            {
                id: "relational-databases",
                title: "Databases & In-Memory Cache",
                icon: Database,
                accentColor: "#336791",
                stats: "Sub-ms Redis · Zero Drift · ACID",
                architectureHighlight:
                    "PostgreSQL 16 relational ledgers, sub-millisecond Redis caching, container health management, and persistent storage.",
                tools: [
                    { name: "PostgreSQL 16", color: "#336791" },
                    { name: "Redis Caching", color: "#dc382d" },
                    { name: "Alembic Migrations", color: "#0284c7" },
                    { name: "Persistent Storage", color: "#10b981" },
                ],
            },
            {
                id: "caching-streaming",
                title: "Streaming, Queues & GitOps",
                icon: Layers,
                accentColor: "#dc382d",
                stats: "Pub/Sub · 1GB+ Async · Git",
                architectureHighlight:
                    "Apache Kafka event streaming, Celery distributed tasks for 1GB+ PDFs, Git version control, and environment configuration.",
                tools: [
                    { name: "Apache Kafka", color: "#231f20" },
                    { name: "Celery Task Queue", color: "#37814a" },
                    { name: "Git & GitHub", color: "#f05032" },
                    { name: "Env & Secret Config", color: "#f59e0b" },
                ],
            },
            {
                id: "modern-frontend",
                title: "APIs & Web Architecture",
                icon: Boxes,
                accentColor: "#61dafb",
                stats: "FastAPI · SSR · Turbopack",
                architectureHighlight:
                    "FastAPI REST endpoints, Next.js App Router, Tailwind CSS design systems, and resilient system design.",
                tools: [
                    { name: "FastAPI REST APIs", color: "#009688" },
                    { name: "React 19 & Next.js", color: "#61dafb" },
                    { name: "System Design", color: "#6366f1" },
                    { name: "Turbopack Engine", color: "#06b6d4" },
                ],
            },
        ],
    },
};

export default function Skills() {
    const [activeTab, setActiveTab] = useState<CategoryTab>("devops");
    const currentCategory = domainCategories[activeTab];

    return (
        <section id="skills" className="relative overflow-hidden py-16 px-4 bg-section-alt transition-colors duration-300">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/3 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute right-1/4 bottom-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.06)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-1.5"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-mono font-medium text-primary backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-secondary animate-pulse" />
                        Production Technology Stack
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
                        Cloud Native &amp; Systems Stack
                    </h2>
                    <p className="max-w-xl mx-auto text-xs text-text-tertiary leading-relaxed">
                        Production tools, declarative infrastructure, and automation pipelines deployed across real-world systems.
                    </p>
                </motion.div>

                {/* ── 1. DUAL-STREAM INFINITE MOVING MARQUEE (Dynamic & Engaging) ── */}
                <div className="relative overflow-hidden py-1 space-y-2">
                    {/* Gradient Fade Masks */}
                    <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-section-alt to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-section-alt to-transparent z-10 pointer-events-none" />

                    {/* Stream 1: DevOps & Cloud (Flowing Left) */}
                    <div className="flex overflow-hidden select-none">
                        <div className="animate-marquee-left flex items-center gap-2">
                            {[...devopsStream, ...devopsStream].map((item, idx) => (
                                <div
                                    key={`stream1-${idx}`}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card-bg/90 shadow-sm backdrop-blur-md hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                                >
                                    <div
                                        className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-xs font-bold text-text-primary">
                                        {item.name}
                                    </span>
                                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-card-bg-hover text-text-tertiary border border-border/50">
                                        {item.tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stream 2: AI / MLOps & Backends (Flowing Right — TurboQuant removed) */}
                    <div className="flex overflow-hidden select-none">
                        <div className="animate-marquee-right flex items-center gap-2">
                            {[...aimlStream, ...aimlStream].map((item, idx) => (
                                <div
                                    key={`stream2-${idx}`}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card-bg/90 shadow-sm backdrop-blur-md hover:border-secondary/40 hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                                >
                                    <div
                                        className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-xs font-bold text-text-primary">
                                        {item.name}
                                    </span>
                                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-card-bg-hover text-text-tertiary border border-border/50">
                                        {item.tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── 2. COMPACT DOMAIN BENTO GRID (SINGLE ROW ON DESKTOP, ZERO VERTICAL BLOAT) ── */}
                <div className="space-y-3.5 pt-1">
                    {/* Category Selector Tabs */}
                    <div className="flex justify-start sm:justify-center overflow-x-auto no-scrollbar py-1">
                        <div className="inline-flex p-1 rounded-xl bg-card-bg border border-border shadow-sm backdrop-blur-md gap-1 shrink-0 mx-auto">
                            {(Object.keys(domainCategories) as CategoryTab[]).map((tabKey) => {
                                const tab = domainCategories[tabKey];
                                const Icon = tab.icon;
                                const isSelected = activeTab === tabKey;
                                return (
                                    <button
                                        key={tabKey}
                                        onClick={() => setActiveTab(tabKey)}
                                        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 shrink-0 whitespace-nowrap min-h-[38px] ${isSelected
                                            ? "bg-primary text-white shadow-md shadow-primary/25 border border-primary"
                                            : "text-text-secondary hover:text-text-primary hover:bg-card-bg-hover border border-transparent"
                                            }`}
                                    >
                                        <Icon className="w-3.5 h-3.5 shrink-0" />
                                        <span>{tab.label}</span>
                                        <span className={`text-[10px] px-1.5 py-0.2 rounded ${isSelected ? "bg-white/20 text-white" : "bg-card-bg-hover text-text-tertiary"}`}>
                                            {tab.toolCount}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Compact 4-Column Bento Matrix (Fits completely on screen in a single row) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto"
                        >
                            {currentCategory.pillars.map((pillar) => {
                                const Icon = pillar.icon;
                                return (
                                    <motion.div
                                        key={pillar.id}
                                        whileHover={{ y: -2 }}
                                        className="p-3.5 rounded-xl border border-border bg-card-bg hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-md flex flex-col justify-between space-y-2.5"
                                    >
                                        {/* Card Header: Icon + Title + Stat Tag */}
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-1.5">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center border border-border/70 shrink-0"
                                                        style={{
                                                            backgroundColor: `${pillar.accentColor}15`,
                                                            color: pillar.accentColor,
                                                        }}
                                                    >
                                                        <Icon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <h3 className="font-bold text-xs md:text-sm text-text-primary leading-tight">
                                                        {pillar.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <span className="inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-card-bg-hover text-primary border border-primary/20">
                                                {pillar.stats}
                                            </span>
                                        </div>

                                        {/* Tech Tool Chips with Brand Dots */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {pillar.tools.map((tool) => (
                                                <div
                                                    key={tool.name}
                                                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-card-bg-hover border border-border/70 text-[11px] font-medium text-text-primary hover:border-text-tertiary transition-colors"
                                                >
                                                    <span
                                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                                        style={{ backgroundColor: tool.color }}
                                                    />
                                                    <span>{tool.name}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Crisp Architecture Highlight */}
                                        <p className="text-[11px] text-text-tertiary leading-snug pt-1 border-t border-border/40">
                                            {pillar.architectureHighlight}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── 3. ULTRA-COMPACT SYSTEM TELEMETRY RIBBON (Single-Line, Minimalist) ── */}
                <div className="pt-1 max-w-5xl mx-auto">
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 px-3 py-2 rounded-xl bg-card-bg/60 border border-border/60 text-[11px] font-mono text-text-secondary backdrop-blur-sm">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-bold text-emerald-400">99.9% Production SLA</span>
                        </div>
                        <span className="text-border hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5">
                            <Radio className="w-3.5 h-3.5 text-primary" />
                            <span>CloudWatch &amp; Node Exporter</span>
                        </div>
                        <span className="text-border hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5">
                            <Workflow className="w-3.5 h-3.5 text-secondary" />
                            <span>7-Stage Jenkins &amp; GitHub Actions</span>
                        </div>
                        <span className="text-border hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5">
                            <Boxes className="w-3.5 h-3.5 text-amber-400" />
                            <span>11 Helm Charts &amp; AWS ECS</span>
                        </div>
                        <span className="text-border hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5">
                            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Sub-ms Redis Caching</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

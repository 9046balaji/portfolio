"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ExternalLink,
    Github,
    Cpu,
    Server,
    Terminal,
    Boxes,
    GitBranch,
    ShieldCheck,
    Activity,
    Layers,
    Sparkles,
    Cloud,
    FileText,
    Binary,
    ChevronDown,
    ChevronUp,
    Gauge
} from "lucide-react";
import Link from "next/link";

type ProjectCategory = "all" | "core" | "devops";

interface ProjectItem {
    id: string;
    title: string;
    tagline: string;
    category: "core" | "devops";
    badge: string;
    icon: typeof Cpu;
    metric: string;
    description: string;
    infraTags: string[];
    aiCoreTags: string[];
    points: string[];
    links: {
        github: string;
        demo?: string;
    };
    featuredInAll?: boolean;
}

const projects: ProjectItem[] = [
    // --- TOP 6 HIGHLIGHTS FOR INITIAL DISPLAY ---
    {
        id: "heartguard-ai",
        title: "HeartGuard AI",
        tagline: "Clinical AI Engine & MedGemma RAG",
        category: "core",
        badge: "AI & Healthcare",
        icon: Activity,
        metric: "<180ms RAG Latency · 99.2% Clinical Precision",
        description:
            "Clinical-grade cardiac assistant featuring 10 LangGraph agents, self-verifying RAG over 125K+ medical papers, and local MedGemma 4B with TurboQuant KV Cache Compression.",
        infraTags: ["FastAPI", "PostgreSQL", "Docker", "ChromaDB"],
        aiCoreTags: ["LangGraph", "MedGemma 4B", "TurboQuant", "Self-RAG"],
        points: [
            "Local MedGemma 4B with TurboQuant 4-bit key / 8-bit value KV cache compression & 7168-token budget.",
            "Self-correcting RAG pipeline verifying diagnostic hypotheses against 125K+ clinical documents.",
        ],
        links: {
            github: "https://github.com/9046balaji/Heart",
            demo: "/projects/heartguard-ai",
        },
        featuredInAll: true,
    },
    {
        id: "aura-bank",
        title: "Aura Bank",
        tagline: "Fintech Platform & Enterprise SRE Ecosystem",
        category: "core",
        badge: "Fintech & SRE",
        icon: Server,
        metric: "40% Faster CI/CD · Zero Ledger Drift",
        description:
            "Integrated digital banking system on double-entry ledger with ML fraud detection. Enhanced with a 7-stage declarative Jenkins pipeline, Terraform IaC, Helm charts, and Prometheus/Grafana.",
        infraTags: ["Jenkins CI/CD", "Terraform", "Helm", "Prometheus", "Docker"],
        aiCoreTags: ["React 19", "Node.js", "PostgreSQL", "TF-IDF ML"],
        points: [
            "Enterprise 7-stage Jenkins pipeline automating Node tests, Python pytest, buf lint, and multi-arch Docker builds.",
            "Infrastructure as Code (Terraform) & Kubernetes deployments with Prometheus/Grafana SRE observability.",
        ],
        links: {
            github: "https://github.com/9046balaji/bank-management-system",
            demo: "/projects/aura-bank",
        },
        featuredInAll: true,
    },
    {
        id: "docker-orchestration",
        title: "Docker Multi-Stage & Orchestration",
        tagline: "Multi-Stage Builds & Distributed Stacks",
        category: "devops",
        badge: "Docker & Compose",
        icon: Boxes,
        metric: "68% Smaller Images · 0 Vulnerabilities",
        description:
            "Production containerization repository showcasing multi-stage Docker compilation across Go, Node.js/Express, and Spring PetClinic, along with isolated multi-container Docker Compose architectures.",
        infraTags: ["Docker Multi-Stage", "Docker Compose", "Nginx Alpine", "Networking"],
        aiCoreTags: ["Go Binaries", "Express Runtime", "PostgreSQL"],
        points: [
            "Optimized multi-stage Dockerfiles drastically reducing final image footprints for Go binaries and Node runtimes.",
            "Multi-container Compose environments with PostgreSQL persistence, custom networking, and healthcheck dependencies.",
        ],
        links: {
            github: "https://github.com/9046balaji/Docker",
        },
        featuredInAll: true,
    },
    {
        id: "pdf-tools",
        title: "PDF Tools",
        tagline: "Async High-Throughput Document Engine",
        category: "core",
        badge: "Distributed Systems",
        icon: FileText,
        metric: "1GB+ Async File Stream · 0 UI Lag",
        description:
            "Handles 1GB+ PDF documents without blocking the main thread. Dual-interface architecture (FastAPI REST + Flask UI) driven by Celery and Redis distributed task queues, Tesseract OCR, and zlib compression.",
        infraTags: ["Celery Queues", "Redis Caching", "Render YAML", "WebSockets"],
        aiCoreTags: ["FastAPI", "Flask", "Tesseract OCR", "Python Async"],
        points: [
            "Distributed task queues (Celery + Redis) offloading heavy OCR, transformations, and compression to background workers.",
            "25+ document operations with real-time WebSocket progress streaming and automated temporary file cleanup.",
        ],
        links: {
            github: "https://github.com/9046balaji/Pdf-Tools",
            demo: "/projects/pdf-tools",
        },
        featuredInAll: true,
    },
    {
        id: "jenkins-remoting",
        title: "Distributed Jenkins Remoting Cluster",
        tagline: "Master-Agent CI/CD Infrastructure over SSH",
        category: "devops",
        badge: "Jenkins CI/CD",
        icon: Cloud,
        metric: "100% SSH Isolated · Automated JUnit Tests",
        description:
            "Dockerized enterprise Jenkins controller and worker agent cluster communicating over SSH remoting, configured with automated workspace sanitization, JDK 17, Gradle 8.5, and automated JUnit test analytics.",
        infraTags: ["Jenkins Controller", "SSH Remoting", "Docker Agent", "CI/CD"],
        aiCoreTags: ["Gradle 8.5", "Java 17", "JUnit Reports"],
        points: [
            "Isolated Jenkins worker node (`gradle-agent-01`) using PEM key credentials for secure SSH execution.",
            "Automated Gradle compilation with automated JUnit test report generation and declarative workspace cleanup.",
        ],
        links: {
            github: "https://github.com/9046balaji/CodeAlpha_JenkinsRemoting",
        },
        featuredInAll: true,
    },
    {
        id: "bash-scripting",
        title: "DevOps Bash Automation Suite",
        tagline: "Production Shell Utilities & Sysadmin Scripts",
        category: "devops",
        badge: "Bash & Linux",
        icon: Terminal,
        metric: "100% Race Lock Guard · Nginx CSV Reports",
        description:
            "A structured collection of shell automation utilities engineered for production DevOps environments, including concurrency lock prevention, automated log rotation, CSV metrics extraction, and automated deployment.",
        infraTags: ["Linux Sysadmin", "Docker CLI", "Cron Automation", "Nginx Logs"],
        aiCoreTags: ["Bash 5.0", "AWK / Sed", "cURL Diagnostics"],
        points: [
            "Concurrency lock guard pattern (`script_lock.sh`) preventing race conditions and duplicate script executions.",
            "Automated deployment runner pulling Git updates, fetching latest container images, and validating live health via cURL.",
        ],
        links: {
            github: "https://github.com/9046balaji/Bash-Scripting",
        },
        featuredInAll: true,
    },

    // --- REMAINING PROJECTS (SHOWN ON EXPAND OR TAB SELECTION) ---
    {
        id: "hospital-management",
        title: "Hospital Management System",
        tagline: "Enterprise Healthcare Resource Planning",
        category: "core",
        badge: "Healthcare System",
        icon: ShieldCheck,
        metric: "0 Booking Collisions · Hardened Security",
        description:
            "Full-stack appointment and clinical resource management platform with collision-free scheduling, multi-role access control, and hardened REST APIs built on Node.js and PostgreSQL.",
        infraTags: ["PostgreSQL Constraints", "Rate Limiting", "Helmet.js", "Docker"],
        aiCoreTags: ["Node.js", "Express", "JWT Tokens", "RBAC"],
        points: [
            "Conflict-prevention scheduling engine utilizing PostgreSQL atomic constraints to prevent doctor double-booking.",
            "Security hardened with JWT refresh token rotation, Helmet HTTP protection, and rate-limiting middleware.",
        ],
        links: {
            github: "https://github.com/9046balaji/Hospital-Management-System",
            demo: "/projects/hospital-management",
        },
    },
    {
        id: "docker-web-server",
        title: "Dockerized Nginx Web Server",
        tagline: "Alpine Nginx Server & CI Validation Pipeline",
        category: "devops",
        badge: "Container / Nginx",
        icon: Server,
        metric: "<50ms Static Latency · GitHub Actions CI",
        description:
            "Lightweight containerized web server built on Alpine Linux and Nginx. Orchestrated with Docker Compose, featuring persistent logging volumes, custom routing configurations, and automated GitHub Actions verification.",
        infraTags: ["Nginx Alpine", "Docker Compose", "GitHub Actions", "Volumes"],
        aiCoreTags: ["Reverse Proxy", "HTTP/2", "Cache Headers"],
        points: [
            "Custom Nginx reverse-proxy server configuration with optimized MIME handling and client caching headers.",
            "Automated CI validation pipeline via GitHub Actions ensuring container build integrity on every push.",
        ],
        links: {
            github: "https://github.com/9046balaji/CodeAlpha_DockerWebServer",
        },
    },
    {
        id: "student-grade-api",
        title: "Student Grade API & Gradle CI",
        tagline: "Spring Boot 3.2 Microservice with CI/CD Pipeline",
        category: "devops",
        badge: "Java & CI/CD",
        icon: Layers,
        metric: "100% Automated Gradle CI · Zero Downtime",
        description:
            "RESTful microservice built with Spring Boot 3.2 and Java 17, featuring automated Gradle build cycles, unit test validation, and continuous integration pipelines orchestrated via GitHub Actions.",
        infraTags: ["GitHub Actions", "Gradle Automation", "CI/CD Pipeline"],
        aiCoreTags: ["Spring Boot 3.2", "Java 17", "Spring Data JPA"],
        points: [
            "Automated Gradle build lifecycle and dependency management with automated task execution on push events.",
            "Continuous integration pipeline configured with GitHub Actions to validate builds and execute test suites.",
        ],
        links: {
            github: "https://github.com/9046balaji/CodeAlpha_StudentGradeAPI",
        },
    },
    {
        id: "ml-showcase",
        title: "ML & DL Showcase",
        tagline: "34 Production-Grade Academic Notebooks",
        category: "core",
        badge: "Machine Learning",
        icon: Binary,
        metric: "34 Academic Notebooks · SHAP Explainability",
        description:
            "A comprehensive research and implementation repository of 34 Jupyter notebooks covering machine learning, deep learning neural networks, computer vision, and explainable medical AI.",
        infraTags: ["Colab GPU", "Jupyter", "Model Checkpointing"],
        aiCoreTags: ["TensorFlow", "PyTorch", "OpenCV", "SHAP / Optuna"],
        points: [
            "Heart disease prediction pipeline: XGBoost + LightGBM + Optuna hyperparameter optimization + SHAP explainability.",
            "Transfer learning benchmarks with ResNet50, VGG16, InceptionV3, and MobileNet on custom medical datasets.",
        ],
        links: {
            github: "https://github.com/9046balaji/collage-projects",
            demo: "/projects/ml-showcase",
        },
    },
    {
        id: "git-mastery",
        title: "Git Mastery & Architecture Guide",
        tagline: "Enterprise Version Control & Branching Workflows",
        category: "devops",
        badge: "Git & VCS",
        icon: GitBranch,
        metric: "GitFlow & Trunk Specs · Submodule Workflows",
        description:
            "An in-depth guide and reference architecture for enterprise Git workflows, covering submodules, subtrees, automation hooks, branching strategies, stashing, and conflict resolution.",
        infraTags: ["Git Hooks", "Submodules", "Subtrees", "Automation"],
        aiCoreTags: ["Branching Architecture", "Mermaid Flows", "VCS Specs"],
        points: [
            "Architectural guides for managing multi-repo dependencies using Git Submodules and Git Subtrees.",
            "Pre-commit and post-receive automation hook specifications for linting and deployment validation.",
        ],
        links: {
            github: "https://github.com/9046balaji/Git-GitHub",
        },
    },
    {
        id: "linux-devops",
        title: "Linux for DevOps Engineers",
        tagline: "Kernel, Process & System Administration",
        category: "devops",
        badge: "Linux Sysadmin",
        icon: Terminal,
        metric: "Systemd Profiling · Zero Crash Diagnostics",
        description:
            "Hands-on Linux toolkit tailored for DevOps engineers, covering kernel parameters, systemd service management, process profiling, network troubleshooting, and file permission models.",
        infraTags: ["Linux Kernel", "Systemd Units", "Networking", "Security"],
        aiCoreTags: ["Process Diagnostics", "Bash", "Netstat & cURL"],
        points: [
            "Comprehensive system administration guides for systemd services, socket units, and background daemons.",
            "Process inspection, signal handling, and memory profiling techniques for troubleshooting production crashes.",
        ],
        links: {
            github: "https://github.com/9046balaji/Linux",
        },
    },
    {
        id: "cicd-automation",
        title: "CI/CD Pipeline Automation",
        tagline: "Multi-Stage Build, Test & Auto-Deploy Workflows",
        category: "devops",
        badge: "GitHub Actions",
        icon: Cloud,
        metric: "100% PR Test Coverage · Zero Regressions",
        description:
            "Declarative CI/CD pipeline automation repository utilizing GitHub Actions to orchestrate syntax linting, unit test execution, container builds, and automated deployments.",
        infraTags: ["GitHub Actions", "Matrix Builds", "Container Deploy", "Secrets"],
        aiCoreTags: ["YAML Workflows", "Automated Linting", "Test Suites"],
        points: [
            "Automated syntax and error validation triggers on pull requests to catch deployment regressions early.",
            "Continuous deployment workflows that build, tag, and publish artifacts upon successful branch validation.",
        ],
        links: {
            github: "https://github.com/9046balaji/CI-CD",
        },
    },
];

const INITIAL_DISPLAY_COUNT = 6;

const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "core", label: "Core Systems & AI", count: projects.filter((p) => p.category === "core").length },
    { id: "devops", label: "DevOps & Infrastructure", count: projects.filter((p) => p.category === "devops").length },
] as const;

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const toggleCardExpand = (id: string) => {
        setExpandedCardIds((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Filter projects according to category
    const categoryProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    // Responsive initial count: 3 on mobile to avoid scroll fatigue, 6 on desktop
    const initialCount = isMobile ? 3 : INITIAL_DISPLAY_COUNT;
    const shouldLimit = activeCategory !== "core" && !isExpanded && categoryProjects.length > initialCount;
    const displayedProjects = shouldLimit
        ? categoryProjects.slice(0, initialCount)
        : categoryProjects;

    const remainingCount = categoryProjects.length - initialCount;

    const handleCategoryChange = (cat: ProjectCategory) => {
        setActiveCategory(cat);
        setIsExpanded(false);
    };

    return (
        <section id="projects" className="py-24 px-4 bg-section-alt relative overflow-hidden">
            {/* Background glowing gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/4 top-1/6 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute right-1/4 bottom-1/6 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.05)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-text-tertiary backdrop-blur-md mb-3">
                        <Sparkles className="h-3.5 w-3.5 text-secondary" />
                        Production Engineering Showcase
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 text-text-primary">
                        DevOps, Cloud &amp; AI Systems
                    </h2>
                    <p className="text-text-tertiary max-w-2xl mx-auto text-sm md:text-base">
                        Real-world platforms engineered with verifiable performance metrics, automated delivery pipelines, and production applied AI.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex items-center justify-start sm:justify-center gap-2 mb-8 md:mb-10 overflow-x-auto no-scrollbar py-1 px-1 -mx-2 px-2 sm:mx-0 sm:px-0">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id as ProjectCategory)}
                                className={`relative shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                                    isActive
                                        ? "text-white shadow-lg shadow-primary/25"
                                        : "text-text-secondary hover:text-text-primary bg-card-bg border border-border hover:border-primary/40"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabBadge"
                                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent-indigo rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span>{cat.label}</span>
                                <span
                                    className={`text-[11px] px-2 py-0.2 rounded-full font-mono ${
                                        isActive
                                            ? "bg-white/25 text-white"
                                            : "bg-card-bg-hover text-text-muted"
                                    }`}
                                >
                                    {cat.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {displayedProjects.map((project, index) => {
                            const IconComponent = project.icon;
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -16 }}
                                    transition={{ duration: 0.3, delay: index * 0.04 }}
                                    className="bg-card-bg border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 backdrop-blur-md"
                                >
                                    <div className="p-4 sm:p-5 flex-grow flex flex-col">
                                        {/* Top Badge & Category */}
                                        <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                                            <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                                                <IconComponent className="w-3.5 h-3.5" />
                                                {project.badge}
                                            </span>
                                            <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">
                                                {project.category === "core" ? "System" : "DevOps"}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold mb-1 group-hover:text-primary transition-colors text-text-primary">
                                            {project.title}
                                        </h3>
                                        <p className="text-[11px] text-secondary font-mono mb-2.5 sm:mb-3">
                                            {project.tagline}
                                        </p>

                                        {/* Metric Pill */}
                                        <div className="mb-3 p-2 rounded-lg bg-card-bg-hover border border-border-subtle flex items-center gap-2">
                                            <Gauge className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                            <span className="text-[10.5px] sm:text-[11px] font-mono font-medium text-text-secondary leading-none">
                                                {project.metric}
                                            </span>
                                        </div>

                                        <div className="space-y-2.5 mb-3.5 flex-grow">
                                            <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 sm:line-clamp-3">
                                                {project.description}
                                            </p>
                                            <ul className="space-y-1.5 text-[11px] text-text-muted">
                                                {project.points
                                                    .slice(0, isMobile && !expandedCardIds[project.id] ? 1 : project.points.length)
                                                    .map((point, i) => (
                                                        <li key={i} className="flex items-start gap-1.5 leading-snug">
                                                            <span className="text-primary shrink-0 font-bold">›</span>
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                            {project.points.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => toggleCardExpand(project.id)}
                                                    className="md:hidden text-[10px] font-mono text-primary hover:underline flex items-center gap-1 pt-0.5 cursor-pointer"
                                                >
                                                    <span>
                                                        {expandedCardIds[project.id]
                                                            ? "Hide Architecture Specs"
                                                            : "View Architecture Specs"}
                                                    </span>
                                                    <ChevronDown
                                                        className={`w-3 h-3 transition-transform duration-200 ${
                                                            expandedCardIds[project.id] ? "rotate-180" : ""
                                                        }`}
                                                    />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer Section with Separate Infra & AI Tags */}
                                    <div className="p-4 sm:p-5 pt-0 mt-auto border-t border-border/40">
                                        {/* Infra Tags */}
                                        <div className="pt-2.5 mb-2 flex items-center gap-1.5 flex-wrap">
                                            <span className="text-[9px] uppercase font-mono tracking-wider text-text-muted mr-0.5">
                                                Infra:
                                            </span>
                                            {project.infraTags.map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-[9.5px] sm:text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-500/20 font-mono"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* AI / Core Tags */}
                                        <div className="mb-3.5 flex items-center gap-1.5 flex-wrap">
                                            <span className="text-[9px] uppercase font-mono tracking-wider text-text-muted mr-0.5">
                                                AI/Core:
                                            </span>
                                            {project.aiCoreTags.map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-[9.5px] sm:text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-md border border-purple-500/20 font-mono"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-card-bg-hover"
                                            >
                                                <Github className="w-3.5 h-3.5" /> View Code
                                            </a>
                                            {project.links.demo && (
                                                <Link
                                                    href={project.links.demo}
                                                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-white transition-all py-1 px-2.5 rounded-md bg-primary/10 hover:bg-primary border border-primary/20"
                                                >
                                                    Case Study <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Show More / Show Less Button */}
                {categoryProjects.length > initialCount && activeCategory !== "core" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-10 text-center"
                    >
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 bg-card-bg border border-border hover:border-primary text-text-primary hover:text-primary shadow-lg hover:shadow-primary/15 cursor-pointer backdrop-blur-md group"
                        >
                            <span>
                                {isExpanded
                                    ? "Show Less Projects"
                                    : `Explore All ${categoryProjects.length} Projects (+${remainingCount} more)`}
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
        </section>
    );
}

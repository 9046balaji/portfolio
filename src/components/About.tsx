"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Cloud,
    Cpu,
    GitBranch,
    Server,
    Sparkles,
    Target,
    Zap,
    Terminal,
    GraduationCap,
    MapPin,
    Boxes,
    Award,
    Activity,
    CheckCircle2,
    ChevronDown,
    ShieldCheck,
    Lightbulb,
    Code2,
    Users
} from "lucide-react";
import Image from "next/image";

// ── 5 Core Engineering Capabilities (Simple, clear descriptions) ──
const corePillars = [
    {
        icon: GitBranch,
        title: "CI/CD & Automation",
        badge: "Fast Delivery",
        accentColor: "#2088ff",
        description:
            "I build automated pipelines with Jenkins and GitHub Actions that test, build, and deploy software automatically whenever code is pushed.",
    },
    {
        icon: Cloud,
        title: "Cloud Infrastructure",
        badge: "AWS & Terraform",
        accentColor: "#844fba",
        description:
            "I set up secure servers, virtual private networks, and storage on AWS using code (Terraform) so setups are easy to recreate and manage.",
    },
    {
        icon: Server,
        title: "Monitoring & Uptime",
        badge: "Prometheus & Grafana",
        accentColor: "#f46800",
        description:
            "I configure monitoring dashboards with Prometheus and Grafana to track CPU, memory, and response times to catch issues before users notice.",
    },
    {
        icon: Boxes,
        title: "Containers & Docker",
        badge: "Docker & Kubernetes",
        accentColor: "#009688",
        description:
            "I package applications into Docker containers and manage them with Kubernetes so they run smoothly on any machine and scale easily.",
    },
    {
        icon: Cpu,
        title: "Backend & Applied AI",
        badge: "FastAPI & Python",
        accentColor: "#ec4899",
        description:
            "I build fast backend APIs with Python and FastAPI, manage databases, and deploy machine learning models to production.",
    },
] as const;

// Core engineering principles (replaces duplicate technical skills pills)
const engineeringValues = [
    {
        icon: Zap,
        title: "Automate Early",
        desc: "If a task needs to be done twice, I write a script or build a pipeline.",
    },
    {
        icon: ShieldCheck,
        title: "Reliability First",
        desc: "Building systems that recover quickly and stay online without downtime.",
    },
    {
        icon: Code2,
        title: "Learn by Building",
        desc: "Deploying real projects and testing code in practice teaches the most.",
    },
    {
        icon: Users,
        title: "Team Player",
        desc: "Clear documentation, friendly communication, and taking ownership.",
    },
];

const stats = [
    { label: "Primary Focus", value: "Cloud & DevOps Engineering" },
    { label: "Education", value: "B.Tech CSE (AI & ML) · 7.4" },
    { label: "Credential", value: "AWS Certified Cloud Practitioner" },
];

export default function About() {
    const [showFullBio, setShowFullBio] = useState(false);

    return (
        <section
            id="about"
            className="relative overflow-hidden pt-10 md:pt-14 pb-16 md:pb-20 px-4 bg-section-alt transition-colors duration-300"
        >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.10)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto space-y-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-text-tertiary backdrop-blur-md mb-3">
                        <Sparkles className="h-3.5 w-3.5 text-secondary" />
                        Cloud Infrastructure &amp; DevOps Engineering
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 text-text-primary">About Me</h2>
                    <p className="text-text-tertiary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Building automated pipelines, reliable cloud setups, and observable systems in simple and effective ways.
                    </p>
                </motion.div>

                {/* ── ROW 1: BALANCED 2-COLUMN INTRO (Portrait on Left, Story on Right) ── */}
                <div className="grid gap-8 lg:grid-cols-12 items-start">
                    {/* Left: Portrait Card with Highlights (Col 5) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.55 }}
                        className="lg:col-span-5 flex flex-col gap-4 rounded-3xl border border-glass-border bg-glass-bg p-5 shadow-2xl backdrop-blur-md relative overflow-hidden group"
                    >
                        <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_70%)] blur-2xl pointer-events-none" />

                        {/* Portrait Image Frame */}
                        <div className="relative aspect-[4/4.5] sm:aspect-[1/1] lg:aspect-[4/4.2] w-full overflow-hidden rounded-2xl border border-glass-border bg-card-bg shadow-inner">
                            <Image
                                src="/assets/profile.webp"
                                alt="Konda Balaji Rao"
                                fill
                                priority
                                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-75" />

                            {/* Floating Name Badge over image */}
                            <div className="absolute inset-x-3 bottom-3 z-20">
                                <div className="rounded-xl border border-glass-border bg-background/90 px-3.5 py-2.5 backdrop-blur-xl shadow-lg">
                                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                                        Cloud &amp; DevOps Engineer
                                    </p>
                                    <p className="text-sm font-bold text-text-primary">Konda Balaji Rao</p>
                                </div>
                            </div>
                        </div>

                        {/* High-Impact Proof Highlights Grid */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                            <div className="rounded-xl border border-glass-border bg-card-bg/90 p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 min-w-0">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[9px] sm:text-[10px] uppercase font-mono text-text-muted font-bold">Certification</div>
                                    <div className="text-[10.5px] sm:text-xs font-bold text-text-primary leading-tight">AWS Certified</div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-glass-border bg-card-bg/90 p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 min-w-0">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                    <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[9px] sm:text-[10px] uppercase font-mono text-text-muted font-bold">Contributions</div>
                                    <div className="text-[10.5px] sm:text-xs font-bold text-text-primary leading-tight">2,000+ GitHub</div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-glass-border bg-card-bg/90 p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 min-w-0">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                                    <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[9px] sm:text-[10px] uppercase font-mono text-text-muted font-bold">Mindset</div>
                                    <div className="text-[10.5px] sm:text-xs font-bold text-text-primary leading-tight">Automate Early</div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-glass-border bg-card-bg/90 p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 min-w-0">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                                    <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[9px] sm:text-[10px] uppercase font-mono text-text-muted font-bold">Approach</div>
                                    <div className="text-[10.5px] sm:text-xs font-bold text-text-primary leading-tight">Reliability First</div>
                                </div>
                            </div>
                        </div>

                        {/* Live Availability Status */}
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="font-semibold">Open to Work</span>
                            </div>
                            <span className="text-text-secondary text-[10px] sm:text-[11px]">Full-Time &amp; Internships · Ready to Deploy</span>
                        </div>

                        {/* Metadata Footer Under Image */}
                        <div className="pt-3 border-t border-glass-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-text-tertiary">
                            <div className="flex items-center gap-1.5 min-w-0">
                                <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span className="text-[11px] sm:text-xs">B.Tech AI &amp; ML (2027)</span>
                            </div>
                            <div className="flex items-center gap-1.5 min-w-0">
                                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                                <span className="text-[11px] sm:text-xs">VFSTR, Andhra Pradesh</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Story & Biography Box (Col 7) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.55 }}
                        className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-glass-border bg-glass-bg p-6 md:p-8 shadow-2xl backdrop-blur-md space-y-6"
                    >
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-3.5 py-1 text-xs text-text-secondary backdrop-blur-md font-medium">
                                <Terminal className="h-3.5 w-3.5 text-secondary" />
                                Automating Cloud Infrastructure, CI/CD Pipelines &amp; Systems Reliability
                            </div>

                            {/* Human, simple biography */}
                            <div className="space-y-3.5 text-text-tertiary text-sm md:text-base leading-relaxed">
                                <p className="text-text-primary text-base md:text-lg leading-relaxed font-normal">
                                    I&apos;m <span className="font-bold text-primary">Konda Balaji Rao</span>, a Computer Science student at VFSTR (CGPA: 7.4) who loves turning software deployment into a{' '}
                                    <span className="font-semibold text-secondary">smooth, automated, and reliable process</span>.
                                </p>
                                <div className={`space-y-3.5 ${showFullBio ? "block" : "hidden md:block"}`}>
                                    <p>
                                        My main focus is on <strong>practical cloud and DevOps engineering</strong>: writing automated pipelines with Jenkins and GitHub Actions, packaging applications with Docker and Kubernetes, and managing AWS cloud servers with Terraform code.
                                    </p>
                                    <p>
                                        I also use my background in AI &amp; Machine Learning to deploy backend services and data tools with Python and FastAPI. As an <strong>AWS Certified Cloud Practitioner</strong> with over <strong>2,000 GitHub contributions</strong>, I am excited to join an engineering team where I can help build and maintain reliable software systems.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowFullBio(!showFullBio)}
                                    className="md:hidden text-xs font-mono text-primary hover:underline inline-flex items-center gap-1.5 py-1 cursor-pointer font-medium"
                                >
                                    <span>{showFullBio ? "Hide Full Bio" : "Read Full Background"}</span>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showFullBio ? "rotate-180" : ""}`} />
                                </button>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid gap-3 sm:grid-cols-3">
                            {stats.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="rounded-2xl border border-glass-border bg-card-bg/80 p-3.5 backdrop-blur-md"
                                >
                                    <div className="text-[10px] uppercase tracking-wider text-text-tertiary font-mono font-semibold">{item.label}</div>
                                    <div className="mt-1 text-xs md:text-sm font-bold text-text-primary truncate">{item.value}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Engineering Values (Replaced duplicate skills pills) */}
                        <div className="space-y-2.5 pt-1">
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-secondary" />
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                                    How I Approach Engineering
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {engineeringValues.map((val) => {
                                    const Icon = val.icon;
                                    return (
                                        <div
                                            key={val.title}
                                            className="p-2.5 rounded-xl border border-glass-border bg-card-bg/90 space-y-1"
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <Icon className="w-3.5 h-3.5 text-primary" />
                                                <span className="text-xs font-bold text-text-primary">
                                                    {val.title}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-text-tertiary leading-snug">
                                                {val.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── ROW 2: "CORE DEVOPS & INFRASTRUCTURE CAPABILITIES" (5-PILLAR SHOWCASE) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55 }}
                    className="rounded-3xl border border-glass-border bg-glass-bg p-6 md:p-8 shadow-2xl backdrop-blur-md space-y-6"
                >
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                            <Target className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-text-primary">Core DevOps &amp; Infrastructure Capabilities</h3>
                            <p className="text-xs text-text-tertiary">End-to-end competencies across the cloud-native infrastructure and delivery lifecycle.</p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {corePillars.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    whileHover={{ y: -3 }}
                                    className="group rounded-2xl border border-glass-border bg-glass-bg-subtle p-4 backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 flex flex-col justify-between space-y-3"
                                >
                                    <div>
                                        <div className="mb-2.5 flex items-center justify-between">
                                            <div
                                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-glass-border"
                                                style={{
                                                    backgroundColor: `${item.accentColor}15`,
                                                    color: item.accentColor,
                                                }}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-card-bg border border-border text-text-tertiary">
                                                {item.badge}
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-xs md:text-sm text-text-primary group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>

                                    <p className="text-[11px] leading-relaxed text-text-tertiary">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ── ROW 3: MISSION STATEMENT ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center"
                >
                    <div className="inline-block max-w-4xl rounded-3xl border border-glass-border bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 px-6 py-7 shadow-2xl backdrop-blur-md md:px-10">
                        <Target className="mx-auto mb-3 h-6 w-6 text-secondary" />
                        <blockquote className="text-sm md:text-lg font-medium leading-relaxed text-text-primary">
                            &quot;My objective as an engineer is to turn complex manual operations into{' '}
                            <span className="text-primary font-semibold">automated</span>,{' '}
                            <span className="text-secondary font-semibold">code-defined</span>, and{' '}
                            <span className="text-primary font-semibold">observable systems</span> — ensuring developer velocity, system reliability, and production stability.&quot;
                        </blockquote>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

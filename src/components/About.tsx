"use client";

import { motion } from "framer-motion";
import {
    Brain,
    Code2,
    Heart,
    Rocket,
    Sparkles,
    Target,
    Zap,
} from "lucide-react";
import Image from "next/image";

const highlights = [
    {
        icon: Brain,
        title: "AI/ML",
        description:
            "Built models for healthcare-focused problem solving, with an emphasis on robust training, evaluation, and practical deployment.",
    },
    {
        icon: Heart,
        title: "Deep Learning & CV",
        description:
            "Designed neural-network workflows for image understanding, including medical imaging and computer vision experimentation.",
    },
    {
        icon: Rocket,
        title: "DevOps & Cloud",
        description:
            "Worked across AWS, CI/CD, Docker, and automation to move AI prototypes into reliable, production-ready services.",
    },
    {
        icon: Code2,
        title: "MLOps & Research",
        description:
            "Focused on experiment tracking, model lifecycle discipline, and iteration speed from research ideas to operational systems.",
    },
] as const;

const interests = [
    "Deep Learning",
    "Computer Vision",
    "Medical AI",
    "MLOps",
    "Cloud Architecture",
    "RAG Pipelines",
    "Agentic AI Systems",
    "CI/CD & Automation",
    "Open Source",
];

const stats = [
    { label: "Focus", value: "AI systems" },
    { label: "Domain", value: "Healthcare" },
    { label: "Stack", value: "ML + Cloud" },
];

export default function About() {
    return (
        <section id="about" className="relative overflow-hidden py-24 px-4 bg-section-alt">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">About Me</h2>
                    <p className="text-text-tertiary max-w-2xl mx-auto">
                        A focused snapshot of my background, technical direction, and the kinds of systems I like to build.
                    </p>
                </motion.div>

                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.35fr] items-start">
                    {/* Left: Portrait */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle,rgba(59,130,246,0.10)_0%,transparent_70%)] blur-2xl" />

                        <motion.div
                            whileHover={{ y: -5, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 220, damping: 18 }}
                            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-md"
                        >
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/25 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-55" />

                            <div className="relative aspect-[4/5] w-full max-h-[560px]">
                                <Image
                                    src="/assets/profile.jpeg"
                                    alt="Konda Balaji Rao"
                                    fill
                                    priority
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>

                            <div className="absolute inset-x-4 bottom-4 z-20">
                                <div className="rounded-2xl border border-white/10 bg-background/55 px-4 py-3 backdrop-blur-xl shadow-xl">
                                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                                        Software Engineer
                                    </p>
                                    <p className="text-sm font-medium text-text-primary">Konda Balaji Rao</p>
                                    <p className="mt-1 text-xs text-text-tertiary">
                                        AI/ML student building practical, production-oriented systems.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Story + focus + cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,transparent_70%)]" />

                        <div className="relative space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 shadow-2xl backdrop-blur-md">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-text-tertiary backdrop-blur-md">
                                    <Sparkles className="h-4 w-4 text-secondary" />
                                    Engineering curiosity into reliable AI products
                                </div>

                                <div className="space-y-4 max-w-3xl">
                                    <p className="text-lg leading-relaxed text-text-primary">
                                        I&apos;m <span className="font-semibold text-primary">Konda Balaji Rao</span>, a B.Tech student specializing in{' '}
                                        <span className="text-secondary">Artificial Intelligence &amp; Machine Learning</span> at Vignan&apos;s Foundation for Science, Technology and Research.
                                    </p>
                                    <p className="leading-relaxed text-text-tertiary">
                                        My work sits at the intersection of model development and systems thinking. I am especially drawn to healthcare AI, where careful engineering, repeatable experiments, and dependable deployment matter as much as model accuracy.
                                    </p>
                                    <p className="leading-relaxed text-text-tertiary">
                                        I enjoy taking an idea from notebook to production: designing the experiment, training the model, wiring the pipeline, and making the final system measurable, maintainable, and fast enough to matter.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                {stats.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.35, delay: index * 0.06 }}
                                        whileHover={{ y: -3 }}
                                        className="rounded-2xl border border-white/10 bg-card-bg/70 p-4 backdrop-blur-md"
                                    >
                                        <div className="text-xs uppercase tracking-[0.24em] text-text-tertiary">{item.label}</div>
                                        <div className="mt-1 text-sm font-medium text-text-primary">{item.value}</div>
                                    </motion.div>
                                ))}
                            </div>

                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-secondary" />
                                    <span className="text-sm font-medium text-text-primary">Interests &amp; Focus Areas</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {interests.map((interest, index) => (
                                        <motion.span
                                            key={interest}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: 0.25, delay: index * 0.04 }}
                                            whileHover={{ y: -2 }}
                                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-text-secondary transition-colors hover:border-primary/40 hover:text-primary"
                                        >
                                            {interest}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-md">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_55%)]" />
                            <div className="relative mb-5 flex items-center gap-2">
                                <Target className="h-5 w-5 text-secondary" />
                                <h3 className="text-base font-semibold text-text-primary">What I Focus On</h3>
                            </div>

                            <div className="relative grid gap-4 sm:grid-cols-2">
                                {highlights.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, y: 18 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.25 }}
                                            transition={{ duration: 0.45, delay: index * 0.08 }}
                                            whileHover={{ y: -5, scale: 1.01 }}
                                            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-colors hover:border-primary/40"
                                        >
                                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-primary/10 transition-colors group-hover:bg-primary/20">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <h4 className="mb-2 font-semibold text-text-primary">{item.title}</h4>
                                            <p className="text-sm leading-relaxed text-text-tertiary">{item.description}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block max-w-4xl rounded-[2rem] border border-white/10 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 px-6 py-8 shadow-2xl backdrop-blur-md md:px-10">
                        <Target className="mx-auto mb-4 h-8 w-8 text-secondary" />
                        <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-text-primary">
                            &quot;My mission is to build AI systems that are not just intelligent, but also{' '}
                            <span className="text-primary">trustworthy</span>,{' '}
                            <span className="text-secondary">explainable</span>, and{' '}
                            <span className="text-primary">impactful</span> — especially in domains where accuracy matters most.&quot;
                        </blockquote>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

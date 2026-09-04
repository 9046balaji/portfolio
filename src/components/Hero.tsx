"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Code, FileText, ArrowRight, Terminal, Cloud, Cpu, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import NeuralBackground from "./NeuralBackground";

const metrics = [
    { value: "AWS Certified", label: "Cloud Practitioner", icon: Cloud },
    { value: "2,000+", label: "GitHub Contributions", icon: Activity },
    { value: "7 Stages", label: "Automated CI/CD Pipeline", icon: Terminal },
    { value: "11 Charts", label: "Kubernetes & Helm Microservices", icon: Cpu },
];

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-start text-center px-4 overflow-hidden pt-20 md:pt-24 pb-6 md:pb-8"
        >
            {/* Ambient Background & Canvas */}
            <NeuralBackground />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none opacity-25 dark:opacity-35">
                <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-primary rounded-full blur-[140px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[26rem] h-[26rem] bg-secondary rounded-full blur-[130px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="max-w-5xl mx-auto space-y-6 md:space-y-7"
            >
                {/* Profile Avatar with Tech Gradient Ring */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.08, duration: 0.45 }}
                    className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-2 md:mb-3 group"
                >
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-secondary via-primary to-accent-violet opacity-80 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative w-full h-full rounded-full bg-background p-1 flex items-center justify-center overflow-hidden border border-glass-border">
                        <Image
                            src="/assets/profile.jpg"
                            alt="Konda Balaji Rao"
                            width={130}
                            height={130}
                            className="rounded-full object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Subtitle Badge: Focused Role Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.45 }}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-mono text-primary font-medium backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Cloud &amp; DevOps Engineer · Open to Full-Time Roles &amp; Internships
                </motion.div>

                {/* Headline */}
                <div className="space-y-3 md:space-y-3.5">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
                        Automating{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent-violet">
                            Cloud-Native Infrastructure
                        </span>
                        , <br className="hidden md:block" />
                        Reliable CI/CD &amp; Scalable Systems.
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed font-normal">
                        DevOps &amp; Cloud Engineer specializing in automated CI/CD pipelines, containerized microservices, and observable cloud systems — backed by practical AI &amp; ML engineering foundations.
                    </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-1">
                    <Link
                        href="#projects"
                        className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary via-indigo-600 to-accent-violet shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group text-sm md:text-base"
                    >
                        <span>Explore Projects &amp; CI/CD</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                        href="/assets/Konda_Balaji_Rao_Resume.pdf"
                        download="Konda_Balaji_Rao_Resume.pdf"
                        className="px-6 py-3 border border-border hover:border-primary/40 bg-card-bg hover:bg-card-bg-hover text-text-primary rounded-xl font-medium transition-all duration-300 flex items-center gap-2 backdrop-blur-md hover:-translate-y-0.5 shadow-sm text-sm md:text-base"
                    >
                        <FileText className="w-4 h-4 text-primary" />
                        <span>Download Resume</span>
                    </a>
                </div>

                {/* Stats / Credentials Metric Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto pt-3 md:pt-4">
                    {metrics.map((m, idx) => {
                        const Icon = m.icon;
                        return (
                            <motion.div
                                key={m.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 + idx * 0.06, duration: 0.45 }}
                                whileHover={{ y: -2 }}
                                className="p-3.5 rounded-2xl bg-card-bg border border-border hover:border-primary/30 backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center text-center shadow-sm"
                            >
                                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-1.5">
                                    <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="text-base md:text-lg font-bold font-mono text-text-primary tracking-tight">
                                    {m.value}
                                </div>
                                <div className="text-[10px] md:text-[11px] text-text-tertiary mt-0.5 font-medium">
                                    {m.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Social Channels */}
                <div className="flex gap-5 justify-center items-center pt-2 text-text-tertiary">
                    <a
                        href="https://github.com/9046balaji"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-card-bg"
                        title="GitHub Profile"
                    >
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/konda-balaji-rao/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-card-bg"
                        title="LinkedIn Profile"
                    >
                        <Linkedin className="w-5 h-5" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                        href="https://leetcode.com/u/KBalajiRao/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-card-bg"
                        title="LeetCode Profile"
                    >
                        <Code className="w-5 h-5" />
                        <span className="sr-only">LeetCode</span>
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

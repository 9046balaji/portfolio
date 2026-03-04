"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Code, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import NeuralBackground from "./NeuralBackground";

const stats = [
    { value: "10+", label: "AI/ML Models Built", icon: "🧠" },
    { value: "5+", label: "Cloud Deployments", icon: "☁️" },
    { value: "15+", label: "Deep Learning Projects", icon: "⚡" },
    { value: "3+", label: "CI/CD Pipelines", icon: "🔄" },
];

export default function Hero() {
    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden pt-20">
            {/* Background Elements */}
            <NeuralBackground />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[128px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto space-y-8"
            >
                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary p-[3px]">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                            <Image
                                src="/assets/profile.png"
                                alt="Konda Balaji Rao"
                                width={160}
                                height={160}
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-primary font-mono text-sm md:text-base tracking-wider uppercase"
                    >
                        AI/ML Engineer & Cloud Architect
                    </motion.h2>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Intelligent AI Systems</span> <br className="hidden md:block" />
                        with Deep Learning & Cloud.
                    </h1>

                    <p className="text-lg md:text-xl text-text-tertiary max-w-2xl mx-auto leading-relaxed">
                        AI/ML & Deep Learning Engineer building production-grade models and deploying them at scale with DevOps & Cloud.
                        Creator of <span className="text-secondary font-semibold">HeartGuard AI</span>.
                    </p>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-6"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -4 }}
                            className="p-5 rounded-xl bg-gradient-to-br from-card-bg to-card-bg/80 border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default"
                        >
                            <div className="text-2xl mb-1">{stat.icon}</div>
                            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{stat.value}</div>
                            <div className="text-sm text-text-tertiary mt-1 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link
                        href="#projects"
                        className="px-8 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2 group"
                    >
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                        href="/assets/Konda_Balaji_Rao_Resume.pdf"
                        download="Konda_Balaji_Rao_Resume.pdf"
                        className="px-8 py-3 border border-border hover:border-primary/30 hover:bg-card-bg rounded-lg font-medium transition-all flex items-center gap-2"
                    >
                        <FileText className="w-4 h-4" />
                        Download Resume
                    </a>
                </div>

                <div className="flex gap-6 justify-center items-center pt-8 text-text-tertiary">
                    <a href="https://github.com/9046balaji" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        <Github className="w-6 h-6" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/konda-balaji-rao-0a93313a0/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        <Linkedin className="w-6 h-6" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="https://leetcode.com/u/KBalajiRao/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        <Code className="w-6 h-6" />
                        <span className="sr-only">LeetCode</span>
                    </a>
                </div>
            </motion.div>
        </section>
    );
}


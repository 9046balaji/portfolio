"use client";

import { motion } from "framer-motion";
import { Heart, Brain, Code2, Rocket, Target, Sparkles } from "lucide-react";
import Image from "next/image";

const highlights = [
    {
        icon: Brain,
        title: "AI & Machine Learning",
        description: "Passionate about building intelligent systems that solve real-world problems, especially in healthcare."
    },
    {
        icon: Heart,
        title: "Healthcare Technology",
        description: "Dedicated to leveraging AI to improve patient outcomes and make healthcare more accessible."
    },
    {
        icon: Code2,
        title: "Full-Stack Development",
        description: "Building scalable applications from database architecture to responsive frontends."
    },
    {
        icon: Rocket,
        title: "System Architecture",
        description: "Designing robust, production-grade systems that handle complex data flows efficiently."
    }
];

const interests = [
    "Agentic AI Systems",
    "Medical AI",
    "Knowledge Graphs",
    "RAG Pipelines",
    "Deep Learning",
    "Computer Vision",
    "System Design",
    "Open Source"
];

export default function About() {
    return (
        <section id="about" className="py-20 px-4 bg-black/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A glimpse into who I am and what drives my passion for technology.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <p className="text-lg text-gray-300 leading-relaxed">
                                I'm <span className="text-primary font-semibold">Konda Balaji Rao</span>, a B.Tech student
                                specializing in <span className="text-secondary">Artificial Intelligence & Machine Learning</span> at
                                Vignan's Foundation for Science, Technology and Research.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                My journey in tech started with a curiosity about how machines can learn and make decisions.
                                This curiosity has evolved into a deep passion for building AI systems that can genuinely
                                help people—particularly in healthcare where the stakes are high and the impact is profound.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                When I'm not coding, you'll find me exploring the latest research papers, contributing to
                                open-source projects, or working on my next big idea. I believe in learning by building,
                                and every project is an opportunity to push my boundaries.
                            </p>
                        </div>

                        {/* Interests Tags */}
                        <div className="pt-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-secondary" />
                                <span className="text-sm font-medium text-white">Interests & Focus Areas</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {interests.map((interest, index) => (
                                    <motion.span
                                        key={interest}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-primary/50 hover:text-primary transition-colors"
                                    >
                                        {interest}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Highlights Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {highlights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-white/10">
                        <Target className="w-8 h-8 text-secondary mx-auto mb-4" />
                        <blockquote className="text-xl md:text-2xl font-medium text-white max-w-3xl mx-auto leading-relaxed">
                            "My mission is to build AI systems that are not just intelligent, but also
                            <span className="text-primary"> trustworthy</span>,
                            <span className="text-secondary"> explainable</span>, and
                            <span className="text-primary"> impactful</span>—especially in domains where accuracy matters most."
                        </blockquote>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

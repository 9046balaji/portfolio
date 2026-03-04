"use client";

import { motion } from "framer-motion";
import { Heart, Brain, Code2, Rocket, Target, Sparkles } from "lucide-react";
import Image from "next/image";

const highlights = [
    {
        icon: Brain,
        title: "AI & Machine Learning",
        description: "Passionate about building intelligent ML models and systems that solve real-world problems, especially in healthcare."
    },
    {
        icon: Heart,
        title: "Deep Learning & CV",
        description: "Designing neural networks for computer vision, NLP, and medical image analysis with TensorFlow & PyTorch."
    },
    {
        icon: Rocket,
        title: "DevOps & Cloud",
        description: "Deploying and scaling AI models on AWS with CI/CD pipelines, Docker, and infrastructure automation."
    },
    {
        icon: Code2,
        title: "MLOps & Research",
        description: "End-to-end ML lifecycle management — from experiment tracking to production monitoring and retraining."
    }
];

const interests = [
    "Deep Learning",
    "Computer Vision",
    "Medical AI",
    "MLOps",
    "Cloud Architecture",
    "RAG Pipelines",
    "Agentic AI Systems",
    "CI/CD & Automation",
    "Open Source"
];

export default function About() {
    return (
        <section id="about" className="py-20 px-4 bg-section-alt">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <p className="text-text-tertiary max-w-2xl mx-auto">
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
                            <p className="text-lg text-text-secondary leading-relaxed">
                                I'm <span className="text-primary font-semibold">Konda Balaji Rao</span>, a B.Tech student
                                specializing in <span className="text-secondary">Artificial Intelligence & Machine Learning</span> at
                                Vignan's Foundation for Science, Technology and Research.
                            </p>
                            <p className="text-text-tertiary leading-relaxed">
                                I'm deeply fascinated by how deep learning and intelligent systems can transform raw data into
                                life-saving decisions. My core expertise lies in <span className="text-primary">AI/ML</span>,
                                <span className="text-secondary"> Deep Learning</span>, and
                                <span className="text-primary"> DevOps & Cloud</span> — building production-grade models
                                and deploying them reliably at scale.
                            </p>
                            <p className="text-text-tertiary leading-relaxed">
                                From training neural networks for medical image analysis to setting up CI/CD pipelines on AWS,
                                I enjoy the full spectrum of taking an AI idea from research to real-world deployment.
                                When I'm not coding, you'll find me reading the latest ML papers or experimenting with new architectures.
                            </p>
                        </div>

                        {/* Interests Tags */}
                        <div className="pt-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-secondary" />
                                <span className="text-sm font-medium text-text-primary">Interests & Focus Areas</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {interests.map((interest, index) => (
                                    <motion.span
                                        key={interest}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="px-3 py-1 bg-card-bg border border-border rounded-full text-sm text-text-secondary hover:border-primary/50 hover:text-primary transition-colors"
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
                                    className="p-5 rounded-xl bg-card-bg border border-border hover:border-primary/30 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                                    <p className="text-sm text-text-tertiary leading-relaxed">{item.description}</p>
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
                    <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-border">
                        <Target className="w-8 h-8 text-secondary mx-auto mb-4" />
                        <blockquote className="text-xl md:text-2xl font-medium text-text-primary max-w-3xl mx-auto leading-relaxed">
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

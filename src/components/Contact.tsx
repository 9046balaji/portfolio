"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Code, Send, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import CommunityHub from "./CommunityHub";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "balajikonda9046@gmail.com",
        href: "mailto:balajikonda9046@gmail.com",
        subtext: "Fastest response via email",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+91 83096 36226",
        href: "tel:+918309636226",
        subtext: "Available Mon – Sat IST",
        color: "from-emerald-500 to-teal-500"
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Andhra Pradesh, India",
        href: null,
        subtext: "Open to Remote & Relocation",
        color: "from-purple-500 to-indigo-500"
    }
];

const socialLinks = [
    {
        icon: Github,
        label: "GitHub",
        href: "https://github.com/9046balaji",
        username: "@9046balaji",
        meta: "2,000+ Contributions",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/konda-balaji-rao/",
        username: "Konda Balaji Rao",
        meta: "Professional Network",
    },
    {
        icon: Code,
        label: "LeetCode",
        href: "https://leetcode.com/u/KBalajiRao/",
        username: "@KBalajiRao",
        meta: "Data Structures & Algos",
    }
];

export default function Contact() {
    return (
        <section id="contact" className="relative overflow-hidden py-16 md:py-20 px-4 transition-colors duration-300">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/3 bottom-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-2"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-mono font-medium text-primary backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-secondary animate-pulse" />
                        Let&apos;s Connect &amp; Collaborate
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
                        Get In Touch
                    </h2>
                    <p className="max-w-2xl mx-auto text-xs md:text-sm text-text-tertiary leading-relaxed">
                        Actively seeking full-time roles &amp; semester internships across Cloud and DevOps Engineering — eager to build, automate, and scale reliable systems.
                    </p>

                    <div className="pt-2">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Available for Full-Time Roles &amp; Internships · Immediate Joiner
                        </span>
                    </div>
                </motion.div>

                {/* Direct Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {contactInfo.map((info, index) => {
                        const Icon = info.icon;
                        const cardContent = (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                whileHover={{ y: -2 }}
                                className="p-5 rounded-2xl bg-card-bg border border-border hover:border-primary/40 transition-all duration-300 text-center h-full shadow-sm hover:shadow-md backdrop-blur-md flex flex-col items-center justify-center space-y-2 group"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} p-[1px]`}>
                                    <div className="w-full h-full rounded-xl bg-background flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <Icon className="w-5 h-5 text-text-primary" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                                        {info.label}
                                    </h3>
                                    <p className="text-sm md:text-base font-bold text-text-primary mt-0.5 break-all">
                                        {info.value}
                                    </p>
                                    <span className="text-[11px] text-text-tertiary font-mono">
                                        {info.subtext}
                                    </span>
                                </div>
                            </motion.div>
                        );

                        return info.href ? (
                            <a key={index} href={info.href} className="block h-full">
                                {cardContent}
                            </a>
                        ) : (
                            <div key={index} className="h-full">
                                {cardContent}
                            </div>
                        );
                    })}
                </div>

                {/* Interactive Visitor Hub: Recruiter Inquiry, Guestbook & Roadmap Poll */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <CommunityHub />
                </motion.div>

                {/* Social Networks & Professional Profiles */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                    className="space-y-3 text-center"
                >
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                        Verified Profiles &amp; Open Source
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-2.5 bg-card-bg border border-border rounded-xl hover:border-primary/50 hover:bg-card-bg-hover transition-all duration-300 group shadow-sm"
                                >
                                    <Icon className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                                            {social.label}
                                        </div>
                                        <div className="text-[10px] text-text-tertiary font-mono">
                                            {social.meta}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Final Call to Action Box */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-center pt-2"
                >
                    <div className="inline-block w-full max-w-3xl p-6 md:p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-card-bg to-secondary/10 border border-primary/20 backdrop-blur-md shadow-xl space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                                Ready to Build &amp; Automate Resilient Systems
                            </h3>
                            <p className="text-xs md:text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
                                Looking for an adaptable engineer to automate your CI/CD pipelines, provision AWS cloud infrastructure with Terraform, enforce 99.9% uptime with SRE observability, or deploy production AI workloads? Let&apos;s build together.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <a
                                href="mailto:balajikonda9046@gmail.com"
                                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary via-indigo-600 to-accent-violet shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-xs md:text-sm"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>Send an Email</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/konda-balaji-rao/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2.5 border border-border hover:border-primary/40 bg-card-bg hover:bg-card-bg-hover text-text-primary rounded-xl font-medium transition-all duration-300 flex items-center gap-2 backdrop-blur-md hover:-translate-y-0.5 shadow-sm text-xs md:text-sm"
                            >
                                <Linkedin className="w-3.5 h-3.5 text-primary" />
                                <span>Connect on LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Code, Send } from "lucide-react";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "balajikonda9046@gmail.com",
        href: "mailto:balajikonda9046@gmail.com",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+91 83096 36226",
        href: "tel:+918309636226",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Guntur, Andhra Pradesh, India",
        href: null,
        color: "from-purple-500 to-pink-500"
    }
];

const socialLinks = [
    {
        icon: Github,
        label: "GitHub",
        href: "https://github.com/9046balaji",
        username: "@9046balaji",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/konda-balaji-rao/",
        username: "Konda Balaji Rao",
    },
    {
        icon: Code,
        label: "LeetCode",
        href: "https://leetcode.com/u/KBalajiRao/",
        username: "@KBalajiRao",
    }
];

export default function Contact() {
    return (
        <section id="contact" className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-text-tertiary max-w-2xl mx-auto">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {contactInfo.map((info, index) => {
                        const Icon = info.icon;
                        const content = (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl -z-10"
                                    style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                                />
                                <div className="p-6 rounded-xl bg-card-bg border border-border hover:border-primary/20 transition-all duration-300 text-center h-full">
                                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${info.color} p-[1px]`}>
                                        <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-text-primary mb-2">{info.label}</h3>
                                    <p className="text-text-tertiary text-sm break-all">{info.value}</p>
                                </div>
                            </motion.div>
                        );

                        return info.href ? (
                            <a key={index} href={info.href} className="block">
                                {content}
                            </a>
                        ) : (
                            <div key={index}>{content}</div>
                        );
                    })}
                </div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                >
                    <h3 className="text-xl font-semibold text-text-primary mb-6">Connect With Me</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-6 py-3 bg-card-bg border border-border rounded-xl hover:border-primary/50 hover:bg-card-bg-hover transition-all duration-300 group"
                                >
                                    <Icon className="w-5 h-5 text-text-tertiary group-hover:text-primary transition-colors" />
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">{social.label}</div>
                                        <div className="text-xs text-text-tertiary">{social.username}</div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                        <h3 className="text-2xl font-bold text-text-primary mb-4">Let's Build Something Amazing</h3>
                        <p className="text-text-tertiary mb-6 max-w-md mx-auto">
                            Looking for a passionate AI engineer to bring your ideas to life? I'd love to hear from you.
                        </p>
                        <a
                            href="mailto:balajikonda9046@gmail.com"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                        >
                            <Send className="w-4 h-4" />
                            Send Me a Message
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

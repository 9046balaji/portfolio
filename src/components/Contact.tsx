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
        color: "hover:bg-gray-700"
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/konda-balaji-rao-0a93313a0/",
        username: "Konda Balaji Rao",
        color: "hover:bg-blue-700"
    },
    {
        icon: Code,
        label: "LeetCode",
        href: "https://leetcode.com/u/KBalajiRao/",
        username: "@KBalajiRao",
        color: "hover:bg-orange-600"
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
                    <p className="text-gray-400 max-w-2xl mx-auto">
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
                                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 text-center h-full">
                                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${info.color} p-[1px]`}>
                                        <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{info.label}</h3>
                                    <p className="text-gray-400 text-sm break-all">{info.value}</p>
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
                    <h3 className="text-xl font-semibold text-white mb-6">Connect With Me</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl ${social.color} transition-all duration-300 group`}
                                >
                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white">{social.label}</div>
                                        <div className="text-xs text-gray-500">{social.username}</div>
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
                        <h3 className="text-2xl font-bold text-white mb-4">Let's Build Something Amazing</h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
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

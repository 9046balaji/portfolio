"use client";

import { Github, Linkedin, Code, Mail, Heart } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    { icon: Github, href: "https://github.com/9046balaji", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/konda-balaji-rao-0a93313a0/", label: "LinkedIn" },
    { icon: Code, href: "https://leetcode.com/u/KBalajiRao/", label: "LeetCode" },
    { icon: Mail, href: "mailto:balajikonda9046@gmail.com", label: "Email" },
];

const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

export default function Footer() {
    return (
        <footer className="py-12 border-t border-white/10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold font-mono text-primary">
                            &lt;KBR /&gt;
                        </Link>
                        <p className="text-gray-400 text-sm">
                            AI & Full Stack Engineer building intelligent systems that make a difference.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target={social.href.startsWith("mailto") ? undefined : "_blank"}
                                        rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 transition-all"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-4 h-4 text-gray-400 hover:text-white" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="text-gray-400">
                                <span className="text-gray-500">Email:</span>{" "}
                                <a href="mailto:balajikonda9046@gmail.com" className="hover:text-primary transition-colors">
                                    balajikonda9046@gmail.com
                                </a>
                            </li>
                            <li className="text-gray-400">
                                <span className="text-gray-500">Location:</span>{" "}
                                Guntur, Andhra Pradesh, India
                            </li>
                            <li className="text-gray-400">
                                <span className="text-gray-500">Status:</span>{" "}
                                <span className="text-green-400">Open to opportunities</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Konda Balaji Rao. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 text-red-500 fill-current" /> using Next.js, Tailwind CSS & Framer Motion
                    </p>
                </div>
            </div>
        </footer>
    );
}


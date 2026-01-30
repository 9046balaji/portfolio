"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
    {
        degree: "B.Tech in Computer Science (AIML)",
        institution: "Vignan's Foundation for Science, Technology and Research",
        score: "CGPA: 7.50",
        status: "3rd Year (6th Sem)",
        year: "2023 - Present" // Assuming start year based on 3rd year
    },
    {
        degree: "Intermediate (12th Grade)",
        institution: "Sri Chaitanya Junior College",
        score: "9.54 CGPA (95%)",
        year: "2021 - 2023"
    },
    {
        degree: "SSC (10th Grade)",
        institution: "Z.P. High School",
        score: "9.58 CGPA (96%)",
        year: "2021"
    }
];

export default function Education() {
    return (
        <section id="education" className="py-20 px-4 bg-black/50">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
                    <p className="text-gray-400">
                        Academic foundation and achievements.
                    </p>
                </motion.div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <GraduationCap className="w-5 h-5 text-primary" />
                            </div>

                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                    <h3 className="font-bold text-lg text-white">{edu.degree}</h3>
                                    <span className="text-xs font-mono text-gray-400 bg-white/10 px-2 py-1 rounded">{edu.year}</span>
                                </div>
                                <p className="text-primary font-medium mb-2">{edu.institution}</p>
                                <div className="flex gap-4 text-sm text-gray-400">
                                    <span>{edu.score}</span>
                                    {edu.status && <span>• {edu.status}</span>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

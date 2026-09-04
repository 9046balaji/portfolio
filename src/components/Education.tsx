"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, Sparkles, MapPin } from "lucide-react";

const education = [
    {
        degree: "B.Tech in Computer Science and Engineering (AI & ML)",
        institution: "Vignan's Foundation for Science, Technology and Research (VFSTR)",
        location: "Guntur, Andhra Pradesh",
        score: "CGPA: 7.4",
        status: "Graduation: 2027",
        year: "2023 - 2027",
        courses: [
            "Operating Systems",
            "Computer Networks",
            "Cloud Computing",
            "System Design",
            "Software Engineering",
            "Database Management",
        ],
        highlight: "Core focus on distributed systems, Linux internals, cloud architectures, and machine learning infrastructure."
    },
    {
        degree: "Intermediate (Class XII — MPC)",
        institution: "Sri Chaitanya Junior College",
        location: "Andhra Pradesh",
        score: "9.54 CGPA (95.4%)",
        year: "2021 - 2023",
        courses: ["Mathematics", "Physics", "Chemistry"],
        highlight: "Graduated with top academic distinction in mathematics and analytical problem solving."
    },
    {
        degree: "Secondary School Certificate (Class X - SSC)",
        institution: "Z.P. High School",
        location: "Andhra Pradesh",
        score: "9.58 CGPA (95.8%)",
        year: "2019 - 2021",
        courses: ["General Science", "Mathematics", "Social Studies"],
        highlight: "Achieved outstanding school rank with consistent academic excellence."
    }
];

export default function Education() {
    return (
        <section id="education" className="relative overflow-hidden py-16 md:py-20 px-4 bg-section-alt transition-colors duration-300">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute right-1/4 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto space-y-10">
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
                        Academic Foundation &amp; Systems Rigor
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
                        Education
                    </h2>
                    <p className="max-w-xl mx-auto text-xs md:text-sm text-text-tertiary leading-relaxed">
                        Computer science fundamentals, operating systems, networks, and distributed systems coursework grounding my engineering practice.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/30 before:via-border before:to-transparent">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                            className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            {/* Timeline Node Icon */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card-bg shadow-md shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:border-primary/50 group-hover:scale-105 transition-all duration-300">
                                <GraduationCap className="w-4 h-4 text-primary" />
                            </div>

                            {/* Card Content */}
                            <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-5 md:p-6 rounded-2xl border border-border bg-card-bg hover:border-primary/40 shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-300 space-y-3">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                        {edu.year}
                                    </span>
                                    <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                        {edu.score}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-bold text-sm md:text-base text-text-primary">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-xs md:text-sm text-text-secondary font-medium mt-0.5">
                                        {edu.institution}
                                    </p>
                                    <div className="flex items-center gap-1 text-[11px] text-text-tertiary mt-1">
                                        <MapPin className="w-3 h-3 text-secondary" />
                                        <span>{edu.location}</span>
                                        {edu.status && <span className="ml-2">• {edu.status}</span>}
                                    </div>
                                </div>

                                <p className="text-[11px] text-text-tertiary leading-snug">
                                    {edu.highlight}
                                </p>

                                {/* Coursework Tags */}
                                {edu.courses && (
                                    <div className="pt-2 border-t border-border/40">
                                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-tertiary mb-1.5 uppercase tracking-wider">
                                            <BookOpen className="w-3 h-3 text-primary" />
                                            <span>Relevant Coursework:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {edu.courses.map((course) => (
                                                <span
                                                    key={course}
                                                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-card-bg-hover text-text-secondary border border-border/70"
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

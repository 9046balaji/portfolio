"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, MapPin, RotateCcw, Maximize2 } from "lucide-react";

interface Certificate {
    title: string;
    issuer: string;
    grade?: string;
    level?: string;
    score?: string;
    details?: string[];
    description?: string;
    date: string;
    location?: string;
    verificationNumber?: string;
    certificateNumber?: string;
    icon: string;
    certificateUrl: string;
}

const certifications: Certificate[] = [
    {
        title: "Cambridge English - Preliminary English Test (PET)",
        issuer: "Cambridge University Press & Assessment",
        grade: "Grade C",
        level: "B1 (Council of Europe Level)",
        score: "Overall Score: 141",
        details: [
            "Reading: 137",
            "Writing: 148",
            "Listening: 132",
            "Speaking: 147"
        ],
        date: "May 2024",
        location: "Guntur, Andhra Pradesh",
        verificationNumber: "C6512987",
        certificateNumber: "C6828556",
        icon: "🇬🇧",
        certificateUrl: "/certificates/pet_exam.pdf"
    },
    {
        title: "Generative AI Certificate",
        issuer: "Professional Certification",
        description: "Comprehensive training in Generative AI technologies and applications",
        date: "2024",
        icon: "🤖",
        certificateUrl: "/certificates/generative_ai_certificate.pdf"
    }
];

// Flip Card Component
function FlipCard({ cert, index }: { cert: Certificate; index: number }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-[420px] cursor-pointer group"
                style={{ perspective: "1000px" }}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="relative w-full h-full"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front Side - Certificate Info */}
                    <div
                        className="absolute inset-0 p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden">
                            <div className="absolute -inset-[100%] animate-spin-slow bg-gradient-conic from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Icon Badge */}
                        <div className="absolute -top-4 -right-4 w-14 h-14 flex items-center justify-center text-2xl bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full border border-white/20 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                            {cert.icon}
                        </div>

                        {/* Flip Indicator */}
                        <div className="absolute top-4 right-4 text-xs text-gray-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <RotateCcw className="w-3 h-3" />
                            Click to flip
                        </div>

                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4 relative z-10">
                            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 group-hover:scale-105 transition-transform">
                                <Award className="w-7 h-7 text-primary" />
                            </div>
                            <div className="flex-1 pt-1">
                                <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors leading-tight">
                                    {cert.title}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
                            </div>
                        </div>

                        {/* Grade/Level Badges */}
                        {cert.grade && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1.5 text-sm font-semibold bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 rounded-full border border-green-500/20">
                                    {cert.grade}
                                </span>
                                <span className="px-3 py-1.5 text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                    {cert.level}
                                </span>
                            </div>
                        )}

                        {/* Score */}
                        {cert.score && (
                            <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary">
                                <p className="text-primary font-bold text-lg">{cert.score}</p>
                            </div>
                        )}

                        {/* Details */}
                        {cert.details && (
                            <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-lg bg-white/5 border border-white/5">
                                {cert.details.map((detail, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="text-sm text-gray-300 flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                        {detail}
                                    </motion.span>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        {cert.description && (
                            <p className="text-gray-400 mb-4 leading-relaxed">{cert.description}</p>
                        )}

                        {/* Footer */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400 pt-4 border-t border-white/10">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-primary/70" />
                                    {cert.date}
                                </span>
                                {cert.location && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-primary/70" />
                                        {cert.location}
                                    </span>
                                )}
                            </div>
                            {cert.verificationNumber && (
                                <div className="mt-2 text-xs text-gray-600">
                                    Verification: {cert.verificationNumber}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Back Side - Certificate Preview */}
                    <div
                        className="absolute inset-0 rounded-xl border border-primary/30 bg-gray-900 overflow-hidden"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 bg-black/50 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{cert.icon}</span>
                                <span className="text-sm font-medium text-white truncate max-w-[200px]">
                                    {cert.title}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(true);
                                    }}
                                    className="p-1.5 rounded-lg bg-white/10 hover:bg-primary/20 transition-colors"
                                    title="Expand"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <RotateCcw className="w-3 h-3" />
                                    Flip back
                                </span>
                            </div>
                        </div>

                        {/* PDF Preview */}
                        <div className="relative h-[calc(100%-48px)]">
                            <iframe
                                src={`${cert.certificateUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                className="w-full h-full border-0"
                                title={cert.title}
                            />
                            {/* Watermark overlay */}
                            <div 
                                className="absolute inset-0 pointer-events-none select-none"
                                style={{ 
                                    background: "repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(0,0,0,0.02) 50px, rgba(0,0,0,0.02) 100px)"
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
            </motion.div>

            {/* Expanded Modal View */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                    onClick={() => setIsExpanded(false)}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-full max-w-5xl h-[85vh] bg-gray-900 rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-black/50 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{cert.icon}</span>
                                <div>
                                    <h3 className="font-bold text-white">{cert.title}</h3>
                                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm"
                            >
                                Close (ESC)
                            </button>
                        </div>

                        {/* Full PDF View */}
                        <div className="relative h-[calc(100%-64px)]">
                            <iframe
                                src={`${cert.certificateUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                                className="w-full h-full border-0"
                                title={cert.title}
                            />
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 text-center">
                            <p className="text-xs text-gray-500">
                                This certificate is for viewing purposes only • © {cert.issuer}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}

export default function Certifications() {
    return (
        <section id="certifications" className="py-20 px-4 bg-black/30 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
                    >
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">Achievements</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                            Certifications
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Professional certifications and achievements that validate my skills and expertise
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        💡 Click on a card to view the certificate
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {certifications.map((cert, index) => (
                        <FlipCard key={index} cert={cert} index={index} />
                    ))}
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx global>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
                .bg-gradient-conic {
                    background: conic-gradient(var(--tw-gradient-stops));
                }
            `}</style>
        </section>
    );
}

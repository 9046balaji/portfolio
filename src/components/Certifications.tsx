"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, Maximize2, X, Sparkles } from "lucide-react";
import Image from "next/image";

interface Certificate {
    title: string;
    issuer: string;
    grade?: string;
    level?: string;
    score?: string;
    details?: string[];
    description?: string;
    date: string;
    icon: string;
    certificateImage: string;
    color: string;
}

const certifications: Certificate[] = [
    {
        title: "Cambridge English PET",
        issuer: "Cambridge University",
        grade: "Grade C",
        level: "B1 Level",
        score: "Score: 141",
        details: ["Reading: 137", "Writing: 148", "Listening: 132", "Speaking: 147"],
        date: "May 2024",
        icon: "🇬🇧",
        certificateImage: "/certificates/pet_exam.png",
        color: "#3b82f6",
    },
    {
        title: "Generative AI",
        issuer: "Professional Certification",
        description: "Comprehensive Generative AI technologies & applications",
        date: "2024",
        icon: "🤖",
        certificateImage: "/certificates/generative_ai_certificate.png",
        color: "#8b5cf6",
    },
    {
        title: "E-Business",
        issuer: "NPTEL / SWAYAM",
        description: "Electronic business strategies, digital commerce & enterprise frameworks",
        date: "2024",
        icon: "💼",
        certificateImage: "/certificates/E-Business.png",
        color: "#f59e0b",
    },
    {
        title: "Organizational Behaviour",
        issuer: "NPTEL / SWAYAM",
        description: "Organizational dynamics, leadership, and management behaviour",
        date: "2024",
        icon: "🏛️",
        certificateImage: "/certificates/Organizational Behaviour.png",
        color: "#10b981",
    },
];

/* ─── Image Modal ─── */
function CertificateModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl overflow-hidden border border-border shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-background/80 border-b border-border">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{cert.icon}</span>
                        <div>
                            <h3 className="font-bold text-text-primary">{cert.title}</h3>
                            <p className="text-sm text-text-tertiary">{cert.issuer}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg bg-card-bg hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Certificate Image */}
                <div className="overflow-auto max-h-[calc(90vh-80px)] p-4 flex justify-center bg-background/50">
                    <Image
                        src={cert.certificateImage}
                        alt={`${cert.title} Certificate`}
                        width={1200}
                        height={900}
                        className="w-full h-auto max-w-3xl rounded-lg shadow-lg"
                        quality={100}
                        priority
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─── Main Component ─── */
export default function Certifications() {
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsInView(true);
            },
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const totalCards = certifications.length;

    return (
        <section
            id="certifications"
            className="py-20 px-4 bg-section-alt overflow-hidden"
            ref={containerRef}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
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
                        <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                            Certifications
                        </span>
                    </h2>
                    <p className="text-text-tertiary max-w-md mx-auto">
                        Professional certifications validating my skills and expertise
                    </p>
                </motion.div>

                {/* ─── 3D Carousel ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="carousel-wrapper"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className={`carousel-inner ${isPaused ? "paused" : ""}`}>
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className="carousel-card"
                                style={{
                                    "--index": index,
                                    "--cards-count": totalCards,
                                    "--color": cert.color,
                                } as React.CSSProperties}
                                onClick={() => setSelectedCert(cert)}
                            >
                                <div className="card-face">
                                    {/* Color accent top */}
                                    <div
                                        className="card-accent-strip"
                                        style={{
                                            background: `linear-gradient(90deg, ${cert.color}, ${cert.color}80, transparent)`,
                                        }}
                                    />

                                    <div className="card-content">
                                        {/* Icon + Badge */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div
                                                className="card-icon"
                                                style={{
                                                    background: `linear-gradient(135deg, ${cert.color}25, ${cert.color}08)`,
                                                    borderColor: `${cert.color}35`,
                                                }}
                                            >
                                                <span className="text-xl">{cert.icon}</span>
                                            </div>
                                            <div
                                                className="card-verified-badge"
                                                style={{
                                                    color: cert.color,
                                                    borderColor: `${cert.color}30`,
                                                    background: `${cert.color}10`,
                                                }}
                                            >
                                                ✓ Verified
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-sm font-bold text-text-primary mb-0.5 leading-tight">
                                            {cert.title}
                                        </h3>
                                        <p className="text-[10px] text-text-muted mb-2">{cert.issuer}</p>

                                        {/* Badges */}
                                        {cert.grade && (
                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                <span className="cert-badge bg-green-500/15 text-green-400 border-green-500/20">
                                                    {cert.grade}
                                                </span>
                                                <span
                                                    className="cert-badge"
                                                    style={{
                                                        color: cert.color,
                                                        borderColor: `${cert.color}25`,
                                                        background: `${cert.color}12`,
                                                    }}
                                                >
                                                    {cert.level}
                                                </span>
                                            </div>
                                        )}

                                        {/* Score */}
                                        {cert.score && (
                                            <div className="cert-score-bar">
                                                <p className="text-primary font-bold text-[11px]">{cert.score}</p>
                                            </div>
                                        )}

                                        {/* Description */}
                                        {cert.description && (
                                            <p className="text-[10px] text-text-tertiary mb-2 line-clamp-2 leading-relaxed">
                                                {cert.description}
                                            </p>
                                        )}

                                        {/* Footer */}
                                        <div className="card-footer">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {cert.date}
                                            </span>
                                            <span className="card-view-hint">
                                                <Maximize2 className="w-3 h-3" />
                                                View
                                            </span>
                                        </div>
                                    </div>

                                    {/* Glow */}
                                    <div className="card-glow" style={{ background: cert.color }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sparkles */}
                    <div className="carousel-sparkles">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="sparkle-dot"
                                style={{
                                    left: `${10 + Math.random() * 80}%`,
                                    top: `${10 + Math.random() * 80}%`,
                                }}
                                animate={{
                                    y: [0, -12, 0],
                                    opacity: [0.15, 0.5, 0.15],
                                    scale: [0.7, 1.1, 0.7],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 4,
                                    ease: "easeInOut",
                                }}
                            >
                                <Sparkles className="w-3 h-3 text-primary/40" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                    className="text-center text-sm text-text-muted mt-8"
                >
                    ✨ Hover to pause rotation • Click a certificate to view
                </motion.p>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <CertificateModal
                        cert={selectedCert}
                        onClose={() => setSelectedCert(null)}
                    />
                )}
            </AnimatePresence>

            {/* ─── 3D Carousel CSS ─── */}
            <style jsx global>{`
                /* ── Wrapper ── */
                .carousel-wrapper {
                    --card-width: 200px;
                    --card-height: 260px;
                    width: 100%;
                    height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 900px;
                    position: relative;
                }

                @media (max-width: 640px) {
                    .carousel-wrapper {
                        --card-width: 160px;
                        --card-height: 220px;
                        height: 340px;
                        perspective: 700px;
                    }
                }

                @media (min-width: 1024px) {
                    .carousel-wrapper {
                        --card-width: 220px;
                        --card-height: 280px;
                        height: 440px;
                        perspective: 1100px;
                    }
                }

                /* ── Inner ── */
                .carousel-inner {
                    position: relative;
                    width: var(--card-width);
                    height: var(--card-height);
                    transform-style: preserve-3d;
                    animation: carousel-spin 16s linear infinite;
                }

                .carousel-inner.paused {
                    animation-play-state: paused;
                }

                @keyframes carousel-spin {
                    from { transform: rotateY(0deg); }
                    to   { transform: rotateY(360deg); }
                }

                /* ── Card positioning in 3D ── */
                .carousel-card {
                    position: absolute;
                    width: var(--card-width);
                    height: var(--card-height);
                    top: 0;
                    left: 0;
                    cursor: pointer;
                    transform:
                        rotateY(calc(360deg / var(--cards-count) * var(--index)))
                        translateZ(calc((var(--card-width) + var(--card-height)) * 0.52));
                    transition: transform 0.4s ease;
                }

                .carousel-card:hover {
                    transform:
                        rotateY(calc(360deg / var(--cards-count) * var(--index)))
                        translateZ(calc((var(--card-width) + var(--card-height)) * 0.52))
                        scale(1.06);
                }

                /* ── Card face ── */
                .card-face {
                    width: 100%;
                    height: 100%;
                    border-radius: 14px;
                    border: 1px solid var(--border);
                    overflow: hidden;
                    position: relative;
                    background: var(--surface);
                    backdrop-filter: blur(12px);
                    box-shadow: 0 8px 32px var(--shadow-color), 0 0 0 1px rgba(255,255,255,0.04);
                    transition: box-shadow 0.3s ease, border-color 0.3s ease;
                }

                .carousel-card:hover .card-face {
                    border-color: var(--color);
                    box-shadow:
                        0 20px 60px color-mix(in srgb, var(--color) 20%, transparent),
                        0 0 30px color-mix(in srgb, var(--color) 10%, transparent);
                }

                .card-accent-strip {
                    height: 3px;
                    width: 100%;
                }

                .card-content {
                    padding: 14px 16px;
                    height: calc(100% - 3px);
                    display: flex;
                    flex-direction: column;
                }

                .card-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid;
                    flex-shrink: 0;
                }

                .card-verified-badge {
                    padding: 2px 7px;
                    border-radius: 999px;
                    font-size: 9px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    border: 1px solid;
                }

                .cert-badge {
                    padding: 2px 7px;
                    font-size: 10px;
                    font-weight: 600;
                    border-radius: 999px;
                    border: 1px solid;
                }

                .cert-score-bar {
                    margin-bottom: 8px;
                    padding: 5px 8px;
                    border-radius: 6px;
                    background: color-mix(in srgb, var(--primary) 8%, transparent);
                    border-left: 2px solid var(--primary);
                }

                .card-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 10px;
                    color: var(--text-muted);
                    padding-top: 6px;
                    border-top: 1px solid var(--border);
                    margin-top: auto;
                }

                .card-view-hint {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    color: var(--primary);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .carousel-card:hover .card-view-hint {
                    opacity: 1;
                }

                .card-glow {
                    position: absolute;
                    bottom: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60%;
                    height: 12px;
                    border-radius: 50%;
                    filter: blur(12px);
                    opacity: 0.06;
                    transition: opacity 0.3s;
                    pointer-events: none;
                }

                .carousel-card:hover .card-glow {
                    opacity: 0.25;
                }

                /* ── Sparkles ── */
                .carousel-sparkles {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: -1;
                }

                .sparkle-dot {
                    position: absolute;
                }

                /* ── Shadow under carousel ── */
                .carousel-wrapper::after {
                    content: "";
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: 30px;
                    background: var(--primary);
                    filter: blur(40px);
                    opacity: 0.08;
                    border-radius: 50%;
                }
            `}</style>
        </section>
    );
}

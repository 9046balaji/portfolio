"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "HeartGuard AI",
        tagline: "AI-Powered Cardiac Health Assistant",
        description: "A medical AI that actually verifies its answers — not guesses them. 10 specialist AI agents backed by 125K+ trusted medical documents. Fine-tuned Google MedGemma for cardiology. HIPAA & GDPR compliant.",
        tech: ["LangGraph", "MedGemma", "FastAPI", "ChromaDB", "PostgreSQL"],
        points: [
            "10 AI agents collaborate like specialist doctors — each handles a different type of medical question.",
            "Self-correcting RAG pipeline verifies every answer against 125K+ medical documents before responding.",
            "55K+ lines of Python across 220+ files — fine-tuned MedGemma with HIPAA-grade security.",
        ],
        links: {
            github: "https://github.com/9046balaji/Heart",
            demo: "/projects/heartguard-ai",
        },
    },
    {
        title: "Aura Bank",
        tagline: "AI-Powered Full-Stack Banking System",
        description: "A comprehensive fintech ecosystem with real-time transactions, AI fraud detection, loan eligibility prediction, and an immersive 3D Three.js login — all on a double-entry ledger for financial integrity.",
        tech: ["React 19", "Node.js", "PostgreSQL", "Python ML", "Three.js"],
        points: [
            "ML models for fraud detection (TF-IDF + Logistic Regression) and loan risk prediction.",
            "Double-entry ledger system guarantees financial data integrity — no balance drift.",
            "3D immersive auth page with Three.js — distinctive UX that sets it apart from template banking apps.",
        ],
        links: {
            github: "https://github.com/9046balaji/bank-management-system",
            demo: "/projects/aura-bank",
        },
    },
    {
        title: "PDF Tools",
        tagline: "Async High-Throughput Document Engine",
        description: "Handles 1GB PDF files without freezing the UI. Celery + Redis task queues offload heavy OCR and compression. Real-time WebSocket progress. AES-256 encryption. Dual interface: Flask web UI + FastAPI REST.",
        tech: ["Python", "Celery", "Redis", "FastAPI", "Flask", "WebSockets"],
        points: [
            "Async task queues (Celery + Redis) handle large-file OCR and compression without blocking.",
            "25+ PDF operations — merge, split, compress, convert, rotate, password-protect, and OCR.",
            "Real-time progress via WebSockets; AES-256 encryption for sensitive document workflows.",
        ],
        links: {
            github: "https://github.com/9046balaji/Pdf-Tools",
            demo: "/projects/pdf-tools",
        },
    },
    {
        title: "Hospital Management System",
        tagline: "Enterprise Healthcare Resource Planning",
        description: "Full-stack appointment and patient management platform with conflict-free scheduling, multi-role access control, and a secure REST API — built with Node.js and PostgreSQL.",
        tech: ["Node.js", "PostgreSQL", "JWT", "REST APIs", "RBAC"],
        points: [
            "Optimized PostgreSQL scheduling logic using constraint checks to prevent doctor double-booking.",
            "Role-Based Access Control (RBAC) with separate permission sets for doctors, patients, and admins.",
            "JWT auth with refresh token rotation and Helmet.js + rate-limiting middleware for API security.",
        ],
        links: {
            github: "https://github.com/9046balaji/Hospital-Management-System",
            demo: "/projects/hospital-management",
        },
    },
    {
        title: "ML & DL Showcase",
        tagline: "34 Notebooks — ML, DL, CV & Image Processing",
        description: "A production-quality collection of 34 Jupyter notebooks across machine learning, deep learning, computer vision, and image processing — built during academic study with real datasets.",
        tech: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn"],
        points: [
            "Heart Disease Prediction: XGBoost + LightGBM + SHAP explainability + Optuna hyperparameter tuning.",
            "Transfer Learning with VGG16, ResNet50, InceptionV3, and MobileNet on custom datasets.",
            "Computer Vision: edge detection, LBP texture analysis, image similarity search, and segmentation.",
        ],
        links: {
            github: "https://github.com/9046balaji/collage-projects",
            demo: "/projects/ml-showcase",
        },
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 px-4 bg-section-alt">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-text-tertiary max-w-2xl mx-auto">
                        A selection of systems I&apos;ve built, focusing on scalability, AI integration, and complex data processing.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-card-bg border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors group flex flex-col"
                        >
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-sm text-secondary font-mono mb-4">{project.tagline}</p>

                                <div className="space-y-4 mb-6">
                                    <p className="text-text-tertiary text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-text-muted space-y-1">
                                        {project.points.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="p-6 pt-0 mt-auto">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs px-2 py-1 bg-card-bg-hover rounded-full text-text-secondary">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-text-tertiary hover:text-foreground transition-colors">
                                        <Github className="w-4 h-4" /> Code
                                    </a>
                                    {project.links.demo !== "#" && (
                                        <Link href={project.links.demo} className="flex items-center gap-2 text-sm text-primary hover:text-foreground transition-colors">
                                            <ExternalLink className="w-4 h-4" /> View Case Study
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

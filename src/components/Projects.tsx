"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
    {
        title: "HeartGuard AI",
        tagline: "HIPAA-compliant Medical Agentic RAG System",
        description: "Most chatbots hallucinate. This system uses a self-correcting RAG pipeline with Knowledge Graphs to ensure medical accuracy. Orchestrated multi-agent workflows using LangGraph for patient triage.",
        tech: ["LangGraph", "Neo4j", "MedGemma", "Vector Search"],
        points: [
            "Orchestrated multi-agent workflows using LangGraph for patient triage.",
            "Reduced medical query response time by 60% using hybrid search (Vector + Knowledge Graph).",
            "Fine-tuned Google's MedGemma model for cardiology-specific nuancing."
        ],
        links: {
            github: "https://github.com/9046balaji", // Placeholder
            demo: "/projects/heartguard-ai"
        }
    },
    {
        title: "PDF Tools (Async Architecture)",
        tagline: "High-Throughput Document Processing Engine",
        description: "Demonstrates understanding of system design, queues, and handling heavy compute loads without blocking the UI.",
        tech: ["Python", "Celery", "Redis", "WebSockets"],
        points: [
            "Implemented asynchronous task queues (Celery + Redis) to handle large file OCR and compression.",
            "Real-time status updates via WebSockets for seamless UX.",
            "Secured workflows with AES-256 encryption."
        ],
        links: {
            github: "https://github.com/9046balaji/Pdf-Tools",
            demo: "/projects/pdf-tools"
        }
    },
    {
        title: "Hospital Management System",
        tagline: "Enterprise Resource Planning for Healthcare",
        description: "Optimized scheduling logic in PostgreSQL to prevent double-booking conflicts. Implemented Role-Based Access Control (RBAC) for doctors, patients, and admins.",
        tech: ["Node.js", "PostgreSQL", "JWT", "REST APIs"],
        points: [
            "Optimized scheduling logic in PostgreSQL to prevent double-booking conflicts.",
            "Implemented Role-Based Access Control (RBAC) for doctors, patients, and admins."
        ],
        links: {
            github: "https://github.com/9046balaji",
            demo: "/projects/hospital-management"
        }
    },
    {
        title: "ML & DL Showcase",
        tagline: "34 Jupyter Notebooks Collection",
        description: "A comprehensive collection of machine learning, deep learning, computer vision, and image processing projects developed during academic study.",
        tech: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn"],
        points: [
            "Heart Disease Prediction with SHAP explainability and ensemble methods.",
            "Transfer Learning with VGG16, ResNet, InceptionV3, MobileNet.",
            "Computer Vision: Edge detection, LBP, Image similarity search."
        ],
        links: {
            github: "https://github.com/9046balaji/collage-projects",
            demo: "/projects/ml-showcase"
        }
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 px-4 bg-black/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A selection of systems I've architected, focusing on scalability, AI integration, and complex data processing.
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
                            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors group flex flex-col"
                        >
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-sm text-secondary font-mono mb-4">{project.tagline}</p>

                                <div className="space-y-4 mb-6">
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                                        {project.points.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="p-6 pt-0 mt-auto">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                        <Github className="w-4 h-4" /> Code
                                    </a>
                                    {project.links.demo !== "#" && (
                                        <a href={project.links.demo} className="flex items-center gap-2 text-sm text-primary hover:text-white transition-colors">
                                            <ExternalLink className="w-4 h-4" /> View Case Study
                                        </a>
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

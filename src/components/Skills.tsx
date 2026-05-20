"use client";

import { motion } from "framer-motion";
import {
    BrainCircuit,
    Cloud,
    Cpu,
    Database,
    LayoutGrid,
    Server,
    Sparkles,
    TrendingUp,
    Wrench,
} from "lucide-react";

const skills = [
    {
        category: "AI Agents & LLMs",
        icon: Cpu,
        featured: true,
        items: ["LangGraph", "LangChain", "RAG Pipelines", "MedGemma", "Fine-tuning (LoRA/QLoRA)", "llama.cpp", "ChromaDB", "Ollama"],
    },
    {
        category: "Deep Learning & CV",
        icon: BrainCircuit,
        featured: true,
        items: ["Keras", "PyTorch", "TensorFlow", "OpenCV", "Transfer Learning", "CNN", "LSTM", "VGG16 / ResNet"],
    },
    {
        category: "Machine Learning",
        icon: TrendingUp,
        items: ["Scikit-learn", "XGBoost", "LightGBM", "SHAP", "Optuna", "Pandas", "NumPy", "spaCy"],
    },
    {
        category: "Backend Engineering",
        icon: Server,
        items: ["Python (FastAPI)", "Python (Flask)", "Node.js (Express)", "REST APIs", "WebSockets", "Celery", "JWT Auth"],
    },
    {
        category: "Databases & Storage",
        icon: Database,
        items: ["PostgreSQL", "Redis", "Supabase", "SQLite"],
    },
    {
        category: "Cloud & DevOps",
        icon: Cloud,
        items: ["AWS (EC2, S3)", "GitHub Actions", "CI/CD", "Linux", "Docker", "Docker Compose", "Terraform", "VPC / Networking"],
    },
    {
        category: "Frontend",
        icon: LayoutGrid,
        items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    },
    {
        category: "Tools & Practices",
        icon: Wrench,
        items: ["Git", "Jupyter", "Google Colab", "VS Code", "MLflow", "Alembic", "Tesseract OCR"],
    },
] as const;

export default function Skills() {
    return (
        <section id="skills" className="relative overflow-hidden py-24 px-4">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/3 top-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute right-1/4 bottom-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.05)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.26em] text-text-tertiary backdrop-blur-md">
                        <Sparkles className="h-4 w-4 text-secondary" />
                        Technical Arsenal
                    </div>
                    <h2 className="mt-5 text-3xl md:text-4xl font-bold text-text-primary">A focused stack for intelligent systems</h2>
                    <p className="mt-4 mx-auto max-w-2xl text-text-tertiary">
                        My strongest areas are AI systems, deep learning, and MLOps, with supporting tooling across cloud, backend, and frontend delivery.
                    </p>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-12">
                    {skills.map((skillGroup, index) => {
                        const Icon = skillGroup.icon;
                        const featured = "featured" in skillGroup;
                        const spanClass = featured ? "lg:col-span-6" : "lg:col-span-4";

                        return (
                            <motion.article
                                key={skillGroup.category}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.22 }}
                                transition={{ duration: 0.5, delay: index * 0.06 }}
                                whileHover={{ y: -5, scale: 1.01 }}
                                className={`${spanClass} relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-md transition-colors hover:border-primary/40`}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_55%)] opacity-80" />
                                <div className="relative flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-primary/10 shadow-inner">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-xl font-semibold text-text-primary">{skillGroup.category}</h3>
                                            {featured ? (
                                                <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                                                    Core focus
                                                </span>
                                            ) : null}
                                        </div>

                                        <p className="mt-2 text-sm leading-relaxed text-text-tertiary">
                                            {skillGroup.category === "AI Agents & LLMs"
                                                ? "Agentic workflows, retrieval, and local/hosted LLM orchestration for practical product systems."
                                                : skillGroup.category === "Deep Learning & CV"
                                                    ? "Model design and training for image understanding, experimentation, and high-signal feature learning."
                                                    : skillGroup.category === "Cloud & DevOps"
                                                        ? "Deployment, automation, and infrastructure patterns that keep ML systems stable and reproducible."
                                                        : "Supporting capabilities that help ship the full stack with speed, clarity, and maintainability."}
                                        </p>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {skillGroup.items.map((item) => (
                                                <span
                                                    key={item}
                                                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-sm text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

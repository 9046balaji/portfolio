"use client";

import { motion } from "framer-motion";

const skills = [
    {
        category: "AI Agents & LLMs",
        items: ["LangGraph", "LangChain", "RAG Pipelines", "MedGemma", "Fine-tuning (LoRA/QLoRA)", "ONNX Runtime"]
    },
    {
        category: "Machine Learning",
        items: ["Scikit-learn", "XGBoost", "LightGBM", "SHAP", "Optuna", "Pandas", "NumPy"]
    },
    {
        category: "Deep Learning & CV",
        items: ["TensorFlow", "Keras", "PyTorch", "OpenCV", "Transfer Learning", "CNN/LSTM"]
    },
    {
        category: "Backend Engineering",
        items: ["Python (FastAPI)", "Node.js", "Celery", "REST APIs", "WebSockets", "Docker"]
    },
    {
        category: "Databases & Storage",
        items: ["PostgreSQL", "Neo4j", "Redis", "pgvector", "SQLAlchemy"]
    },
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
        category: "Cloud & DevOps",
        items: ["AWS (EC2, S3)", "GitHub Actions", "CI/CD", "Linux"]
    },
    {
        category: "Tools & Practices",
        items: ["Git", "Jupyter", "Google Colab", "VS Code", "Agile"]
    }
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
                    <p className="text-gray-400">
                        A comprehensive toolkit for building scalable, intelligent systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors"
                        >
                            <h3 className="text-xl font-bold mb-4 text-primary">{skillGroup.category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 bg-white/5 rounded-md text-sm text-gray-300 border border-white/5"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

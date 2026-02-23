import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HeartGuard AI — Agentic Medical AI System",
    description:
        "A 55K+ line agentic medical AI system with LangGraph orchestrator, 10 specialized agents, MedGemma LLM, Self-RAG pipeline, Neo4j knowledge graph, and HIPAA-compliant security.",
    alternates: {
        canonical: "https://portfolio-sable-tau-b7ysjwnjns.vercel.app/projects/heartguard-ai",
    },
    openGraph: {
        title: "HeartGuard AI — Agentic Medical AI System",
        description:
            "A 55K+ line agentic medical AI system with LangGraph orchestrator, 10 specialized agents, MedGemma LLM, and Self-RAG pipeline.",
        url: "https://kbalajirao.dev/projects/heartguard-ai",
        type: "article",
    },
};

export default function HeartGuardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

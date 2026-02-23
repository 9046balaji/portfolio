import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aura Bank — AI-Powered Banking Management System",
    description:
        "Full-stack banking system with React 19, Node.js, PostgreSQL, and AI-powered fraud detection, loan analysis, and an intelligent chatbot using Ollama and LangChain.",
    alternates: {
        canonical: "https://portfolio-sable-tau-b7ysjwnjns.vercel.app/projects/aura-bank",
    },
    openGraph: {
        title: "Aura Bank — AI-Powered Banking Management System",
        description:
            "Full-stack banking system with React 19, Node.js, PostgreSQL, and AI-powered fraud detection and loan analysis.",
        url: "https://kbalajirao.dev/projects/aura-bank",
        type: "article",
    },
};

export default function AuraBankLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

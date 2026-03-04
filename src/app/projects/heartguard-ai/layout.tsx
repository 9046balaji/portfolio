import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HeartGuard AI — AI-Powered Heart Health Companion",
    description:
        "An intelligent AI system that understands heart health — powered by 8 specialist AI agents, a fine-tuned medical model, and 125K+ medical documents. Built with LangGraph, MedGemma, and healthcare-grade security.",
    alternates: {
        canonical: "https://portfolio-sable-tau-b7ysjwnjns.vercel.app/projects/heartguard-ai",
    },
    openGraph: {
        title: "HeartGuard AI — AI-Powered Heart Health Companion",
        description:
            "An intelligent AI system with 8 specialist agents, fine-tuned MedGemma model, and 125K+ medical documents — built for accuracy, privacy, and trust.",
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

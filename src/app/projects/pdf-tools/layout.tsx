import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PDF Tools — High-Throughput Document Processing Engine",
    description:
        "Enterprise PDF processing engine with 25+ operations, async Celery workers, OCR support, AES-256 encryption, and real-time WebSocket progress tracking.",
    alternates: {
        canonical: "https://portfolio-sable-tau-b7ysjwnjns.vercel.app/projects/pdf-tools",
    },
    openGraph: {
        title: "PDF Tools — High-Throughput Document Processing Engine",
        description:
            "Enterprise PDF processing engine with 25+ operations, async Celery workers, OCR, and AES-256 encryption.",
        url: "https://kbalajirao.dev/projects/pdf-tools",
        type: "article",
    },
};

export default function PDFToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

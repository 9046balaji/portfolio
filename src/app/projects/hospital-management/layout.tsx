import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hospital Management System — Enterprise Healthcare ERP",
    description:
        "Enterprise hospital management system built with Node.js, Express.js, and PostgreSQL. Features RBAC, JWT authentication, appointment scheduling, and RESTful APIs.",
    alternates: {
        canonical: "https://portfolio-sable-tau-b7ysjwnjns.vercel.app/projects/hospital-management",
    },
    openGraph: {
        title: "Hospital Management System — Enterprise Healthcare ERP",
        description:
            "Enterprise hospital management system with appointment scheduling, RBAC, and JWT authentication.",
        url: "https://kbalajirao.dev/projects/hospital-management",
        type: "article",
    },
};

export default function HospitalManagementLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

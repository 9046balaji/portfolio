"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    GraduationCap,
    BookOpen,
    Award,
    Sparkles,
    MapPin,
    ExternalLink,
    CheckCircle2,
    TrendingUp,
    Eye,
    X,
    ZoomIn,
    ZoomOut,
    Layers,
    Clock,
    ChevronRight,
    ShieldCheck,
    Binary,
    ChevronLeft
} from "lucide-react";

// Official Academic Documents for Verification Lightbox
export type DocType = "eapcet" | "inter" | "ssc";

interface AcademicDocument {
    id: DocType;
    tabLabel: string;
    title: string;
    subtitle: string;
    authority: string;
    image: string;
    width: number;
    height: number;
    regNo: string;
    standing: string;
    scoreSummary: string;
    breakdown: { label: string; value: string; isHighlight?: boolean }[];
    attestation: string;
    note: string;
}

const academicDocuments: Record<DocType, AcademicDocument> = {
    eapcet: {
        id: "eapcet",
        tabLabel: "AP EAPCET Rank Card (#9046)",
        title: "AP EAPCET 2023 Rank Card",
        subtitle: "Engineering Entrance Exam (Andhra Pradesh)",
        authority: "JNTU Anantapur & APSCHE",
        image: "/certificates/ap_eapcet_rank_card.webp",
        width: 900,
        height: 707,
        regNo: "50372010169",
        standing: "State Rank: 9046 (Top 5% in State)",
        scoreSummary: "State Rank: 9046 · Region Rank: 6210",
        breakdown: [
            { label: "Student Name", value: "Konda Balaji Rao" },
            { label: "State Rank", value: "#9046 (Top 5%)", isHighlight: true },
            { label: "Region Rank (AU)", value: "6210" },
            { label: "Hall Ticket Number", value: "50372010169" },
            { label: "12th MPC Marks", value: "578 / 600 (96.33%)", isHighlight: true },
            { label: "Total Entrance Score", value: "56.1719" },
        ],
        attestation: "Convener, AP EAPCET - 2023, JNTU Anantapur on behalf of APSCHE",
        note: "This state rank of 9046 out of 200,000+ students is where the username @9046balaji comes from.",
    },
    inter: {
        id: "inter",
        tabLabel: "12th Marks Memo (95.4%)",
        title: "12th Grade (Intermediate) Marks Memo",
        subtitle: "MPC Stream (Maths, Physics, Chemistry)",
        authority: "Board of Intermediate Education, Andhra Pradesh",
        image: "/certificates/intermediate_marks_memo.webp",
        width: 720,
        height: 1024,
        regNo: "2305230178",
        standing: "Total: 954 / 1000 (95.4% — A Grade)",
        scoreSummary: "954 / 1000 · Science & Maths: 578 / 600",
        breakdown: [
            { label: "Student Name", value: "Konda Balaji Rao" },
            { label: "Total Marks", value: "954 / 1000 (95.4%)", isHighlight: true },
            { label: "Final Grade", value: "A Grade (Distinction)", isHighlight: true },
            { label: "Mathematics", value: "294 / 300 (98.0%)" },
            { label: "Physics", value: "147 / 150 (98.0% · 60/60 full marks in 2nd yr)" },
            { label: "Chemistry", value: "137 / 150 (91.3%)" },
            { label: "Sanskrit", value: "196 / 200 (98.0%)" },
            { label: "English", value: "180 / 200 (90.0%)" },
        ],
        attestation: "Sri Chaitanya Junior College, Nidamanuru, Vijayawada (Rural)",
        note: "Scored full marks (100%) in three papers: 1st Year Maths A (75/75), 2nd Year Maths B (75/75), and 2nd Year Physics (60/60).",
    },
    ssc: {
        id: "ssc",
        tabLabel: "10th Class Certificate (95.8%)",
        title: "10th Class (SSC) Certificate",
        subtitle: "Regular Board Exam (English Medium)",
        authority: "Board of Secondary Education, Andhra Pradesh",
        image: "/certificates/ssc_marks_memo.webp",
        width: 703,
        height: 1002,
        regNo: "2116130068",
        standing: "Total: 575 / 600 (95.83% — First Division)",
        scoreSummary: "575 / 600 · Maths 99/100 · Social 100/100",
        breakdown: [
            { label: "Student Name", value: "Konda Balaji Rao" },
            { label: "Total Marks", value: "575 / 600 (95.83%)", isHighlight: true },
            { label: "Result", value: "First Division", isHighlight: true },
            { label: "Mathematics", value: "99 / 100", isHighlight: true },
            { label: "Social Studies", value: "100 / 100 (Full Marks)", isHighlight: true },
            { label: "English", value: "98 / 100" },
            { label: "Science", value: "94 / 100" },
            { label: "Telugu & Hindi", value: "92 / 100 each" },
        ],
        attestation: "Z.P. High School, Pedairlapadu, Prakasam District (PIN: 523117)",
        note: "School topper with 99 in Maths and 100 in Social Studies.",
    },
};

// Key academic metrics at a glance
const academicMetrics = [
    {
        label: "AP EAPCET Rank",
        value: "#9046",
        subtext: "Top 5% in State (AU: 6210)",
        docId: "eapcet" as DocType,
        icon: TrendingUp,
        color: "text-amber-500 dark:text-amber-400",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
    },
    {
        label: "12th Grade (MPC)",
        value: "954 / 1000",
        subtext: "95.4% · A Grade Distinction",
        docId: "inter" as DocType,
        icon: CheckCircle2,
        color: "text-emerald-500 dark:text-emerald-400",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
    },
    {
        label: "College CGPA",
        value: "7.4 / 10",
        subtext: "B.Tech CSE (AI & ML) · VFSTR",
        docId: null,
        icon: GraduationCap,
        color: "text-blue-500 dark:text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
    },
    {
        label: "10th Grade (SSC)",
        value: "575 / 600",
        subtext: "95.8% · School Topper",
        docId: "ssc" as DocType,
        icon: Sparkles,
        color: "text-purple-500 dark:text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
    },
];

// Simple, clear coursework topics
const courseworkCategories = [
    {
        category: "Systems & Cloud",
        courses: [
            "Operating Systems",
            "Computer Networks",
            "System Design",
            "Linux & Shell Scripting",
            "Cloud Computing",
        ],
    },
    {
        category: "Programming & Data",
        courses: [
            "Data Structures & Algorithms",
            "Software Engineering",
            "Databases (SQL / PostgreSQL)",
            "Web Development",
        ],
    },
    {
        category: "AI & Mathematics",
        courses: [
            "Machine Learning Basics",
            "Artificial Intelligence",
            "Neural Networks",
            "Applied Mathematics",
        ],
    },
];

// Chronological timeline data with simple text
const educationTimeline = [
    {
        degree: "B.Tech in Computer Science & Engineering (AI & ML)",
        institution: "Vignan's Foundation for Science, Technology and Research (VFSTR)",
        accreditation: "NAAC 'A+' Accredited University",
        location: "Guntur, Andhra Pradesh",
        score: "7.4 CGPA",
        scoreLabel: "Current Standing",
        status: "Expected Graduation: 2027 (3rd Year)",
        year: "2023 - 2027",
        badge: "Bachelor's Degree",
        docId: null,
        highlight:
            "Studying core computer science with a focus on cloud computing, operating systems, networking, and AI. Working on practical projects to build real-world software.",
        courseworkHighlights: [
            "Operating Systems",
            "Computer Networks",
            "Cloud Computing",
            "System Design",
            "Databases (SQL)",
            "Data Structures",
        ],
    },
    {
        degree: "AP EAPCET 2023 (Engineering Entrance Exam)",
        institution: "JNTU Anantapur & APSCHE",
        accreditation: "State Level Engineering Exam",
        location: "Andhra Pradesh (AU Region: 6210)",
        score: "State Rank: 9046",
        scoreLabel: "Top 5% in State",
        status: "Official Rank Card",
        year: "2023",
        badge: "State Rank",
        docId: "eapcet" as DocType,
        highlight:
            "Ranked 9046 out of 200,000+ students across Andhra Pradesh. This rank is also where my username @9046balaji comes from.",
        courseworkHighlights: [
            "Mathematics",
            "Physics",
            "Chemistry",
            "Problem Solving",
        ],
    },
    {
        degree: "12th Grade / Intermediate (MPC Stream)",
        institution: "Sri Chaitanya Junior College",
        accreditation: "Code: 05094 · Nidamanuru, Vijayawada",
        location: "Vijayawada, Andhra Pradesh",
        score: "954 / 1000 (95.4%)",
        scoreLabel: "A Grade Distinction",
        status: "Maths & Science: 578 / 600 (96.3%)",
        year: "2021 - 2023",
        badge: "12th Grade",
        docId: "inter" as DocType,
        highlight:
            "Scored 954 out of 1000 (95.4%) with an A Grade. Achieved 98% in both Mathematics (294/300) and Physics (147/150), with full marks (100%) in three papers.",
        courseworkHighlights: ["Maths (294/300)", "Physics (147/150)", "Chemistry", "Sanskrit (196/200)"],
    },
    {
        degree: "10th Grade / Secondary School Certificate (SSC)",
        institution: "Z.P. High School",
        accreditation: "Board of Secondary Education, Andhra Pradesh",
        location: "Pedairlapadu, Prakasam District",
        score: "575 / 600 (95.83%)",
        scoreLabel: "First Division",
        status: "Maths 99/100 · Social 100/100",
        year: "2019 - 2021",
        badge: "10th Grade",
        docId: "ssc" as DocType,
        highlight:
            "Passed in First Division with 575 out of 600 (95.8%). Scored 99/100 in Mathematics, 98/100 in English, and 100/100 in Social Studies as the school topper.",
        courseworkHighlights: ["Mathematics (99/100)", "English (98/100)", "Social Studies (100/100)", "Science (94/100)"],
    },
];

export default function Education() {
    const [viewMode, setViewMode] = useState<"bento" | "timeline">("bento");
    const [activeModalDoc, setActiveModalDoc] = useState<DocType | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    const docKeys: DocType[] = ["eapcet", "inter", "ssc"];

    // Keyboard navigation for modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && activeModalDoc) {
                setActiveModalDoc(null);
                setZoomLevel(1);
            } else if (activeModalDoc) {
                const currentIndex = docKeys.indexOf(activeModalDoc);
                if (e.key === "ArrowRight") {
                    const nextIndex = (currentIndex + 1) % docKeys.length;
                    setActiveModalDoc(docKeys[nextIndex]);
                    setZoomLevel(1);
                } else if (e.key === "ArrowLeft") {
                    const prevIndex = (currentIndex - 1 + docKeys.length) % docKeys.length;
                    setActiveModalDoc(docKeys[prevIndex]);
                    setZoomLevel(1);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeModalDoc]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (activeModalDoc) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [activeModalDoc]);

    const activeDoc = activeModalDoc ? academicDocuments[activeModalDoc] : null;

    return (
        <section
            id="education"
            className="relative overflow-hidden py-16 md:py-20 px-4 bg-section-alt transition-colors duration-300"
        >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute right-1/4 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute left-1/4 bottom-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.06)_0%,transparent_70%)] blur-3xl" />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-3"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-mono font-medium text-primary backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-secondary animate-pulse" />
                        Education &amp; Background
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
                        Education
                    </h2>
                    <p className="max-w-xl mx-auto text-xs md:text-sm text-text-tertiary leading-relaxed">
                        My schooling, college degree, and official exam results in computer science and mathematics.
                    </p>

                    {/* View Mode Toggle Switcher */}
                    <div className="pt-2 flex justify-center">
                        <div className="inline-flex items-center p-1 rounded-xl bg-card-bg border border-border shadow-inner text-xs font-mono">
                            <button
                                onClick={() => setViewMode("bento")}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                                    viewMode === "bento"
                                        ? "bg-primary text-white shadow-sm font-semibold"
                                        : "text-text-tertiary hover:text-text-primary"
                                }`}
                                aria-label="Switch to Card view"
                            >
                                <Layers className="w-3.5 h-3.5" />
                                <span>Card View</span>
                            </button>
                            <button
                                onClick={() => setViewMode("timeline")}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                                    viewMode === "timeline"
                                        ? "bg-primary text-white shadow-sm font-semibold"
                                        : "text-text-tertiary hover:text-text-primary"
                                }`}
                                aria-label="Switch to Timeline view"
                            >
                                <Clock className="w-3.5 h-3.5" />
                                <span>Timeline View</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Key Metrics Counter Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                >
                    {academicMetrics.map((metric, idx) => {
                        const Icon = metric.icon;
                        const isClickable = Boolean(metric.docId);
                        return (
                            <div
                                key={idx}
                                onClick={() => {
                                    if (metric.docId) {
                                        setActiveModalDoc(metric.docId);
                                        setZoomLevel(1);
                                    }
                                }}
                                className={`group relative rounded-2xl border border-border bg-card-bg/80 backdrop-blur-md p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 overflow-hidden ${
                                    isClickable ? "cursor-pointer" : ""
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-mono text-text-tertiary truncate">
                                        {metric.label}
                                    </span>
                                    <div
                                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${metric.bgColor} ${metric.color} ${metric.borderColor} border shrink-0`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                                <div className="text-xl md:text-2xl font-bold font-mono tracking-tight text-text-primary">
                                    {metric.value}
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-[10px] md:text-[11px] text-text-secondary truncate">
                                        {metric.subtext}
                                    </p>
                                    {isClickable && (
                                        <span className="text-[9px] font-mono text-primary group-hover:underline flex items-center gap-0.5 shrink-0 ml-1">
                                            <span>View</span>
                                            <ExternalLink className="w-2.5 h-2.5" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Main Content: Bento View or Timeline View */}
                {viewMode === "bento" ? (
                    /* ================= BENTO GRID VIEW ================= */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* 1. HERO BENTO TILE: B.Tech Degree (Spans 2 cols on desktop) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className="md:col-span-2 rounded-3xl border border-border bg-card-bg/90 backdrop-blur-md p-6 md:p-7 space-y-5 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group"
                        >
                            {/* Subtle Ambient Card Gradient */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500" />

                            <div className="relative space-y-3.5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                        <GraduationCap className="w-3.5 h-3.5" />
                                        <span>Bachelor&apos;s Degree · 2023 - 2027</span>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                        CGPA: 7.4 / 10
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-text-primary">
                                        B.Tech in Computer Science and Engineering
                                    </h3>
                                    <p className="text-xs md:text-sm font-semibold text-primary mt-0.5">
                                        Specialization: Artificial Intelligence &amp; Machine Learning
                                    </p>
                                    <p className="text-xs text-text-secondary mt-1 font-medium">
                                        Vignan&apos;s Foundation for Science, Technology &amp; Research (VFSTR)
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary mt-2">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-secondary" />
                                            Guntur, Andhra Pradesh
                                        </span>
                                        <span>•</span>
                                        <span className="text-emerald-500 font-mono">NAAC &apos;A+&apos; University</span>
                                        <span>•</span>
                                        <span>3rd Year (Graduating 2027)</span>
                                    </div>
                                </div>

                                <p className="text-xs md:text-sm text-text-tertiary leading-relaxed">
                                    Studying core computer science with a focus on cloud computing, operating systems, networking, and AI. I put what I learn into practice by building real projects, deploying cloud infrastructure, and automating workflows.
                                </p>

                                {/* Categorized Coursework Toolkits */}
                                <div className="pt-2 border-t border-border/60 space-y-2.5">
                                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-text-secondary">
                                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                                        <span>Key Subjects Studied:</span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                        {courseworkCategories.map((cat, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3 rounded-xl bg-card-bg-hover/60 border border-border/60 space-y-1.5"
                                            >
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block">
                                                    {cat.category}
                                                </span>
                                                <div className="flex flex-wrap gap-1">
                                                    {cat.courses.map((course) => (
                                                        <span
                                                            key={course}
                                                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-card-bg text-text-secondary border border-border/60"
                                                        >
                                                            {course}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. SPOTLIGHT TILE: AP EAPCET State Rank 9046 (1 col on desktop) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-card-bg to-card-bg p-6 md:p-7 space-y-4 hover:border-amber-500/60 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden flex flex-col justify-between group"
                        >
                            {/* Ambient Glow */}
                            <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                            <div className="space-y-3.5 relative">
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/30">
                                        <Award className="w-3.5 h-3.5" />
                                        <span>State Entrance Exam</span>
                                    </div>
                                    <span className="text-[11px] font-mono text-text-tertiary">2023</span>
                                </div>

                                <div>
                                    <div className="text-3xl md:text-4xl font-extrabold font-mono text-amber-500 dark:text-amber-400 tracking-tight flex items-baseline gap-1">
                                        <span>#9046</span>
                                        <span className="text-xs font-normal text-text-tertiary">State Rank</span>
                                    </div>
                                    <h4 className="font-bold text-sm md:text-base text-text-primary mt-1">
                                        AP EAPCET 2023 (Engineering)
                                    </h4>
                                    <p className="text-xs text-text-secondary">
                                        State-level Engineering Entrance Test
                                    </p>
                                </div>

                                <div className="p-2.5 rounded-xl bg-card-bg/90 border border-amber-500/20 space-y-1.5 text-xs">
                                    <div className="flex justify-between items-center text-[11px] font-mono">
                                        <span className="text-text-tertiary">Region Rank (AU):</span>
                                        <span className="font-bold text-text-primary">6210</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px] font-mono">
                                        <span className="text-text-tertiary">Hall Ticket:</span>
                                        <span className="font-mono text-text-primary">50372010169</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px] font-mono">
                                        <span className="text-text-tertiary">12th MPC Marks:</span>
                                        <span className="font-bold text-emerald-500">578 / 600 (96.3%)</span>
                                    </div>
                                </div>

                                <p className="text-[11px] text-text-tertiary leading-relaxed">
                                    Ranked in the <strong>top 5% out of 200,000+ students</strong> across Andhra Pradesh. This rank is also where my handle <span className="font-mono text-primary font-semibold">@9046balaji</span> comes from.
                                </p>
                            </div>

                            {/* Verification Button */}
                            <button
                                onClick={() => {
                                    setActiveModalDoc("eapcet");
                                    setZoomLevel(1);
                                }}
                                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-mono text-xs font-semibold bg-amber-500/10 hover:bg-amber-500 text-amber-600 dark:text-amber-300 hover:text-white border border-amber-500/30 hover:border-amber-500 transition-all duration-300 shadow-sm"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View Rank Card</span>
                            </button>
                        </motion.div>

                        {/* 3. INTERMEDIATE EDUCATION CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="md:col-span-1 rounded-3xl border border-border bg-card-bg/90 backdrop-blur-md p-6 space-y-4 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                        2021 - 2023
                                    </span>
                                    <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                        954 / 1000 (95.4%)
                                    </span>
                                </div>

                                <div>
                                    <h4 className="font-bold text-sm md:text-base text-text-primary">
                                        12th Grade (Intermediate — MPC)
                                    </h4>
                                    <p className="text-xs font-semibold text-text-secondary mt-0.5">
                                        Sri Chaitanya Junior College
                                    </p>
                                    <p className="text-[11px] text-text-tertiary mt-0.5">
                                        Nidamanuru, Vijayawada
                                    </p>
                                </div>

                                <div className="p-2.5 rounded-xl bg-card-bg-hover/80 border border-border/70 text-[11px] font-mono space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">Mathematics:</span>
                                        <span className="font-bold text-text-primary">294 / 300 (98.0%)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">Physics:</span>
                                        <span className="font-bold text-text-primary">147 / 150 (98.0%)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">Result:</span>
                                        <span className="font-bold text-emerald-500">A Grade Distinction</span>
                                    </div>
                                </div>

                                <p className="text-[11px] text-text-tertiary leading-relaxed">
                                    Passed with A Grade (95.4%). Scored full marks (100%) in three core papers: 1st Year Maths A, 2nd Year Maths B, and 2nd Year Physics.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setActiveModalDoc("inter");
                                    setZoomLevel(1);
                                }}
                                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-mono text-xs font-medium text-text-secondary hover:text-text-primary bg-card-bg-hover hover:bg-primary/10 border border-border hover:border-primary/30 transition-colors"
                            >
                                <Eye className="w-3.5 h-3.5 text-emerald-500" />
                                <span>View 12th Marks Memo</span>
                            </button>
                        </motion.div>

                        {/* 4. SECONDARY SCHOOL CERTIFICATE (SSC) CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="md:col-span-1 rounded-3xl border border-border bg-card-bg/90 backdrop-blur-md p-6 space-y-4 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                        2019 - 2021
                                    </span>
                                    <span className="text-xs font-mono font-bold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                                        575 / 600 (95.8%)
                                    </span>
                                </div>

                                <div>
                                    <h4 className="font-bold text-sm md:text-base text-text-primary">
                                        10th Class (SSC)
                                    </h4>
                                    <p className="text-xs font-semibold text-text-secondary mt-0.5">
                                        Z.P. High School
                                    </p>
                                    <p className="text-[11px] text-text-tertiary mt-0.5">
                                        Pedairlapadu, Prakasam District
                                    </p>
                                </div>

                                <div className="p-2.5 rounded-xl bg-card-bg-hover/80 border border-border/70 text-[11px] font-mono space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">Mathematics:</span>
                                        <span className="font-bold text-text-primary">99 / 100</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">Social Studies:</span>
                                        <span className="font-bold text-text-primary">100 / 100 (Full Marks)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-tertiary">Result:</span>
                                        <span className="font-bold text-purple-500">First Division</span>
                                    </div>
                                </div>

                                <p className="text-[11px] text-text-tertiary leading-relaxed">
                                    Graduated as the school topper with 575/600 (95.8%). Scored 99 in Mathematics and 98 in English.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setActiveModalDoc("ssc");
                                    setZoomLevel(1);
                                }}
                                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-mono text-xs font-medium text-text-secondary hover:text-text-primary bg-card-bg-hover hover:bg-primary/10 border border-border hover:border-primary/30 transition-colors"
                            >
                                <Eye className="w-3.5 h-3.5 text-purple-500" />
                                <span>View 10th Certificate</span>
                            </button>
                        </motion.div>

                        {/* 5. LEARNING PHILOSOPHY CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="md:col-span-1 rounded-3xl border border-border bg-card-bg/90 backdrop-blur-md p-6 space-y-4 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>Hands-On Learning</span>
                                </div>

                                <h4 className="font-bold text-sm md:text-base text-text-primary">
                                    Learning by Building
                                </h4>

                                <p className="text-[11px] text-text-tertiary leading-relaxed">
                                    I believe the best way to understand computer science is by building real things. Along with my coursework, I work on cloud deployments, Linux tools, and web applications.
                                </p>
                            </div>

                            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-primary">
                                <span className="flex items-center gap-1">
                                    <Binary className="w-3.5 h-3.5" />
                                    Projects &amp; Certs
                                </span>
                                <a
                                    href="#certifications"
                                    className="inline-flex items-center gap-1 hover:underline text-text-secondary hover:text-primary transition-colors"
                                >
                                    <span>See Certifications</span>
                                    <ChevronRight className="w-3 h-3" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    /* ================= CHRONOLOGICAL TIMELINE VIEW ================= */
                    <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/30 before:via-border before:to-transparent">
                        {educationTimeline.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                            >
                                {/* Timeline Node Icon */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card-bg shadow-md shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:border-primary/50 group-hover:scale-105 transition-all duration-300">
                                    {edu.docId === "eapcet" ? (
                                        <Award className="w-4 h-4 text-amber-500" />
                                    ) : (
                                        <GraduationCap className="w-4 h-4 text-primary" />
                                    )}
                                </div>

                                {/* Timeline Card Content */}
                                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-5 md:p-6 rounded-2xl border border-border bg-card-bg hover:border-primary/40 shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-300 space-y-3">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                                {edu.year}
                                            </span>
                                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-card-bg-hover text-text-secondary border border-border/70">
                                                {edu.badge}
                                            </span>
                                        </div>
                                        <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                            {edu.score}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-sm md:text-base text-text-primary">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-xs md:text-sm text-text-secondary font-medium mt-0.5">
                                            {edu.institution}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary mt-1">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-secondary" />
                                                <span>{edu.location}</span>
                                            </span>
                                            {edu.status && <span>• {edu.status}</span>}
                                        </div>
                                    </div>

                                    <p className="text-[11px] text-text-tertiary leading-snug">
                                        {edu.highlight}
                                    </p>

                                    {/* Action button if document available */}
                                    {edu.docId && (
                                        <div className="pt-1">
                                            <button
                                                onClick={() => {
                                                    setActiveModalDoc(edu.docId);
                                                    setZoomLevel(1);
                                                }}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 transition-colors"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>View Document</span>
                                            </button>
                                        </div>
                                    )}

                                    {/* Coursework Tags */}
                                    {edu.courseworkHighlights && (
                                        <div className="pt-2 border-t border-border/40">
                                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-tertiary mb-1.5 uppercase tracking-wider">
                                                <BookOpen className="w-3 h-3 text-primary" />
                                                <span>Subjects:</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {edu.courseworkHighlights.map((course) => (
                                                    <span
                                                        key={course}
                                                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-card-bg-hover text-text-secondary border border-border/70"
                                                    >
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= COMPREHENSIVE ACADEMIC CREDENTIAL VERIFICATION LIGHTBOX MODAL ================= */}
            <AnimatePresence>
                {activeDoc && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="academic-modal-title"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setActiveModalDoc(null);
                                setZoomLevel(1);
                            }}
                            className="absolute inset-0 bg-black/85 backdrop-blur-md"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ type: "spring", damping: 26, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-border bg-card-bg shadow-2xl overflow-hidden z-10"
                        >
                            {/* Modal Header Bar with Document Tabs */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card-bg/95">
                                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                                    {docKeys.map((key) => {
                                        const doc = academicDocuments[key];
                                        const isActive = key === activeModalDoc;
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setActiveModalDoc(key);
                                                    setZoomLevel(1);
                                                }}
                                                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                                                    isActive
                                                        ? "bg-primary text-white font-semibold shadow-sm"
                                                        : "text-text-secondary hover:text-text-primary hover:bg-card-bg-hover"
                                                }`}
                                            >
                                                {doc.tabLabel}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => {
                                        setActiveModalDoc(null);
                                        setZoomLevel(1);
                                    }}
                                    className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-card-bg-hover transition-colors ml-2 shrink-0"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body: Left Canvas + Right Metadata */}
                            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                                {/* Left: Image Canvas with Zoom controls */}
                                <div className="relative flex-1 bg-black/50 min-h-[300px] md:min-h-[460px] flex items-center justify-center overflow-auto p-4 select-none">
                                    <div
                                        className="relative transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing max-w-full"
                                        style={{ transform: `scale(${zoomLevel})` }}
                                    >
                                        <Image
                                            src={activeDoc.image}
                                            alt={activeDoc.title}
                                            width={activeDoc.width}
                                            height={activeDoc.height}
                                            className="rounded-lg shadow-xl object-contain max-h-[64vh] max-w-full w-auto h-auto mx-auto"
                                            priority
                                        />
                                    </div>

                                    {/* Floating Zoom Toolbar */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 rounded-full bg-card-bg/90 backdrop-blur-md border border-border shadow-lg">
                                        <button
                                            onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
                                            className="p-1.5 rounded-full hover:bg-card-bg-hover text-text-secondary hover:text-text-primary transition-colors"
                                            aria-label="Zoom out"
                                        >
                                            <ZoomOut className="w-4 h-4" />
                                        </button>
                                        <span className="text-[11px] font-mono px-2 text-text-secondary">
                                            {Math.round(zoomLevel * 100)}%
                                        </span>
                                        <button
                                            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                                            className="p-1.5 rounded-full hover:bg-card-bg-hover text-text-secondary hover:text-text-primary transition-colors"
                                            aria-label="Zoom in"
                                        >
                                            <ZoomIn className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setZoomLevel(1)}
                                            className="text-[10px] font-mono px-2 py-0.5 rounded-full hover:bg-card-bg-hover text-text-tertiary hover:text-text-primary transition-colors"
                                        >
                                            Reset
                                        </button>
                                    </div>

                                    {/* Prev/Next arrows on desktop */}
                                    <button
                                        onClick={() => {
                                            const currentIndex = docKeys.indexOf(activeModalDoc!);
                                            const prevIndex = (currentIndex - 1 + docKeys.length) % docKeys.length;
                                            setActiveModalDoc(docKeys[prevIndex]);
                                            setZoomLevel(1);
                                        }}
                                        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card-bg/80 hover:bg-card-bg text-text-secondary hover:text-text-primary items-center justify-center border border-border backdrop-blur-md shadow-md transition-colors"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            const currentIndex = docKeys.indexOf(activeModalDoc!);
                                            const nextIndex = (currentIndex + 1) % docKeys.length;
                                            setActiveModalDoc(docKeys[nextIndex]);
                                            setZoomLevel(1);
                                        }}
                                        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card-bg/80 hover:bg-card-bg text-text-secondary hover:text-text-primary items-center justify-center border border-border backdrop-blur-md shadow-md transition-colors"
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Right / Bottom: Verification Metadata Sidebar */}
                                <div className="w-full md:w-80 p-5 bg-card-bg border-t md:border-t-0 md:border-l border-border flex flex-col justify-between space-y-4 overflow-y-auto max-h-[40vh] md:max-h-[82vh]">
                                    <div className="space-y-3">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            <span>Official Document</span>
                                        </div>

                                        <div>
                                            <h3 id="academic-modal-title" className="text-base font-bold text-text-primary">
                                                {activeDoc.title}
                                            </h3>
                                            <p className="text-xs text-text-secondary font-medium">
                                                {activeDoc.subtitle}
                                            </p>
                                            <p className="text-[10px] text-text-tertiary mt-0.5">
                                                {activeDoc.authority}
                                            </p>
                                        </div>

                                        {/* Subject / Score Breakdown */}
                                        <div className="p-3 rounded-xl bg-card-bg-hover/80 border border-border/80 space-y-1.5 text-xs font-mono">
                                            {activeDoc.breakdown.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center text-[11px]">
                                                    <span className="text-text-tertiary">{item.label}:</span>
                                                    <span
                                                        className={`font-semibold ${
                                                            item.isHighlight
                                                                ? "text-emerald-500 dark:text-emerald-400 font-bold"
                                                                : "text-text-primary"
                                                        }`}
                                                    >
                                                        {item.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Institution Attestation */}
                                        <div className="space-y-1 text-[11px] text-text-tertiary">
                                            <p className="font-semibold text-text-secondary font-mono text-[10px] uppercase tracking-wider">
                                                Institution:
                                            </p>
                                            <p className="leading-snug">{activeDoc.attestation}</p>
                                        </div>

                                        {/* Simple Note */}
                                        <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/20 text-[11px] text-text-tertiary leading-relaxed">
                                            {activeDoc.note}
                                        </div>
                                    </div>

                                    {/* Modal Actions */}
                                    <div className="pt-2 flex flex-col gap-2">
                                        <a
                                            href={activeDoc.image}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-mono text-xs font-semibold bg-primary hover:bg-primary-hover text-white transition-colors shadow-sm"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Open Full Image</span>
                                        </a>
                                        <button
                                            onClick={() => {
                                                setActiveModalDoc(null);
                                                setZoomLevel(1);
                                            }}
                                            className="w-full py-1.5 px-4 rounded-xl font-mono text-xs font-medium text-text-tertiary hover:text-text-primary hover:bg-card-bg-hover transition-colors"
                                        >
                                            Close (<kbd className="text-[10px]">Esc</kbd>)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}

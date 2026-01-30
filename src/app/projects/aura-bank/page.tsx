"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Github, CreditCard, Users, Brain, Shield, Database,
    Server, Lock, LayoutDashboard, Terminal, Cpu, Globe, Wallet,
    PieChart, MessageSquare, Bell, Banknote, QrCode, Building2,
    TrendingUp, Bot, Search, Layers, CheckCircle
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "features", label: "Features", icon: Layers },
    { id: "architecture", label: "Architecture", icon: Server },
    { id: "ml", label: "AI & ML", icon: Brain },
    { id: "security", label: "Security", icon: Shield },
];

const keyStats = [
    { value: "Full-Stack", label: "React + Node.js", icon: Globe },
    { value: "AI/ML", label: "Fraud Detection", icon: Brain },
    { value: "3D", label: "Three.js Auth", icon: Cpu },
    { value: "Secure", label: "JWT + Ledger", icon: Lock },
];

const techStack = {
    frontend: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Three.js", "Recharts"],
    backend: ["Node.js", "Express", "PostgreSQL", "JWT", "bcrypt", "Zod"],
    ml: ["Python", "Flask", "scikit-learn", "pandas", "numpy"],
    ai: ["Ollama", "LangChain", "DuckDuckGo Search"]
};

// Overview Tab
function OverviewTab() {
    return (
        <div className="space-y-8">
            <section className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Banknote className="text-primary" /> The Vision
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                    Aura Bank is a comprehensive, full-stack banking management system that brings together 
                    modern web technologies and AI-powered features. Designed for both customers and administrators, 
                    it provides a seamless digital banking experience with real-time transactions, intelligent 
                    loan analysis, fraud detection, and much more.
                </p>
            </section>

            {/* Architecture Overview */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Server className="text-secondary" /> System Overview
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-sm font-bold text-white">Frontend</div>
                        <div className="text-xs text-gray-400">React + Three.js</div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                        <Server className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <div className="text-sm font-bold text-white">Backend</div>
                        <div className="text-xs text-gray-400">Node.js + Express</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                        <Database className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <div className="text-sm font-bold text-white">Database</div>
                        <div className="text-xs text-gray-400">PostgreSQL</div>
                    </div>
                    <div className="text-center p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        <Brain className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <div className="text-sm font-bold text-white">ML API</div>
                        <div className="text-xs text-gray-400">Python + Flask</div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Terminal className="text-primary" /> Tech Stack
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(techStack).map(([category, techs]) => (
                        <div key={category} className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <h3 className="text-sm font-bold text-primary mb-3 capitalize">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {techs.map((tech) => (
                                    <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Features Tab
function FeaturesTab() {
    const customerFeatures = [
        { icon: LayoutDashboard, title: "Smart Dashboard", desc: "Real-time balance, transactions, spending charts" },
        { icon: Banknote, title: "Money Transfers", desc: "IMPS, NEFT, UPI, QR code payments" },
        { icon: CreditCard, title: "Card Management", desc: "Freeze/unfreeze, limits, PIN change" },
        { icon: PieChart, title: "Analytics", desc: "Spending insights, category breakdown" },
        { icon: Wallet, title: "Loan Services", desc: "AI-powered eligibility, EMI calculator" },
        { icon: Bell, title: "Smart Alerts", desc: "Fraud detection, low balance warnings" },
    ];

    const adminFeatures = [
        { icon: TrendingUp, title: "Overview Dashboard", desc: "Bank-wide statistics, user growth" },
        { icon: CheckCircle, title: "Loan Approvals", desc: "Review applications, AI risk scores" },
        { icon: Bot, title: "AI Chat Assistant", desc: "Banking knowledge with web search" },
        { icon: MessageSquare, title: "Feedback Management", desc: "Customer feedback with AI insights" },
    ];

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Users className="text-primary" /> Customer Features
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {customerFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-colors"
                        >
                            <feature.icon className="w-6 h-6 text-primary mb-2" />
                            <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Building2 className="text-secondary" /> Admin Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {adminFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-secondary/30 transition-colors"
                        >
                            <feature.icon className="w-6 h-6 text-secondary mb-2" />
                            <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Architecture Tab
function ArchitectureTab() {
    return (
        <div className="space-y-8">
            {/* System Flow Diagram */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Server className="text-secondary" /> System Architecture Flow
                </h2>
                <p className="text-gray-400 mb-6">
                    A full-stack banking architecture with React frontend, Node.js API layer, 
                    PostgreSQL database, and Python ML microservice for intelligent features.
                </p>

                {/* Flow Diagram */}
                <div className="flex flex-col items-center space-y-4 font-mono text-sm">
                    {/* USERS */}
                    <div className="px-6 py-3 bg-gray-700 rounded-lg text-white">USERS (Customers & Admins)</div>
                    <div className="w-0.5 h-6 bg-gray-600"></div>

                    {/* FRONTEND */}
                    <div className="px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 w-full max-w-2xl">
                        <div className="font-bold text-center mb-2">🖥️ FRONTEND (React + TypeScript)</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["Dashboard", "Transfers", "Loans", "Cards", "Analytics", "Admin Panel", "3D Auth"].map(m => (
                                <span key={m} className="px-2 py-1 bg-blue-500/30 rounded text-xs">{m}</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-0.5 h-6 bg-gray-600"></div>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">REST API</span>
                        <div className="w-0.5 h-6 bg-gray-600"></div>
                    </div>

                    {/* BACKEND */}
                    <div className="px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 w-full max-w-2xl">
                        <div className="font-bold text-center mb-2">⚙️ BACKEND (Node.js + Express)</div>
                        <div className="text-xs text-gray-400 text-center mb-2">API Routes: /users /accounts /transactions /loans /cards /support</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["JWT Auth", "bcrypt", "Rate Limiting", "CORS", "Zod Validation", "Circuit Breaker"].map(s => (
                                <span key={s} className="px-2 py-1 bg-purple-500/30 rounded text-xs">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Branches */}
                    <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-green-500"></div>
                            <div className="px-4 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center w-full">
                                <div className="font-bold mb-1">🗄️ PostgreSQL</div>
                                <div className="text-xs text-gray-400">Users • Accounts • Transactions</div>
                                <div className="text-xs text-gray-400">Double-Entry Ledger • Cards</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-orange-500"></div>
                            <div className="px-4 py-3 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-300 text-center w-full">
                                <div className="font-bold mb-1">🤖 ML API (Flask)</div>
                                <div className="text-xs text-gray-400">Fraud Detection • Loan Risk</div>
                                <div className="text-xs text-gray-400">Expense Categorization</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-600"></div>

                    {/* External Services */}
                    <div className="px-6 py-3 bg-teal-500/20 border border-teal-500/50 rounded-lg text-teal-300 w-full max-w-2xl">
                        <div className="font-bold text-center mb-2">🔌 EXTERNAL INTEGRATIONS</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["Ollama (LLM)", "LangChain Agents", "DuckDuckGo Search", "QR Payments"].map(e => (
                                <span key={e} className="px-2 py-1 bg-teal-500/30 rounded text-xs">{e}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Modules */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Layers className="text-primary" /> Service Modules
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { name: "Auth Service", desc: "JWT + Refresh Tokens", color: "blue" },
                        { name: "Ledger Service", desc: "Double-Entry Accounting", color: "purple" },
                        { name: "Transfer Service", desc: "IMPS, NEFT, QR Pay", color: "green" },
                        { name: "Loan Service", desc: "AI Risk Scoring", color: "orange" },
                        { name: "Card Service", desc: "Freeze, Limits, PIN", color: "red" },
                        { name: "Analytics Service", desc: "Spending Insights", color: "teal" },
                        { name: "Support Service", desc: "Tickets + AI Chat", color: "pink" },
                        { name: "Admin Service", desc: "User & Loan Mgmt", color: "cyan" },
                    ].map((service) => (
                        <div key={service.name} className={`p-4 rounded-xl bg-${service.color}-500/10 border border-${service.color}-500/30`}>
                            <div className="font-mono text-sm text-white font-semibold mb-1">{service.name}</div>
                            <div className="text-xs text-gray-400">{service.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Data Flow */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Database className="text-green-400" /> Transaction Data Flow
                </h2>
                <div className="grid grid-cols-5 gap-3">
                    {[
                        { step: "1", name: "REQUEST", desc: "User Action", color: "blue" },
                        { step: "2", name: "VALIDATE", desc: "Auth + Input", color: "purple" },
                        { step: "3", name: "PROCESS", desc: "Business Logic", color: "yellow" },
                        { step: "4", name: "LEDGER", desc: "Double-Entry", color: "green" },
                        { step: "5", name: "RESPONSE", desc: "Return Result", color: "teal" },
                    ].map((flow) => (
                        <div key={flow.step} className={`p-3 rounded-lg bg-${flow.color}-500/20 border border-${flow.color}-500/30 text-center`}>
                            <div className={`text-${flow.color}-400 font-bold text-lg`}>{flow.step}</div>
                            <div className="text-xs text-white font-medium">{flow.name}</div>
                            <div className="text-xs text-gray-400">{flow.desc}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// ML Tab
function MLTab() {
    const mlFeatures = [
        {
            icon: Shield,
            title: "Fraud Detection",
            desc: "Machine learning model trained on transaction patterns to identify suspicious activities",
            tech: "TF-IDF + Logistic Regression"
        },
        {
            icon: TrendingUp,
            title: "Loan Risk Analysis",
            desc: "DTI calculation, employment verification, and credit scoring for loan eligibility",
            tech: "scikit-learn + Custom Algorithms"
        },
        {
            icon: PieChart,
            title: "Expense Categorization",
            desc: "Automatic categorization of transactions for spending insights",
            tech: "TF-IDF + Classification"
        },
        {
            icon: Bot,
            title: "AI Chat Support",
            desc: "Local LLM powered chatbot for customer queries with web search capability",
            tech: "Ollama + LangChain"
        },
    ];

    return (
        <div className="space-y-8">
            <section className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Brain className="text-primary" /> AI & Machine Learning
                </h2>
                <p className="text-gray-300 leading-relaxed">
                    Aura Bank integrates multiple AI/ML features to provide intelligent banking services,
                    from fraud detection to personalized financial insights.
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
                {mlFeatures.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors"
                    >
                        <feature.icon className="w-10 h-10 text-primary mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 mb-4">{feature.desc}</p>
                        <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full">
                            {feature.tech}
                        </span>
                    </motion.div>
                ))}
            </div>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Search className="text-secondary" /> External Integrations
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-black/30 rounded-lg">
                        <div className="text-2xl mb-2">🦙</div>
                        <div className="font-bold text-white">Ollama</div>
                        <div className="text-xs text-gray-400">Local LLM</div>
                    </div>
                    <div className="text-center p-4 bg-black/30 rounded-lg">
                        <div className="text-2xl mb-2">🔗</div>
                        <div className="font-bold text-white">LangChain</div>
                        <div className="text-xs text-gray-400">AI Agents</div>
                    </div>
                    <div className="text-center p-4 bg-black/30 rounded-lg">
                        <div className="text-2xl mb-2">🦆</div>
                        <div className="font-bold text-white">DuckDuckGo</div>
                        <div className="text-xs text-gray-400">Web Search</div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Security Tab
function SecurityTab() {
    const securityFeatures = [
        { icon: Lock, title: "JWT Authentication", desc: "Access + refresh tokens for secure sessions" },
        { icon: Shield, title: "Password Security", desc: "bcrypt with 12 salt rounds" },
        { icon: Bell, title: "Rate Limiting", desc: "Request throttling on sensitive endpoints" },
        { icon: CheckCircle, title: "Input Validation", desc: "Zod schemas on all inputs" },
        { icon: Database, title: "Double-Entry Ledger", desc: "Ensures financial data integrity" },
        { icon: Layers, title: "Idempotency", desc: "Prevents duplicate transactions" },
    ];

    return (
        <div className="space-y-8">
            <section className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="text-primary" /> Security First
                </h2>
                <p className="text-gray-300 leading-relaxed">
                    Banking applications require the highest level of security. Aura Bank implements
                    multiple layers of protection to ensure data integrity and user safety.
                </p>
            </section>

            <div className="grid md:grid-cols-3 gap-4">
                {securityFeatures.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-green-500/30 transition-colors"
                    >
                        <feature.icon className="w-6 h-6 text-green-400 mb-2" />
                        <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-400">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>

            <section className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">🔐 Security Highlights</h3>
                <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        HttpOnly cookies for token storage
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        CORS protection with restricted origins
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Helmet.js for HTTP security headers
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Atomic transactions for financial operations
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default function AuraBankProject() {
    const [activeTab, setActiveTab] = useState("overview");

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview": return <OverviewTab />;
            case "features": return <FeaturesTab />;
            case "architecture": return <ArchitectureTab />;
            case "ml": return <MLTab />;
            case "security": return <SecurityTab />;
            default: return <OverviewTab />;
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background text-foreground pt-20">
                {/* Hero Section */}
                <section className="relative py-16 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
                    <div className="max-w-6xl mx-auto relative z-10">
                        <Link href="/#projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Projects
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl">🏦</span>
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
                                    Aura Bank
                                </h1>
                            </div>
                            <p className="text-xl text-secondary font-mono mb-6">
                                AI-Powered Banking Management System
                            </p>

                            {/* Key Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {keyStats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                                    >
                                        <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                                        <div className="text-xl font-bold text-white">{stat.value}</div>
                                        <div className="text-xs text-gray-400">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* GitHub Link */}
                            <a
                                href="https://github.com/9046balaji/bank-management-system"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                            >
                                <Github className="w-5 h-5" /> View on GitHub
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* Tabs Section */}
                <section className="py-8 px-4 border-b border-white/10 sticky top-16 bg-background/80 backdrop-blur-md z-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                        activeTab === tab.id
                                            ? "bg-primary text-white"
                                            : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tab Content */}
                <section className="py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderTabContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

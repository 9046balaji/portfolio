"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Github, Calendar, Users, UserCheck, Building2, Shield, Database,
    Server, Lock, ClipboardList, Activity, Stethoscope, Clock, CheckCircle,
    AlertCircle, FileText, Key, Globe, LayoutDashboard, Terminal
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "features", label: "Features", icon: Activity },
    { id: "api", label: "API Docs", icon: Server },
    { id: "database", label: "Database", icon: Database },
    { id: "security", label: "Security", icon: Shield },
];

const keyStats = [
    { value: "5", label: "Core Modules", icon: Building2 },
    { value: "RBAC", label: "Access Control", icon: Lock },
    { value: "100%", label: "RESTful API", icon: Globe },
    { value: "JWT", label: "Secure Auth", icon: Key },
];

const techStack = ["Node.js", "Express.js", "PostgreSQL", "Bootstrap 5", "JWT", "Bcrypt", "Helmet", "EJS"];

// Overview Tab
function OverviewTab() {
    return (
        <div className="space-y-8">
            {/* The Challenge */}
            <section className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <ClipboardList className="text-primary" /> The Challenge
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                    Hospitals need efficient systems to manage the complex relationships between patients, doctors,
                    departments, and appointments. Manual scheduling leads to double-bookings, missed appointments,
                    and poor patient experience. This system provides a centralized solution for healthcare administration.
                </p>
            </section>

            {/* Architecture Flow Diagram */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Server className="text-secondary" /> System Architecture Flow
                </h2>
                <p className="text-gray-400 mb-6">
                    A layered architecture with Express.js server handling API routes, middleware for security,
                    models for data access, and PostgreSQL for persistence.
                </p>

                {/* Flow Diagram */}
                <div className="flex flex-col items-center space-y-4 font-mono text-sm">
                    {/* CLIENT LAYER */}
                    <div className="px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 w-full max-w-2xl">
                        <div className="font-bold text-center mb-2">🌐 CLIENT LAYER (Web Browser)</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["HTML", "CSS", "JavaScript", "Bootstrap 5"].map(t => (
                                <span key={t} className="px-2 py-1 bg-blue-500/30 rounded text-xs">{t}</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-0.5 h-6 bg-gray-600"></div>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">HTTP/HTTPS</span>
                        <div className="w-0.5 h-6 bg-gray-600"></div>
                    </div>

                    {/* SERVER LAYER */}
                    <div className="px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 w-full max-w-2xl">
                        <div className="font-bold text-center mb-2">⚡ SERVER LAYER (Node.js)</div>
                        <div className="text-xs text-gray-400 text-center mb-2">Express.js Server (server.js)</div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-600"></div>

                    {/* MIDDLEWARE */}
                    <div className="px-6 py-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-300 w-full max-w-2xl">
                        <div className="font-bold text-center mb-2">🛡️ MIDDLEWARE LAYER</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["Helmet Security", "CORS Policy", "Rate Limiter", "JWT Verify", "Auth Middleware"].map(m => (
                                <span key={m} className="px-2 py-1 bg-yellow-500/30 rounded text-xs">{m}</span>
                            ))}
                        </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-600"></div>

                    {/* API ROUTES */}
                    <div className="px-6 py-3 bg-teal-500/20 border border-teal-500/50 rounded-lg text-teal-300 w-full max-w-2xl">
                        <div className="font-bold text-center mb-2">🔀 API ROUTES</div>
                        <div className="grid grid-cols-5 gap-2">
                            {["/api/departments", "/api/patients", "/api/doctors", "/api/appointments", "/api/auth"].map(route => (
                                <div key={route} className="px-2 py-1 bg-teal-500/30 rounded text-xs text-center">{route}</div>
                            ))}
                        </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-600"></div>

                    {/* MODELS */}
                    <div className="px-6 py-3 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-300 w-full max-w-2xl">
                        <div className="font-bold text-center mb-2">📦 MODELS LAYER</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["Department Model", "Patient Model", "Doctor Model", "Appointment Model", "User Model"].map(m => (
                                <span key={m} className="px-2 py-1 bg-orange-500/30 rounded text-xs">{m}</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-0.5 h-6 bg-gray-600"></div>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">SQL Queries</span>
                        <div className="w-0.5 h-6 bg-gray-600"></div>
                    </div>

                    {/* DATABASE */}
                    <div className="px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 w-full max-w-2xl">
                        <div className="font-bold text-center mb-2">🗄️ DATABASE LAYER (PostgreSQL)</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["departments", "patients", "doctors", "appointments", "users"].map(t => (
                                <span key={t} className="px-2 py-1 bg-green-500/30 rounded text-xs">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Flow */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Activity className="text-primary" /> Request Data Flow
                </h2>
                <div className="grid grid-cols-5 gap-3">
                    {[
                        { step: "1", name: "USER", desc: "Browser", color: "blue" },
                        { step: "2", name: "FRONTEND", desc: "HTML/JS", color: "purple" },
                        { step: "3", name: "ROUTES", desc: "API Handlers", color: "yellow" },
                        { step: "4", name: "MODELS", desc: "Query Builder", color: "orange" },
                        { step: "5", name: "DATABASE", desc: "PostgreSQL", color: "green" },
                    ].map((flow) => (
                        <div key={flow.step} className={`p-3 rounded-lg bg-${flow.color}-500/20 border border-${flow.color}-500/30 text-center`}>
                            <div className={`text-${flow.color}-400 font-bold text-lg`}>{flow.step}</div>
                            <div className="text-xs text-white font-medium">{flow.name}</div>
                            <div className="text-xs text-gray-400">{flow.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Key Achievements */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="text-green-500" /> Key Achievements
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-300 text-sm">Optimized scheduling logic in PostgreSQL to <strong className="text-white">prevent double-booking conflicts</strong></p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-300 text-sm">Implemented <strong className="text-white">Role-Based Access Control (RBAC)</strong> for doctors, patients, and admins</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-300 text-sm">Built secure authentication with <strong className="text-white">JWT tokens</strong> and password hashing</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-300 text-sm">Created RESTful API with proper <strong className="text-white">CRUD operations</strong> for all entities</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-300 text-sm">Added <strong className="text-white">rate limiting</strong> and security headers for production readiness</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Features Tab
function FeaturesTab() {
    return (
        <div className="space-y-8">
            <section className="grid md:grid-cols-2 gap-6">
                {[
                    {
                        icon: Calendar,
                        title: "Appointment Management",
                        desc: "Schedule, view, update, and cancel patient appointments with automatic conflict detection.",
                        features: ["Conflict detection", "Status tracking", "Calendar view"]
                    },
                    {
                        icon: Users,
                        title: "Patient Records",
                        desc: "Add and manage patient information including name, phone, and email.",
                        features: ["Medical history", "Contact details", "Appointment logs"]
                    },
                    {
                        icon: UserCheck,
                        title: "Doctor Profiles",
                        desc: "Manage doctor profiles and assign them to specialized departments.",
                        features: ["Specialization", "Availability", "Department mapping"]
                    },
                    {
                        icon: Building2,
                        title: "Department Organization",
                        desc: "Organize doctors by medical departments (Cardiology, Pediatrics, etc.).",
                        features: ["Resource allocation", "Staff management", "Service catalog"]
                    }
                ].map((feature, idx) => (
                    <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{feature.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {feature.features.map((f, i) => (
                                <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-500">{f}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Dashboard Preview */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <LayoutDashboard className="text-secondary" /> Admin Dashboard
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-1">124</div>
                        <div className="text-sm text-gray-400">Total Patients</div>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-1">45</div>
                        <div className="text-sm text-gray-400">Active Doctors</div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                        <div className="text-3xl font-bold text-green-400 mb-1">28</div>
                        <div className="text-sm text-gray-400">Today's Appointments</div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// API Docs Tab
function APITab() {
    const endpoints = [
        { method: "GET", path: "/api/departments", desc: "Get all departments" },
        { method: "POST", path: "/api/departments", desc: "Create new department" },
        { method: "PUT", path: "/api/departments/:id", desc: "Update department details" },
        { method: "DELETE", path: "/api/departments/:id", desc: "Remove department" },
        { method: "GET", path: "/api/patients", desc: "Get all patients" },
        { method: "POST", path: "/api/patients", desc: "Register new patient" },
        { method: "GET", path: "/api/doctors", desc: "Get all doctors" },
        { method: "POST", path: "/api/doctors", desc: "Add new doctor" },
        { method: "GET", path: "/api/appointments", desc: "Get all appointments" },
        { method: "POST", path: "/api/appointments", desc: "Schedule appointment" },
        { method: "POST", path: "/api/auth/login", desc: "User authentication" },
        { method: "POST", path: "/api/auth/register", desc: "User registration" },
    ];

    return (
        <div className="space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Server className="text-primary" /> REST API Endpoints
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Method</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Endpoint</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {endpoints.map((api, index) => (
                                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${api.method === "GET" ? "bg-green-500/20 text-green-300" :
                                            api.method === "POST" ? "bg-blue-500/20 text-blue-300" :
                                                api.method === "PUT" ? "bg-yellow-500/20 text-yellow-300" :
                                                    "bg-red-500/20 text-red-300"
                                            }`}>
                                            {api.method}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 font-mono text-gray-300">{api.path}</td>
                                    <td className="py-3 px-4 text-gray-400">{api.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Example Request */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Terminal className="text-secondary" /> Example Request
                </h2>
                <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300">
                    <div className="text-gray-500">// Schedule a new appointment</div>
                    <div className="text-blue-400">POST /api/appointments</div>
                    <div className="text-yellow-400">Content-Type: application/json</div>
                    <div className="text-purple-400">Authorization: Bearer &lt;token&gt;</div>
                    <div className="mt-2 text-white">{`{
  "patient_id": 123,
  "doctor_id": 45,
  "date": "2024-03-20",
  "time": "14:30",
  "reason": "Regular checkup"
}`}</div>
                </div>
            </section>
        </div>
    );
}

// Database Tab
function DatabaseTab() {
    const tables = [
        { name: "departments", cols: ["id", "name", "description", "head_doctor_id"], purpose: "Hospital departments" },
        { name: "patients", cols: ["id", "name", "email", "phone", "dob", "address"], purpose: "Patient records" },
        { name: "doctors", cols: ["id", "name", "specialization", "department_id", "schedule"], purpose: "Medical staff" },
        { name: "appointments", cols: ["id", "patient_id", "doctor_id", "date", "status"], purpose: "Scheduling data" },
        { name: "users", cols: ["id", "username", "password_hash", "role", "created_at"], purpose: "Auth & Access" },
    ];

    return (
        <div className="space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Database className="text-secondary" /> PostgreSQL Schema
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tables.map((table, idx) => (
                        <div key={idx} className="p-4 bg-black/30 border border-white/5 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Database className="w-4 h-4 text-blue-400" />
                                <span className="font-mono text-primary font-semibold">{table.name}</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-3">{table.purpose}</p>
                            <div className="space-y-1">
                                {table.cols.map((col) => (
                                    <div key={col} className="text-xs text-gray-500 font-mono pl-2 border-l border-gray-700">
                                        {col}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Security Tab
function SecurityTab() {
    return (
        <div className="space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="text-green-400" /> Security Implementation
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-green-400" />
                            <h3 className="font-semibold text-white">Authentication</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>• <strong>Bcrypt</strong> for password hashing (12 rounds)</li>
                            <li>• <strong>JWT</strong> (JSON Web Tokens) for stateless auth</li>
                            <li>• Token expiration and refresh mechanism</li>
                            <li>• Secure HTTP-only cookies</li>
                        </ul>
                    </div>
                    <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-blue-400" />
                            <h3 className="font-semibold text-white">Protection</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>• <strong>Helmet.js</strong> for security headers</li>
                            <li>• <strong>Rate Limiting</strong> (100 req/15min)</li>
                            <li>• <strong>CORS</strong> configuration</li>
                            <li>• SQL Injection prevention via parameterized queries</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function HospitalManagementCaseStudy() {
    const [activeTab, setActiveTab] = useState("overview");

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview": return <OverviewTab />;
            case "features": return <FeaturesTab />;
            case "api": return <APITab />;
            case "database": return <DatabaseTab />;
            case "security": return <SecurityTab />;
            default: return <OverviewTab />;
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />

            <article className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <Link href="/#projects" className="inline-flex items-center text-gray-400 hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                        </Link>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Hospital Management System</h1>
                        <p className="text-xl md:text-2xl text-secondary font-mono mb-6">Enterprise Resource Planning for Healthcare</p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Key Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {keyStats.map((stat, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-xs text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <a href="https://github.com/9046balaji" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium flex items-center gap-2 transition-colors">
                                <Github className="w-5 h-5" /> View Code
                            </a>
                        </div>
                    </motion.div>

                    {/* Tab Navigation */}
                    <div className="mb-8 overflow-x-auto">
                        <div className="flex gap-2 p-1 bg-white/5 rounded-xl min-w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                        ? "bg-primary text-white"
                                        : "text-gray-400 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
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
            </article>

            <Footer />
        </main>
    );
}

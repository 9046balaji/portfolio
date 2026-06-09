"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Github, Brain, Activity, ShieldCheck, Layers, Workflow, Server,
    Database, Wrench, Bot, Cpu, Heart, Zap, Search, FileText, Globe, Lock,
    AlertTriangle, CheckCircle, ArrowRight, Terminal, BarChart2, MessageSquare,
    Sparkles, Eye, Shield, Stethoscope, Pill, Siren, Clock
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectStats from "@/components/ProjectStats";

const tabs = [
    { id: "overview", label: "Overview", icon: Brain },
    { id: "how-it-works", label: "How It Works", icon: Workflow },
    { id: "features", label: "Key Features", icon: Sparkles },
    { id: "tech", label: "Under the Hood", icon: Cpu },
];

const keyStats = [
    { value: "55K+", label: "Lines of Code", icon: Terminal, color: "from-blue-500 to-cyan-500" },
    { value: "220+", label: "Python Files", icon: FileText, color: "from-purple-500 to-pink-500" },
    { value: "50+", label: "API Endpoints", icon: Globe, color: "from-green-500 to-emerald-500" },
    { value: "10", label: "AI Agents", icon: Bot, color: "from-orange-500 to-red-500" },
];

const techStack = ["Python", "FastAPI", "LangGraph", "MedGemma", "PostgreSQL", "Redis", "ChromaDB", "Docker"];

const capabilities = [
    { icon: MessageSquare, title: "Smart Medical Chat", description: "Ask any heart-health question and get a well-researched, cited answer — not a guess.", color: "blue" },
    { icon: Heart, title: "Heart Risk Prediction", description: "Enter your vitals and get an AI-powered risk assessment with explainable results.", color: "red" },
    { icon: Pill, title: "Drug Interaction Alerts", description: "Check if your medications are safe together. Powered by FDA safety databases.", color: "orange" },
    { icon: Brain, title: "Patient Memory", description: "Remembers your medical history across sessions — no need to repeat yourself.", color: "purple" },
    { icon: Siren, title: "Emergency Triage", description: "Describes symptom urgency using the real ESI triage system used in hospitals.", color: "pink" },
    { icon: Shield, title: "HIPAA Compliant", description: "All data is encrypted, PII is auto-scrubbed, and access is tightly controlled.", color: "green" },
];

// Overview Tab Content
function OverviewTab() {
    return (
        <div className="space-y-10">
            {/* What is HeartGuard */}
            <section>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <Heart className="text-red-500 w-7 h-7" /> What is HeartGuard AI?
                </h2>
                <p className="text-text-secondary leading-relaxed text-lg max-w-3xl">
                    HeartGuard AI is an <span className="text-primary font-semibold">intelligent medical chatbot</span> built specifically
                    for heart health. Unlike regular chatbots that guess answers, HeartGuard actually
                    <span className="text-secondary font-semibold"> retrieves real medical knowledge</span>, verifies its own answers,
                    and cites trusted sources — just like a doctor would.
                </p>
            </section>

            {/* Why it's different */}
            <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                    <Sparkles className="text-secondary w-6 h-6" /> Why Is This Different?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="font-bold text-text-primary text-lg">The Problem</h3>
                        <p className="text-text-tertiary text-sm leading-relaxed">
                            Regular AI chatbots <span className="text-red-500 font-medium">hallucinate</span> — they make up
                            medical facts that sound right but are wrong. In healthcare, that can be dangerous.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Search className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-text-primary text-lg">Our Approach</h3>
                        <p className="text-text-tertiary text-sm leading-relaxed">
                            HeartGuard uses a <span className="text-primary font-medium">Self-Correcting RAG pipeline</span> —
                            it searches real medical literature, then <em>grades its own answer</em> for accuracy before responding.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="font-bold text-text-primary text-lg">The Result</h3>
                        <p className="text-text-tertiary text-sm leading-relaxed">
                            Medically grounded answers with <span className="text-green-500 font-medium">citations</span>,
                            reduced hallucinations, and a system that admits when it&apos;s not sure — rather than guessing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Capabilities Grid */}
            <section>
                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                    <Zap className="text-primary w-6 h-6" /> What Can It Do?
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {capabilities.map((cap, index) => {
                        const Icon = cap.icon;
                        return (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className={`p-5 rounded-2xl bg-card-bg border border-border hover:border-${cap.color}-500/40 hover:shadow-lg hover:shadow-${cap.color}-500/5 transition-all duration-300 group`}
                            >
                                <div className={`w-11 h-11 rounded-xl bg-${cap.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-5 h-5 text-${cap.color}-500`} />
                                </div>
                                <h3 className="font-bold text-text-primary mb-2">{cap.title}</h3>
                                <p className="text-sm text-text-tertiary leading-relaxed">{cap.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Toughest Bug */}
            <section className="bg-card-bg border-l-4 border-red-500 rounded-r-2xl p-8">
                <h2 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                    <ShieldCheck className="text-red-500 w-5 h-5" /> The Toughest Bug I Fixed
                </h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                    <strong>The &quot;Infinite Loop&quot; Problem:</strong> The Critic Agent was too strict — it kept rejecting
                    answers and asking for more citations, but the Research Agent kept returning the same sources.
                    This created an endless loop.
                </p>
                <p className="text-text-secondary leading-relaxed">
                    <strong>My Solution:</strong> I built a <span className="text-primary font-semibold">&quot;Confidence Decay&quot;</span> mechanism.
                    If the Critic rejects an answer twice, the system switches to a &quot;Safe Uncertainty&quot; mode — it honestly
                    tells the user it couldn&apos;t find a perfect answer, rather than getting stuck forever.
                    This made the system <span className="text-green-500 font-semibold">100% more reliable</span>.
                </p>
            </section>
        </div>
    );
}

// How It Works Tab Content
function HowItWorksTab() {
    const agents = [
        { name: "Medical Analyst", role: "Answers general medical questions using verified sources", icon: Stethoscope, color: "blue" },
        { name: "Drug Expert", role: "Checks drug interactions & side effects via FDA data", icon: Pill, color: "orange" },
        { name: "Heart Analyst", role: "Predicts heart disease risk from patient vitals", icon: Heart, color: "red" },
        { name: "Researcher", role: "Does deep research for complex or rare conditions", icon: Search, color: "purple" },
        { name: "Thinking Agent", role: "Breaks down complex problems step-by-step", icon: Brain, color: "teal" },
        { name: "Clinical Triage", role: "Assesses emergency severity (ESI triage levels)", icon: Siren, color: "pink" },
        { name: "Data Analyst", role: "Queries patient vitals & history from the database", icon: BarChart2, color: "green" },
        { name: "EHR Agent", role: "Connects to electronic health records via FHIR", icon: FileText, color: "cyan" },
    ];

    return (
        <div className="space-y-10">
            {/* Simple Flow */}
            <section>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <Workflow className="text-primary w-7 h-7" /> How Does It Work?
                </h2>
                <p className="text-text-secondary leading-relaxed text-lg max-w-3xl mb-8">
                    Think of HeartGuard like a <span className="text-primary font-semibold">hospital with specialist doctors</span>.
                    When you ask a question, a smart receptionist (the Router) figures out which specialist should handle it,
                    and that specialist uses their tools to give you the best possible answer.
                </p>

                {/* Visual Flow */}
                <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto">
                    {[
                        { step: "You ask a question", desc: "e.g. \"Is Aspirin safe with Warfarin?\"", icon: MessageSquare, color: "blue" },
                        { step: "Smart Router analyzes intent", desc: "Instantly classifies: is this about drugs, vitals, emergencies, etc.?", icon: Workflow, color: "purple" },
                        { step: "Right specialist takes over", desc: "Drug Expert is selected — it searches FDA data & medical knowledge base", icon: Bot, color: "orange" },
                        { step: "Answer is fact-checked", desc: "A Hallucination Grader verifies the response against real medical sources", icon: CheckCircle, color: "green" },
                        { step: "You get a cited answer", desc: "Clear response with sources, warnings, and confidence level", icon: Sparkles, color: "primary" },
                    ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                className="w-full"
                            >
                                <div className="flex items-start gap-4 p-5 rounded-xl bg-card-bg border border-border hover:border-primary/30 transition-colors">
                                    <div className={`w-10 h-10 rounded-full bg-${item.color}-500/15 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        <Icon className={`w-5 h-5 text-${item.color}-500`} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Step {idx + 1}</span>
                                            <h3 className="font-bold text-text-primary">{item.step}</h3>
                                        </div>
                                        <p className="text-sm text-text-tertiary">{item.desc}</p>
                                    </div>
                                </div>
                                {idx < 4 && (
                                    <div className="flex justify-center py-1">
                                        <div className="w-0.5 h-4 bg-primary/30"></div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Team of AI Agents */}
            <section>
                <h2 className="text-2xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Bot className="text-secondary w-6 h-6" /> The AI Team — 8 Specialist Agents
                </h2>
                <p className="text-text-tertiary mb-6 max-w-2xl">
                    Instead of one AI trying to do everything, HeartGuard has a team of focused specialists —
                    each expert in their own area.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {agents.map((agent, index) => {
                        const Icon = agent.icon;
                        return (
                            <motion.div
                                key={agent.name}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.06, duration: 0.4 }}
                                className={`p-4 rounded-xl bg-${agent.color}-500/5 border border-${agent.color}-500/20 hover:border-${agent.color}-500/40 transition-all`}
                            >
                                <Icon className={`w-6 h-6 text-${agent.color}-500 mb-3`} />
                                <h3 className="font-bold text-text-primary text-sm mb-1">{agent.name}</h3>
                                <p className="text-xs text-text-tertiary leading-relaxed">{agent.role}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Triage System */}
            <section className="bg-card-bg border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Siren className="text-red-500 w-5 h-5" /> Emergency Triage System
                </h2>
                <p className="text-text-tertiary mb-6 text-sm">
                    Uses the same 5-level ESI system that real emergency rooms use to prioritize patients.
                </p>
                <div className="grid grid-cols-5 gap-3">
                    {[
                        { level: "1", name: "Immediate", color: "red", example: "Cardiac arrest" },
                        { level: "2", name: "Emergent", color: "orange", example: "Chest pain, stroke" },
                        { level: "3", name: "Urgent", color: "yellow", example: "Needs labs + ECG" },
                        { level: "4", name: "Less Urgent", color: "green", example: "Minor issue" },
                        { level: "5", name: "Non-Urgent", color: "blue", example: "Routine checkup" },
                    ].map((esi) => (
                        <div key={esi.level} className={`p-3 rounded-xl bg-${esi.color}-500/10 border border-${esi.color}-500/20 text-center`}>
                            <div className={`text-${esi.color}-500 font-extrabold text-lg`}>ESI-{esi.level}</div>
                            <div className="text-xs font-semibold text-text-primary mt-1">{esi.name}</div>
                            <div className="text-xs text-text-tertiary mt-1">{esi.example}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Key Features Tab Content
function FeaturesTab() {
    return (
        <div className="space-y-10">
            {/* Self-Correcting RAG */}
            <section className="bg-card-bg border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Search className="text-secondary w-6 h-6" /> Self-Correcting Knowledge Retrieval
                </h2>
                <p className="text-text-tertiary mb-6 max-w-3xl">
                    Before answering, HeartGuard searches through <strong className="text-text-primary">125K+ medical documents</strong> from
                    trusted sources like StatPearls and PubMed — then it <em>grades its own answer</em> for accuracy.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">Two Search Sources</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-text-secondary font-medium">Vector DB (ChromaDB + pgvector)</span>
                                    <span className="text-xs text-blue-500 font-bold">75%</span>
                                </div>
                                <div className="h-2.5 bg-card-bg-hover rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full" style={{ width: "75%" }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-text-secondary font-medium">Patient Memory</span>
                                    <span className="text-xs text-teal-500 font-bold">25%</span>
                                </div>
                                <div className="h-2.5 bg-card-bg-hover rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-teal-500 to-teal-400 h-full rounded-full" style={{ width: "25%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">Answer Verification</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-xl">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <div>
                                    <div className="text-sm font-semibold text-green-500">Fully Verified</div>
                                    <div className="text-xs text-text-tertiary">Answer matches sources — returned with citations</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                <div>
                                    <div className="text-sm font-semibold text-yellow-500">Partially Supported</div>
                                    <div className="text-xs text-text-tertiary">Some claims unverified — disclaimer added</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <div>
                                    <div className="text-sm font-semibold text-red-500">Not Supported</div>
                                    <div className="text-xs text-text-tertiary">Falls back to web search for fresh information</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Memory System */}
            <section className="bg-card-bg border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Brain className="text-primary w-6 h-6" /> Patient Memory System
                </h2>
                <p className="text-text-tertiary mb-6 max-w-3xl">
                    HeartGuard <strong className="text-text-primary">remembers your health context</strong> across conversations.
                    No more repeating your medications, conditions, or allergies every time.
                </p>

                <div className="grid md:grid-cols-3 gap-5">
                    <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <h3 className="font-bold text-blue-600 dark:text-blue-400">Short-Term</h3>
                        </div>
                        <p className="text-text-tertiary text-sm mb-3">Remembers what you said in the current conversation.</p>
                        <div className="text-xs text-text-muted space-y-1">
                            <div>• Current symptoms</div>
                            <div>• Session context</div>
                            <div>• Recent questions</div>
                        </div>
                    </div>

                    <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Database className="w-5 h-5 text-purple-500" />
                            <h3 className="font-bold text-purple-600 dark:text-purple-400">Long-Term</h3>
                        </div>
                        <p className="text-text-tertiary text-sm mb-3">Stores your medical profile permanently and securely.</p>
                        <div className="text-xs text-text-muted space-y-1">
                            <div>• Medical history</div>
                            <div>• Medications &amp; allergies</div>
                            <div>• Important health findings</div>
                        </div>
                    </div>

                    <div className="p-5 bg-teal-500/5 border border-teal-500/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Search className="w-5 h-5 text-teal-500" />
                            <h3 className="font-bold text-teal-600 dark:text-teal-400">Smart Recall</h3>
                        </div>
                        <p className="text-text-tertiary text-sm mb-3">Automatically pulls relevant memories when you ask something new.</p>
                        <div className="text-xs text-text-muted space-y-1">
                            <div>• Semantic search</div>
                            <div>• Importance scoring</div>
                            <div>• Context-aware retrieval</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security & HIPAA */}
            <section className="bg-card-bg border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Lock className="text-green-500 w-6 h-6" /> Security &amp; Privacy
                </h2>
                <p className="text-text-tertiary mb-6 max-w-3xl">
                    Built with healthcare-grade security from day one. Your health data stays private and protected.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: "PII Auto-Scrubbing", desc: "Personal info is detected and removed from AI responses automatically", icon: Eye },
                        { title: "AES-256 Encryption", desc: "Military-grade encryption for all stored health data", icon: Lock },
                        { title: "Secure Authentication", desc: "JWT tokens with role-based access control", icon: Shield },
                        { title: "Rate Limiting", desc: "Prevents abuse with Redis-backed request throttling", icon: ShieldCheck },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                                <Icon className="w-5 h-5 text-green-500 mb-3" />
                                <h3 className="font-bold text-text-primary text-sm mb-1">{item.title}</h3>
                                <p className="text-xs text-text-tertiary leading-relaxed">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Fine-tuned Model */}
            <section className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Cpu className="text-purple-500 w-5 h-5" /> Custom Fine-Tuned AI Model
                </h2>
                <p className="text-text-tertiary leading-relaxed max-w-3xl">
                    HeartGuard uses Google&apos;s <span className="text-primary font-semibold">MedGemma-4B-IT</span> model, fine-tuned specifically
                    for cardiology using LoRA adapters. This means it understands heart-related medical language far better
                    than a general-purpose AI. The model runs locally with <span className="text-secondary font-semibold">llama.cpp</span> as
                    the inference server — fast, private, and no cloud dependency.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-medium">MedGemma-4B-IT</span>
                    <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium">LoRA Fine-Tuning</span>
                    <span className="px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium">llama.cpp Server</span>
                    <span className="px-3 py-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-medium">Runs Locally</span>
                </div>
            </section>
        </div>
    );
}

// Under the Hood (Tech) Tab Content
function TechTab() {
    return (
        <div className="space-y-10">
            {/* Architecture Diagram */}
            <section className="bg-card-bg border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Workflow className="text-primary w-6 h-6" /> Architecture Diagram
                </h2>
                <p className="text-text-tertiary mb-6 max-w-3xl">
                    A visual overview of how all HeartGuard components connect — from user input to verified medical response.
                </p>

                <div className="flex flex-col items-center space-y-4 font-mono text-sm">
                    {/* User Input */}
                    <div className="px-6 py-3 bg-blue-50 dark:bg-blue-500/20 border border-blue-300 dark:border-blue-500/50 rounded-lg text-blue-600 dark:text-blue-300">
                        💬 User Question
                    </div>
                    <div className="w-0.5 h-6 bg-border"></div>

                    {/* FastAPI */}
                    <div className="px-6 py-3 bg-purple-50 dark:bg-purple-500/20 border border-purple-300 dark:border-purple-500/50 rounded-lg text-purple-600 dark:text-purple-300 w-full max-w-md text-center">
                        <div className="font-bold mb-1">⚡ FastAPI Gateway</div>
                        <div className="text-xs text-text-tertiary">Auth • Rate Limiting • PII Scrubbing</div>
                    </div>
                    <div className="w-0.5 h-6 bg-border"></div>

                    {/* LangGraph Router */}
                    <div className="px-6 py-3 bg-orange-50 dark:bg-orange-500/20 border border-orange-300 dark:border-orange-500/50 rounded-lg text-orange-600 dark:text-orange-300 w-full max-w-lg text-center">
                        <div className="font-bold mb-1">🧠 LangGraph Router</div>
                        <div className="text-xs text-text-tertiary">Intent classification → selects the right specialist agent</div>
                    </div>
                    <div className="w-0.5 h-6 bg-border"></div>

                    {/* 8 Specialist Agents */}
                    <div className="w-full max-w-3xl">
                        <div className="text-center text-xs text-text-tertiary mb-3 font-sans">8 Specialist AI Agents</div>
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { emoji: "🩺", name: "Medical Analyst", color: "blue" },
                                { emoji: "💊", name: "Drug Expert", color: "orange" },
                                { emoji: "❤️", name: "Heart Analyst", color: "red" },
                                { emoji: "🔬", name: "Researcher", color: "purple" },
                                { emoji: "🧠", name: "Thinking Agent", color: "teal" },
                                { emoji: "🚨", name: "Triage Agent", color: "pink" },
                                { emoji: "📊", name: "Data Analyst", color: "green" },
                                { emoji: "📋", name: "EHR Agent", color: "cyan" },
                            ].map((agent) => (
                                <div key={agent.name} className={`p-2 rounded-lg bg-${agent.color}-50 dark:bg-${agent.color}-500/10 border border-${agent.color}-200 dark:border-${agent.color}-500/30 text-center`}>
                                    <div className="text-lg">{agent.emoji}</div>
                                    <div className="text-xs text-text-secondary mt-1">{agent.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-0.5 h-6 bg-border"></div>

                    {/* RAG + Knowledge */}
                    <div className="px-6 py-3 bg-teal-50 dark:bg-teal-500/20 border border-teal-300 dark:border-teal-500/50 rounded-lg text-teal-600 dark:text-teal-300 w-full max-w-lg text-center">
                        <div className="font-bold mb-1">📚 Self-Correcting RAG Pipeline</div>
                        <div className="text-xs text-text-tertiary">125K+ docs • ChromaDB • MedCPT Embeddings • Hallucination Grader</div>
                    </div>
                    <div className="w-0.5 h-6 bg-border"></div>

                    {/* Data Layer */}
                    <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-blue-500"></div>
                            <div className="px-4 py-3 bg-blue-50 dark:bg-blue-500/20 border border-blue-300 dark:border-blue-500/50 rounded-lg text-blue-600 dark:text-blue-300 text-center w-full">
                                <div className="font-bold mb-1">🗄️ PostgreSQL</div>
                                <div className="text-xs text-text-tertiary">27+ tables • RLS</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-purple-500"></div>
                            <div className="px-4 py-3 bg-purple-50 dark:bg-purple-500/20 border border-purple-300 dark:border-purple-500/50 rounded-lg text-purple-600 dark:text-purple-300 text-center w-full">
                                <div className="font-bold mb-1">🔍 ChromaDB</div>
                                <div className="text-xs text-text-tertiary">Vector Search</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-red-500"></div>
                            <div className="px-4 py-3 bg-red-50 dark:bg-red-500/20 border border-red-300 dark:border-red-500/50 rounded-lg text-red-600 dark:text-red-300 text-center w-full">
                                <div className="font-bold mb-1">⚡ Redis</div>
                                <div className="text-xs text-text-tertiary">Cache • Queue</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-0.5 h-6 bg-border"></div>

                    {/* MedGemma */}
                    <div className="px-6 py-3 bg-green-50 dark:bg-green-500/20 border border-green-300 dark:border-green-500/50 rounded-lg text-green-600 dark:text-green-300 w-full max-w-md text-center">
                        <div className="font-bold mb-1">🤖 MedGemma-4B-IT (llama.cpp)</div>
                        <div className="text-xs text-text-tertiary">Fine-tuned for cardiology • LoRA adapters • Runs locally</div>
                    </div>
                    <div className="w-0.5 h-6 bg-border"></div>

                    {/* Output */}
                    <div className="px-6 py-3 bg-green-50 dark:bg-green-500/20 border border-green-300 dark:border-green-500/50 rounded-lg text-green-600 dark:text-green-300">
                        ✅ Verified Response with Citations
                    </div>
                </div>
            </section>

            {/* System Architecture Layers */}
            <section className="bg-card-bg border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Layers className="text-primary w-6 h-6" /> System Layers
                </h2>
                <p className="text-text-tertiary mb-6 max-w-3xl">
                    HeartGuard is built in clean layers — each one has a clear job. This makes it easy to maintain, test, and scale.
                </p>

                <div className="space-y-3">
                    {[
                        { label: "API Layer", desc: "FastAPI endpoints — handles all user requests and authentication", color: "blue" },
                        { label: "Orchestration", desc: "LangGraph routes every request to the right specialist agent", color: "purple" },
                        { label: "Intelligence", desc: "8 AI agents + MedGemma model work together to answer questions", color: "pink" },
                        { label: "Knowledge", desc: "RAG pipeline searches 125K+ docs and patient memory for accurate answers", color: "teal" },
                        { label: "Data & Security", desc: "PostgreSQL + ChromaDB + Redis — all encrypted, all HIPAA-ready", color: "green" },
                    ].map((layer, idx) => (
                        <div key={layer.label} className="flex items-stretch gap-4">
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full bg-${layer.color}-500/20 flex items-center justify-center text-${layer.color}-600 dark:text-${layer.color}-400 font-bold text-sm flex-shrink-0`}>
                                    {idx + 1}
                                </div>
                                {idx < 4 && <div className="w-0.5 flex-1 bg-border mt-1"></div>}
                            </div>
                            <div className="pb-4 flex-1">
                                <h3 className="font-bold text-text-primary">{layer.label}</h3>
                                <p className="text-sm text-text-tertiary">{layer.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Database Design */}
            <section className="bg-card-bg border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Database className="text-green-500 w-6 h-6" /> Database Design
                </h2>
                <p className="text-text-tertiary mb-6 max-w-3xl">
                    Three databases, each chosen for what it does best — structured data, vector search, and speed.
                </p>

                <div className="grid md:grid-cols-3 gap-5">
                    <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <Database className="w-6 h-6 text-blue-500" />
                            <h3 className="font-bold text-text-primary">PostgreSQL</h3>
                        </div>
                        <p className="text-sm text-text-tertiary mb-3">The main relational database — stores user data, chat history, and patient memories.</p>
                        <div className="text-xs text-text-muted space-y-1">
                            <div>• 27+ tables with RLS security</div>
                            <div>• User accounts, vitals &amp; medications</div>
                            <div>• Chat sessions &amp; messages</div>
                            <div>• Patient memory (short &amp; long term)</div>
                        </div>
                    </div>

                    <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <Search className="w-6 h-6 text-purple-500" />
                            <h3 className="font-bold text-text-primary">ChromaDB</h3>
                        </div>
                        <p className="text-sm text-text-tertiary mb-3">Vector database — powers the RAG pipeline by searching through medical documents.</p>
                        <div className="text-xs text-text-muted space-y-1">
                            <div>• 125K+ medical document embeddings</div>
                            <div>• MedCPT 768-dim text vectors</div>
                            <div>• SigLIP 1152-dim image vectors</div>
                            <div>• Cosine similarity search</div>
                        </div>
                    </div>

                    <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="w-6 h-6 text-red-500" />
                            <h3 className="font-bold text-text-primary">Redis</h3>
                        </div>
                        <p className="text-sm text-text-tertiary mb-3">Lightning-fast cache and session store — keeps the system responsive.</p>
                        <div className="text-xs text-text-muted space-y-1">
                            <div>• Response caching</div>
                            <div>• Session management</div>
                            <div>• Background job queue</div>
                            <div>• Rate limiting</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools & Integrations */}
            <section className="bg-card-bg border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Wrench className="text-orange-500 w-6 h-6" /> Tools &amp; Integrations
                </h2>
                <p className="text-text-tertiary mb-6 max-w-3xl">
                    HeartGuard has <strong className="text-text-primary">27 built-in tools</strong> that agents can use.
                    Here are the most important ones:
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { name: "Medical Knowledge Search", desc: "Searches through 125K+ medical documents to find relevant information", icon: Search, color: "blue" },
                        { name: "Drug Safety Checker", desc: "Checks FDA databases for drug interactions, side effects, and recalls", icon: ShieldCheck, color: "green" },
                        { name: "Medical Image Analysis", desc: "Analyzes medical images including X-rays and DICOM files", icon: Eye, color: "purple" },
                        { name: "Web Research", desc: "Searches the web for latest medical information when local sources aren't enough", icon: Globe, color: "teal" },
                        { name: "Health Records (FHIR)", desc: "Connects to hospital systems using the FHIR healthcare standard", icon: Server, color: "orange" },
                        { name: "Safe Calculator", desc: "Performs medical calculations securely without code injection risks", icon: Cpu, color: "pink" },
                    ].map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <div key={tool.name} className={`p-4 bg-${tool.color}-500/5 border border-${tool.color}-500/20 rounded-xl`}>
                                <Icon className={`w-5 h-5 text-${tool.color}-500 mb-3`} />
                                <h3 className="font-bold text-text-primary text-sm mb-1">{tool.name}</h3>
                                <p className="text-xs text-text-tertiary leading-relaxed">{tool.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* How It All Runs */}
            <section className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-border rounded-2xl p-8">
                <h2 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-3">
                    <Server className="text-blue-500 w-5 h-5" /> How It All Runs
                </h2>
                <p className="text-text-tertiary leading-relaxed max-w-3xl mb-4">
                    The entire system is containerized with <span className="text-primary font-semibold">Docker</span> and
                    orchestrated with Docker Compose. The backend is built on <span className="text-secondary font-semibold">FastAPI</span> (Python)
                    with async support for handling multiple requests simultaneously. The LLM runs locally
                    via <span className="text-primary font-semibold">llama.cpp</span>, and background tasks run via Redis-backed job queues.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium">FastAPI</span>
                    <span className="px-3 py-1.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-medium">LangGraph</span>
                    <span className="px-3 py-1.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg text-sm font-medium">Docker Compose</span>
                    <span className="px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium">llama.cpp</span>
                    <span className="px-3 py-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-medium">Redis Job Queue</span>
                </div>
            </section>
        </div>
    );
}

export default function HeartGuardCaseStudy() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return <OverviewTab />;
            case "how-it-works":
                return <HowItWorksTab />;
            case "features":
                return <FeaturesTab />;
            case "tech":
                return <TechTab />;
            default:
                return <OverviewTab />;
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
                        <button onClick={() => router.back()} className="inline-flex items-center text-text-tertiary hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                        </button>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            HeartGuard <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text-secondary mb-6">
                            Your AI-Powered Heart Health Companion — Built for Accuracy, Privacy, and Trust
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-card-bg border border-border rounded-full text-sm text-text-secondary">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Key Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {keyStats.map((stat, index) => (
                                <div key={index} className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} border border-border text-center`}>
                                    <stat.icon className="w-5 h-5 text-text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                                    <div className="text-xs text-text-secondary">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <a href="https://github.com/9046balaji/Heart" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-card-bg-hover hover:bg-black/5 dark:hover:bg-white/20 rounded-lg font-medium flex items-center gap-2 transition-colors">
                                <Github className="w-5 h-5" /> View Code
                            </a>
                        </div>

                        <ProjectStats slug="heartguard-ai" />
                    </motion.div>

                    {/* Tab Navigation */}
                    <div className="mb-8 overflow-x-auto">
                        <div className="flex gap-2 p-1 bg-card-bg rounded-xl min-w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                            ? "bg-primary text-white"
                                            : "text-text-tertiary hover:text-text-primary hover:bg-card-bg-hover"
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

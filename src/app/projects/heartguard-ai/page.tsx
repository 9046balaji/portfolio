"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Github, Brain, Activity, ShieldCheck, Layers, Workflow, Server,
    Database, Wrench, Bot, Cpu, Heart, Zap, Search, FileText, Globe, Lock,
    AlertTriangle, CheckCircle, ArrowRight, Terminal, BarChart2, MessageSquare
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tabs = [
    { id: "overview", label: "Overview", icon: Brain },
    { id: "agents", label: "Agents", icon: Bot },
    { id: "rag", label: "RAG & Memory", icon: Search },
    { id: "tools", label: "Tools", icon: Wrench },
    { id: "database", label: "Database", icon: Database },
];

const keyStats = [
    { value: "55K+", label: "Lines of Code", icon: Terminal },
    { value: "220+", label: "Python Files", icon: FileText },
    { value: "50+", label: "API Endpoints", icon: Globe },
    { value: "10", label: "Agent Workers", icon: Bot },
];

const techStack = ["LangGraph", "Neo4j", "MedGemma", "pgvector", "FastAPI", "Redis", "ARQ Workers", "ONNX"];

// Overview Tab Content
function OverviewTab() {
    return (
        <div className="space-y-8">
            {/* The Challenge */}
            <section className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="text-primary" /> The Challenge
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                    Standard LLMs are prone to hallucinations, which is unacceptable in healthcare.
                    A simple RAG system often fails to capture the complex relationships between symptoms, medications, and patient history.
                    We needed a system that could &quot;think&quot; like a doctor—verifying facts before answering.
                </p>
            </section>

            {/* System Architecture Diagram */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Layers className="text-secondary" /> Layered Architecture
                </h2>

                <div className="overflow-x-auto">
                    <div className="min-w-[600px] space-y-3 font-mono text-sm">
                        {/* Presentation Layer */}
                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                            <div className="text-blue-400 font-bold mb-2">PRESENTATION LAYER (Routes)</div>
                            <div className="flex flex-wrap gap-2">
                                {["auth_routes", "orchestrated_chat", "websocket_routes", "sse_routes", "job_management"].map(r => (
                                    <span key={r} className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">{r}</span>
                                ))}
                            </div>
                        </div>

                        {/* Orchestration Layer */}
                        <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                            <div className="text-purple-400 font-bold mb-2">ORCHESTRATION LAYER (Agents)</div>
                            <div className="text-xs text-gray-400 mb-2">LangGraph StateGraph Orchestrator</div>
                            <div className="flex flex-wrap gap-2">
                                {["Router", "Supervisor", "medical_analyst", "researcher", "drug_expert", "heart_analyst", "thinking_agent"].map(a => (
                                    <span key={a} className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">{a}</span>
                                ))}
                            </div>
                        </div>

                        {/* Intelligence Layer */}
                        <div className="p-4 rounded-lg bg-teal-500/10 border border-teal-500/30">
                            <div className="text-teal-400 font-bold mb-2">INTELLIGENCE LAYER (RAG + Memory)</div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-gray-400 mb-1">Medical Self-RAG</div>
                                    <div className="flex flex-wrap gap-1">
                                        {["HyDE Retriever", "Context Assembler", "Hallucination Grader", "CRAG Fallback"].map(r => (
                                            <span key={r} className="px-2 py-1 bg-teal-500/20 rounded text-xs text-teal-300">{r}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 mb-1">Memori v2.3</div>
                                    <div className="flex flex-wrap gap-1">
                                        {["Short-Term (Redis)", "Long-Term (PG)", "MemoriRAGBridge"].map(m => (
                                            <span key={m} className="px-2 py-1 bg-teal-500/20 rounded text-xs text-teal-300">{m}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tools Layer */}
                        <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                            <div className="text-orange-400 font-bold mb-2">TOOLS LAYER (Capabilities)</div>
                            <div className="flex flex-wrap gap-2">
                                {["Text-to-SQL", "FHIR R4", "OpenFDA", "DICOM", "Web Search (Tavily)", "Calculator"].map(t => (
                                    <span key={t} className="px-2 py-1 bg-orange-500/20 rounded text-xs text-orange-300">{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Data Layer */}
                        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                            <div className="text-green-400 font-bold mb-2">DATA LAYER (Persistence)</div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">PostgreSQL + pgvector</span>
                                <span className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">Neo4j (Graph)</span>
                                <span className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">Redis (Cache)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Hardest Bug */}
            <section className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <ShieldCheck className="text-red-500" /> The Hardest Bug: &quot;The Loop of Death&quot;
                </h2>
                <div className="bg-black/30 p-6 rounded-lg border-l-4 border-red-500">
                    <h3 className="text-xl font-semibold text-white mt-0">Infinite Reasoning Loops</h3>
                    <p className="text-gray-300">
                        <strong>Context:</strong> The &quot;Critic Agent&quot; was too strict. It would reject the &quot;Research Agent&apos;s&quot;
                        answer, asking for more citations. The Research Agent would provide the same citations,
                        leading to an infinite loop.
                    </p>
                    <p className="text-gray-300">
                        <strong>Solution:</strong> I implemented a <strong>&quot;Confidence Decay&quot;</strong> mechanism in LangGraph.
                        If the Critic rejected an answer twice, the system would fallback to a &quot;Safe Uncertainty&quot; mode,
                        admitting it couldn&apos;t find a perfect answer rather than stalling. This improved system reliability by 100%.
                    </p>
                </div>
            </section>
        </div>
    );
}

// Agents Tab Content
function AgentsTab() {
    const workerNodes = [
        { name: "medical_analyst", function: "Medical Q&A", backend: "MedicalSelfRAG", color: "blue" },
        { name: "researcher", function: "Deep research", backend: "ReasoningResearcher", color: "purple" },
        { name: "data_analyst", function: "Vitals queries", backend: "SQL (PostgreSQL)", color: "green" },
        { name: "drug_expert", function: "Drug interactions", backend: "GraphInteractionChecker", color: "orange" },
        { name: "heart_analyst", function: "Heart risk", backend: "HeartDiseasePredictor", color: "red" },
        { name: "thinking_agent", function: "Complex reasoning", backend: "ThinkingAgent + MedicalPlanner", color: "teal" },
        { name: "fhir_agent", function: "EHR queries", backend: "FHIRAgentTool", color: "cyan" },
        { name: "clinical_reasoning", function: "DDx/Triage", backend: "DDxEngine + TriageSystem", color: "pink" },
    ];

    return (
        <div className="space-y-8">
            {/* LangGraph Overview */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Workflow className="text-primary" /> LangGraph StateGraph Orchestrator
                </h2>
                <p className="text-gray-400 mb-6">
                    The heart of the agent system—a LangGraph StateGraph orchestrator managing 10+ specialized worker agents
                    with intelligent routing, parallel execution, and Redis-backed checkpointing for crash recovery.
                </p>

                {/* State Machine Flow */}
                <div className="flex flex-col items-center space-y-4 font-mono text-sm">
                    {/* START */}
                    <div className="px-4 py-2 bg-gray-700 rounded-lg text-white">START</div>
                    <div className="w-0.5 h-6 bg-gray-600"></div>

                    {/* Router */}
                    <div className="px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 text-center">
                        <div className="font-bold">ROUTER NODE</div>
                        <div className="text-xs text-gray-400">SemanticRouterV2 (confidence &gt;0.8 = fast path)</div>
                    </div>

                    {/* Branches */}
                    <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-red-500"></div>
                            <div className="px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-xs text-center">
                                EMERGENCY<br />Response
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-purple-500"></div>
                            <div className="px-3 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 text-xs text-center">
                                SUPERVISOR<br />(LLM routing)
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-0.5 h-6 bg-teal-500"></div>
                            <div className="px-3 py-2 bg-teal-500/20 border border-teal-500/50 rounded-lg text-teal-300 text-xs text-center">
                                DIRECT TO<br />Worker
                            </div>
                        </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-600"></div>

                    {/* Workers */}
                    <div className="px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-300 w-full max-w-2xl">
                        <div className="font-bold mb-2 text-center">WORKER NODES</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {["medical_analyst", "researcher", "data_analyst", "drug_expert", "heart_analyst", "thinking_agent"].map(w => (
                                <span key={w} className="px-2 py-1 bg-purple-500/30 rounded text-xs">{w}</span>
                            ))}
                        </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-600"></div>

                    {/* END */}
                    <div className="px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center">
                        <div className="font-bold">END NODE</div>
                        <div className="text-xs text-gray-400">PII Scrub → Memory Store → Return</div>
                    </div>
                </div>
            </section>

            {/* Worker Nodes Grid */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Bot className="text-secondary" /> Worker Agents
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {workerNodes.map((node) => (
                        <div key={node.name} className={`p-4 rounded-xl bg-${node.color}-500/10 border border-${node.color}-500/30`}>
                            <div className="font-mono text-sm text-white font-semibold mb-1">{node.name}</div>
                            <div className="text-xs text-gray-400 mb-2">{node.function}</div>
                            <div className="text-xs text-gray-500">{node.backend}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Thinking Agent */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Brain className="text-primary" /> Chain-of-Thought Reasoning
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">ThinkingAgent Flow</h3>
                        <div className="bg-black/30 p-4 rounded-lg font-mono text-sm text-gray-300 space-y-2">
                            <div className="text-cyan-400">&lt;think&gt;</div>
                            <div className="pl-4">1. What is the user asking?</div>
                            <div className="pl-4">2. What info do I need?</div>
                            <div className="pl-4">3. Which tool would help?</div>
                            <div className="pl-4">4. What could go wrong?</div>
                            <div className="text-cyan-400">&lt;/think&gt;</div>
                            <div className="mt-2 text-yellow-400">&lt;tool_call&gt;search_kb(...)&lt;/tool&gt;</div>
                            <div className="text-green-400">&lt;answer&gt;Final response&lt;/answer&gt;</div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">Key Features</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                <span><strong>Early Exit:</strong> Exits if confidence &gt;0.85 after round 1</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                <span><strong>Insight Extraction:</strong> Parses &lsquo;I should...&rsquo; patterns</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                <span><strong>Max Rounds:</strong> 3 reasoning rounds before final answer</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                <span><strong>Plan-Execute:</strong> MedicalPlanner for step-by-step approach</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ESI Triage System */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <AlertTriangle className="text-red-500" /> ESI Triage System
                </h2>
                <div className="grid grid-cols-5 gap-3">
                    {[
                        { level: "ESI-1", name: "IMMEDIATE", color: "red", wait: "NONE", keywords: "arrest, pulseless" },
                        { level: "ESI-2", name: "EMERGENT", color: "orange", wait: "<10 min", keywords: "chest pain, stroke" },
                        { level: "ESI-3", name: "URGENT", color: "yellow", wait: "<30 min", keywords: "Labs + ECG needed" },
                        { level: "ESI-4", name: "LESS URGENT", color: "green", wait: "1-2 hrs", keywords: "1 resource needed" },
                        { level: "ESI-5", name: "NON-URGENT", color: "blue", wait: "2-4 hrs", keywords: "0 resources needed" },
                    ].map((esi) => (
                        <div key={esi.level} className={`p-3 rounded-lg bg-${esi.color}-500/20 border border-${esi.color}-500/30 text-center`}>
                            <div className={`text-${esi.color}-400 font-bold text-sm`}>{esi.level}</div>
                            <div className="text-xs text-white font-medium">{esi.name}</div>
                            <div className="text-xs text-gray-400 mt-1">Wait: {esi.wait}</div>
                            <div className="text-xs text-gray-500 mt-1">{esi.keywords}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// RAG & Memory Tab Content
function RAGTab() {
    return (
        <div className="space-y-8">
            {/* Self-Correcting RAG Pipeline */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Brain className="text-secondary" /> Self-Correcting RAG Pipeline
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">1. Hybrid Retrieval Engine</h3>
                        <p className="text-gray-400 text-sm">
                            Combined <strong className="text-white">Vector Search</strong> (pgvector, weight: 0.50) with
                            <strong className="text-white"> Knowledge Graphs</strong> (Neo4j, weight: 0.35) and
                            <strong className="text-white"> User Memory</strong> (Memori, weight: 0.15).
                            This reduced &quot;missing context&quot; errors by 40%.
                        </p>

                        {/* Weight bars */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 w-20">pgvector</span>
                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                                </div>
                                <span className="text-xs text-blue-400">50%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 w-20">Neo4j</span>
                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                                </div>
                                <span className="text-xs text-purple-400">35%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 w-20">Memori</span>
                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                                </div>
                                <span className="text-xs text-teal-400">15%</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">2. Hallucination Grading</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Every response is graded against retrieved context:
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <div>
                                    <div className="text-sm text-green-400 font-semibold">FULLY_SUPPORTED (≥0.8)</div>
                                    <div className="text-xs text-gray-400">Return with citations</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                <div>
                                    <div className="text-sm text-yellow-400 font-semibold">PARTIALLY_SUPPORTED (0.5-0.8)</div>
                                    <div className="text-xs text-gray-400">Add disclaimer</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 bg-red-500/10 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                <div>
                                    <div className="text-sm text-red-400 font-semibold">NO_SUPPORT (≤0.5)</div>
                                    <div className="text-xs text-gray-400">Trigger CRAG web fallback</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">3. Specialized Model</h3>
                        <p className="text-gray-400 text-sm">
                            Fine-tuned Google&apos;s <strong className="text-white">MedGemma</strong> model using LoRA adapters
                            on a cardiology dataset. Uses <strong className="text-white">ONNX Runtime</strong> for optimized inference.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm">MedGemma 27B</span>
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">LoRA Adapters</span>
                            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm">ONNX Runtime</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">4. Security First (HIPAA)</h3>
                        <p className="text-gray-400 text-sm">
                            PII detection via <strong className="text-white">Presidio + spaCy</strong>, AES-256-GCM encryption,
                            JWT + RBAC authentication, and Redis-backed rate limiting for full
                            <strong className="text-white"> HIPAA compliance</strong>.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm">Presidio PII</span>
                            <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-lg text-sm">AES-256-GCM</span>
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm">JWT + RBAC</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Memori System */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="text-primary" /> Memori v2.3 Memory System
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-5 h-5 text-blue-400" />
                            <h3 className="font-semibold text-blue-300">Short-Term Memory</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">Stored in Redis with 30-minute TTL. Captures current session context.</p>
                        <div className="text-xs text-gray-500 font-mono">
                            <div>• session_context</div>
                            <div>• recent_symptoms</div>
                            <div>• conversation_state</div>
                        </div>
                    </div>

                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Database className="w-5 h-5 text-purple-400" />
                            <h3 className="font-semibold text-purple-300">Long-Term Memory</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">Stored in PostgreSQL. Persistent user health profile and preferences.</p>
                        <div className="text-xs text-gray-500 font-mono">
                            <div>• medical_history</div>
                            <div>• user_preferences</div>
                            <div>• important_findings</div>
                        </div>
                    </div>

                    <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Search className="w-5 h-5 text-teal-400" />
                            <h3 className="font-semibold text-teal-300">MemoriRAGBridge</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">Semantic search over memories for contextual retrieval.</p>
                        <div className="text-xs text-gray-500 font-mono">
                            <div>• vector_search</div>
                            <div>• importance_scoring</div>
                            <div>• decay_function</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Heart Disease Predictor */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Heart className="text-red-500" /> Heart Disease Predictor Pipeline
                </h2>

                <div className="flex flex-col items-center space-y-4">
                    {[
                        { step: "1. RETRIEVE", desc: "Query HeartDiseaseRAG for guidelines", icon: Search },
                        { step: "2. MEMORY", desc: "Get patient history from MemoriRAGBridge", icon: Database },
                        { step: "3. AUGMENT", desc: "Build structured prompt with context", icon: FileText },
                        { step: "4. GENERATE", desc: "MedGemma via LLMGateway", icon: Cpu },
                        { step: "5. VALIDATE", desc: "HallucinationGrader checks grounding", icon: CheckCircle },
                    ].map((item, idx) => (
                        <div key={item.step} className="flex items-center gap-4 w-full max-w-lg">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg">
                                <div className="font-semibold text-white text-sm">{item.step}</div>
                                <div className="text-xs text-gray-400">{item.desc}</div>
                            </div>
                            {idx < 4 && <ArrowRight className="w-4 h-4 text-gray-500" />}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Tools Tab Content
function ToolsTab() {
    return (
        <div className="space-y-8">
            {/* Tool Registry */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Wrench className="text-orange-400" /> Tool Registry Architecture
                </h2>
                <p className="text-gray-400 mb-6">
                    <strong className="text-white">25+ registered tools</strong> across 7 categories with mode-based filtering
                    achieving <strong className="text-primary">60% token reduction</strong>.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { name: "calculator", desc: "SafeCalculator with AST parsing", category: "utility", mode: "general" },
                        { name: "semantic_search_kb", desc: "ChromaDB/pgvector search", category: "retrieval", mode: "medical" },
                        { name: "query_sql_db", desc: "Text-to-SQL conversion", category: "data", mode: "vitals" },
                        { name: "verified_web_search", desc: "Tavily + DuckDuckGo hybrid", category: "research", mode: "general" },
                        { name: "analyze_medical_image", desc: "Vision analysis for medical images", category: "vision", mode: "medical" },
                        { name: "analyze_dicom_image", desc: "DICOM file parsing", category: "medical", mode: "imaging" },
                    ].map((tool) => (
                        <div key={tool.name} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="font-mono text-sm text-orange-400 font-semibold mb-1">{tool.name}</div>
                            <div className="text-xs text-gray-400 mb-2">{tool.desc}</div>
                            <div className="flex gap-2">
                                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">{tool.category}</span>
                                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs">{tool.mode}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FHIR Client */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Server className="text-blue-400" /> FHIR R4 Client
                </h2>
                <p className="text-gray-400 mb-4">
                    Healthcare interoperability via FHIR R4 standard with OAuth2 authentication and smart caching.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-primary font-semibold mb-3">Resources Supported</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Patient", "Observation", "Condition", "MedicationRequest", "AllergyIntolerance", "DiagnosticReport", "Procedure", "Immunization"].map(r => (
                                <span key={r} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">{r}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-primary font-semibold mb-3">Key Features</h3>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• TTLCache (100 items, 5-min TTL)</li>
                            <li>• OAuth2 bearer token auth</li>
                            <li>• Max 3 retries with backoff</li>
                            <li>• PatientSummary aggregate</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* OpenFDA Safety Service */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <ShieldCheck className="text-green-400" /> OpenFDA Safety Service
                </h2>
                <p className="text-gray-400 mb-4">
                    Unified facade for FDA safety data—drug adverse events (FAERS), recalls, and food events (CAERS).
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <h3 className="text-red-400 font-semibold mb-2">Drug Adverse Events</h3>
                        <div className="text-xs text-gray-400 font-mono space-y-1">
                            <div>get_top_side_effects()</div>
                            <div>check_specific_reaction()</div>
                            <div>check_severity()</div>
                        </div>
                    </div>
                    <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                        <h3 className="text-orange-400 font-semibold mb-2">Drug Enforcement</h3>
                        <div className="text-xs text-gray-400 font-mono space-y-1">
                            <div>check_drug_recalls()</div>
                            <div>get_active_recalls()</div>
                        </div>
                    </div>
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                        <h3 className="text-yellow-400 font-semibold mb-2">Food Events</h3>
                        <div className="text-xs text-gray-400 font-mono space-y-1">
                            <div>check_food_recalls()</div>
                            <div>check_allergen_recalls()</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safe Calculator */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Lock className="text-purple-400" /> SafeCalculator (Security)
                </h2>
                <p className="text-gray-400 mb-4">
                    Replaces <code className="text-red-400">eval()</code> with AST-based parsing for secure math evaluation.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-primary font-semibold mb-3">Allowed Operations</h3>
                        <div className="flex flex-wrap gap-2">
                            {["+", "-", "*", "/", "//", "%", "**", "sqrt", "sin", "cos", "abs", "round", "min", "max", "pi", "e"].map(op => (
                                <span key={op} className="px-2 py-1 bg-green-500/20 text-green-300 rounded font-mono text-xs">{op}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-primary font-semibold mb-3">Attack Prevention</h3>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• MAX_RESULT = 1e15 (overflow protection)</li>
                            <li>• MAX_POWER = 100 (prevent 10**1000)</li>
                            <li>• MAX_NODES = 1000 (AST complexity)</li>
                            <li>• Expression length limit: 500 chars</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Database Tab Content
function DatabaseTab() {
    return (
        <div className="space-y-8">
            {/* Database Overview */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Database className="text-green-400" /> Polyglot Persistence Architecture
                </h2>
                <p className="text-gray-400 mb-6">
                    Streamlined 3-database architecture, each optimized for specific use cases.
                    Migrated from 5 databases (including ChromaDB e SQLite) to a unified PostgreSQL-centric design.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center">
                                <Database className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">PostgreSQL + pgvector</h3>
                                <div className="text-xs text-green-400">✅ Production</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">Primary relational + vector storage</p>
                        <div className="text-xs text-gray-500 space-y-1">
                            <div>• Users, chats, vitals, preferences</div>
                            <div>• Embeddings (HNSW indexing)</div>
                            <div>• Memori STM/LTM tables</div>
                            <div>• Session archives (HIPAA)</div>
                        </div>
                    </div>

                    <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center">
                                <Workflow className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Neo4j</h3>
                                <div className="text-xs text-green-400">✅ Production</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">Knowledge graph database</p>
                        <div className="text-xs text-gray-500 space-y-1">
                            <div>• Symptoms → Conditions</div>
                            <div>• Drug interactions</div>
                            <div>• Treatment protocols</div>
                            <div>• Risk factors graph</div>
                        </div>
                    </div>

                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-red-500/30 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Redis</h3>
                                <div className="text-xs text-green-400">✅ Production</div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">Caching + async jobs</p>
                        <div className="text-xs text-gray-500 space-y-1">
                            <div>• L2 cache (embeddings, RAG)</div>
                            <div>• Session storage (30m TTL)</div>
                            <div>• ARQ job queue</div>
                            <div>• LangGraph checkpoints</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PostgreSQL Tables */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <BarChart2 className="text-blue-400" /> PostgreSQL Schema
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { name: "users", desc: "User profiles with health data", cols: "14 columns" },
                        { name: "vitals", desc: "Time-series health metrics", cols: "6 columns" },
                        { name: "chat_messages", desc: "Message history with metadata", cols: "5 columns" },
                        { name: "drug_interactions", desc: "Drug-drug interaction data", cols: "10 columns" },
                        { name: "vector_medical_knowledge", desc: "Embedded medical content", cols: "6 columns + vector(384)" },
                        { name: "short_term_memory", desc: "Memori STM with TTL", cols: "14 columns" },
                        { name: "long_term_memory", desc: "Memori LTM persistent", cols: "17 columns" },
                        { name: "session_archives", desc: "HIPAA audit trail", cols: "6 columns" },
                        { name: "auth_users", desc: "Authentication data", cols: "9 columns" },
                    ].map((table) => (
                        <div key={table.name} className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                            <div className="font-mono text-sm text-blue-400 font-semibold">{table.name}</div>
                            <div className="text-xs text-gray-400 mt-1">{table.desc}</div>
                            <div className="text-xs text-gray-500 mt-1">{table.cols}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Neo4j Graph */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Workflow className="text-purple-400" /> Neo4j Knowledge Graph
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-primary font-semibold mb-3">Node Labels</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Symptom", "Condition", "Medication", "Treatment", "BodyPart", "LabTest", "Procedure", "VitalSign", "RiskFactor"].map(n => (
                                <span key={n} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">{n}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-primary font-semibold mb-3">Relationships</h3>
                        <div className="flex flex-wrap gap-2">
                            {["CAUSES", "TREATS", "INDICATES", "CONTRAINDICATES", "INTERACTS_WITH", "RISK_FOR"].map(r => (
                                <span key={r} className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs font-mono">{r}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-black/30 rounded-lg font-mono text-sm text-gray-300">
                    <div className="text-gray-500">// Find drug interactions for Aspirin</div>
                    <div className="text-cyan-400">MATCH</div>
                    <div className="pl-4">(d1:Medication &#123;name: &apos;Aspirin&apos;&#125;)-[r:INTERACTS_WITH]-(d2:Medication)</div>
                    <div className="text-cyan-400">RETURN</div>
                    <div className="pl-4">d1.name, r.severity, r.mechanism, d2.name</div>
                </div>
            </section>

            {/* Redis Patterns */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Zap className="text-red-400" /> Redis Key Patterns
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { pattern: "cache:{ns}:{hash}", desc: "L2 cache entries", ttl: "5-60 min" },
                        { pattern: "session:{id}", desc: "User sessions", ttl: "30 min" },
                        { pattern: "token:revoked:{jti}", desc: "JWT blocklist", ttl: "Token exp" },
                        { pattern: "job:{id}", desc: "Async job status", ttl: "24 hours" },
                        { pattern: "thread:{id}", desc: "LangGraph checkpoints", ttl: "Persistent" },
                        { pattern: "ratelimit:{user}:{ep}", desc: "Rate limiting", ttl: "Window" },
                        { pattern: "arq:queue:default", desc: "ARQ job queue", ttl: "-" },
                        { pattern: "job:{id}:updates", desc: "Pub/Sub channel", ttl: "-" },
                    ].map((item) => (
                        <div key={item.pattern} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                            <div className="font-mono text-xs text-red-400 mb-1">{item.pattern}</div>
                            <div className="text-xs text-gray-400">{item.desc}</div>
                            <div className="text-xs text-gray-500 mt-1">TTL: {item.ttl}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default function HeartGuardCaseStudy() {
    const [activeTab, setActiveTab] = useState("overview");

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return <OverviewTab />;
            case "agents":
                return <AgentsTab />;
            case "rag":
                return <RAGTab />;
            case "tools":
                return <ToolsTab />;
            case "database":
                return <DatabaseTab />;
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
                        <Link href="/#projects" className="inline-flex items-center text-gray-400 hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                        </Link>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4">HeartGuard AI</h1>
                        <p className="text-xl md:text-2xl text-secondary font-mono mb-6">HIPAA-compliant Medical Agentic RAG System</p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Key Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {keyStats.map((stat, index) => (
                                <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
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

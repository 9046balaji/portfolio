"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Github, FileText, Server, Lock, Zap, Database, Cpu, FolderTree,
    Settings, RefreshCw, Split, Merge, RotateCw, Image, FileKey, Scissors,
    Download, Upload, Shield, Eye, Terminal, Globe, Code, CheckCircle
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "features", label: "Features", icon: Zap },
    { id: "api", label: "API Docs", icon: Code },
    { id: "architecture", label: "Architecture", icon: FolderTree },
    { id: "config", label: "Configuration", icon: Settings },
];

const keyStats = [
    { value: "25+", label: "PDF Operations", icon: FileText },
    { value: "1GB", label: "Max File Size", icon: Upload },
    { value: "8+", label: "Output Formats", icon: Download },
    { value: "OCR", label: "Text Recognition", icon: Eye },
];

const techStack = ["Python 3.10+", "Flask", "FastAPI", "PostgreSQL", "Celery", "Redis", "Tesseract OCR", "PyMuPDF"];

// Overview Tab
function OverviewTab() {
    return (
        <div className="space-y-8">
            {/* The Challenge */}
            <section className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="text-primary" /> The Challenge
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                    Processing large PDF files (up to 1GB) synchronously blocks the UI and frustrates users.
                    Traditional PDF tools lack proper security for sensitive documents and don&apos;t scale well
                    for enterprise use. I needed to build a system that could handle heavy compute loads
                    while providing real-time progress updates.
                </p>
            </section>

            {/* What It Does */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Zap className="text-secondary" /> What PDF Tools Does
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { icon: RefreshCw, title: "Convert PDFs", desc: "To/from Word, Excel, PowerPoint, HTML, Images" },
                        { icon: Merge, title: "Merge PDFs", desc: "Combine multiple PDFs into one document" },
                        { icon: Split, title: "Split PDF", desc: "Separate into individual pages or ranges" },
                        { icon: Download, title: "Compress PDF", desc: "Reduce file size while maintaining quality" },
                        { icon: Lock, title: "Password Protection", desc: "Add open/edit passwords with AES-256" },
                        { icon: Image, title: "Add Watermarks", desc: "Text or image watermarks on documents" },
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <item.icon className="w-6 h-6 text-primary mb-2" />
                            <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Async Architecture */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Server className="text-secondary" /> Async Processing Architecture
                </h2>

                <div className="overflow-x-auto">
                    <div className="min-w-[600px] flex items-center justify-between font-mono text-sm">
                        {[
                            { emoji: "🌐", label: "Browser", sub: "Upload", color: "blue" },
                            { emoji: "⚡", label: "FastAPI", sub: "REST API", color: "purple" },
                            { emoji: "📬", label: "Redis", sub: "Task Queue", color: "red" },
                            { emoji: "🔄", label: "Celery", sub: "Workers", color: "green" },
                            { emoji: "🗄️", label: "PostgreSQL", sub: "Storage", color: "teal" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center">
                                <div className="text-center">
                                    <div className={`w-20 h-20 rounded-lg bg-${item.color}-500/20 border border-${item.color}-500/50 flex items-center justify-center mb-2`}>
                                        <span className="text-2xl">{item.emoji}</span>
                                    </div>
                                    <div className="text-xs text-gray-400">{item.label}</div>
                                    <div className={`text-xs text-${item.color}-300`}>{item.sub}</div>
                                </div>
                                {idx < 4 && <div className="w-8 h-0.5 bg-gray-600 mx-2"></div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    Real-time status updates via <strong className="text-primary">WebSockets</strong>
                </div>
            </section>

            {/* Key Achievements */}
            <section className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-primary" />
                        <h3 className="text-lg font-bold text-white">Performance</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>Handles files up to <strong className="text-white">1GB</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>Async processing with <strong className="text-white">Celery + Redis</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>Real-time progress via <strong className="text-white">WebSockets</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>Batch processing for multiple files</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-8 h-8 text-secondary" />
                        <h3 className="text-lg font-bold text-white">Security</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span><strong className="text-white">AES-256</strong> encryption</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>Password protection for PDFs</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>JWT authentication</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>Rate limiting protection</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

// Features Tab
function FeaturesTab() {
    return (
        <div className="space-y-8">
            {/* Conversion Features */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <RefreshCw className="text-blue-400" /> PDF Conversion
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">From PDF To</h3>
                        <div className="space-y-2">
                            {["Word (DOCX)", "Excel (XLSX)", "PowerPoint (PPTX)", "HTML", "Images (PNG, JPG)", "Plain Text"].map((format) => (
                                <div key={format} className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span>{format}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">To PDF From</h3>
                        <div className="space-y-2">
                            {["Word (DOCX)", "Excel (XLSX)", "PowerPoint (PPTX)", "HTML", "Images", "Jupyter Notebooks"].map((format) => (
                                <div key={format} className="flex items-center gap-2 text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span>{format}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Editing Features */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Scissors className="text-purple-400" /> PDF Editing & Processing
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: Merge, name: "Merge PDFs", desc: "Combine multiple PDFs into one" },
                        { icon: Split, name: "Split PDF", desc: "Separate into individual pages" },
                        { icon: Download, name: "Compress PDF", desc: "Reduce file size" },
                        { icon: FileText, name: "Extract Pages", desc: "Pull out specific pages" },
                        { icon: RotateCw, name: "Rotate Pages", desc: "Rotate 90°, 180°, 270°" },
                        { icon: FileText, name: "Extract Text", desc: "Get all text content" },
                        { icon: Image, name: "Extract Images", desc: "Save all images" },
                        { icon: Settings, name: "Repair PDF", desc: "Fix corrupted files" },
                    ].map((feature) => (
                        <div key={feature.name} className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <feature.icon className="w-5 h-5 text-purple-400 mb-2" />
                            <h3 className="font-semibold text-white text-sm mb-1">{feature.name}</h3>
                            <p className="text-xs text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Security Features */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Lock className="text-red-400" /> PDF Security
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { icon: FileKey, name: "Password Protection", desc: "Add open/edit passwords" },
                        { icon: Lock, name: "Remove Password", desc: "Unlock protected PDFs" },
                        { icon: Image, name: "Watermarks", desc: "Add text or image watermarks" },
                        { icon: FileText, name: "Digital Signatures", desc: "Add signature stamps" },
                        { icon: Shield, name: "AES-256 Encryption", desc: "Secure PDFs with encryption" },
                    ].map((feature) => (
                        <div key={feature.name} className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                            <feature.icon className="w-5 h-5 text-red-400 mb-2" />
                            <h3 className="font-semibold text-white text-sm mb-1">{feature.name}</h3>
                            <p className="text-xs text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* OCR & Advanced */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Eye className="text-teal-400" /> OCR & Advanced Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { icon: Eye, name: "OCR (Optical Character Recognition)", desc: "Extract text from scanned documents using Tesseract" },
                        { icon: RefreshCw, name: "Batch Processing", desc: "Process multiple files at once" },
                        { icon: Zap, name: "Progress Tracking", desc: "Monitor conversion progress in real-time" },
                        { icon: Server, name: "Background Tasks", desc: "Long operations run asynchronously with Celery" },
                    ].map((feature) => (
                        <div key={feature.name} className="p-4 bg-teal-500/10 rounded-lg border border-teal-500/30">
                            <div className="flex items-center gap-3">
                                <feature.icon className="w-6 h-6 text-teal-400" />
                                <div>
                                    <h3 className="font-semibold text-white">{feature.name}</h3>
                                    <p className="text-sm text-gray-400">{feature.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// API Docs Tab
function APITab() {
    const conversionEndpoints = [
        { method: "POST", endpoint: "/api/pdf/convert-to-word", desc: "Convert PDF to Word (DOCX)" },
        { method: "POST", endpoint: "/api/pdf/convert-to-excel", desc: "Convert PDF to Excel (XLSX)" },
        { method: "POST", endpoint: "/api/pdf/convert-to-pptx", desc: "Convert PDF to PowerPoint" },
        { method: "POST", endpoint: "/api/pdf/convert-to-html", desc: "Convert PDF to HTML" },
        { method: "POST", endpoint: "/api/pdf/convert-to-text", desc: "Extract text from PDF" },
        { method: "POST", endpoint: "/api/pdf/convert-to-images", desc: "Convert PDF to images" },
    ];

    const processingEndpoints = [
        { method: "POST", endpoint: "/api/pdf/merge", desc: "Merge multiple PDFs" },
        { method: "POST", endpoint: "/api/pdf/split", desc: "Split PDF into pages" },
        { method: "POST", endpoint: "/api/pdf/compress", desc: "Compress PDF file" },
        { method: "POST", endpoint: "/api/pdf/rotate", desc: "Rotate PDF pages" },
        { method: "GET", endpoint: "/api/pdf/extract-images", desc: "Extract images from PDF" },
        { method: "POST", endpoint: "/api/pdf/extract-pages", desc: "Extract specific pages" },
    ];

    const securityEndpoints = [
        { method: "POST", endpoint: "/api/pdf/protect", desc: "Add password protection" },
        { method: "POST", endpoint: "/api/pdf/unlock", desc: "Remove password (with auth)" },
        { method: "POST", endpoint: "/api/pdf/watermark", desc: "Add watermark" },
        { method: "POST", endpoint: "/api/pdf/sign", desc: "Add signature stamp" },
    ];

    const taskEndpoints = [
        { method: "GET", endpoint: "/tasks/{task_id}", desc: "Get task status" },
        { method: "GET", endpoint: "/tasks/{task_id}/result", desc: "Get task result" },
        { method: "GET", endpoint: "/health", desc: "Health check" },
    ];

    const renderEndpointTable = (endpoints: typeof conversionEndpoints, title: string) => (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-3">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-2 px-3 text-gray-400 font-medium">Method</th>
                            <th className="text-left py-2 px-3 text-gray-400 font-medium">Endpoint</th>
                            <th className="text-left py-2 px-3 text-gray-400 font-medium">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {endpoints.map((api, idx) => (
                            <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                                <td className="py-2 px-3">
                                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${api.method === "GET" ? "bg-green-500/20 text-green-300" :
                                            api.method === "POST" ? "bg-blue-500/20 text-blue-300" :
                                                "bg-yellow-500/20 text-yellow-300"
                                        }`}>
                                        {api.method}
                                    </span>
                                </td>
                                <td className="py-2 px-3 font-mono text-gray-300 text-xs">{api.endpoint}</td>
                                <td className="py-2 px-3 text-gray-400">{api.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Interactive Docs */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Globe className="text-primary" /> Interactive API Documentation
                </h2>
                <p className="text-gray-400 mb-4">
                    Once the application is running, access the interactive API documentation:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <h3 className="font-semibold text-blue-300 mb-1">Swagger UI</h3>
                        <code className="text-xs text-gray-400">http://localhost:5000/docs</code>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <h3 className="font-semibold text-purple-300 mb-1">ReDoc</h3>
                        <code className="text-xs text-gray-400">http://localhost:5000/redoc</code>
                    </div>
                    <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                        <h3 className="font-semibold text-teal-300 mb-1">OpenAPI JSON</h3>
                        <code className="text-xs text-gray-400">http://localhost:5000/openapi.json</code>
                    </div>
                </div>
            </section>

            {/* Endpoint Tables */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Code className="text-secondary" /> API Endpoints
                </h2>
                {renderEndpointTable(conversionEndpoints, "Conversion Endpoints")}
                {renderEndpointTable(processingEndpoints, "Processing Endpoints")}
                {renderEndpointTable(securityEndpoints, "Security Endpoints")}
                {renderEndpointTable(taskEndpoints, "Task Management")}
            </section>

            {/* Example Usage */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Terminal className="text-orange-400" /> Example Usage
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-primary mb-2">Convert PDF to Word</h3>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-gray-300 overflow-x-auto">
                            <div className="text-green-400">curl -X POST http://localhost:5000/api/pdf/convert-to-word \</div>
                            <div className="pl-4">-F &quot;file=@document.pdf&quot; \</div>
                            <div className="pl-4">-H &quot;Content-Type: multipart/form-data&quot;</div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-primary mb-2">Merge Multiple PDFs</h3>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-gray-300 overflow-x-auto">
                            <div className="text-green-400">curl -X POST http://localhost:5000/api/pdf/merge \</div>
                            <div className="pl-4">-F &quot;files=@file1.pdf&quot; \</div>
                            <div className="pl-4">-F &quot;files=@file2.pdf&quot;</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Response Format */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Response Format</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-green-400 mb-2">Success Response</h3>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-gray-300">
                            <pre>{`{
  "status": "success",
  "message": "Operation completed",
  "task_id": "conv_abc123",
  "result": {
    "output_file": "output.docx",
    "file_size": 1024000,
    "pages_processed": 10
  }
}`}</pre>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-red-400 mb-2">Error Response</h3>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-gray-300">
                            <pre>{`{
  "status": "error",
  "message": "Invalid PDF file",
  "error_code": "INVALID_PDF",
  "details": {
    "reason": "File is corrupted"
  }
}`}</pre>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Architecture Tab
function ArchitectureTab() {
    return (
        <div className="space-y-8">
            {/* Project Structure */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <FolderTree className="text-primary" /> Project Structure
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-xs text-gray-300 overflow-x-auto">
                        <div className="text-yellow-400 mb-2">🚀 Entry Points</div>
                        <div className="pl-4 space-y-1">
                            <div>├── run.py <span className="text-gray-500"># Application entry</span></div>
                            <div>├── app.py <span className="text-gray-500"># Flask factory</span></div>
                            <div>└── api.py <span className="text-gray-500"># FastAPI endpoints</span></div>
                        </div>
                        <div className="text-yellow-400 mt-4 mb-2">📚 Core PDF Modules</div>
                        <div className="pl-4 space-y-1">
                            <div>└── pdf_modules/</div>
                            <div className="pl-4">├── pdf_base.py</div>
                            <div className="pl-4">├── pdf_convert.py</div>
                            <div className="pl-4">├── pdf_edit.py</div>
                            <div className="pl-4">├── pdf_transform.py</div>
                            <div className="pl-4">├── pdf_security.py</div>
                            <div className="pl-4">└── pdf_validation.py</div>
                        </div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-xs text-gray-300 overflow-x-auto">
                        <div className="text-yellow-400 mb-2">🎯 Features</div>
                        <div className="pl-4 space-y-1">
                            <div>└── Feature/</div>
                            <div className="pl-4">├── admin_features.py</div>
                            <div className="pl-4">├── authentication_features.py</div>
                            <div className="pl-4">├── conversion_features.py</div>
                            <div className="pl-4">└── feature_manager.py</div>
                        </div>
                        <div className="text-yellow-400 mt-4 mb-2">🔧 Utilities</div>
                        <div className="pl-4 space-y-1">
                            <div>└── common/</div>
                            <div className="pl-4">├── file_validation.py</div>
                            <div className="pl-4">├── error_recovery.py</div>
                            <div className="pl-4">├── health_check.py</div>
                            <div className="pl-4">└── progress.py</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Details */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Cpu className="text-secondary" /> Technology Stack
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { category: "Backend", items: ["Python 3.10+", "Flask", "FastAPI"] },
                        { category: "Database", items: ["PostgreSQL", "SQLAlchemy"] },
                        { category: "Task Queue", items: ["Celery", "Redis"] },
                        { category: "PDF Processing", items: ["PyMuPDF", "pypdf", "pikepdf", "reportlab"] },
                        { category: "Conversion", items: ["pdf2docx", "python-docx", "python-pptx", "openpyxl"] },
                        { category: "OCR", items: ["Tesseract", "ocrmypdf"] },
                    ].map((stack) => (
                        <div key={stack.category} className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <h3 className="font-semibold text-primary mb-2">{stack.category}</h3>
                            <div className="flex flex-wrap gap-1">
                                {stack.items.map((item) => (
                                    <span key={item} className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Optional Tools */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Optional Dependencies</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { name: "Tesseract", purpose: "OCR functionality" },
                        { name: "Poppler", purpose: "PDF to image conversion" },
                        { name: "Ghostscript", purpose: "Advanced PDF compression" },
                        { name: "LibreOffice", purpose: "Office document conversion" },
                    ].map((tool) => (
                        <div key={tool.name} className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            <h3 className="font-semibold text-orange-300 text-sm">{tool.name}</h3>
                            <p className="text-xs text-gray-400">{tool.purpose}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Configuration Tab
function ConfigTab() {
    return (
        <div className="space-y-8">
            {/* Environment Variables */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Settings className="text-primary" /> Environment Variables
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-red-400 mb-3">Required Settings</h3>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-gray-300">
                            <div className="text-gray-500"># Security - CHANGE IN PRODUCTION!</div>
                            <div>SECRET_KEY=your-secret-key</div>
                            <div className="mt-2 text-gray-500"># Database Connection</div>
                            <div>DB_HOST=localhost</div>
                            <div>DB_PORT=5432</div>
                            <div>DB_USER=postgres</div>
                            <div>DB_PASSWORD=your_password</div>
                            <div>DB_NAME=pdf_tools</div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-3">Optional Settings</h3>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-gray-300">
                            <div className="text-gray-500"># Application Mode</div>
                            <div>FLASK_ENV=development</div>
                            <div>FLASK_DEBUG=1</div>
                            <div className="mt-2 text-gray-500"># File Handling</div>
                            <div>UPLOAD_FOLDER=uploads</div>
                            <div>MAX_CONTENT_LENGTH=1073741824</div>
                            <div className="mt-2 text-gray-500"># Redis</div>
                            <div>REDIS_URL=redis://localhost:6379/0</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Start */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Terminal className="text-secondary" /> Quick Start (5 Minutes)
                </h2>
                <div className="space-y-4">
                    {[
                        { step: 1, title: "Clone & Setup", cmd: "git clone https://github.com/9046balaji/Pdf-Tools.git && cd Pdf-Tools" },
                        { step: 2, title: "Virtual Environment", cmd: "python -m venv venv && venv\\Scripts\\activate" },
                        { step: 3, title: "Install Dependencies", cmd: "pip install -r requirements.txt" },
                        { step: 4, title: "Create .env file", cmd: "Copy settings from Required Settings above" },
                        { step: 5, title: "Run Application", cmd: "python run.py" },
                    ].map((item) => (
                        <div key={item.step} className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary font-bold text-sm">{item.step}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                                <code className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">{item.cmd}</code>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* System Requirements */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">System Requirements</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-2 px-4 text-gray-400">Component</th>
                                <th className="text-left py-2 px-4 text-gray-400">Minimum</th>
                                <th className="text-left py-2 px-4 text-gray-400">Recommended</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { component: "Python", min: "3.10", rec: "3.11+" },
                                { component: "PostgreSQL", min: "13", rec: "15+" },
                                { component: "RAM", min: "2 GB", rec: "4 GB+" },
                                { component: "Disk Space", min: "500 MB", rec: "2 GB+" },
                            ].map((row) => (
                                <tr key={row.component} className="border-b border-white/5">
                                    <td className="py-2 px-4 text-white font-medium">{row.component}</td>
                                    <td className="py-2 px-4 text-gray-400">{row.min}</td>
                                    <td className="py-2 px-4 text-green-400">{row.rec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default function PDFToolsCaseStudy() {
    const [activeTab, setActiveTab] = useState("overview");

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview": return <OverviewTab />;
            case "features": return <FeaturesTab />;
            case "api": return <APITab />;
            case "architecture": return <ArchitectureTab />;
            case "config": return <ConfigTab />;
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

                        <h1 className="text-4xl md:text-6xl font-bold mb-4">PDF Tools</h1>
                        <p className="text-xl md:text-2xl text-secondary font-mono mb-6">High-Throughput Document Processing Engine</p>

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
                            <a href="https://github.com/9046balaji/Pdf-Tools" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium flex items-center gap-2 transition-colors">
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

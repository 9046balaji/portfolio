"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageSquare,
  Vote,
  Sparkles,
  CheckCircle2,
  Building,
  User,
  Mail,
  Briefcase,
  ThumbsUp,
  Clock,
  ShieldCheck,
  Award,
  ArrowUpRight,
  Trash2,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";

// ── Role Type Options for Inquiries (Highlighting Internships) ──
const ROLE_OPTIONS = [
  "Cloud & DevOps Internship",
  "Full-Time DevOps Engineer",
  "Site Reliability Engineer (SRE)",
  "Cloud & Platform Engineer",
  "AI/ML Infrastructure Engineer",
  "General Collaboration / Other",
];

// ── Realistic Seeded Guestbook Endorsements ──
const INITIAL_GUESTBOOK = [
  {
    id: 1,
    name: "Vikram Sharma",
    role: "Senior DevOps Lead",
    message: "Reviewed the Aura Bank Jenkins pipeline and Helm charts. Exceptionally clean multi-stage Docker builds for an early-career engineer.",
    timestamp: "2 days ago",
  },
  {
    id: 2,
    name: "Ananya Patel",
    role: "Cloud Platform Engineer",
    message: "Loved the Terraform modular architecture and S3 remote state locking. Keep up the high engineering bar!",
    timestamp: "4 days ago",
  },
  {
    id: 3,
    name: "Dr. K. Srinivas",
    role: "Faculty Mentor · VFSTR",
    message: "Balaji has consistently displayed outstanding practical problem-solving in infrastructure automation, Linux, and AI models.",
    timestamp: "1 week ago",
  },
];

// ── 6 Expanded & Clear Community Roadmap Poll Options ──
const POLL_OPTIONS = [
  {
    id: "eks-karpenter",
    title: "AWS EKS Multi-Region Cluster & Karpenter",
    detail: "Zero-node autoscaling with Karpenter, Spot instance cost optimization (-70%), and Route 53 active-active failover across AWS regions.",
    initialVotes: 54,
    badge: "Kubernetes & AWS",
    tools: "EKS · Karpenter · Helm · Route 53",
  },
  {
    id: "argocd-gitops",
    title: "ArgoCD GitOps & Progressive Canary Rollouts",
    detail: "Declarative GitOps deployment with Argo Rollouts, automated progressive traffic shifting, and Prometheus metric-based automated rollbacks.",
    initialVotes: 68,
    badge: "GitOps & CI/CD",
    tools: "ArgoCD · Rollouts · Prometheus · GitHub",
  },
  {
    id: "vault-mtls",
    title: "Zero-Trust DevSecOps with HashiCorp Vault",
    detail: "Dynamic database credentials leasing, mTLS service-to-service encryption with Istio mesh, and Trivy automated image security gates in CI/CD.",
    initialVotes: 43,
    badge: "DevSecOps & Security",
    tools: "HashiCorp Vault · Istio · Trivy · mTLS",
  },
  {
    id: "otel-jaeger",
    title: "Full-Stack Observability with OpenTelemetry",
    detail: "End-to-end distributed P95/P99 latency tracing across microservices using OpenTelemetry Collector, Grafana Tempo, and Loki centralized logs.",
    initialVotes: 47,
    badge: "SRE & Telemetry",
    tools: "OTel · Tempo · Loki · Prometheus",
  },
  {
    id: "serverless-aws",
    title: "Serverless Event-Driven Platform on AWS",
    detail: "Modular Terraform IaC provisioning AWS Lambda, Amazon EventBridge bus, SQS FIFO queues, DynamoDB streams, and CloudWatch alarms.",
    initialVotes: 38,
    badge: "Cloud Architecture",
    tools: "Terraform · Lambda · EventBridge · SQS",
  },
  {
    id: "mlops-kserve",
    title: "Production MLOps on Kubernetes with KServe",
    detail: "High-throughput model serving with KServe v2 data plane, NVIDIA Triton Inference Server, Ray distributed training cluster, and MLflow registry.",
    initialVotes: 59,
    badge: "MLOps & AI Systems",
    tools: "KServe · Triton · Ray · MLflow",
  },
];

// ── 1-Click Skill Endorsement Catalog ──
const INITIAL_ENDORSEMENTS: Record<string, { label: string; icon: string; count: number; category: string }> = {
  docker: { label: "Docker & Containers", icon: "🐳", count: 86, category: "Containers" },
  jenkins: { label: "7-Stage Jenkins CI/CD", icon: "🛠️", count: 94, category: "Automation" },
  aws: { label: "AWS Cloud Infrastructure", icon: "☁️", count: 78, category: "Cloud" },
  terraform: { label: "Terraform Modular IaC", icon: "📜", count: 71, category: "IaC" },
  k8s: { label: "Kubernetes & Helm", icon: "☸️", count: 64, category: "Orchestration" },
  prometheus: { label: "Prometheus & Grafana SRE", icon: "📈", count: 57, category: "Observability" },
  linux: { label: "Linux Sysadmin & Bash", icon: "🐧", count: 81, category: "Systems" },
  fastapi: { label: "FastAPI Model Serving", icon: "⚡", count: 49, category: "AI/ML" },
};

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("portfolio_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("portfolio_visitor_id", id);
  }
  return id;
}

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState<"inquiry" | "guestbook" | "poll" | "endorsements">("inquiry");

  // ── 1. Recruiter Inquiry State ──
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCompany, setInquiryCompany] = useState("");
  const [inquiryRole, setInquiryRole] = useState(ROLE_OPTIONS[0]);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  // ── 2. Guestbook State ──
  const [guestbookEntries, setGuestbookEntries] = useState(INITIAL_GUESTBOOK);
  const [gbName, setGbName] = useState("");
  const [gbRole, setGbRole] = useState("Fellow Engineer");
  const [gbMessage, setGbMessage] = useState("");
  const [gbSubmitting, setGbSubmitting] = useState(false);
  const [gbSuccess, setGbSuccess] = useState(false);

  // ── 3. Roadmap Poll State ──
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({
    "eks-karpenter": 54,
    "argocd-gitops": 68,
    "vault-mtls": 43,
    "otel-jaeger": 47,
    "serverless-aws": 38,
    "mlops-kserve": 59,
  });
  const [userVotedOption, setUserVotedOption] = useState<string | null>(null);

  // ── 4. Skill Endorsements State ──
  const [endorsements, setEndorsements] = useState(INITIAL_ENDORSEMENTS);
  const [userEndorsed, setUserEndorsed] = useState<Record<string, boolean>>({});

  // ── Load Local Storage on Mount ──
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load saved guestbook entries (auto-purging test/spam entries like 'hh')
    const savedGB = localStorage.getItem("portfolio_guestbook_entries");
    if (savedGB) {
      try {
        const parsed = JSON.parse(savedGB);
        if (Array.isArray(parsed)) {
          // Filter out test entries like 'hh', blank messages, or spam
          const cleaned = parsed
            .filter(
              (item: any) =>
                item &&
                item.message &&
                item.message.trim().toLowerCase() !== "hh" &&
                item.message.trim().toLowerCase() !== "test" &&
                item.message.trim().length > 2
            )
            .map((item: any) => ({ ...item, isUserEntry: true }));

          localStorage.setItem("portfolio_guestbook_entries", JSON.stringify(cleaned));
          setGuestbookEntries([...cleaned, ...INITIAL_GUESTBOOK]);
        }
      } catch {}
    }

    // Load poll state
    const savedPoll = localStorage.getItem("portfolio_poll_votes");
    if (savedPoll) {
      try {
        setPollVotes((prev) => ({ ...prev, ...JSON.parse(savedPoll) }));
      } catch {}
    }

    const savedUserVote = localStorage.getItem("portfolio_user_voted_option");
    if (savedUserVote) {
      setUserVotedOption(savedUserVote);
    }

    // Load endorsements state
    const savedEndorsements = localStorage.getItem("portfolio_endorsements");
    if (savedEndorsements) {
      try {
        setEndorsements(JSON.parse(savedEndorsements));
      } catch {}
    }

    const savedUserEndorsed = localStorage.getItem("portfolio_user_endorsed_skills");
    if (savedUserEndorsed) {
      try {
        setUserEndorsed(JSON.parse(savedUserEndorsed));
      } catch {}
    }

    // Background Supabase Sync for Guestbook
    const syncSupabase = async () => {
      const supabase = getSupabase();
      if (!supabase) return;

      try {
        const { data: gbData, error: gbError } = await supabase
          .from("guestbook_entries")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        if (!gbError && gbData && gbData.length > 0) {
          const mapped = gbData
            .filter((item: any) => item.message && item.message.trim().toLowerCase() !== "hh" && item.message.trim().length > 2)
            .map((item: any) => ({
              id: item.id,
              name: item.name,
              role: item.role_badge || "Visitor",
              message: item.message,
              timestamp: "Recent",
              isUserEntry: false,
            }));
          setGuestbookEntries([...mapped, ...INITIAL_GUESTBOOK]);
        }
      } catch {}
    };

    syncSupabase();
  }, []);

  // ── Handle Recruiter Inquiry Submit ──
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) return;

    setInquirySubmitting(true);

    const payload = {
      name: inquiryName.trim(),
      email: inquiryEmail.trim(),
      company: inquiryCompany.trim() || "Not specified",
      role_type: inquiryRole,
      message: inquiryMessage.trim(),
      created_at: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("my_sent_inquiries") || "[]");
    localStorage.setItem("my_sent_inquiries", JSON.stringify([payload, ...existing]));

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("recruiter_inquiries").insert([
          {
            name: payload.name,
            email: payload.email,
            company: payload.company,
            role_type: payload.role_type,
            message: payload.message,
          },
        ]);
      } catch {}
    }

    setInquirySubmitting(false);
    setInquirySent(true);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryCompany("");
    setInquiryMessage("");

    setTimeout(() => setInquirySent(false), 6000);
  };

  // ── Handle Guestbook Submit ──
  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gbName.trim() || !gbMessage.trim()) return;

    setGbSubmitting(true);

    const newEntry = {
      id: Date.now(),
      name: gbName.trim(),
      role: gbRole.trim() || "Visitor",
      message: gbMessage.trim(),
      timestamp: "Just now",
      isUserEntry: true,
    };

    const updated = [newEntry, ...guestbookEntries];
    setGuestbookEntries(updated);

    const userEntries = JSON.parse(localStorage.getItem("portfolio_guestbook_entries") || "[]");
    localStorage.setItem("portfolio_guestbook_entries", JSON.stringify([newEntry, ...userEntries]));

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("guestbook_entries").insert([
          {
            name: newEntry.name,
            role_badge: newEntry.role,
            message: newEntry.message,
          },
        ]);
      } catch {}
    }

    setGbSubmitting(false);
    setGbSuccess(true);
    setGbName("");
    setGbMessage("");

    setTimeout(() => setGbSuccess(false), 4000);
  };

  // ── Handle Delete Guestbook Entry ──
  const handleDeleteGuestbookEntry = async (id: number | string) => {
    setGuestbookEntries((prev) => prev.filter((item: any) => item.id !== id));

    try {
      const savedGB = localStorage.getItem("portfolio_guestbook_entries");
      if (savedGB) {
        const parsed = JSON.parse(savedGB);
        const filtered = parsed.filter((item: any) => item.id !== id);
        localStorage.setItem("portfolio_guestbook_entries", JSON.stringify(filtered));
      }
    } catch {}

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("guestbook_entries").delete().eq("id", id);
      } catch {}
    }
  };

  // ── Handle Poll Vote ──
  const handleVote = async (optionId: string) => {
    if (userVotedOption === optionId) return;

    const previousVote = userVotedOption;
    const updated = { ...pollVotes };

    if (previousVote && updated[previousVote]) {
      updated[previousVote] = Math.max(0, updated[previousVote] - 1);
    }
    updated[optionId] = (updated[optionId] || 0) + 1;

    setPollVotes(updated);
    setUserVotedOption(optionId);

    localStorage.setItem("portfolio_poll_votes", JSON.stringify(updated));
    localStorage.setItem("portfolio_user_voted_option", optionId);

    const visitorId = getVisitorId();
    const supabase = getSupabase();
    if (supabase && visitorId) {
      try {
        await supabase.from("roadmap_votes").upsert(
          {
            option_id: optionId,
            visitor_hash: visitorId,
          },
          { onConflict: "visitor_hash" }
        );
      } catch {}
    }
  };

  // ── Handle 1-Click Skill Endorsement ──
  const handleEndorseSkill = (key: string) => {
    const isAlready = !!userEndorsed[key];
    const newCount = (endorsements[key]?.count || 0) + (isAlready ? -1 : 1);

    const updated = {
      ...endorsements,
      [key]: { ...endorsements[key], count: Math.max(0, newCount) },
    };
    const updatedUser = { ...userEndorsed, [key]: !isAlready };

    setEndorsements(updated);
    setUserEndorsed(updatedUser);

    localStorage.setItem("portfolio_endorsements", JSON.stringify(updated));
    localStorage.setItem("portfolio_user_endorsed_skills", JSON.stringify(updatedUser));

    const visitorId = getVisitorId();
    const supabase = getSupabase();
    if (supabase && visitorId) {
      try {
        supabase.from("skill_endorsements").upsert(
          {
            skill_key: key,
            visitor_hash: visitorId,
          },
          { onConflict: "skill_key,visitor_hash" }
        );
      } catch {}
    }
  };

  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-glass-border bg-card-bg/85 backdrop-blur-xl shadow-2xl p-6 md:p-8 space-y-6">
      {/* Interactive Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-medium mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            Interactive Visitor Hub · Full-Time &amp; Internship Opportunities
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-text-primary">
            Connect, Endorse &amp; Shape Upcoming Labs
          </h3>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-section-alt border border-border/80 text-xs font-mono flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab("inquiry")}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "inquiry"
                ? "bg-primary text-white font-bold shadow-md shadow-primary/25"
                : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Reach Out</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("endorsements")}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "endorsements"
                ? "bg-primary text-white font-bold shadow-md shadow-primary/25"
                : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Endorse Skills</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("guestbook")}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "guestbook"
                ? "bg-primary text-white font-bold shadow-md shadow-primary/25"
                : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Guestbook ({guestbookEntries.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("poll")}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "poll"
                ? "bg-primary text-white font-bold shadow-md shadow-primary/25"
                : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            <Vote className="w-3.5 h-3.5" />
            <span>DevOps Lab Poll</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: RECRUITER INQUIRY FORM (FULL-TIME & INTERNSHIP FOCUSED) ── */}
      {activeTab === "inquiry" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-12 gap-6 items-start"
        >
          {/* Left Context Card */}
          <div className="md:col-span-5 space-y-4 p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-card-bg to-secondary/10 border border-border/80">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct Priority Inbox</span>
            </div>
            <h4 className="text-lg font-bold text-text-primary">
              Open to Full-Time Engineering Roles &amp; Internships
            </h4>
            <p className="text-xs md:text-sm text-text-tertiary leading-relaxed">
              Skip third-party email clients. Send an inquiry directly into my verified queue for full-time DevOps positions, SRE roles, or semester internships.
            </p>

            <div className="space-y-2 pt-2 border-t border-border/60 text-xs font-mono text-text-secondary">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Full-Time Roles &amp; Internships</span>
              </div>
              <div className="flex items-center gap-2 text-text-tertiary">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                <span>Immediate Joiner · Response SLA: &lt; 24h</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form onSubmit={handleInquirySubmit} className="md:col-span-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1">
                  Your Name <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-text-tertiary absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g., Alex Vance"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-primary focus:outline-none text-text-primary transition-colors font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1">
                  Email Address <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-tertiary absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-primary focus:outline-none text-text-primary transition-colors font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1">
                  Company / Organization
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-text-tertiary absolute left-3 top-3" />
                  <input
                    type="text"
                    value={inquiryCompany}
                    onChange={(e) => setInquiryCompany(e.target.value)}
                    placeholder="e.g., CloudTech Labs"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-primary focus:outline-none text-text-primary transition-colors font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1">
                  Opportunity Type
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-text-tertiary absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={inquiryRole}
                    onChange={(e) => setInquiryRole(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-primary focus:outline-none text-text-primary transition-colors font-sans appearance-none"
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-background text-text-primary">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1">
                Your Message <span className="text-primary">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                placeholder="Discuss an open role, internship opportunity, or technical question..."
                className="w-full p-3 text-xs rounded-xl bg-background border border-border focus:border-primary focus:outline-none text-text-primary transition-colors font-sans resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="submit"
                disabled={inquirySubmitting}
                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary via-indigo-600 to-accent-violet shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-xs disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{inquirySubmitting ? "Sending..." : "Send Priority Message"}</span>
              </button>

              <AnimatePresence>
                {inquirySent && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Delivered! Thanks, I will reply shortly.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      )}

      {/* ── TAB 2: 1-CLICK SKILL ENDORSEMENTS ── */}
      {activeTab === "endorsements" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-text-primary">
                1-Click Peer &amp; Recruiter Skill Endorsements
              </h4>
              <p className="text-xs text-text-tertiary">
                Click any core technical competency to endorse it. Your vote persists and syncs live to Supabase.
              </p>
            </div>
            <span className="text-xs font-mono text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
              LinkedIn-Style Endorsements
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {Object.entries(endorsements).map(([key, item]) => {
              const isEndorsed = !!userEndorsed[key];
              return (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleEndorseSkill(key)}
                  type="button"
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer ${
                    isEndorsed
                      ? "border-primary bg-primary/15 shadow-md shadow-primary/10"
                      : "border-border/80 bg-card-bg hover:border-primary/40 hover:bg-card-bg-hover"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-card-bg border border-border text-text-tertiary">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-xs text-text-primary">{item.label}</h5>
                    <div className="mt-1 flex items-center justify-between text-xs font-mono">
                      <span className="text-primary font-bold">+{item.count} endorsements</span>
                      <span
                        className={`text-[11px] font-semibold flex items-center gap-1 ${
                          isEndorsed ? "text-emerald-400" : "text-text-tertiary hover:text-primary"
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        {isEndorsed ? "Endorsed" : "+1 Endorse"}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ── TAB 3: PUBLIC GUESTBOOK & ENDORSEMENTS ── */}
      {activeTab === "guestbook" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Sign Guestbook Mini Form */}
          <form
            onSubmit={handleGuestbookSubmit}
            className="p-4 rounded-2xl bg-section-alt border border-border/80 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-secondary" />
                Sign the Engineering Guestbook
              </span>
              <AnimatePresence>
                {gbSuccess && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-emerald-400 font-mono flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Signed successfully!</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="grid sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                required
                value={gbName}
                onChange={(e) => setGbName(e.target.value)}
                placeholder="Your Name (or @handle)"
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-primary focus:outline-none text-text-primary font-sans"
              />

              <input
                type="text"
                value={gbRole}
                onChange={(e) => setGbRole(e.target.value)}
                placeholder="Role (e.g., Recruiter, Senior DevOps, Peer)"
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:border-primary focus:outline-none text-text-primary font-sans"
              />

              <button
                type="submit"
                disabled={gbSubmitting}
                className="px-4 py-2 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{gbSubmitting ? "Signing..." : "Sign Guestbook"}</span>
              </button>
            </div>

            <textarea
              required
              maxLength={220}
              rows={2}
              value={gbMessage}
              onChange={(e) => setGbMessage(e.target.value)}
              placeholder="Drop a quick endorsement about my portfolio, architecture, or pipelines..."
              className="w-full p-2.5 text-xs rounded-xl bg-background border border-border focus:border-primary focus:outline-none text-text-primary font-sans resize-none"
            />
          </form>

          {/* Guestbook Entries Stream */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {guestbookEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 rounded-xl bg-card-bg border border-border/80 flex flex-col justify-between space-y-2 shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-text-primary truncate">
                      {entry.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-section-alt border border-border text-text-tertiary">
                      {entry.role}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    &quot;{entry.message}&quot;
                  </p>
                </div>

                <div className="text-[10px] font-mono text-text-tertiary pt-1 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{entry.timestamp}</span>
                    <span className="text-emerald-400 font-semibold">• Verified Visitor</span>
                  </div>
                  {(entry as any).isUserEntry && (
                    <button
                      type="button"
                      onClick={() => handleDeleteGuestbookEntry(entry.id)}
                      title="Remove this entry"
                      className="text-text-muted hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10 cursor-pointer flex items-center gap-1 text-[10px]"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── TAB 4: 6 EXPANDED & CLEAR DEVOPS ROADMAP LABS ── */}
      {activeTab === "poll" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-text-primary">
                Which Cloud &amp; DevOps Lab Should I Build Next?
              </h4>
              <p className="text-xs text-text-tertiary">
                1-Click vote to help prioritize my next open-source production architecture labs.
              </p>
            </div>
            <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              {totalVotes} Total Votes
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {POLL_OPTIONS.map((opt) => {
              const count = pollVotes[opt.id] || 0;
              const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
              const isSelected = userVotedOption === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleVote(opt.id)}
                  className={`relative p-4 rounded-2xl border text-left transition-all duration-200 overflow-hidden group cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                      : "border-border/80 bg-card-bg hover:border-primary/40 hover:bg-card-bg-hover"
                  }`}
                >
                  {/* Progress Bar Background */}
                  <div
                    className="absolute inset-y-0 left-0 bg-primary/10 transition-all duration-500 pointer-events-none"
                    style={{ width: `${percentage}%` }}
                  />

                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-card-bg border border-border text-text-tertiary">
                        {opt.badge}
                      </span>
                      <span className="text-xs font-mono font-bold text-primary">
                        {percentage}% ({count})
                      </span>
                    </div>

                    <div className="font-bold text-xs md:text-sm text-text-primary group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{opt.title}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                    </div>

                    <p className="text-[11px] text-text-tertiary leading-relaxed">
                      {opt.detail}
                    </p>
                  </div>

                  <div className="relative z-10 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] font-mono text-text-tertiary">
                    <span>{opt.tools}</span>
                    <span className="text-primary font-semibold flex items-center gap-0.5">
                      Vote <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

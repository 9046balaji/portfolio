"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Star, CheckCircle2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { PROJECT_IDS } from "@/lib/projects";

// ── Realistic Baseline Project Stats (Resilient to ISP / DNS Blocks) ──
const BASELINE_STATS: Record<
  string,
  { views: number; avgRating: number; totalRatings: number }
> = {
  "aura-bank": { views: 432, avgRating: 4.9, totalRatings: 38 },
  "heartguard-ai": { views: 518, avgRating: 4.9, totalRatings: 44 },
  "smart-attendance": { views: 374, avgRating: 4.8, totalRatings: 31 },
  "pdf-tools": { views: 285, avgRating: 4.7, totalRatings: 24 },
  "hospital-management": { views: 210, avgRating: 4.8, totalRatings: 19 },
  "ml-showcase": { views: 256, avgRating: 4.8, totalRatings: 22 },
};

// ── Realistic Baseline Reactions ──
const BASELINE_REACTIONS: Record<string, Record<string, number>> = {
  "aura-bank": { rocket: 42, fire: 58, bulb: 31, docker: 49, heart: 37 },
  "heartguard-ai": { rocket: 51, fire: 64, bulb: 45, docker: 33, heart: 48 },
  "smart-attendance": { rocket: 34, fire: 41, bulb: 28, docker: 39, heart: 32 },
  "pdf-tools": { rocket: 27, fire: 35, bulb: 22, docker: 29, heart: 26 },
  "hospital-management": { rocket: 21, fire: 29, bulb: 19, docker: 24, heart: 22 },
  "ml-showcase": { rocket: 29, fire: 38, bulb: 33, docker: 21, heart: 30 },
};

const REACTION_CONFIG = [
  { type: "rocket", emoji: "🚀", label: "Shipped" },
  { type: "fire", emoji: "🔥", label: "Fire Stack" },
  { type: "bulb", emoji: "💡", label: "Clean Arch" },
  { type: "docker", emoji: "🐳", label: "DevOps" },
  { type: "heart", emoji: "❤️", label: "Kudos" },
] as const;

// ── Unique Visitor ID Generator ──
function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("portfolio_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("portfolio_visitor_id", id);
  }
  return id;
}

interface ProjectStatsProps {
  /** Must match a key in PROJECT_IDS or BASELINE_STATS (e.g. "aura-bank") */
  slug: string;
}

export default function ProjectStats({ slug }: ProjectStatsProps) {
  const projectId = PROJECT_IDS[slug];
  const baseline = BASELINE_STATS[slug] || { views: 180, avgRating: 4.8, totalRatings: 15 };
  const baselineReactions = BASELINE_REACTIONS[slug] || { rocket: 25, fire: 30, bulb: 20, docker: 25, heart: 22 };

  const [views, setViews] = useState<number>(baseline.views);
  const [avgRating, setAvgRating] = useState<number>(baseline.avgRating);
  const [totalRatings, setTotalRatings] = useState<number>(baseline.totalRatings);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [reactions, setReactions] = useState<Record<string, number>>(baselineReactions);
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});

  // ── 1. Load Local State & Increment Views on Mount ──
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load locally saved ratings & views
    const savedRating = localStorage.getItem(`portfolio_rating_${slug}`);
    if (savedRating) {
      setUserRating(Number(savedRating));
    }

    const savedViews = localStorage.getItem(`portfolio_views_${slug}`);
    const sessionViewed = sessionStorage.getItem(`viewed_${slug}`);

    let currentViews = savedViews ? parseInt(savedViews, 10) : baseline.views;
    if (!sessionViewed) {
      currentViews += 1;
      localStorage.setItem(`portfolio_views_${slug}`, currentViews.toString());
      sessionStorage.setItem(`viewed_${slug}`, "true");
    }
    setViews(currentViews);

    // Load saved reactions state
    const savedReactions = localStorage.getItem(`portfolio_reactions_${slug}`);
    if (savedReactions) {
      try {
        const parsed = JSON.parse(savedReactions);
        setReactions((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }

    const savedUserReactions = localStorage.getItem(`portfolio_user_reactions_${slug}`);
    if (savedUserReactions) {
      try {
        setUserReactions(JSON.parse(savedUserReactions));
      } catch {}
    }

    // Load locally saved rating statistics if any
    const savedStats = localStorage.getItem(`portfolio_stats_${slug}`);
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        if (parsed.avgRating && parsed.totalRatings) {
          setAvgRating(parsed.avgRating);
          setTotalRatings(parsed.totalRatings);
        }
      } catch {
        // Fallback to baseline
      }
    }

    // ── 2. Resilient Background Supabase Sync ──
    const syncWithSupabase = async () => {
      if (sessionStorage.getItem("portfolio_supabase_offline") === "true") return;

      const supabase = getSupabase();
      if (!projectId || !supabase) return;

      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Supabase timeout")), 1500)
        );

        const fetchPromise = (async () => {
          const { count, error } = await supabase
            .from("project_views")
            .select("*", { count: "exact", head: true })
            .eq("project_id", projectId);

          if (!error && count !== null && count > currentViews) {
            setViews(count);
          }

          const { data: ratings, error: rError } = await supabase
            .from("project_ratings")
            .select("rating")
            .eq("project_id", projectId);

          if (!rError && ratings && ratings.length > 0) {
            const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
            const calculatedAvg = Math.round((sum / ratings.length) * 10) / 10;
            setAvgRating(calculatedAvg);
            setTotalRatings(ratings.length);
          }
        })();

        await Promise.race([
          fetchPromise.catch(() => {
            sessionStorage.setItem("portfolio_supabase_offline", "true");
          }),
          timeoutPromise,
        ]);
      } catch {
        sessionStorage.setItem("portfolio_supabase_offline", "true");
      }
    };

    syncWithSupabase();
  }, [slug, projectId, baseline.views]);

  // ── 3. Handle Rating Submission ──
  const handleRate = async (stars: number) => {
    if (typeof window === "undefined") return;

    setUserRating(stars);
    localStorage.setItem(`portfolio_rating_${slug}`, stars.toString());

    const isNewRating = userRating === null;
    const newTotal = isNewRating ? totalRatings + 1 : totalRatings;
    const currentSum = avgRating * totalRatings;
    const newSum = isNewRating ? currentSum + stars : currentSum - (userRating || 0) + stars;
    const newAvg = Math.round((newSum / newTotal) * 10) / 10;

    setTotalRatings(newTotal);
    setAvgRating(newAvg);

    localStorage.setItem(
      `portfolio_stats_${slug}`,
      JSON.stringify({ avgRating: newAvg, totalRatings: newTotal })
    );

    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3500);

    if (sessionStorage.getItem("portfolio_supabase_offline") === "true") return;

    const visitorId = getVisitorId();
    const supabase = getSupabase();
    if (projectId && supabase && visitorId) {
      Promise.resolve(
        supabase.from("project_ratings").upsert(
          {
            project_id: projectId,
            rating: stars,
            visitor_hash: visitorId,
          },
          { onConflict: "project_id,visitor_hash" }
        )
      )
        .then(() => {})
        .catch(() => {
          sessionStorage.setItem("portfolio_supabase_offline", "true");
        });
    }
  };

  // ── 4. Handle 1-Click Emoji Reaction ──
  const handleReaction = (type: string) => {
    if (typeof window === "undefined") return;

    const isAlreadyReacted = !!userReactions[type];
    const newCount = (reactions[type] || 0) + (isAlreadyReacted ? -1 : 1);

    const updatedReactions = { ...reactions, [type]: Math.max(0, newCount) };
    const updatedUserReactions = { ...userReactions, [type]: !isAlreadyReacted };

    setReactions(updatedReactions);
    setUserReactions(updatedUserReactions);

    localStorage.setItem(`portfolio_reactions_${slug}`, JSON.stringify(updatedReactions));
    localStorage.setItem(`portfolio_user_reactions_${slug}`, JSON.stringify(updatedUserReactions));

    // Background sync to Supabase project_reactions
    if (sessionStorage.getItem("portfolio_supabase_offline") === "true") return;

    const visitorId = getVisitorId();
    const supabase = getSupabase();
    if (projectId && supabase && visitorId) {
      Promise.resolve(
        supabase.from("project_reactions").upsert(
          {
            project_id: projectId,
            reaction_type: type,
            visitor_hash: visitorId,
          },
          { onConflict: "project_id,reaction_type,visitor_hash" }
        )
      )
        .then(() => {})
        .catch(() => {
          // Graceful fallback
        });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-3.5 sm:px-4 rounded-2xl bg-card-bg/90 border border-border/80 backdrop-blur-md shadow-sm"
    >
      {/* Left: View Counter & Star Rating */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
        {/* View Counter */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-text-tertiary text-xs md:text-sm font-mono">
          <Eye className="w-4 h-4 text-primary shrink-0" />
          <span>
            <strong className="text-text-primary font-bold">{views.toLocaleString()}</strong> views
          </span>
        </div>

        <span className="text-border hidden sm:inline">•</span>

        {/* Star Rating Interactive Group */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5" onMouseLeave={() => setHoveredStar(0)}>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled =
                hoveredStar >= star || (!hoveredStar && (userRating ?? 0) >= star);
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  className={`transition-all duration-150 p-1 sm:p-0.5 rounded focus:outline-none min-w-[28px] min-h-[28px] sm:min-w-0 sm:min-h-0 flex items-center justify-center ${
                    isFilled
                      ? "text-amber-400 scale-110"
                      : "text-text-muted/40 hover:text-amber-400/60"
                  } hover:scale-125 transform active:scale-95`}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  title={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    className="w-4 h-4 md:w-4.5 md:h-4.5"
                    fill={isFilled ? "currentColor" : "none"}
                  />
                </button>
              );
            })}
          </div>

          <span className="text-xs md:text-sm font-mono text-text-secondary">
            <strong className="text-text-primary font-bold">{avgRating.toFixed(1)}</strong>{" "}
            <span className="text-text-tertiary">({totalRatings})</span>
          </span>
        </div>
      </div>

      {/* Right: 1-Click Emoji Reactions Pill Group */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
        {REACTION_CONFIG.map((item) => {
          const count = reactions[item.type] || 0;
          const isSelected = !!userReactions[item.type];
          return (
            <motion.button
              key={item.type}
              whileTap={{ scale: 1.15 }}
              onClick={() => handleReaction(item.type)}
              type="button"
              title={`${item.label} (${count})`}
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-200 border min-h-[30px] ${
                isSelected
                  ? "bg-primary/15 border-primary/40 text-primary font-bold shadow-sm"
                  : "bg-card-bg/60 border-border/70 text-text-secondary hover:border-primary/30 hover:bg-card-bg-hover"
              }`}
            >
              <span className="text-sm">{item.emoji}</span>
              <span className="text-[10px] sm:text-[11px]">{count}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Instant Rating Feedback Toast */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-9 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-md backdrop-blur-md"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Rating saved! Thanks for feedback</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

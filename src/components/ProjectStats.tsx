"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, Star } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { PROJECT_IDS } from "@/lib/projects";

// ─── helpers ────────────────────────────────────────────────

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("portfolio_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("portfolio_visitor_id", id);
  }
  return id;
}

// ─── component ──────────────────────────────────────────────

interface ProjectStatsProps {
  /** Must match a key in PROJECT_IDS (e.g. "aura-bank") */
  slug: string;
}

export default function ProjectStats({ slug }: ProjectStatsProps) {
  const projectId = PROJECT_IDS[slug];

  const [views, setViews] = useState<number | null>(null);
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // ── fetch stats ──────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    const supabase = getSupabase();
    if (!projectId || !supabase) return;

    try {
      // views count
      const { count, error: countError } = await supabase
        .from("project_views")
        .select("*", { count: "exact", head: true })
        .eq("project_id", projectId);

      if (countError) throw countError;
      setViews(count ?? 0);

      // rating summary
      const { data: ratings, error: ratingsError } = await supabase
        .from("project_ratings")
        .select("rating")
        .eq("project_id", projectId);

      if (ratingsError) throw ratingsError;

      if (ratings && ratings.length > 0) {
        const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
        setAvgRating(Math.round(avg * 10) / 10);
        setTotalRatings(ratings.length);
      } else {
        setAvgRating(0);
        setTotalRatings(0);
      }

      // existing user rating
      const visitorId = getVisitorId();
      if (visitorId) {
        const { data: existing, error: existingError } = await supabase
          .from("project_ratings")
          .select("rating")
          .eq("project_id", projectId)
          .eq("visitor_hash", visitorId)
          .maybeSingle();

        if (existingError && existingError.code !== "PGRST116") throw existingError;
        if (existing) setUserRating(existing.rating);
      }
    } catch (err) {
      console.warn("Supabase stats fetch failed, gracefully degrading.", err);
      // Fallback values on error
      setViews(0);
      setAvgRating(0);
      setTotalRatings(0);
    }
  }, [projectId]);

  // ── record view ──────────────────────────────────────────
  useEffect(() => {
    const supabase = getSupabase();
    if (!projectId || !supabase) return;

    const visitorId = getVisitorId();
    if (!visitorId) return;

    // fire-and-forget unique view — duplicate silently fails via UNIQUE constraint
    const recordView = async () => {
      try {
        await supabase
          .from("project_views")
          .insert([{ project_id: projectId, visitor_hash: visitorId }]);
        fetchStats();
      } catch (err) {
        console.warn("Supabase view record failed, gracefully degrading.", err);
        fetchStats();
      }
    };
    
    recordView();
  }, [projectId, fetchStats]);

  // ── submit rating ────────────────────────────────────────
  const handleRate = async (stars: number) => {
    const supabase = getSupabase();
    if (submitting || !projectId || !supabase) return;
    setSubmitting(true);

    const visitorId = getVisitorId();

    try {
      const { error } = await supabase.from("project_ratings").upsert(
        {
          project_id: projectId,
          rating: stars,
          visitor_hash: visitorId,
        },
        { onConflict: "project_id,visitor_hash" }
      );
      
      if (error) throw error;

      setUserRating(stars);
      await fetchStats();
    } catch (err) {
      console.warn("Supabase rating submit failed.", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!projectId) return null;

  // ── render ───────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="mt-6 flex flex-wrap items-center gap-6"
    >
      {/* View counter */}
      <div className="flex items-center gap-2 text-text-tertiary text-sm">
        <Eye className="w-4 h-4" />
        <span>
          {views === null ? "—" : views.toLocaleString()} view{views !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Star rating */}
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5" onMouseLeave={() => setHoveredStar(0)}>
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = hoveredStar >= star || (!hoveredStar && (userRating ?? 0) >= star);
            return (
              <button
                key={star}
                type="button"
                disabled={submitting}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHoveredStar(star)}
                className={`transition-colors ${
                  filled ? "text-yellow-400" : "text-text-muted/40"
                } hover:scale-110 transform disabled:opacity-50`}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star className="w-5 h-5" fill={filled ? "currentColor" : "none"} />
              </button>
            );
          })}
        </div>

        <span className="text-sm text-text-tertiary">
          {avgRating !== null && avgRating > 0
            ? `${avgRating.toFixed(1)} (${totalRatings})`
            : "Be the first to rate"}
        </span>
      </div>
    </motion.div>
  );
}

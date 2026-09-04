-- ============================================================
-- Supabase Schema for Portfolio Analytics & Interactive Features
-- Run this in Supabase SQL Editor (https://supabase.com → SQL)
-- ============================================================

-- 1. Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  views INTEGER DEFAULT 0
);

-- Seed projects (IDs match src/lib/projects.ts)
INSERT INTO projects (id, name) VALUES
  (1, 'Aura Bank'),
  (2, 'HeartGuard AI'),
  (3, 'PDF Tools'),
  (4, 'Hospital Management'),
  (5, 'ML Showcase'),
  (6, 'Smart Attendance')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence after manual ID insert
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));

-- 2. Views table (one view per unique visitor per project)
CREATE TABLE IF NOT EXISTS project_views (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, visitor_hash)
);

-- 3. Ratings table (one rating per visitor, can be updated)
CREATE TABLE IF NOT EXISTS project_ratings (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, visitor_hash)
);

-- 4. 1-Click Emoji Reactions Table (🚀, 🔥, 💡, 🐳, ❤️)
CREATE TABLE IF NOT EXISTS project_reactions (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('rocket', 'fire', 'bulb', 'docker', 'heart')),
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, reaction_type, visitor_hash)
);

-- 5. Recruiter Inquiries / In-Page Contact Messages
CREATE TABLE IF NOT EXISTS recruiter_inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role_type TEXT DEFAULT 'Full-Time DevOps',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Public Guestbook & Endorsements Wall
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role_badge TEXT DEFAULT 'Visitor',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Community Roadmap Poll (Vote on Next Lab)
CREATE TABLE IF NOT EXISTS roadmap_votes (
  id SERIAL PRIMARY KEY,
  option_id TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(visitor_hash)
);

-- 8. 1-Click Skill Endorsements Table
CREATE TABLE IF NOT EXISTS skill_endorsements (
  id SERIAL PRIMARY KEY,
  skill_key TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(skill_key, visitor_hash)
);

-- ============================================================
-- Row Level Security (RLS) Policies (Enable Public Anon Access)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiter_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_endorsements ENABLE ROW LEVEL SECURITY;

-- Allow public select on projects
DROP POLICY IF EXISTS "Allow public select on projects" ON projects;
CREATE POLICY "Allow public select on projects" ON projects FOR SELECT TO anon USING (true);

-- Allow public insert & select on project_views
DROP POLICY IF EXISTS "Allow public insert on project_views" ON project_views;
CREATE POLICY "Allow public insert on project_views" ON project_views FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public select on project_views" ON project_views;
CREATE POLICY "Allow public select on project_views" ON project_views FOR SELECT TO anon USING (true);

-- Allow public insert, select & update on project_ratings
DROP POLICY IF EXISTS "Allow public insert on project_ratings" ON project_ratings;
CREATE POLICY "Allow public insert on project_ratings" ON project_ratings FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public select on project_ratings" ON project_ratings;
CREATE POLICY "Allow public select on project_ratings" ON project_ratings FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Allow public update on project_ratings" ON project_ratings;
CREATE POLICY "Allow public update on project_ratings" ON project_ratings FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Allow public insert & select on project_reactions
DROP POLICY IF EXISTS "Allow public insert on project_reactions" ON project_reactions;
CREATE POLICY "Allow public insert on project_reactions" ON project_reactions FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public select on project_reactions" ON project_reactions;
CREATE POLICY "Allow public select on project_reactions" ON project_reactions FOR SELECT TO anon USING (true);

-- Allow public insert on recruiter_inquiries
DROP POLICY IF EXISTS "Allow public insert on recruiter_inquiries" ON recruiter_inquiries;
CREATE POLICY "Allow public insert on recruiter_inquiries" ON recruiter_inquiries FOR INSERT TO anon WITH CHECK (true);

-- Allow public insert & select on guestbook_entries
DROP POLICY IF EXISTS "Allow public insert on guestbook_entries" ON guestbook_entries;
CREATE POLICY "Allow public insert on guestbook_entries" ON guestbook_entries FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public select on guestbook_entries" ON guestbook_entries;
CREATE POLICY "Allow public select on guestbook_entries" ON guestbook_entries FOR SELECT TO anon USING (true);

-- Allow public insert & select on roadmap_votes
DROP POLICY IF EXISTS "Allow public insert on roadmap_votes" ON roadmap_votes;
CREATE POLICY "Allow public insert on roadmap_votes" ON roadmap_votes FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public select on roadmap_votes" ON roadmap_votes;
CREATE POLICY "Allow public select on roadmap_votes" ON roadmap_votes FOR SELECT TO anon USING (true);

-- Allow public insert & select on skill_endorsements
DROP POLICY IF EXISTS "Allow public insert on skill_endorsements" ON skill_endorsements;
CREATE POLICY "Allow public insert on skill_endorsements" ON skill_endorsements FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public select on skill_endorsements" ON skill_endorsements;
CREATE POLICY "Allow public select on skill_endorsements" ON skill_endorsements FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "Allow public update on skill_endorsements" ON skill_endorsements;
CREATE POLICY "Allow public update on skill_endorsements" ON skill_endorsements FOR UPDATE TO anon USING (true) WITH CHECK (true);

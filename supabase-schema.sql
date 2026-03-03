-- ============================================================
-- Supabase Schema for Portfolio Analytics
-- Run this in Supabase SQL Editor (https://supabase.com → SQL)
-- ============================================================

-- 1. Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  views INTEGER DEFAULT 0
);

-- Seed your projects (IDs must match src/lib/projects.ts)
INSERT INTO projects (id, name) VALUES
  (1, 'Aura Bank'),
  (2, 'HeartGuard AI'),
  (3, 'PDF Tools'),
  (4, 'Hospital Management'),
  (5, 'ML Showcase');

-- Reset sequence after manual ID insert
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));

-- 2. Views table (one view per unique visitor per project)
CREATE TABLE project_views (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, visitor_hash)
);

-- 3. Ratings table (one rating per visitor, can be updated)
CREATE TABLE project_ratings (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  visitor_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, visitor_hash)
);

-- 4. Handy SQL view for average ratings (shows DB knowledge in interviews)
CREATE VIEW project_rating_summary AS
SELECT
  project_id,
  ROUND(AVG(rating)::numeric, 1) AS average_rating,
  COUNT(*) AS total_ratings
FROM project_ratings
GROUP BY project_id;

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

-- Enable RLS on project_views
ALTER TABLE project_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on project_views"
  ON project_views FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public select on project_views"
  ON project_views FOR SELECT TO anon
  USING (true);

-- Enable RLS on project_ratings
ALTER TABLE project_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on project_ratings"
  ON project_ratings FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public select on project_ratings"
  ON project_ratings FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow public update own rating"
  ON project_ratings FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- Enable RLS on projects (read-only for public)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on projects"
  ON projects FOR SELECT TO anon
  USING (true);

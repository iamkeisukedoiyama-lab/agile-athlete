-- ============================================
-- The Agile Athlete: Initial Migration
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── users ──
CREATE TABLE IF NOT EXISTS users (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    varchar(50)  NOT NULL UNIQUE,
  avatar_url  text,
  timezone    varchar(50)  NOT NULL DEFAULT 'Asia/Tokyo',
  created_at  timestamptz  NOT NULL DEFAULT now()
);

-- ── sprints ──
CREATE TABLE IF NOT EXISTS sprints (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       varchar(100) NOT NULL DEFAULT 'Sprint',
  goal        text NOT NULL,
  start_date  date NOT NULL,
  end_date    date NOT NULL,
  status      text NOT NULL DEFAULT 'active' CHECK (status IN ('active','completed','skipped')),
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_sprints_user_status ON sprints(user_id, status);

-- ── bugs ──
CREATE TABLE IF NOT EXISTS bugs (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sprint_id       uuid NOT NULL REFERENCES sprints(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bug_tag_id      text NOT NULL,
  trigger_tag_id  text,
  patch_id        text,
  is_public       boolean NOT NULL DEFAULT true,
  note            text,
  occurred_at     timestamptz NOT NULL DEFAULT now(),
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_bugs_sprint    ON bugs(sprint_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_bugs_user      ON bugs(user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_bugs_public    ON bugs(is_public, occurred_at DESC);

-- ── retrospectives ──
CREATE TABLE IF NOT EXISTS retrospectives (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sprint_id   uuid NOT NULL UNIQUE REFERENCES sprints(id) ON DELETE CASCADE,
  keep        text NOT NULL,
  problem     text NOT NULL,
  "try"       text NOT NULL,
  mood_score  int  CHECK (mood_score BETWEEN 1 AND 5),
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ── reactions ──
CREATE TABLE IF NOT EXISTS reactions (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  bug_id      uuid NOT NULL REFERENCES bugs(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        text NOT NULL CHECK (type IN ('lgtm','patch_applied')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(bug_id, user_id, type)
);
CREATE INDEX IF NOT EXISTS idx_reactions_bug ON reactions(bug_id);

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE sprints        ENABLE ROW LEVEL SECURITY;
ALTER TABLE bugs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE retrospectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions      ENABLE ROW LEVEL SECURITY;

-- users
CREATE POLICY "Users manage own profile"
  ON users FOR ALL USING (auth.uid() = id);

-- sprints
CREATE POLICY "Users manage own sprints"
  ON sprints FOR ALL USING (auth.uid() = user_id);

-- bugs: 自分のは全操作、公開バグは全員が読める
CREATE POLICY "Users manage own bugs"
  ON bugs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public bugs readable by all"
  ON bugs FOR SELECT USING (is_public = true);

-- retrospectives
CREATE POLICY "Users manage own retros"
  ON retrospectives FOR ALL
  USING (EXISTS (SELECT 1 FROM sprints WHERE id = sprint_id AND user_id = auth.uid()));

-- reactions
CREATE POLICY "Users manage own reactions"
  ON reactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "All reactions readable"
  ON reactions FOR SELECT USING (true);

-- ============================================
-- Auto-create user profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users(id, username)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      split_part(NEW.email, '@', 1)
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

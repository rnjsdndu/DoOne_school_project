CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  goal_message VARCHAR(255),
  preferred_mission_category VARCHAR(50),
  timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Seoul',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token TEXT NOT NULL,
  device_name VARCHAR(100),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mission_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL,
  title VARCHAR(120) NOT NULL,
  description TEXT,
  difficulty VARCHAR(20) NOT NULL DEFAULT 'easy',
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS user_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mission_template_id UUID NOT NULL REFERENCES mission_templates(id),
  assigned_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, assigned_date)
);

CREATE TABLE IF NOT EXISTS mission_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_mission_id UUID NOT NULL UNIQUE REFERENCES user_missions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  result VARCHAR(20) NOT NULL CHECK (result IN ('success', 'fail')),
  emotion VARCHAR(30),
  fail_reason TEXT,
  recorded_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (
    (result = 'success' AND emotion IS NULL AND fail_reason IS NULL)
    OR (result = 'fail' AND emotion IS NOT NULL AND fail_reason IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_user_missions_user_date ON user_missions(user_id, assigned_date DESC);
CREATE INDEX IF NOT EXISTS idx_mission_records_user_recorded ON mission_records(user_id, recorded_at DESC);

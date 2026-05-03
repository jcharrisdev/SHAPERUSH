-- Run this once in your Neon database console
CREATE TABLE IF NOT EXISTS players (
  id         VARCHAR(16) PRIMARY KEY,
  record     INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_record ON players(record DESC);

CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY,
  topic TEXT NOT NULL CHECK (topic IN ('writing', 'research', 'idea')),
  message TEXT NOT NULL CHECK (length(message) BETWEEN 1 AND 3000),
  reply_email TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

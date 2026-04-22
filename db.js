import Database from 'better-sqlite3';

// 1. Create/Open the connection
// Change this line:
// const db = new Database('smart-clipboard.db');

// To this (Absolute Path):
const db = new Database('/Users/benbirkhahn/lite-brain/smart-clipboard.db');

// 2. Set up the table structure
db.exec(`
  CREATE TABLE IF NOT EXISTS context_snippets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    source TEXT DEFAULT 'browser',
    -- This 'localtime' modifier fixes the 4-hour gap
    created_at DATETIME DEFAULT (datetime('now', 'localtime'))
  )
`);

export default db;
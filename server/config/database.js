import initSqlJs from 'sql.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'artvrkz.db');
let db;

export async function initDatabase() {
  const SQL = await initSqlJs();
  
  // Load existing DB file or create new one
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run('PRAGMA journal_mode = WAL;');

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT,
      name TEXT,
      role TEXT,
      avatar TEXT,
      bio TEXT,
      location TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS artist_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      cover_image TEXT,
      art_style TEXT,
      specialties TEXT,
      social_links TEXT,
      followers_count INTEGER DEFAULT 0,
      total_sales INTEGER DEFAULT 0,
      total_earnings REAL DEFAULT 0,
      rating REAL DEFAULT 0,
      review_count INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS artworks (
      id TEXT PRIMARY KEY,
      artist_id TEXT REFERENCES users(id),
      title TEXT,
      description TEXT,
      price REAL,
      category TEXT,
      medium TEXT,
      dimensions TEXT,
      orientation TEXT,
      tags TEXT,
      images TEXT,
      is_customizable INTEGER DEFAULT 0,
      availability TEXT DEFAULT 'available',
      views INTEGER DEFAULT 0,
      likes_count INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT,
      slug TEXT UNIQUE,
      image TEXT,
      description TEXT,
      artwork_count INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      buyer_id TEXT REFERENCES users(id),
      artwork_id TEXT REFERENCES artworks(id),
      artist_id TEXT REFERENCES users(id),
      total_price REAL,
      commission_rate REAL,
      commission_amount REAL,
      artist_earnings REAL,
      status TEXT DEFAULT 'pending',
      shipping_address TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS custom_requests (
      id TEXT PRIMARY KEY,
      buyer_id TEXT REFERENCES users(id),
      artist_id TEXT REFERENCES users(id),
      description TEXT,
      style TEXT,
      colors TEXT,
      size TEXT,
      budget_min REAL,
      budget_max REAL,
      deadline TEXT,
      purpose TEXT,
      reference_images TEXT,
      additional_notes TEXT,
      status TEXT DEFAULT 'pending',
      quote_amount REAL,
      artist_response TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      buyer_id TEXT REFERENCES users(id),
      artist_id TEXT REFERENCES users(id),
      last_message TEXT,
      last_message_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT REFERENCES conversations(id),
      sender_id TEXT REFERENCES users(id),
      content TEXT,
      message_type TEXT DEFAULT 'text',
      attachment TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      artwork_id TEXT REFERENCES artworks(id),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, artwork_id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      reviewer_id TEXT REFERENCES users(id),
      artist_id TEXT REFERENCES users(id),
      order_id TEXT REFERENCES orders(id),
      rating INTEGER,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      type TEXT,
      title TEXT,
      message TEXT,
      is_read INTEGER DEFAULT 0,
      reference_id TEXT,
      reference_type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      order_id TEXT REFERENCES orders(id),
      amount REAL,
      status TEXT DEFAULT 'pending',
      method TEXT,
      transaction_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  saveDatabase();
  console.log('✅ Database initialized successfully');
}

// sql.js helper: convert query results to array of objects
function rowsToObjects(result) {
  if (!result || result.length === 0) return [];
  const stmt = result[0];
  const columns = stmt.columns;
  return stmt.values.map(row => {
    const obj = {};
    columns.forEach((col, i) => { obj[col] = row[i]; });
    return obj;
  });
}

// Save database to file
export function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

// Wrapper that provides a better-sqlite3-like API for the routes
export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }

  return {
    // Prepare-like interface for compatibility
    prepare(sql) {
      return {
        run(...params) {
          db.run(sql, params);
          saveDatabase();
          return { changes: db.getRowsModified() };
        },
        get(...params) {
          const result = db.exec(sql, params);
          const rows = rowsToObjects(result);
          return rows[0] || undefined;
        },
        all(...params) {
          const result = db.exec(sql, params);
          return rowsToObjects(result);
        }
      };
    },
    exec(sql) {
      db.exec(sql);
      saveDatabase();
    },
    // Direct query helpers
    run(sql, params = []) {
      db.run(sql, params);
      saveDatabase();
      return { changes: db.getRowsModified() };
    },
    get(sql, params = []) {
      const result = db.exec(sql, params);
      const rows = rowsToObjects(result);
      return rows[0] || undefined;
    },
    all(sql, params = []) {
      const result = db.exec(sql, params);
      return rowsToObjects(result);
    }
  };
}

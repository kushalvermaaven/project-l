import initSqlJs from 'sql.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'artvrkz.db');
let db;
let pgPool;
const usePg = !!process.env.DATABASE_URL;

export async function initDatabase() {
  if (usePg) {
    console.log('Connecting to PostgreSQL database...');
    pgPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    
    // Initialize Postgres tables if they don't exist
    await pgPool.query(`
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

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
      );

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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT,
        slug TEXT UNIQUE,
        image TEXT,
        description TEXT,
        artwork_count INTEGER DEFAULT 0
      );

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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        buyer_id TEXT REFERENCES users(id),
        artist_id TEXT REFERENCES users(id),
        last_message TEXT,
        last_message_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT REFERENCES conversations(id),
        sender_id TEXT REFERENCES users(id),
        content TEXT,
        message_type TEXT DEFAULT 'text',
        attachment TEXT,
        is_read INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS favorites (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id),
        artwork_id TEXT REFERENCES artworks(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, artwork_id)
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        reviewer_id TEXT REFERENCES users(id),
        artist_id TEXT REFERENCES users(id),
        order_id TEXT REFERENCES orders(id),
        rating INTEGER,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id),
        type TEXT,
        title TEXT,
        message TEXT,
        is_read INTEGER DEFAULT 0,
        reference_id TEXT,
        reference_type TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        order_id TEXT REFERENCES orders(id),
        amount REAL,
        status TEXT DEFAULT 'pending',
        method TEXT,
        transaction_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✨ PostgreSQL Database initialized successfully');
    return;
  }

  // Fallback to SQLite
  console.log('Connecting to local SQLite database...');
  const SQL = await initSqlJs();
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
  console.log('✨ SQLite Database initialized successfully');
}

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

export function saveDatabase() {
  if (db && !usePg) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

function convertSqlToPg(sql) {
  let counter = 1;
  return sql.replace(/\?/g, () => `$${counter++}`);
}

export function getDb() {
  if (!db && !pgPool) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }

  return {
    prepare(sql) {
      if (usePg) {
        const pgSql = convertSqlToPg(sql);
        return {
          async run(...params) {
            const res = await pgPool.query(pgSql, params);
            return { changes: res.rowCount };
          },
          async get(...params) {
            const res = await pgPool.query(pgSql, params);
            return res.rows[0] || undefined;
          },
          async all(...params) {
            const res = await pgPool.query(pgSql, params);
            return res.rows;
          }
        };
      } else {
        // SQLite
        return {
          async run(...params) {
            db.run(sql, params);
            saveDatabase();
            return { changes: db.getRowsModified() };
          },
          async get(...params) {
            const result = db.exec(sql, params);
            const rows = rowsToObjects(result);
            return rows[0] || undefined;
          },
          async all(...params) {
            const result = db.exec(sql, params);
            return rowsToObjects(result);
          }
        };
      }
    },
    async exec(sql) {
      if (usePg) {
        await pgPool.query(sql);
      } else {
        db.exec(sql);
        saveDatabase();
      }
    },
    async run(sql, params = []) {
      if (usePg) {
        const pgSql = convertSqlToPg(sql);
        const res = await pgPool.query(pgSql, params);
        return { changes: res.rowCount };
      } else {
        db.run(sql, params);
        saveDatabase();
        return { changes: db.getRowsModified() };
      }
    },
    async get(sql, params = []) {
      if (usePg) {
        const pgSql = convertSqlToPg(sql);
        const res = await pgPool.query(pgSql, params);
        return res.rows[0] || undefined;
      } else {
        const result = db.exec(sql, params);
        const rows = rowsToObjects(result);
        return rows[0] || undefined;
      }
    },
    async all(sql, params = []) {
      if (usePg) {
        const pgSql = convertSqlToPg(sql);
        const res = await pgPool.query(pgSql, params);
        return res.rows;
      } else {
        const result = db.exec(sql, params);
        return rowsToObjects(result);
      }
    }
  };
}

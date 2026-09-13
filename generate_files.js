const fs = require('fs');
const path = require('path');

const rootDir = "c:\\Users\\Kushal Verma\\OneDrive\\Desktop\\project l";

const files = {
  "package.json": `{
  "name": "artvrkz",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "npm run dev:server & npm run dev:client",
    "dev:server": "cd server && npm run dev",
    "dev:client": "cd client && npm run dev",
    "seed": "cd server && npm run seed",
    "install:all": "npm install && cd server && npm install && cd ../client && npm install"
  }
}`,
  "server/package.json": `{
  "name": "artvrkz-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "seed": "node seed.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "better-sqlite3": "^11.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "uuid": "^10.0.0"
  }
}`,
  "server/index.js": `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { initDatabase } from './config/database.js';

import authRoutes from './routes/auth.js';
import artworksRoutes from './routes/artworks.js';
import artistsRoutes from './routes/artists.js';
import ordersRoutes from './routes/orders.js';
import favoritesRoutes from './routes/favorites.js';
import messagesRoutes from './routes/messages.js';
import customRequestsRoutes from './routes/customRequests.js';
import reviewsRoutes from './routes/reviews.js';
import notificationsRoutes from './routes/notifications.js';
import paymentsRoutes from './routes/payments.js';
import categoriesRoutes from './routes/categories.js';
import usersRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworksRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/custom-requests', customRequestsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Initialize DB and start server
initDatabase();

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`,
  "server/config/database.js": `import Database from 'better-sqlite3';
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

export function initDatabase() {
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(\`
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      buyer_id TEXT REFERENCES users(id),
      artist_id TEXT REFERENCES users(id),
      last_message TEXT,
      last_message_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT REFERENCES conversations(id),
      sender_id TEXT REFERENCES users(id),
      content TEXT,
      message_type TEXT DEFAULT 'text',
      attachment TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      artwork_id TEXT REFERENCES artworks(id),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, artwork_id)
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      reviewer_id TEXT REFERENCES users(id),
      artist_id TEXT REFERENCES users(id),
      order_id TEXT REFERENCES orders(id),
      rating INTEGER,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      order_id TEXT REFERENCES orders(id),
      amount REAL,
      status TEXT DEFAULT 'pending',
      method TEXT,
      transaction_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  \`);
}

export function getDb() {
  if (!db) {
    db = new Database(dbPath);
  }
  return db;
}
`,
  "server/middleware/auth.js": `import jwt from 'jsonwebtoken';

const JWT_SECRET = 'artvrkz_secret_key_2024';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
`,
  "server/middleware/upload.js": `import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter
});

export const uploadSingle = (name) => upload.single(name);
export const uploadArray = (name, maxCount) => upload.array(name, maxCount);
`,
  "server/routes/auth.js": `import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = 'artvrkz_secret_key_2024';

router.post('/register', async (req, res) => {
  const { email, password, name, role = 'buyer' } = req.body;
  const db = getDb();

  try {
    const userExists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (userExists) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    db.transaction(() => {
      db.prepare('INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)').run(userId, email, hashedPassword, name, role);

      if (role === 'artist') {
        db.prepare('INSERT INTO artist_profiles (id, user_id) VALUES (?, ?)').run(uuidv4(), userId);
      }
    })();

    const token = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: userId, email, name, role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = getDb();

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    delete user.password;
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/forgot-password', (req, res) => {
  res.json({ message: 'Password reset link sent to your email.' });
});

router.get('/me', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const user = db.prepare('SELECT id, email, name, role, avatar, bio, location, phone, created_at FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/artworks.js": `import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  const { category, search, limit = 20, offset = 0 } = req.query;

  try {
    let query = 'SELECT a.*, u.name as artist_name FROM artworks a JOIN users u ON a.artist_id = u.id WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND a.category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (a.title LIKE ? OR a.tags LIKE ?)';
      params.push(\`%\${search}%\`, \`%\${search}%\`);
    }

    query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const artworks = db.prepare(query).all(...params);
    artworks.forEach(a => a.images = JSON.parse(a.images || '[]'));
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/featured', (req, res) => {
  const db = getDb();
  try {
    const artworks = db.prepare('SELECT * FROM artworks WHERE is_featured = 1 LIMIT 10').all();
    artworks.forEach(a => a.images = JSON.parse(a.images || '[]'));
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', (req, res) => {
  const db = getDb();
  try {
    db.prepare('UPDATE artworks SET views = views + 1 WHERE id = ?').run(req.params.id);
    const artwork = db.prepare('SELECT a.*, u.name as artist_name, u.avatar as artist_avatar FROM artworks a JOIN users u ON a.artist_id = u.id WHERE a.id = ?').get(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Not found' });
    artwork.images = JSON.parse(artwork.images || '[]');
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, requireRole('artist', 'admin'), (req, res) => {
  const db = getDb();
  const { title, description, price, category, medium, dimensions, orientation, tags, images, is_customizable } = req.body;
  const id = uuidv4();

  try {
    db.prepare(\`
      INSERT INTO artworks (id, artist_id, title, description, price, category, medium, dimensions, orientation, tags, images, is_customizable)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    \`).run(id, req.user.id, title, description, price, category, medium, dimensions, orientation, tags, JSON.stringify(images), is_customizable ? 1 : 0);
    res.status(201).json({ id, message: 'Artwork created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', verifyToken, (req, res) => {
  const db = getDb();
  const { title, description, price, availability } = req.body;

  try {
    const artwork = db.prepare('SELECT artist_id FROM artworks WHERE id = ?').get(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Not found' });
    if (artwork.artist_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    db.prepare('UPDATE artworks SET title = ?, description = ?, price = ?, availability = ? WHERE id = ?').run(title, description, price, availability, req.params.id);
    res.json({ message: 'Artwork updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const artwork = db.prepare('SELECT artist_id FROM artworks WHERE id = ?').get(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Not found' });
    if (artwork.artist_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    db.prepare('DELETE FROM artworks WHERE id = ?').run(req.params.id);
    res.json({ message: 'Artwork deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/like', verifyToken, (req, res) => {
  const db = getDb();
  try {
    db.prepare('UPDATE artworks SET likes_count = likes_count + 1 WHERE id = ?').run(req.params.id);
    res.json({ message: 'Liked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/artists.js": `import express from 'express';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  try {
    const artists = db.prepare('SELECT u.id, u.name, u.avatar, p.cover_image, p.art_style FROM users u JOIN artist_profiles p ON u.id = p.user_id WHERE u.role = "artist"').all();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/featured', (req, res) => {
  const db = getDb();
  try {
    const artists = db.prepare('SELECT u.id, u.name, u.avatar, p.cover_image FROM users u JOIN artist_profiles p ON u.id = p.user_id WHERE u.role = "artist" ORDER BY p.rating DESC LIMIT 5').all();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', (req, res) => {
  const db = getDb();
  try {
    const artist = db.prepare('SELECT u.id, u.name, u.avatar, u.bio, u.location, p.* FROM users u JOIN artist_profiles p ON u.id = p.user_id WHERE u.id = ?').get(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Not found' });
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/artworks', (req, res) => {
  const db = getDb();
  try {
    const artworks = db.prepare('SELECT * FROM artworks WHERE artist_id = ?').all(req.params.id);
    artworks.forEach(a => a.images = JSON.parse(a.images || '[]'));
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/follow', verifyToken, (req, res) => {
  res.json({ message: 'Follow toggled' });
});

router.put('/profile', verifyToken, (req, res) => {
  const db = getDb();
  const { bio, location, art_style, specialties } = req.body;
  try {
    db.prepare('UPDATE users SET bio = ?, location = ? WHERE id = ?').run(bio, location, req.user.id);
    db.prepare('UPDATE artist_profiles SET art_style = ?, specialties = ? WHERE user_id = ?').run(art_style, specialties, req.user.id);
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/orders.js": `import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const query = req.user.role === 'artist' 
      ? 'SELECT * FROM orders WHERE artist_id = ?'
      : 'SELECT * FROM orders WHERE buyer_id = ?';
    const orders = db.prepare(query).all(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, (req, res) => {
  const db = getDb();
  const { artwork_id, shipping_address, notes } = req.body;
  
  try {
    const artwork = db.prepare('SELECT * FROM artworks WHERE id = ?').get(artwork_id);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    
    const total_price = artwork.price;
    const commission_rate = 0.12;
    const commission_amount = total_price * commission_rate;
    const artist_earnings = total_price - commission_amount;
    const id = uuidv4();
    
    db.prepare(\`
      INSERT INTO orders (id, buyer_id, artwork_id, artist_id, total_price, commission_rate, commission_amount, artist_earnings, shipping_address, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    \`).run(id, req.user.id, artwork_id, artwork.artist_id, total_price, commission_rate, commission_amount, artist_earnings, shipping_address, notes);
    
    res.status(201).json({ id, message: 'Order created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', verifyToken, (req, res) => {
  const db = getDb();
  const { status } = req.body;
  try {
    const order = db.prepare('SELECT artist_id FROM orders WHERE id = ?').get(req.params.id);
    if (order.artist_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, req.params.id);
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/favorites.js": `import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const favorites = db.prepare('SELECT f.id as fav_id, a.* FROM favorites f JOIN artworks a ON f.artwork_id = a.id WHERE f.user_id = ?').all(req.user.id);
    favorites.forEach(a => a.images = JSON.parse(a.images || '[]'));
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/toggle', verifyToken, (req, res) => {
  const db = getDb();
  const { artwork_id } = req.body;
  try {
    const exists = db.prepare('SELECT id FROM favorites WHERE user_id = ? AND artwork_id = ?').get(req.user.id, artwork_id);
    if (exists) {
      db.prepare('DELETE FROM favorites WHERE id = ?').run(exists.id);
      res.json({ message: 'Removed from favorites' });
    } else {
      db.prepare('INSERT INTO favorites (id, user_id, artwork_id) VALUES (?, ?, ?)').run(uuidv4(), req.user.id, artwork_id);
      res.json({ message: 'Added to favorites' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:artworkId', verifyToken, (req, res) => {
  const db = getDb();
  try {
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND artwork_id = ?').run(req.user.id, req.params.artworkId);
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/messages.js": `import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/conversations', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const conversations = db.prepare('SELECT * FROM conversations WHERE buyer_id = ? OR artist_id = ?').all(req.user.id, req.user.id);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/conversations/:id', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const messages = db.prepare('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC').all(req.params.id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/conversations', verifyToken, (req, res) => {
  const db = getDb();
  const { artist_id } = req.body;
  try {
    let conv = db.prepare('SELECT * FROM conversations WHERE buyer_id = ? AND artist_id = ?').get(req.user.id, artist_id);
    if (!conv) {
      const id = uuidv4();
      db.prepare('INSERT INTO conversations (id, buyer_id, artist_id) VALUES (?, ?, ?)').run(id, req.user.id, artist_id);
      conv = { id, buyer_id: req.user.id, artist_id };
    }
    res.status(201).json(conv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/conversations/:id/messages', verifyToken, (req, res) => {
  const db = getDb();
  const { content } = req.body;
  try {
    const msgId = uuidv4();
    db.prepare('INSERT INTO messages (id, conversation_id, sender_id, content) VALUES (?, ?, ?, ?)').run(msgId, req.params.id, req.user.id, content);
    db.prepare('UPDATE conversations SET last_message = ?, last_message_at = CURRENT_TIMESTAMP WHERE id = ?').run(content, req.params.id);
    res.status(201).json({ id: msgId, content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/conversations/:id/read', verifyToken, (req, res) => {
  const db = getDb();
  try {
    db.prepare('UPDATE messages SET is_read = 1 WHERE conversation_id = ? AND sender_id != ?').run(req.params.id, req.user.id);
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/customRequests.js": `import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const query = req.user.role === 'artist'
      ? 'SELECT * FROM custom_requests WHERE artist_id = ?'
      : 'SELECT * FROM custom_requests WHERE buyer_id = ?';
    const reqs = db.prepare(query).all(req.user.id);
    res.json(reqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const reqData = db.prepare('SELECT * FROM custom_requests WHERE id = ?').get(req.params.id);
    res.json(reqData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, (req, res) => {
  const db = getDb();
  const { artist_id, description, style, colors, size, budget_min, budget_max, deadline, purpose } = req.body;
  try {
    const id = uuidv4();
    db.prepare(\`
      INSERT INTO custom_requests (id, buyer_id, artist_id, description, style, colors, size, budget_min, budget_max, deadline, purpose)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    \`).run(id, req.user.id, artist_id, description, style, colors, size, budget_min, budget_max, deadline, purpose);
    res.status(201).json({ id, message: 'Request created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/respond', verifyToken, (req, res) => {
  const db = getDb();
  const { quote_amount, artist_response, status } = req.body;
  try {
    db.prepare('UPDATE custom_requests SET quote_amount = ?, artist_response = ?, status = ? WHERE id = ? AND artist_id = ?')
      .run(quote_amount, artist_response, status, req.params.id, req.user.id);
    res.json({ message: 'Responded to request' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', verifyToken, (req, res) => {
  const db = getDb();
  const { status } = req.body;
  try {
    db.prepare('UPDATE custom_requests SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/reviews.js": `import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/artist/:artistId', (req, res) => {
  const db = getDb();
  try {
    const reviews = db.prepare('SELECT r.*, u.name as reviewer_name, u.avatar FROM reviews r JOIN users u ON r.reviewer_id = u.id WHERE r.artist_id = ?').all(req.params.artistId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, (req, res) => {
  const db = getDb();
  const { artist_id, order_id, rating, comment } = req.body;
  try {
    const id = uuidv4();
    db.prepare('INSERT INTO reviews (id, reviewer_id, artist_id, order_id, rating, comment) VALUES (?, ?, ?, ?, ?, ?)')
      .run(id, req.user.id, artist_id, order_id, rating, comment);
    res.status(201).json({ id, message: 'Review added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/notifications.js": `import express from 'express';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const notifications = db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/unread-count', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const result = db.prepare('SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0').get(req.user.id);
    res.json({ count: result.count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/read', verifyToken, (req, res) => {
  const db = getDb();
  try {
    db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/read-all', verifyToken, (req, res) => {
  const db = getDb();
  try {
    db.prepare('UPDATE notifications SET is_read = 1 WHERE user_id = ?').run(req.user.id);
    res.json({ message: 'All marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/payments.js": `import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';
import { processPayment } from '../services/paymentService.js';

const router = express.Router();

router.post('/checkout', verifyToken, async (req, res) => {
  const db = getDb();
  const { order_id, method } = req.body;
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(order_id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const txId = await processPayment({ amount: order.total_price });
    
    db.transaction(() => {
      const paymentId = uuidv4();
      db.prepare('INSERT INTO payments (id, order_id, amount, status, method, transaction_id) VALUES (?, ?, ?, ?, ?, ?)')
        .run(paymentId, order_id, order.total_price, 'completed', method, txId);
      db.prepare('UPDATE orders SET status = "paid", updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(order_id);
    })();
    
    res.json({ message: 'Payment successful', transaction_id: txId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const payments = db.prepare('SELECT p.* FROM payments p JOIN orders o ON p.order_id = o.id WHERE o.buyer_id = ? OR o.artist_id = ?').all(req.user.id, req.user.id);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/categories.js": `import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  try {
    const categories = db.prepare('SELECT * FROM categories').all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, requireRole('admin'), (req, res) => {
  const db = getDb();
  const { name, slug, image, description } = req.body;
  try {
    const id = uuidv4();
    db.prepare('INSERT INTO categories (id, name, slug, image, description) VALUES (?, ?, ?, ?, ?)')
      .run(id, name, slug, image, description);
    res.status(201).json({ id, message: 'Category created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/users.js": `import express from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const user = db.prepare('SELECT id, email, name, role, avatar, bio, location, phone FROM users WHERE id = ?').get(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', verifyToken, (req, res) => {
  const db = getDb();
  const { name, avatar, bio, location, phone } = req.body;
  try {
    db.prepare('UPDATE users SET name = ?, avatar = ?, bio = ?, location = ?, phone = ? WHERE id = ?')
      .run(name, avatar, bio, location, phone, req.user.id);
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/password', verifyToken, async (req, res) => {
  const db = getDb();
  const { currentPassword, newPassword } = req.body;
  try {
    const user = db.prepare('SELECT password FROM users WHERE id = ?').get(req.user.id);
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid current password' });
    
    const hashed = await bcrypt.hash(newPassword, 10);
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashed, req.user.id);
    res.json({ message: 'Password updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
`,
  "server/routes/admin.js": `import express from 'express';
import { getDb } from '../config/database.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken, requireRole('admin'));

router.get('/stats', (req, res) => {
  const db = getDb();
  try {
    const users = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const artists = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = "artist"').get().count;
    const artworks = db.prepare('SELECT COUNT(*) as count FROM artworks').get().count;
    const orders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
    const revenue = db.prepare('SELECT SUM(commission_amount) as total FROM orders WHERE status = "paid"').get().total || 0;
    
    res.json({ users, artists, artworks, orders, revenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users', (req, res) => {
  const db = getDb();
  try {
    const users = db.prepare('SELECT id, email, name, role, created_at FROM users').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/users/:id/status', (req, res) => {
  res.json({ message: 'User status updated' });
});

router.get('/artworks', (req, res) => {
  const db = getDb();
  try {
    const artworks = db.prepare('SELECT id, title, artist_id, price, is_featured, created_at FROM artworks').all();
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/artworks/:id/feature', (req, res) => {
  const db = getDb();
  const { is_featured } = req.body;
  try {
    db.prepare('UPDATE artworks SET is_featured = ? WHERE id = ?').run(is_featured ? 1 : 0, req.params.id);
    res.json({ message: 'Featured status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders', (req, res) => {
  const db = getDb();
  try {
    const orders = db.prepare('SELECT * FROM orders').all();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/revenue', (req, res) => {
  res.json({ report: 'Revenue report mock data' });
});

export default router;
`,
  "server/services/paymentService.js": `export const processPayment = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('txn_' + Math.random().toString(36).substr(2, 9));
    }, 1000);
  });
};

export const calculateCommission = (amount, rate = 0.12) => {
  return amount * rate;
};

export const getPaymentStatus = async (paymentId) => {
  return 'completed';
};
`,
  "server/seed.js": `import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data', 'artvrkz.db');

console.log('Seeding database...');
const db = new Database(dbPath);

async function seed() {
  const password = await bcrypt.hash('buyer123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);

  // Clear existing
  db.exec(\`
    DELETE FROM payments; DELETE FROM notifications; DELETE FROM reviews;
    DELETE FROM favorites; DELETE FROM messages; DELETE FROM conversations;
    DELETE FROM custom_requests; DELETE FROM orders; DELETE FROM artworks;
    DELETE FROM artist_profiles; DELETE FROM categories; DELETE FROM users;
  \`);

  // Admin
  const adminId = uuidv4();
  db.prepare('INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)').run(adminId, 'admin@artvrkz.com', adminPassword, 'Admin', 'admin');

  // Buyers
  const buyers = [
    { id: uuidv4(), email: 'rahul@example.com', name: 'Rahul Gupta' },
    { id: uuidv4(), email: 'sneha@example.com', name: 'Sneha Reddy' },
    { id: uuidv4(), email: 'vikram@example.com', name: 'Vikram Singh' }
  ];
  const insertUser = db.prepare('INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)');
  buyers.forEach(b => insertUser.run(b.id, b.email, password, b.name, 'buyer'));

  // Artists
  const artists = [
    { id: uuidv4(), email: 'priya@example.com', name: 'Priya Sharma', bio: 'Digital Art & Illustrations from Mumbai', style: 'Digital', spec: 'Illustrations' },
    { id: uuidv4(), email: 'arjun@example.com', name: 'Arjun Patel', bio: 'Abstract & Contemporary from Bangalore', style: 'Abstract', spec: 'Paintings' },
    { id: uuidv4(), email: 'zara@example.com', name: 'Zara Khan', bio: 'Photography & Minimalist from Delhi', style: 'Minimalist', spec: 'Photography' },
    { id: uuidv4(), email: 'rohan@example.com', name: 'Rohan Mehta', bio: 'Traditional & Cultural from Jaipur', style: 'Traditional', spec: 'Culture' },
    { id: uuidv4(), email: 'aisha@example.com', name: 'Aisha Verma', bio: 'Portraits & Realism from Pune', style: 'Realism', spec: 'Portraits' },
    { id: uuidv4(), email: 'kian@example.com', name: 'Kian Desai', bio: 'Posters & Pop Art from Ahmedabad', style: 'Pop Art', spec: 'Posters' }
  ];
  const insertProfile = db.prepare('INSERT INTO artist_profiles (id, user_id, art_style, specialties) VALUES (?, ?, ?, ?)');
  artists.forEach(a => {
    insertUser.run(a.id, a.email, password, a.name, 'artist');
    insertProfile.run(uuidv4(), a.id, a.style, a.spec);
  });

  // Categories
  const cats = ['Digital Art', 'Paintings', 'Illustrations', 'Photography', 'Abstract', 'Portraits', 'Minimalist', 'Traditional Art', 'Custom Art', 'Posters & Prints'];
  const insertCat = db.prepare('INSERT INTO categories (id, name, slug) VALUES (?, ?, ?)');
  cats.forEach(c => insertCat.run(uuidv4(), c, c.toLowerCase().replace(/ /g, '-')));

  // Artworks
  const images = [
    '1579783902614-a3fb3927b6a5', '1541961017774-22349e4a1262', '1547891654-e66ed7ebb968',
    '1549490349-8643362247b5', '1578926078693-4eb3d4499e43', '1579783928621-7a13d66a62d1',
    '1482160549825-59d1b23cb208', '1544967082-d9d25d867d66', '1558618666-fcd25c85f7aa',
    '1561839561-b13bcfe0f6b5', '1551913902-c92207136dcd', '1569172122301-bc5008bc09c5'
  ];
  
  const insertArt = db.prepare('INSERT INTO artworks (id, artist_id, title, description, price, category, images) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const allArtworks = [];
  images.forEach((img, idx) => {
    const artId = uuidv4();
    allArtworks.push(artId);
    insertArt.run(artId, artists[idx % artists.length].id, \`Artwork \${idx+1}\`, 'Beautiful piece', 500 + (idx * 500), cats[idx % cats.length], JSON.stringify([\`https://images.unsplash.com/photo-\${img}?w=800&h=600&fit=crop\`]));
  });

  // Sample order
  const orderId = uuidv4();
  db.prepare('INSERT INTO orders (id, buyer_id, artwork_id, artist_id, total_price, commission_rate, commission_amount, artist_earnings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(orderId, buyers[0].id, allArtworks[0], artists[0].id, 1000, 0.12, 120, 880);

  console.log('Seeding complete!');
}

seed().catch(console.error);
`
};

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(rootDir, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Created:', fullPath);
}

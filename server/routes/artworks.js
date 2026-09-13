import express from 'express';
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
      params.push(`%${search}%`, `%${search}%`);
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
    db.prepare(`
      INSERT INTO artworks (id, artist_id, title, description, price, category, medium, dimensions, orientation, tags, images, is_customizable)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, req.user.id, title, description, price, category, medium, dimensions, orientation, tags, JSON.stringify(images), is_customizable ? 1 : 0);
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

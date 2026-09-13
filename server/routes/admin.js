import express from 'express';
import { getDb } from '../config/database.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken, requireRole('admin'));

router.get('/stats', async (req, res) => {
  const db = getDb();
  try {
    const users = await db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const artists = await db.prepare('SELECT COUNT(*) as count FROM users WHERE role = "artist"').get().count;
    const artworks = await db.prepare('SELECT COUNT(*) as count FROM artworks').get().count;
    const orders = await db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
    const revenue = await db.prepare('SELECT SUM(commission_amount) as total FROM orders WHERE status = "paid"').get().total || 0;
    
    res.json({ users, artists, artworks, orders, revenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users', async (req, res) => {
  const db = getDb();
  try {
    const users = await db.prepare('SELECT id, email, name, role, created_at FROM users').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/users/:id/status', async (req, res) => {
  res.json({ message: 'User status updated' });
});

router.get('/artworks', async (req, res) => {
  const db = getDb();
  try {
    const artworks = await db.prepare('SELECT id, title, artist_id, price, is_featured, created_at FROM artworks').all();
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/artworks/:id/feature', async (req, res) => {
  const db = getDb();
  const { is_featured } = req.body;
  try {
    await db.prepare('UPDATE artworks SET is_featured = ? WHERE id = ?').run(is_featured ? 1 : 0, req.params.id);
    res.json({ message: 'Featured status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders', async (req, res) => {
  const db = getDb();
  try {
    const orders = await db.prepare('SELECT * FROM orders').all();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/revenue', async (req, res) => {
  res.json({ report: 'Revenue report mock data' });
});

export default router;

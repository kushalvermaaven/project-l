import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const db = getDb();
  try {
    const favorites = await db.prepare('SELECT f.id as fav_id, a.* FROM favorites f JOIN artworks a ON f.artwork_id = a.id WHERE f.user_id = ?').all(req.user.id);
    favorites.forEach(a => a.images = JSON.parse(a.images || '[]'));
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/toggle', verifyToken, async (req, res) => {
  const db = getDb();
  const { artwork_id } = req.body;
  try {
    const exists = await db.prepare('SELECT id FROM favorites WHERE user_id = ? AND artwork_id = ?').get(req.user.id, artwork_id);
    if (exists) {
      await db.prepare('DELETE FROM favorites WHERE id = ?').run(exists.id);
      res.json({ message: 'Removed from favorites' });
    } else {
      await db.prepare('INSERT INTO favorites (id, user_id, artwork_id) VALUES (?, ?, ?)').run(uuidv4(), req.user.id, artwork_id);
      res.json({ message: 'Added to favorites' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:artworkId', verifyToken, async (req, res) => {
  const db = getDb();
  try {
    await db.prepare('DELETE FROM favorites WHERE user_id = ? AND artwork_id = ?').run(req.user.id, req.params.artworkId);
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

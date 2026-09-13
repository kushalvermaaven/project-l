import express from 'express';
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

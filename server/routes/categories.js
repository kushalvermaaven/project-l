import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const db = getDb();
  try {
    const categories = await db.prepare('SELECT * FROM categories').all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, requireRole('admin'), async (req, res) => {
  const db = getDb();
  const { name, slug, image, description } = req.body;
  try {
    const id = uuidv4();
    await db.prepare('INSERT INTO categories (id, name, slug, image, description) VALUES (?, ?, ?, ?, ?)')
      .run(id, name, slug, image, description);
    res.status(201).json({ id, message: 'Category created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

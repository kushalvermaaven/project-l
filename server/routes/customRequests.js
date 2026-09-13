import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const db = getDb();
  try {
    const query = req.user.role === 'artist'
      ? 'SELECT * FROM custom_requests WHERE artist_id = ?'
      : 'SELECT * FROM custom_requests WHERE buyer_id = ?';
    const reqs = await db.prepare(query).all(req.user.id);
    res.json(reqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  const db = getDb();
  try {
    const reqData = await db.prepare('SELECT * FROM custom_requests WHERE id = ?').get(req.params.id);
    res.json(reqData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  const db = getDb();
  const { artist_id, description, style, colors, size, budget_min, budget_max, deadline, purpose } = req.body;
  try {
    const id = uuidv4();
    await db.prepare(`
      INSERT INTO custom_requests (id, buyer_id, artist_id, description, style, colors, size, budget_min, budget_max, deadline, purpose)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, req.user.id, artist_id, description, style, colors, size, budget_min, budget_max, deadline, purpose);
    res.status(201).json({ id, message: 'Request created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/respond', verifyToken, async (req, res) => {
  const db = getDb();
  const { quote_amount, artist_response, status } = req.body;
  try {
    await db.prepare('UPDATE custom_requests SET quote_amount = ?, artist_response = ?, status = ? WHERE id = ? AND artist_id = ?')
      .run(quote_amount, artist_response, status, req.params.id, req.user.id);
    res.json({ message: 'Responded to request' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', verifyToken, async (req, res) => {
  const db = getDb();
  const { status } = req.body;
  try {
    await db.prepare('UPDATE custom_requests SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

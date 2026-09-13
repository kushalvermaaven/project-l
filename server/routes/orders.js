import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const db = getDb();
  try {
    const query = req.user.role === 'artist' 
      ? 'SELECT * FROM orders WHERE artist_id = ?'
      : 'SELECT * FROM orders WHERE buyer_id = ?';
    const orders = await db.prepare(query).all(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  const db = getDb();
  try {
    const order = await db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  const db = getDb();
  const { artwork_id, shipping_address, notes } = req.body;
  
  try {
    const artwork = await db.prepare('SELECT * FROM artworks WHERE id = ?').get(artwork_id);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    
    const total_price = artwork.price;
    const commission_rate = 0.12;
    const commission_amount = total_price * commission_rate;
    const artist_earnings = total_price - commission_amount;
    const id = uuidv4();
    
    await db.prepare(`
      INSERT INTO orders (id, buyer_id, artwork_id, artist_id, total_price, commission_rate, commission_amount, artist_earnings, shipping_address, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, req.user.id, artwork_id, artwork.artist_id, total_price, commission_rate, commission_amount, artist_earnings, shipping_address, notes);
    
    res.status(201).json({ id, message: 'Order created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', verifyToken, async (req, res) => {
  const db = getDb();
  const { status } = req.body;
  try {
    const order = await db.prepare('SELECT artist_id FROM orders WHERE id = ?').get(req.params.id);
    if (order.artist_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, req.params.id);
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

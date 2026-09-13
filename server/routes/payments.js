import express from 'express';
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

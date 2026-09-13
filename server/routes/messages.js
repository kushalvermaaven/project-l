import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/conversations', verifyToken, async (req, res) => {
  const db = getDb();
  try {
    const conversations = await db.prepare('SELECT * FROM conversations WHERE buyer_id = ? OR artist_id = ?').all(req.user.id, req.user.id);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/conversations/:id', verifyToken, async (req, res) => {
  const db = getDb();
  try {
    const messages = await db.prepare('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC').all(req.params.id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/conversations', verifyToken, async (req, res) => {
  const db = getDb();
  const { artist_id } = req.body;
  try {
    let conv = await db.prepare('SELECT * FROM conversations WHERE buyer_id = ? AND artist_id = ?').get(req.user.id, artist_id);
    if (!conv) {
      const id = uuidv4();
      await db.prepare('INSERT INTO conversations (id, buyer_id, artist_id) VALUES (?, ?, ?)').run(id, req.user.id, artist_id);
      conv = { id, buyer_id: req.user.id, artist_id };
    }
    res.status(201).json(conv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/conversations/:id/messages', verifyToken, async (req, res) => {
  const db = getDb();
  const { content } = req.body;
  try {
    const msgId = uuidv4();
    await db.prepare('INSERT INTO messages (id, conversation_id, sender_id, content) VALUES (?, ?, ?, ?)').run(msgId, req.params.id, req.user.id, content);
    await db.prepare('UPDATE conversations SET last_message = ?, last_message_at = CURRENT_TIMESTAMP WHERE id = ?').run(content, req.params.id);
    res.status(201).json({ id: msgId, content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/conversations/:id/read', verifyToken, async (req, res) => {
  const db = getDb();
  try {
    await db.prepare('UPDATE messages SET is_read = 1 WHERE conversation_id = ? AND sender_id != ?').run(req.params.id, req.user.id);
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

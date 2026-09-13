import express from 'express';
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

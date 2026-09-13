import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = 'artvrkz_secret_key_2024';

router.post('/register', async (req, res) => {
  const { email, password, name, role = 'buyer' } = req.body;
  const db = getDb();

  try {
    const userExists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (userExists) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    db.transaction(() => {
      db.prepare('INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)').run(userId, email, hashedPassword, name, role);

      if (role === 'artist') {
        db.prepare('INSERT INTO artist_profiles (id, user_id) VALUES (?, ?)').run(uuidv4(), userId);
      }
    })();

    const token = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: userId, email, name, role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = getDb();

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    delete user.password;
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/forgot-password', (req, res) => {
  res.json({ message: 'Password reset link sent to your email.' });
});

router.get('/me', verifyToken, (req, res) => {
  const db = getDb();
  try {
    const user = db.prepare('SELECT id, email, name, role, avatar, bio, location, phone, created_at FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

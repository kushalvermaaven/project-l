import express from 'express';
import { getDb } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  try {
    const artists = db.prepare('SELECT u.id, u.name, u.avatar, p.cover_image, p.art_style FROM users u JOIN artist_profiles p ON u.id = p.user_id WHERE u.role = "artist"').all();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/featured', (req, res) => {
  const db = getDb();
  try {
    const artists = db.prepare('SELECT u.id, u.name, u.avatar, p.cover_image FROM users u JOIN artist_profiles p ON u.id = p.user_id WHERE u.role = "artist" ORDER BY p.rating DESC LIMIT 5').all();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', (req, res) => {
  const db = getDb();
  try {
    const artist = db.prepare('SELECT u.id, u.name, u.avatar, u.bio, u.location, p.* FROM users u JOIN artist_profiles p ON u.id = p.user_id WHERE u.id = ?').get(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Not found' });
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/artworks', (req, res) => {
  const db = getDb();
  try {
    const artworks = db.prepare('SELECT * FROM artworks WHERE artist_id = ?').all(req.params.id);
    artworks.forEach(a => a.images = JSON.parse(a.images || '[]'));
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/follow', verifyToken, (req, res) => {
  res.json({ message: 'Follow toggled' });
});

router.put('/profile', verifyToken, (req, res) => {
  const db = getDb();
  const { bio, location, art_style, specialties } = req.body;
  try {
    db.prepare('UPDATE users SET bio = ?, location = ? WHERE id = ?').run(bio, location, req.user.id);
    db.prepare('UPDATE artist_profiles SET art_style = ?, specialties = ? WHERE user_id = ?').run(art_style, specialties, req.user.id);
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { initDatabase } from './config/database.js';

import authRoutes from './routes/auth.js';
import artworksRoutes from './routes/artworks.js';
import artistsRoutes from './routes/artists.js';
import ordersRoutes from './routes/orders.js';
import favoritesRoutes from './routes/favorites.js';
import messagesRoutes from './routes/messages.js';
import customRequestsRoutes from './routes/customRequests.js';
import reviewsRoutes from './routes/reviews.js';
import notificationsRoutes from './routes/notifications.js';
import paymentsRoutes from './routes/payments.js';
import categoriesRoutes from './routes/categories.js';
import usersRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworksRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/custom-requests', customRequestsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Initialize DB and start server
async function start() {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`🎨 ARTVRKZ server running on port ${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

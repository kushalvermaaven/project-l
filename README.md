# ARTVRKZ

### Discover art. Connect with artists. Make it yours.

A modern, full-stack digital art marketplace connecting independent artists with art lovers.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Tech Stack](https://img.shields.io/badge/Express-4-green) ![Tech Stack](https://img.shields.io/badge/SQLite-3-orange) ![Tech Stack](https://img.shields.io/badge/Tailwind-3.4-cyan)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **npm** 9+ installed

### Installation

```bash
# 1. Install server dependencies
cd server
npm install

# 2. Install client dependencies
cd ../client
npm install

# 3. Seed the database with sample data
cd ../server
node seed.js

# 4. Start the backend server (port 5000)
node index.js

# 5. In a NEW terminal, start the frontend (port 5173)
cd client
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 🔐 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@artvrkz.com | admin123 |
| **Artist** | priya@artvrkz.com | artist123 |
| **Artist** | arjun@artvrkz.com | artist123 |
| **Buyer** | rahul@example.com | buyer123 |
| **Buyer** | sneha@example.com | buyer123 |

---

## 🏗 Architecture

```
artvrkz/
├── client/          # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/   # 30+ reusable components
│   │   ├── pages/        # 31 full pages
│   │   ├── contexts/     # Auth, Toast, Notifications, Favorites
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API client
│   │   └── data/         # Sample data fallback
│   └── ...config files
│
├── server/          # Express.js + SQLite backend
│   ├── config/      # Database setup
│   ├── middleware/   # Auth (JWT) + Upload (Multer)
│   ├── routes/      # 14 API route modules
│   ├── services/    # Payment abstraction
│   └── seed.js      # Database seeder
│
└── package.json     # Root scripts
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, Tailwind CSS 3.4 |
| Routing | React Router v6 |
| State | React Context + useReducer |
| Icons | Lucide React |
| Charts | Recharts |
| Backend | Express.js 4 |
| Database | SQLite (better-sqlite3) |
| Auth | JWT + bcrypt |
| Uploads | Multer |

---

## 📄 Pages

### Public (9 pages)
- **Home** — Hero, featured artwork, categories, artists, how it works
- **Explore** — Marketplace with search, filters, sort
- **Artwork Detail** — Full artwork view with buy/contact/customize
- **Artist Profile** — Portfolio, bio, reviews, follow
- **Custom Art** — Request personalized artwork
- **About** — Mission, vision, story
- **Services** — Platform offerings
- **Pricing** — Commission model explained
- **Contact** — Contact form with FAQ

### Auth (3 pages)
- **Login** — Email/password + Google UI
- **Sign Up** — Role selection + multi-step form
- **Forgot Password** — Email reset flow

### Buyer Dashboard (5 pages)
- **Dashboard** — Recommendations, recent orders, stats
- **Favorites** — Saved artwork
- **Orders** — Order history with status tracking
- **Messages** — Direct chat with artists
- **Custom Requests** — Track custom art requests

### Artist Dashboard (7 pages)
- **Dashboard** — Sales stats, revenue chart, activity
- **My Artworks** — Manage portfolio
- **Add Artwork** — Upload and publish
- **Orders** — Manage received orders
- **Messages** — Chat with buyers
- **Custom Requests** — Handle custom requests
- **Earnings** — Revenue analytics, commission breakdown

### Admin Dashboard (5 pages)
- **Dashboard** — Platform metrics, charts
- **Manage Users** — User administration
- **Manage Artworks** — Content moderation
- **Manage Orders** — Order oversight
- **Reports** — Revenue and analytics reports

### Shared (2 pages)
- **Profile Settings** — Edit profile, change password
- **404 Not Found** — Custom error page

---

## 🎨 Design System

- **Theme:** Dark/charcoal with neon accents
- **Primary:** Electric purple (#7c3aed → #a855f7)
- **Accent:** Neon cyan (#06b6d4 → #22d3ee)
- **Effects:** Glassmorphism, gradient text, neon glows
- **Typography:** Space Grotesk (headings) + Inter (body)
- **Animations:** Subtle float, fade-in, slide-up, hover zoom

---

## 💰 Business Model

Artvrkz operates on a **marketplace commission model**:
- **10–15% commission** on successful sales
- No subscription fees
- No listing fees
- Artists receive **85–90%** of each sale

---

## 📝 License

This project is proprietary. All rights reserved.

---

Built with ❤️ by Artvrkz

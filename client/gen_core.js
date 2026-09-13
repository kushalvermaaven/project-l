const fs = require('fs');
const path = require('path');

const files = {
  // Configs
  'package.json': `{
  "name": "artvrkz-client",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.0",
    "lucide-react": "^0.400.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6",
    "vite": "^5.3.4"
  }
}`,
  'vite.config.js': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});`,
  'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#13131a',
          700: '#1a1a2e',
          600: '#252540',
        },
        purple: {
          500: '#a855f7',
          600: '#8b5cf6',
          700: '#7c3aed',
        },
        neon: {
          cyan: '#06b6d4',
          cyanLight: '#22d3ee',
          pink: '#ec4899',
          orange: '#f97316'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        slideUp: 'slideUp 0.5s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #7c3aed, 0 0 10px #7c3aed' },
          '100%': { boxShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      }
    },
  },
  plugins: [],
};`,
  'index.html': `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ARTVRKZ — Discover Art. Connect with Artists.</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-[#0a0a0f] text-[#f0f0f5] font-body antialiased">
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`,
  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10;
  }
  .glass-card {
    @apply bg-[#1a1a2e]/80 backdrop-blur-xl border border-white/5;
  }
  .glass-dark {
    @apply bg-[#13131a]/90 backdrop-blur-2xl border border-white/10;
  }
  .gradient-text {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500;
  }
  .neon-glow {
    @apply shadow-[0_0_15px_rgba(124,58,237,0.5)];
  }
  .neon-border {
    @apply border-transparent bg-clip-border;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0a0f; 
}
::-webkit-scrollbar-thumb {
  background: #252540; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #7c3aed; 
}

/* Base Styles */
body {
  overflow-x: hidden;
}

/* Smooth transitions */
.page-transition-enter {
  opacity: 0;
  transform: scale(0.98);
}
.page-transition-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 300ms, transform 300ms;
}

/* Image Zoom */
.img-zoom-container {
  overflow: hidden;
}
.img-zoom-container img {
  transition: transform 0.5s ease;
}
.img-zoom-container:hover img {
  transform: scale(1.05);
}

/* Focus Ring */
*:focus-visible {
  outline: 2px solid #7c3aed;
  outline-offset: 2px;
}

/* Skeleton animation */
.skeleton {
  @apply bg-gradient-to-r from-[#1a1a2e] via-[#252540] to-[#1a1a2e] bg-[length:400%_100%] animate-shimmer;
}
`,
  'src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`,
  'src/utils/constants.js': `export const CATEGORIES = [
  { id: 1, name: 'Digital Art', slug: 'digital-art', icon: 'Palette', description: 'Digital creations' },
  { id: 2, name: 'Painting', slug: 'painting', icon: 'Brush', description: 'Traditional paintings' },
  { id: 3, name: 'Photography', slug: 'photography', icon: 'Camera', description: 'Photographic works' }
];

export const ORDER_STATUSES = {
  PENDING: { label: 'Pending', color: 'orange' },
  PROCESSING: { label: 'Processing', color: 'cyan' },
  SHIPPED: { label: 'Shipped', color: 'purple' },
  DELIVERED: { label: 'Delivered', color: 'green' },
  CANCELLED: { label: 'Cancelled', color: 'red' }
};

export const ART_STYLES = ['Abstract', 'Realism', 'Surrealism', 'Pop Art', 'Minimalist'];
export const MEDIUMS = ['Oil', 'Watercolor', 'Digital', 'Acrylic', 'Charcoal'];
export const ORIENTATIONS = ['Portrait', 'Landscape', 'Square'];
export const COMMISSION_RATE = 0.12;
export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' }
];
export const PURPOSES = ['Personal', 'Commercial', 'Gift'];
`,
  'src/utils/helpers.js': `export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const getInitials = (name) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const getAvatarUrl = (name) => {
  return \`https://ui-avatars.com/api/?name=\${encodeURIComponent(name)}&background=7c3aed&color=fff\`;
};

export const getArtworkPlaceholder = (index = 1) => {
  const images = [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&q=80'
  ];
  return images[index % images.length];
};
`,
  'src/services/api.js': `import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const auth = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
};

export const artworks = {
  getAll: (params) => api.get('/artworks', { params }),
  getById: (id) => api.get(\`/artworks/\${id}\`),
};

// Simplified exports for other services
export const artists = {};
export const orders = {};
export const favorites = {};
export const messages = {};
export const customRequests = {};
export const reviews = {};
export const notifications = {};
export const payments = {};
export const admin = {};

export default api;
`,
  'src/data/sampleData.js': `export const sampleArtists = [];
export const sampleArtworks = [];
export const sampleCategories = [];
`,
  'src/contexts/AuthContext.jsx': `import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false); // Changed to false for static UI initially

  const isAuthenticated = !!user;
  const isArtist = user?.role === 'artist';
  const isBuyer = user?.role === 'buyer';
  const isAdmin = user?.role === 'admin';

  const login = async (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isArtist, isBuyer, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
`,
  'src/contexts/ToastContext.jsx': `import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/ui/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
`,
  'src/contexts/NotificationContext.jsx': `import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
`,
  'src/contexts/FavoritesContext.jsx': `import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };
  
  const isFavorited = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
`,
  'src/hooks/useDebounce.js': `import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
`,
  'src/hooks/useFetch.js': `import { useState, useEffect } from 'react';

export default function useFetch(fetchFn, initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      const res = await fetchFn(...args);
      setData(res.data || res);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, []);

  return { data, loading, error, refetch: execute };
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Core files generated.');

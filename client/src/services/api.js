import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('artvrkz_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('artvrkz_token');
      // Optionally redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  getMe: () => api.get('/auth/me'),
};

// Artworks API
export const artworksAPI = {
  getAll: (params) => api.get('/artworks', { params }),
  getFeatured: () => api.get('/artworks/featured'),
  getById: (id) => api.get(`/artworks/${id}`),
  create: (data) => api.post('/artworks', data),
  update: (id, data) => api.put(`/artworks/${id}`, data),
  delete: (id) => api.delete(`/artworks/${id}`),
  toggleLike: (id) => api.post(`/artworks/${id}/like`),
};

// Artists API
export const artistsAPI = {
  getAll: (params) => api.get('/artists', { params }),
  getFeatured: () => api.get('/artists/featured'),
  getById: (id) => api.get(`/artists/${id}`),
  getArtworks: (id) => api.get(`/artists/${id}/artworks`),
  toggleFollow: (id) => api.post(`/artists/${id}/follow`),
  updateProfile: (data) => api.put('/artists/profile', data),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

// Favorites API
export const favoritesAPI = {
  getAll: () => api.get('/favorites'),
  toggle: (artworkId) => api.post('/favorites/toggle', { artworkId }),
  remove: (artworkId) => api.delete(`/favorites/${artworkId}`),
};

// Messages API
export const messagesAPI = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (conversationId) => api.get(`/messages/conversations/${conversationId}`),
  createConversation: (data) => api.post('/messages/conversations', data),
  sendMessage: (conversationId, data) => api.post(`/messages/conversations/${conversationId}/messages`, data),
  markRead: (conversationId) => api.put(`/messages/conversations/${conversationId}/read`),
};

// Custom Requests API
export const customRequestsAPI = {
  getAll: () => api.get('/custom-requests'),
  getById: (id) => api.get(`/custom-requests/${id}`),
  create: (data) => api.post('/custom-requests', data),
  respond: (id, data) => api.put(`/custom-requests/${id}/respond`, data),
  updateStatus: (id, status) => api.put(`/custom-requests/${id}/status`, { status }),
};

// Reviews API
export const reviewsAPI = {
  getByArtist: (artistId) => api.get(`/reviews/artist/${artistId}`),
  create: (data) => api.post('/reviews', data),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
};

// Payments API
export const paymentsAPI = {
  checkout: (data) => api.post('/payments/checkout', data),
  getAll: () => api.get('/payments'),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/password', data),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),
  getArtworks: (params) => api.get('/admin/artworks', { params }),
  featureArtwork: (id) => api.put(`/admin/artworks/${id}/feature`),
  getOrders: (params) => api.get('/admin/orders', { params }),
  getRevenue: (params) => api.get('/admin/revenue', { params }),
};

export default api;

/**
 * Format a number as Indian Rupee currency
 */
export function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format a date string to readable format
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function timeAgo(dateString) {
  if (!dateString) return '';
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'Just now';
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get initials from a name
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate a simple unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Get avatar URL from UI Avatars service
 */
export function getAvatarUrl(name, options = {}) {
  const { background = '7c3aed', color = 'fff', size = 200 } = options;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=${background}&color=${color}&size=${size}`;
}

/**
 * Get artwork placeholder image from Unsplash
 */
export function getArtworkPlaceholder(index = 0) {
  const images = [
    '1579783902614-a3fb3927b6a5',
    '1541961017774-22349e4a1262',
    '1547891654-e66ed7ebb968',
    '1549490349-8643362247b5',
    '1578926078693-4eb3d4499e43',
    '1579783928621-7a13d66a62d1',
    '1482160549825-59d1b23cb208',
    '1544967082-d9d25d867d66',
    '1558618666-fcd25c85f7aa',
    '1561839561-b13bcfe0f6b5',
    '1551913902-c92207136dcd',
    '1569172122301-bc5008bc09c5'
  ];
  const id = images[index % images.length];
  return `https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop`;
}

/**
 * Generate order ID format
 */
export function formatOrderId(id) {
  if (!id) return '#ORD-0000';
  return `#ORD-${id.slice(0, 4).toUpperCase()}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Debounce a value (for use outside hooks)
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

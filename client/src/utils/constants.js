export const CATEGORIES = [
  { id: 'digital-art', name: 'Digital Art', slug: 'digital-art', icon: 'Monitor', description: 'Digital and generative artwork' },
  { id: 'originals', name: 'Originals', slug: 'originals', icon: 'Star', description: 'Original, one-of-a-kind physical art' },
  { id: 'paintings', name: 'Paintings', slug: 'paintings', icon: 'Paintbrush', description: 'Traditional and modern painting techniques' },
  { id: 'illustrations', name: 'Illustrations', slug: 'illustrations', icon: 'PenTool', description: 'Hand-drawn and digital illustrations' },
  { id: 'photography', name: 'Photography', slug: 'photography', icon: 'Camera', description: 'Fine art and creative photography' },
  { id: 'abstract', name: 'Abstract', slug: 'abstract', icon: 'Layers', description: 'Abstract and non-representational art' },
  { id: 'portraits', name: 'Portraits', slug: 'portraits', icon: 'User', description: 'Portrait art in various styles' },
  { id: 'minimalist', name: 'Minimalist', slug: 'minimalist', icon: 'Minus', description: 'Clean, minimal artistic expressions' },
  { id: 'traditional-art', name: 'Traditional Art', slug: 'traditional-art', icon: 'Scroll', description: 'Heritage and traditional art forms' },
  { id: 'custom-art', name: 'Custom Art', slug: 'custom-art', icon: 'Sparkles', description: 'Personalized artwork made to order' },
  { id: 'posters-prints', name: 'Posters & Prints', slug: 'posters-prints', icon: 'Image', description: 'Posters, prints, and graphic art' }
];

export const ORDER_STATUSES = {
  pending: { label: 'Pending', color: 'amber', variant: 'pending' },
  confirmed: { label: 'Confirmed', color: 'blue', variant: 'confirmed' },
  in_progress: { label: 'In Progress', color: 'purple', variant: 'in_progress' },
  shipped: { label: 'Shipped', color: 'cyan', variant: 'shipped' },
  completed: { label: 'Completed', color: 'green', variant: 'completed' },
  cancelled: { label: 'Cancelled', color: 'red', variant: 'cancelled' }
};

export const ART_STYLES = [
  'Abstract', 'Realism', 'Impressionism', 'Minimalist',
  'Pop Art', 'Surrealism', 'Contemporary', 'Traditional', 'Modern',
  'Expressionism', 'Cubism', 'Street Art', 'Fantasy', 'Conceptual'
];

export const MEDIUMS = [
  'Oil Painting', 'Acrylic', 'Watercolor', 'Digital', 'Photography',
  'Mixed Media', 'Charcoal', 'Ink', 'Pencil', 'Pastel',
  'Gouache', 'Spray Paint', 'Collage', 'Printmaking', 'Sculpture'
];

export const ORIENTATIONS = [
  { value: 'landscape', label: 'Landscape' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'square', label: 'Square' }
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' }
];

export const PURPOSES = [
  'Home Décor', 'Gift', 'Office', 'Event', 'Personal Collection',
  'Commercial', 'Exhibition', 'Other'
];

export const COMMISSION_RATE = 0.12;

export const REQUEST_STATUSES = {
  pending: { label: 'Pending', color: 'amber' },
  accepted: { label: 'Accepted', color: 'green' },
  rejected: { label: 'Rejected', color: 'red' },
  in_progress: { label: 'In Progress', color: 'purple' },
  completed: { label: 'Completed', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' }
};

export const sampleCategories = [
  { id: 1, name: 'Digital Art', slug: 'digital-art', label: 'Digital Art', value: 'digital-art' },
  { id: 2, name: 'Painting', slug: 'painting', label: 'Painting', value: 'painting' },
  { id: 3, name: 'Photography', slug: 'photography', label: 'Photography', value: 'photography' },
  { id: 4, name: '3D Modeling', slug: '3d-modeling', label: '3D Modeling', value: '3d-modeling' },
  { id: 5, name: 'AI Art', slug: 'ai-art', label: 'AI Art', value: 'ai-art' },
  { id: 6, name: 'Illustration', slug: 'illustration', label: 'Illustration', value: 'illustration' },
  { id: 7, name: 'Vector Art', slug: 'vector-art', label: 'Vector Art', value: 'vector-art' },
  { id: 8, name: 'Pixel Art', slug: 'pixel-art', label: 'Pixel Art', value: 'pixel-art' },
  { id: 9, name: 'Mixed Media', slug: 'mixed-media', label: 'Mixed Media', value: 'mixed-media' },
  { id: 10, name: 'Sculpture', slug: 'sculpture', label: 'Sculpture', value: 'sculpture' }
];

export const sampleArtists = [
  {
    id: 'a1',
    user_id: 'a1',
    name: 'Elena Rostova',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Rostova&background=7c3aed&color=fff',
    bio: 'Digital artist specializing in surreal and cyberpunk landscapes.',
    art_style: 'Cyberpunk / Surrealism',
    specialties: ['Digital Art', 'Concept Art'],
    followers_count: 12450,
    artworks_count: 87,
    rating: 4.8
  },
  {
    id: 'a2',
    user_id: 'a2',
    name: 'Marcus Chen',
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Chen&background=06b6d4&color=fff',
    bio: 'Exploring the intersection of traditional Chinese painting and modern 3D techniques.',
    art_style: 'Modern Traditional',
    specialties: ['3D Modeling', 'Mixed Media'],
    followers_count: 8320,
    artworks_count: 42,
    rating: 4.9
  },
  {
    id: 'a3',
    user_id: 'a3',
    name: 'Sarah Jenkins',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=ec4899&color=fff',
    bio: 'Watercolor and digital illustration. Bringing fantasy worlds to life.',
    art_style: 'Fantasy Illustration',
    specialties: ['Illustration', 'Painting'],
    followers_count: 21500,
    artworks_count: 156,
    rating: 4.7
  },
  {
    id: 'a4',
    user_id: 'a4',
    name: 'David Osei',
    avatar: 'https://ui-avatars.com/api/?name=David+Osei&background=f97316&color=fff',
    bio: 'Afrofuturism and vibrant portraiture.',
    art_style: 'Afrofuturism',
    specialties: ['Digital Portrait', 'Vector Art'],
    followers_count: 15800,
    artworks_count: 64,
    rating: 4.9
  },
  {
    id: 'a5',
    user_id: 'a5',
    name: 'Yuki Tanaka',
    avatar: 'https://ui-avatars.com/api/?name=Yuki+Tanaka&background=a855f7&color=fff',
    bio: 'Minimalist photography and AI-assisted compositions.',
    art_style: 'Minimalism',
    specialties: ['Photography', 'AI Art'],
    followers_count: 9400,
    artworks_count: 112,
    rating: 4.6
  },
  {
    id: 'a6',
    user_id: 'a6',
    name: 'Leo Vargas',
    avatar: 'https://ui-avatars.com/api/?name=Leo+Vargas&background=22d3ee&color=fff',
    bio: 'Pixel artist and indie game asset creator.',
    art_style: 'Pixel Art',
    specialties: ['Pixel Art', 'Game Assets'],
    followers_count: 32000,
    artworks_count: 340,
    rating: 4.8
  }
];

export const sampleArtworks = [
  {
    id: 'art1',
    title: 'Neon Nights in Neo-Tokyo',
    images: ['https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1000'],
    price: 15000,
    category: 'Digital Art',
    medium: 'Digital',
    artist_name: 'Elena Rostova',
    artist_id: 'a1',
    likes_count: 452,
    is_customizable: true,
    description: 'A vibrant depiction of a futuristic cityscape.'
  },
  {
    id: 'art2',
    title: 'Ethereal Forest',
    images: ['https://images.unsplash.com/photo-1542273917363-3b1817f69a56?q=80&w=1000'],
    price: 8500,
    category: 'Illustration',
    medium: 'Digital Painting',
    artist_name: 'Sarah Jenkins',
    artist_id: 'a3',
    likes_count: 893,
    is_customizable: false,
    description: 'A magical forest with glowing plants and mysterious creatures.'
  },
  {
    id: 'art3',
    title: 'Cyber Samurai',
    images: ['https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1000'],
    price: 22000,
    category: '3D Modeling',
    medium: '3D Render',
    artist_name: 'Marcus Chen',
    artist_id: 'a2',
    likes_count: 1205,
    is_customizable: true,
    description: 'A highly detailed 3D model of a futuristic samurai warrior.'
  },
  {
    id: 'art4',
    title: 'Abstract Harmony',
    images: ['https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000'],
    price: 5400,
    category: 'Painting',
    medium: 'Acrylic',
    artist_name: 'Elena Rostova',
    artist_id: 'a1',
    likes_count: 312,
    is_customizable: false,
    description: 'An abstract expression of balance and harmony using vibrant colors.'
  },
  {
    id: 'art5',
    title: 'Golden Hour Silhouette',
    images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000'],
    price: 12000,
    category: 'Photography',
    medium: 'Digital Photography',
    artist_name: 'Yuki Tanaka',
    artist_id: 'a5',
    likes_count: 678,
    is_customizable: true,
    description: 'A stunning silhouette captured during the golden hour.'
  },
  {
    id: 'art6',
    title: 'Afrofuturist Queen',
    images: ['https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=1000'],
    price: 18500,
    category: 'Digital Art',
    medium: 'Vector Illustration',
    artist_name: 'David Osei',
    artist_id: 'a4',
    likes_count: 945,
    is_customizable: true,
    description: 'A striking portrait blending traditional African motifs with sci-fi elements.'
  },
  {
    id: 'art7',
    title: 'Retro Arcade',
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000'],
    price: 3500,
    category: 'Pixel Art',
    medium: 'Digital',
    artist_name: 'Leo Vargas',
    artist_id: 'a6',
    likes_count: 2150,
    is_customizable: true,
    description: 'A nostalgic scene of an 80s arcade, meticulously crafted in pixel art.'
  },
  {
    id: 'art8',
    title: 'Mind Machine',
    images: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000'],
    price: 9000,
    category: 'AI Art',
    medium: 'Generative',
    artist_name: 'Yuki Tanaka',
    artist_id: 'a5',
    likes_count: 420,
    is_customizable: false,
    description: 'An exploration of artificial consciousness through generative algorithms.'
  },
  {
    id: 'art9',
    title: 'Dragon\'s Peak',
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000'],
    price: 25000,
    category: 'Illustration',
    medium: 'Digital Painting',
    artist_name: 'Sarah Jenkins',
    artist_id: 'a3',
    likes_count: 1540,
    is_customizable: true,
    description: 'A breathtaking fantasy landscape featuring a majestic dragon.'
  },
  {
    id: 'art10',
    title: 'Urban Decay',
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000'],
    price: 11000,
    category: 'Photography',
    medium: 'Film Photography',
    artist_name: 'Yuki Tanaka',
    artist_id: 'a5',
    likes_count: 380,
    is_customizable: false,
    description: 'A gritty look at abandoned urban spaces.'
  },
  {
    id: 'art11',
    title: 'The Ancestors',
    images: ['https://images.unsplash.com/photo-1582561424760-0321d6cb257d?q=80&w=1000'],
    price: 45000,
    category: 'Painting',
    medium: 'Oil on Canvas',
    artist_name: 'David Osei',
    artist_id: 'a4',
    likes_count: 820,
    is_customizable: false,
    description: 'A large-scale oil painting honoring heritage and ancestry.'
  },
  {
    id: 'art12',
    title: 'Mecha-Suit Alpha',
    images: ['https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1000'],
    price: 30000,
    category: '3D Modeling',
    medium: '3D Render',
    artist_name: 'Marcus Chen',
    artist_id: 'a2',
    likes_count: 2200,
    is_customizable: true,
    description: 'A highly detailed concept model for a next-gen mech suit.'
  }
];

export const sampleOrders = [
  {
    id: 'ord1',
    artwork: sampleArtworks[0],
    artist_name: 'Elena Rostova',
    buyer_name: 'John Doe',
    amount: 15000,
    date: '2023-10-25T10:30:00Z',
    status: 'Completed'
  },
  {
    id: 'ord2',
    artwork: sampleArtworks[2],
    artist_name: 'Marcus Chen',
    buyer_name: 'Jane Smith',
    amount: 22000,
    date: '2023-10-26T14:15:00Z',
    status: 'In_Progress'
  },
  {
    id: 'ord3',
    artwork: sampleArtworks[5],
    artist_name: 'David Osei',
    buyer_name: 'Alice Johnson',
    amount: 18500,
    date: '2023-10-27T09:45:00Z',
    status: 'Pending'
  }
];

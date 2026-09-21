import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Sparkles, Filter, SlidersHorizontal, 
  Search, Palette, CheckCircle2, Shield, Heart, Zap
} from 'lucide-react';
import ArtworkGrid from '../../components/artwork/ArtworkGrid';
import { sampleArtworks, sampleCategories, sampleArtists } from '../../data/sampleData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/* ── Unique theme configs per category ── */
const categoryThemes = {
  'digital-art': {
    gradient: 'from-violet-600 via-fuchsia-500 to-pink-500',
    buttonGradient: 'from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500',
    bgAccent: 'rgba(139, 92, 246, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1920',
    tagline: 'Where Technology Meets Imagination',
    description: 'Explore stunning digital creations crafted with cutting-edge tools — from futuristic concept art to dreamlike fantasy worlds.',
    accentColor: 'text-violet-600',
    borderAccent: 'border-violet-500/30',
    badgeBg: 'bg-violet-500/10',
    pillActive: 'bg-violet-600 text-white shadow-lg shadow-violet-600/30',
    orbColor1: 'rgba(139, 92, 246, 0.35)',
    orbColor2: 'rgba(217, 70, 239, 0.25)',
  },
  'originals': {
    gradient: 'from-amber-600 via-orange-500 to-red-500',
    buttonGradient: 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
    bgAccent: 'rgba(245, 158, 11, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920',
    tagline: 'One-of-a-Kind Masterpieces',
    description: 'Own authentic, physical original works handcrafted by independent Indian artists — each piece verified unique with certificate of provenance.',
    accentColor: 'text-amber-600',
    borderAccent: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/10',
    pillActive: 'bg-amber-600 text-white shadow-lg shadow-amber-600/30',
    orbColor1: 'rgba(245, 158, 11, 0.35)',
    orbColor2: 'rgba(239, 68, 68, 0.25)',
  },
  'painting': {
    gradient: 'from-emerald-600 via-teal-500 to-cyan-500',
    buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
    bgAccent: 'rgba(16, 185, 129, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1920',
    tagline: 'Brushstrokes That Echo Emotion',
    description: 'From rich oil canvases to translucent watercolors and vibrant acrylics — timeless expressions captured by human hands.',
    accentColor: 'text-emerald-600',
    borderAccent: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10',
    pillActive: 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30',
    orbColor1: 'rgba(16, 185, 129, 0.35)',
    orbColor2: 'rgba(6, 182, 212, 0.25)',
  },
  'photography': {
    gradient: 'from-sky-600 via-blue-500 to-indigo-600',
    buttonGradient: 'from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500',
    bgAccent: 'rgba(14, 165, 233, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920',
    tagline: 'Capturing Fleeting Moments, Creating Eternal Art',
    description: 'Fine art and documentary photography from across the subcontinent. Limited edition prints on museum-grade archival paper.',
    accentColor: 'text-sky-600',
    borderAccent: 'border-sky-500/30',
    badgeBg: 'bg-sky-500/10',
    pillActive: 'bg-sky-600 text-white shadow-lg shadow-sky-600/30',
    orbColor1: 'rgba(14, 165, 233, 0.35)',
    orbColor2: 'rgba(99, 102, 241, 0.25)',
  },
  '3d-modeling': {
    gradient: 'from-rose-600 via-pink-500 to-fuchsia-500',
    buttonGradient: 'from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500',
    bgAccent: 'rgba(244, 63, 94, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1633899306328-c5e70574aaa2?q=80&w=1920',
    tagline: 'Sculpting Beyond Physical Constraints',
    description: 'Immersive 3D sculpts, sci-fi concept models, and high-fidelity CGI renderings ready for physical display or digital galleries.',
    accentColor: 'text-rose-600',
    borderAccent: 'border-rose-500/30',
    badgeBg: 'bg-rose-500/10',
    pillActive: 'bg-rose-600 text-white shadow-lg shadow-rose-600/30',
    orbColor1: 'rgba(244, 63, 94, 0.35)',
    orbColor2: 'rgba(217, 70, 239, 0.25)',
  },
  'ai-art': {
    gradient: 'from-cyan-500 via-blue-500 to-violet-600',
    buttonGradient: 'from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500',
    bgAccent: 'rgba(6, 182, 212, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920',
    tagline: 'Neural Networks Harmonizing with Human Vision',
    description: 'Generative and algorithmic explorations trained on distinct artistic datasets, curated and refined by modern prompt architects.',
    accentColor: 'text-cyan-600',
    borderAccent: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10',
    pillActive: 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30',
    orbColor1: 'rgba(6, 182, 212, 0.35)',
    orbColor2: 'rgba(124, 58, 237, 0.25)',
  },
  'illustration': {
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    buttonGradient: 'from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500',
    bgAccent: 'rgba(249, 115, 22, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920',
    tagline: 'Visual Narratives That Speak Louder Than Words',
    description: 'Hand-drawn, character, and editorial illustrations designed to evoke curiosity, whimsy, and cultural resonance.',
    accentColor: 'text-orange-600',
    borderAccent: 'border-orange-500/30',
    badgeBg: 'bg-orange-500/10',
    pillActive: 'bg-orange-600 text-white shadow-lg shadow-orange-600/30',
    orbColor1: 'rgba(249, 115, 22, 0.35)',
    orbColor2: 'rgba(234, 179, 8, 0.25)',
  },
  'vector-art': {
    gradient: 'from-lime-500 via-green-500 to-emerald-600',
    buttonGradient: 'from-lime-600 to-green-600 hover:from-lime-500 hover:to-green-500',
    bgAccent: 'rgba(132, 204, 22, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1920',
    tagline: 'Infinite Scalability, Pure Geometric Harmony',
    description: 'Crisp mathematical curves, vibrant flat illustrations, and striking minimalism engineered for high-impact aesthetics.',
    accentColor: 'text-lime-600',
    borderAccent: 'border-lime-500/30',
    badgeBg: 'bg-lime-500/10',
    pillActive: 'bg-lime-600 text-white shadow-lg shadow-lime-600/30',
    orbColor1: 'rgba(132, 204, 22, 0.35)',
    orbColor2: 'rgba(16, 185, 129, 0.25)',
  },
  'pixel-art': {
    gradient: 'from-fuchsia-500 via-purple-500 to-indigo-600',
    buttonGradient: 'from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500',
    bgAccent: 'rgba(217, 70, 239, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920',
    tagline: '8-Bit Nostalgia Reimagined for Contemporary Spaces',
    description: 'Meticulous dot-by-dot craftsmanship evoking retro arcade golden ages infused with modern Indian cultural elements.',
    accentColor: 'text-fuchsia-600',
    borderAccent: 'border-fuchsia-500/30',
    badgeBg: 'bg-fuchsia-500/10',
    pillActive: 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30',
    orbColor1: 'rgba(217, 70, 239, 0.35)',
    orbColor2: 'rgba(99, 102, 241, 0.25)',
  },
  'mixed-media': {
    gradient: 'from-teal-500 via-emerald-500 to-green-600',
    buttonGradient: 'from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500',
    bgAccent: 'rgba(20, 184, 166, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1920',
    tagline: 'Texture, Dimensionality & Freeform Fusion',
    description: 'Tactile combinations of acrylic, textiles, collage, gold leaf, and structural elements breaking conventional canvas boundaries.',
    accentColor: 'text-teal-600',
    borderAccent: 'border-teal-500/30',
    badgeBg: 'bg-teal-500/10',
    pillActive: 'bg-teal-600 text-white shadow-lg shadow-teal-600/30',
    orbColor1: 'rgba(20, 184, 166, 0.35)',
    orbColor2: 'rgba(16, 185, 129, 0.25)',
  },
  'sculpture': {
    gradient: 'from-stone-500 via-zinc-600 to-slate-700',
    buttonGradient: 'from-stone-600 to-zinc-700 hover:from-stone-500 hover:to-zinc-600',
    bgAccent: 'rgba(120, 113, 108, 0.15)',
    heroImage: 'https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=1920',
    tagline: 'Tangible Form, Shadow & Spatial Expression',
    description: 'Physical spatial sculptures molded from bronze, terracotta, recycled metal, and polished stone by acclaimed sculptors.',
    accentColor: 'text-stone-700',
    borderAccent: 'border-stone-500/30',
    badgeBg: 'bg-stone-500/10',
    pillActive: 'bg-stone-700 text-white shadow-lg shadow-stone-700/30',
    orbColor1: 'rgba(120, 113, 108, 0.35)',
    orbColor2: 'rgba(71, 85, 105, 0.25)',
  },
};

const defaultTheme = {
  gradient: 'from-purple-600 to-cyan-500',
  buttonGradient: 'from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500',
  bgAccent: 'rgba(124, 58, 237, 0.15)',
  heroImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920',
  tagline: 'Explore Handcrafted Art',
  description: 'Discover amazing artworks from independent creators across diverse mediums.',
  accentColor: 'text-purple-600',
  borderAccent: 'border-purple-500/30',
  badgeBg: 'bg-purple-500/10',
  pillActive: 'bg-purple-600 text-white shadow-lg shadow-purple-600/30',
  orbColor1: 'rgba(124, 58, 237, 0.35)',
  orbColor2: 'rgba(6, 182, 212, 0.25)',
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyCustomizable, setOnlyCustomizable] = useState(false);
  const [priceFilter, setPriceFilter] = useState('all');

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const category = sampleCategories.find(c => c.slug === slug);
  const theme = categoryThemes[slug] || defaultTheme;

  // Base category artworks
  const rawCategoryArtworks = useMemo(() => {
    if (!category) return [];
    const catName = category.name.toLowerCase();
    return sampleArtworks.filter(a => (a.category || '').toLowerCase() === catName);
  }, [category]);

  // Filtered & sorted artworks
  const displayedArtworks = useMemo(() => {
    let list = [...rawCategoryArtworks];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a => 
        (a.title || '').toLowerCase().includes(q) || 
        (a.artist_name || '').toLowerCase().includes(q) ||
        (a.medium || '').toLowerCase().includes(q)
      );
    }

    if (onlyCustomizable) {
      list = list.filter(a => a.is_customizable || a.customizable);
    }

    if (priceFilter === 'under15k') {
      list = list.filter(a => a.price < 15000);
    } else if (priceFilter === '15k-30k') {
      list = list.filter(a => a.price >= 15000 && a.price <= 30000);
    } else if (priceFilter === 'above30k') {
      list = list.filter(a => a.price > 30000);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
    }

    return list;
  }, [rawCategoryArtworks, searchQuery, onlyCustomizable, priceFilter, sortBy]);

  // Find unique artists in this category
  const categoryArtists = useMemo(() => {
    const artistIds = new Set(rawCategoryArtworks.map(a => a.artist_id));
    return sampleArtists.filter(art => artistIds.has(art.id)).slice(0, 3);
  }, [rawCategoryArtworks]);

  if (!category) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-32 px-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600">
            <Palette className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-3">Category Not Found</h1>
          <p className="text-[var(--text-muted)] mb-6">The art category you are looking for does not exist or has been moved.</p>
          <Link to="/">
            <button className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors">
              Return to Gallery
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      
      {/* ── HERO BANNER ── */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        {/* Background Image Hero with Cinematic Parallax Blend */}
        <div className="absolute inset-0 z-0">
          <img
            src={theme.heroImage}
            alt={category.name}
            className="w-full h-full object-cover scale-105 filter brightness-90 transform motion-safe:hover:scale-100 transition-transform duration-1000"
          />
          {/* Multi-layer ambient gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-20 mix-blend-overlay`} />
        </div>

        {/* Ambient Glowing Orbs */}
        <div 
          className="absolute top-10 left-[15%] w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40 animate-glow-pulse"
          style={{ background: theme.orbColor1 }}
        />
        <div 
          className="absolute bottom-10 right-[15%] w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30 animate-glow-pulse"
          style={{ background: theme.orbColor2, animationDelay: '1.5s' }}
        />

        <div className="max-w-7xl mx-auto relative z-10 reveal">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-8">
            <Link to="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/explore" className="hover:text-[var(--text-primary)] transition-colors">Browse</Link>
            <span>/</span>
            <span className={theme.accentColor}>{category.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              {/* Category Pill Tag */}
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.badgeBg} ${theme.borderAccent} border text-sm font-semibold ${theme.accentColor} mb-6 backdrop-blur-md`}>
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>Verified Art Category</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Dynamic Theme Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 leading-tight tracking-tight">
                {theme.tagline.split(' ').slice(0, -1).join(' ')}{' '}
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient}`}>
                  {theme.tagline.split(' ').slice(-1)[0]}
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl font-light">
                {theme.description}
              </p>
            </div>

            {/* Metric / Stat Highlight Card */}
            <div className={`glass border ${theme.borderAccent} rounded-3xl p-6 md:p-8 flex flex-row lg:flex-col items-center justify-around gap-6 backdrop-blur-xl shadow-2xl`}>
              <div className="text-center">
                <div className={`text-4xl md:text-5xl font-heading font-black ${theme.accentColor}`}>
                  {rawCategoryArtworks.length}
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)] mt-1">
                  Curated Pieces
                </div>
              </div>
              <div className="h-10 w-[1px] lg:w-full lg:h-[1px] bg-[var(--border-subtle)]" />
              <div className="text-center">
                <div className="text-xl md:text-2xl font-heading font-bold text-[var(--text-primary)] flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 100%
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)] mt-1">
                  Authenticated
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Category Horizon Accent Border */}
        <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient} opacity-80`} />
      </section>

      {/* ── INTERACTIVE FILTER & SEARCH BAR ── */}
      <section className="py-6 px-6 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60 backdrop-blur-lg sticky top-16 z-30 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search inside category */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder={`Search in ${category.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-[var(--border-subtle)] focus:border-purple-500 focus:outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            
            {/* Price Filter dropdown */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl glass border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under15k">Under ₹15,000</option>
              <option value="15k-30k">₹15,000 - ₹30,000</option>
              <option value="above30k">Above ₹30,000</option>
            </select>

            {/* Customizable toggle */}
            <button
              onClick={() => setOnlyCustomizable(!onlyCustomizable)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                onlyCustomizable
                  ? theme.pillActive
                  : 'glass border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Customizable Only
            </button>

            {/* Sort order selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 rounded-xl glass border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="popular">Sort: Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

          </div>
        </div>
      </section>

      {/* ── ARTWORK DISPLAY GRID ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-heading font-bold flex items-center gap-2">
              <span>Collection Pieces</span>
              <span className={`text-xs px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.accentColor} font-mono`}>
                {displayedArtworks.length}
              </span>
            </h2>
            
            {(searchQuery || onlyCustomizable || priceFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setOnlyCustomizable(false);
                  setPriceFilter('all');
                }}
                className="text-xs font-semibold text-purple-600 hover:underline"
              >
                Reset all filters
              </button>
            )}
          </div>

          {displayedArtworks.length > 0 ? (
            <ArtworkGrid artworks={displayedArtworks} />
          ) : (
            <div className="text-center py-20 glass rounded-3xl border border-[var(--border-subtle)] p-12">
              <div className={`w-16 h-16 mx-auto rounded-2xl ${theme.badgeBg} flex items-center justify-center mb-4`}>
                <Filter className={`w-7 h-7 ${theme.accentColor}`} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">No artworks match your filters</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6 max-w-sm mx-auto">
                Try loosening your search terms or price range to see more artworks in this category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setOnlyCustomizable(false);
                  setPriceFilter('all');
                }}
                className={`px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r ${theme.buttonGradient}`}
              >
                Show All {category.name} Art
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED ARTISTS IN THIS CATEGORY ── */}
      {categoryArtists.length > 0 && (
        <section className="py-16 px-6 bg-[var(--bg-secondary)]/40 border-t border-[var(--border-subtle)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className={`text-xs uppercase font-bold tracking-widest ${theme.accentColor} mb-2`}>
                  Featured Creators
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold">
                  Top Artists in <span className={theme.accentColor}>{category.name}</span>
                </h3>
              </div>
              <Link to="/artists" className="text-sm font-semibold text-purple-600 hover:underline flex items-center gap-1">
                View All Platform Artists <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryArtists.map(artist => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  className="glass border border-[var(--border-subtle)] rounded-2xl p-6 hover:border-purple-500/30 transition-all card-hover flex items-center gap-4 group"
                >
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-[var(--border-subtle)] group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-base text-[var(--text-primary)] group-hover:text-purple-600 transition-colors">
                      {artist.name}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1 mb-2">
                      {artist.art_style}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
                      <span>{artist.artworks_count} works</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── COMMISSION CUSTOM ARTWORK PROMO BANNER ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`relative rounded-3xl p-10 md:p-14 overflow-hidden border ${theme.borderAccent} glass shadow-2xl`}>
            
            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-10 pointer-events-none`} />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.badgeBg} text-xs font-bold ${theme.accentColor} mb-4`}>
                  <Zap className="w-3.5 h-3.5" /> Direct Artist Commission
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-extrabold mb-3 leading-tight">
                  Want custom <span className={theme.accentColor}>{category.name}</span> created for you?
                </h3>
                <p className="text-base text-[var(--text-muted)] leading-relaxed">
                  Collaborate directly with our verified Indian artists to craft a personalized piece matching your dimensions, theme, and aesthetic.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link to={`/custom-art?category=${slug}`}>
                  <button className={`px-8 py-4 rounded-2xl font-bold text-white relative overflow-hidden group shadow-xl transition-all hover:scale-105 bg-gradient-to-r ${theme.buttonGradient}`}>
                    <span className="relative flex items-center gap-2">
                      Request Custom {category.name}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BROWSE OTHER CATEGORIES NAVIGATION ── */}
      <section className="py-16 px-6 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold mb-2">Explore More Collections</h3>
            <p className="text-sm text-[var(--text-muted)]">Navigate directly to other artistic disciplines</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {sampleCategories
              .filter(c => c.slug !== slug)
              .map(cat => {
                const catTheme = categoryThemes[cat.slug] || defaultTheme;
                return (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className={`px-5 py-2.5 rounded-2xl ${catTheme.badgeBg} border ${catTheme.borderAccent} ${catTheme.accentColor} text-xs font-bold tracking-wide hover:scale-105 transition-all duration-300 shadow-sm`}
                  >
                    {cat.name} →
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CategoryPage;

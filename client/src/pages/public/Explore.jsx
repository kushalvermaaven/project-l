import React, { useState } from 'react';
import ArtworkFilters from '../../components/artwork/ArtworkFilters';
import ArtworkGrid from '../../components/artwork/ArtworkGrid';
import { sampleArtworks } from '../../data/sampleData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { FloatingDoodles, ParallaxSection } from '../../components/ui/DoodleAnimations';

const defaultFilters = {
  search: '',
  category: '',
  medium: '',
  style: '',
  orientation: '',
  minPrice: '',
  maxPrice: '',
  isCustomizable: false,
  sort: '',
};

const Explore = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [filteredArtworks, setFilteredArtworks] = useState(sampleArtworks);
  useScrollReveal();

  const applyFilters = (newFilters) => {
    let result = [...sampleArtworks];

    if (newFilters.search) {
      const q = newFilters.search.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        (a.artist_name || '').toLowerCase().includes(q)
      );
    }

    if (newFilters.category && newFilters.category !== 'All') {
      result = result.filter(a => a.category === newFilters.category);
    }

    if (newFilters.medium) {
      result = result.filter(a => a.medium === newFilters.medium);
    }

    if (newFilters.minPrice !== '') {
      result = result.filter(a => a.price >= Number(newFilters.minPrice));
    }

    if (newFilters.maxPrice !== '') {
      result = result.filter(a => a.price <= Number(newFilters.maxPrice));
    }

    if (newFilters.isCustomizable) {
      result = result.filter(a => a.is_customizable || a.customizable);
    }

    if (newFilters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (newFilters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (newFilters.sort === 'popular') result.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));

    setFilteredArtworks(result);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setFilteredArtworks(sampleArtworks);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5]">
      <FloatingDoodles />
      {/* Hero header */}
      <div className="relative py-28 px-6 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <ParallaxSection speed={0.5} className="max-w-7xl mx-auto relative z-10 reveal">
          <div className="section-label mb-5">Marketplace</div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-3">
            Explore <span className="gradient-text">Art</span>
          </h1>
          <p className="text-[#a0a0b8] text-lg">
            Showing <span className="text-white font-semibold">{filteredArtworks.length}</span> artworks
          </p>
        </ParallaxSection>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 reveal-left">
            <div className="sticky top-24">
              <ArtworkFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 reveal">
            {filteredArtworks.length > 0 ? (
              <ArtworkGrid artworks={filteredArtworks} />
            ) : (
              <div className="text-center py-28 rounded-3xl glass border border-white/8 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl glass-strong border border-white/10 flex items-center justify-center text-3xl">🎨</div>
                <p className="text-[#a0a0b8] text-lg font-medium">No artworks found matching your criteria.</p>
                <button onClick={handleReset} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all btn-magnetic">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

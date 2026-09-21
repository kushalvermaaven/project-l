import React, { useState, useContext } from 'react';
import { Heart, Search } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ArtworkGrid from '../../components/artwork/ArtworkGrid';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { sampleArtworks } from '../../data/sampleData';

const categories = ['All', 'Illustration', 'Paintings', 'Photography', '3D Modeling'];

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext) || { favorites: [] };
  const [activeTab, setActiveTab] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  // For demo, if context has no favorites, use slice of sampleArtworks
  const displayArtworks = favorites.length > 0 
    ? sampleArtworks.filter(a => favorites.includes(a.id))
    : sampleArtworks.slice(0, 4);

  const filteredArtworks = displayArtworks
    .filter(art => activeTab === 'All' || art.category === activeTab)
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0; // fallback for 'recent' if no date provided
    });

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-[var(--text-primary)] flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-500" />
              My Favorites
              <span className="text-sm px-3 py-1 bg-white/10 rounded-full text-[var(--text-muted)] font-normal font-sans">
                {displayArtworks.length}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[var(--bg-secondary)] border border-white/10 rounded-xl px-4 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
            >
              <option value="recent">Recently Added</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {displayArtworks.length > 0 ? (
          <>
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-white/10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${
                    activeTab === cat 
                      ? 'border-purple-500 text-purple-400' 
                      : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredArtworks.length > 0 ? (
              <ArtworkGrid artworks={filteredArtworks} />
            ) : (
              <div className="py-20 text-center">
                <p className="text-[var(--text-muted)]">No favorites found in this category.</p>
              </div>
            )}
          </>
        ) : (
          <EmptyState 
            icon={<Heart className="w-12 h-12 text-[#6b6b80]" />}
            title="No favorites yet"
            description="Start exploring and save artwork you love to build your collection."
            action={
              <Link to="/explore">
                <Button variant="primary" className="mt-4">Explore Artworks</Button>
              </Link>
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
}

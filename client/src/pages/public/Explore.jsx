import React, { useState } from 'react';
import ArtworkFilters from '../../components/artwork/ArtworkFilters';
import ArtworkGrid from '../../components/artwork/ArtworkGrid';
import { sampleArtworks } from '../../data/sampleData';

const Explore = () => {
  const [filteredArtworks, setFilteredArtworks] = useState(sampleArtworks);

  const handleFilterChange = (filters) => {
    // Basic filter simulation
    let result = [...sampleArtworks];
    
    if (filters.search) {
      result = result.filter(a => a.title.toLowerCase().includes(filters.search.toLowerCase()) || a.artist.name.toLowerCase().includes(filters.search.toLowerCase()));
    }
    
    if (filters.category && filters.category !== 'All') {
      result = result.filter(a => a.category === filters.category);
    }

    if (filters.sort) {
      if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
      if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    }

    setFilteredArtworks(result);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Explore Art</h1>
          <p className="text-[#a0a0b8]">Showing {filteredArtworks.length} artworks</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ArtworkFilters onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1">
            {filteredArtworks.length > 0 ? (
              <ArtworkGrid artworks={filteredArtworks} />
            ) : (
              <div className="text-center py-24 bg-[#13131a] rounded-2xl border border-white/5">
                <p className="text-[#a0a0b8] text-lg">No artworks found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

import React from 'react';
import ArtworkCard from './ArtworkCard';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { ImageOff } from 'lucide-react';

const ArtworkGrid = ({ artworks = [], loading = false, emptyMessage = "No artworks found", emptyIcon = ImageOff, columns }) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} variant="artworkCard" />
        ))}
      </div>
    );
  }

  if (!artworks || artworks.length === 0) {
    return <EmptyState icon={emptyIcon} title={emptyMessage} />;
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
      {artworks.map((artwork, index) => (
        <div key={artwork.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${index * 50}ms` }}>
          <ArtworkCard artwork={artwork} />
        </div>
      ))}
    </div>
  );
};

export default ArtworkGrid;

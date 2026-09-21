import React from 'react';
import ArtworkCard from './ArtworkCard';
import Skeleton from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { ImageOff } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.div 
          key={artwork.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
          whileHover={{ y: -5 }}
        >
          <ArtworkCard artwork={artwork} />
        </motion.div>
      ))}
    </div>
  );
};

export default ArtworkGrid;

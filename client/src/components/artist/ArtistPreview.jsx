import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Rating from '../ui/Rating';
import Button from '../ui/Button';

const ArtistPreview = ({ artist }) => {
  if (!artist) return null;

  return (
    <Card variant="glass" className="flex items-center gap-4 p-4">
      <Link to={`/artist/${artist.id || artist.user_id}`} className="flex-shrink-0">
        <img 
          src={artist.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=7c3aed&color=fff`} 
          alt={artist.name} 
          className="w-12 h-12 rounded-full object-cover border border-purple-500/30"
        />
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link to={`/artist/${artist.id || artist.user_id}`}>
          <h4 className="font-heading font-semibold text-[#f0f0f5] truncate hover:text-purple-400 transition-colors">
            {artist.name}
          </h4>
        </Link>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm text-purple-400 truncate">{artist.art_style}</span>
          <span className="text-[#6b6b80] text-xs">•</span>
          <Rating value={artist.rating || 5} size="sm" readonly showValue />
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <Link to={`/artist/${artist.id || artist.user_id}`}>
          <Button variant="outline" size="sm">View Profile</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ArtistPreview;

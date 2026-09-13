import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ArtistCard = ({ artist }) => {
  if (!artist) return null;

  return (
    <Card variant="glass" className="flex flex-col items-center p-6 group">
      <div className="w-20 h-20 rounded-full border-2 border-purple-500/50 mx-auto overflow-hidden group-hover:border-purple-400 transition-colors">
        <img 
          src={artist.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=7c3aed&color=fff`} 
          alt={artist.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="text-lg font-heading font-bold text-[#f0f0f5] text-center mt-3 truncate w-full">
        {artist.name}
      </h3>
      <p className="text-sm text-purple-400 text-center truncate w-full">
        {artist.art_style}
      </p>
      
      <p className="text-sm text-[#a0a0b8] text-center mt-2 line-clamp-2 min-h-[40px]">
        {artist.bio}
      </p>
      
      <div className="flex justify-center gap-6 mt-4 w-full">
        <div className="text-center">
          <p className="font-bold text-[#f0f0f5]">{artist.artworks_count || 0}</p>
          <p className="text-xs text-[#6b6b80] uppercase tracking-wider">Artworks</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-[#f0f0f5]">{artist.followers_count || 0}</p>
          <p className="text-xs text-[#6b6b80] uppercase tracking-wider">Followers</p>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6 w-full">
        <Button variant="outline" size="sm" fullWidth>Follow</Button>
        <Link to={`/artist/${artist.user_id || artist.id}`} className="flex-1">
          <Button variant="primary" size="sm" fullWidth>Profile</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ArtistCard;

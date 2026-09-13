import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatPrice } from '../../utils/helpers';

const ArtworkCard = ({ artwork, className = '' }) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext) || { toggleFavorite: () => {}, isFavorite: () => false };
  const favorited = isFavorite(artwork?.id);

  if (!artwork) return null;

  return (
    <Card variant="glass" padding="none" className={`overflow-hidden group ${className}`}>
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={artwork.images?.[0] || artwork.image} 
          alt={artwork.title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex gap-3">
            <button 
              onClick={(e) => { e.preventDefault(); toggleFavorite(artwork.id); }}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-pink-500 text-pink-500' : ''}`} />
            </button>
            <Link to={`/artwork/${artwork.id}`} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110">
              <Eye className="w-5 h-5" />
            </Link>
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="purple" size="sm">{artwork.category}</Badge>
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="font-heading font-bold text-lg text-white drop-shadow-md">
            {formatPrice(artwork.price)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/artwork/${artwork.id}`} className="block">
          <h3 className="font-heading font-semibold text-[#f0f0f5] truncate hover:text-purple-400 transition-colors">
            {artwork.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-1">
          <Link to={`/artist/${artwork.artist_id}`} className="text-sm text-[#a0a0b8] hover:text-[#f0f0f5] transition-colors">
            {artwork.artist_name}
          </Link>
          <div className="flex items-center gap-1 text-sm text-[#6b6b80]">
            <Heart className="w-3.5 h-3.5" />
            <span>{artwork.likes_count || 0}</span>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {formatPrice(artwork.price)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ArtworkCard;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, Sparkles } from 'lucide-react';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { formatPrice } from '../../utils/helpers';

const ArtworkCard = ({ artwork, className = '' }) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext) || { toggleFavorite: () => {}, isFavorite: () => false };
  const favorited = isFavorite(artwork?.id);

  if (!artwork) return null;

  return (
    <div className={`group relative rounded-2xl overflow-hidden bg-[#13131a] border border-white/[0.07] transition-all duration-500 card-glow-hover ${className}`}>

      {/* Image container */}
      <div className="aspect-[4/3] overflow-hidden relative img-zoom-container">
        <img
          src={artwork.images?.[0] || artwork.image}
          alt={artwork.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Action buttons – slide up on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-2.5">
            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(artwork.id); }}
              className={`w-11 h-11 rounded-xl backdrop-blur-md border transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 ${
                favorited
                  ? 'bg-pink-500/20 border-pink-500/40 text-pink-400'
                  : 'bg-white/10 border-white/20 text-white hover:bg-pink-500/20 hover:border-pink-500/40 hover:text-pink-400'
              }`}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>
            <Link
              to={`/artwork/${artwork.id}`}
              className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-purple-500/20 hover:border-purple-500/40 hover:text-purple-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              title="View artwork"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              title="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md bg-purple-500/20 border border-purple-500/30 text-purple-300">
            {artwork.category}
          </span>
        </div>

        {/* Customizable badge */}
        {(artwork.is_customizable || artwork.customizable) && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-md bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Custom
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <Link to={`/artwork/${artwork.id}`} className="block group/title">
          <h3 className="font-heading font-semibold text-[#f0f0f5] truncate group-hover/title:text-purple-300 transition-colors duration-300 text-[0.95rem]">
            {artwork.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-1.5">
          <Link
            to={`/artist/${artwork.artist_id}`}
            className="text-sm text-[#6b6b80] hover:text-[#a0a0b8] transition-colors flex items-center gap-1.5 group/artist"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60 group-hover/artist:bg-purple-400 transition-colors" />
            {artwork.artist_name}
          </Link>
          <div className="flex items-center gap-1 text-xs text-[#6b6b80]">
            <Heart className="w-3 h-3" />
            <span>{artwork.likes_count || 0}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-base font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {formatPrice(artwork.price)}
          </span>
          <Link
            to={`/artwork/${artwork.id}`}
            className="text-xs text-[#6b6b80] hover:text-purple-400 transition-colors font-medium"
          >
            View →
          </Link>
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/40 transition-all duration-500" />
    </div>
  );
};

export default ArtworkCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ArtistPreview = ({ artist }) => {
  if (!artist) return null;

  return (
    <div className="glass-strong border border-white/10 rounded-2xl flex items-center gap-5 p-5 card-glow-hover transition-all">
      <Link to={`/artist/${artist.id || artist.user_id}`} className="flex-shrink-0 relative group">
        <div className="absolute inset-0 rounded-full border border-purple-500/30 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
        <img 
          src={artist.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=7c3aed&color=fff`} 
          alt={artist.name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30 group-hover:border-purple-400 transition-colors relative z-10"
        />
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link to={`/artist/${artist.id || artist.user_id}`} className="group/name block w-fit">
          <h4 className="text-xl font-heading font-bold text-[var(--text-primary)] truncate group-hover/name:text-purple-400 transition-colors">
            {artist.name}
          </h4>
        </Link>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-xs font-semibold tracking-wider uppercase text-purple-400/80 truncate">{artist.art_style}</span>
        </div>
      </div>
      
      <div className="flex-shrink-0 hidden sm:block">
        <Link to={`/artist/${artist.id || artist.user_id}`}>
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold glass border border-white/10 text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all btn-magnetic flex items-center gap-2 group">
            View Profile <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArtistPreview;

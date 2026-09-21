import React from 'react';
import { Link } from 'react-router-dom';
import { Images, Users, ArrowRight } from 'lucide-react';

const ArtistCard = ({ artist }) => {
  if (!artist) return null;

  const profileUrl = `/artist/${artist.user_id || artist.id}`;

  return (
    <div className="group relative rounded-3xl overflow-hidden glass border border-white/[0.07] hover:border-white/[0.15] transition-all duration-500 card-glow-hover p-6 flex flex-col items-center text-center">

      {/* Gradient glow behind avatar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-24 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)', filter: 'blur(20px)' }} />

      {/* Avatar */}
      <div className="relative mb-4">
        {/* Ring animation */}
        <div className="absolute inset-0 rounded-full border border-purple-500/30 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 scale-110 opacity-0 group-hover:opacity-70 group-hover:scale-150 transition-all duration-1000" style={{ transitionDelay: '100ms' }} />

        <div className="w-[88px] h-[88px] rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-500 relative"
          style={{ boxShadow: '0 0 0 4px rgba(124,58,237,0.1)' }}>
          <img
            src={artist.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=7c3aed&color=fff`}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Name + style */}
      <h3 className="text-[1.05rem] font-heading font-bold text-[var(--text-primary)] group-hover:text-white transition-colors truncate w-full">
        {artist.name}
      </h3>
      <p className="text-xs font-semibold tracking-wider uppercase text-purple-400/80 mt-0.5 mb-3">
        {artist.art_style}
      </p>

      {/* Bio */}
      <p className="text-sm text-[#7a7a90] line-clamp-2 leading-relaxed mb-5">
        {artist.bio}
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-6 w-full mb-6 pb-5 border-b border-white/[0.06]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Images className="w-3 h-3 text-purple-400/60" />
            <p className="font-heading font-bold text-[var(--text-primary)] text-sm">{artist.artworks_count || 0}</p>
          </div>
          <p className="text-[10px] text-[#6b6b80] uppercase tracking-widest">Works</p>
        </div>
        <div className="w-px bg-white/[0.07]" />
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Users className="w-3 h-3 text-cyan-400/60" />
            <p className="font-heading font-bold text-[var(--text-primary)] text-sm">
              {artist.followers_count >= 1000
                ? `${(artist.followers_count / 1000).toFixed(1)}k`
                : artist.followers_count || 0}
            </p>
          </div>
          <p className="text-[10px] text-[#6b6b80] uppercase tracking-widest">Followers</p>
        </div>
      </div>

      {/* Specialties tags */}
      {artist.specialties?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mb-5">
          {artist.specialties.slice(0, 3).map((s) => (
            <span key={s} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.05] border border-white/10 text-[var(--text-muted)]">
              {s}
            </span>
          ))}
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex gap-2.5 w-full">
        <button className="flex-1 py-2.5 rounded-xl text-sm font-medium glass border border-white/10 text-[var(--text-muted)] hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300">
          Follow
        </button>
        <Link to={profileUrl} className="flex-1">
          <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white relative overflow-hidden group/btn btn-shimmer">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 group-hover/btn:from-purple-500 group-hover/btn:to-cyan-400 transition-all duration-300" />
            <span className="relative flex items-center justify-center gap-1">
              Profile <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArtistCard;

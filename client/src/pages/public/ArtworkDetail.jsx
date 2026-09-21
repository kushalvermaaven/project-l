import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Paintbrush, Heart, MapPin } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ArtistPreview from '../../components/artist/ArtistPreview';
import ArtworkGrid from '../../components/artwork/ArtworkGrid';
import { sampleArtworks, sampleArtists } from '../../data/sampleData';
import { formatPrice } from '../../utils/helpers';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { FloatingDoodles, Mouse3DWrapper } from '../../components/ui/DoodleAnimations';

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext) || {};
  const rawArtwork = sampleArtworks.find(a => a.id === id) || sampleArtworks[0];
  const [isFavorite, setIsFavorite] = useState(false);
  useScrollReveal();

  if (!rawArtwork) {
    return <div className="min-h-screen pt-24 text-center text-white">Artwork not found</div>;
  }

  // Normalize: look up full artist object and map field names
  const artist = sampleArtists.find(a => a.id === rawArtwork.artist_id) || {
    id: rawArtwork.artist_id,
    name: rawArtwork.artist_name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(rawArtwork.artist_name || 'Unknown')}&background=7c3aed&color=fff`,
  };

  const artwork = {
    ...rawArtwork,
    image: rawArtwork.image || (rawArtwork.images && rawArtwork.images[0]),
    customizable: rawArtwork.customizable ?? rawArtwork.is_customizable,
    artist,
  };

  const moreFromArtist = sampleArtworks
    .filter(a => a.artist_id === rawArtwork.artist_id && a.id !== rawArtwork.id)
    .slice(0, 4);
  const relatedArtworks = sampleArtworks
    .filter(a => a.category === rawArtwork.category && a.id !== rawArtwork.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] py-24 px-6 relative overflow-hidden">
      <FloatingDoodles />
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Main Details */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image */}
          <div className="lg:w-[60%] reveal-left">
            <Mouse3DWrapper className="rounded-3xl overflow-hidden glass-card aspect-square relative group p-2 shadow-2xl">
              <div className="w-full h-full rounded-2xl overflow-hidden relative" style={{ transform: 'translateZ(30px)' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500" />
                <img 
                  src={artwork.image} 
                  alt={artwork.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Mouse3DWrapper>
          </div>

          {/* Info Card */}
          <div className="lg:w-[40%] reveal-right">
            <div className="glass-strong rounded-3xl p-8 sticky top-24 shadow-xl border-white/10 card-glow-hover">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 backdrop-blur-md">
                {artwork.category}
              </Badge>
              
              <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight">{artwork.title}</h1>
              
              <Link to={`/artist/${artwork.artist.id}`} className="flex items-center gap-4 mb-8 group block bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all">
                <img src={artwork.artist.avatar} alt={artwork.artist.name} className="w-14 h-14 rounded-full border-2 border-purple-500/30 group-hover:border-purple-400 transition-colors" />
                <div>
                  <h3 className="font-heading font-bold group-hover:text-purple-400 transition-colors text-lg">{artwork.artist.name}</h3>
                  <span className="text-sm text-[var(--text-muted)]">View Artist Profile</span>
                </div>
              </Link>

              <div className="text-4xl font-bold gradient-text mb-8 drop-shadow-md">
                {formatPrice(artwork.price)}
              </div>

              <div className="grid grid-cols-2 gap-y-5 text-sm mb-8 pb-8 border-b border-white/10">
                <div className="text-[var(--text-muted)] font-medium">Medium</div>
                <div className="font-medium text-right text-white">{artwork.medium || 'Oil on Canvas'}</div>
                
                <div className="text-[var(--text-muted)] font-medium">Dimensions</div>
                <div className="font-medium text-right text-white">{artwork.dimensions || '24" x 36"'}</div>
                
                <div className="text-[var(--text-muted)] font-medium">Orientation</div>
                <div className="font-medium text-right text-white">{artwork.orientation || 'Portrait'}</div>
                
                <div className="text-[var(--text-muted)] font-medium">Availability</div>
                <div className="font-medium text-right text-green-400 flex items-center justify-end gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>In Stock</div>
                
                <div className="text-[var(--text-muted)] font-medium">Customizable</div>
                <div className="font-medium text-right text-white">{artwork.customizable ? 'Yes' : 'No'}</div>
              </div>

              <div className="mb-8">
                <h4 className="font-heading font-bold mb-3 text-lg">Description</h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {artwork.description || 'A beautiful original piece created with passion and dedication. Perfect for enhancing any living space or office environment.'}
                </p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/signup?role=buyer');
                    } else {
                      navigate('/dashboard');
                      // In a real app this would go to a checkout page
                    }
                  }}
                  className="w-full py-4 rounded-2xl font-semibold text-white relative overflow-hidden group btn-shimmer btn-magnetic flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-300 group-hover:from-purple-500 group-hover:to-cyan-400" />
                  <span className="relative flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> {user ? 'Buy Artwork' : 'Sign in as Collector to Buy'}
                  </span>
                </button>
                <div className="flex gap-3">
                  <button className="flex-1 py-3.5 rounded-xl font-medium glass border border-white/10 text-white hover:bg-white/10 transition-all btn-magnetic flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Contact
                  </button>
                  <button 
                    className={`px-5 rounded-xl glass border transition-all btn-magnetic flex items-center justify-center ${isFavorite ? 'border-pink-500/40 bg-pink-500/10' : 'border-white/10 hover:bg-white/10'}`}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
                  </button>
                </div>
                {artwork.customizable && (
                  <button className="w-full py-3.5 rounded-xl font-medium glass border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all btn-magnetic flex items-center justify-center gap-2">
                    <Paintbrush className="w-5 h-5" /> Request Customization
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Artist Preview */}
        <div className="border-t border-white/10 pt-24 reveal">
          <div className="section-label mb-6">About the Artist</div>
          <ArtistPreview artist={artwork.artist} />
        </div>

        {/* More from Artist */}
        {moreFromArtist.length > 0 && (
          <div className="border-t border-white/10 pt-24 reveal">
            <h3 className="text-3xl font-heading font-bold mb-8">More from <span className="gradient-text">{artwork.artist.name}</span></h3>
            <ArtworkGrid artworks={moreFromArtist} />
          </div>
        )}

        {/* You may also like */}
        {relatedArtworks.length > 0 && (
          <div className="border-t border-white/10 pt-24 reveal">
            <h3 className="text-3xl font-heading font-bold mb-8">You may also <span className="gradient-text-warm">like</span></h3>
            <ArtworkGrid artworks={relatedArtworks} />
          </div>
        )}

      </div>
    </div>
  );
};

export default ArtworkDetail;

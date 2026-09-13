import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Paintbrush, Heart, MapPin } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Rating from '../../components/ui/Rating';
import ArtistPreview from '../../components/artist/ArtistPreview';
import ArtworkGrid from '../../components/artwork/ArtworkGrid';
import { sampleArtworks } from '../../data/sampleData';
import { formatPrice } from '../../utils/helpers';

const ArtworkDetail = () => {
  const { id } = useParams();
  const artwork = sampleArtworks.find(a => a.id === id) || sampleArtworks[0];
  const [isFavorite, setIsFavorite] = useState(false);

  if (!artwork) {
    return <div className="min-h-screen pt-24 text-center text-white">Artwork not found</div>;
  }

  const moreFromArtist = sampleArtworks.filter(a => a.artist.id === artwork.artist.id && a.id !== artwork.id).slice(0, 4);
  const relatedArtworks = sampleArtworks.filter(a => a.category === artwork.category && a.id !== artwork.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Main Details */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image */}
          <div className="lg:w-[60%]">
            <div className="rounded-2xl overflow-hidden bg-[#13131a] aspect-square relative group">
              <img 
                src={artwork.image} 
                alt={artwork.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="lg:w-[40%]">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sticky top-24">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                {artwork.category}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{artwork.title}</h1>
              
              <Link to={`/artist/${artwork.artist.id}`} className="flex items-center gap-4 mb-8 group block">
                <img src={artwork.artist.avatar} alt={artwork.artist.name} className="w-12 h-12 rounded-full border border-white/10" />
                <div>
                  <h3 className="font-medium group-hover:text-purple-400 transition-colors">{artwork.artist.name}</h3>
                  <Rating value={4.8} count={124} />
                </div>
              </Link>

              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-8">
                {formatPrice(artwork.price)}
              </div>

              <div className="grid grid-cols-2 gap-y-4 text-sm mb-8 pb-8 border-b border-white/10">
                <div className="text-[#a0a0b8]">Medium</div>
                <div className="font-medium text-right">{artwork.medium || 'Oil on Canvas'}</div>
                
                <div className="text-[#a0a0b8]">Dimensions</div>
                <div className="font-medium text-right">{artwork.dimensions || '24" x 36"'}</div>
                
                <div className="text-[#a0a0b8]">Orientation</div>
                <div className="font-medium text-right">{artwork.orientation || 'Portrait'}</div>
                
                <div className="text-[#a0a0b8]">Availability</div>
                <div className="font-medium text-right text-green-400">In Stock</div>
                
                <div className="text-[#a0a0b8]">Customizable</div>
                <div className="font-medium text-right">{artwork.customizable ? 'Yes' : 'No'}</div>
              </div>

              <div className="mb-8">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-[#a0a0b8] text-sm leading-relaxed">
                  {artwork.description || 'A beautiful original piece created with passion and dedication. Perfect for enhancing any living space or office environment.'}
                </p>
              </div>

              <div className="space-y-3">
                <Button className="w-full gap-2" size="lg">
                  <ShoppingCart className="w-5 h-5" /> Buy Artwork
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2">
                    <MessageCircle className="w-5 h-5" /> Contact
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="px-4 border border-white/10"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-pink-500 text-pink-500' : ''}`} />
                  </Button>
                </div>
                {artwork.customizable && (
                  <Button variant="secondary" className="w-full gap-2">
                    <Paintbrush className="w-5 h-5" /> Request Customization
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Artist Preview */}
        <div className="border-t border-white/10 pt-24">
          <ArtistPreview artist={artwork.artist} />
        </div>

        {/* More from Artist */}
        {moreFromArtist.length > 0 && (
          <div className="border-t border-white/10 pt-24">
            <h3 className="text-2xl font-heading font-bold mb-8">More from {artwork.artist.name}</h3>
            <ArtworkGrid artworks={moreFromArtist} />
          </div>
        )}

        {/* You may also like */}
        {relatedArtworks.length > 0 && (
          <div className="border-t border-white/10 pt-24">
            <h3 className="text-2xl font-heading font-bold mb-8">You may also like</h3>
            <ArtworkGrid artworks={relatedArtworks} />
          </div>
        )}

      </div>
    </div>
  );
};

export default ArtworkDetail;

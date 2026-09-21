import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, MessageCircle, Paintbrush, Share2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ArtworkGrid from '../../components/artwork/ArtworkGrid';
import { sampleArtists, sampleArtworks } from '../../data/sampleData';

const ArtistProfile = () => {
  const { id } = useParams();
  const artist = sampleArtists.find(a => a.id === id) || sampleArtists[0];
  const [activeTab, setActiveTab] = useState('artworks');

  const artistArtworks = sampleArtworks.filter(a => a.artist.id === artist.id);

  if (!artist) {
    return <div className="min-h-screen pt-24 text-center text-white">Artist not found</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Cover */}
      <div className="h-64 md:h-80 w-full bg-gradient-to-r from-purple-900 to-cyan-900 relative">
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Profile Header */}
        <div className="relative -mt-20 mb-12">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
            <img 
              src={artist.avatar} 
              alt={artist.name} 
              className="w-40 h-40 rounded-full border-4 border-[var(--bg-primary)] object-cover bg-[var(--bg-secondary)] relative z-10"
            />
            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-heading font-bold mb-2">{artist.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {artist.location || 'Mumbai, India'}</span>
                    <span>•</span>
                    <Badge className="bg-purple-500/20 text-purple-300">{artist.specialty || 'Contemporary'}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                  <Button variant="outline" className="gap-2">Follow</Button>
                  <Button className="gap-2"><MessageCircle className="w-4 h-4" /> Message</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 text-[#e2e2e8] leading-relaxed">
              <p>{artist.bio || 'An independent artist exploring the boundaries between abstract thought and visual reality. Every piece is a conversation.'}</p>
            </div>
            <div className="flex gap-6 md:justify-end border-t border-white/10 pt-6 md:border-0 md:pt-0">
              <div className="text-center">
                <div className="text-2xl font-bold">{artistArtworks.length}</div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Artworks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8 flex gap-8">
          <button 
            onClick={() => setActiveTab('artworks')}
            className={`pb-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'artworks' ? 'border-purple-500 text-white' : 'border-transparent text-[var(--text-muted)] hover:text-white'}`}
          >
            All Works
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`pb-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'about' ? 'border-purple-500 text-white' : 'border-transparent text-[var(--text-muted)] hover:text-white'}`}
          >
            About
          </button>
        </div>

        {/* Tab Content */}
        <div className="pb-24">
          {activeTab === 'artworks' && (
            <ArtworkGrid artworks={artistArtworks} />
          )}
          {activeTab === 'about' && (
            <div className="max-w-3xl prose prose-invert">
              <h2 className="text-2xl font-heading mb-4">About the Artist</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                I am a contemporary artist based in Mumbai, specializing in abstract and mixed media art. My journey began a decade ago, and since then, I have been exploring the intersection of emotion and color.
              </p>
              <h3 className="text-xl font-heading mb-3">Specialties</h3>
              <ul className="list-disc pl-5 text-[var(--text-muted)] mb-6 space-y-2">
                <li>Abstract Expressionism</li>
                <li>Large scale canvas works</li>
                <li>Custom portraits in contemporary style</li>
              </ul>
              <Button variant="secondary" className="gap-2">
                <Paintbrush className="w-4 h-4" /> Request Custom Art from {artist.name}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;

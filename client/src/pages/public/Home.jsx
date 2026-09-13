import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Sparkles, Search, MessageCircle, Heart, Star, ChevronDown, Camera, PenTool, Layers } from 'lucide-react';
import Button from '../../components/ui/Button';
import ArtworkGrid from '../../components/artwork/ArtworkGrid';
import ArtistCard from '../../components/artist/ArtistCard';
import { sampleArtworks, sampleArtists, sampleCategories } from '../../data/sampleData';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-12">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse mix-blend-screen"></div>
          <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700 mix-blend-screen"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000 mix-blend-screen"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium tracking-wide">The future of art discovery</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight">
            Art that feels<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              like you.
            </span>
          </h1>
          
          <p className="text-xl text-[#a0a0b8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover original artwork, connect directly with independent artists, and create something made just for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/explore">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Explore Art <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/register?role=artist">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                Sell Your Art <Palette className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">10K+ Artworks</div>
            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">2K+ Artists</div>
            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">50K+ Art Lovers</div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#a0a0b8]">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* Featured Artwork */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-sm tracking-widest text-purple-400 font-semibold mb-2 block">CURATED FOR YOU</span>
          <h2 className="text-4xl font-heading font-bold mb-4">Art worth discovering.</h2>
          <p className="text-[#a0a0b8]">Handpicked pieces from our most talented artists</p>
        </div>
        <ArtworkGrid artworks={sampleArtworks.slice(0, 8)} />
        <div className="mt-12 text-center">
          <Link to="/explore">
            <Button variant="outline" size="lg">View All Artwork</Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-6 bg-[#13131a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-sm tracking-widest text-purple-400 font-semibold mb-2 block">EXPLORE BY CATEGORY</span>
            <h2 className="text-4xl font-heading font-bold">Find art that speaks to you.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/explore?category=${category.slug}`}
                className="group relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#1a1a2e] block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 opacity-80 group-hover:opacity-100 transition-opacity z-10" />
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-500" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                  <Palette className="w-10 h-10 mb-4 opacity-80" />
                  <h3 className="text-xl font-heading font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-[#e2e2e8]/80">{category.count} artworks</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-sm tracking-widest text-purple-400 font-semibold mb-2 block">MEET THE ARTISTS</span>
            <h2 className="text-4xl font-heading font-bold">Meet the minds behind the art.</h2>
          </div>
          <Link to="/artists" className="text-cyan-400 hover:text-cyan-300 font-medium">
            See All Artists &rarr;
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {sampleArtists.map((artist) => (
            <div key={artist.id} className="min-w-[300px] snap-start">
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>
      </section>

      {/* Custom Art CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden flex flex-col lg:flex-row bg-[#13131a] border border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
          <div className="lg:w-1/2 p-12 lg:p-24 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent opacity-50" />
            <Sparkles className="w-32 h-32 text-purple-400 relative z-10 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-purple-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          </div>
          <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative z-10">
            <h2 className="text-4xl font-heading font-bold mb-6">Can't find exactly what you imagined?</h2>
            <p className="text-[#a0a0b8] mb-8 text-lg">
              Tell an artist what you want. Get a piece created just for you. From personalized gifts to dream room décor—make it real.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3"><span className="text-green-400">✓</span> Choose your style</li>
              <li className="flex items-center gap-3"><span className="text-green-400">✓</span> Set your budget</li>
              <li className="flex items-center gap-3"><span className="text-green-400">✓</span> Work directly with an artist</li>
              <li className="flex items-center gap-3"><span className="text-green-400">✓</span> Get something truly unique</li>
            </ul>
            <Link to="/custom-art">
              <Button size="lg" className="w-full sm:w-auto">Request Custom Art</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-[#13131a]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sm tracking-widest text-purple-400 font-semibold mb-2 block">HOW IT WORKS</span>
          <h2 className="text-4xl font-heading font-bold mb-16">Three steps to your perfect artwork.</h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 -translate-y-1/2 z-0" />
            
            {[
              { icon: Search, title: 'Discover', desc: 'Explore artwork from independent artists across styles, mediums, and price ranges.', num: '1' },
              { icon: MessageCircle, title: 'Connect', desc: 'Contact artists directly. Discuss your vision, requirements, and customization options.', num: '2' },
              { icon: Heart, title: 'Make It Yours', desc: 'Buy existing artwork or request something customized. Track your order and enjoy.', num: '3' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 bg-[#1a1a2e] rounded-2xl p-8 border border-white/5 flex flex-col items-center text-center">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#0a0a0f] border border-white/10 rounded-full flex items-center justify-center font-heading font-bold text-xl text-purple-400">
                  {step.num}
                </div>
                <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
                  <step.icon className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{step.title}</h3>
                <p className="text-[#a0a0b8]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl p-12 text-center bg-gradient-to-br from-purple-900/50 to-cyan-900/50 border border-white/10 backdrop-blur-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Your walls deserve something original.</h2>
            <p className="text-xl text-[#e2e2e8] mb-10 max-w-2xl mx-auto">
              Join thousands of art lovers and artists already on Artvrkz.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/explore">
                <Button size="lg" className="w-full sm:w-auto">Explore Artwork</Button>
              </Link>
              <Link to="/register?role=artist">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white/20 hover:bg-white/5">Become an Artist</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

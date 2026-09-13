import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Palette, Sparkles, Search, MessageCircle,
  Heart, ChevronDown, Zap, Star, Globe, Shield
} from 'lucide-react';
import Button from '../../components/ui/Button';
import ArtworkGrid from '../../components/artwork/ArtworkGrid';
import ArtistCard from '../../components/artist/ArtistCard';
import { sampleArtworks, sampleArtists, sampleCategories } from '../../data/sampleData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/* ── ticker content ──────────────────────────────────── */
const tickerItems = [
  '✦ Digital Art', '✦ Oil Painting', '✦ Photography',
  '✦ 3D Modeling', '✦ Illustration', '✦ Pixel Art',
  '✦ AI Generative', '✦ Mixed Media', '✦ Sculpture',
  '✦ Vector Art', '✦ Watercolour', '✦ Concept Art',
];

/* ── stat pills ──────────────────────────────────────── */
const stats = [
  { value: '10K+', label: 'Artworks', icon: Palette },
  { value: '2K+',  label: 'Artists',  icon: Star },
  { value: '50K+', label: 'Collectors', icon: Heart },
  { value: '120+', label: 'Countries', icon: Globe },
];

/* ── how it works steps ──────────────────────────────── */
const steps = [
  {
    icon: Search,
    title: 'Discover',
    desc: 'Explore artwork from independent artists across styles, mediums, and price ranges.',
    num: '01',
    color: 'from-purple-600/20 to-purple-600/5',
    accent: 'text-purple-400',
    glow: 'rgba(124,58,237,0.3)',
  },
  {
    icon: MessageCircle,
    title: 'Connect',
    desc: 'Contact artists directly. Discuss your vision, requirements, and customization options.',
    num: '02',
    color: 'from-cyan-600/20 to-cyan-600/5',
    accent: 'text-cyan-400',
    glow: 'rgba(6,182,212,0.3)',
  },
  {
    icon: Heart,
    title: 'Make It Yours',
    desc: 'Buy existing artwork or request something customized. Track your order and enjoy.',
    num: '03',
    color: 'from-pink-600/20 to-pink-600/5',
    accent: 'text-pink-400',
    glow: 'rgba(236,72,153,0.3)',
  },
];

/* ── category icon map ───────────────────────────────── */
const catIcons = [Palette, Zap, Star, Globe, Shield, Heart, Search, MessageCircle, Sparkles, Palette];

const Home = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] overflow-hidden">

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-12 overflow-hidden">

        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* Aurora orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] orb orb-purple animate-glow-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-[20%] right-[8%]  w-[420px] h-[420px] orb orb-cyan   animate-glow-pulse" style={{ animationDelay: '1.2s' }} />
          <div className="absolute bottom-[15%] left-[30%] w-[360px] h-[360px] orb orb-pink  animate-glow-pulse" style={{ animationDelay: '2.1s' }} />
          {/* Outer ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03] animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/[0.02] animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '35s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-animate border mb-10 animate-slide-up">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#c0c0d8]">
              The future of art discovery
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-bold mb-6 leading-[1.05] tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Art that feels<br />
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-x bg-[size:200%]">
                like you.
              </span>
              {/* Underline shimmer */}
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-70" />
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-[#a0a0b8] max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover original artwork, connect directly with independent artists,
            and create something made just for you.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/explore">
              <button className="relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden group btn-shimmer btn-magnetic">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-500 group-hover:from-purple-500 group-hover:to-cyan-400" />
                <span className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 bg-gradient-to-r from-purple-600 to-cyan-500 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  Explore Art <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            <Link to="/register?role=artist">
              <button className="relative px-8 py-4 rounded-2xl font-semibold text-[#f0f0f5] glass border border-white/15 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 group btn-magnetic">
                <span className="flex items-center gap-2">
                  Sell Your Art <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up stagger-children" style={{ animationDelay: '0.4s' }}>
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 px-5 py-3 rounded-2xl glass border border-white/8 hover:border-purple-500/30 transition-all duration-300 group card-hover">
                <Icon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="font-heading font-bold text-white">{value}</span>
                <span className="text-sm text-[#a0a0b8]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6b6b80]">
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-purple-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════════ */}
      <div className="py-5 border-y border-white/[0.06] bg-[#13131a]/50 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker-tag mx-3">{item}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          FEATURED ARTWORK
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center reveal">
            <div className="section-label mb-4 justify-center">Curated for You</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Art worth <span className="gradient-text">discovering.</span>
            </h2>
            <p className="text-[#a0a0b8] text-lg max-w-xl mx-auto">
              Handpicked pieces from our most talented artists
            </p>
          </div>
          <div className="reveal">
            <ArtworkGrid artworks={sampleArtworks.slice(0, 8)} />
          </div>
          <div className="mt-12 text-center reveal">
            <Link to="/explore">
              <button className="px-8 py-3.5 rounded-2xl font-semibold glass border border-white/12 hover:border-purple-500/40 text-[#f0f0f5] hover:text-white transition-all duration-300 btn-magnetic group">
                View All Artwork <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-14 text-center reveal">
            <div className="section-label mb-4 justify-center">Explore by Category</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Find art that <span className="gradient-text">speaks to you.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {sampleCategories.slice(0, 9).map((category, idx) => {
              const Icon = catIcons[idx % catIcons.length];
              const colors = [
                'from-purple-600/30 to-purple-900/10',
                'from-cyan-600/30 to-cyan-900/10',
                'from-pink-600/30 to-pink-900/10',
                'from-orange-600/30 to-orange-900/10',
                'from-green-600/30 to-green-900/10',
                'from-blue-600/30 to-blue-900/10',
                'from-yellow-600/30 to-yellow-900/10',
                'from-red-600/30 to-red-900/10',
                'from-indigo-600/30 to-indigo-900/10',
              ];
              const iconColors = [
                'text-purple-400', 'text-cyan-400', 'text-pink-400',
                'text-orange-400', 'text-green-400', 'text-blue-400',
                'text-yellow-400', 'text-red-400', 'text-indigo-400',
              ];
              return (
                <Link
                  key={category.id}
                  to={`/explore?category=${category.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-3xl glass border border-white/8 hover:border-white/20 card-glow-hover"
                >
                  {/* Gradient fill */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[idx % colors.length]} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                  {/* Shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer-overlay" />

                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
                    <div className={`w-16 h-16 rounded-2xl glass-strong flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ${iconColors[idx % iconColors.length]}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-white transition-colors">{category.name}</h3>
                    <p className="text-sm text-[#a0a0b8] group-hover:text-[#c0c0d8] transition-colors">Browse collection →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED ARTISTS
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-14 gap-4 reveal">
            <div>
              <div className="section-label mb-4">Meet the Artists</div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold">
                Minds behind <span className="gradient-text">the art.</span>
              </h2>
            </div>
            <Link to="/artists" className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-1.5 group transition-colors">
              See All Artists
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory hide-scrollbar reveal">
            {sampleArtists.map((artist) => (
              <div key={artist.id} className="min-w-[300px] snap-start">
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CUSTOM ART CTA
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden gradient-border">
            {/* Aurora background */}
            <div className="absolute inset-0 aurora-bg opacity-60" />
            <div className="absolute inset-0 bg-[#13131a]/70 backdrop-blur-sm" />
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="relative z-10 flex flex-col lg:flex-row">
              {/* Left – visual */}
              <div className="lg:w-[45%] p-12 lg:p-16 flex items-center justify-center relative min-h-[280px]">
                {/* Orbiting rings */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <div className="absolute w-48 h-48 rounded-full border border-purple-500/20 animate-spin-slow" />
                  <div className="absolute w-36 h-36 rounded-full border border-cyan-500/20 animate-spin-slow" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                  <div className="absolute w-24 h-24 rounded-full border border-pink-500/20 animate-spin-slow" style={{ animationDuration: '8s' }} />

                  {/* Ping circles */}
                  <div className="absolute w-48 h-48 rounded-full border border-purple-500/10 animate-ping-slow" style={{ animationDelay: '0s' }} />
                  <div className="absolute w-36 h-36 rounded-full border border-cyan-500/10 animate-ping-slow" style={{ animationDelay: '0.8s' }} />

                  {/* Center icon */}
                  <div className="w-20 h-20 rounded-2xl glass-strong border border-purple-500/30 flex items-center justify-center neon-glow animate-float">
                    <Sparkles className="w-10 h-10 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Right – copy */}
              <div className="lg:w-[55%] p-12 lg:p-16 flex flex-col justify-center reveal-right">
                <div className="section-label mb-5">Custom Commissions</div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5 leading-tight">
                  Can't find exactly what<br />
                  <span className="gradient-text">you imagined?</span>
                </h2>
                <p className="text-[#a0a0b8] mb-8 text-lg leading-relaxed">
                  Tell an artist what you want. Get a piece created just for you — from personalized gifts to dream room décor.
                </p>
                <ul className="space-y-3 mb-10">
                  {['Choose your style', 'Set your budget', 'Work directly with an artist', 'Get something truly unique'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[#d0d0e8]">
                      <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 text-xs flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/custom-art" className="inline-block">
                  <button className="px-8 py-4 rounded-2xl font-semibold text-white relative overflow-hidden group btn-shimmer btn-magnetic">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 group-hover:from-purple-500 group-hover:to-cyan-400 transition-all duration-300" />
                    <span className="relative flex items-center gap-2">
                      Request Custom Art
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="section-label mb-4 justify-center">How It Works</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Three steps to your <span className="gradient-text">perfect artwork.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative stagger-children">
            {/* Connector line */}
            <div className="hidden md:block absolute top-[60px] left-[22%] right-[22%] h-[1px] bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-pink-500/30" style={{ zIndex: 0 }} />

            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative z-10 rounded-3xl p-8 glass border border-white/8 hover:border-white/20 card-glow-hover group overflow-hidden`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />

                {/* Step number */}
                <div className="absolute top-5 right-5 text-6xl font-heading font-black text-white/[0.04] group-hover:text-white/[0.07] transition-colors select-none">
                  {step.num}
                </div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl glass-strong border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ${step.accent}`}
                    style={{ boxShadow: `0 0 30px ${step.glow}` }}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <h3 className={`text-2xl font-heading font-bold mb-3 ${step.accent}`}>{step.title}</h3>
                  <p className="text-[#a0a0b8] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[2.5rem] p-16 text-center overflow-hidden gradient-border reveal">
            {/* Aurora fill */}
            <div className="absolute inset-0 aurora-bg" />
            <div className="absolute inset-0 bg-[#0a0a0f]/60 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-grid opacity-15" />

            {/* Decorative orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 orb orb-purple opacity-40 animate-glow-pulse" style={{ filter: 'blur(50px)' }} />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 orb orb-cyan opacity-30 animate-glow-pulse" style={{ animationDelay: '1s', filter: 'blur(50px)' }} />

            <div className="relative z-10">
              <div className="section-label mb-6 justify-center">Join the Community</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-5 leading-tight">
                Your walls deserve<br />
                <span className="gradient-text">something original.</span>
              </h2>
              <p className="text-xl text-[#a0a0b8] mb-12 max-w-2xl mx-auto">
                Join thousands of art lovers and artists already on Artvrkz.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/explore">
                  <button className="px-10 py-4 rounded-2xl font-semibold text-white relative overflow-hidden group btn-shimmer btn-magnetic">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 group-hover:from-purple-500 group-hover:to-cyan-400 transition-all duration-300" />
                    <span className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 bg-gradient-to-r from-purple-600 to-cyan-500 transition-opacity" />
                    <span className="relative">Explore Artwork</span>
                  </button>
                </Link>
                <Link to="/register?role=artist">
                  <button className="px-10 py-4 rounded-2xl font-semibold text-[#f0f0f5] glass border border-white/15 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 btn-magnetic">
                    Become an Artist
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

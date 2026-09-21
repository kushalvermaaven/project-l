import React from 'react';
import { Target, Eye, Users, Shield, Heart, Zap } from 'lucide-react';
import Button from '../../components/ui/Button';

const About = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Hero */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
          We exist to make art <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            more accessible.
          </span>
        </h1>
        <p className="text-xl text-[var(--text-muted)] leading-relaxed">
          Artvrkz is a platform built to bridge the gap between talented independent artists and people looking for original, meaningful artwork.
        </p>
      </section>

      {/* Story */}
      <section className="py-24 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="aspect-square rounded-full bg-gradient-to-tr from-purple-900/40 to-cyan-900/40 blur-3xl absolute inset-0"></div>
            <div className="bg-[var(--bg-tertiary)] border border-white/10 p-8 rounded-3xl relative z-10 backdrop-blur-sm">
              <div className="space-y-6 text-[#e2e2e8]">
                <p className="text-lg"><strong>The Problem:</strong> Many talented artists struggle to reach buyers, constrained by gallery fees, geography, and marketing hurdles.</p>
                <p className="text-lg"><strong>The Solution:</strong> Artvrkz connects both sides directly. Artists get a platform to showcase and sell. Buyers get access to unique art and direct communication with creators.</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <Target className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-2xl font-heading font-bold mb-3">Our Mission</h3>
              <p className="text-[var(--text-muted)]">To empower independent artists globally by providing them with the tools, platform, and audience to build sustainable careers, while helping art lovers discover pieces that truly resonate with them.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <Eye className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-heading font-bold mb-3">Our Vision</h3>
              <p className="text-[var(--text-muted)]">A world where every wall tells a unique story, where mass-produced décor is replaced by original creations, and where being an independent artist is a thriving profession.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-heading font-bold text-center mb-16">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, title: 'Creativity', desc: 'We celebrate original thought and artistic expression in all forms.' },
            { icon: Users, title: 'Community', desc: 'We build connections between creators and appreciators.' },
            { icon: Shield, title: 'Transparency', desc: 'Fair pricing, clear commissions, and honest communication.' },
            { icon: Zap, title: 'Accessibility', desc: 'Making original art available to everyone, regardless of budget.' }
          ].map((val, i) => (
            <div key={i} className="bg-[var(--bg-secondary)] p-8 rounded-2xl border border-white/5 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-6">
                <val.icon className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{val.title}</h3>
              <p className="text-[var(--text-muted)] text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">10K+</div>
            <div className="text-[var(--text-muted)] uppercase tracking-wider text-sm">Artworks</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">2K+</div>
            <div className="text-[var(--text-muted)] uppercase tracking-wider text-sm">Artists</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
            <div className="text-[var(--text-muted)] uppercase tracking-wider text-sm">Customers</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
            <div className="text-[var(--text-muted)] uppercase tracking-wider text-sm">Categories</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-heading font-bold mb-6">Join the community.</h2>
        <p className="text-xl text-[var(--text-muted)] mb-10 max-w-2xl mx-auto">Be part of a growing ecosystem of creators and art enthusiasts.</p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Explore Marketplace</Button>
          <Button variant="outline" size="lg">Apply as Artist</Button>
        </div>
      </section>
    </div>
  );
};

export default About;

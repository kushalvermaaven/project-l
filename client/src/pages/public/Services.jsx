import React from 'react';
import { Palette, MessageCircle, Paintbrush, Gift, Home, Store, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: 'Discover Original Art',
      desc: 'Explore artwork from independent artists across styles, mediums, and budgets. Find pieces that speak to you.',
      link: '/explore'
    },
    {
      icon: MessageCircle,
      title: 'Direct Artist Connection',
      desc: 'Connect directly with artists. No middlemen, no galleries, just you and the creator discussing their work.',
      link: '/explore'
    },
    {
      icon: Paintbrush,
      title: 'Custom Artwork',
      desc: 'Request personalized artwork based on your vision. From concept to creation, collaborate with artists to make it real.',
      link: '/custom-art'
    },
    {
      icon: Gift,
      title: 'Art for Gifting',
      desc: 'Find unique artwork for birthdays, anniversaries, celebrations, and special occasions. A gift that lasts forever.',
      link: '/explore?category=gifts'
    },
    {
      icon: Home,
      title: 'Art for Decoration',
      desc: 'Discover artwork for bedrooms, living rooms, offices, studios, and other spaces to transform your environment.',
      link: '/explore'
    },
    {
      icon: Store,
      title: 'Artist Marketplace',
      desc: 'A platform for independent artists to showcase, sell, and grow their art business with full autonomy.',
      link: '/register?role=artist'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">What we offer.</h1>
          <p className="text-xl text-[#a0a0b8]">Comprehensive tools and services for both art buyers and independent artists.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-[#a0a0b8] mb-8 leading-relaxed h-24">{service.desc}</p>
              <Link to={service.link} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-[#13131a] border border-white/5 rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-6">Ready to explore?</h2>
          <p className="text-[#a0a0b8] mb-8">Join the platform redefining how original art is discovered and sold.</p>
          <div className="flex justify-center gap-4">
            <Link to="/explore">
              <Button size="lg">Browse Artworks</Button>
            </Link>
            <Link to="/register?role=artist">
              <Button variant="outline" size="lg">Become a Seller</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

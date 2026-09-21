import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Instagram, Heart } from 'lucide-react';

const footerLinks = {
  Explore: [
    { label: 'Browse Art', to: '/explore' },
    { label: 'Artists', to: '/artists' },
    { label: 'Custom Art', to: '/custom-art' },
    { label: 'Categories', to: '/explore' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
  ],
  Account: [
    { label: 'Login', to: '/login' },
    { label: 'Sign Up', to: '/signup' },
    { label: 'For Artists', to: '/register?role=artist' },
    { label: 'Dashboard', to: '/dashboard' },
  ],
};

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Github, label: 'Github', href: '#' },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[var(--bg-primary)] overflow-hidden">
      {/* Subtle aurora top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <img src="/logo.jpg" alt="Artvrkz Logo" className="h-12 w-auto object-contain rounded-md" />
            </Link>
            <p className="text-[#6b6b80] text-sm leading-relaxed mb-6 max-w-xs">
              The world's most vibrant art marketplace. Discover, collect, and commission original artwork from independent artists worldwide.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass border border-white/8 flex items-center justify-center text-[#6b6b80] hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)] mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-[#6b6b80] hover:text-[var(--text-primary)] transition-colors duration-300 hover-underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section divider */}
        <div className="section-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4a4a60]">
            © {new Date().getFullYear()} ARTVRKZ. All rights reserved.
          </p>
          <p className="text-xs text-[#4a4a60] flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> for artists everywhere.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#4a4a60]">
            <a href="#" className="hover:text-[var(--text-muted)] transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-[var(--text-muted)] transition-colors">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-[var(--text-muted)] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

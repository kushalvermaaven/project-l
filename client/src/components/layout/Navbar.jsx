import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const navLinks = [
    { to: '/explore', label: 'Explore' },
    { to: '/artists', label: 'Artists' },
    { to: '/custom-art', label: 'Custom Art' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/add-art', label: 'Add Art' },
    { to: '/collector', label: 'Collector' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--bg-primary)]/85 backdrop-blur-2xl border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{ height: '68px' }}
      >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <img src="/logo.jpg" alt="Artvrkz Logo" className="h-12 w-auto object-contain rounded-md" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover-underline ${
                  isActive(link.to)
                    ? 'text-purple-400'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isActive(link.to) && (
                  <span className="absolute inset-0 rounded-lg bg-purple-500/10 border border-purple-500/20" />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="relative px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden group btn-shimmer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-300 group-hover:from-purple-500 group-hover:to-cyan-400" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500 to-cyan-400 blur-sm" />
              <span className="relative">Sign Up</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-[68px] left-0 right-0 glass-strong border-b border-white/10 p-6 transition-all duration-500 ${
            mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                    : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-3 pt-3 flex flex-col gap-2">
              <Link
                to="/login"
                className="px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-3 rounded-xl text-sm font-semibold text-white text-center bg-gradient-to-r from-purple-600 to-cyan-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

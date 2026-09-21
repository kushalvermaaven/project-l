import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ArrowRight, LogIn } from 'lucide-react';

const Collector = () => {
  const { user } = useContext(AuthContext) || {};

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      
      <div className="max-w-4xl mx-auto relative z-10 py-16 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/20 text-sm font-medium text-purple-600 mb-6">
          Collector Portal
        </div>
        <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
          Your Personal Art <span className="gradient-text">Collection.</span>
        </h1>
        <p className="text-[var(--text-muted)] text-lg mb-12 max-w-2xl mx-auto">
          Discover unique artworks, connect with independent Indian artists, and build a collection that tells your story.
        </p>
        
        <div className="glass border border-[var(--border-subtle)] rounded-3xl p-10 text-center max-w-lg mx-auto card-hover">
          {user ? (
            <>
              <h2 className="text-2xl font-bold mb-3">Welcome back, {user.name}!</h2>
              <p className="text-[var(--text-muted)] mb-8">Ready to explore new pieces or check your orders?</p>
              <Link to="/dashboard" className="inline-block">
                <button className="px-8 py-4 rounded-2xl font-semibold text-white relative overflow-hidden group btn-shimmer btn-magnetic">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 group-hover:from-purple-500 group-hover:to-cyan-400 transition-all duration-300 pointer-events-none" />
                  <span className="relative flex items-center gap-2">
                    View My Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-3">Start your journey</h2>
              <p className="text-[var(--text-muted)] mb-8">Log in or create an account to start collecting.</p>
              <div className="flex flex-col gap-4 items-center">
                <Link to="/login" className="w-full">
                  <button className="w-full px-8 py-4 rounded-2xl font-semibold text-white relative overflow-hidden group btn-shimmer btn-magnetic">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 group-hover:from-purple-500 group-hover:to-cyan-400 transition-all duration-300 pointer-events-none" />
                    <span className="relative flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" /> Log In
                    </span>
                  </button>
                </Link>
                <Link to="/signup?role=buyer" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                  Create a new Collector account →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collector;

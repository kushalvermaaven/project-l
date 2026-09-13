import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="z-10 text-center max-w-lg">
        <h1 className="text-9xl font-heading font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
          404
        </h1>
        <h2 className="text-3xl font-heading font-bold text-[#f0f0f5] mb-4">
          Page not found
        </h2>
        <p className="text-lg text-[#a0a0b8] mb-10">
          Oops! The page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" className="flex items-center gap-2 px-8 py-3 w-full sm:w-auto">
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline" className="flex items-center gap-2 px-8 py-3 w-full sm:w-auto">
              <Compass className="w-5 h-5" />
              Explore Art
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

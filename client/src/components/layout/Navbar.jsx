import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-xl h-16 flex items-center justify-between px-6 border-b border-white/10">
      <Link to="/" className="text-2xl font-bold font-heading gradient-text">ARTVRKZ</Link>
      <div className="hidden md:flex gap-6">
        <Link to="/explore" className="hover:text-neon-cyan transition-colors">Explore</Link>
        <Link to="/artists" className="hover:text-neon-cyan transition-colors">Artists</Link>
      </div>
      <div>
        <Link to="/login" className="px-4 py-2 hover:bg-white/10 rounded-xl transition-colors">Login</Link>
        <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl ml-2 font-medium">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;

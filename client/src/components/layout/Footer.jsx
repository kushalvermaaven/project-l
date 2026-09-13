import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-900 py-10 px-6 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold font-heading gradient-text mb-4">ARTVRKZ</h2>
          <p className="text-muted text-sm">Discover Art. Connect with Artists.</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>Browse Art</li>
            <li>Artists</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

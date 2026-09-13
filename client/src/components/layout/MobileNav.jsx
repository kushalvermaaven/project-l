import React from 'react';

const MobileNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 w-full h-14 glass-dark flex justify-around items-center z-50">
      <span className="text-sm">Home</span>
      <span className="text-sm">Explore</span>
    </div>
  );
};

export default MobileNav;

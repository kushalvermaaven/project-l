import React from 'react';

const Skeleton = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
}) => {
  const baseClasses = "bg-white/5 animate-pulse";
  
  if (variant === 'artworkCard') {
    return (
      <div className={`rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-0 overflow-hidden ${className}`}>
        <div className={`${baseClasses} w-full aspect-[4/3]`} />
        <div className="p-4 space-y-3">
          <div className={`${baseClasses} h-6 w-3/4 rounded`} />
          <div className={`${baseClasses} h-4 w-1/2 rounded`} />
          <div className={`${baseClasses} h-6 w-1/3 rounded mt-2`} />
        </div>
      </div>
    );
  }

  const getVariantClasses = () => {
    switch(variant) {
      case 'circle': return "rounded-full";
      case 'rect': return "rounded-xl";
      case 'card': return "h-64 rounded-2xl";
      case 'text':
      default: return "h-4 rounded";
    }
  };

  const style = {
    width: width || (variant === 'circle' ? '3rem' : '100%'),
    height: height || (variant === 'circle' ? '3rem' : undefined),
  };

  if (count > 1) {
    return (
      <div className={`space-y-2 w-full ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i} 
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{ ...style, width: i === count - 1 ? '75%' : style.width }}
          />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;

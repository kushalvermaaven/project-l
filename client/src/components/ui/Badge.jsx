import React from 'react';

const Badge = ({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className = '',
}) => {
  const variants = {
    default: "bg-white/10 text-[#a0a0b8]",
    purple: "bg-purple-500/20 text-purple-400",
    cyan: "bg-cyan-500/20 text-cyan-400",
    green: "bg-green-500/20 text-green-400",
    red: "bg-red-500/20 text-red-400",
    amber: "bg-amber-500/20 text-amber-400",
    pink: "bg-pink-500/20 text-pink-400",
    pending: "bg-amber-500/20 text-amber-400",
    confirmed: "bg-blue-500/20 text-blue-400",
    in_progress: "bg-purple-500/20 text-purple-400",
    shipped: "bg-cyan-500/20 text-cyan-400",
    completed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  const dotColors = {
    default: "bg-[#a0a0b8]",
    purple: "bg-purple-400",
    cyan: "bg-cyan-400",
    green: "bg-green-400",
    red: "bg-red-400",
    amber: "bg-amber-400",
    pink: "bg-pink-400",
    pending: "bg-amber-400",
    confirmed: "bg-blue-400",
    in_progress: "bg-purple-400",
    shipped: "bg-cyan-400",
    completed: "bg-green-400",
    cancelled: "bg-red-400",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.default}`} />}
      {children}
    </span>
  );
};

export default Badge;

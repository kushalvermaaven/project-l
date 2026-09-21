import React from 'react';

const Card = ({
  variant = 'glass',
  hover = true,
  glow = false,
  padding = 'md',
  className = '',
  children,
  onClick,
  ...rest
}) => {
  const baseClasses = "rounded-2xl transition-all duration-300";
  
  const variants = {
    glass: "bg-white/5 backdrop-blur-xl border border-white/10",
    solid: "bg-[var(--bg-tertiary)] border border-white/5",
    gradient: "bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20",
  };

  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };

  const hoverClasses = hover && onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 hover:border-white/20" : "";
  const glowClasses = glow ? "shadow-[0_0_15px_rgba(124,58,237,0.15)]" : "";

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${hoverClasses}
    ${glowClasses}
    ${className}
  `;

  return (
    <div className={classes} onClick={onClick} {...rest}>
      {children}
    </div>
  );
};

export default Card;

import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  children,
  ...rest
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:brightness-110 hover:scale-[1.02] active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20",
    secondary: "bg-white/10 backdrop-blur border border-white/10 text-white hover:bg-white/20",
    outline: "border border-purple-500 text-purple-400 hover:bg-purple-500/10",
    ghost: "bg-transparent text-[var(--text-muted)] hover:bg-white/5 hover:text-white",
    danger: "bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const isDisabled = disabled || loading;
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${isDisabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:brightness-100' : ''}
    ${className}
  `;

  return (
    <button disabled={isDisabled} className={classes} {...rest}>
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className={`w-5 h-5 ${children ? 'mr-2' : ''}`} />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className={`w-5 h-5 ${children ? 'ml-2' : ''}`} />}
    </button>
  );
};

export default Button;

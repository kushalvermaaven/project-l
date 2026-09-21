import React from 'react';

const CategoryChip = ({ category, active, onClick, count, className = '' }) => {
  if (!category) return null;

  const Icon = category.icon;

  return (
    <button
      onClick={onClick}
      className={`
        rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 border
        ${active 
          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-transparent shadow-lg shadow-purple-500/20' 
          : 'bg-white/5 text-[var(--text-muted)] border-white/10 hover:bg-white/10 hover:text-white'}
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {category.label || category.name}
      {count !== undefined && (
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-white/10'}`}>
          {count}
        </span>
      )}
    </button>
  );
};

export default CategoryChip;

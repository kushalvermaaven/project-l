import React from 'react';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-4 ${className}`}>
      {Icon && (
        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
          <Icon className="w-10 h-10 text-[#6b6b80]" />
        </div>
      )}
      <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)]">{title}</h3>
      {description && (
        <p className="text-[var(--text-muted)] mt-2 max-w-md mx-auto">{description}</p>
      )}
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;

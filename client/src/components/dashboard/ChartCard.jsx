import React from 'react';
import Card from '../ui/Card';

const ChartCard = ({ title, subtitle, children, className = '' }) => {
  return (
    <Card variant="glass" padding="md" className={`flex flex-col h-full ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)]">{title}</h3>
        {subtitle && <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>}
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        {children}
      </div>
    </Card>
  );
};

export default ChartCard;

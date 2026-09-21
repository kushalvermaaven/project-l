import React from 'react';
import Card from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendUp = true,
  color = 'purple'
}) => {
  const colorMap = {
    purple: 'text-purple-500 bg-purple-500/20',
    cyan: 'text-cyan-500 bg-cyan-500/20',
    pink: 'text-pink-500 bg-pink-500/20',
    green: 'text-green-500 bg-green-500/20',
  };

  const TrendIcon = trendUp ? TrendingUp : TrendingDown;
  const trendColor = trendUp ? 'text-green-400' : 'text-red-400';

  return (
    <Card variant="glass" className="flex items-center gap-4">
      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color] || colorMap.purple}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className="flex-1">
        <p className="text-sm text-[var(--text-muted)] mb-1">{label}</p>
        <div className="flex items-baseline gap-3">
          <h3 className="text-3xl font-heading font-bold text-[var(--text-primary)]">{value}</h3>
          {trend && (
            <span className={`text-sm flex items-center gap-1 ${trendColor}`}>
              <TrendIcon className="w-4 h-4" />
              {trend}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;

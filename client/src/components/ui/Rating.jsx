import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Rating = ({
  value = 0,
  onChange,
  size = 'md',
  showValue = false,
  count = 5,
  readonly = false,
  className = ''
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const handleMouseEnter = (index) => {
    if (!readonly && onChange) setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (!readonly && onChange) setHoverValue(0);
  };

  const handleClick = (index) => {
    if (!readonly && onChange) onChange(index);
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: count }).map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= (hoverValue || value);
          
          return (
            <Star
              key={i}
              className={`
                ${sizes[size]} transition-all duration-150
                ${isFilled ? 'text-amber-400 fill-amber-400' : 'text-[#6b6b80]'}
                ${!readonly && onChange ? 'cursor-pointer hover:scale-110' : ''}
              `}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onClick={() => handleClick(starValue)}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-[var(--text-primary)] ml-1">
          {Number(value).toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;

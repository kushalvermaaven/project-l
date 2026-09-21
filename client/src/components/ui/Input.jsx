import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  iconPosition = 'left',
  disabled,
  required,
  options = [],
  rows = 4,
  className = '',
  ...rest
}) => {
  const baseClasses = "w-full bg-white/5 border rounded-xl text-[var(--text-primary)] placeholder:text-[#6b6b80] transition-all duration-200 outline-none";
  const errorClasses = error ? "border-red-500 focus:ring-1 focus:ring-red-500/50" : "border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50";
  const paddingClasses = type === 'textarea' ? 'p-4' : 'px-4 py-3';
  const iconPaddingClasses = Icon ? (iconPosition === 'left' ? 'pl-11' : 'pr-11') : '';
  
  const classes = `${baseClasses} ${errorClasses} ${paddingClasses} ${iconPaddingClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[var(--text-muted)] block">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b80]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            className={`${classes} resize-none`}
            {...rest}
          />
        ) : type === 'select' ? (
          <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`${classes} appearance-none`}
            {...rest}
          >
            {options.map((opt, i) => (
              <option key={i} value={opt.value} className="bg-[var(--bg-tertiary)] text-[var(--text-primary)]">
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={classes}
            {...rest}
          />
        )}

        {Icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b80]">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
      {!error && helperText && <p className="text-sm text-[#6b6b80] mt-1">{helperText}</p>}
    </div>
  );
};

export default Input;

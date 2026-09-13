import React from 'react';

const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex overflow-x-auto hide-scrollbar ${className}`}>
      <div className="flex bg-white/5 rounded-xl p-1 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${isActive 
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg' 
                  : 'text-[#a0a0b8] hover:text-white hover:bg-white/5'}
              `}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;

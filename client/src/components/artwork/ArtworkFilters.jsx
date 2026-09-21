import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import CategoryChip from '../common/CategoryChip';
import { CATEGORIES, ART_STYLES, MEDIUMS, ORIENTATIONS, SORT_OPTIONS } from '../../utils/constants';

const ArtworkFilters = ({ filters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const activeCount = Object.keys(filters).filter(k => 
    filters[k] && filters[k] !== '' && k !== 'search' && k !== 'sort' && 
    (typeof filters[k] !== 'boolean' || filters[k] === true) &&
    (k !== 'minPrice' || filters[k] !== '') && (k !== 'maxPrice' || filters[k] !== '')
  ).length;

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input 
            icon={Search}
            placeholder="Search artworks..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>
        <div className="md:hidden">
          <Button variant="secondary" fullWidth onClick={() => setIsOpen(!isOpen)} icon={SlidersHorizontal}>
            Filters {activeCount > 0 && <Badge variant="purple" size="sm" className="ml-2">{activeCount}</Badge>}
          </Button>
        </div>
        <div className="hidden md:flex gap-3">
          <Button variant="ghost" onClick={onReset}>Clear All</Button>
          <Button variant="secondary" onClick={() => setIsOpen(!isOpen)} icon={SlidersHorizontal}>
            Filters {activeCount > 0 && <Badge variant="purple" size="sm" className="ml-2">{activeCount}</Badge>}
          </Button>
        </div>
      </div>

      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-6">
          
          <div>
            <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3">Categories</h4>
            <div className="flex flex-wrap gap-2">
              <CategoryChip 
                category={{ name: 'All', id: '' }} 
                active={!filters.category} 
                onClick={() => handleChange('category', '')} 
              />
              {CATEGORIES?.map(cat => (
                <CategoryChip 
                  key={cat.id || cat.value} 
                  category={cat} 
                  active={filters.category === (cat.id || cat.value)} 
                  onClick={() => handleChange('category', (cat.id || cat.value))} 
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3">Price Range</h4>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={(e) => handleChange('minPrice', e.target.value)} />
                <span className="text-[#6b6b80]">-</span>
                <Input type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={(e) => handleChange('maxPrice', e.target.value)} />
              </div>
            </div>
            
            <Input 
              type="select" 
              label="Medium" 
              value={filters.medium || ''} 
              onChange={(e) => handleChange('medium', e.target.value)}
              options={[{label: 'All Mediums', value: ''}, ...(MEDIUMS || []).map(m => ({label: m.label, value: m.value}))]}
            />
            
            <Input 
              type="select" 
              label="Style" 
              value={filters.style || ''} 
              onChange={(e) => handleChange('style', e.target.value)}
              options={[{label: 'All Styles', value: ''}, ...(ART_STYLES || []).map(m => ({label: m.label, value: m.value}))]}
            />
            
            <Input 
              type="select" 
              label="Orientation" 
              value={filters.orientation || ''} 
              onChange={(e) => handleChange('orientation', e.target.value)}
              options={[{label: 'All Orientations', value: ''}, ...(ORIENTATIONS || []).map(m => ({label: m.label, value: m.value}))]}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={filters.isCustomizable || false} 
                  onChange={(e) => handleChange('isCustomizable', e.target.checked)} 
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.isCustomizable ? 'bg-purple-500' : 'bg-white/20'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filters.isCustomizable ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm text-[var(--text-primary)]">Customizable Only</span>
            </label>

            <div className="w-48">
              <Input 
                type="select" 
                value={filters.sort || ''} 
                onChange={(e) => handleChange('sort', e.target.value)}
                options={SORT_OPTIONS || []}
              />
            </div>
          </div>
          
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <Button variant="ghost" fullWidth onClick={onReset}>Clear All Filters</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkFilters;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Image, User, Tag, X } from 'lucide-react';
import { sampleArtworks, sampleArtists, sampleCategories } from '../../data/sampleData';
import useDebounce from '../../hooks/useDebounce';

const SearchBar = ({ placeholder = "Search Artvrkz...", className = '' }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [results, setResults] = useState({ artworks: [], artists: [], categories: [] });
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      const q = debouncedQuery.toLowerCase();
      setResults({
        artworks: sampleArtworks?.filter(a => a.title.toLowerCase().includes(q)).slice(0, 3) || [],
        artists: sampleArtists?.filter(a => a.name.toLowerCase().includes(q)).slice(0, 3) || [],
        categories: sampleCategories?.filter(c => c.name.toLowerCase().includes(q)).slice(0, 2) || []
      });
      setIsOpen(true);
    } else {
      setResults({ artworks: [], artists: [], categories: [] });
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        if (window.innerWidth < 768 && query === '') setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query]);

  const handleResultClick = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
    if (window.innerWidth < 768) setIsExpanded(false);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className} ${isExpanded ? 'w-full md:w-80' : 'w-10 md:w-80'}`}>
      <div className={`flex items-center bg-white/5 backdrop-blur border border-white/10 rounded-2xl transition-all duration-300 ${isExpanded ? 'px-4 py-2' : 'p-2 md:px-4 md:py-2'}`}>
        <Search className="w-5 h-5 text-[#6b6b80] flex-shrink-0 cursor-pointer md:cursor-default" onClick={() => setIsExpanded(true)} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`bg-transparent border-none outline-none text-[var(--text-primary)] placeholder:text-[#6b6b80] ml-3 transition-all duration-300 ${isExpanded ? 'w-full opacity-100' : 'w-0 md:w-full opacity-0 md:opacity-100'}`}
          onFocus={() => {
            setIsExpanded(true);
            if (query.trim().length > 1) setIsOpen(true);
          }}
        />
        {query && isExpanded && (
          <X className="w-4 h-4 text-[#6b6b80] cursor-pointer hover:text-white" onClick={() => { setQuery(''); setIsOpen(false); }} />
        )}
      </div>

      {isOpen && (results.artworks.length > 0 || results.artists.length > 0 || results.categories.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-tertiary)]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 z-50 max-h-96 overflow-y-auto">
          
          {results.artworks.length > 0 && (
            <div className="mb-2">
              <div className="px-3 py-2 text-xs font-medium text-[#6b6b80] uppercase tracking-wider flex items-center gap-2">
                <Image className="w-3 h-3" /> Artworks
              </div>
              {results.artworks.map(art => (
                <div key={`art-${art.id}`} onClick={() => handleResultClick(`/artwork/${art.id}`)} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                  <img src={art.images?.[0] || art.image} alt={art.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{art.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{art.artist_name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.artists.length > 0 && (
            <div className="mb-2">
              <div className="px-3 py-2 text-xs font-medium text-[#6b6b80] uppercase tracking-wider flex items-center gap-2">
                <User className="w-3 h-3" /> Artists
              </div>
              {results.artists.map(artist => (
                <div key={`artist-${artist.id}`} onClick={() => handleResultClick(`/artist/${artist.id}`)} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                  <img src={artist.avatar || `https://ui-avatars.com/api/?name=${artist.name}`} alt={artist.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{artist.name}</p>
                    <p className="text-xs text-purple-400">{artist.art_style}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.categories.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-medium text-[#6b6b80] uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-3 h-3" /> Categories
              </div>
              {results.categories.map(cat => (
                <div key={`cat-${cat.id || cat.name}`} onClick={() => handleResultClick(`/explore?category=${cat.slug || cat.value || cat.name}`)} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <Tag className="w-4 h-4 text-[var(--text-muted)]" />
                  </div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{cat.label || cat.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

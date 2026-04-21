import React from 'react';
import { Search, X } from 'lucide-react';

export default function FilterBar({ searchQuery, setSearchQuery, selectedFilter, setSelectedFilter }) {
  const filters = ['Tous', 'Poitrine', 'Dos', 'Jambes', 'Épaules', 'Bras'];

  return (
    <div className="flex flex-col gap-4 sticky top-0 z-20 bg-primary-bg/80 backdrop-blur-md pb-4">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-blue transition-colors" />
        <input
          type="text"
          placeholder="Rechercher un exercice..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-4 bg-secondary-bg border border-secondary-bg rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-text-main font-medium transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-bg rounded-full text-text-muted"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-6 py-2 rounded-full font-display font-bold text-xs uppercase tracking-widest transition-all ${
              selectedFilter === filter
                ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                : 'bg-secondary-bg text-text-muted hover:bg-secondary-bg/80'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

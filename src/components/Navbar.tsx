import React from 'react';
import { Search, Globe2, BookOpen, HelpCircle, Layers } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onOpenQuiz: () => void;
  onOpenTopicDrawer: () => void;
  onSelectCountryOrCity: (id: string, type: 'country' | 'city') => void;
  searchResults: { id: string; nameBn: string; nameEn: string; type: 'country' | 'city'; subtitle: string }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  onOpenQuiz,
  onOpenTopicDrawer,
  onSelectCountryOrCity,
  searchResults
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = React.useState(false);

  return (
    <header className="relative z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Zone 1: Brand title, single element */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Globe2 className="w-4 h-4" />
            </div>
            <span className="text-base lg:text-lg font-bold tracking-tight text-slate-100 whitespace-nowrap">
              বিশ্ব মানচিত্র সাধারণ জ্ঞান
            </span>
          </div>

          {/* Mobile Action buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onOpenTopicDrawer}
              className="p-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-md"
              title="বিষয়ভিত্তিক তালিকা"
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenQuiz}
              className="p-2 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/40 border border-amber-800/40 rounded-md"
              title="বিসিএস কুইজ"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar with auto-complete */}
        <div className="relative w-full lg:max-w-md">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="দেশ বা শহর খুঁজুন (যেমন: জেনেভা, বার্ন, লন্ডন)..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-colors"
            />
          </div>

          {/* Autocomplete dropdown */}
          {showSearchDropdown && searchQuery.trim() && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 max-h-72 overflow-y-auto bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 divide-y divide-slate-800/60">
              {searchResults.slice(0, 8).map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => {
                    onSelectCountryOrCity(result.id, result.type);
                    setShowSearchDropdown(false);
                    onSearchChange('');
                  }}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-slate-800/80 transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-medium text-slate-100">
                      {result.nameBn} <span className="text-xs text-slate-400">({result.nameEn})</span>
                    </div>
                    <div className="text-xs text-amber-400/80 mt-0.5">{result.subtitle}</div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    {result.type === 'country' ? 'দেশ' : 'শহর'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone 2 & 3: Filter controls & actions */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Filter segment tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              সকল
            </button>
            <button
              onClick={() => onFilterChange('headquarters')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeFilter === 'headquarters'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              সদর দপ্তর
            </button>
            <button
              onClick={() => onFilterChange('wonders')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeFilter === 'wonders'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              সপ্তাশ্চর্য
            </button>
            <button
              onClick={() => onFilterChange('wars')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeFilter === 'wars'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              যুদ্ধ ও চুক্তি
            </button>
          </div>

          {/* Quick PDF explorer button */}
          <button
            onClick={onOpenTopicDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>বিষয়ভিত্তিক চার্ট</span>
          </button>

          {/* BCS & Medical Quiz Practice button */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-amber-900/20"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>বিসিএস কুইজ পরীক্ষা</span>
          </button>
        </div>
      </div>
    </header>
  );
};

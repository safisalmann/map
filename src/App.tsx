/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { WorldMap } from './components/WorldMap';
import { CityModal } from './components/CityModal';
import { CountryModal } from './components/CountryModal';
import { QuizModal } from './components/QuizModal';
import { TopicDrawer } from './components/TopicDrawer';
import { ALL_COUNTRIES, ALL_CITIES, TOPIC_CATEGORIES } from './data';
import { CountryInfo, CityInfo } from './types';
import { 
  Building2, 
  Landmark, 
  HelpCircle, 
  Sparkles, 
  Compass, 
  MapPin, 
  BookOpen, 
  Search, 
  Award,
  Globe
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTopicDrawerOpen, setIsTopicDrawerOpen] = useState(false);

  // Search Results Filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();

    const countryMatches = ALL_COUNTRIES.filter(
      (c) =>
        c.nameBn.includes(query) ||
        c.nameEn.toLowerCase().includes(query) ||
        c.capitalBn.includes(query) ||
        (c.sobriquetsBn && c.sobriquetsBn.some((s) => s.includes(query)))
    ).map((c) => ({
      id: c.id,
      nameBn: c.nameBn,
      nameEn: c.nameEn,
      type: 'country' as const,
      subtitle: `রাজধানী: ${c.capitalBn} · মুদ্রা: ${c.currencyBn}`
    }));

    const cityMatches = ALL_CITIES.filter(
      (c) =>
        c.nameBn.includes(query) ||
        c.nameEn.toLowerCase().includes(query) ||
        (c.sobriquetBn && c.sobriquetBn.includes(query)) ||
        (c.headquarters && c.headquarters.some((h) => h.toLowerCase().includes(query)))
    ).map((c) => ({
      id: c.id,
      nameBn: c.nameBn,
      nameEn: c.nameEn,
      type: 'city' as const,
      subtitle: `${c.countryBn} · ${c.sobriquetBn || (c.isCapital ? 'রাজধানী' : 'গুরুত্বপূর্ণ শহর')}`
    }));

    return [...cityMatches, ...countryMatches];
  }, [searchQuery]);

  // Handler for select from search
  const handleSelectFromSearch = (id: string, type: 'country' | 'city') => {
    if (type === 'country') {
      const country = ALL_COUNTRIES.find((c) => c.id === id);
      if (country) {
        setSelectedCountry(country);
        setSelectedCity(null);
      }
    } else {
      const city = ALL_CITIES.find((c) => c.id === id);
      if (city) {
        setSelectedCity(city);
        const country = ALL_COUNTRIES.find((c) => c.id === city.countryId);
        if (country) setSelectedCountry(country);
      }
    }
  };

  // Quick jump to Switzerland / Geneva
  const handleJumpToSwiss = () => {
    const swiss = ALL_COUNTRIES.find((c) => c.id === 'CH');
    if (swiss) {
      setSelectedCountry(swiss);
      const geneva = ALL_CITIES.find((c) => c.id === 'ch-geneva');
      if (geneva) setSelectedCity(geneva);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Hind_Siliguri',sans-serif]">
      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenTopicDrawer={() => setIsTopicDrawerOpen(true)}
        onSelectCountryOrCity={handleSelectFromSearch}
        searchResults={searchResults}
      />

      {/* Hero Interactive Ribbon */}
      <div className="relative border-b border-slate-800 bg-slate-900/60 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">আন্তর্জাতিক সাধারণ জ্ঞান মানচিত্র</span>
                <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-full">
                  মার্কেটর প্রজেকশন
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                মানচিত্রের যে কোনো দেশ বা শহরে হোভার/ক্লিক করুন — রাজধানী, বড় বড় শহর, সদর দপ্তর, ইতিহাস, মুদ্রা ও বোল্ড তথ্য প্রদর্শিত হবে।
              </p>
            </div>
          </div>

          {/* Quick Highlight Shortcuts */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
            <span className="text-slate-400 text-[11px] shrink-0 font-medium">দ্রুত দেখুন:</span>
            <button
              onClick={handleJumpToSwiss}
              className="px-2.5 py-1 bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-800/50 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🇨🇭 সুইজারল্যান্ড (জেনেভা, বার্ন)</span>
            </button>
            <button
              onClick={() => {
                const uk = ALL_COUNTRIES.find((c) => c.id === 'GB');
                if (uk) setSelectedCountry(uk);
              }}
              className="px-2.5 py-1 bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 border border-slate-700/60 rounded-lg whitespace-nowrap transition-colors"
            >
              🇬🇧 যুক্তরাজ্য (লন্ডন)
            </button>
            <button
              onClick={() => {
                const fr = ALL_COUNTRIES.find((c) => c.id === 'FR');
                if (fr) setSelectedCountry(fr);
              }}
              className="px-2.5 py-1 bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 border border-slate-700/60 rounded-lg whitespace-nowrap transition-colors"
            >
              🇫🇷 ফ্রান্স (প্যারিস)
            </button>
            <button
              onClick={() => {
                const us = ALL_COUNTRIES.find((c) => c.id === 'US');
                if (us) setSelectedCountry(us);
              }}
              className="px-2.5 py-1 bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 border border-slate-700/60 rounded-lg whitespace-nowrap transition-colors"
            >
              🇺🇸 যুক্তরাষ্ট্র (নিউইয়র্ক)
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Viewport */}
      <main className="flex-1 flex flex-col relative">
        <WorldMap
          countries={ALL_COUNTRIES}
          cities={ALL_CITIES}
          selectedCountry={selectedCountry}
          selectedCity={selectedCity}
          onSelectCountry={(c) => setSelectedCountry(c)}
          onSelectCity={(city) => {
            setSelectedCity(city);
            const parentCountry = ALL_COUNTRIES.find((c) => c.id === city.countryId);
            if (parentCountry) setSelectedCountry(parentCountry);
          }}
          activeFilter={activeFilter}
        />

        {/* Bottom Quick Category Strip */}
        <section className="border-t border-slate-800/80 bg-slate-950 px-4 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  গুরুত্বপূর্ণ অধ্যায়সমূহ
                </h3>
              </div>
              <button
                onClick={() => setIsTopicDrawerOpen(true)}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <span>সবগুলো চার্ট দেখুন</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {TOPIC_CATEGORIES.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    if (topic.id === 'questions') {
                      setIsQuizOpen(true);
                    } else {
                      setActiveFilter(topic.id);
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all group ${
                    activeFilter === topic.id
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-sm shadow-amber-500/10'
                      : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
                      {topic.nameBn}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {topic.count}+
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {topic.descriptionBn}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modals & Drawers */}
      {selectedCity && (
        <CityModal
          city={selectedCity}
          country={selectedCountry || undefined}
          onClose={() => setSelectedCity(null)}
          onSelectCountry={(country) => {
            setSelectedCity(null);
            setSelectedCountry(country);
          }}
        />
      )}

      {selectedCountry && !selectedCity && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          onSelectCity={(city) => setSelectedCity(city)}
        />
      )}

      {isQuizOpen && (
        <QuizModal onClose={() => setIsQuizOpen(false)} />
      )}

      <TopicDrawer
        isOpen={isTopicDrawerOpen}
        onClose={() => setIsTopicDrawerOpen(false)}
        countries={ALL_COUNTRIES}
        cities={ALL_CITIES}
        onSelectCountry={(c) => setSelectedCountry(c)}
        onSelectCity={(city) => {
          setSelectedCity(city);
          const parent = ALL_COUNTRIES.find((c) => c.id === city.countryId);
          if (parent) setSelectedCountry(parent);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 lg:px-8 py-3 text-center text-xs text-slate-400">
        <p>
          (আন্তর্জাতিক বিষয়াবলি) মেডিকেল ও বিসিএস ভর্তি সহায়ক ইন্টারেক্টিভ মানচিত্র · সর্বস্বত্ব সংরক্ষিত
        </p>
      </footer>
    </div>
  );
}

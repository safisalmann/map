import React, { useState } from 'react';
import { X, Building2, Landmark, History, Compass, Sparkles, BookOpen } from 'lucide-react';
import { CountryInfo, CityInfo } from '../types';

interface TopicDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  countries: CountryInfo[];
  cities: CityInfo[];
  onSelectCountry: (country: CountryInfo) => void;
  onSelectCity: (city: CityInfo) => void;
}

export const TopicDrawer: React.FC<TopicDrawerProps> = ({
  isOpen,
  onClose,
  countries,
  cities,
  onSelectCountry,
  onSelectCity
}) => {
  const [activeCategory, setActiveCategory] = useState<'headquarters' | 'sobriquets' | 'treaties' | 'wonders'>('headquarters');

  if (!isOpen) return null;

  // Filter cities with headquarters
  const hqCities = cities.filter((c) => c.headquarters && c.headquarters.length > 0);

  // Sobriquet list
  const sobriquetCountries = countries.filter((c) => c.sobriquetsBn && c.sobriquetsBn.length > 0);

  // Treaties & Wars
  const historyCountries = countries.filter((c) => c.historyAndWarsBn && c.historyAndWarsBn.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
      <div
        className="w-full max-w-lg h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base text-white">বিষয়ভিত্তিক চার্ট</h3>
              <p className="text-xs text-slate-400">আন্তর্জাতিক সাধারণ জ্ঞানের নির্বাচিত অধ্যায়</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-2 bg-slate-950/60 border-b border-slate-800 text-xs shrink-0">
          <button
            onClick={() => setActiveCategory('headquarters')}
            className={`p-2 rounded-lg font-medium transition-colors text-center ${
              activeCategory === 'headquarters'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            সদর দপ্তর
          </button>
          <button
            onClick={() => setActiveCategory('sobriquets')}
            className={`p-2 rounded-lg font-medium transition-colors text-center ${
              activeCategory === 'sobriquets'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            উপনাম ও নাম
          </button>
          <button
            onClick={() => setActiveCategory('treaties')}
            className={`p-2 rounded-lg font-medium transition-colors text-center ${
              activeCategory === 'treaties'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            যুদ্ধ ও চুক্তি
          </button>
          <button
            onClick={() => setActiveCategory('wonders')}
            className={`p-2 rounded-lg font-medium transition-colors text-center ${
              activeCategory === 'wonders'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            সপ্তাশ্চর্য
          </button>
        </div>

        {/* Scrollable Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {activeCategory === 'headquarters' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                আন্তর্জাতিক সংস্থা ও তাদের সদর দপ্তর (শহরে ক্লিক করে মানচিত্রে দেখুন):
              </p>
              {hqCities.map((city) => (
                <div
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className="p-3 bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-amber-300 text-sm">
                      {city.nameBn} <span className="text-xs text-slate-400 font-normal">({city.countryBn})</span>
                    </span>
                    <span className="text-[11px] font-semibold bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/20">
                      {city.headquarters?.length}টি সংস্থা
                    </span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {city.headquarters?.map((hq, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-bold shrink-0">•</span>
                        <span>{hq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeCategory === 'sobriquets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                ভৌগোলিক উপনাম ও ঐতিহাসিক পুরাতন নাম (দেশ বা শহরে ক্লিক করুন):
              </p>
              {sobriquetCountries.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCountry(c);
                    onClose();
                  }}
                  className="p-3 bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-100">{c.nameBn}</span>
                    <span className="text-xs text-slate-400">মুদ্রা: {c.currencyBn}</span>
                  </div>
                  <div className="text-xs text-amber-300 font-medium">
                    উপনাম: {c.sobriquetsBn?.join(', ')}
                  </div>
                  {c.ancientNamesBn && (
                    <div className="text-xs text-slate-400 mt-1">
                      পুরাতন নাম: {c.ancientNamesBn.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeCategory === 'treaties' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                বিখ্যাত আন্তর্জাতিক চুক্তি, ঐতিহাসিক যুদ্ধ ও ঘটনা:
              </p>
              {historyCountries.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCountry(c);
                    onClose();
                  }}
                  className="p-3 bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition-all"
                >
                  <div className="font-bold text-amber-300 text-sm mb-1.5">{c.nameBn}</div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {c.historyAndWarsBn?.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeCategory === 'wonders' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                আধুনিক পৃথিবীর সপ্তাশ্চর্য (New 7 Wonders of the World):
              </p>
              {[
                { name: 'চীনের মহাপ্রাচীর (Great Wall of China)', country: 'চীন', loc: 'বেইজিং', desc: 'দৈর্ঘ্য ৮,৮৫০ কিমি। মানবনির্মিত সর্ববৃহৎ স্থাপনা।' },
                { name: 'পেত্রা (Petra)', country: 'জর্ডান', loc: 'আম্মান সংলগ্ন', desc: 'পাথর খোদাই করা প্রাচীন গোলাপী নগরী।' },
                { name: 'কলোসিয়াম (Colosseum)', country: 'ইতালি', loc: 'রোম', desc: 'প্রাচীন রোমান সাম্রাজ্যের সর্ববৃহৎ নাট্যশালা।' },
                { name: 'চিচেন ইত্‍জা (Chichen Itza)', country: 'মেক্সিকো', loc: 'ইউকাটান', desc: 'প্রাচীন মায়া সভ্যতার মায়ান পিরামিড।' },
                { name: 'মাচু পিচু (Machu Picchu)', country: 'পেরু', loc: 'কুজকো', desc: 'ইনকা সভ্যতার পর্বতশীর্ষ নগরী।' },
                { name: 'তাজমহল (Taj Mahal)', country: 'ভারত', loc: 'আগ্রা', desc: 'মুঘল সম্রাট শাহজাহান কর্তৃক নির্মিত শ্বেত মর্মরের স্মৃতিসৌধ।' },
                { name: 'ক্রাইস্ট দ্য রিডিমার (Christ the Redeemer)', country: 'ব্রাজিল', loc: 'রিও ডি জেনেরিও', desc: 'কর্কোভাডো পাহাড়ের চূড়ায় অবস্থিত যিশুর বিশাল ভাস্কর্য।' }
              ].map((wonder, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-slate-950/50 border border-slate-800 rounded-xl space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-sm">{wonder.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-200">
                      {wonder.country}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">স্থান: {wonder.loc}</div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-0.5">{wonder.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

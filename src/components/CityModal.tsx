import React, { useState } from 'react';
import { CityInfo, CountryInfo } from '../types';
import { X, Building2, Landmark, History, Users, HelpCircle, Sparkles, MapPin, ExternalLink } from 'lucide-react';

interface CityModalProps {
  city: CityInfo;
  country?: CountryInfo;
  onClose: () => void;
  onSelectCountry: (country: CountryInfo) => void;
}

export const CityModal: React.FC<CityModalProps> = ({
  city,
  country,
  onClose,
  onSelectCountry
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'headquarters' | 'history' | 'questions'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Photo or Atmospheric Header Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-950 shrink-0">
          {city.photoUrl ? (
            <img
              src={city.photoUrl}
              alt={city.nameBn}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/40 flex items-center justify-center">
              <Building2 className="w-16 h-16 text-slate-700/50" />
            </div>
          )}

          {/* Dark gradient overlay for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-slate-950/60 hover:bg-slate-900 text-slate-300 hover:text-white rounded-full backdrop-blur-md border border-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* City Title and Badges */}
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {city.countryBn}
              </span>
              {city.isCapital && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  রাজধানী
                </span>
              )}
              {city.river && (
                <span className="text-xs text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                  {city.river} নদীর তীরে
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>{city.nameBn}</span>
              <span className="text-base sm:text-lg font-normal text-slate-300">({city.nameEn})</span>
            </h2>

            {city.sobriquetBn && (
              <p className="text-xs sm:text-sm text-amber-300 font-medium mt-0.5">
                উপনাম: {city.sobriquetBn}
              </p>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            সারসংক্ষেপ ও বোল্ড তথ্য
          </button>

          {city.headquarters && city.headquarters.length > 0 && (
            <button
              onClick={() => setActiveTab('headquarters')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'headquarters'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>সদর দপ্তর ({city.headquarters.length})</span>
            </button>
          )}

          {((city.historyBn && city.historyBn.length > 0) || (city.landmarks && city.landmarks.length > 0)) && (
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>ইতিহাস ও স্থাপত্য</span>
            </button>
          )}

          {city.bcsQuestions && city.bcsQuestions.length > 0 && (
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'questions'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>বিসিএস প্রশ্ন ({city.bcsQuestions.length})</span>
            </button>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-sm">
          {activeTab === 'overview' && (
            <>
              {/* City Description from PDF */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  বিবরণ
                </h3>
                <p className="text-slate-200 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
                  {city.descriptionBn}
                </p>
              </div>

              {/* High-Yield Bold Information Focus */}
              {city.boldFacts && city.boldFacts.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>রেটিনা ডাইজেস্ট বোল্ড পয়েন্টসমূহ (পরীক্ষার জন্য অতীব গুরুত্বপূর্ণ)</span>
                  </h3>
                  <div className="space-y-2">
                    {city.boldFacts.map((fact, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-100 flex items-start gap-2.5"
                      >
                        <span className="text-amber-400 font-bold shrink-0">✦</span>
                        <p className="font-medium leading-relaxed">{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notable Personalities related to this city */}
              {city.notablePersonalities && city.notablePersonalities.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>বিখ্যাত ব্যক্তিত্ব</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {city.notablePersonalities.map((person, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-lg text-slate-200 text-xs flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{person}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View Country Button */}
              {country && (
                <div className="pt-2">
                  <button
                    onClick={() => onSelectCountry(country)}
                    className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700/80 text-amber-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <span>{country.nameBn} দেশের পূর্ণাঙ্গ তথ্য দেখুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'headquarters' && city.headquarters && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                আন্তর্জাতিক সংস্থা ও সদর দপ্তর
              </h3>
              <div className="divide-y divide-slate-800/80 bg-slate-950/40 rounded-xl border border-slate-800 overflow-hidden">
                {city.headquarters.map((hq, idx) => (
                  <div key={idx} className="p-3.5 flex items-start gap-3 hover:bg-slate-900/50 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100 text-sm">{hq}</div>
                      <div className="text-xs text-slate-400 mt-0.5">অবস্থান: {city.nameBn}, {city.countryBn}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {city.historyBn && city.historyBn.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    ঐতিহাসিক পটভূমি ও চুক্তি
                  </h3>
                  <div className="space-y-2">
                    {city.historyBn.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm leading-relaxed"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {city.landmarks && city.landmarks.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-amber-400" />
                    <span>বিখ্যাত স্থাপত্য ও দর্শনীয় স্থান</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {city.landmarks.map((landmark, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-200 text-xs flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        <span className="font-medium">{landmark}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'questions' && city.bcsQuestions && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                বিগত বছরের বিসিএস ও ভর্তি পরীক্ষার প্রশ্নসমূহ
              </h3>
              <div className="space-y-3">
                {city.bcsQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-amber-400 font-semibold">প্রশ্ন {idx + 1}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {q.exam}
                      </span>
                    </div>
                    <p className="font-medium text-slate-100 text-sm">{q.question}</p>
                    <div className="text-xs bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 px-3 py-1.5 rounded-lg font-medium">
                      সঠিক উত্তর: <span className="font-bold text-white">{q.answer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

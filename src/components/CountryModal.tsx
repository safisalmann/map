import React, { useState } from 'react';
import { CountryInfo, CityInfo } from '../types';
import { X, Coins, MapPin, Building, Flag, Shield, History, Users, Sparkles, HelpCircle, Plane, Award } from 'lucide-react';

interface CountryModalProps {
  country: CountryInfo;
  onClose: () => void;
  onSelectCity: (city: CityInfo) => void;
}

export const CountryModal: React.FC<CountryModalProps> = ({
  country,
  onClose,
  onSelectCity
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'cities' | 'history' | 'personalities' | 'questions'>('profile');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {country.continentBn} মহাদেশ
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              ISO: {country.id}
            </span>
            {country.sobriquetsBn && country.sobriquetsBn.length > 0 && (
              <span className="text-xs font-medium text-amber-200 bg-amber-900/30 border border-amber-800/40 px-2 py-0.5 rounded">
                উপনাম: {country.sobriquetsBn.join(', ')}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>{country.nameBn}</span>
            <span className="text-base sm:text-lg font-normal text-slate-400">({country.nameEn})</span>
          </h2>

          {/* Key Metric Chips Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-xs">
            <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">রাজধানী</span>
              <span className="font-semibold text-amber-300 text-sm">{country.capitalBn}</span>
            </div>
            <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">মুদ্রা (Coin/Currency)</span>
              <span className="font-semibold text-emerald-300 text-sm">{country.currencyBn}</span>
            </div>
            <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">আইনসভা</span>
              <span className="font-semibold text-sky-300 text-sm">
                {country.parliamentBn ? country.parliamentBn.name : 'বিদ্যমান'}
              </span>
            </div>
            <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px]">বড় শহর সংখ্যা</span>
              <span className="font-semibold text-amber-400 text-sm">{country.cities.length} টি শহর</span>
            </div>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-950/80 border-b border-slate-800 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            সারসংক্ষেপ ও বোল্ড তথ্য
          </button>
          <button
            onClick={() => setActiveTab('cities')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'cities'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>শহরসমূহ ({country.cities.length})</span>
          </button>
          {country.historyAndWarsBn && country.historyAndWarsBn.length > 0 && (
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>ইতিহাস ও যুদ্ধ</span>
            </button>
          )}
          {country.notablePersonalitiesBn && country.notablePersonalitiesBn.length > 0 && (
            <button
              onClick={() => setActiveTab('personalities')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'personalities'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>বিশিষ্ট ব্যক্তিত্ব</span>
            </button>
          )}
          {country.bcsQuestions && country.bcsQuestions.length > 0 && (
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'questions'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>বিসিএস প্রশ্ন ({country.bcsQuestions.length})</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm">
          {activeTab === 'profile' && (
            <>
              {/* Bold Highlights Section */}
              {country.boldHighlights && country.boldHighlights.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>রেটিনা ডাইজেস্ট বোল্ড তথ্য (পরীক্ষায় আসা প্রশ্ন ফোকাস)</span>
                  </h3>
                  <div className="space-y-2">
                    {country.boldHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-100 flex items-start gap-2.5"
                      >
                        <span className="text-amber-400 font-bold shrink-0 mt-0.5">★</span>
                        <p className="font-semibold leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Country Specification Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {country.ancientNamesBn && (
                  <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                    <span className="text-slate-400 block mb-1">পুরাতন নাম:</span>
                    <span className="font-semibold text-slate-200 text-sm">
                      {country.ancientNamesBn.join(', ')}
                    </span>
                  </div>
                )}

                {country.parliamentBn && (
                  <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                    <span className="text-slate-400 block mb-1">আইনসভার কাঠামো:</span>
                    <span className="font-semibold text-slate-200 block text-sm">
                      {country.parliamentBn.name} ({country.parliamentBn.type})
                    </span>
                    {country.parliamentBn.upperHouse && (
                      <span className="text-slate-400 block mt-1">
                        উচ্চকক্ষ: {country.parliamentBn.upperHouse}
                      </span>
                    )}
                    {country.parliamentBn.lowerHouse && (
                      <span className="text-slate-400 block">
                        নিম্নকক্ষ: {country.parliamentBn.lowerHouse}
                      </span>
                    )}
                  </div>
                )}

                {country.nationalEmblemBn && (
                  <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                    <span className="text-slate-400 block mb-1">জাতীয় প্রতীক:</span>
                    <span className="font-semibold text-slate-200">{country.nationalEmblemBn}</span>
                  </div>
                )}

                {country.nationalSportBn && (
                  <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                    <span className="text-slate-400 block mb-1">জাতীয় খেলা:</span>
                    <span className="font-semibold text-slate-200">{country.nationalSportBn}</span>
                  </div>
                )}

                {country.airlinesBn && (
                  <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                    <span className="text-slate-400 block mb-1">বিমান সংস্থা:</span>
                    <span className="font-semibold text-slate-200">{country.airlinesBn.join(', ')}</span>
                  </div>
                )}

                {country.intelligenceBn && (
                  <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                    <span className="text-slate-400 block mb-1">গোয়েন্দা সংস্থা:</span>
                    <span className="font-semibold text-slate-200">{country.intelligenceBn.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Headquarters in this Country */}
              {country.headquartersBn && country.headquartersBn.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>আন্তর্জাতিক সদর দপ্তরসমূহ</span>
                  </h3>
                  <div className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl space-y-1.5 text-xs sm:text-sm">
                    {country.headquartersBn.map((hq, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-200">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{hq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'cities' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {country.nameBn}-এর রাজধানী ও বড় বড় শহরসমূহ
                </h3>
                <span className="text-xs text-amber-400 font-medium">ক্লিক করে শহরের তথ্য দেখুন</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {country.cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => onSelectCity(city)}
                    className="p-3.5 text-left bg-slate-950/40 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 rounded-xl transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                        {city.nameBn} <span className="text-xs font-normal text-slate-400">({city.nameEn})</span>
                      </div>
                      {city.isCapital && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          রাজধানী
                        </span>
                      )}
                    </div>
                    {city.sobriquetBn && (
                      <p className="text-xs text-amber-300/80 mt-1">{city.sobriquetBn}</p>
                    )}
                    {city.headquarters && city.headquarters.length > 0 && (
                      <p className="text-[11px] text-sky-400 mt-1">
                        🏛️ {city.headquarters.length}টি আন্তর্জাতিক সদর দপ্তর
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && country.historyAndWarsBn && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                ঐতিহাসিক ঘটনা, যুদ্ধ ও চুক্তি
              </h3>
              <div className="space-y-2.5">
                {country.historyAndWarsBn.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm leading-relaxed"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'personalities' && country.notablePersonalitiesBn && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                আলোচিত ব্যক্তিত্ব, দার্শনিক ও বিজ্ঞানী
              </h3>
              <div className="space-y-2.5">
                {country.notablePersonalitiesBn.map((person, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm flex items-start gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <span>{person}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'questions' && country.bcsQuestions && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                বিসিএস ও মেডিকেল ভর্তি পরীক্ষার বিগত প্রশ্নসমূহ
              </h3>
              <div className="space-y-3">
                {country.bcsQuestions.map((q, idx) => (
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

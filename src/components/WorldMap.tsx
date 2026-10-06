import React, { useState, useRef, useEffect } from 'react';
import { CountryInfo, CityInfo } from '../types';
import { WORLD_COUNTRY_PATHS, projectMercator } from '../data/worldSvgPaths';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Building2, Landmark, Compass, Award } from 'lucide-react';

interface WorldMapProps {
  countries: CountryInfo[];
  cities: CityInfo[];
  selectedCountry: CountryInfo | null;
  selectedCity: CityInfo | null;
  onSelectCountry: (country: CountryInfo) => void;
  onSelectCity: (city: CityInfo) => void;
  activeFilter: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  countries,
  cities,
  selectedCountry,
  selectedCity,
  onSelectCountry,
  onSelectCity,
  activeFilter
}) => {
  // Zoom & Pan transformation state
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Hover states for tooltips
  const [hoveredCountry, setHoveredCountry] = useState<CountryInfo | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CityInfo | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Filter cities based on active filter
  const filteredCities = cities.filter((city) => {
    if (activeFilter === 'headquarters') {
      return city.headquarters && city.headquarters.length > 0;
    }
    if (activeFilter === 'wonders') {
      return (
        city.landmarks &&
        city.landmarks.some((l) =>
          l.includes('সপ্তাশ্চর্য') ||
          l.includes('কলোসিয়াম') ||
          l.includes('পিরামিড') ||
          l.includes('তাজমহল') ||
          l.includes('প্রাচীর')
        )
      );
    }
    if (activeFilter === 'wars') {
      return (
        (city.historyBn && city.historyBn.length > 0) ||
        city.nameBn === 'জেনেভা' ||
        city.nameBn === 'প্যারিস' ||
        city.nameBn === 'বার্লিন' ||
        city.nameBn === 'হিরোশিমা' ||
        city.nameBn === 'নাগাসাকি'
      );
    }
    return true;
  });

  // Zoom handlers
  const handleZoom = (delta: number) => {
    setTransform((prev) => {
      const newScale = Math.min(Math.max(prev.scale + delta, 0.8), 6);
      return { ...prev, scale: newScale };
    });
  };

  const handleResetZoom = () => {
    setTransform({ scale: 1, x: 0, y: 0 });
  };

  // Quick preset jump
  const jumpToRegion = (region: 'world' | 'europe' | 'middleEast' | 'southAsia' | 'americas') => {
    if (region === 'world') {
      setTransform({ scale: 1, x: 0, y: 0 });
    } else if (region === 'europe') {
      // Focus Europe (Switzerland, UK, France, Germany)
      setTransform({ scale: 3.2, x: -620, y: -80 });
    } else if (region === 'middleEast') {
      setTransform({ scale: 3.0, x: -800, y: -220 });
    } else if (region === 'southAsia') {
      setTransform({ scale: 2.8, x: -1050, y: -260 });
    } else if (region === 'americas') {
      setTransform({ scale: 1.8, x: 100, y: -120 });
    }
  };

  // Focus on selected item if changes
  useEffect(() => {
    if (selectedCity) {
      const [cx, cy] = projectMercator(selectedCity.coordinates[0], selectedCity.coordinates[1]);
      setTransform({
        scale: 3.8,
        x: -cx * 3.8 + (containerRef.current?.clientWidth || 800) / 2,
        y: -cy * 3.8 + (containerRef.current?.clientHeight || 500) / 2
      });
    }
  }, [selectedCity]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
    }
    // Update tooltip position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsDragging(false);
        setHoveredCity(null);
        setHoveredCountry(null);
      }}
      className={`relative w-full h-[600px] lg:h-[720px] bg-slate-950 overflow-hidden select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* Background Graticule Grid & Map Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Map Control Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-lg shadow-xl overflow-hidden backdrop-blur-sm">
          <button
            onClick={() => handleZoom(0.5)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="জুম ইন (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-800" />
          <button
            onClick={() => handleZoom(-0.5)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="জুম আউট (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-800" />
          <button
            onClick={handleResetZoom}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="রিসেট"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Region Jump Presets */}
        <div className="hidden sm:flex flex-col gap-1 p-1.5 bg-slate-900/85 border border-slate-800 rounded-lg text-xs backdrop-blur-sm">
          <span className="text-[10px] font-medium text-slate-400 px-1 py-0.5 uppercase tracking-wider">
            অঞ্চল কেন্দ্র
          </span>
          <button
            onClick={() => jumpToRegion('world')}
            className="px-2 py-1 text-left rounded text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            সমগ্র বিশ্ব
          </button>
          <button
            onClick={() => jumpToRegion('europe')}
            className="px-2 py-1 text-left rounded text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-colors flex items-center justify-between"
          >
            <span>ইউরোপ / সুইজারল্যান্ড</span>
            <span className="text-[9px] text-amber-500 font-mono">CH</span>
          </button>
          <button
            onClick={() => jumpToRegion('middleEast')}
            className="px-2 py-1 text-left rounded text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
          >
            মধ্যপ্রাচ্য
          </button>
          <button
            onClick={() => jumpToRegion('southAsia')}
            className="px-2 py-1 text-left rounded text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
          >
            দক্ষিণ এশিয়া
          </button>
          <button
            onClick={() => jumpToRegion('americas')}
            className="px-2 py-1 text-left rounded text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
          >
            আমেরিকা
          </button>
        </div>
      </div>

      {/* Legend Badge Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden md:flex items-center gap-4 px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-slate-300 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
          <span>রাজধানী</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 ring-2 ring-sky-400/30" />
          <span>আন্তর্জাতিক শহর ও সদর দপ্তর</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          <span>মার্কেটর প্রজেকশন (Mercator Projection)</span>
        </div>
      </div>

      {/* Main Vector SVG Map */}
      <svg
        viewBox="0 0 1000 560"
        className="w-full h-full"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.25s ease-out'
        }}
      >
        <defs>
          <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#091428" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <filter id="cityGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#f59e0b" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Ocean Background */}
        <rect width="1000" height="560" fill="url(#oceanGlow)" />

        {/* Mercator Projection Latitude / Longitude lines (Graticules from PDF page 1) */}
        {/* Equator (বিষুবরেখা 0°) */}
        <line x1="0" y1="280" x2="1000" y2="280" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
        <text x="10" y="276" fill="#475569" fontSize="7" fontFamily="sans-serif">
          বিষুবরেখা (০° Equator)
        </text>

        {/* Tropic of Cancer (কর্কটক্রান্তি ২৩.৫° উত্তর) */}
        <line x1="0" y1="210" x2="1000" y2="210" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="2,2" />
        <text x="10" y="206" fill="#475569" fontSize="6.5" fontFamily="sans-serif">
          কর্কটক্রান্তি (২৩.৫° উত্তর)
        </text>

        {/* Tropic of Capricorn (মকরক্রান্তি ২৩.৫° দক্ষিণ) */}
        <line x1="0" y1="350" x2="1000" y2="350" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="2,2" />
        <text x="10" y="346" fill="#475569" fontSize="6.5" fontFamily="sans-serif">
          মকরক্রান্তি (২৩.৫° দক্ষিণ)
        </text>

        {/* Prime Meridian (মূল মধ্যরেখা ০°) - Passes near London */}
        <line x1="500" y1="0" x2="500" y2="560" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
        <text x="504" y="20" fill="#475569" fontSize="6.5" fontFamily="sans-serif">
          মূল মধ্যরেখা (গ্রিনিচ ০°)
        </text>

        {/* Countries Layer */}
        <g id="countries">
          {WORLD_COUNTRY_PATHS.map((item) => {
            const countryData = countries.find((c) => c.id === item.id);
            const isSelected = selectedCountry?.id === item.id;
            const isHovered = hoveredCountry?.id === item.id;

            return (
              <path
                key={item.id}
                d={item.path}
                fill={
                  isSelected
                    ? '#38bdf8'
                    : isHovered
                    ? '#0284c7'
                    : item.id === 'CH'
                    ? '#f59e0b' // Highlight Switzerland
                    : '#1e293b'
                }
                fillOpacity={item.id === 'CH' ? 0.85 : isSelected ? 0.75 : isHovered ? 0.6 : 0.45}
                stroke={item.id === 'CH' ? '#fde047' : isSelected ? '#38bdf8' : '#334155'}
                strokeWidth={item.id === 'CH' ? 1.5 : isSelected ? 1.5 : 0.75}
                className="transition-colors duration-150 cursor-pointer"
                onMouseEnter={() => {
                  if (countryData) setHoveredCountry(countryData);
                }}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (countryData) onSelectCountry(countryData);
                }}
              />
            );
          })}
        </g>

        {/* Country Name Labels (Visible on moderate zoom) */}
        {transform.scale >= 1.4 &&
          WORLD_COUNTRY_PATHS.map((item) => {
            const [cx, cy] = projectMercator(item.center[0], item.center[1]);
            return (
              <text
                key={`lbl-${item.id}`}
                x={cx}
                y={cy}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize={item.id === 'CH' ? '9' : '7.5'}
                fontWeight={item.id === 'CH' ? 'bold' : 'normal'}
                className="pointer-events-none select-none drop-shadow"
              >
                {item.nameBn}
              </text>
            );
          })}

        {/* Cities Layer (Capitals and Major Cities from PDF) */}
        <g id="cities">
          {filteredCities.map((city) => {
            const [x, y] = projectMercator(city.coordinates[0], city.coordinates[1]);
            const isSelected = selectedCity?.id === city.id;
            const isHovered = hoveredCity?.id === city.id;
            const hasHeadquarters = city.headquarters && city.headquarters.length > 0;
            const isSwissCity = city.countryId === 'CH';

            return (
              <g
                key={city.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCity(city);
                }}
              >
                {/* Pulsing ring for headquarters & Switzerland cities */}
                {(hasHeadquarters || isSwissCity || isSelected) && (
                  <circle
                    r={isSelected ? 9 : 6.5}
                    fill="none"
                    stroke={isSwissCity ? '#f59e0b' : '#38bdf8'}
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    className="animate-spin opacity-80"
                    style={{ animationDuration: '6s' }}
                  />
                )}

                {/* City Core Dot */}
                <circle
                  r={isSelected ? 5.5 : city.isCapital ? 4.5 : 3.8}
                  fill={
                    city.isCapital
                      ? '#f59e0b'
                      : isSwissCity
                      ? '#fbbf24'
                      : '#38bdf8'
                  }
                  stroke="#020617"
                  strokeWidth="1.2"
                  filter={isSelected || isHovered ? 'url(#cityGlow)' : undefined}
                  className="transition-transform duration-150 group-hover:scale-125"
                />

                {/* Inner dot for capitals */}
                {city.isCapital && (
                  <circle r="1.5" fill="#ffffff" className="pointer-events-none" />
                )}

                {/* City Label */}
                {(transform.scale >= 2.0 || isSwissCity || isSelected || isHovered) && (
                  <text
                    x={city.coordinates[0] > 100 ? -8 : 8}
                    y={3}
                    textAnchor={city.coordinates[0] > 100 ? 'end' : 'start'}
                    fill={isHovered || isSelected ? '#fde047' : isSwissCity ? '#fcd34d' : '#e2e8f0'}
                    fontSize={isSwissCity ? '8.5' : '7.5'}
                    fontWeight={isSwissCity || city.isCapital ? 'bold' : 'normal'}
                    className="pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] select-none"
                  >
                    {city.nameBn}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Hover Tooltip */}
      {(hoveredCity || hoveredCountry) && (
        <div
          style={{
            left: `${Math.min(tooltipPos.x + 12, (containerRef.current?.clientWidth || 800) - 280)}px`,
            top: `${Math.min(tooltipPos.y + 12, (containerRef.current?.clientHeight || 500) - 180)}px`
          }}
          className="absolute z-40 pointer-events-none max-w-xs p-3 bg-slate-900/95 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-md transition-all text-slate-100"
        >
          {hoveredCity ? (
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-bold text-sm text-slate-100">{hoveredCity.nameBn}</span>
                  <span className="text-xs text-slate-400">({hoveredCity.nameEn})</span>
                </div>
                {hoveredCity.isCapital && (
                  <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                    রাজধানী
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  <span className="text-slate-400">দেশ: </span>
                  <span className="font-medium text-amber-300">{hoveredCity.countryBn}</span>
                </div>

                {hoveredCity.river && (
                  <div>
                    <span className="text-slate-400">নদী: </span>
                    <span>{hoveredCity.river}</span>
                  </div>
                )}

                {hoveredCity.sobriquetBn && (
                  <div>
                    <span className="text-slate-400">উপনাম: </span>
                    <span className="text-amber-200 font-medium">{hoveredCity.sobriquetBn}</span>
                  </div>
                )}

                {hoveredCity.headquarters && hoveredCity.headquarters.length > 0 && (
                  <div className="pt-1">
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      সদর দপ্তর ({hoveredCity.headquarters.length}টি):
                    </span>
                    <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                      {hoveredCity.headquarters.slice(0, 3).join(', ')}
                    </p>
                  </div>
                )}

                {hoveredCity.boldFacts && hoveredCity.boldFacts.length > 0 && (
                  <div className="pt-1 border-t border-slate-800/80">
                    <p className="text-[11px] text-amber-100/90 font-medium line-clamp-2">
                      ⭐ {hoveredCity.boldFacts[0]}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-2 pt-1 border-t border-slate-800 text-[10px] text-amber-400/90 font-medium">
                👉 ক্লিক করে সম্পূর্ণ বিবরণ ও প্রশ্ন দেখুন
              </div>
            </div>
          ) : hoveredCountry ? (
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-2">
                <span className="font-bold text-sm text-slate-100">{hoveredCountry.nameBn}</span>
                <span className="text-xs text-slate-400">({hoveredCountry.nameEn})</span>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  <span className="text-slate-400">রাজধানী: </span>
                  <span className="font-medium text-amber-300">{hoveredCountry.capitalBn}</span>
                </div>
                <div>
                  <span className="text-slate-400">মুদ্রা: </span>
                  <span>{hoveredCountry.currencyBn}</span>
                </div>
                {hoveredCountry.sobriquetsBn && (
                  <div>
                    <span className="text-slate-400">উপনাম: </span>
                    <span className="text-amber-200 font-medium">{hoveredCountry.sobriquetsBn.join(', ')}</span>
                  </div>
                )}
                {hoveredCountry.boldHighlights && hoveredCountry.boldHighlights.length > 0 && (
                  <div className="pt-1 border-t border-slate-800">
                    <p className="text-[11px] text-amber-200 line-clamp-2">
                      ⭐ {hoveredCountry.boldHighlights[0]}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-2 pt-1 border-t border-slate-800 text-[10px] text-amber-400/90 font-medium">
                👉 ক্লিক করে ইতিহাস, যুদ্ধ, মুদ্রা ও সংবিধান দেখুন
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

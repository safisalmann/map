import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { CountryInfo, CityInfo } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, Compass, MapPin, Building2 } from 'lucide-react';

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
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const linesLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeTileType, setActiveTileType] = useState<'dark' | 'topo' | 'osm'>('topo');

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

  // Helper to get tile configuration without ANY API Key requirement
  const getTileConfig = (type: 'dark' | 'topo' | 'osm') => {
    switch (type) {
      case 'dark':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
          maxZoom: 16
        };
      case 'topo':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom',
          maxZoom: 18
        };
      case 'osm':
      default:
        return {
          url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        };
    }
  };

  // Initialize Leaflet Map with real Web Mercator (EPSG:3857) projection
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Map in standard Mercator projection
    const map = L.map(mapContainerRef.current, {
      center: [25, 20],
      zoom: 2.2,
      minZoom: 1.8,
      maxZoom: 14,
      zoomControl: false,
      worldCopyJump: true,
      maxBounds: [
        [-85, -180],
        [85, 180]
      ],
      maxBoundsViscosity: 0.8
    });

    // 100% Free Open-Source Tile Layer (Zero API Key)
    const config = getTileConfig('topo');
    const initialTileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom
    }).addTo(map);

    tileLayerRef.current = initialTileLayer;

    // Create layer groups for markers and geographic graticule lines
    markersLayerRef.current = L.layerGroup().addTo(map);
    linesLayerRef.current = L.layerGroup().addTo(map);

    // Draw Mercator Reference Graticules from Retina Digest PDF Page 1
    // 1. বিষুবরেখা (Equator 0°)
    L.polyline([[0, -180], [0, 180]], {
      color: '#38bdf8',
      weight: 1.2,
      dashArray: '4, 4',
      opacity: 0.7
    }).bindTooltip('বিষুবরেখা / নিরক্ষরেখা (০° Equator)', { permanent: false, direction: 'top' })
      .addTo(linesLayerRef.current);

    // 2. কর্কটক্রান্তি রেখা (Tropic of Cancer 23.5° N)
    L.polyline([[23.5, -180], [23.5, 180]], {
      color: '#fbbf24',
      weight: 1.2,
      dashArray: '3, 4',
      opacity: 0.7
    }).bindTooltip('কর্কটক্রান্তি রেখা (২৩.৫° উত্তর - Tropic of Cancer)', { permanent: false, direction: 'top' })
      .addTo(linesLayerRef.current);

    // 3. মকরক্রান্তি রেখা (Tropic of Capricorn 23.5° S)
    L.polyline([[-23.5, -180], [-23.5, 180]], {
      color: '#fbbf24',
      weight: 1.2,
      dashArray: '3, 4',
      opacity: 0.7
    }).bindTooltip('মকরক্রান্তি রেখা (২৩.৫° দক্ষিণ - Tropic of Capricorn)', { permanent: false, direction: 'bottom' })
      .addTo(linesLayerRef.current);

    // 4. গ্রিনিচ মূল মধ্যরেখা (Prime Meridian 0°)
    L.polyline([[-85, 0], [85, 0]], {
      color: '#a855f7',
      weight: 1.2,
      dashArray: '4, 4',
      opacity: 0.7
    }).bindTooltip('গ্রিনিচ মূল মধ্যরেখা (০° Prime Meridian - লন্ডন)', { permanent: false, direction: 'right' })
      .addTo(linesLayerRef.current);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch Tile Layer when user changes map style
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const config = getTileConfig(activeTileType);
    tileLayerRef.current = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom
    }).addTo(map);

    // Ensure markers stay on top
    if (linesLayerRef.current) {
      linesLayerRef.current.eachLayer((l) => {
        if ('bringToFront' in l && typeof (l as any).bringToFront === 'function') {
          (l as any).bringToFront();
        }
      });
    }
    if (markersLayerRef.current) {
      markersLayerRef.current.eachLayer((l) => {
        if ('bringToFront' in l && typeof (l as any).bringToFront === 'function') {
          (l as any).bringToFront();
        }
      });
    }
  }, [activeTileType]);

  // Update Markers whenever filteredCities, selectedCity, or selectedCountry changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    filteredCities.forEach((city) => {
      const [lng, lat] = city.coordinates;
      const isSelected = selectedCity?.id === city.id;
      const hasHeadquarters = city.headquarters && city.headquarters.length > 0;
      const isSwiss = city.countryId === 'CH';

      // Custom HTML Marker Pin
      const pinColor = isSelected
        ? '#fde047'
        : isSwiss
        ? '#fbbf24'
        : city.isCapital
        ? '#f59e0b'
        : hasHeadquarters
        ? '#38bdf8'
        : '#94a3b8';

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        html: `
          <div style="position: relative; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${
              hasHeadquarters || isSwiss || isSelected
                ? `<div style="position: absolute; inset: 0px; border-radius: 9999px; border: 1.5px dashed ${pinColor}; animation: spin 8s linear infinite; opacity: 0.85;"></div>`
                : ''
            }
            <div style="
              width: ${isSelected ? '14px' : city.isCapital ? '12px' : '10px'};
              height: ${isSelected ? '14px' : city.isCapital ? '12px' : '10px'};
              border-radius: 9999px;
              background-color: ${pinColor};
              border: 2px solid #020617;
              box-shadow: 0 0 ${isSelected ? '10px' : '6px'} ${pinColor};
              transition: transform 0.15s ease;
            "></div>
          </div>
        `
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      // Rich Hover Tooltip with bold PDF info
      const tooltipContent = `
        <div style="font-family: 'Hind Siliguri', sans-serif; font-size: 12px; line-height: 1.4; padding: 2px 4px; min-width: 180px;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; margin-bottom: 4px;">
            <strong style="color: #ffffff; font-size: 13px;">${city.nameBn}</strong>
            <span style="color: #94a3b8; font-size: 11px;">(${city.nameEn})</span>
          </div>
          <div style="color: #f59e0b; font-weight: 500;">দেশ: ${city.countryBn}</div>
          ${city.isCapital ? '<div style="color: #38bdf8; font-size: 11px;">★ রাজধানী</div>' : ''}
          ${city.sobriquetBn ? `<div style="color: #fde047; font-size: 11px;">উপনাম: ${city.sobriquetBn}</div>` : ''}
          ${city.river ? `<div style="color: #94a3b8; font-size: 11px;">নদী: ${city.river}</div>` : ''}
          ${
            hasHeadquarters
              ? `<div style="color: #38bdf8; font-weight: 600; margin-top: 3px;">🏛️ সদর দপ্তর: ${city.headquarters?.length}টি</div>`
              : ''
          }
          ${
            city.boldFacts && city.boldFacts.length > 0
              ? `<div style="color: #e2e8f0; font-size: 11px; margin-top: 4px; padding-top: 3px; border-top: 1px dashed rgba(255,255,255,0.15);">★ ${city.boldFacts[0]}</div>`
              : ''
          }
          <div style="color: #f59e0b; font-size: 10px; margin-top: 4px; text-align: right;">👉 ক্লিক করে বিস্তারিত দেখুন</div>
        </div>
      `;

      marker.bindTooltip(tooltipContent, {
        direction: 'top',
        offset: [0, -10],
        opacity: 0.95,
        className: 'leaflet-custom-tooltip'
      });

      marker.on('click', () => {
        onSelectCity(city);
      });

      marker.addTo(markersLayer);
    });
  }, [filteredCities, selectedCity, onSelectCity]);

  // Fly to selected city or country when updated
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedCity) {
      const [lng, lat] = selectedCity.coordinates;
      map.flyTo([lat, lng], 6.5, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    } else if (selectedCountry && selectedCountry.cities.length > 0) {
      const firstCity = selectedCountry.cities[0];
      const [lng, lat] = firstCity.coordinates;
      map.flyTo([lat, lng], 5.0, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [selectedCity, selectedCountry]);

  // Region Jump Handlers
  const handleJumpToRegion = (region: 'world' | 'switzerland' | 'europe' | 'middleEast' | 'southAsia' | 'americas') => {
    const map = mapInstanceRef.current;
    if (!map) return;

    switch (region) {
      case 'world':
        map.flyTo([25, 20], 2.2, { duration: 1.2 });
        break;
      case 'switzerland':
        map.flyTo([46.8, 8.2], 8.0, { duration: 1.4 });
        break;
      case 'europe':
        map.flyTo([50, 10], 4.5, { duration: 1.2 });
        break;
      case 'middleEast':
        map.flyTo([28, 45], 4.2, { duration: 1.2 });
        break;
      case 'southAsia':
        map.flyTo([23, 85], 4.8, { duration: 1.2 });
        break;
      case 'americas':
        map.flyTo([20, -75], 3.2, { duration: 1.2 });
        break;
    }
  };

  return (
    <div className="relative w-full h-[600px] lg:h-[720px] bg-slate-950 overflow-hidden select-none">
      {/* Map Control Toolbar */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
        {/* Zoom Controls */}
        <div className="flex flex-col bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
          <button
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="জুম ইন (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-800" />
          <button
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="জুম আউট (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-800" />
          <button
            onClick={() => handleJumpToRegion('world')}
            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="বিশ্ব মানচিত্র রিসেট"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Region Jump Menu */}
        <div className="hidden sm:flex flex-col gap-1 p-2 bg-slate-900/95 border border-slate-800 rounded-xl text-xs backdrop-blur-md shadow-2xl">
          <span className="text-[10px] font-bold text-slate-400 px-1 py-0.5 uppercase tracking-wider">
            অঞ্চল নেভিগেশন
          </span>
          <button
            onClick={() => handleJumpToRegion('switzerland')}
            className="px-2 py-1.5 text-left rounded-lg text-amber-300 hover:text-amber-200 hover:bg-amber-950/40 transition-colors flex items-center justify-between font-semibold border border-amber-800/30"
          >
            <span>🇨🇭 সুইজারল্যান্ড</span>
            <span className="text-[10px] text-amber-400 font-mono">CH</span>
          </button>
          <button
            onClick={() => handleJumpToRegion('europe')}
            className="px-2 py-1 text-left rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            ইউরোপ
          </button>
          <button
            onClick={() => handleJumpToRegion('middleEast')}
            className="px-2 py-1 text-left rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            মধ্যপ্রাচ্য
          </button>
          <button
            onClick={() => handleJumpToRegion('southAsia')}
            className="px-2 py-1 text-left rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            দক্ষিণ এশিয়া
          </button>
          <button
            onClick={() => handleJumpToRegion('americas')}
            className="px-2 py-1 text-left rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            আমেরিকা
          </button>
        </div>

        {/* Map Tile Style Switcher */}
        <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-900/95 border border-slate-800 rounded-xl text-[11px] backdrop-blur-md shadow-2xl">
          <button
            onClick={() => setActiveTileType('dark')}
            className={`px-2 py-1 rounded-lg transition-colors ${
              activeTileType === 'dark'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ডার্ক
          </button>
          <button
            onClick={() => setActiveTileType('topo')}
            className={`px-2 py-1 rounded-lg transition-colors ${
              activeTileType === 'topo'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            টোপো
          </button>
          <button
            onClick={() => setActiveTileType('osm')}
            className={`px-2 py-1 rounded-lg transition-colors ${
              activeTileType === 'osm'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            OSM
          </button>
        </div>
      </div>

      {/* Legend Badge Bottom Left */}
      <div className="absolute bottom-4 left-4 z-[400] hidden md:flex items-center gap-4 px-3.5 py-2 bg-slate-900/95 border border-slate-800 rounded-xl text-xs text-slate-300 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
          <span>রাজধানী</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 ring-2 ring-sky-400/30" />
          <span>আন্তর্জাতিক সদর দপ্তর</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-300 ring-2 ring-amber-300/40" />
          <span>সুইস শহর (জেনেভা, বার্ন, জুরিখ...)</span>
        </div>
        <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium text-slate-200">ওপেন সোর্স মার্কেটর প্রজেকশন (EPSG:3857)</span>
        </div>
      </div>

      {/* Leaflet Map Div Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
};

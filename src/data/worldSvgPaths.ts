// Mercator projection math and SVG path coordinates for world countries and regions
export interface CountryPath {
  id: string;
  nameBn: string;
  nameEn: string;
  center: [number, number]; // [longitude, latitude]
  path: string; // SVG path data in 1000x560 coordinate space
}

// Convert Longitude & Latitude to standard Mercator SVG (1000 x 560 coordinate box)
export function projectMercator(lng: number, lat: number, width = 1000, height = 560): [number, number] {
  // Clamp latitude to avoid infinity at poles
  const clampedLat = Math.max(-82, Math.min(82, lat));
  const x = ((lng + 180) / 360) * width;
  
  const latRad = (clampedLat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  // Scale y to fit cleanly in height
  const y = (height / 2) - (width * mercN) / (2 * Math.PI);
  return [x, y];
}

// Curated high-fidelity vector paths for countries in a 1000x560 Mercator canvas
// Each country has its distinct shape and interactive hit area
export const WORLD_COUNTRY_PATHS: CountryPath[] = [
  {
    id: 'CH',
    nameBn: 'সুইজারল্যান্ড',
    nameEn: 'Switzerland',
    center: [8.2, 46.8],
    path: 'M519,197 L525,195 L528,198 L526,202 L520,202 L517,199 Z'
  },
  {
    id: 'GB',
    nameBn: 'যুক্তরাজ্য',
    nameEn: 'United Kingdom',
    center: [-2.2, 54.5],
    path: 'M485,155 L492,150 L496,160 L498,172 L490,178 L484,175 L482,165 Z M478,162 L481,162 L480,168 L476,166 Z'
  },
  {
    id: 'FR',
    nameBn: 'ফ্রান্স',
    nameEn: 'France',
    center: [2.2, 46.2],
    path: 'M495,182 L508,180 L517,188 L520,200 L512,210 L500,212 L492,205 L490,192 Z'
  },
  {
    id: 'DE',
    nameBn: 'জার্মানি',
    nameEn: 'Germany',
    center: [10.4, 51.1],
    path: 'M518,166 L530,165 L535,178 L533,192 L524,196 L518,190 L514,178 Z'
  },
  {
    id: 'IT',
    nameBn: 'ইতালি',
    nameEn: 'Italy',
    center: [12.5, 41.8],
    path: 'M522,203 L530,203 L536,212 L544,226 L550,230 L546,236 L538,230 L532,220 L528,214 Z M528,234 L536,234 L534,240 L527,238 Z'
  },
  {
    id: 'NL',
    nameBn: 'নেদারল্যান্ডস',
    nameEn: 'Netherlands',
    center: [5.2, 52.1],
    path: 'M510,168 L516,167 L517,175 L511,176 Z'
  },
  {
    id: 'BE',
    nameBn: 'বেলজিয়াম',
    nameEn: 'Belgium',
    center: [4.4, 50.5],
    path: 'M508,177 L515,176 L516,183 L509,184 Z'
  },
  {
    id: 'AT',
    nameBn: 'অস্ট্রিয়া',
    nameEn: 'Austria',
    center: [14.5, 47.5],
    path: 'M529,195 L545,193 L547,200 L533,202 Z'
  },
  {
    id: 'ES',
    nameBn: 'স্পেন',
    nameEn: 'Spain',
    center: [-3.7, 40.4],
    path: 'M474,208 L496,206 L498,218 L488,232 L472,230 L468,218 Z'
  },
  {
    id: 'PT',
    nameBn: 'পর্তুগাল',
    nameEn: 'Portugal',
    center: [-8.2, 39.3],
    path: 'M467,215 L474,215 L472,230 L465,228 Z'
  },
  {
    id: 'NO',
    nameBn: 'নরওয়ে',
    nameEn: 'Norway',
    center: [8.4, 60.4],
    path: 'M512,110 L525,100 L535,120 L526,145 L515,148 L516,132 Z'
  },
  {
    id: 'SE',
    nameBn: 'সুইডেন',
    nameEn: 'Sweden',
    center: [18.6, 60.1],
    path: 'M527,105 L545,108 L544,142 L532,156 L526,144 Z'
  },
  {
    id: 'FI',
    nameBn: 'ফিনল্যান্ড',
    nameEn: 'Finland',
    center: [25.7, 61.9],
    path: 'M546,104 L562,106 L560,136 L548,142 L544,120 Z'
  },
  {
    id: 'DK',
    nameBn: 'ডেনমার্ক',
    nameEn: 'Denmark',
    center: [9.5, 56.2],
    path: 'M518,150 L526,150 L527,160 L519,161 Z'
  },
  {
    id: 'GR',
    nameBn: 'গ্রিস',
    nameEn: 'Greece',
    center: [21.8, 39.0],
    path: 'M552,228 L562,226 L566,236 L558,244 L550,236 Z'
  },
  {
    id: 'TR',
    nameBn: 'তুরস্ক',
    nameEn: 'Turkey',
    center: [35.2, 38.9],
    path: 'M565,222 L605,220 L610,234 L570,236 Z'
  },
  {
    id: 'RU',
    nameBn: 'রাশিয়া',
    nameEn: 'Russia',
    center: [105.3, 61.5],
    path: 'M560,95 L650,90 L780,95 L880,105 L920,130 L870,170 L750,180 L620,185 L560,150 Z'
  },
  {
    id: 'UA',
    nameBn: 'ইউক্রেন',
    nameEn: 'Ukraine',
    center: [31.1, 48.3],
    path: 'M555,185 L585,183 L590,202 L560,205 Z'
  },
  {
    id: 'US',
    nameBn: 'মার্কিন যুক্তরাষ্ট্র',
    nameEn: 'United States',
    center: [-95.7, 37.0],
    path: 'M180,185 L280,185 L300,210 L285,250 L195,245 L175,215 Z M100,105 L150,100 L160,130 L115,135 Z'
  },
  {
    id: 'CA',
    nameBn: 'কানাডা',
    nameEn: 'Canada',
    center: [-106.3, 56.1],
    path: 'M160,90 L290,85 L320,130 L280,184 L170,184 L150,130 Z'
  },
  {
    id: 'MX',
    nameBn: 'মেক্সিকো',
    nameEn: 'Mexico',
    center: [-102.5, 23.6],
    path: 'M185,248 L225,248 L240,285 L215,295 L190,270 Z'
  },
  {
    id: 'BR',
    nameBn: 'ব্রাজিল',
    nameEn: 'Brazil',
    center: [-51.9, -14.2],
    path: 'M310,335 L375,340 L395,380 L350,430 L315,390 Z'
  },
  {
    id: 'AR',
    nameBn: 'আর্জেন্টিনা',
    nameEn: 'Argentina',
    center: [-63.6, -38.4],
    path: 'M310,430 L335,430 L330,510 L310,505 Z'
  },
  {
    id: 'EG',
    nameBn: 'মিশর',
    nameEn: 'Egypt',
    center: [30.8, 26.8],
    path: 'M565,250 L595,250 L593,285 L565,285 Z'
  },
  {
    id: 'ZA',
    nameBn: 'দক্ষিণ আফ্রিকা',
    nameEn: 'South Africa',
    center: [22.9, -30.5],
    path: 'M540,435 L580,435 L575,475 L545,475 Z'
  },
  {
    id: 'SA',
    nameBn: 'সৌদি আরব',
    nameEn: 'Saudi Arabia',
    center: [45.0, 23.8],
    path: 'M595,255 L635,260 L625,300 L595,290 Z'
  },
  {
    id: 'IR',
    nameBn: 'ইরান',
    nameEn: 'Iran',
    center: [53.6, 32.4],
    path: 'M615,225 L655,225 L650,260 L620,260 Z'
  },
  {
    id: 'IQ',
    nameBn: 'ইরাক',
    nameEn: 'Iraq',
    center: [43.6, 33.2],
    path: 'M600,230 L618,228 L620,248 L605,250 Z'
  },
  {
    id: 'PS',
    nameBn: 'ফিলিস্তিন',
    nameEn: 'Palestine',
    center: [35.2, 31.9],
    path: 'M582,246 L588,245 L587,252 L583,252 Z'
  },
  {
    id: 'IN',
    nameBn: 'ভারত',
    nameEn: 'India',
    center: [78.9, 20.5],
    path: 'M680,240 L730,240 L740,290 L710,340 L685,290 Z'
  },
  {
    id: 'BD',
    nameBn: 'বাংলাদেশ',
    nameEn: 'Bangladesh',
    center: [90.3, 23.6],
    path: 'M733,268 L744,266 L745,280 L736,282 Z'
  },
  {
    id: 'PK',
    nameBn: 'পাকিস্তান',
    nameEn: 'Pakistan',
    center: [69.3, 30.3],
    path: 'M655,235 L685,230 L685,270 L658,265 Z'
  },
  {
    id: 'CN',
    nameBn: 'চীন',
    nameEn: 'China',
    center: [104.1, 35.8],
    path: 'M690,195 L785,190 L810,245 L770,270 L710,250 Z'
  },
  {
    id: 'JP',
    nameBn: 'জাপান',
    nameEn: 'Japan',
    center: [138.2, 36.2],
    path: 'M835,210 L848,205 L858,230 L842,245 Z'
  },
  {
    id: 'AU',
    nameBn: 'অস্ট্রেলিয়া',
    nameEn: 'Australia',
    center: [133.7, -25.2],
    path: 'M800,380 L885,380 L895,445 L805,440 Z'
  },
  {
    id: 'NZ',
    nameBn: 'নিউজিল্যান্ড',
    nameEn: 'New Zealand',
    center: [174.8, -40.9],
    path: 'M925,455 L938,450 L942,475 L930,480 Z'
  },
  {
    id: 'ID',
    nameBn: 'ইন্দোনেশিয়া',
    nameEn: 'Indonesia',
    center: [113.9, -0.7],
    path: 'M760,335 L825,335 L830,355 L765,355 Z'
  }
];

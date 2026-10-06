import { CountryInfo, CityInfo } from '../types';
import { COUNTRIES_DATA } from './countriesData';
import { EXTRA_COUNTRIES } from './extraCountries';
import { CITIES_DATA } from './citiesData';

// Combine all countries
export const ALL_COUNTRIES: CountryInfo[] = [...COUNTRIES_DATA, ...EXTRA_COUNTRIES];

// Collect all cities
export const ALL_CITIES: CityInfo[] = [
  ...CITIES_DATA,
  ...EXTRA_COUNTRIES.flatMap((c) => c.cities || [])
];

// Helper lookup maps
export const COUNTRY_MAP = new Map<string, CountryInfo>(
  ALL_COUNTRIES.map((c) => [c.id, c])
);

export const CITY_MAP = new Map<string, CityInfo>(
  ALL_CITIES.map((c) => [c.id, c])
);

// High-yield quick-filter categories based on the PDF sections
export interface TopicCategory {
  id: string;
  nameBn: string;
  count: number;
  descriptionBn: string;
}

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    id: 'headquarters',
    nameBn: 'আন্তর্জাতিক সদর দপ্তর',
    count: 36,
    descriptionBn: 'জেনেভা, নিউইয়র্ক, ভিয়েনা, ব্রাসেলস, হেগ, প্যারিস, লন্ডন ও অন্যান্য শহরের সদর দপ্তর'
  },
  {
    id: 'wonders',
    nameBn: 'আধুনিক সপ্তাশ্চর্য ও স্থাপত্য',
    count: 7,
    descriptionBn: 'তাজমহল, কলোসিয়াম, পেত্রা, চীনের প্রাচীর, মাচু পিচু, চিচেন ইত্জা, ক্রাইস্ট দ্য রিডিমার'
  },
  {
    id: 'wars',
    nameBn: 'ঐতিহাসিক যুদ্ধ ও বিপ্লব',
    count: 14,
    descriptionBn: '১ম ও ২য় বিশ্বযুদ্ধ, ফরাসি বিপ্লব, বলশেভিক বিপ্লব, ক্যাম্প ডেভিড, অসলো চুক্তি ও অন্যান্য'
  },
  {
    id: 'personalities',
    nameBn: 'দার্শনিক ও বিশিষ্ট ব্যক্তিত্ব',
    count: 24,
    descriptionBn: 'সক্রেটিস, প্লেটো, এরিস্টটল, কনফুসিয়াস, রুশো, মার্কস, ম্যান্ডেলা, গান্ধী, আইনস্টাইন'
  },
  {
    id: 'sobriquets',
    nameBn: 'ভৌগোলিক উপনাম ও পুরাতন নাম',
    count: 42,
    descriptionBn: 'ইউরোপের ক্রীড়াঙ্গন, সম্মেলনের শহর, নিশীথ সূর্যের দেশ, হাজার হ্রদের দেশ ইত্যাদি'
  },
  {
    id: 'questions',
    nameBn: 'বিসিএস ও মেডিকেল বিগত প্রশ্ন',
    count: 65,
    descriptionBn: 'রেটিনা ডাইজেস্টে উল্লেখিত ১০ম-৫০তম বিসিএস ও মেডিকেল ভর্তি পরীক্ষার আসল প্রশ্ন'
  }
];

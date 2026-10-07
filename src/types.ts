export interface CityInfo {
  id: string;
  nameBn: string;
  nameEn: string;
  countryId: string;
  countryBn: string;
  isCapital?: boolean;
  coordinates: [number, number]; // [longitude, latitude]
  river?: string;
  sobriquetBn?: string;
  headquarters?: string[];
  landmarks?: string[];
  historyBn?: string[];
  notablePersonalities?: string[];
  boldFacts: string[];
  descriptionBn: string;
  photoUrl?: string;
  bcsQuestions?: { question: string; answer: string; exam: string }[];
}

export interface CountryInfo {
  id: string; // ISO 2 or standard id, e.g. "CH", "BD", "US", "FR"
  nameBn: string;
  nameEn: string;
  continentBn: string;
  capitalBn: string;
  capitalEn: string;
  currencyBn: string;
  sobriquetsBn?: string[]; // উপনাম যেমন 'ইউরোপের ক্রীড়াঙ্গন'
  ancientNamesBn?: string[]; // পুরাতন নাম যেমন 'হেলভেটিয়া'
  parliamentBn?: {
    name: string;
    type: 'এক-কক্ষ' | 'দ্বি-কক্ষ';
    upperHouse?: string | null;
    lowerHouse?: string | null;
  };
  nationalEmblemBn?: string;
  nationalSportBn?: string;
  airlinesBn?: string[];
  airportsBn?: string[];
  intelligenceBn?: string[];
  militaryBordersBn?: string[];
  historyAndWarsBn?: string[];
  notablePersonalitiesBn?: string[];
  headquartersBn?: string[];
  landmarksBn?: string[];
  disputedTerritoriesBn?: string[];
  boldHighlights: string[];
  bcsQuestions?: { question: string; answer: string; exam: string }[];
  cities: CityInfo[];
}

export type MapViewMode = 'all' | 'headquarters' | 'wars' | 'landmarks' | 'cities';

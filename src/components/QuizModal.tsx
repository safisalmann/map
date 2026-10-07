import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';

interface QuestionItem {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanationBn: string;
  exam: string;
}

const QUIZ_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    question: 'কোন শহরকে "সম্মেলনের শহর" বলা হয়?',
    options: ['জুরিখ', 'জেনেভা', 'নিউইয়র্ক', 'লন্ডন'],
    correctAnswer: 'জেনেভা',
    explanationBn: 'সুইজারল্যান্ডের জেনেভা শহরে সবচেয়ে বেশি আন্তর্জাতিক সংস্থার সদর দপ্তর ও বৈশ্বিক সম্মেলন অনুষ্ঠিত হওয়ায় একে সম্মেলনের শহর বলা হয়।',
    exam: 'CU 24-25'
  },
  {
    id: 2,
    question: 'কোন দেশকে "ইউরোপের ক্রীড়াঙ্গন" বলা হয়?',
    options: ['জার্মানি', 'বেলজিয়াম', 'সুইজারল্যান্ড', 'ইতালি'],
    correctAnswer: 'সুইজারল্যান্ড',
    explanationBn: 'প্রাকৃতিক আল্পস পর্বতমালা ও ক্রীড়ানুকূল পরিবেশের জন্য সুইজারল্যান্ডকে ইউরোপের ক্রীড়াঙ্গন বলা হয়।',
    exam: 'BCS'
  },
  {
    id: 3,
    question: 'আন্তর্জাতিক পুলিশ সংস্থা ইন্টারপোল (INTERPOL) এর সদর দপ্তর কোথায়?',
    options: ['প্যারিস', 'লিওঁ', 'লন্ডন', 'মার্সেই'],
    correctAnswer: 'লিওঁ',
    explanationBn: 'ইন্টারপোলের সদর দপ্তর ফ্রান্সের লিওঁ শহরে অবস্থিত।',
    exam: '25th BCS'
  },
  {
    id: 4,
    question: 'জাতিসংঘের আন্তর্জাতিক বিচার আদালত (ICJ) কোথায় অবস্থিত?',
    options: ['নিউইয়র্ক', 'লন্ডন', 'জেনেভা', 'হেগ'],
    correctAnswer: 'হেগ',
    explanationBn: 'নেদারল্যান্ডসের দ্য হেগ শহরের শান্তি প্রাসাদে (Peace Palace) আন্তর্জাতিক বিচার আদালত অবস্থিত।',
    exam: '34th BCS'
  },
  {
    id: 5,
    question: 'খাদ্য ও কৃষি সংস্থা (FAO) এর সদর দপ্তর কোথায়?',
    options: ['রোম', 'জেনেভা', 'ওয়াশিংটন', 'প্যারিস'],
    correctAnswer: 'রোম',
    explanationBn: 'জাতিসংঘের খাদ্য ও কৃষি সংস্থা এফএও (FAO) ইতালির রোমে অবস্থিত।',
    exam: '45th BCS'
  },
  {
    id: 6,
    question: 'কোন শহরকে "সাত পাহাড়ের শহর" বলা হয়?',
    options: ['রোম', 'লন্ডন', 'মস্কো', 'প্যারিস'],
    correctAnswer: 'রোম',
    explanationBn: 'সাতটি পাহাড়ের সমন্বয়ে গড়ে ওঠায় প্রাচীন রোম নগরীকে সাত পাহাড়ের শহর বলা হয়।',
    exam: '37th BCS'
  },
  {
    id: 7,
    question: 'কোন দেশকে "হাজার হ্রদের দেশ" বলা হয়?',
    options: ['নরওয়ে', 'সুইডেন', 'ফিনল্যান্ড', 'ডেনমার্ক'],
    correctAnswer: 'ফিনল্যান্ড',
    explanationBn: 'ফিনল্যান্ডে প্রায় ১ লক্ষ ৮৭ হাজারেরও বেশি হ্রদ থাকার কারণে একে হাজার হ্রদের দেশ বলা হয়।',
    exam: '30th BCS'
  },
  {
    id: 8,
    question: 'ম্যাগনা কার্টা (Magna Carta) কত সালে স্বাক্ষরিত হয়?',
    options: ['১২১৫', '১২২৫', '১২০০', '১২৪৮'],
    correctAnswer: '১২১৫',
    explanationBn: '১২১৫ সালে ইংল্যান্ডের রানিমীড প্রান্তরে রাজা জন ও সামন্তদের মাঝে ম্যাগনা কার্টা স্বাক্ষরিত হয়।',
    exam: '23rd BCS'
  },
  {
    id: 9,
    question: 'লন্ডন শহর কোন নদীর তীরে অবস্থিত?',
    options: ['সীন', 'টেমস', 'টাইবার', 'দানিয়ুব'],
    correctAnswer: 'টেমস',
    explanationBn: 'যুক্তরাজ্যের রাজধানী লন্ডন টেমস নদীর তীরে গড়ে উঠেছে।',
    exam: '36th BCS'
  },

  
  {
    id: 10,
    question: 'তাহরির স্কয়ার কোন দেশে অবস্থিত?',
    options: ['সিরিয়া', 'মিশর', 'ইরাক', 'তুরস্ক'],
    correctAnswer: 'মিশর',
    explanationBn: 'মিশরের রাজধানী কায়রোতে ঐতিহাসিক তাহরির স্কয়ার অবস্থিত (আরব বসন্ত ২০১১ এর কেন্দ্র)।',
    exam: '36th BCS'
  },

  {
    id: 11,
    question: 'কোন শহরকে "বাতাসের শহর" বলা হয়?',
    options: ['শিকাগো', 'টরন্টো', 'সিডনি', 'নিউইয়র্ক'],
    correctAnswer: 'শিকাগো',
    explanationBn: 'যুক্তরাষ্ট্রের ইলিনয় অঙ্গরাজ্যের শিকাগো শহরকে লেক মিশিগানের প্রবাহমান ঠান্ডা বাতাসের কারণে "বাতাসের শহর" (Windy City) বলা হয়।',
    exam: '42nd BCS'
  },
  {
    id: 12,
    question: 'কোন দেশকে "সূর্যোদয়ের দেশ" বলা হয়?',
    options: ['চীন', 'জাপান', 'নরওয়ে', 'থাইল্যান্ড'],
    correctAnswer: 'জাপান',
    explanationBn: 'জাপানি ভাষায় দেশটির নাম "নিপ্পন" যার অর্থ উদীয়মান সূর্যের দেশ। ভৌগোলিক অবস্থানের কারণে একে সূর্যোদয়ের দেশ বলা হয়।',
    exam: '31st BCS'
  },
  {
    id: 13,
    question: 'ইউনেস্কো (UNESCO)-এর সদর দপ্তর কোথায় অবস্থিত?',
    options: ['জেনেভা', 'প্যারিস', 'নিউইয়র্ক', 'ভিয়েনা'],
    correctAnswer: 'প্যারিস',
    explanationBn: 'জাতিসংঘ শিক্ষা, বিজ্ঞান ও সংস্কৃতি বিষয়ক সংস্থা (ইউনেস্কো)-এর সদর দপ্তর ফ্রান্সে প্যারিসে অবস্থিত।',
    exam: '38th BCS'
  },
  {
    id: 14,
    question: 'বিশ্ব স্বাস্থ্য সংস্থা (WHO)-এর সদর দপ্তর কোথায়?',
    options: ['রোম', 'লন্ডন', 'জেনেভা', 'ওয়াশিংটন'],
    correctAnswer: 'জেনেভা',
    explanationBn: '১৯৪৮ সালে প্রতিষ্ঠিত বিশ্ব স্বাস্থ্য সংস্থার সদর দপ্তর সুইজারল্যান্ডের জেনেভায় অবস্থিত।',
    exam: '40th BCS'
  },
  {
    id: 15,
    question: 'কোন দেশকে "ইউরোপের ককপিট" (Cockpit of Europe) বলা হয়?',
    options: ['বেলজিয়াম', 'সুইজারল্যান্ড', 'পোল্যান্ড', 'অস্ট্রিয়া'],
    correctAnswer: 'বেলজিয়াম',
    explanationBn: 'ইতিহাসে ইউরোপের বহু গুরুত্বপূর্ণ যুদ্ধ বেলজিয়ামের মাটিতে অনুষ্ঠিত হওয়ায় একে ইউরোপের ককপিট বা রণক্ষেত্র বলা হয়।',
    exam: '35th BCS'
  },
  {
    id: 16,
    question: 'প্যারিস শহর কোন নদীর তীরে অবস্থিত?',
    options: ['টাইবার', 'সীন', 'রাইন', 'টেমস'],
    correctAnswer: 'সীন',
    explanationBn: 'ফ্রান্সের রাজধানী প্যারিস বিখ্যাত সীন (Seine) নদীর তীরে অবস্থিত।',
    exam: '33rd BCS'
  },
  {
    id: 17,
    question: 'রেডক্রসের (ICRC) সদর দপ্তর কোথায় অবস্থিত?',
    options: ['হেগ', 'প্যারিস', 'জেনেভা', 'ব্রাসেলস'],
    correctAnswer: 'জেনেভা',
    explanationBn: '১৮৬৩ সালে হেনরি ডুনান্ট কর্তৃক প্রতিষ্ঠিত রেডক্রসের আন্তর্জাতিক কমিটির সদর দপ্তর সুইজারল্যান্ডের জেনেভায়।',
    exam: '29th BCS'
  },
  {
    id: 18,
    question: 'রেড স্কয়ার (Red Square) কোথায় অবস্থিত?',
    options: ['বেইজিং', 'মস্কো', 'বার্লিন', 'প্যারিস'],
    correctAnswer: 'মস্কো',
    explanationBn: 'রাশিয়ার রাজধানী মস্কোতে ক্রেমলিনের ঐতিহাসিক প্রাঙ্গণে রেড স্কয়ার অবস্থিত।',
    exam: '37th BCS'
  },
  {
    id: 19,
    question: 'কোন দেশকে "সাদা হাতির দেশ" বলা হয়?',
    options: ['মিয়ানমার', 'থাইল্যান্ড', 'লাওস', 'কম্বোডিয়া'],
    correctAnswer: 'থাইল্যান্ড',
    explanationBn: 'ঐতিহাসিক রাজকীয় ঐতিহ্য ও বিরল সাদা হাতির উপস্থিতির কারণে থাইল্যান্ডকে সাদা হাতির দেশ বলা হয়।',
    exam: '28th BCS'
  },
  {
    id: 20,
    question: 'কোন শহরকে "নীরব শহর" বা "সাসপেনশনের শহর" বলা হয়?',
    options: ['ভেনিস', 'রোম', 'ভিয়েনা', 'কায়রো'],
    correctAnswer: 'রোম',
    explanationBn: 'ঐতিহাসিক এবং প্রাচীন স্থায়িত্বের প্রতীক হিসেবে রোমকে অনেক সময় চিরন্তন শহর বা শান্ত নগরী হিসেবে অভিহিত করা হয়।',
    exam: 'DU 21-22'
  },
  {
    id: 21,
    question: 'আন্তর্জাতিক পরমাণু শক্তি সংস্থা (IAEA)-এর সদর দপ্তর কোথায়?',
    options: ['জেনেভা', 'ভিয়েনা', 'নিউইয়র্ক', 'প্যারিস'],
    correctAnswer: 'ভিয়েনা',
    explanationBn: '১৯৫৭ সালে প্রতিষ্ঠিত আন্তর্জাতিক পরমাণু শক্তি সংস্থা (IAEA)-এর সদর দপ্তর অষ্ট্রিয়ার ভিয়েনায় অবস্থিত।',
    exam: '41st BCS'
  },
  {
    id: 22,
    question: 'কোন দেশকে "ল্যান্ড অব মার্বেল" বা মার্বেলের দেশ বলা হয়?',
    options: ['ইতালি', 'গ্রিস', 'স্পেন', 'তুরস্ক'],
    correctAnswer: 'ইতালি',
    explanationBn: 'প্রচুর পরিমাণে উৎকৃষ্ট মানের মার্বেল পাথর উত্তোলিত হওয়ায় ইতালিকে মার্বেলের দেশ বলা হয়।',
    exam: 'CU 22-23'
  },
  {
    id: 23,
    question: 'ওয়াটারলু যুদ্ধক্ষেত্র কোন দেশে অবস্থিত?',
    options: ['ফ্রান্স', 'ইংল্যান্ড', 'বেলজিয়াম', 'জার্মানি'],
    correctAnswer: 'বেলজিয়াম',
    explanationBn: '১৮১৫ সালে নেপোলিয়ন বোনাপার্টের চূড়ান্ত পরাজয়ের ঐতিহাসিক ওয়াটারলু প্রাঙ্গণটি বেলজিয়ামে অবস্থিত।',
    exam: '26th BCS'
  },
  {
    id: 24,
    question: 'আফ্রিকান ইউনিয়ন (AU)-এর সদর দপ্তর কোথায় অবস্থিত?',
    options: ['নাইরোবি', 'আদ্দিস আবাবা', 'কায়রো', 'জোসেফ বার্গ'],
    correctAnswer: 'আদ্দিস আবাবা',
    explanationBn: 'আফ্রিকান ইউনিয়ন (AU)-এর সদর দপ্তর ইথিওপিয়ার রাজধানী আদ্দিস আবাবায় অবস্থিত।',
    exam: '43rd BCS'
  },
  {
    id: 25,
    question: 'কোন শহরকে "গগনচুম্বী অট্টালিকার শহর" (City of Skyscrapers) বলা হয়?',
    options: ['টোকিও', 'নিউইয়র্ক', 'দুবাই', 'সাংহাই'],
    correctAnswer: 'নিউইয়র্ক',
    explanationBn: 'বিপুল সংখ্যক উচ্চ ভবন ও বহুতল অট্টালিকার জন্য নিউইয়র্ক শহরকে গগনচুম্বী অট্টালিকার শহর বলা হয়।',
    exam: '32nd BCS'
  },
  {
    id: 26,
    question: 'সিলিকন ভ্যালি (Silicon Valley) কোথায় অবস্থিত?',
    options: ['ক্যালিফোর্নিয়া', 'টেক্সাস', 'নিউইয়র্ক', 'ফ্লোরিডা'],
    correctAnswer: 'ক্যালিফোর্নিয়া',
    explanationBn: 'যুক্তরাষ্ট্রের ক্যালিফোর্নিয়ার সান ফ্রান্সিসকো বে এরিয়ায় বিশ্বের শীর্ষ তথ্যপ্রযুক্তি কেন্দ্রের নাম সিলিকন ভ্যালি।',
    exam: '39th BCS'
  },
  {
    id: 27,
    question: 'বিশ্ব বাণিজ্য সংস্থা (WTO)-এর সদর দপ্তর কোথায়?',
    options: ['ওয়াশিংটন ডি.সি.', 'লন্ডন', 'জেনেভা', 'প্যারিস'],
    correctAnswer: 'জেনেভা',
    explanationBn: '১৯৯৫ সালে প্রতিষ্ঠিত বিশ্ব বাণিজ্য সংস্থা (WTO)-এর সদর দপ্তর সুইজারল্যান্ডের জেনেভায়।',
    exam: '35th BCS'
  },
  {
    id: 28,
    question: 'কোন দেশকে "হিমালয়ের কন্যা" বলা হয়?',
    options: ['নেপাল', 'ভুটান', 'বাংলাদেশ', 'ভারত'],
    correctAnswer: 'বাংলাদেশ',
    explanationBn: 'বাংলাদেশের পঞ্চগড় জেলা থেকে হিমালয় ও কাঞ্চনজঙ্ঘা দৃশ্যমান হওয়ায় পঞ্চগড়কে তথা ভৌগোলিকভাবে এই অঞ্চলকে হিমালয়ের কন্যা বলা হয়।',
    exam: 'RU 23-24'
  },
  {
    id: 29,
    question: 'কায়রো শহর কোন নদীর তীরে অবস্থিত?',
    options: ['আমাজন', 'নিল নদ', 'মিসিচিপি', 'কঙ্গো'],
    correctAnswer: 'নিল নদ',
    explanationBn: 'মিশরের রাজধানী কায়রো বিশ্বের দীর্ঘতম নদী নিল নদের (Nile) তীরে অবস্থিত।',
    exam: '27th BCS'
  },
  {
    id: 30,
    question: 'ট্রাফালগার স্কয়ার (Trafalgar Square) কোথায় অবস্থিত?',
    options: ['প্যারিস', 'নিউইয়র্ক', 'লন্ডন', 'মাদ্রিদ'],
    correctAnswer: 'লন্ডন',
    explanationBn: '১৮০৫ সালের ট্রাফালগার যুদ্ধের স্মৃতি রক্ষার্থে ইংল্যান্ডের সেন্ট্রাল লন্ডনে এই ঐতিহাসিক স্কয়ার গড়ে তোলা হয়।',
    exam: '38th BCS'
  }

  
];

interface QuizModalProps {
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const userChoice = selectedAnswers[currentQ.id];

  const handleSelectOption = (option: string) => {
    if (userChoice) return; // Already answered
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">বিসিএস ও মেডিকেল ভর্তি কুইজ</h3>
              <p className="text-xs text-slate-400">প্রশ্নাবলি</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto">
          {!isFinished ? (
            <div className="space-y-5">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  প্রশ্ন {currentIndex + 1} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-amber-300">
                  {currentQ.exam}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = userChoice === option;
                  const isCorrect = option === currentQ.correctAnswer;
                  const showResult = !!userChoice;

                  let btnStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showResult}
                      onClick={() => handleSelectOption(option)}
                      className={`w-full p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono">
                          {['ক', 'খ', 'গ', 'ঘ'][idx]}
                        </span>
                        <span>{option}</span>
                      </div>

                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when answered */}
              {userChoice && (
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 space-y-1">
                  <span className="font-semibold text-amber-400 block">ব্যাখ্যা</span>
                  <p>{currentQ.explanationBn}</p>
                </div>
              )}

              {/* Next Button */}
              {userChoice && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                      } else {
                        setIsFinished(true);
                      }
                    }}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/10"
                  >
                    <span>
                      {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Finished Result Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">পরীক্ষা সম্পন্ন হয়েছে!</h4>
                <p className="text-sm text-slate-400 mt-1">আন্তর্জাতিক সাধারণ জ্ঞান</p>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl max-w-xs mx-auto">
                <span className="text-xs text-slate-400 block mb-1">আপনার স্কোর</span>
                <span className="text-3xl font-extrabold text-amber-400">
                  {calculateScore()} / {QUIZ_QUESTIONS.length}
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  {calculateScore() >= 8
                    ? '🎉 অসাধারণ প্রস্তুতি! মেডিকেলে চান্স নিশ্চিত।'
                    : calculateScore() >= 5
                    ? '👍 ভালো প্রচেষ্টা! আরেকটু রিভিশন দিলে পূর্ণ নম্বর পাওয়া যাবে।'
                    : '📖 মানচিত্রটি পুনরায় ঘুরে দেখুন ও বোল্ড পয়েন্টগুলো পড়ুন।'}
                </p>
              </div>

              <div className="flex items-center gap-3 justify-center pt-2">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>পুনরায় চেষ্টা করুন</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-colors"
                >
                  মানচিত্রে ফিরুন
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

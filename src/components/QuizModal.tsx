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
              <p className="text-xs text-slate-400">রেটিনা ডাইজেস্টে উল্লেখিত আসল প্রশ্নাবলি</p>
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
                  <span className="font-semibold text-amber-400 block">ব্যাখ্যা (রেটিনা ডাইজেস্ট):</span>
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
                <p className="text-sm text-slate-400 mt-1">রেটিনা ডাইজেস্ট আন্তর্জাতিক সাধারণ জ্ঞান</p>
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

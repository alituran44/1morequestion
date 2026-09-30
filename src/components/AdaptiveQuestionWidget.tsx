"use client";

import { useState } from "react";
import { Check, X, Flame, Sparkles, ArrowRight, RotateCcw, BookOpen } from "lucide-react";

export interface PoolQuestion {
  id: string;
  cefrLevel: string;
  skillDomain: string;
  subTopic: string;
  content: string;
  passage?: string | null;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

interface AdaptiveQuestionWidgetProps {
  initialQuestion?: PoolQuestion;
  onQuestionCompleted?: (questionId: string, isCorrect: boolean) => void;
}

export function AdaptiveQuestionWidget({
  initialQuestion,
  onQuestionCompleted,
}: AdaptiveQuestionWidgetProps) {
  // Demo questions if none provided
  const defaultQuestions: PoolQuestion[] = [
    {
      id: "demo-q1",
      cefrLevel: "B2",
      skillDomain: "Grammar",
      subTopic: "Conditionals",
      content: "If the government ______ stricter regulations earlier, the environmental crisis could have been mitigated significantly.",
      options: [
        { key: "A", text: "had implemented" },
        { key: "B", text: "implements" },
        { key: "C", text: "would implement" },
        { key: "D", text: "has implemented" },
        { key: "E", text: "were to implement" },
      ],
      correctKey: "A",
      explanation: "Geçmişte gerçekleşmemiş bir durumun sonucunu bildiren Type 3 Conditional yapısında temel cümle 'could have been mitigated' olduğu için koşul yan cümlesi 'Past Perfect (had implemented)' olmalıdır.",
    },
    {
      id: "demo-q2",
      cefrLevel: "C1",
      skillDomain: "Vocabulary",
      subTopic: "Phrasal_Verbs",
      content: "Scientists are persistently trying to ______ the underlying genetic factors that trigger sudden neurological degradation in early adulthood.",
      options: [
        { key: "A", text: "figure out" },
        { key: "B", text: "look down on" },
        { key: "C", text: "put up with" },
        { key: "D", text: "run out of" },
        { key: "E", text: "make do with" },
      ],
      correctKey: "A",
      explanation: "'Figure out' (anlamak, çözmek, aydınlatmak) anlamına gelir ve bilim insanlarının genetik faktörleri çözmeye çalışması bağlamına tam oturur.",
    },
    {
      id: "demo-q3",
      cefrLevel: "B1",
      skillDomain: "Vocabulary",
      subTopic: "Collocations",
      content: "She made a significant ______ to the research project by analyzing all the collected historical archives.",
      options: [
        { key: "A", text: "contribution" },
        { key: "B", text: "complaint" },
        { key: "C", text: "hesitation" },
        { key: "D", text: "destruction" },
        { key: "E", text: "precaution" },
      ],
      correctKey: "A",
      explanation: "'Make a contribution to' (bir şeye katkıda bulunmak) sık kullanılan sabit bir kalıptır (collocation).",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(3);

  const question = initialQuestion || defaultQuestions[currentIndex % defaultQuestions.length];

  const handleSelectOption = (key: string) => {
    if (isAnswered) return;
    setSelectedKey(key);
    setIsAnswered(true);

    const isCorrect = key === question.correctKey;
    if (isCorrect) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    onQuestionCompleted?.(question.id, isCorrect);
  };

  const handleNext = () => {
    setSelectedKey(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % defaultQuestions.length);
  };

  const isCorrect = selectedKey === question.correctKey;

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl shadow-black/50 relative overflow-hidden">
      {/* Top Bar: Subtopic, CEFR & Streak */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
            {question.cefrLevel}
          </span>
          <span className="text-xs font-semibold text-slate-300">
            {question.skillDomain} • <span className="text-slate-400 font-normal">{question.subTopic.replace("_", " ")}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
          <Flame className="w-3.5 h-3.5 fill-amber-400" />
          <span>{streak} Streak</span>
        </div>
      </div>

      {/* Optional Passage */}
      {question.passage && (
        <div className="p-4 mb-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
          {question.passage}
        </div>
      )}

      {/* Question Content */}
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-wider font-bold text-sky-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>1 Soru Daha — Eksik Kazanım Telafisi</span>
        </div>
        <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
          {question.content}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2.5 mb-6">
        {question.options.map((opt) => {
          let btnStyle = "bg-slate-900/60 hover:bg-slate-850 border-slate-800 text-slate-200";

          if (isAnswered) {
            if (opt.key === question.correctKey) {
              btnStyle = "bg-emerald-950/70 border-emerald-500/70 text-emerald-200 ring-1 ring-emerald-500";
            } else if (opt.key === selectedKey) {
              btnStyle = "bg-rose-950/70 border-rose-500/70 text-rose-200 ring-1 ring-rose-500";
            } else {
              btnStyle = "bg-slate-950/40 border-slate-850 text-slate-500 opacity-60";
            }
          }

          return (
            <button
              key={opt.key}
              onClick={() => handleSelectOption(opt.key)}
              disabled={isAnswered}
              className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                  {opt.key}
                </span>
                <span>{opt.text}</span>
              </div>

              {isAnswered && opt.key === question.correctKey && (
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isAnswered && opt.key === selectedKey && opt.key !== question.correctKey && (
                <X className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Pedagogical Explanation & '1 More' Next Button */}
      {isAnswered && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
            <BookOpen className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-100">Çözüm & Analiz: </span>
              {question.explanation}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div className="text-xs font-semibold">
              {isCorrect ? (
                <span className="text-emerald-400 font-bold">Harika! Kazanım pekiştirildi.</span>
              ) : (
                <span className="text-rose-400 font-bold">Akıllı Hata Defterine eklendi.</span>
              )}
            </div>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-sky-950 transition-all hover:scale-[1.02]"
            >
              <span>1 Soru Daha</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { 
  Check, 
  X, 
  Target, 
  Sparkles, 
  Award, 
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Mic,
  PenTool,
  Headphones
} from "lucide-react";
import { EXAM_SYSTEMS, ExamSystemConfig } from "@/lib/exam-systems";

interface ExamOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExamCodes: string[];
  onSave: (examCodes: string[]) => void;
}

export function ExamOnboardingModal({
  isOpen,
  onClose,
  selectedExamCodes,
  onSave,
}: ExamOnboardingModalProps) {
  const [selected, setSelected] = useState<string[]>(selectedExamCodes);

  useEffect(() => {
    setSelected(selectedExamCodes);
  }, [selectedExamCodes]);

  if (!isOpen) return null;

  const toggleExam = (code: string) => {
    setSelected((prev) =>
      prev.includes(code)
        ? prev.length > 1
          ? prev.filter((c) => c !== code)
          : prev // en az 1 tane seçili kalmalı
        : [...prev, code]
    );
  };

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("1mq_target_exams", JSON.stringify(selected));
    }
    onSave(selected);
    onClose();
  };

  const [activeCategoryTab, setActiveCategoryTab] = useState<"ALL" | "NATIONAL" | "UNIVERSITY" | "INTERNATIONAL">("ALL");

  const getCategoryBadge = (category: string) => {
    if (category === "NATIONAL") {
      return { label: "ÖSYM / Ulusal", className: "bg-sky-50 text-sky-700 border-sky-200" };
    }
    if (category === "UNIVERSITY") {
      return { label: "Üniversite Hazırlık", className: "bg-teal-50 text-teal-700 border-teal-200" };
    }
    return { label: "Uluslararası", className: "bg-purple-50 text-purple-700 border-purple-200" };
  };

  const examsList = Object.values(EXAM_SYSTEMS).filter((exam) => {
    if (activeCategoryTab === "ALL") return true;
    return exam.category === activeCategoryTab;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-200 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Target className="w-3.5 h-3.5 text-amber-600" />
              <span>Kişiselleştirilmiş Öğrenme & Sınav Tercihleri</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Hazırlandığınız Sınavları Seçin
            </h2>
            <p className="text-xs text-slate-500 max-w-xl">
              Platformdaki deneme sınavları, "1 Soru Daha" adaptif soru havuzları ve müfredat akışı seçtiğiniz sınavların beceri dağılımına (Okuma, Yazma, Konuşma, Dinleme) göre otomatik optimize edilir.
            </p>

            {/* Category Filter Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3">
              <button
                type="button"
                onClick={() => setActiveCategoryTab("ALL")}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeCategoryTab === "ALL"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                Tüm Sınavlar
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab("UNIVERSITY")}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeCategoryTab === "UNIVERSITY"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-teal-50 text-teal-800 hover:text-teal-950 border border-teal-200"
                }`}
              >
                🎓 Üniversite Hazırlık Atlama (İYS / BUEPT)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab("NATIONAL")}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeCategoryTab === "NATIONAL"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                ÖSYM / Ulusal (YDT / YDS)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab("INTERNATIONAL")}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeCategoryTab === "INTERNATIONAL"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                Uluslararası (IELTS / TOEFL)
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Exams Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-3 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {examsList.map((exam) => {
              const isSelected = selected.includes(exam.code);
              const badge = getCategoryBadge(exam.category);

              return (
                <div
                  key={exam.code}
                  onClick={() => toggleExam(exam.code)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                    isSelected
                      ? "bg-amber-50/50 border-amber-500 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">
                          {exam.shortTitle}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${badge.className}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {exam.description}
                      </p>
                    </div>

                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? "bg-amber-500 border-amber-500 text-slate-950 font-black"
                        : "border-slate-300 text-transparent"
                    }`}>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>

                  {/* Skills contained in this exam */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                    {exam.skillDistribution.map((skill) => (
                      <span
                        key={skill.domain}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center gap-1"
                      >
                        <span>{skill.icon}</span>
                        <span>{skill.label.split(" ")[0]}</span>
                      </span>
                    ))}
                    <span className="text-[10px] font-bold text-slate-400 ml-auto font-mono">
                      {exam.scoringLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Seçili: <strong className="text-slate-900">{selected.length} Sınav Sistemi</strong> (İstediğiniz zaman değiştirebilirsiniz)
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-xs"
            >
              Vazgeç
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Seçimleri Kaydet & Başla</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

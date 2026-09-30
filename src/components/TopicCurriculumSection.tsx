"use client";

import { useState } from "react";
import { 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  Mic,
  PenTool,
  Headphones,
  CheckCircle2,
  Layers,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { EXAM_SYSTEMS, SkillDomain } from "@/lib/exam-systems";

interface TopicCurriculumSectionProps {
  initialExamCode?: string;
}

export function TopicCurriculumSection({ initialExamCode = "IELTS" }: TopicCurriculumSectionProps) {
  const [selectedExamCode, setSelectedExamCode] = useState<string>(initialExamCode);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string>("");

  const currentExam = EXAM_SYSTEMS[selectedExamCode] || EXAM_SYSTEMS.IELTS;

  const filteredCategories = currentExam.categories.filter((cat) => {
    if (selectedSkillFilter === "ALL") return true;
    return cat.domain === selectedSkillFilter;
  });

  return (
    <section className="space-y-6 pt-6 border-t border-slate-200">
      {/* Top Section Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-black tracking-tight text-slate-900">
            Soru Havuzu & Kazanım Müfredatı
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
            10 Sınav Sistemi • Çoklu Beceri
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Hazırlık atlama (İYS / BUEPT / PAE), ÖSYM ve uluslararası sınav standartlarında kazanım ağacı
        </p>
      </div>

      {/* 2-Column Master-Detail Layout: Left Vertical Exam List + Right Curriculum */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left Column: Vertical Exam Navigation List */}
        <aside className="w-full lg:w-72 xl:w-80 shrink-0 bg-white border border-slate-200 rounded-3xl p-3.5 shadow-xs space-y-3 lg:sticky lg:top-6">
          <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-100">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Sınav Sistemleri
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {Object.keys(EXAM_SYSTEMS).length} Sınav
            </span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-[640px] overflow-y-auto pr-0.5 scrollbar-thin">
            {Object.values(EXAM_SYSTEMS).map((exam) => {
              const isSelected = selectedExamCode === exam.code;
              const isUniversity = exam.category === "UNIVERSITY";
              const isNational = exam.category === "NATIONAL";

              return (
                <button
                  key={exam.code}
                  onClick={() => {
                    setSelectedExamCode(exam.code);
                    setSelectedSkillFilter("ALL");
                  }}
                  className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-2 group border ${
                    isSelected
                      ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black"
                      : "bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/80 text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs ${isSelected ? "font-black text-slate-950" : "font-extrabold text-slate-900"}`}>
                        {exam.shortTitle}
                      </span>
                      {isUniversity && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-black ${
                          isSelected ? "bg-slate-950 text-amber-300" : "bg-teal-100 text-teal-800"
                        }`}>
                          Hazırlık
                        </span>
                      )}
                    </div>
                    <div className={`text-[10px] truncate ${isSelected ? "text-slate-900 font-medium" : "text-slate-500"}`}>
                      {isUniversity ? "Üniversite Muafiyet" : isNational ? "ÖSYM / Ulusal" : "Uluslararası"} • {exam.totalQuestions} Soru
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? "text-slate-950 translate-x-0.5" : "text-slate-400 group-hover:text-slate-600"
                  }`} />
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Selected Exam's Details & Categories Grid */}
        <div className="flex-1 min-w-0 w-full space-y-5">
          {/* Active Exam Header Summary */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {currentExam.name}
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  currentExam.category === "UNIVERSITY"
                    ? "bg-teal-50 text-teal-700 border-teal-200"
                    : currentExam.category === "NATIONAL"
                    ? "bg-sky-50 text-sky-700 border-sky-200"
                    : "bg-purple-50 text-purple-700 border-purple-200"
                }`}>
                  {currentExam.category === "UNIVERSITY" ? "🎓 Hazırlık Atlama" : currentExam.category === "NATIONAL" ? "ÖSYM / Ulusal" : "Uluslararası"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {currentExam.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 shrink-0 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              <span>{currentExam.durationMins} Dk</span>
              <span className="text-slate-300">•</span>
              <span>{currentExam.totalQuestions} Soru</span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-700 font-extrabold">{currentExam.scoringLabel}</span>
            </div>
          </div>

          {/* Skill Tabs Filter (All, Reading, Writing, Speaking, Listening, Grammar) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedSkillFilter("ALL")}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedSkillFilter === "ALL"
                  ? "bg-amber-500 text-slate-950 shadow-xs font-black"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              Tüm Beceriler ({currentExam.categories.length})
            </button>

            {currentExam.skillDistribution.map((skill) => (
              <button
                key={skill.domain}
                onClick={() => setSelectedSkillFilter(skill.domain)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedSkillFilter === skill.domain
                    ? "bg-amber-500 text-slate-950 shadow-xs font-black"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                <span>{skill.icon}</span>
                <span>{skill.label}</span>
              </button>
            ))}
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredCategories.map((cat, idx) => {
              const isExpanded = expandedId === cat.id;

              return (
                <div
                  key={cat.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden transition-all shadow-xs group"
                >
                  {/* Category Header Card */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? "" : cat.id)}
                    className="p-5 flex items-center justify-between cursor-pointer select-none bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-base text-amber-600 shadow-xs">
                        {cat.domain === "SPEAKING" ? "🎙️" : cat.domain === "WRITING" ? "✍️" : cat.domain === "LISTENING" ? "🎧" : "📖"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                            {cat.name}
                          </h3>
                          {cat.isAudioRequired && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold flex items-center gap-1">
                              <Mic className="w-2.5 h-2.5" />
                              Ses Kaydı
                            </span>
                          )}
                          {cat.isWritingRequired && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-bold flex items-center gap-1">
                              <PenTool className="w-2.5 h-2.5" />
                              Essay
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {cat.questionCount} Havuz Sorusu • Zorluk: <strong className="text-slate-700">{cat.difficulty}</strong>
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isExpanded ? "rotate-90 text-amber-600" : ""
                      }`}
                    />
                  </div>

                  {/* Detailed Breakdown when Expanded */}
                  {isExpanded && (
                    <div className="p-4 pt-3 bg-white space-y-3 border-t border-slate-100">
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                        {cat.description}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-semibold text-slate-500">
                          Adaptif "1 Soru Daha" Modülü Hazır
                        </span>
                        <Link
                          href={`/exam/${selectedExamCode.toLowerCase()}-demo`}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all shadow-xs flex items-center gap-1.5"
                        >
                          <span>1 Soru Çöz</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

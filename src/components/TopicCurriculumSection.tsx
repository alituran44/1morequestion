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
  HelpCircle,
  GraduationCap,
  Calendar,
  Clock,
  Target,
  Award,
  Flame,
  Check,
  Compass,
  FileText
} from "lucide-react";
import Link from "next/link";
import { EXAM_SYSTEMS, SkillDomain, ExamSystemConfig } from "@/lib/exam-systems";

interface TopicCurriculumSectionProps {
  initialExamCode?: string;
}

type CategoryTab = "ALL" | "UNIVERSITY" | "NATIONAL" | "INTERNATIONAL";
type ViewMode = "CURRICULUM" | "PLANNER";

export function TopicCurriculumSection({ initialExamCode = "BUEPT" }: TopicCurriculumSectionProps) {
  const [categoryTab, setCategoryTab] = useState<CategoryTab>("UNIVERSITY");
  const [selectedExamCode, setSelectedExamCode] = useState<string>(initialExamCode);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("PLANNER");

  // Planner interactive state
  const [currentLevel, setCurrentLevel] = useState<"A2" | "B1" | "B2">("B1");
  const [targetDuration, setTargetDuration] = useState<"30" | "60" | "90" | "SEPTEMBER">("60");
  const [dailyHours, setDailyHours] = useState<"1_2" | "2_3" | "4_PLUS">("2_3");
  const [isPlanSaved, setIsPlanSaved] = useState<boolean>(false);

  const currentExam = EXAM_SYSTEMS[selectedExamCode] || EXAM_SYSTEMS.BUEPT;
  const isUniversity = currentExam.category === "UNIVERSITY";

  // Filter exams for sidebar
  const visibleExams = Object.values(EXAM_SYSTEMS).filter((exam) => {
    if (categoryTab === "ALL") return true;
    return exam.category === categoryTab;
  });

  const filteredCategories = currentExam.categories.filter((cat) => {
    if (selectedSkillFilter === "ALL") return true;
    return cat.domain === selectedSkillFilter;
  });

  // University list for quick university switcher
  const universityExams = Object.values(EXAM_SYSTEMS).filter(
    (e) => e.category === "UNIVERSITY"
  );

  const handleSelectExam = (code: string) => {
    setSelectedExamCode(code);
    setSelectedSkillFilter("ALL");
    setIsPlanSaved(false);
  };

  const handleSavePlan = () => {
    setIsPlanSaved(true);
    setTimeout(() => {
      setIsPlanSaved(false);
    }, 4000);
  };

  return (
    <section className="space-y-6 pt-6 border-t border-[#d9dde8]">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[20px] font-bold tracking-tight text-[#282e3e]">
              Üniversite Hazırlık Atlama & Müfredat Planlayıcı
            </h2>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#edefff] text-[#4255ff] border border-[#d9dde8] font-semibold flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              Üniversiteye Özel Sınav Formatı
            </span>
          </div>
          <p className="text-[13px] text-[#586380]">
            Hedef üniversitenizi seçin; sınav formatına (BUEPT, EPE, İYS, PAE, KUEPE, ELAE) göre hazırlanmış haftalık çalışma takviminizi ve soru hedeflerinizi belirleyin.
          </p>
        </div>

        {/* Global Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f6f7fb] border border-[#d9dde8] rounded-[200px] shrink-0 self-start md:self-auto overflow-x-auto">
          {[
            { id: "UNIVERSITY" as CategoryTab, label: "🎓 Hazırlık Atlama" },
            { id: "NATIONAL" as CategoryTab, label: "ÖSYM / Ulusal" },
            { id: "INTERNATIONAL" as CategoryTab, label: "Uluslararası" },
            { id: "ALL" as CategoryTab, label: "Tümü" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCategoryTab(tab.id);
                if (tab.id === "UNIVERSITY" && !isUniversity) {
                  setSelectedExamCode("BUEPT");
                }
              }}
              className={`text-xs px-3.5 py-1.5 rounded-[200px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                categoryTab === tab.id
                  ? "bg-[#4255ff] text-white shadow-xs"
                  : "text-[#586380] hover:text-[#282e3e]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick University Selection Strip when in Hazırlık mode */}
      {(categoryTab === "UNIVERSITY" || isUniversity) && (
        <div className="p-4 rounded-[12px] bg-[#f6f7fb] border border-[#d9dde8] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#282e3e] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#4255ff]" />
              Hangi Üniversitenin Hazırlık Sınavına Gireceksiniz?
            </span>
            <span className="text-[11px] font-medium text-[#586380]">
              Seçilen Sınav: <strong className="text-[#4255ff]">{currentExam.shortTitle}</strong>
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {universityExams.map((uni) => {
              const isSelected = selectedExamCode === uni.code;
              return (
                <button
                  key={uni.code}
                  onClick={() => handleSelectExam(uni.code)}
                  className={`px-3 py-1.5 rounded-[200px] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? "bg-[#4255ff] text-white border-[#4255ff] shadow-xs"
                      : "bg-white text-[#282e3e] border-[#d9dde8] hover:border-[#4255ff] hover:text-[#4255ff]"
                  }`}
                >
                  <span>{uni.shortTitle.split(" (")[0]}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#f6f7fb] text-[#586380]"
                  }`}>
                    {uni.code.replace("_", " ")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2-Column Master-Detail Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left Column: Sınav Listesi */}
        <aside className="w-full lg:w-72 xl:w-80 shrink-0 bg-white border border-[#d9dde8] rounded-[12px] p-3.5 shadow-xs space-y-3 lg:sticky lg:top-6">
          <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-[#d9dde8]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#586380]">
              {categoryTab === "UNIVERSITY" ? "Hazırlık Üniversiteleri" : "Sınav Sistemleri"}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f6f7fb] text-[#586380] border border-[#d9dde8]">
              {visibleExams.length} Sınav
            </span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-[640px] overflow-y-auto pr-0.5 scrollbar-thin">
            {visibleExams.map((exam) => {
              const isSelected = selectedExamCode === exam.code;
              const isUniv = exam.category === "UNIVERSITY";
              const isNat = exam.category === "NATIONAL";

              return (
                <button
                  key={exam.code}
                  onClick={() => handleSelectExam(exam.code)}
                  className={`w-full text-left p-3 rounded-[8px] transition-all cursor-pointer flex items-center justify-between gap-2 group border ${
                    isSelected
                      ? "bg-[#4255ff] text-white border-[#4255ff] shadow-xs"
                      : "bg-[#f6f7fb]/70 hover:bg-[#edefff] border-[#d9dde8] text-[#282e3e] hover:text-[#4255ff]"
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs ${isSelected ? "font-bold text-white" : "font-bold text-[#282e3e]"}`}>
                        {exam.shortTitle}
                      </span>
                      {isUniv && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? "bg-white/20 text-white" : "bg-[#edefff] text-[#4255ff]"
                        }`}>
                          Hazırlık
                        </span>
                      )}
                    </div>
                    <div className={`text-[10px] truncate ${isSelected ? "text-white/80" : "text-[#586380]"}`}>
                      {isUniv ? "Üniversite Muafiyet" : isNat ? "ÖSYM / Ulusal" : "Uluslararası"} • {exam.totalQuestions} Soru
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? "text-white translate-x-0.5" : "text-[#939bb4] group-hover:text-[#4255ff]"
                  }`} />
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Selected Exam's Details & Planner/Curriculum */}
        <div className="flex-1 min-w-0 w-full space-y-5">
          {/* Active Exam Header Summary */}
          <div className="p-4 sm:p-5 rounded-[12px] bg-white border border-[#d9dde8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-[#282e3e]">
                  {currentExam.name}
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  currentExam.category === "UNIVERSITY"
                    ? "bg-[#edefff] text-[#4255ff] border-[#d9dde8]"
                    : currentExam.category === "NATIONAL"
                    ? "bg-sky-50 text-sky-700 border-sky-200"
                    : "bg-purple-50 text-purple-700 border-purple-200"
                }`}>
                  {currentExam.category === "UNIVERSITY" ? "🎓 Hazırlık Atlama" : currentExam.category === "NATIONAL" ? "ÖSYM / Ulusal" : "Uluslararası"}
                </span>
              </div>
              <p className="text-xs text-[#586380] mt-1 line-clamp-2">
                {currentExam.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#282e3e] shrink-0 bg-[#f6f7fb] px-3 py-2 rounded-[8px] border border-[#d9dde8]">
              <span>{currentExam.durationMins} Dk</span>
              <span className="text-[#939bb4]">•</span>
              <span>{currentExam.totalQuestions} Soru</span>
              <span className="text-[#939bb4]">•</span>
              <span className="text-[#4255ff] font-bold">{currentExam.scoringLabel}</span>
            </div>
          </div>

          {/* View Mode Switcher: Müfredat vs Sınav Planlaması */}
          <div className="flex items-center justify-between border-b border-[#d9dde8] pb-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("PLANNER")}
                className={`text-xs px-4 py-2 rounded-[200px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "PLANNER"
                    ? "bg-[#4255ff] text-white shadow-xs"
                    : "bg-[#f6f7fb] text-[#586380] hover:text-[#282e3e] border border-[#d9dde8]"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>📅 Kişiye Özel Sınav Planlaması</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                  viewMode === "PLANNER" ? "bg-white/20 text-white" : "bg-[#edefff] text-[#4255ff]"
                }`}>
                  Yapay Zeka
                </span>
              </button>

              <button
                onClick={() => setViewMode("CURRICULUM")}
                className={`text-xs px-4 py-2 rounded-[200px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "CURRICULUM"
                    ? "bg-[#4255ff] text-white shadow-xs"
                    : "bg-[#f6f7fb] text-[#586380] hover:text-[#282e3e] border border-[#d9dde8]"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>📖 Soru Tipleri & Kazanım Müfredatı ({currentExam.categories.length})</span>
              </button>
            </div>

            <div className="text-[11px] text-[#586380] flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#4255ff]" />
              Format: <strong>{currentExam.shortTitle}</strong>
            </div>
          </div>

          {/* VIEW MODE 1: KIŞIYE ÖZEL SINAV PLANLAMASI */}
          {viewMode === "PLANNER" && (
            <div className="space-y-5">
              {/* Planner Configurator Box */}
              <div className="p-5 rounded-[12px] bg-white border border-[#d9dde8] shadow-xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#4255ff]" />
                    <h4 className="text-sm font-bold text-[#282e3e]">
                      {currentExam.studyPlan?.targetUniversity || currentExam.name} Hazırlık Atlama Planlama Motoru
                    </h4>
                  </div>
                  <div className="text-xs text-[#586380]">
                    Hedef Geçme Notu: <strong className="text-[#4255ff]">{currentExam.studyPlan?.passingScore || currentExam.scoringLabel}</strong>
                  </div>
                </div>

                {/* 3 User Preferences Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                  {/* 1. Mevcut Seviye */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#282e3e] flex items-center justify-between">
                      <span>1. Mevcut İngilizce Seviyeniz</span>
                      <span className="text-[10px] text-[#586380]">CEFR</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: "A2" as const, label: "A2 Temel", note: "12 Hafta" },
                        { id: "B1" as const, label: "B1 Orta", note: "8 Hafta" },
                        { id: "B2" as const, label: "B2 İleri", note: "4 Hafta" },
                      ].map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setCurrentLevel(lvl.id)}
                          className={`p-2 rounded-[6px] text-center border transition-all cursor-pointer ${
                            currentLevel === lvl.id
                              ? "bg-[#edefff] border-[#4255ff] text-[#4255ff] font-bold shadow-xs"
                              : "bg-[#f6f7fb] border-[#d9dde8] text-[#586380] hover:text-[#282e3e]"
                          }`}
                        >
                          <div className="text-xs font-bold">{lvl.label}</div>
                          <div className="text-[9px] opacity-75">{lvl.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Sınava Kalan Süre */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#282e3e] flex items-center justify-between">
                      <span>2. Sınava Kalan Süre</span>
                      <Clock className="w-3 h-3 text-[#586380]" />
                    </label>
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { id: "30" as const, label: "30 Gün (Kamp)" },
                        { id: "60" as const, label: "60 Gün (2 Ay)" },
                        { id: "90" as const, label: "90 Gün (3 Ay)" },
                        { id: "SEPTEMBER" as const, label: "Eylül Sınavı" },
                      ].map((dur) => (
                        <button
                          key={dur.id}
                          type="button"
                          onClick={() => setTargetDuration(dur.id)}
                          className={`p-2 rounded-[6px] text-center border transition-all cursor-pointer ${
                            targetDuration === dur.id
                              ? "bg-[#edefff] border-[#4255ff] text-[#4255ff] font-bold shadow-xs"
                              : "bg-[#f6f7fb] border-[#d9dde8] text-[#586380] hover:text-[#282e3e]"
                          }`}
                        >
                          <div className="text-[11px] font-bold">{dur.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Günlük Çalışma Temposu */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#282e3e] flex items-center justify-between">
                      <span>3. Günlük Çalışma Temposu</span>
                      <Flame className="w-3 h-3 text-[#4255ff]" />
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: "1_2" as const, label: "1-2 Saat", note: "Hafif" },
                        { id: "2_3" as const, label: "2-3 Saat", note: "İdeal" },
                        { id: "4_PLUS" as const, label: "4+ Saat", note: "Yoğun" },
                      ].map((hrs) => (
                        <button
                          key={hrs.id}
                          type="button"
                          onClick={() => setDailyHours(hrs.id)}
                          className={`p-2 rounded-[6px] text-center border transition-all cursor-pointer ${
                            dailyHours === hrs.id
                              ? "bg-[#edefff] border-[#4255ff] text-[#4255ff] font-bold shadow-xs"
                              : "bg-[#f6f7fb] border-[#d9dde8] text-[#586380] hover:text-[#282e3e]"
                          }`}
                        >
                          <div className="text-xs font-bold">{hrs.label}</div>
                          <div className="text-[9px] opacity-75">{hrs.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Daily Targets Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-[8px] bg-white border border-[#d9dde8] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#edefff] text-[#4255ff] flex items-center justify-center font-bold text-sm shrink-0">
                    🎯
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#586380]">Günlük Soru Hedefi</div>
                    <div className="text-sm font-bold text-[#282e3e]">
                      {dailyHours === "4_PLUS" ? "45 Soru" : dailyHours === "2_3" ? "30 Soru" : "20 Soru"}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-[8px] bg-white border border-[#d9dde8] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#edefff] text-[#4255ff] flex items-center justify-center font-bold text-sm shrink-0">
                    🎧
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#586380]">Note-Taking & Dinleme</div>
                    <div className="text-sm font-bold text-[#282e3e]">
                      {currentExam.studyPlan?.dailyRoutine.listeningMins || 15} Dk Günlük Ders Kaydı
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-[8px] bg-white border border-[#d9dde8] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#edefff] text-[#4255ff] flex items-center justify-center font-bold text-sm shrink-0">
                    ✍️
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#586380]">Haftalık Essay Hedefi</div>
                    <div className="text-sm font-bold text-[#282e3e]">
                      {currentExam.studyPlan?.dailyRoutine.essaysPerWeek || 2} Akademik Deneme (AI Puanlı)
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Roadmap Phases */}
              <div className="p-5 rounded-[12px] bg-white border border-[#d9dde8] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#d9dde8] pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#282e3e] flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#4255ff]" />
                      Haftalık Sınav Hazırlık Aşamaları & Yol Haritası
                    </h4>
                    <p className="text-[11px] text-[#586380] mt-0.5">
                      {currentExam.shortTitle} sınavının soru tiplerine ve baraj puanına göre kurgulanmış aşamalı çalışma takvimi.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#4255ff] bg-[#edefff] px-2.5 py-1 rounded-full">
                    {currentLevel} → Geçme Seviyesi (B2/C1)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {(currentExam.studyPlan?.weeklyRoadmap || [
                    { phase: "1. Aşama", weekRange: "1 - 2. Hafta", focus: "Format & Dil Bilgisi", tasks: ["Temel dil yapıları ve üniversite soru tipleri"] },
                    { phase: "2. Aşama", weekRange: "3 - 4. Hafta", focus: "Okuma & Dinleme", tasks: ["Akademik metin analizi ve not alma"] },
                    { phase: "3. Aşama", weekRange: "5 - 6. Hafta", focus: "Writing & Essay", tasks: ["Kompozisyon yazımı ve şablonlar"] },
                    { phase: "4. Aşama", weekRange: "7 - 8. Hafta", focus: "Deneme Simülasyonu", tasks: ["Tam süreli sınav denemeleri"] }
                  ]).map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-[8px] bg-[#f6f7fb] border border-[#d9dde8] space-y-2 hover:border-[#4255ff] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#4255ff] text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-[#282e3e]">{phase.phase}: {phase.focus}</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#586380] bg-white px-2 py-0.5 rounded border border-[#d9dde8]">
                          {phase.weekRange}
                        </span>
                      </div>

                      <ul className="space-y-1 pl-8 text-xs text-[#586380]">
                        {phase.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="list-disc leading-relaxed">
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Critical University Exam Tip */}
                {currentExam.studyPlan?.dailyRoutine.strategyTip && (
                  <div className="p-3.5 rounded-[8px] bg-[#edefff] border border-[#4255ff]/20 text-xs text-[#282e3e] flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#4255ff] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-[#4255ff]">
                        {currentExam.shortTitle} İçin Altın Sınav Taktiği:
                      </strong>{" "}
                      <span className="text-[#282e3e] leading-relaxed">
                        {currentExam.studyPlan.dailyRoutine.strategyTip}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#d9dde8]">
                  <div className="text-xs text-[#586380]">
                    {isPlanSaved ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        Planınız başarıyla öğrenci panelinize kaydedildi!
                      </span>
                    ) : (
                      <span>Bu plan {currentExam.shortTitle} soru havuzuyla tam senkronizedir.</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleSavePlan}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-[200px] bg-white border border-[#4255ff] text-[#4255ff] hover:bg-[#edefff] text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      {isPlanSaved ? "✓ Plan Kaydedildi" : "Bu Planı Panetime Kaydet"}
                    </button>

                    <Link
                      href={`/exam/${selectedExamCode.toLowerCase()}-demo`}
                      className="flex-1 sm:flex-none px-5 py-2 rounded-[200px] bg-[#4255ff] hover:bg-[#3346e0] text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>1 Soru Çöz & Başla</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: MÜFREDAT & SORU TİPLERİ */}
          {viewMode === "CURRICULUM" && (
            <div className="space-y-4">
              {/* Skill Tabs Filter (All, Reading, Writing, Speaking, Listening, Grammar) */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setSelectedSkillFilter("ALL")}
                  className={`text-xs px-3.5 py-1.5 rounded-[200px] font-bold transition-all cursor-pointer ${
                    selectedSkillFilter === "ALL"
                      ? "bg-[#4255ff] text-white shadow-xs"
                      : "bg-white text-[#586380] hover:text-[#282e3e] border border-[#d9dde8]"
                  }`}
                >
                  Tüm Beceriler ({currentExam.categories.length})
                </button>

                {currentExam.skillDistribution.map((skill) => (
                  <button
                    key={skill.domain}
                    onClick={() => setSelectedSkillFilter(skill.domain)}
                    className={`text-xs px-3.5 py-1.5 rounded-[200px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedSkillFilter === skill.domain
                        ? "bg-[#4255ff] text-white shadow-xs"
                        : "bg-white text-[#586380] hover:text-[#282e3e] border border-[#d9dde8]"
                    }`}
                  >
                    <span>{skill.icon}</span>
                    <span>{skill.label}</span>
                  </button>
                ))}
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredCategories.map((cat) => {
                  const isExpanded = expandedId === cat.id;

                  return (
                    <div
                      key={cat.id}
                      className="bg-white border border-[#d9dde8] hover:border-[#4255ff] rounded-[12px] overflow-hidden transition-all shadow-xs group"
                    >
                      {/* Category Header Card */}
                      <div
                        onClick={() => setExpandedId(isExpanded ? "" : cat.id)}
                        className="p-4 flex items-center justify-between cursor-pointer select-none bg-[#f6f7fb]/70 hover:bg-[#edefff]/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-[8px] bg-white border border-[#d9dde8] flex items-center justify-center font-bold text-sm text-[#4255ff] shadow-xs">
                            {cat.domain === "SPEAKING" ? "🎙️" : cat.domain === "WRITING" ? "✍️" : cat.domain === "LISTENING" ? "🎧" : "📖"}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="font-bold text-[#282e3e] text-xs sm:text-sm group-hover:text-[#4255ff] transition-colors">
                                {cat.name}
                              </h3>
                              {cat.isAudioRequired && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold flex items-center gap-0.5">
                                  <Mic className="w-2.5 h-2.5" />
                                  Ses Kaydı
                                </span>
                              )}
                              {cat.isWritingRequired && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-semibold flex items-center gap-0.5">
                                  <PenTool className="w-2.5 h-2.5" />
                                  Essay
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#586380] mt-0.5">
                              {cat.questionCount} Havuz Sorusu • Zorluk: <strong className="text-[#282e3e]">{cat.difficulty}</strong>
                            </div>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-4 h-4 text-[#939bb4] transition-transform ${
                            isExpanded ? "rotate-90 text-[#4255ff]" : ""
                          }`}
                        />
                      </div>

                      {/* Detailed Breakdown when Expanded */}
                      {isExpanded && (
                        <div className="p-4 pt-3 bg-white space-y-3 border-t border-[#d9dde8]">
                          <p className="text-xs text-[#586380] leading-relaxed bg-[#f6f7fb] p-3 rounded-[8px] border border-[#d9dde8]">
                            {cat.description}
                          </p>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] font-medium text-[#586380]">
                              Adaptif "1 Soru Daha" Modülü Hazır
                            </span>
                            <Link
                              href={`/exam/${selectedExamCode.toLowerCase()}-demo`}
                              className="px-4 py-1.5 rounded-[200px] bg-[#4255ff] hover:bg-[#3346e0] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
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
          )}
        </div>
      </div>
    </section>
  );
}

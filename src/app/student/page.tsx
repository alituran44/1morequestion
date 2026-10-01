"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { HeaderActions } from "@/components/HeaderActions";
import { MockExamCard, MockExamItem } from "@/components/MockExamCard";
import { AdaptiveQuestionWidget, PoolQuestion } from "@/components/AdaptiveQuestionWidget";
import { PaynkolayModal } from "@/components/PaynkolayModal";
import { TopicCurriculumSection } from "@/components/TopicCurriculumSection";
import { ExamOnboardingModal } from "@/components/ExamOnboardingModal";
import { EXAM_SYSTEMS } from "@/lib/exam-systems";
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Swords, 
  Trophy, 
  Clock, 
  Flame,
  Coins,
  ShieldCheck,
  Target,
  Mic,
  PenTool,
  Settings2,
  ChevronRight,
  Filter,
  X
} from "lucide-react";
import Link from "next/link";

const EXAM_DISPLAY_NAMES: Record<string, string> = {
  YDT: "YDT (YKS-Dil)",
  YDS: "YDS & YÖKDİL",
  YOKDIL: "YÖKDİL",
  BUEPT: "Boğaziçi Üniversitesi (BUEPT)",
  ODTU_IYS: "ODTÜ (EPE Yeterlik)",
  ITU_IYS: "İTÜ (İYS Yeterlik)",
  BILKENT_PAE: "Bilkent Üniversitesi (PAE)",
  KOC_KUEPE: "Koç Üniversitesi (KUEPE)",
  SABANCI_ELAE: "Sabancı Üniversitesi (ELAE)",
  PROFICIENCY: "Genel Üniversite Muafiyet",
  IELTS: "IELTS Academic",
  TOEFL: "TOEFL iBT",
};

function StudentPortalContent() {
  const searchParams = useSearchParams();
  const [activeRole, setActiveRole] = useState<"INSTRUCTOR" | "STUDENT">("STUDENT");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedExamCode, setSelectedExamCode] = useState<string>("ALL");

  const [selectedExamForBuy, setSelectedExamForBuy] = useState<MockExamItem | null>(null);
  const [isPaynkolayOpen, setIsPaynkolayOpen] = useState(false);

  // Target exams personalization
  const [targetExams, setTargetExams] = useState<string[]>(["YDT", "PROFICIENCY", "IELTS"]);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const [mockExams, setMockExams] = useState<MockExamItem[]>([]);
  const [poolQuestions, setPoolQuestions] = useState<PoolQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Read URL query params or localStorage for active exam pool
  useEffect(() => {
    const examParam = searchParams.get("exam");
    const categoryParam = searchParams.get("category");

    if (examParam) {
      setSelectedExamCode(examParam.toUpperCase());
    } else if (categoryParam) {
      setSelectedCategory(categoryParam.toUpperCase());
    } else if (typeof window !== "undefined") {
      const savedActivePool = localStorage.getItem("1mq_active_exam_pool");
      if (savedActivePool && savedActivePool !== "ALL") {
        setSelectedExamCode(savedActivePool);
      }
    }
  }, [searchParams]);

  // Fetch initial data & load saved target exams
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("1mq_target_exams");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTargetExams(parsed);
          }
        } catch (e) {
          console.error("Target exams parse error:", e);
        }
      }
    }

    async function loadData() {
      try {
        const res = await fetch("/api/mocks");
        const data = await res.json();
        if (data.success) {
          setMockExams(data.mockExams);
          setPoolQuestions(data.poolQuestions);
        }
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter logic: search, category, and strict exam code matching
  const filteredExams = mockExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.exam.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || exam.exam.category === selectedCategory;

    let matchesExamCode = true;
    if (selectedExamCode !== "ALL") {
      const target = selectedExamCode.toUpperCase();
      const code = exam.exam.code.toUpperCase();
      const title = exam.title.toUpperCase();

      if (target === "YDT") {
        matchesExamCode = code === "YDT" || title.includes("YDT");
      } else if (target === "YDS" || target === "YOKDIL") {
        matchesExamCode = code === "YDS" || code === "YOKDIL" || title.includes("YDS") || title.includes("YÖKDİL");
      } else if (target === "BUEPT") {
        matchesExamCode = code === "BUEPT" || title.includes("BUEPT") || title.includes("BÜYES") || title.includes("BOĞAZİÇİ");
      } else if (target === "ODTU_IYS" || target === "ODTU") {
        matchesExamCode = code === "ODTU_IYS" || title.includes("ODTÜ") || title.includes("EPE");
      } else if (target === "ITU_IYS" || target === "ITU") {
        matchesExamCode = code === "ITU_IYS" || code === "ODTU_IYS" || title.includes("İTÜ") || title.includes("İYS");
      } else if (target === "BILKENT_PAE" || target === "BILKENT") {
        matchesExamCode = code === "BILKENT_PAE" || code === "PROFICIENCY" || title.includes("BILKENT") || title.includes("PAE");
      } else if (target === "KOC_KUEPE" || target === "KOC") {
        matchesExamCode = code === "KOC_KUEPE" || code === "PROFICIENCY" || title.includes("KOÇ") || title.includes("KUEPE");
      } else if (target === "SABANCI_ELAE" || target === "SABANCI") {
        matchesExamCode = code === "SABANCI_ELAE" || code === "PROFICIENCY" || title.includes("SABANCI") || title.includes("ELAE");
      } else if (target === "PROFICIENCY") {
        matchesExamCode = code === "PROFICIENCY" || title.includes("HAZIRLIK") || title.includes("MUAFİYET") || title.includes("PROFICIENCY");
      } else if (target === "IELTS" || target === "IELTS_ACAD") {
        matchesExamCode = code === "IELTS" || code === "IELTS_ACAD" || title.includes("IELTS");
      } else if (target === "TOEFL" || target === "TOEFL_IBT") {
        matchesExamCode = code === "TOEFL" || code === "TOEFL_IBT" || title.includes("TOEFL");
      } else {
        matchesExamCode = code === target;
      }
    }

    return matchesSearch && matchesCategory && matchesExamCode;
  });

  const handleBuyClick = (examId: string) => {
    const found = mockExams.find((e) => e.id === examId);
    if (found) {
      setSelectedExamForBuy(found);
      setIsPaynkolayOpen(true);
    }
  };

  const handlePaymentSuccess = (examId: string) => {
    setMockExams((prev) =>
      prev.map((item) => (item.id === examId ? { ...item, isPurchased: true } : item))
    );
  };

  const handleExamFilterClick = (code: string) => {
    setSelectedExamCode(code);
    setSelectedCategory("ALL");
    if (typeof window !== "undefined") {
      if (code === "ALL") {
        localStorage.removeItem("1mq_active_exam_pool");
      } else {
        localStorage.setItem("1mq_active_exam_pool", code);
      }
    }
  };

  const activeExamName = EXAM_DISPLAY_NAMES[selectedExamCode] || selectedExamCode;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Left Sidebar */}
      <Sidebar activeRole="STUDENT" onRoleToggle={(r) => {
        if (r === "INSTRUCTOR") window.location.href = "/instructor";
      }} />

      {/* 2. Main Workspace */}
      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-8">
        {/* Top Header & Student Action Cards */}
        <HeaderActions
          role="STUDENT"
          userName="Deniz Yılmaz"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Target Exams Personalized Goal Banner */}
        <section className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Hazırlandığınız Sınavlar & Kişiselleştirilmiş Akış
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  Akıllı Eşleşme
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                {targetExams.map((code) => {
                  const conf = EXAM_SYSTEMS[code];
                  return (
                    <span
                      key={code}
                      onClick={() => handleExamFilterClick(code)}
                      className={`text-xs font-black px-2.5 py-1 rounded-xl border flex items-center gap-1.5 shadow-xs cursor-pointer transition-all ${
                        selectedExamCode === code 
                          ? "bg-amber-500 text-slate-950 border-amber-500 ring-2 ring-amber-300"
                          : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
                      }`}
                    >
                      <span>{conf?.shortTitle || code}</span>
                      <span className="text-[10px] font-medium opacity-75">
                        ({conf?.category === "UNIVERSITY" ? "🎓 Hazırlık Atlama" : conf?.supportedSkills.includes("SPEAKING") ? "🎙️ Speaking Dahil" : "Test"})
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/pricing"
              className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-extrabold transition-all border border-indigo-200 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Coins className="w-4 h-4 text-indigo-600" />
              <span>Deneme Paketi Satın Al</span>
            </Link>

            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold transition-all border border-slate-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Settings2 className="w-4 h-4 text-slate-600" />
              <span>Hedefleri Düzenle</span>
            </button>
          </div>
        </section>

        {/* Section 1: "1 Soru Daha" Signature Adaptive Practice Feature */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-xs">
                1+
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  Adaptif "1 Soru Daha" Akışı
                </h2>
                <p className="text-xs text-slate-500">
                  Son denemelerinde zorlandığın konulardan sana özel telafi sorusu (IRT Motoru)
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-emerald-700 shadow-xs">
              Kişiye Özel Telafi Aktif
            </span>
          </div>

          <AdaptiveQuestionWidget
            initialQuestion={poolQuestions[0]}
            onQuestionCompleted={(qId, isCorrect) => {
              console.log(`Question ${qId} answered: ${isCorrect}`);
            }}
          />
        </section>

        {/* Section 2: Online Mock Exams Marketplace */}
        <section className="space-y-6 pt-4 border-t border-slate-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                Sınav Denemeleri & Deneme Paketleri
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                {filteredExams.length} Deneme
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ulusal, üniversite hazırlık ve uluslararası sınav standartlarında süre sayaçlı ve optik formlu online denemeler
            </p>
          </div>

          {/* ACTIVE EXAM FILTER BANNER (Sadece Seçilen Sınavın Denemeleri Listeleniyor) */}
          {selectedExamCode !== "ALL" && (
            <div className="p-4 rounded-2xl bg-indigo-50/90 border border-indigo-200 text-indigo-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4255ff] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                  🎯
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#282e3e]">
                      Aktif Havuz: {activeExamName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4255ff] text-white font-bold">
                      Yalnızca Bu Sınav
                    </span>
                  </div>
                  <p className="text-xs text-indigo-800/80">
                    Seçtiğiniz <strong>{activeExamName}</strong> sınavına ait toplam <strong>{filteredExams.length} adet</strong> özgün deneme listeleniyor.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleExamFilterClick("ALL")}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#4255ff] text-xs font-bold transition-all border border-indigo-200 shrink-0 cursor-pointer shadow-xs flex items-center gap-1.5 self-start sm:self-center"
              >
                <X className="w-3.5 h-3.5" />
                <span>Tüm Sınavları Göster</span>
              </button>
            </div>
          )}

          {/* 2-Column Layout: Left Vertical Categories + Right Mock Cards */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* Left Column: Vertical Category Filters */}
            <aside className="w-full lg:w-72 xl:w-80 shrink-0 bg-white border border-slate-200 rounded-3xl p-3.5 shadow-xs space-y-4 lg:sticky lg:top-6">
              {/* Category Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2 pt-1 pb-1 border-b border-slate-100">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Kategori Filtresi
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {filteredExams.length} Sonuç
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {/* All */}
                  <button
                    onClick={() => {
                      setSelectedCategory("ALL");
                      setSelectedExamCode("ALL");
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                      selectedCategory === "ALL" && selectedExamCode === "ALL"
                        ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black"
                        : "bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/80 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <div className="text-xs font-extrabold">Tüm Denemeler</div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${
                      selectedCategory === "ALL" && selectedExamCode === "ALL" ? "text-slate-950" : "text-slate-400"
                    }`} />
                  </button>

                  {/* National */}
                  <button
                    onClick={() => {
                      setSelectedCategory("NATIONAL");
                      setSelectedExamCode("ALL");
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                      selectedCategory === "NATIONAL" && selectedExamCode === "ALL"
                        ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black"
                        : "bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/80 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <div className="text-xs font-extrabold">🏛️ ÖSYM / Ulusal Sınavlar</div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* University */}
                  <button
                    onClick={() => {
                      setSelectedCategory("UNIVERSITY");
                      setSelectedExamCode("ALL");
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                      selectedCategory === "UNIVERSITY" && selectedExamCode === "ALL"
                        ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black"
                        : "bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/80 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <div className="text-xs font-extrabold">🎓 Hazırlık Atlama</div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* International */}
                  <button
                    onClick={() => {
                      setSelectedCategory("INTERNATIONAL");
                      setSelectedExamCode("ALL");
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                      selectedCategory === "INTERNATIONAL" && selectedExamCode === "ALL"
                        ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black"
                        : "bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/80 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <div className="text-xs font-extrabold">🌐 Uluslararası Sınavlar</div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* SPECIFIC EXAM POOLS (Seçen Kişiye Sadece O Kısımla İlgili Denemeler Gelsin) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between px-2 pb-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#4255ff]">
                    Sınava Özel Havuzlar
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400">Tek Tık Filtre</span>
                </div>

                <div className="flex flex-col gap-1">
                  {[
                    { code: "YDT", name: "YDT (YKS-Dil)", tag: "ÖSYM" },
                    { code: "YDS", name: "YDS & YÖKDİL", tag: "ÖSYM" },
                    { code: "BUEPT", name: "Boğaziçi Üniversitesi (BUEPT)", tag: "Hazırlık" },
                    { code: "ODTU_IYS", name: "ODTÜ (EPE Yeterlik)", tag: "Hazırlık" },
                    { code: "ITU_IYS", name: "İTÜ (İYS Yeterlik)", tag: "Hazırlık" },
                    { code: "BILKENT_PAE", name: "Bilkent Üniversitesi (PAE)", tag: "Hazırlık" },
                    { code: "KOC_KUEPE", name: "Koç Üniversitesi (KUEPE)", tag: "Hazırlık" },
                    { code: "SABANCI_ELAE", name: "Sabancı Üniversitesi (ELAE)", tag: "Hazırlık" },
                    { code: "PROFICIENCY", name: "Genel Hazırlık Muafiyet", tag: "Hazırlık" },
                    { code: "IELTS", name: "IELTS Academic", tag: "Global" },
                    { code: "TOEFL", name: "TOEFL iBT", tag: "Global" },
                  ].map((item) => {
                    const isSelected = selectedExamCode === item.code;
                    return (
                      <button
                        key={item.code}
                        onClick={() => handleExamFilterClick(item.code)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? "bg-[#4255ff] text-white border-[#4255ff] shadow-sm font-black"
                            : "bg-slate-50/70 hover:bg-[#edefff] text-slate-700 hover:text-[#4255ff] border-slate-200/70"
                        }`}
                      >
                        <span>{item.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase ${
                          isSelected ? "bg-white/20 text-white" : "bg-white text-slate-500 border border-slate-200"
                        }`}>
                          {item.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Shortcut Button */}
              <div className="pt-2">
                <Link
                  href="/pricing"
                  className="w-full py-2.5 px-3 rounded-2xl bg-[#edefff] hover:bg-[#dbe0ff] text-[#4255ff] text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-[#c7d0ff]"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>5-20 Deneme Satın Al</span>
                </Link>
              </div>
            </aside>

            {/* Right Column: Grid of Mock Exam Cards */}
            <div className="flex-1 min-w-0 w-full">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="h-64 rounded-2xl bg-white border border-slate-200 animate-pulse" />
                  ))}
                </div>
              ) : filteredExams.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Filter className="w-6 h-6" />
                  </div>
                  <div className="text-base font-bold text-slate-800">
                    Seçilen kriterlere uygun deneme bulunamadı
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Arama filtrenizi temizleyerek tüm sınav havuzunu görüntüleyebilirsiniz.
                  </p>
                  <button
                    onClick={() => handleExamFilterClick("ALL")}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-600 transition-all cursor-pointer"
                  >
                    Tüm Denemeleri Listele
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredExams.map((mock) => (
                    <MockExamCard
                      key={mock.id}
                      exam={mock}
                      onBuyClick={handleBuyClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Topic Curriculum Tree */}
        <TopicCurriculumSection initialExamCode={selectedExamCode !== "ALL" ? selectedExamCode : targetExams[0] || "IELTS"} />
      </main>

      {/* Target Exams Onboarding Modal */}
      <ExamOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        selectedExamCodes={targetExams}
        onSave={(exams) => setTargetExams(exams)}
      />

      {/* Paynkolay Modal */}
      {selectedExamForBuy && (
        <PaynkolayModal
          isOpen={isPaynkolayOpen}
          onClose={() => {
            setIsPaynkolayOpen(false);
            setSelectedExamForBuy(null);
          }}
          exam={selectedExamForBuy}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default function StudentPortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-slate-500 text-sm">Yükleniyor...</div>}>
      <StudentPortalContent />
    </Suspense>
  );
}

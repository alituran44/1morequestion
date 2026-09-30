"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { HeaderActions } from "@/components/HeaderActions";
import { MockExamCard, MockExamItem } from "@/components/MockExamCard";
import { AdaptiveQuestionWidget, PoolQuestion } from "@/components/AdaptiveQuestionWidget";
import { PaynkolayModal } from "@/components/PaynkolayModal";
import { TopicCurriculumSection } from "@/components/TopicCurriculumSection";
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
  Target
} from "lucide-react";
import Link from "next/link";

export default function StudentPortalPage() {
  const [activeRole, setActiveRole] = useState<"INSTRUCTOR" | "STUDENT">("STUDENT");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedExamCode, setSelectedExamCode] = useState<string>("ALL");

  const [selectedExamForBuy, setSelectedExamForBuy] = useState<MockExamItem | null>(null);
  const [isPaynkolayOpen, setIsPaynkolayOpen] = useState(false);

  const [mockExams, setMockExams] = useState<MockExamItem[]>([]);
  const [poolQuestions, setPoolQuestions] = useState<PoolQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
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

  // Filter logic
  const filteredExams = mockExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.exam.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || exam.exam.category === selectedCategory;

    const matchesExamCode =
      selectedExamCode === "ALL" || exam.exam.code === selectedExamCode;

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

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Left Sidebar */}
      <Sidebar activeRole="STUDENT" onRoleToggle={(r) => {
        if (r === "INSTRUCTOR") window.location.href = "/instructor";
      }} />

      {/* 2. Main Workspace */}
      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-10">
        {/* Top Header & Student Action Cards */}
        <HeaderActions
          role="STUDENT"
          userName="Deniz Yılmaz"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Assigned Homework / Tasks */}
        <section className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Öğretmeninizin Size Atadığı Ödevler
                </h3>
                <p className="text-xs text-slate-500">
                  Sınıfınız için belirlenen son teslim tarihli deneme ve pekiştirme görevleri
                </p>
              </div>
            </div>
            <Link
              href="/join"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Assignment 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 flex items-center justify-between gap-4 transition-all shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">2026 YDT Şampiyonlar Özgün Deneme #1</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 font-bold">
                    Son 2 Gün
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Eğitmen: Ahmet Hoca • Kod: <strong className="font-mono text-sky-600">904182</strong>
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">
                  18/24 Sınıf Arkadaşın Tamamladı
                </div>
              </div>

              <Link
                href="/join/904182"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs transition-all shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <span>Ödevi Çöz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Assignment 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 flex items-center justify-between gap-4 transition-all shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">2026 YDS Master Akademik Paragraf & Çeviri</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200 font-bold">
                    Son 5 Gün
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Eğitmen: Ahmet Hoca • Kod: <strong className="font-mono text-sky-600">812044</strong>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  Zayıf Kazanım Pekiştirmesi (Phrasal Verbs)
                </div>
              </div>

              <Link
                href="/join/812044"
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs transition-all shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <span>Başla</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Sınav Denemeleri & Deneme Paketleri
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                  {filteredExams.length} Deneme
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Ulusal ve uluslararası sınav standartlarında süre sayaçlı ve optik formlu online denemeler
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-medium mr-1">Filtre:</span>
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCategory === "ALL"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                Tümü
              </button>
              <button
                onClick={() => setSelectedCategory("NATIONAL")}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCategory === "NATIONAL"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                Ulusal (YDT / YDS / YÖKDİL)
              </button>
              <button
                onClick={() => setSelectedCategory("INTERNATIONAL")}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCategory === "INTERNATIONAL"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                Uluslararası (IELTS / TOEFL / DET)
              </button>
            </div>
          </div>

          {/* Grid of Mock Exam Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 rounded-2xl bg-white border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : filteredExams.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm shadow-xs">
              Arama kriterlerine uygun sınav denemesi bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((mock) => (
                <MockExamCard
                  key={mock.id}
                  exam={mock}
                  onBuyClick={handleBuyClick}
                />
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Topic Curriculum Tree */}
        <TopicCurriculumSection />
      </main>

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

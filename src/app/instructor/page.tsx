"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { HeaderActions } from "@/components/HeaderActions";
import { MockExamCard, MockExamItem } from "@/components/MockExamCard";
import { AdaptiveQuestionWidget, PoolQuestion } from "@/components/AdaptiveQuestionWidget";
import { PdfStudioModal } from "@/components/PdfStudioModal";
import { TopicCurriculumSection } from "@/components/TopicCurriculumSection";
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  UploadCloud, 
  BarChart3,
  Send,
  PlusCircle,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function InstructorPortalPage() {
  const [activeRole, setActiveRole] = useState<"INSTRUCTOR" | "STUDENT">("INSTRUCTOR");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedExamCode, setSelectedExamCode] = useState<string>("ALL");

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Left Sidebar */}
      <Sidebar activeRole="INSTRUCTOR" onRoleToggle={(r) => {
        if (r === "STUDENT") window.location.href = "/student";
      }} />

      {/* 2. Main Workspace */}
      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-10">
        {/* Top Header & Educator Action Cards (Oluştur, Arama, Yükle) */}
        <HeaderActions
          role="INSTRUCTOR"
          userName="Ahmet Hoca (ELT)"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenUploadModal={() => setIsPdfModalOpen(true)}
        />

        {/* Educator Quick Management Tray */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in">
          {/* Card 1: AI PDF Stüdyosu */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 transition-all shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                OCR Aktif
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">AI Deneme Stüdyosu</h3>
              <p className="text-xs text-slate-500 mt-1">
                Herhangi bir sınav PDF'ini yükleyin, 60 saniyede interaktif denemeye dönüştürün.
              </p>
            </div>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-1"
            >
              <span>Stüdyoyu Başlat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Sınıflar & Ödev Atama */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-sky-400 transition-all shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                3 Aktif Sınıf
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Sınıflarım & Ödevler</h3>
              <p className="text-xs text-slate-500 mt-1">
                Öğrenci listelerini yönetin, en zayıf kazanımlara anında ödev atayın.
              </p>
            </div>
            <Link
              href="/students"
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-800 pt-1"
            >
              <span>Sınıfları Yönet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Raporlar & Veli Karnesi */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Madde Analizi
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Sınav Raporları & Analitik</h3>
              <p className="text-xs text-slate-500 mt-1">
                Çözülen denemelerin soru bazlı doğru/yanlış oranlarını ve eksik kazanımları görün.
              </p>
            </div>
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 pt-1"
            >
              <span>Raporları İncele</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
                  Adaptif "1 Soru Daha" Soru Havuzu Denetimi
                </h2>
                <p className="text-xs text-slate-500">
                  Öğrencilerin öğrenme açığına yönelik IRT zorluk katsayılı anlık telafi soruları
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-sky-700 shadow-xs">
              IRT Motoru Aktif
            </span>
          </div>

          <AdaptiveQuestionWidget
            initialQuestion={poolQuestions[0]}
            onQuestionCompleted={(qId, isCorrect) => {
              console.log(`Question ${qId} answered: ${isCorrect}`);
            }}
          />
        </section>

        {/* Section 2: Mock Exams Manager */}
        <section className="space-y-6 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Yayınlanan Sınav Denemeleri & Paketler
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                  {filteredExams.length} Deneme
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Öğrencilerinize atayabileceğiniz veya satışa sunduğunuz lisanslı sınav denemeleri
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/studio"
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Yeni Deneme Yükle</span>
              </Link>
            </div>
          </div>

          {/* Grid of Mock Exam Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 rounded-2xl bg-white border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((mock) => (
                <MockExamCard
                  key={mock.id}
                  exam={mock}
                  onBuyClick={() => alert(`Deneme ID: ${mock.id} - Eğitmen önizleme modu.`)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Topic Curriculum Tree */}
        <TopicCurriculumSection />
      </main>

      {/* PDF Studio Modal */}
      <PdfStudioModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        onProceedToStudio={(data: { examCode: string; fileName: string }) => {
          window.location.href = `/studio?exam=${data.examCode}`;
        }}
      />
    </div>
  );
}

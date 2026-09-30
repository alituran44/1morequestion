"use client";

import { useState } from "react";
import { 
  PlusCircle, 
  Search, 
  UploadCloud, 
  KeyRound, 
  FileText, 
  Presentation, 
  Video, 
  BookOpen, 
  Layers, 
  HardDrive, 
  Globe, 
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  Swords,
  Coins,
  Flame,
  Zap,
  Target
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderActionsProps {
  role?: "INSTRUCTOR" | "STUDENT";
  userName?: string;
  onOpenUploadModal?: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function HeaderActions({
  role = "INSTRUCTOR",
  userName = "Ahmet Hoca",
  onOpenUploadModal,
  searchTerm,
  onSearchChange,
}: HeaderActionsProps) {
  const router = useRouter();
  const [activeActionTab, setActiveActionTab] = useState<"NONE" | "CREATE" | "UPLOAD" | "STUDENT_PIN" | "STUDENT_DUEL" | "STUDENT_FLASHCARDS">("NONE");
  const [quickPin, setQuickPin] = useState("");

  const isStudent = role === "STUDENT";

  const handleQuickJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPin.trim()) return;
    router.push(`/join/${quickPin.trim()}`);
  };

  return (
    <div className="space-y-6 pt-2 pb-6">
      {/* Top Bar with Personalized Greeting & Actions */}
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="text-xs font-semibold text-slate-600">
          <span className={isStudent ? "text-emerald-600 font-bold" : "text-sky-600 font-bold"}>[Selam]</span>,{" "}
          <span className="text-slate-900 font-bold">{userName}</span> 🎯{" "}
          <span className={isStudent ? "text-amber-600 font-bold" : "text-emerald-600 font-bold"}>
            {isStudent ? "Bugün Hedefin: 20 Soru" : "Başlayalım."}
          </span>
        </div>

        {/* Top Right Quick Shortcuts */}
        <div className="flex items-center gap-3">
          {isStudent && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>500 Jeton</span>
            </div>
          )}

          {/* Quizizz-Style "Koda Gir" shortcut in top-right */}
          <Link
            href="/join"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fuchsia-50 border border-fuchsia-200 hover:bg-fuchsia-100 text-fuchsia-700 hover:text-fuchsia-900 text-xs font-extrabold transition-all shadow-xs group"
          >
            <KeyRound className="w-3.5 h-3.5 text-fuchsia-600 group-hover:scale-110 transition-transform" />
            <span>#! Koda gir</span>
          </Link>
        </div>
      </div>

      {/* 3 Wayground-Style Action Pill Cards */}
      {isStudent ? (
        /* STUDENT SPECIFIC 3 PILLS */
        <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
          {/* Student Pill 1: Koda Katıl */}
          <button
            onClick={() => setActiveActionTab(activeActionTab === "STUDENT_PIN" ? "NONE" : "STUDENT_PIN")}
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-xs cursor-pointer ${
              activeActionTab === "STUDENT_PIN"
                ? "bg-fuchsia-50 border-fuchsia-400 ring-2 ring-fuchsia-200 text-fuchsia-950 font-bold"
                : "bg-white hover:bg-slate-50 border-slate-200 hover:border-fuchsia-300 text-slate-800"
            }`}
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-fuchsia-100/80 text-fuchsia-600 border border-fuchsia-200 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Koda Katıl</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Sınav veya odaya gir</div>
          </button>

          {/* Student Pill 2: 1v1 Düello */}
          <button
            onClick={() => setActiveActionTab(activeActionTab === "STUDENT_DUEL" ? "NONE" : "STUDENT_DUEL")}
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-xs cursor-pointer relative overflow-hidden ${
              activeActionTab === "STUDENT_DUEL"
                ? "bg-rose-50 border-rose-400 ring-2 ring-rose-200 text-rose-950 font-bold"
                : "bg-white hover:bg-slate-50 border-slate-200 hover:border-rose-300 text-slate-800"
            }`}
          >
            <div className="absolute top-2 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
              Canlı
            </div>
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-rose-100/80 text-rose-600 border border-rose-200 flex items-center justify-center">
              <Swords className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">1v1 Düello</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Arkadaşına meydan oku</div>
          </button>

          {/* Student Pill 3: Bilgi Kartları */}
          <button
            onClick={() => setActiveActionTab(activeActionTab === "STUDENT_FLASHCARDS" ? "NONE" : "STUDENT_FLASHCARDS")}
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-xs cursor-pointer ${
              activeActionTab === "STUDENT_FLASHCARDS"
                ? "bg-amber-50 border-amber-400 ring-2 ring-amber-200 text-amber-950 font-bold"
                : "bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-300 text-slate-800"
            }`}
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-100/80 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Bilgi Kartları</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Kelime & Kural Ezber</div>
          </button>
        </div>
      ) : (
        /* INSTRUCTOR SPECIFIC 3 PILLS */
        <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
          {/* Button 1: Oluştur */}
          <button
            onClick={() => setActiveActionTab(activeActionTab === "CREATE" ? "NONE" : "CREATE")}
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-xs cursor-pointer ${
              activeActionTab === "CREATE"
                ? "bg-amber-50 border-amber-400 ring-2 ring-amber-200 text-amber-950 font-bold"
                : "bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-300 text-slate-800"
            }`}
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-100/80 text-amber-600 border border-amber-200 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Oluştur</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Bir kaynak hazırla</div>
          </button>

          {/* Button 2: Arama */}
          <Link
            href="/library"
            className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-300 rounded-2xl p-4 text-center transition-all shadow-xs cursor-pointer"
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-100/80 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900">Arama</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Kaynaklar için</div>
          </Link>

          {/* Button 3: Yükle */}
          <button
            onClick={() => setActiveActionTab(activeActionTab === "UPLOAD" ? "NONE" : "UPLOAD")}
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-xs relative overflow-hidden cursor-pointer ${
              activeActionTab === "UPLOAD"
                ? "bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200 text-emerald-950 font-bold"
                : "bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300 text-slate-800"
            }`}
          >
            <div className="absolute top-2 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
              AI Magic
            </div>
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-100/80 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Yükle</div>
            <div className="text-[11px] text-slate-500 mt-0.5">ve içeriğinizi geliştirin</div>
          </button>
        </div>
      )}

      {/* STUDENT SUB-PANEL: Quick PIN Input */}
      {activeActionTab === "STUDENT_PIN" && (
        <div className="max-w-lg mx-auto p-5 rounded-3xl bg-white border border-fuchsia-200 shadow-xl animate-in fade-in zoom-in-95 space-y-3 text-center">
          <div className="text-xs font-bold text-fuchsia-950">
            Öğretmeninizin Verdiği 6 Haneli Katılım Kodunu Girin
          </div>
          <form onSubmit={handleQuickJoin} className="flex items-center gap-2">
            <input
              type="text"
              autoFocus
              placeholder="Örn: 904182"
              value={quickPin}
              onChange={(e) => setQuickPin(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-mono tracking-wider focus:outline-none focus:border-fuchsia-500 focus:bg-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Hemen Başla
            </button>
          </form>
          <div className="text-[11px] text-slate-500">
            Veya daha fazla seçenek için <Link href="/join" className="text-fuchsia-600 underline font-semibold">Giriş Lobisi</Link>'ne gidin.
          </div>
        </div>
      )}

      {/* STUDENT SUB-PANEL: Quick Duel Room */}
      {activeActionTab === "STUDENT_DUEL" && (
        <div className="max-w-lg mx-auto p-5 rounded-3xl bg-white border border-rose-200 shadow-xl animate-in fade-in zoom-in-95 space-y-4">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900">Canlı 1v1 İngilizce Karşılaşması</h4>
            <p className="text-[11px] text-slate-500">5 Hızlı Soru • Anlık Puan & Streak Yarışı</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push("/duel/904182")}
              className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Swords className="w-4 h-4" />
              <span>Hemen Eşleş</span>
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard.writeText(`${window.location.origin}/duel/904182`);
                  alert("Düello davet linki kopyalandı! Arkadaşına gönder.");
                }
              }}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Davet Linki Al</span>
            </button>
          </div>
        </div>
      )}

      {/* STUDENT SUB-PANEL: Quick Flashcards Decks */}
      {activeActionTab === "STUDENT_FLASHCARDS" && (
        <div className="max-w-lg mx-auto p-5 rounded-3xl bg-white border border-amber-200 shadow-xl animate-in fade-in zoom-in-95 space-y-3">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider text-center">
            Çalışmak İstediğin Hafıza Destesini Seç
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/flashcards/904182"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 flex items-center gap-2 transition-colors"
            >
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">Phrasal Verbs</div>
                <div className="text-[10px] text-slate-500">12 Kelime Kartı</div>
              </div>
            </Link>
            <Link
              href="/flashcards/812044"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 flex items-center gap-2 transition-colors"
            >
              <Target className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">Conditionals & If</div>
                <div className="text-[10px] text-slate-500">8 Kural Kartı</div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* INSTRUCTOR SUB-PANEL: "Oluştur" */}
      {!isStudent && activeActionTab === "CREATE" && (
        <div className="max-w-4xl mx-auto p-5 rounded-3xl bg-white border border-slate-200 shadow-xl animate-in fade-in zoom-in-95 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
            Oluşturmak İstediğiniz İçerik Formatını Seçin
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { title: "Değerlendirme", desc: "Hızlı ve etkileşimli sorular", icon: FileText, color: "bg-emerald-50 text-emerald-700 border-emerald-200", href: "/studio" },
              { title: "Sunum", desc: "Sorular ve beyaz tahta slaytları", icon: Presentation, color: "bg-amber-50 text-amber-700 border-amber-200", href: "/studio" },
              { title: "Video", desc: "Videonun kritik anlarında soru", icon: Video, color: "bg-rose-50 text-rose-700 border-rose-200", href: "/studio" },
              { title: "Geçit (Passage)", desc: "Okuma pasajı temelli sorular", icon: BookOpen, color: "bg-sky-50 text-sky-700 border-sky-200", href: "/studio" },
              { title: "Bilgi Kartları", desc: "Sorular önde, cevaplar arkada", icon: Layers, color: "bg-purple-50 text-purple-700 border-purple-200", href: "/studio" },
            ].map((sub, i) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={i}
                  href={sub.href}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 hover:bg-white text-center transition-all hover:scale-[1.02] group shadow-xs"
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl border flex items-center justify-center ${sub.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {sub.title}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                    {sub.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* INSTRUCTOR SUB-PANEL: "Yükle" */}
      {!isStudent && activeActionTab === "UPLOAD" && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-emerald-200 shadow-xl animate-in fade-in zoom-in-95 space-y-4">
          <div className="text-center space-y-1">
            <h4 className="font-extrabold text-sm text-slate-900">
              Dönüştürün belgeleri etkileşimli kaynaklara
            </h4>
            <p className="text-[11px] text-slate-500">Dosya boyutu 50 MB'a kadar desteklenir.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onOpenUploadModal}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <HardDrive className="w-4 h-4 text-sky-600" />
              <span>Cihazdan Yükle</span>
            </button>
            <button
              onClick={onOpenUploadModal}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>AI PDF Stüdyosu</span>
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              isStudent
                ? "Soru, konu (Conditionals, Phrasal Verbs) veya sınav türü (YDT, YDS, IELTS) ara..."
                : "Herhangi bir sınav (YDT, YDS, IELTS), gramer konusu veya CEFR seviyesi arayın..."
            }
            className="w-full bg-white text-slate-900 placeholder-slate-400 text-sm pl-4 pr-12 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
          />
          <button className="absolute right-2 p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-colors cursor-pointer">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

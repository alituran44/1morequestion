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
        <div className="text-xs font-semibold text-slate-400">
          <span className={isStudent ? "text-emerald-400 font-bold" : "text-sky-400 font-bold"}>[Selam]</span>,{" "}
          <span className="text-slate-100 font-bold">{userName}</span> 🎯{" "}
          <span className={isStudent ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
            {isStudent ? "Bugün Hedefin: 20 Soru" : "Başlayalım."}
          </span>
        </div>

        {/* Top Right Quick Shortcuts */}
        <div className="flex items-center gap-3">
          {isStudent && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>500 Jeton</span>
            </div>
          )}

          {/* Quizizz-Style "Koda Gir" shortcut in top-right */}
          <Link
            href="/join"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-fuchsia-950/60 to-slate-900 border border-fuchsia-500/40 hover:border-fuchsia-400 text-fuchsia-300 hover:text-white text-xs font-extrabold transition-all shadow-md shadow-fuchsia-950/40 group"
          >
            <KeyRound className="w-3.5 h-3.5 text-fuchsia-400 group-hover:scale-110 transition-transform" />
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
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-md cursor-pointer ${
              activeActionTab === "STUDENT_PIN"
                ? "bg-slate-800 border-fuchsia-500 ring-2 ring-fuchsia-500/40 text-fuchsia-300"
                : "bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:border-fuchsia-500/50 text-slate-100"
            }`}
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Koda Katıl</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Sınav veya odaya gir</div>
          </button>

          {/* Student Pill 2: 1v1 Düello */}
          <button
            onClick={() => setActiveActionTab(activeActionTab === "STUDENT_DUEL" ? "NONE" : "STUDENT_DUEL")}
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-md cursor-pointer relative overflow-hidden ${
              activeActionTab === "STUDENT_DUEL"
                ? "bg-slate-800 border-rose-500 ring-2 ring-rose-500/40 text-rose-300"
                : "bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:border-rose-500/50 text-slate-100"
            }`}
          >
            <div className="absolute top-2 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
              Canlı
            </div>
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <Swords className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">1v1 Düello</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Arkadaşına meydan oku</div>
          </button>

          {/* Student Pill 3: Bilgi Kartları */}
          <button
            onClick={() => setActiveActionTab(activeActionTab === "STUDENT_FLASHCARDS" ? "NONE" : "STUDENT_FLASHCARDS")}
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-md cursor-pointer ${
              activeActionTab === "STUDENT_FLASHCARDS"
                ? "bg-slate-800 border-sky-400 ring-2 ring-sky-500/40 text-sky-300"
                : "bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:border-sky-500/50 text-slate-100"
            }`}
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Bilgi Kartları</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Kelime & Kural Ezber</div>
          </button>
        </div>
      ) : (
        /* INSTRUCTOR SPECIFIC 3 PILLS */
        <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
          {/* Button 1: Oluştur */}
          <button
            onClick={() => setActiveActionTab(activeActionTab === "CREATE" ? "NONE" : "CREATE")}
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-md cursor-pointer ${
              activeActionTab === "CREATE"
                ? "bg-slate-800 border-sky-400 ring-2 ring-sky-500/40 text-sky-300"
                : "bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:border-sky-500/50 text-slate-100"
            }`}
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Oluştur</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Bir kaynak hazırla</div>
          </button>

          {/* Button 2: Arama */}
          <Link
            href="/library"
            className="flex-1 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 rounded-2xl p-4 text-center transition-all shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-100">Arama</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Kaynaklar için</div>
          </Link>

          {/* Button 3: Yükle */}
          <button
            onClick={() => setActiveActionTab(activeActionTab === "UPLOAD" ? "NONE" : "UPLOAD")}
            className={`flex-1 rounded-2xl p-4 text-center transition-all border shadow-md relative overflow-hidden cursor-pointer ${
              activeActionTab === "UPLOAD"
                ? "bg-slate-800 border-emerald-400 ring-2 ring-emerald-500/40 text-emerald-300"
                : "bg-gradient-to-b from-slate-900 to-slate-950 border-emerald-500/40 hover:border-emerald-400 text-slate-100"
            }`}
          >
            <div className="absolute top-2 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              AI Magic
            </div>
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Yükle</div>
            <div className="text-[11px] text-slate-400 mt-0.5">ve içeriğinizi geliştirin</div>
          </button>
        </div>
      )}

      {/* STUDENT SUB-PANEL: Quick PIN Input */}
      {activeActionTab === "STUDENT_PIN" && (
        <div className="max-w-lg mx-auto p-5 rounded-3xl bg-[#170e24] border border-fuchsia-950 shadow-2xl animate-in fade-in zoom-in-95 space-y-3 text-center">
          <div className="text-xs font-bold text-fuchsia-300">
            Öğretmeninizin Verdiği 6 Haneli Katılım Kodunu Girin
          </div>
          <form onSubmit={handleQuickJoin} className="flex items-center gap-2">
            <input
              type="text"
              autoFocus
              placeholder="Örn: 904182"
              value={quickPin}
              onChange={(e) => setQuickPin(e.target.value)}
              className="flex-1 bg-slate-950 border border-fuchsia-900/60 rounded-xl px-4 py-2.5 text-slate-100 text-sm font-mono tracking-wider focus:outline-none focus:border-fuchsia-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold transition-all shadow-md shadow-fuchsia-950"
            >
              Hemen Başla
            </button>
          </form>
          <div className="text-[11px] text-slate-400">
            Veya daha fazla seçenek için <Link href="/join" className="text-fuchsia-400 underline font-semibold">Giriş Lobisi</Link>'ne gidin.
          </div>
        </div>
      )}

      {/* STUDENT SUB-PANEL: Quick Duel Room */}
      {activeActionTab === "STUDENT_DUEL" && (
        <div className="max-w-lg mx-auto p-5 rounded-3xl bg-[#170e24] border border-rose-950 shadow-2xl animate-in fade-in zoom-in-95 space-y-4">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-extrabold text-white">Canlı 1v1 İngilizce Karşılaşması</h4>
            <p className="text-[11px] text-slate-400">5 Hızlı Soru • Anlık Puan & Streak Yarışı</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push("/duel/904182")}
              className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-950 cursor-pointer"
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
              className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Davet Linki Al</span>
            </button>
          </div>
        </div>
      )}

      {/* STUDENT SUB-PANEL: Quick Flashcards Decks */}
      {activeActionTab === "STUDENT_FLASHCARDS" && (
        <div className="max-w-lg mx-auto p-5 rounded-3xl bg-[#111827] border border-sky-950 shadow-2xl animate-in fade-in zoom-in-95 space-y-3">
          <div className="text-xs font-bold text-sky-400 uppercase tracking-wider text-center">
            Çalışmak İstediğin Hafıza Destesini Seç
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/flashcards/904182"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 flex items-center gap-2 transition-colors"
            >
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-slate-100">Phrasal Verbs</div>
                <div className="text-[10px] text-slate-400">12 Kelime Kartı</div>
              </div>
            </Link>
            <Link
              href="/flashcards/812044"
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 flex items-center gap-2 transition-colors"
            >
              <Target className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-slate-100">Conditionals & If</div>
                <div className="text-[10px] text-slate-400">8 Kural Kartı</div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* INSTRUCTOR SUB-PANEL: "Oluştur" */}
      {!isStudent && activeActionTab === "CREATE" && (
        <div className="max-w-4xl mx-auto p-5 rounded-3xl bg-[#111827] border border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
            Oluşturmak İstediğiniz İçerik Formatını Seçin
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { title: "Değerlendirme", desc: "Hızlı ve etkileşimli sorular", icon: FileText, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", href: "/studio" },
              { title: "Sunum", desc: "Sorular ve beyaz tahta slaytları", icon: Presentation, color: "bg-amber-500/10 text-amber-400 border-amber-500/20", href: "/studio" },
              { title: "Video", desc: "Videonun kritik anlarında soru", icon: Video, color: "bg-rose-500/10 text-rose-400 border-rose-500/20", href: "/studio" },
              { title: "Geçit (Passage)", desc: "Okuma pasajı temelli sorular", icon: BookOpen, color: "bg-sky-500/10 text-sky-400 border-sky-500/20", href: "/studio" },
              { title: "Bilgi Kartları", desc: "Sorular önde, cevaplar arkada", icon: Layers, color: "bg-purple-500/10 text-purple-400 border-purple-500/20", href: "/studio" },
            ].map((sub, i) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={i}
                  href={sub.href}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-center transition-all hover:scale-[1.02] group"
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl border flex items-center justify-center ${sub.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-sky-300">
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
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-[#111827] border border-emerald-500/30 shadow-2xl animate-in fade-in zoom-in-95 space-y-4">
          <div className="text-center space-y-1">
            <h4 className="font-extrabold text-sm text-slate-100">
              Dönüştürün belgeleri etkileşimli kaynaklara
            </h4>
            <p className="text-[11px] text-slate-400">Dosya boyutu 50 MB'a kadar desteklenir.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onOpenUploadModal}
              className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <HardDrive className="w-4 h-4 text-sky-400" />
              <span>Cihazdan Yükle</span>
            </button>
            <button
              onClick={onOpenUploadModal}
              className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
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
            className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 text-sm pl-4 pr-12 py-3.5 rounded-2xl border border-slate-700/80 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-inner"
          />
          <button className="absolute right-2 p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-colors cursor-pointer">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

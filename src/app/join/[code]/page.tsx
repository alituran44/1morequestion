"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Play, 
  Users, 
  Layers, 
  Volume2, 
  Clock, 
  Zap, 
  Share2, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Trophy,
  HelpCircle,
  Palette
} from "lucide-react";

export default function ExamLobbyPage() {
  const params = useParams();
  const router = useRouter();
  const code = (params?.code as string) || "904182";

  // State from Screenshot 4
  const [readAloud, setReadAloud] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [powerupsEnabled, setPowerupsEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("classic");
  const [isCopied, setIsCopied] = useState(false);

  const examDetails = {
    title: code === "812044" 
      ? "2026 YDS Master Akademik Paragraf & Çeviri" 
      : code === "770192" 
      ? "IELTS Academic Reading Band 7+ Mock" 
      : "2026 YDT Şampiyonlar Özgün Deneme #1",
    questionsCount: 80,
    durationMins: 120,
    instructor: "Ahmet Hoca (ELT Master)",
    examCategory: "YDT (YKS-Dil)",
    bestScore: "68.75 Net",
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/join/${code}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleStartExam = () => {
    router.push(`/exam/${code}?timer=${timerEnabled}&audio=${readAloud}&powerups=${powerupsEnabled}&theme=${selectedTheme}`);
  };

  return (
    <div className="min-h-screen bg-[#140b19] bg-gradient-to-b from-[#1c0d26] via-[#120818] to-[#0a040e] text-slate-100 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/join"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Farklı Kod Gir</span>
        </Link>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
          Sınav Kodu: {code}
        </span>
      </div>

      {/* Main Lobby Interface (Mirrors Screenshot 4) */}
      <main className="max-w-4xl w-full mx-auto my-auto py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Exam Card & History (Screenshot 4 Left) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-[#1e1026] border border-fuchsia-950/60 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center font-black text-xl text-white shrink-0 shadow-lg">
                1+
              </div>
              <div>
                <h2 className="font-extrabold text-base text-white leading-snug">
                  {examDetails.title}
                </h2>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>{examDetails.questionsCount} Soru</span>
                  <span>•</span>
                  <span>{examDetails.durationMins} Dk</span>
                </div>
                <div className="text-[11px] text-fuchsia-400 font-medium mt-1">
                  Eğitmen: {examDetails.instructor}
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-700/80 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>{isCopied ? "Bağlantı Kopyalandı!" : "Sınav Linkini Paylaş"}</span>
            </button>
          </div>

          {/* Son Etkinlik (Previous Attempts) */}
          <div className="bg-[#1e1026] border border-fuchsia-950/60 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Son Etkinlik Geçmişi
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Yalnız İnceleme (En İyi)</span>
                <span className="font-bold text-emerald-400">{examDetails.bestScore}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions, Settings & Themes (Screenshot 4 Right) */}
        <div className="md:col-span-7 space-y-4">
          {/* Big Action Buttons (Screenshot 4) */}
          <div className="space-y-3">
            <button
              onClick={handleStartExam}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm tracking-wide shadow-xl shadow-emerald-950/80 transition-all hover:scale-[1.01] flex items-center justify-center gap-2.5"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Sınava Başla / Yeniden Dene</span>
            </button>

            <button
              onClick={() => router.push(`/duel/${code}`)}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-fuchsia-600" />
              <span>Arkadaşlara Meydan Oku (1v1 Düello)</span>
            </button>

            <button
              onClick={() => router.push(`/flashcards/${code}`)}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-slate-200 font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Bilgi Kartları (Flashcards)</span>
            </button>
          </div>

          {/* Ayarlar (Screenshot 4 Settings Toggles) */}
          <div className="bg-[#1e1026] border border-fuchsia-950/60 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Sınav Ayarları
            </div>

            <div className="space-y-3">
              {/* Metni Sesli Oku */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200">
                  <Volume2 className="w-4 h-4 text-slate-400" />
                  <span>Metni sesli oku (AI Pronunciation)</span>
                </div>
                <input
                  type="checkbox"
                  checked={readAloud}
                  onChange={(e) => setReadAloud(e.target.checked)}
                  className="w-5 h-5 rounded bg-slate-900 border-slate-700 text-emerald-600 focus:ring-0"
                />
              </div>

              {/* Zamanlayıcı */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Zamanlayıcı (Sınav Süresi Geri Sayımı)</span>
                </div>
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className="w-5 h-5 rounded bg-slate-900 border-slate-700 text-emerald-600 focus:ring-0"
                />
              </div>

              {/* Güçlendirmeler */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Güçlendirmeler & Streak Çarpanı</span>
                </div>
                <input
                  type="checkbox"
                  checked={powerupsEnabled}
                  onChange={(e) => setPowerupsEnabled(e.target.checked)}
                  className="w-5 h-5 rounded bg-slate-900 border-slate-700 text-emerald-600 focus:ring-0"
                />
              </div>
            </div>

            {/* Temalar (Screenshot 4 Theme Selector) */}
            <div className="pt-3 border-t border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                <span>Sınav Teması</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "classic", label: "Classic" },
                  { id: "obsidian", label: "Obsidian" },
                  { id: "focus", label: "Focus Zen" },
                  { id: "synthwave", label: "Synthwave" },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setSelectedTheme(th.id)}
                    className={`py-2 text-[11px] font-bold rounded-xl border transition-all ${
                      selectedTheme === th.id
                        ? "bg-white text-slate-900 border-white shadow-md"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

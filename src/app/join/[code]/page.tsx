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
      ? "2026 Boğaziçi Üniversitesi BUEPT Hazırlık Atlama Denemesi #1"
      : code === "552011"
      ? "2026 ODTÜ & İTÜ Seviye İYS Hazırlık Muafiyet Tam Deneme #1"
      : "2026 YDT Şampiyonlar Özgün Deneme #1",
    questionsCount: code === "770192" ? 40 : code === "552011" ? 60 : 80,
    durationMins: code === "770192" ? 210 : code === "552011" ? 165 : 120,
    instructor: code === "770192" ? "Boğaziçi Yeterlik Komisyonu" : "Ahmet Hoca (ELT Master)",
    examCategory: code === "770192" ? "Boğaziçi BUEPT (Hazırlık Atlama)" : code === "552011" ? "ODTÜ / İTÜ İYS (Hazırlık)" : "YDT (YKS-Dil)",
    bestScore: code === "770192" ? "74.00 Puan" : "68.75 Net",
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/join"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Farklı Kod Gir</span>
        </Link>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          Sınav Kodu: {code}
        </span>
      </div>

      {/* Main Lobby Interface (Mirrors Screenshot 4) */}
      <main className="max-w-4xl w-full mx-auto my-auto py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Exam Card & History (Screenshot 4 Left) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center font-black text-xl text-slate-950 shrink-0 shadow-xs">
                1+
              </div>
              <div>
                <h2 className="font-extrabold text-base text-slate-900 leading-snug">
                  {examDetails.title}
                </h2>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>{examDetails.questionsCount} Soru</span>
                  <span>•</span>
                  <span>{examDetails.durationMins} Dk</span>
                </div>
                <div className="text-[11px] text-amber-700 font-bold mt-1">
                  Eğitmen: {examDetails.instructor}
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>{isCopied ? "Bağlantı Kopyalandı!" : "Sınav Linkini Paylaş"}</span>
            </button>
          </div>

          {/* Son Etkinlik (Previous Attempts) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Son Etkinlik Geçmişi
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Yalnız İnceleme (En İyi)</span>
                <span className="font-bold text-emerald-600">{examDetails.bestScore}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
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
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm tracking-wide shadow-xs hover:shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Sınava Başla / Yeniden Dene</span>
            </button>

            <button
              onClick={() => router.push(`/duel/${code}`)}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-slate-950" />
              <span>Arkadaşlara Meydan Oku (1v1 Düello)</span>
            </button>

            <button
              onClick={() => router.push(`/flashcards/${code}`)}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Bilgi Kartları (Flashcards)</span>
            </button>
          </div>

          {/* Ayarlar (Screenshot 4 Settings Toggles) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Sınav Ayarları
            </div>

            <div className="space-y-3">
              {/* Metni Sesli Oku */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <Volume2 className="w-4 h-4 text-slate-400" />
                  <span>Metni sesli oku (AI Pronunciation)</span>
                </div>
                <input
                  type="checkbox"
                  checked={readAloud}
                  onChange={(e) => setReadAloud(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-0 cursor-pointer"
                />
              </div>

              {/* Zamanlayıcı */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Zamanlayıcı (Sınav Süresi Geri Sayımı)</span>
                </div>
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-0 cursor-pointer"
                />
              </div>

              {/* Güçlendirmeler */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Güçlendirmeler & Streak Çarpanı</span>
                </div>
                <input
                  type="checkbox"
                  checked={powerupsEnabled}
                  onChange={(e) => setPowerupsEnabled(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Temalar (Screenshot 4 Theme Selector) */}
            <div className="pt-3 border-t border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
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
                    className={`py-2 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedTheme === th.id
                        ? "bg-amber-500 text-slate-950 border-amber-500 shadow-xs font-black"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900"
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

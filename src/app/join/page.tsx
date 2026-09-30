"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  BookOpen, 
  Trophy, 
  Users, 
  FileText,
  Coins
} from "lucide-react";

export default function JoinPage() {
  const router = useRouter();
  const [pinCode, setPinCode] = useState("");
  const [error, setError] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinCode.trim().replace(/\s/g, "");
    if (!cleanPin || cleanPin.length < 4) {
      setError("Lütfen geçerli en az 4-6 haneli bir sınav kodu girin.");
      return;
    }
    router.push(`/join/${cleanPin}`);
  };

  const assignedActivities = [
    {
      code: "904182",
      title: "2026 YDT Şampiyonlar Özgün Deneme #1",
      questionCount: 80,
      instructor: "Ahmet Hoca (ELT)",
      category: "YDT (YKS-Dil)",
      isHomework: true,
      dueDate: "5 Ekim 2026",
    },
    {
      code: "812044",
      title: "2026 YDS Master Akademik Paragraf & Çeviri",
      questionCount: 80,
      instructor: "Ahmet Hoca (ELT)",
      category: "YDS Master",
      isHomework: true,
      dueDate: "8 Ekim 2026",
    },
    {
      code: "770192",
      title: "IELTS Academic Reading Band 7+ Mock",
      questionCount: 40,
      instructor: "Sınav Komisyonu",
      category: "IELTS Academic",
      isHomework: false,
      dueDate: undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-[#140b19] bg-gradient-to-b from-[#1b0d24] via-[#120818] to-[#0a040e] text-slate-100 flex flex-col justify-between p-4 sm:p-8 selection:bg-fuchsia-600 selection:text-white relative overflow-hidden">
      {/* Background Graphic Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center font-black text-[25vw] tracking-tighter text-white select-none">
        1+
      </div>

      {/* Top Bar */}
      <header className="flex items-center justify-between max-w-5xl w-full mx-auto z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-emerald-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-fuchsia-950">
            1+
          </div>
          <div>
            <div className="font-black text-lg tracking-tight text-white">1morequestion</div>
            <div className="text-[10px] text-fuchsia-300 font-semibold tracking-wider uppercase">
              Student Live Arena
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>500 Jeton</span>
          </div>
          <Link
            href="/"
            className="text-xs px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white font-medium"
          >
            Eğitmen Paneli
          </Link>
        </div>
      </header>

      {/* Main Join Box (Mirrors Wayground Screenshot 3) */}
      <main className="max-w-xl w-full mx-auto my-auto py-10 z-10 text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quizizz & Wayground Canlı Sınav Girişi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Sınava veya Canlı Odaya Katıl
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Öğretmeninizin verdiği 6 haneli sınav kodunu girin
          </p>
        </div>

        {/* Big Code Input Form */}
        <form onSubmit={handleJoin} className="space-y-3">
          <div className="flex items-center p-2 rounded-2xl bg-white border-4 border-fuchsia-900/80 shadow-2xl shadow-fuchsia-950/60 transition-all focus-within:border-fuchsia-500">
            <input
              type="text"
              required
              autoFocus
              placeholder="Bir katılma kodu girin (örn: 904182)"
              value={pinCode}
              onChange={(e) => {
                setPinCode(e.target.value);
                setError("");
              }}
              className="flex-1 px-4 py-3 text-base sm:text-lg font-bold text-slate-900 placeholder-slate-400 focus:outline-none tracking-wider"
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black text-sm tracking-wide transition-all shadow-md shadow-fuchsia-950 flex items-center gap-2 shrink-0"
            >
              <span>Katıl</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-400 animate-in fade-in">
              {error}
            </p>
          )}
        </form>

        {/* Assigned Activities & Quick Tests (Mirrors Wayground Screenshot 3 Carousel) */}
        <div className="pt-8 border-t border-slate-800/80 text-left space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Atanan Aktiviteler & Hızlı Denemeler</span>
            <span className="text-[10px] text-fuchsia-400 font-semibold">Tıklayıp Anında Başla</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {assignedActivities.map((act) => (
              <div
                key={act.code}
                onClick={() => router.push(`/join/${act.code}`)}
                className="bg-slate-900/90 border border-slate-800 hover:border-fuchsia-500/50 p-3.5 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] shadow-lg group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                    PIN: {act.code}
                  </span>
                  <span className="text-[10px] text-slate-400">{act.questionCount} Soru</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-fuchsia-300 line-clamp-2 transition-colors mb-2">
                  {act.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{act.instructor}</span>
                  {act.isHomework && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                      Ödev • {act.dueDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-4 border-t border-slate-900/80 z-10">
        1morequestion Sınav Simülatörü • Kod ile Canlı Sınav ve Adaptif Havuz Katılımı
      </footer>
    </div>
  );
}

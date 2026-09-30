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
      title: "2026 Boğaziçi Üniversitesi BUEPT Hazırlık Atlama Denemesi #1",
      questionCount: 40,
      instructor: "Ahmet Hoca (ELT)",
      category: "Boğaziçi BUEPT (Hazırlık Atlama)",
      isHomework: true,
      dueDate: "10 Ekim 2026",
    },
    {
      code: "552011",
      title: "2026 ODTÜ & İTÜ Seviye İYS Hazırlık Muafiyet Tam Deneme #1",
      questionCount: 60,
      instructor: "Sınav Komisyonu",
      category: "ODTÜ / İTÜ İYS (Hazırlık)",
      isHomework: false,
      dueDate: undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background Graphic Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center font-black text-[25vw] tracking-tighter text-slate-900 select-none">
        1+
      </div>

      {/* Top Bar */}
      <header className="flex items-center justify-between max-w-5xl w-full mx-auto z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-xs">
            1+
          </div>
          <div>
            <div className="font-black text-lg tracking-tight text-slate-900">1morequestion</div>
            <div className="text-[10px] text-amber-600 font-bold tracking-wider uppercase">
              Öğrenci Canlı Arenası
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>500 Jeton</span>
          </div>
          <Link
            href="/"
            className="text-xs px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold shadow-xs transition-colors"
          >
            Eğitmen Paneli
          </Link>
        </div>
      </header>

      {/* Main Join Box (Mirrors Wayground Screenshot 3) */}
      <main className="max-w-xl w-full mx-auto my-auto py-10 z-10 text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Canlı Sınav & Düello Katılım Girişi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Sınava veya Canlı Odaya Katıl
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Öğretmeninizin verdiği 6 haneli sınav kodunu girin
          </p>
        </div>

        {/* Big Code Input Form */}
        <form onSubmit={handleJoin} className="space-y-3">
          <div className="flex items-center p-2 rounded-2xl bg-white border-2 border-slate-200 shadow-md transition-all focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10">
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
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm tracking-wide transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Katıl</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-600 animate-in fade-in">
              {error}
            </p>
          )}
        </form>

        {/* Assigned Activities & Quick Tests */}
        <div className="pt-8 border-t border-slate-200 text-left space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Atanan Aktiviteler & Hızlı Denemeler</span>
            <span className="text-[10px] text-amber-600 font-bold">Tıklayıp Anında Başla</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {assignedActivities.map((act) => (
              <div
                key={act.code}
                onClick={() => router.push(`/join/${act.code}`)}
                className="bg-white border border-slate-200 hover:border-amber-400 p-3.5 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] shadow-xs hover:shadow-md group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    PIN: {act.code}
                  </span>
                  <span className="text-[10px] text-slate-500">{act.questionCount} Soru</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 line-clamp-2 transition-colors mb-2">
                  {act.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{act.instructor}</span>
                  {act.isHomework && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-bold">
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
      <footer className="text-center text-xs text-slate-500 py-4 border-t border-slate-200 z-10">
        1morequestion Sınav Simülatörü • Kod ile Canlı Sınav ve Adaptif Havuz Katılımı
      </footer>
    </div>
  );
}

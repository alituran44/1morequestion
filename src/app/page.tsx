"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { 
  KeyRound, 
  Sparkles, 
  Swords, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  GraduationCap, 
  Trophy, 
  Zap, 
  Flame, 
  Coins, 
  Check, 
  Star,
  ChevronDown
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [quickPin, setQuickPin] = useState("");
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = quickPin.trim().replace(/\s/g, "");
    if (!clean) return;
    router.push(`/join/${clean}`);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* 1. TOP NAVBAR (Mirrors Wayground Header) */}
      <header className="sticky top-0 z-50 bg-[#080c14]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <BrandLogo size="md" showText={true} href="/" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#portals" className="hover:text-amber-300 transition-colors">
              Giriş Portalları
            </a>
            <a href="#features" className="hover:text-amber-300 transition-colors">
              Özellikler
            </a>
            <a href="#exams" className="hover:text-amber-300 transition-colors">
              Sınav Türleri
            </a>
            <Link href="/library" className="hover:text-amber-300 transition-colors">
              İçerik Kütüphanesi
            </Link>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick PIN Button (Quizizz Exact Match) */}
            <Link
              href="/join"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-extrabold transition-all shadow-md shadow-amber-950/40 group cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>#! Koda gir</span>
            </Link>

            {/* Giriş Yap Dropdown (Distinct Portals Selector) */}
            <div className="relative">
              <button
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Giriş Yap</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isLoginDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#0f172a] border border-amber-500/30 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 space-y-1">
                  <Link
                    href="/student"
                    onClick={() => setIsLoginDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-amber-500/10 text-amber-300 font-bold transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>Öğrenci Girişi</span>
                  </Link>

                  <Link
                    href="/instructor"
                    onClick={() => setIsLoginDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 font-bold transition-colors"
                  >
                    <Users className="w-4 h-4 text-slate-300" />
                    <span>Eğitmen Girişi</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setIsLoginDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-amber-950/20 text-amber-400 font-bold transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span>Yönetici (Admin) Girişi</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <Link
              href="/student"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <span>Hemen Başla</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (Wayground Turkish Style) */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6 max-w-7xl mx-auto w-full text-center space-y-8">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-600/15 via-yellow-600/10 to-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="space-y-4 max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>TÜRKİYE'NİN İLK VE TEK AI DESTEKLİ İNGİLİZCE SINAV EKOSİSTEMİ</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Öğrenmeyi ve Öğretmeyi <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              Herkes İçin Güçlü Kılın.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            YDT, YDS, YÖKDİL, IELTS ve TOEFL sınavlarında; öğretmenler için yapay zeka ile saniyeler içinde deneme üretimi, öğrenciler için 1v1 canlı düellolar ve adaptif "1 Soru Daha" telafi algoritması.
          </p>
        </div>

        {/* Quick PIN Input Bar on Hero */}
        <div className="max-w-md mx-auto relative z-10">
          <form onSubmit={handlePinSubmit} className="flex items-center p-1.5 rounded-2xl bg-white border-2 border-amber-500 shadow-2xl shadow-amber-950/60">
            <input
              type="text"
              placeholder="Öğretmeninizin 6 haneli kodunu girin (örn: 904182)"
              value={quickPin}
              onChange={(e) => setQuickPin(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs tracking-wide transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Katıl</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 3 DISTINCT PORTAL ENTRANCES (Requested: "ana sayfadan farklı girişlerle girilsin") */}
        <div id="portals" className="pt-8 relative z-10">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-6">
            Kullanıcı Rolünüze Göre Doğrudan Giriş Yapın
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
            {/* PORTAL 1: ÖĞRENCİ GİRİŞİ */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#0a0e17] border border-amber-500/40 hover:border-amber-400 transition-all shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1">
                    Öğrenci Portalı
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                    Öğrenci Arenası
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Sınavlara gir, 1v1 düelloda arkadaşlarınla yarış, bilgi kartları ile akademik kelimeleri ezberle ve netlerini anında gör.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>500 Jeton Başlangıç Bakiyesi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Adaptif "1 Soru Daha" Telafisi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Arkadaşlarla Canlı 1v1 Düello</span>
                  </div>
                </div>
              </div>

              <Link
                href="/student"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs tracking-wide shadow-lg shadow-amber-500/20 text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Öğrenci Olarak Başla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* PORTAL 2: EĞİTMEN GİRİŞİ */}
            <div className="p-6 rounded-3xl bg-[#0f172a] border border-sky-500/30 hover:border-sky-500/70 transition-all shadow-xl hover:shadow-sky-950/30 flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-1">
                    Eğitmen & Okul Portalı
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-sky-300 transition-colors">
                    Öğretmen Paneli
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    PDF yükle, AI ile 1 dakikada deneme üret, sınıflarına ödev ata, madde analitiği ve otomatik veli bildirimleri al.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-sky-400" />
                    <span>AI PDF Deneme Stüdyosu (OCR)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-sky-400" />
                    <span>Sınıflar & Zayıf Kazanım Ödevi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-sky-400" />
                    <span>Öğrenci & Veli Rapor Karnesi</span>
                  </div>
                </div>
              </div>

              <Link
                href="/instructor"
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-amber-500/30 text-amber-300 font-extrabold text-xs tracking-wide shadow-lg text-center transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:border-amber-500/60"
              >
                <span>Eğitmen Olarak Başla</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>

            {/* PORTAL 3: YÖNETİCİ (ADMIN) GİRİŞİ */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#080c14] border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 mb-1">
                    Merkezi Yönetim
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                    Admin Kontrol Paneli
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Tüm platformu, soru havuzunu, onay bekleyen sınavları, kullanıcı yetkilerini ve Paynkolay Sanal POS muhasebesini denetle.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Paynkolay Ciro & Hakediş Takibi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Deneme Onay Masası (Moderasyon)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>IRT Motoru & Sistem Sağlığı</span>
                  </div>
                </div>
              </div>

              <Link
                href="/admin"
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-extrabold text-xs tracking-wide shadow-lg text-center transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:border-slate-600"
              >
                <span>Yönetici Paneline Git</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES BENTO GRID (Wayground Style) */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto w-full space-y-10 border-t border-slate-800/80">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Geleneksel Sınav Hazırlığını Unutun.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Wayground ve Quizizz dinamiklerini sınav hazırlığına taşıyan yeni nesil özellikler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Feature 1 */}
          <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/80 hover:border-amber-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-white">AI Deneme Stüdyosu</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mevcut soru PDF'inizi yükleyin; OCR ve yapay zeka saniyeler içinde şıkları, doğru cevapları ve optik formu otomatik oluştursun.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/80 hover:border-amber-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-white">Adaptif "1 Soru Daha"</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              IRT (Item Response Theory) modeli, öğrencinin hata yaptığı kazanımı anında tespit eder ve telafi sorusu yönlendirir.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/80 hover:border-amber-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Swords className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-white">1v1 Canlı Düello</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Arkadaşlarla kafa kafaya yarış, 15 saniyelik turlar, streak puanları ve oyun içi 50:50 güçlendiricileri ile eğlenceli ezber.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/80 hover:border-amber-500/30 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-white">Madde Analizi & Karne</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Öğretmenler için sınıfın en zayıf kazanım tespiti, tek tıkla pekiştirme ödevi atama ve veliye anlık ilerleme raporu.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SUPPORTED EXAMS SHOWCASE */}
      <section id="exams" className="py-16 px-6 max-w-7xl mx-auto w-full space-y-8 border-t border-slate-800/80">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Hedefiniz Hangi Sınav Olursa Olsun Yanınızdayız
          </h2>
          <p className="text-xs text-slate-400">
            Tüm sınav türleri için tam uyumlu soru formatları ve süre simülatörleri
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { code: "YDT", name: "YKS-Dil Hazırlık", tag: "Ulusal", color: "border-amber-500/30 text-amber-300" },
            { code: "YDS", name: "Yabancı Dil Sınavı", tag: "Akademik", color: "border-yellow-500/30 text-yellow-300" },
            { code: "YÖKDİL", name: "Sağlık / Fen / Sosyal", tag: "Akademik", color: "border-amber-500/30 text-amber-300" },
            { code: "IELTS", name: "Academic Band 7.5+", tag: "Uluslararası", color: "border-yellow-500/30 text-yellow-300" },
            { code: "TOEFL", name: "iBT Academic 120", tag: "Uluslararası", color: "border-amber-500/30 text-amber-300" },
            { code: "DET", name: "Duolingo English Test", tag: "Adaptive", color: "border-yellow-500/30 text-yellow-300" },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-2xl bg-slate-900/60 border ${item.color} text-center space-y-1`}>
              <div className="text-[10px] font-bold text-slate-400 uppercase">{item.tag}</div>
              <div className="text-lg font-black text-white">{item.code}</div>
              <div className="text-[11px] text-slate-400">{item.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-slate-800 bg-[#060910] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" showText={true} />
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 text-[11px]">
              © 2026 1Q MORE QUIZ • Türkiye'nin AI Destekli İngilizce Sınav Arenası
            </span>
          </div>
          <div className="flex items-center gap-6 text-slate-400 font-medium">
            <Link href="/student" className="hover:text-amber-400 transition-colors">Öğrenci Arenası</Link>
            <Link href="/instructor" className="hover:text-amber-400 transition-colors">Öğretmen Paneli</Link>
            <Link href="/admin" className="hover:text-amber-400 transition-colors">Admin Paneli</Link>
            <Link href="/join" className="hover:text-amber-400 transition-colors">Koda Gir</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

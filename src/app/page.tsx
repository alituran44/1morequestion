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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* 1. TOP NAVBAR (Mirrors Wayground Header) */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <BrandLogo size="md" showText={false} href="/" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#portals" className="hover:text-amber-600 transition-colors">
              Giriş Portalları
            </a>
            <a href="#features" className="hover:text-amber-600 transition-colors">
              Özellikler
            </a>
            <a href="#exams" className="hover:text-amber-600 transition-colors">
              Sınav Türleri
            </a>
            <Link href="/library" className="hover:text-amber-600 transition-colors">
              İçerik Kütüphanesi
            </Link>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick PIN Button */}
            <Link
              href="/join"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-fuchsia-50 border border-fuchsia-200 hover:bg-fuchsia-100 text-fuchsia-700 hover:text-fuchsia-900 text-xs font-extrabold transition-all shadow-xs group cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-fuchsia-600 group-hover:scale-110 transition-transform" />
              <span>#! Koda gir</span>
            </Link>

            {/* Giriş Yap Dropdown (Distinct Portals Selector) */}
            <div className="relative">
              <button
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Giriş Yap</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isLoginDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 space-y-1">
                  <Link
                    href="/student"
                    onClick={() => setIsLoginDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-amber-50 text-amber-950 font-bold transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                    <span>Öğrenci Girişi</span>
                  </Link>

                  <Link
                    href="/instructor"
                    onClick={() => setIsLoginDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 font-bold transition-colors"
                  >
                    <Users className="w-4 h-4 text-sky-600" />
                    <span>Eğitmen Girişi</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setIsLoginDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-amber-50 text-amber-950 font-bold transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Yönetici (Admin) Girişi</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <Link
              href="/student"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all shadow-xs cursor-pointer"
            >
              <span>Hemen Başla</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6 max-w-7xl mx-auto w-full text-center space-y-8">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-200/40 via-yellow-200/30 to-amber-100/30 blur-[130px] rounded-full pointer-events-none" />

        <div className="space-y-4 max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>TÜRKİYE'NİN İLK VE TEK AI DESTEKLİ İNGİLİZCE SINAV EKOSİSTEMİ</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Öğrenmeyi ve Öğretmeyi <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-xs">
              Herkes İçin Güçlü Kılın.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            YDT, YDS, YÖKDİL, Üniversite Hazırlık Atlama (Proficiency / BUEPT / İYS) ve IELTS/TOEFL sınavlarında; ses kayıtlı Speaking simülatörü, yapay zeka ile deneme üretimi ve adaptif "1 Soru Daha" telafi motoru.
          </p>
        </div>

        {/* Quick PIN Input Bar on Hero */}
        <div className="max-w-md mx-auto relative z-10">
          <form onSubmit={handlePinSubmit} className="flex items-center p-1.5 rounded-2xl bg-white border-2 border-amber-400 shadow-xl shadow-amber-500/10">
            <input
              type="text"
              placeholder="Öğretmeninizin 6 haneli kodunu girin (örn: 904182)"
              value={quickPin}
              onChange={(e) => setQuickPin(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs tracking-wide transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Katıl</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 3 DISTINCT PORTAL ENTRANCES */}
        <div id="portals" className="pt-8 relative z-10">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-6">
            Kullanıcı Rolünüze Göre Doğrudan Giriş Yapın
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
            {/* PORTAL 1: ÖĞRENCİ GİRİŞİ */}
            <div className="p-6 rounded-3xl bg-white border-2 border-amber-400/80 hover:border-amber-500 transition-all shadow-md hover:shadow-xl flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 mb-1">
                    Öğrenci Portalı
                  </div>
                  <h3 className="text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                    Öğrenci Arenası
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Sınavlara gir, 1v1 düelloda arkadaşlarınla yarış, bilgi kartları ile akademik kelimeleri ezberle ve netlerini anında gör.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[11px] text-slate-700">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>500 Jeton Başlangıç Bakiyesi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-700">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>Adaptif "1 Soru Daha" Telafisi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-700">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>Arkadaşlarla Canlı 1v1 Düello</span>
                  </div>
                </div>
              </div>

              <Link
                href="/student"
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs tracking-wide shadow-xs text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Öğrenci Olarak Başla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* PORTAL 2: EĞİTMEN GİRİŞİ */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-sky-400 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200 mb-1">
                    Eğitmen & Okul Portalı
                  </div>
                  <h3 className="text-xl font-black text-slate-950 group-hover:text-sky-600 transition-colors">
                    Öğretmen Paneli
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    PDF yükle, AI ile 1 dakikada deneme üret, sınıflarına ödev ata, madde analitiği ve otomatik veli bildirimleri al.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[11px] text-slate-700">
                    <Check className="w-3.5 h-3.5 text-sky-600" />
                    <span>AI PDF Deneme Stüdyosu (OCR)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-700">
                    <Check className="w-3.5 h-3.5 text-sky-600" />
                    <span>Sınıflar & Zayıf Kazanım Ödevi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-700">
                    <Check className="w-3.5 h-3.5 text-sky-600" />
                    <span>Öğrenci & Veli Rapor Karnesi</span>
                  </div>
                </div>
              </div>

              <Link
                href="/instructor"
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-black text-xs tracking-wide shadow-xs text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Eğitmen Olarak Başla</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>

            {/* PORTAL 3: YÖNETİCİ (ADMIN) GİRİŞİ */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 mb-1">
                    Merkezi Yönetim
                  </div>
                  <h3 className="text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors">
                    Admin Kontrol Paneli
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Tüm platformu, soru havuzunu, onay bekleyen sınavları, kullanıcı yetkilerini ve Paynkolay Sanal POS muhasebesini denetle.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[11px] text-slate-700">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>Paynkolay Ciro & Hakediş Takibi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-700">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>Deneme Onay Masası (Moderasyon)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-700">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>IRT Motoru & Sistem Sağlığı</span>
                  </div>
                </div>
              </div>

              <Link
                href="/admin"
                className="w-full py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-extrabold text-xs tracking-wide shadow-xs text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Yönetici Paneline Git</span>
                <ArrowRight className="w-4 h-4 text-amber-700" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES BENTO GRID (Wayground Style) */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto w-full space-y-10 border-t border-slate-200">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Geleneksel Sınav Hazırlığını Unutun.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Wayground ve Quizizz dinamiklerini sınav hazırlığına taşıyan yeni nesil özellikler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Feature 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 transition-all space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900">AI Deneme Stüdyosu</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mevcut soru PDF'inizi yükleyin; OCR ve yapay zeka saniyeler içinde şıkları, doğru cevapları ve optik formu otomatik oluştursun.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 transition-all space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900">Adaptif "1 Soru Daha"</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              IRT (Item Response Theory) modeli, öğrencinin hata yaptığı kazanımı anında tespit eder ve telafi sorusu yönlendirir.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 transition-all space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Swords className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900">1v1 Canlı Düello</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Arkadaşlarla kafa kafaya yarış, 15 saniyelik turlar, streak puanları ve oyun içi 50:50 güçlendiricileri ile eğlenceli ezber.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 transition-all space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900">Madde Analizi & Karne</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Öğretmenler için sınıfın en zayıf kazanım tespiti, tek tıkla pekiştirme ödevi atama ve veliye anlık ilerleme raporu.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SUPPORTED EXAMS SHOWCASE */}
      <section id="exams" className="py-16 px-6 max-w-7xl mx-auto w-full space-y-8 border-t border-slate-200">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Hedefiniz Hangi Sınav Olursa Olsun Yanınızdayız
          </h2>
          <p className="text-xs text-slate-500">
            Tüm sınav türleri için tam uyumlu soru formatları ve süre simülatörleri
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5">
          {[
            { code: "YDT", name: "YKS-Dil Hazırlık", tag: "ÖSYM / Ulusal", color: "border-amber-200 text-amber-700 bg-amber-50/50" },
            { code: "YDS & YÖKDİL", name: "Akademik Dil Sınavları", tag: "ÖSYM / Ulusal", color: "border-amber-200 text-amber-700 bg-amber-50/50" },
            { code: "BUEPT", name: "Boğaziçi BÜYES Yeterlik", tag: "Hazırlık Atlama", color: "border-teal-200 text-teal-800 bg-teal-50/60" },
            { code: "ODTÜ / İTÜ İYS", name: "İngilizce Yeterlik (EPE/İYS)", tag: "Hazırlık Atlama", color: "border-teal-200 text-teal-800 bg-teal-50/60" },
            { code: "PROFICIENCY", name: "Genel Üniversite Muafiyet", tag: "Hazırlık Atlama", color: "border-teal-200 text-teal-800 bg-teal-50/60" },
            { code: "BİLKENT & KOÇ", name: "PAE / KUEPE Muafiyet", tag: "Hazırlık Atlama", color: "border-teal-200 text-teal-800 bg-teal-50/60" },
            { code: "IELTS Academic", name: "Band 7.5+ 4 Beceri", tag: "Uluslararası", color: "border-purple-200 text-purple-800 bg-purple-50/50" },
            { code: "TOEFL iBT & PTE", name: "Yeni Nesil Entegre Sınav", tag: "Uluslararası", color: "border-purple-200 text-purple-800 bg-purple-50/50" },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border ${item.color} text-center space-y-1 shadow-xs hover:shadow-md transition-shadow`}>
              <div className="text-[10px] font-bold text-slate-500 uppercase">{item.tag}</div>
              <div className="text-base sm:text-lg font-black text-slate-900">{item.code}</div>
              <div className="text-[11px] text-slate-600 font-medium">{item.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" showText={false} />
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-500 text-[11px]">
              © 2026 1morequiz • Türkiye'nin AI Destekli İngilizce Sınav Arenası
            </span>
          </div>
          <div className="flex items-center gap-6 text-slate-600 font-medium">
            <Link href="/student" className="hover:text-amber-600 transition-colors">Öğrenci Arenası</Link>
            <Link href="/instructor" className="hover:text-amber-600 transition-colors">Öğretmen Paneli</Link>
            <Link href="/admin" className="hover:text-amber-600 transition-colors">Admin Paneli</Link>
            <Link href="/join" className="hover:text-amber-600 transition-colors">Koda Gir</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

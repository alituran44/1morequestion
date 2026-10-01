"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { 
  Search,
  KeyRound, 
  Lock,
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
  ChevronDown,
  Clock,
  Mic,
  PenTool,
  FileText,
  Volume2,
  Bookmark,
  Share2
} from "lucide-react";

import { AuthModal } from "@/components/AuthModal";
import { PricingSection } from "@/components/PricingSection";

export default function LandingPage() {
  const router = useRouter();
  const [quickPin, setQuickPin] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

  const openAuth = (mode: "login" | "register") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setIsLoginDropdownOpen(false);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = quickPin.trim().replace(/\s/g, "");
    if (!clean) return;
    router.push(`/join/${clean}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/student?q=${encodeURIComponent(searchQuery)}`);
  };

  // Quizlet-style Study Set discovery items
  const popularStudySets = [
    {
      id: "mock-1",
      title: "2026 YDT Şampiyonlar Özgün Deneme #1",
      questionCount: "80 Soru",
      duration: "120 Dk",
      category: "YDT (YKS-Dil)",
      author: "Ahmet Hoca (ELT)",
      authorInitial: "A",
      rating: "4.9",
      href: "/exam/mock-1"
    },
    {
      id: "mock-buept",
      title: "Boğaziçi Üniversitesi BUEPT / BÜYES Hazırlık Atlama",
      questionCount: "40 Soru",
      duration: "210 Dk",
      category: "Hazırlık Atlama",
      author: "BÜ Yeterlik Komisyonu",
      authorInitial: "B",
      rating: "5.0",
      href: "/exam/mock-1"
    },
    {
      id: "mock-iys",
      title: "ODTÜ & İTÜ İYS Seviye Muafiyet Denemesi #1",
      questionCount: "60 Soru",
      duration: "165 Dk",
      category: "Hazırlık Atlama",
      author: "Metu / ITU ELT Lab",
      authorInitial: "M",
      rating: "4.8",
      href: "/exam/mock-1"
    },
    {
      id: "mock-ielts",
      title: "IELTS Academic Reading & Vocabulary Band 7.5+",
      questionCount: "40 Soru",
      duration: "60 Dk",
      category: "IELTS Academic",
      author: "Sarah Jenkins (IELTS Master)",
      authorInitial: "S",
      rating: "4.9",
      href: "/exam/mock-1"
    },
    {
      id: "mock-flash",
      title: "YDS & YÖKDİL En Çok Çıkan 500 Akademik Kelime",
      questionCount: "150 Kart",
      duration: "Akıllı Tekrar",
      category: "Kelime Kartları",
      author: "Dr. Selin Demir",
      authorInitial: "D",
      rating: "5.0",
      href: "/flashcards/set-1"
    },
    {
      id: "mock-speaking",
      title: "TOEFL iBT & IELTS Ses Kayıtlı Speaking Görevleri",
      questionCount: "6 Görev",
      duration: "Sesli Simülatör",
      category: "Speaking Lab",
      author: "ETS Akredite Eğitmenler",
      authorInitial: "E",
      rating: "4.9",
      href: "/exam/mock-1"
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#282e3e] flex flex-col justify-between selection:bg-[#4255ff] selection:text-white">
      {/* 1. TOP NAVIGATION BAR (Exact Quizlet Spec: #ffffff, 56px, shadow-md, centered pill search bar) */}
      <header className="sticky top-0 z-50 bg-[#ffffff] border-b border-[#d9dde8] shadow-[0_4px_16px_rgba(40,46,62,0.1)] px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto h-16 flex items-center justify-between gap-4">
          {/* Logo & Dropdown Menus */}
          <div className="flex items-center gap-6 shrink-0">
            <BrandLogo size="md" showText={false} href="/" />

            {/* Study Tools Dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => {
                  setIsToolsDropdownOpen(!isToolsDropdownOpen);
                  setIsLoginDropdownOpen(false);
                }}
                className="flex items-center gap-1 text-[14px] font-semibold text-[#282e3e] hover:text-[#4255ff] transition-colors rounded-[4px] px-2 py-1 cursor-pointer"
              >
                <span>Çalışma Araçları</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#586380]" />
              </button>

              {isToolsDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-[#ffffff] border border-[#d9dde8] rounded-[8px] shadow-[0_4px_16px_rgba(40,46,62,0.1)] p-2 z-50 text-[14px] space-y-1">
                  <Link
                    href="/student"
                    onClick={() => setIsToolsDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-[4px] hover:bg-[#f6f7fb] text-[#282e3e] transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#4255ff]" />
                    <div>
                      <div className="font-semibold text-[13px]">Deneme Sınavları</div>
                      <div className="text-[11px] text-[#586380]">YDT, YDS, BUEPT, İYS, IELTS</div>
                    </div>
                  </Link>

                  <Link
                    href="/flashcards/set-1"
                    onClick={() => setIsToolsDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-[4px] hover:bg-[#f6f7fb] text-[#282e3e] transition-colors"
                  >
                    <Layers className="w-4 h-4 text-[#4255ff]" />
                    <div>
                      <div className="font-semibold text-[13px]">Akıllı Kelime Kartları</div>
                      <div className="text-[11px] text-[#586380]">Spaced Repetition & Flashcards</div>
                    </div>
                  </Link>

                  <Link
                    href="/duel/lobby"
                    onClick={() => setIsToolsDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-[4px] hover:bg-[#f6f7fb] text-[#282e3e] transition-colors"
                  >
                    <Swords className="w-4 h-4 text-[#4255ff]" />
                    <div>
                      <div className="font-semibold text-[13px]">1v1 Canlı Sınav Düellosu</div>
                      <div className="text-[11px] text-[#586380]">Arkadaşlarla kafa kafaya yarış</div>
                    </div>
                  </Link>

                  <Link
                    href="/exam/mock-1"
                    onClick={() => setIsToolsDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-[4px] hover:bg-[#f6f7fb] text-[#282e3e] transition-colors"
                  >
                    <Mic className="w-4 h-4 text-[#4255ff]" />
                    <div>
                      <div className="font-semibold text-[13px]">Speaking & Writing Lab</div>
                      <div className="text-[11px] text-[#586380]">Ses kayıtlı konuşma & kompozisyon</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <a
              href="#pricing"
              className="hidden md:inline-block text-[14px] font-semibold text-[#282e3e] hover:text-[#4255ff] transition-colors"
            >
              Paketler & Fiyatlar
            </a>

            <Link
              href="/library"
              className="hidden md:inline-block text-[14px] font-semibold text-[#282e3e] hover:text-[#4255ff] transition-colors"
            >
              Soru Havuzu
            </Link>
          </div>

          {/* Centered Search Bar (Signature Quizlet Pill Search) */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex-1 max-w-[360px] mx-2 hidden sm:flex items-center bg-[#f6f7fb] rounded-[200px] px-4 py-2 hover:bg-[#edefff]/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#4255ff] focus-within:ring-offset-1 transition-all border border-transparent focus-within:border-[#4255ff]"
          >
            <Search className="w-4 h-4 text-[#939bb4] shrink-0 mr-2.5" />
            <input
              type="text"
              placeholder="Sınav, paket veya konu ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-0 outline-none text-[14px] text-[#282e3e] placeholder-[#939bb4] w-full font-normal"
            />
          </form>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick PIN Button (Ghost Link with key icon) */}
            <Link
              href="/join"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[200px] hover:bg-[#edefff] text-[#4255ff] text-[13px] font-semibold transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Koda Gir</span>
            </Link>

            {/* Login Dropdown & Direct Auth trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLoginDropdownOpen(!isLoginDropdownOpen);
                  setIsToolsDropdownOpen(false);
                }}
                className="px-3.5 py-1.5 rounded-[200px] border border-[#d9dde8] hover:border-[#4255ff] text-[13px] font-semibold text-[#282e3e] hover:text-[#4255ff] transition-all flex items-center gap-1.5 cursor-pointer bg-white"
              >
                <span>Giriş Yap</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#586380]" />
              </button>

              {isLoginDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#ffffff] border border-[#d9dde8] rounded-[8px] shadow-[0_4px_16px_rgba(40,46,62,0.1)] p-2 z-50 text-[13px] space-y-1">
                  <button
                    onClick={() => openAuth("login")}
                    className="w-full text-left flex items-center gap-2.5 p-2 rounded-[4px] bg-[#edefff] text-[#4255ff] font-semibold transition-colors cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-[#4255ff]" />
                    <span>Hesaba Giriş Yap</span>
                  </button>

                  <Link
                    href="/student"
                    onClick={() => setIsLoginDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-[4px] hover:bg-[#f6f7fb] text-[#282e3e] font-semibold transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-[#586380]" />
                    <span>Öğrenci Arenası</span>
                  </Link>

                  <Link
                    href="/instructor"
                    onClick={() => setIsLoginDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-[4px] hover:bg-[#f6f7fb] text-[#282e3e] font-semibold transition-colors"
                  >
                    <Users className="w-4 h-4 text-[#586380]" />
                    <span>Eğitmen Girişi</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setIsLoginDropdownOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-[4px] hover:bg-[#f6f7fb] text-[#282e3e] font-semibold transition-colors border-t border-[#d9dde8] mt-1 pt-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#586380]" />
                    <span>Admin Paneli</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Signature Filled Pill Button: Open Register Modal */}
            <button
              onClick={() => openAuth("register")}
              className="inline-flex items-center justify-center px-4 py-2 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-[#ffffff] font-semibold text-[14px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] transition-all cursor-pointer"
            >
              <span>Ücretsiz Kaydol</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (Centered text stack on calm #f6f7fb canvas) */}
      <section className="pt-12 sm:pt-16 pb-16 px-4 sm:px-6 max-w-[1200px] mx-auto w-full text-center space-y-8">
        <div className="space-y-4 max-w-[800px] mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[200px] bg-[#edefff] border border-[#d9dde8] text-[#4255ff] text-[12px] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TÜRKİYE'NİN İLK VE TEK AI DESTEKLİ İNGİLİZCE SINAV EKOSİSTEMİ</span>
          </div>

          {/* Display Headline (Weight 600-700, 44px display) */}
          <h1 className="text-[34px] sm:text-[44px] leading-[1.2] font-semibold text-[#282e3e] tracking-tight">
            Sınavlara Hazırlanmanın ve <br className="hidden sm:inline" />
            <span className="text-[#4255ff]">Uzmanlaşmanın En Akıllı Yolu.</span>
          </h1>

          {/* Subhead (Weight 400, 16px, #586380) */}
          <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#586380] max-w-[680px] mx-auto font-normal">
            YDT, YDS, YÖKDİL, Boğaziçi BUEPT, ODTÜ/İTÜ İYS, IELTS ve TOEFL sınavlarında; 
            yapay zeka deneme stüdyosu, ses kayıtlı Speaking simülatörü ve adaptif "1 Soru Daha" telafi motoru.
          </p>
        </div>

        {/* Hero Interactive Search / PIN Join Pill (Signature Quizlet 200px Pill Input) */}
        <div className="max-w-[480px] mx-auto">
          <form 
            onSubmit={handlePinSubmit} 
            className="flex items-center p-1.5 rounded-[200px] bg-[#ffffff] border border-[#d9dde8] shadow-[0_4px_16px_rgba(40,46,62,0.08)] hover:border-[#4255ff] transition-all"
          >
            <div className="pl-3.5 pr-2 text-[#939bb4]">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Öğretmeninizin 6 haneli sınav kodunu girin (örn: 904182)"
              value={quickPin}
              onChange={(e) => setQuickPin(e.target.value)}
              className="flex-1 px-2 py-2 text-[14px] font-normal text-[#282e3e] placeholder-[#939bb4] outline-none bg-transparent"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-white font-semibold text-[14px] transition-all shadow-[0_2px_4px_rgba(40,46,62,0.1)] flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Sınava Gir</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Ghost Text Link below Hero CTA */}
          <div className="pt-3">
            <Link
              href="/instructor"
              className="text-[#4255ff] hover:underline text-[14px] font-normal inline-flex items-center gap-1 transition-colors"
            >
              <span>Öğretmen misiniz? Eğitmen ve okul çözümlerine göz atın</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3. FOUR FEATURE CATEGORY CARDS (Pastel Hero Showcase at 24px radius, white inner panel with 8px radius) */}
        <div className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {/* Card 1: Cyan Pastel */}
            <div className="rounded-[24px] bg-[#e0f7fa] p-4.5 border border-[#b2ebf2] flex flex-col justify-between transition-all hover:shadow-[0_4px_16px_rgba(40,46,62,0.1)] group">
              <div className="rounded-[8px] bg-white p-5 shadow-[0_2px_4px_rgba(40,46,62,0.06)] space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-[8px] bg-[#e0f7fa] flex items-center justify-center text-[#00838f] mb-3">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#282e3e] group-hover:text-[#4255ff] transition-colors">
                    Akıllı Kelime Kartları
                  </h3>
                  <p className="text-[14px] leading-[20px] text-[#586380] font-normal mt-1.5">
                    Aralıklı tekrar (Spaced Repetition) ve CEFR C1/B2 akademik kelime setleriyle kalıcı ezber.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#d9dde8]/60 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#00838f]">Flashcard Modu</span>
                  <Link href="/flashcards/set-1" className="text-[#4255ff] text-[13px] font-semibold hover:underline flex items-center gap-1">
                    <span>Çalış</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Magenta Pastel */}
            <div className="rounded-[24px] bg-[#fce4ec] p-4.5 border border-[#f8bbd0] flex flex-col justify-between transition-all hover:shadow-[0_4px_16px_rgba(40,46,62,0.1)] group">
              <div className="rounded-[8px] bg-white p-5 shadow-[0_2px_4px_rgba(40,46,62,0.06)] space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-[8px] bg-[#fce4ec] flex items-center justify-center text-[#c2185b] mb-3">
                    <Swords className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#282e3e] group-hover:text-[#4255ff] transition-colors">
                    1v1 Canlı Sınav Arenası
                  </h3>
                  <p className="text-[14px] leading-[20px] text-[#586380] font-normal mt-1.5">
                    15 saniyelik sorularla arkadaşlarınla kafa kafaya yarış, streak puanları kazan ve liderlikte yüksel.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#d9dde8]/60 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#c2185b]">Canlı Yarış</span>
                  <Link href="/duel/lobby" className="text-[#4255ff] text-[13px] font-semibold hover:underline flex items-center gap-1">
                    <span>Meydan Oku</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: Violet Pastel (Brand Tint) */}
            <div className="rounded-[24px] bg-[#dbdfff] p-4.5 border border-[#c5cae9] flex flex-col justify-between transition-all hover:shadow-[0_4px_16px_rgba(40,46,62,0.1)] group">
              <div className="rounded-[8px] bg-white p-5 shadow-[0_2px_4px_rgba(40,46,62,0.06)] space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-[8px] bg-[#edefff] flex items-center justify-center text-[#4255ff] mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#282e3e] group-hover:text-[#4255ff] transition-colors">
                    AI Sınav & Telafi Motoru
                  </h3>
                  <p className="text-[14px] leading-[20px] text-[#586380] font-normal mt-1.5">
                    PDF'ten anında optik deneme oluşturun; yanlışlara IRT tabanlı adaptif "1 Soru Daha" telafisi alın.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#d9dde8]/60 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#4255ff]">Adaptif IRT</span>
                  <Link href="/student" className="text-[#4255ff] text-[13px] font-semibold hover:underline flex items-center gap-1">
                    <span>Keşfet</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4: Peach Pastel */}
            <div className="rounded-[24px] bg-[#fff3e0] p-4.5 border border-[#ffe0b2] flex flex-col justify-between transition-all hover:shadow-[0_4px_16px_rgba(40,46,62,0.1)] group">
              <div className="rounded-[8px] bg-white p-5 shadow-[0_2px_4px_rgba(40,46,62,0.06)] space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-[8px] bg-[#fff3e0] flex items-center justify-center text-[#e65100] mb-3">
                    <Mic className="w-5 h-5" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#282e3e] group-hover:text-[#4255ff] transition-colors">
                    Speaking & Writing Lab
                  </h3>
                  <p className="text-[14px] leading-[20px] text-[#586380] font-normal mt-1.5">
                    IELTS & TOEFL için ses kaydıyla konuşma provası ve rubrik analizli akademik essay yazımı.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#d9dde8]/60 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#e65100]">Sesli Simülatör</span>
                  <Link href="/exam/mock-1" className="text-[#4255ff] text-[13px] font-semibold hover:underline flex items-center gap-1">
                    <span>Dene</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TWO DISTINCT ROLE ENTRANCE PORTALS (Quizlet 8px Cards with 200px Pill Buttons) */}
      <section id="portals" className="py-16 px-4 sm:px-6 max-w-[1200px] mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="text-[12px] font-semibold uppercase tracking-wider text-[#4255ff]">
            Doğrudan Rol Giriş Portalları
          </div>
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#282e3e] tracking-tight">
            İhtiyacınıza Uygun Çalışma Alanını Seçin
          </h2>
          <p className="text-[14px] text-[#586380] font-normal">
            Öğrenciler için eğlenceli pratik ve adaptif telafi, öğretmenler için güçlü yapay zeka ve sınıf araçları.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[960px] mx-auto gap-6 text-left">
          {/* Portal 1: Öğrenci Arenası */}
          <div className="p-6 rounded-[8px] bg-white border border-[#d9dde8] shadow-[0_4px_16px_rgba(40,46,62,0.06)] hover:border-[#4255ff] transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[8px] bg-[#edefff] flex items-center justify-center text-[#4255ff]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase text-[#4255ff] mb-1">
                  Öğrenci Portalı
                </div>
                <h3 className="text-[20px] font-semibold text-[#282e3e]">
                  Öğrenci Arenası
                </h3>
                <p className="text-[14px] text-[#586380] font-normal mt-2 leading-[20px]">
                  Sınavlara gir, 1v1 düelloda arkadaşlarınla yarış, bilgi kartları ile akademik kelimeleri ezberle ve netlerini anında gör.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#d9dde8]">
                <div className="flex items-center gap-2 text-[13px] text-[#2e3856]">
                  <Check className="w-4 h-4 text-[#4255ff]" />
                  <span>500 Jeton Başlangıç Bakiyesi</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#2e3856]">
                  <Check className="w-4 h-4 text-[#4255ff]" />
                  <span>Adaptif "1 Soru Daha" Telafi Motoru</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#2e3856]">
                  <Check className="w-4 h-4 text-[#4255ff]" />
                  <span>Arkadaşlarla Canlı 1v1 Düello</span>
                </div>
              </div>
            </div>

            <Link
              href="/student"
              className="w-full py-2.5 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-white font-semibold text-[14px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Öğrenci Olarak Başla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Portal 2: Eğitmen & Okul Portalı */}
          <div className="p-6 rounded-[8px] bg-white border border-[#d9dde8] shadow-[0_4px_16px_rgba(40,46,62,0.06)] hover:border-[#282e3e] transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[8px] bg-[#f6f7fb] flex items-center justify-center text-[#282e3e]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase text-[#586380] mb-1">
                  Eğitmen & Okul Portalı
                </div>
                <h3 className="text-[20px] font-semibold text-[#282e3e]">
                  Öğretmen Paneli
                </h3>
                <p className="text-[14px] text-[#586380] font-normal mt-2 leading-[20px]">
                  PDF soru yükle, yapay zeka ile saniyeler içinde optik deneme üret, sınıflarına ödev ata ve otomatik veli karnesi al.
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#d9dde8]">
                <div className="flex items-center gap-2 text-[13px] text-[#2e3856]">
                  <Check className="w-4 h-4 text-[#282e3e]" />
                  <span>AI PDF Deneme Stüdyosu (OCR)</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#2e3856]">
                  <Check className="w-4 h-4 text-[#282e3e]" />
                  <span>Sınıflar & Zayıf Kazanım Ödevi</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#2e3856]">
                  <Check className="w-4 h-4 text-[#282e3e]" />
                  <span>Öğrenci & Veli Rapor Karnesi</span>
                </div>
              </div>
            </div>

            <Link
              href="/instructor"
              className="w-full py-2.5 rounded-[200px] bg-[#282e3e] hover:bg-[#1f2430] text-white font-semibold text-[14px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Eğitmen Olarak Başla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. POPULAR STUDY SETS (Exact Quizlet Study Set Card Spec) */}
      <section className="py-16 px-4 sm:px-6 max-w-[1200px] mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#4255ff]">
              Popüler Çalışma & Deneme Setleri
            </div>
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#282e3e] tracking-tight mt-1">
              Hemen Başlayabileceğiniz Setler
            </h2>
          </div>

          <Link
            href="/student"
            className="text-[#4255ff] hover:underline text-[14px] font-semibold inline-flex items-center gap-1 shrink-0"
          >
            <span>Tüm Setleri ve Denemeleri Gör</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Study Set Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularStudySets.map((set) => (
            <Link
              key={set.id}
              href={set.href}
              className="p-4 rounded-[8px] bg-white border border-[#d9dde8] hover:border-[#4255ff] transition-all hover:shadow-[0_4px_16px_rgba(40,46,62,0.1)] flex flex-col justify-between space-y-4 group cursor-pointer"
            >
              <div className="space-y-2.5">
                {/* Title */}
                <h4 className="text-[16px] font-semibold text-[#282e3e] group-hover:text-[#4255ff] transition-colors leading-[22px]">
                  {set.title}
                </h4>

                {/* Term Count Badge & Duration */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px] font-normal text-[#586380] bg-[#f6f7fb] px-2.5 py-0.5 rounded-[200px] border border-[#d9dde8]/60">
                    {set.questionCount}
                  </span>
                  <span className="text-[12px] font-normal text-[#586380]">
                    • {set.duration}
                  </span>
                  <span className="text-[11px] font-medium text-[#4255ff] bg-[#edefff] px-2 py-0.5 rounded-[200px]">
                    {set.category}
                  </span>
                </div>
              </div>

              {/* Creator row with circular avatar & username */}
              <div className="pt-3 border-t border-[#d9dde8]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#edefff] text-[#4255ff] flex items-center justify-center text-[11px] font-bold">
                    {set.authorInitial}
                  </div>
                  <span className="text-[12px] font-normal text-[#586380] truncate max-w-[180px]">
                    {set.author}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[12px] font-semibold text-[#282e3e]">
                  <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                  <span>{set.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. PROMOTIONAL SECTION PANEL (Exact Quizlet Lilac Wash #edefff Two-Column Split) */}
      <section className="bg-[#edefff] py-16 px-4 sm:px-6 w-full border-y border-[#d9dde8]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Interactive Product Card Mockup on White Surface */}
          <div className="p-6 rounded-[8px] bg-white border border-[#d9dde8] shadow-[0_4px_16px_rgba(40,46,62,0.1)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#d9dde8] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4255ff] bg-[#edefff] px-2.5 py-0.5 rounded-[200px]">
                  Adaptif "1 Soru Daha"
                </span>
                <span className="text-[12px] text-[#586380]">IRT Zorluk Seviyesi: B2+</span>
              </div>
              <span className="text-[12px] font-semibold text-[#00838f] bg-[#e0f7fa] px-2.5 py-0.5 rounded-[200px]">
                Kazanım Telafisi Aktif
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <p className="text-[14px] font-semibold text-[#282e3e] leading-[20px]">
                "If the government ______ stricter regulations earlier, the environmental crisis could have been mitigated significantly."
              </p>

              <div className="space-y-2 text-[13px]">
                <div className="p-2.5 rounded-[4px] bg-[#f6f7fb] border border-[#d9dde8] flex items-center justify-between text-[#282e3e]">
                  <span>A) had implemented</span>
                  <CheckCircle2 className="w-4 h-4 text-[#4255ff]" />
                </div>
                <div className="p-2.5 rounded-[4px] bg-white border border-[#d9dde8] text-[#586380]">
                  <span>B) implements</span>
                </div>
                <div className="p-2.5 rounded-[4px] bg-white border border-[#d9dde8] text-[#586380]">
                  <span>C) would implement</span>
                </div>
              </div>

              <div className="p-3 rounded-[4px] bg-[#f6f7fb] border-l-2 border-[#4255ff] text-[12px] text-[#586380] leading-[18px]">
                <strong className="text-[#282e3e]">IRT Çözüm Analizi:</strong> Type 3 Conditionals kuralı: Geçmişte gerçekleşmemiş şart cümlelerinde temel formül had + V3'tür.
              </div>
            </div>
          </div>

          {/* Right Column: Promotional Text & CTA Button */}
          <div className="space-y-5 text-left">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#4255ff]">
              Akıllı Telafi Teknolojisi
            </div>
            <h2 className="text-[30px] sm:text-[36px] font-bold text-[#282e3e] tracking-tight leading-[1.2]">
              Hata yaptığınız an öğrenmeye başlayın. Boşa vakit kaybetmeyin.
            </h2>
            <p className="text-[15px] leading-[24px] text-[#586380] font-normal">
              IRT (Item Response Theory) motorumuz, çözülen her sorunun zorluk derecesini ve öğrencinin anlık yetenek düzeyini hesaplar.
              Bir soruyu yanlış yaptığınızda sistem otomatik olarak o kazanımı tespit eder ve hafızanıza yerleşene kadar "1 Soru Daha" yönlendirir.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/student"
                className="px-6 py-3 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-white font-semibold text-[15px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Hemen Denemeye Başla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/library"
                className="text-[#4255ff] hover:underline text-[15px] font-normal inline-flex items-center gap-1"
              >
                <span>Müfredat kazanımlarını incele →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SUPPORTED EXAMS SHOWCASE (Quizlet 8px Cards on #ffffff) */}
      <section id="exams" className="py-16 px-4 sm:px-6 max-w-[1200px] mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="text-[12px] font-semibold uppercase tracking-wider text-[#4255ff]">
            Hedef Sınav Standartları
          </div>
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#282e3e] tracking-tight">
            Tüm Dil Sınavlarına Tek Platformdan Hazırlanın
          </h2>
          <p className="text-[14px] text-[#586380] font-normal">
            ÖSYM, Üniversite Muafiyet ve Uluslararası sınav formatlarının her birine özel süre, soru tipi ve rubrik simülasyonu.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { code: "YDT", name: "YKS-Dil Hazırlık", tag: "ÖSYM / Ulusal" },
            { code: "YDS & YÖKDİL", name: "Akademik Dil Sınavları", tag: "ÖSYM / Ulusal" },
            { code: "BUEPT", name: "Boğaziçi BÜYES Yeterlik", tag: "Hazırlık Atlama" },
            { code: "ODTÜ / İTÜ İYS", name: "İngilizce Yeterlik (EPE/İYS)", tag: "Hazırlık Atlama" },
            { code: "PROFICIENCY", name: "Genel Üniversite Muafiyet", tag: "Hazırlık Atlama" },
            { code: "BİLKENT & KOÇ", name: "PAE / KUEPE Muafiyet", tag: "Hazırlık Atlama" },
            { code: "IELTS Academic", name: "Band 7.5+ 4 Beceri", tag: "Uluslararası" },
            { code: "TOEFL iBT & PTE", name: "Yeni Nesil Entegre Sınav", tag: "Uluslararası" },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-[8px] bg-white border border-[#d9dde8] text-center space-y-1.5 shadow-[0_2px_4px_rgba(40,46,62,0.04)] hover:border-[#4255ff] hover:shadow-[0_4px_16px_rgba(40,46,62,0.1)] transition-all cursor-pointer"
            >
              <div className="text-[10px] font-bold text-[#586380] uppercase tracking-wider">{item.tag}</div>
              <div className="text-[18px] font-bold text-[#282e3e]">{item.code}</div>
              <div className="text-[12px] text-[#586380] font-normal">{item.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING & PAYMENT SECTION (5, 10, 15, 20 Deneme Seçenekleri ve Paynkolay Güvenli Ödeme) */}
      <PricingSection />

      {/* 8. FIVE-COLUMN SITE FOOTER (Exact Quizlet 5-Column Grid on #f6f7fb) */}
      <footer className="border-t border-[#d9dde8] bg-[#f6f7fb] pt-12 pb-10 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-[14px]">
            {/* Column 1: Hakkımızda */}
            <div className="space-y-3">
              <h5 className="font-semibold text-[#282e3e] text-[14px]">Hakkımızda</h5>
              <ul className="space-y-2 text-[#586380] text-[14px] font-normal">
                <li><Link href="/" className="hover:text-[#4255ff] transition-colors">Şirketimiz</Link></li>
                <li><Link href="/library" className="hover:text-[#4255ff] transition-colors">Nasıl Çalışır?</Link></li>
                <li><Link href="/pricing" className="hover:text-[#4255ff] transition-colors">Fiyatlandırma & Paketler</Link></li>
                <li><Link href="/" className="hover:text-[#4255ff] transition-colors">Kariyer</Link></li>
                <li><Link href="/" className="hover:text-[#4255ff] transition-colors">Basın & Medya</Link></li>
              </ul>
            </div>

            {/* Column 2: Öğrenciler İçin */}
            <div className="space-y-3">
              <h5 className="font-semibold text-[#282e3e] text-[14px]">Öğrenciler İçin</h5>
              <ul className="space-y-2 text-[#586380] text-[14px] font-normal">
                <li><Link href="/pricing" className="hover:text-[#4255ff] transition-colors font-medium text-[#4255ff]">Paketler & Fiyatlar (5-20 Deneme)</Link></li>
                <li><Link href="/student" className="hover:text-[#4255ff] transition-colors">Deneme Sınavları</Link></li>
                <li><Link href="/flashcards/set-1" className="hover:text-[#4255ff] transition-colors">Kelime Kartları</Link></li>
                <li><Link href="/duel/lobby" className="hover:text-[#4255ff] transition-colors">1v1 Canlı Düello</Link></li>
                <li><Link href="/exam/mock-1" className="hover:text-[#4255ff] transition-colors">Speaking & Writing Lab</Link></li>
              </ul>
            </div>

            {/* Column 3: Öğretmenler İçin */}
            <div className="space-y-3">
              <h5 className="font-semibold text-[#282e3e] text-[14px]">Öğretmenler İçin</h5>
              <ul className="space-y-2 text-[#586380] text-[14px] font-normal">
                <li><Link href="/instructor" className="hover:text-[#4255ff] transition-colors">AI Sınav Stüdyosu</Link></li>
                <li><Link href="/students" className="hover:text-[#4255ff] transition-colors">Sınıf Yönetimi</Link></li>
                <li><Link href="/reports" className="hover:text-[#4255ff] transition-colors">Madde Analizi & Raporlar</Link></li>
                <li><Link href="/billing" className="hover:text-[#4255ff] transition-colors">Hakediş & Satış</Link></li>
              </ul>
            </div>

            {/* Column 4: Sınav Türleri */}
            <div className="space-y-3">
              <h5 className="font-semibold text-[#282e3e] text-[14px]">Sınav Türleri</h5>
              <ul className="space-y-2 text-[#586380] text-[14px] font-normal">
                <li><Link href="/student?category=YDT" className="hover:text-[#4255ff] transition-colors">YDT (YKS-Dil)</Link></li>
                <li><Link href="/student?category=YDS" className="hover:text-[#4255ff] transition-colors">YDS & YÖKDİL</Link></li>
                <li><Link href="/student?category=UNIVERSITY" className="hover:text-[#4255ff] transition-colors">Boğaziçi BUEPT</Link></li>
                <li><Link href="/student?category=UNIVERSITY" className="hover:text-[#4255ff] transition-colors">ODTÜ / İTÜ İYS</Link></li>
                <li><Link href="/student?category=IELTS" className="hover:text-[#4255ff] transition-colors">IELTS & TOEFL iBT</Link></li>
              </ul>
            </div>

            {/* Column 5: Yasal & Dil */}
            <div className="space-y-3">
              <h5 className="font-semibold text-[#282e3e] text-[14px]">Yasal & Dil</h5>
              <ul className="space-y-2 text-[#586380] text-[14px] font-normal">
                <li><Link href="/" className="hover:text-[#4255ff] transition-colors">Gizlilik Politikası</Link></li>
                <li><Link href="/" className="hover:text-[#4255ff] transition-colors">Kullanım Koşulları</Link></li>
                <li><Link href="/" className="hover:text-[#4255ff] transition-colors">KVKK Aydınlatma Metni</Link></li>
                <li className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-white border border-[#d9dde8] text-[12px] font-semibold text-[#282e3e]">
                    🇹🇷 Türkçe (TR)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Brand */}
          <div className="pt-8 border-t border-[#d9dde8] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#586380]">
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" showText={false} />
              <span>© 2026 1morequiz • Türkiye'nin AI Destekli İngilizce Sınav Arenası</span>
            </div>
            <div className="flex items-center gap-4 text-[#586380]">
              <Link href="/pricing" className="hover:text-[#4255ff] transition-colors">Fiyatlandırma</Link>
              <span>•</span>
              <Link href="/student" className="hover:text-[#4255ff] transition-colors">Öğrenci</Link>
              <span>•</span>
              <Link href="/instructor" className="hover:text-[#4255ff] transition-colors">Eğitmen</Link>
              <span>•</span>
              <Link href="/admin" className="hover:text-[#4255ff] transition-colors">Yönetim</Link>
              <span>•</span>
              <Link href="/join" className="hover:text-[#4255ff] transition-colors">Koda Gir</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Quizlet-Styled Login & Register Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultMode={authModalMode} 
      />
    </div>
  );
}

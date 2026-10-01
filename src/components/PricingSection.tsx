"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Star,
  Award,
  Layers,
  Mic,
  BookOpen
} from "lucide-react";

export interface PricingExamOption {
  id: string;
  name: string;
  tag: string;
  poolDescription: string;
}

export const EXAM_OPTIONS: PricingExamOption[] = [
  { id: "YDT", name: "YDT (YKS-Dil)", tag: "ÖSYM", poolDescription: "80 Soruluk YKS-Dil özgün soru havuzu" },
  { id: "YDS", name: "YDS & YÖKDİL", tag: "ÖSYM", poolDescription: "Akademik Paragraf, Çeviri ve Cümle Tamamlama havuzu" },
  { id: "BUEPT", name: "Boğaziçi BUEPT", tag: "Hazırlık Atlama", poolDescription: "BÜYES Dinleme, Okuma & Kompozisyon soru havuzu" },
  { id: "ODTU_IYS", name: "ODTÜ / İTÜ İYS", tag: "Hazırlık Atlama", poolDescription: "EPE & İYS Seviye Muafiyet tam deneme havuzu" },
  { id: "PROFICIENCY", name: "Bilkent & Koç PAE", tag: "Hazırlık Atlama", poolDescription: "PAE / KUEPE dil yeterlik sınav havuzu" },
  { id: "IELTS", name: "IELTS Academic", tag: "Uluslararası", poolDescription: "Band 7.5+ 4 Beceri ve Ses Kayıtlı Speaking havuzu" },
  { id: "TOEFL", name: "TOEFL iBT", tag: "Uluslararası", poolDescription: "Yeni nesil entegre Speaking & Writing soru havuzu" },
];

export interface ExamPackage {
  count: 5 | 10 | 15 | 20;
  title: string;
  price: number;
  perExamPrice: number;
  discountBadge?: string;
  isPopular?: boolean;
  features: string[];
}

export const EXAM_PACKAGES: ExamPackage[] = [
  {
    count: 5,
    title: "5 Deneme Paketi",
    price: 199,
    perExamPrice: 39.8,
    features: [
      "Seçilen sınav havuzundan 5 tam deneme",
      "Adaptif '1 Soru Daha' IRT telafi motoru",
      "Ayrıntılı optik karne ve net analizleri",
      "30 gün havuz erişim süresi",
      "Standart soru çözüm açıklamaları"
    ]
  },
  {
    count: 10,
    title: "10 Deneme Paketi",
    price: 349,
    perExamPrice: 34.9,
    discountBadge: "%15 Tasarruf",
    isPopular: true,
    features: [
      "Seçilen sınav havuzundan 10 tam deneme",
      "Ses kayıtlı Speaking simülatörü (IELTS/BUEPT)",
      "Akıllı Kelime Kartları (Flashcards) sınırsız erişim",
      "Adaptif '1 Soru Daha' anlık telafisi",
      "90 gün havuz erişim süresi",
      "100 Jeton 1v1 Düello hediyesi"
    ]
  },
  {
    count: 15,
    title: "15 Deneme Paketi",
    price: 479,
    perExamPrice: 31.9,
    discountBadge: "%20 Tasarruf",
    features: [
      "Seçilen sınav havuzundan 15 tam deneme",
      "Yapay zeka Academic Essay (Writing) puanlama rubriği",
      "Tüm becerilerde sesli & yazılı telafi analitiği",
      "Sınırsız adaptif telafi soru akışı",
      "180 gün havuz erişim süresi",
      "250 Jeton 1v1 Düello hediyesi"
    ]
  },
  {
    count: 20,
    title: "20 Deneme (Şampiyon)",
    price: 599,
    perExamPrice: 29.9,
    discountBadge: "%25 Tasarruf",
    features: [
      "Seçilen sınav havuzundaki TÜM denemeler (20 adet)",
      "Sınav gününe kadar 365 gün sınırsız erişim",
      "Sınırsız Speaking ses kaydı & telaffuz analizi",
      "Öncelikli AI soru analizleri ve zayıf konu dökümü",
      "Veli & Eğitmen PDF karne paylaşım raporu",
      "500 Jeton 1v1 Düello VIP kredisi"
    ]
  }
];

export function PricingSection() {
  const router = useRouter();
  const [selectedExamId, setSelectedExamId] = useState("YDT");
  const [selectedPackage, setSelectedPackage] = useState<ExamPackage | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Checkout form state
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installment, setInstallment] = useState("1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const currentExam = EXAM_OPTIONS.find((e) => e.id === selectedExamId) || EXAM_OPTIONS[0];

  const handleOpenCheckout = (pkg: ExamPackage) => {
    setSelectedPackage(pkg);
    setIsCheckoutOpen(true);
    setPaymentSuccess(false);
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Save purchased package to localStorage
      if (typeof window !== "undefined") {
        const existingData = JSON.parse(localStorage.getItem("1morequiz_user") || "{}");
        existingData.purchasedPackage = {
          examId: selectedExamId,
          examName: currentExam.name,
          mockCount: selectedPackage?.count,
          amountPaid: selectedPackage?.price,
          purchasedAt: new Date().toISOString(),
        };
        existingData.tokens = (existingData.tokens || 500) + (selectedPackage?.count || 5) * 50;
        localStorage.setItem("1morequiz_user", JSON.stringify(existingData));
      }
    }, 1200);
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 max-w-[1200px] mx-auto w-full space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-[760px] mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[200px] bg-[#edefff] border border-[#d9dde8] text-[#4255ff] text-[12px] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ŞEFFAF & AVANTAJLI DENEME PAKETLERİ</span>
        </div>
        <h2 className="text-[32px] sm:text-[40px] font-bold text-[#282e3e] tracking-tight leading-[1.2]">
          Hedef Sınavınızı Seçin, <br className="hidden sm:inline" />
          <span className="text-[#4255ff]">Özgün Deneme Havuzuna Anında Erişin.</span>
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#586380] leading-[24px] font-normal">
          5, 10, 15 ve 20 denemelik esnek paketlerle sadece hazırlandığınız sınavın havuzuna erişin. 
          Her denemede adaptif "1 Soru Daha" telafisi ve sesli Speaking simülatörü dahildir.
        </p>
      </div>

      {/* 1. EXAM POOL SELECTOR BAR (Quizlet Pill Horizontal Filter) */}
      <div className="space-y-2">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-[#586380] text-center">
          1. Adım: Hazırlandığınız Sınav Havuzunu Seçin
        </div>
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
          {EXAM_OPTIONS.map((exam) => {
            const isSelected = selectedExamId === exam.id;
            return (
              <button
                key={exam.id}
                onClick={() => setSelectedExamId(exam.id)}
                className={`px-4 py-2 rounded-[200px] text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? "bg-[#4255ff] border-[#4255ff] text-white shadow-[0_2px_8px_rgba(66,85,255,0.25)]"
                    : "bg-white border-[#d9dde8] text-[#282e3e] hover:border-[#4255ff] hover:bg-[#edefff]/50"
                }`}
              >
                <span>{exam.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full uppercase ${
                  isSelected ? "bg-white/20 text-white" : "bg-[#f6f7fb] text-[#586380]"
                }`}>
                  {exam.tag}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-[13px] text-center text-[#4255ff] font-medium pt-1">
          ✓ Şu an seçili: <strong>{currentExam.name}</strong> — {currentExam.poolDescription}
        </p>
      </div>

      {/* 2. THE 4 PRICING CARDS (5, 10, 15, 20 Deneme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {EXAM_PACKAGES.map((pkg) => {
          return (
            <div
              key={pkg.count}
              className={`rounded-[8px] bg-white border p-6 flex flex-col justify-between space-y-6 transition-all hover:shadow-[0_8px_24px_rgba(40,46,62,0.12)] relative ${
                pkg.isPopular
                  ? "border-[#4255ff] ring-2 ring-[#4255ff]/20 shadow-[0_4px_16px_rgba(66,85,255,0.12)]"
                  : "border-[#d9dde8] hover:border-[#4255ff]"
              }`}
            >
              {/* Top Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-[#4255ff] uppercase tracking-wider bg-[#edefff] px-2.5 py-0.5 rounded-[200px]">
                    {currentExam.id} HAVUZU
                  </span>
                  {pkg.discountBadge && (
                    <span className="text-[11px] font-bold text-[#00838f] bg-[#e0f7fa] px-2 py-0.5 rounded-[200px]">
                      {pkg.discountBadge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-[20px] font-bold text-[#282e3e]">
                    {pkg.title}
                  </h3>
                  <div className="text-[12px] text-[#586380] mt-0.5">
                    {currentExam.name} özgün denemeleri
                  </div>
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t border-[#d9dde8]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[34px] font-bold text-[#282e3e] tracking-tight">
                      ₺{pkg.price}
                    </span>
                    <span className="text-[13px] text-[#586380] font-normal">
                      / paket
                    </span>
                  </div>
                  <div className="text-[12px] text-[#586380] font-medium mt-0.5">
                    Deneme başı sadece <strong>₺{pkg.perExamPrice}</strong>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 pt-3 border-t border-[#d9dde8]/80 text-[13px] text-[#2e3856]">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#4255ff] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button: Signature 200px Pill Button */}
              <div className="pt-4">
                <button
                  onClick={() => handleOpenCheckout(pkg)}
                  className={`w-full py-2.5 rounded-[200px] font-semibold text-[14px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_2px_4px_rgba(40,46,62,0.1)] ${
                    pkg.isPopular
                      ? "bg-[#4255ff] hover:bg-[#3444e5] text-white"
                      : "bg-[#282e3e] hover:bg-[#1f2430] text-white"
                  }`}
                >
                  <span>Hemen Satın Al</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Guarantee Box */}
      <div className="p-4 rounded-[8px] bg-white border border-[#d9dde8] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#586380] max-w-4xl mx-auto shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-[#282e3e]">Paynkolay 256-Bit SSL Koruması:</strong> Tüm ödemeler 3D Secure güvencesiyle anında işlenir. Kart bilgileriniz asla kaydedilmez.
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-[11px] font-semibold text-[#282e3e]">
          <span className="px-2 py-1 rounded bg-[#f6f7fb] border border-[#d9dde8]">Mastercard</span>
          <span className="px-2 py-1 rounded bg-[#f6f7fb] border border-[#d9dde8]">Visa</span>
          <span className="px-2 py-1 rounded bg-[#f6f7fb] border border-[#d9dde8]">Troy</span>
        </div>
      </div>

      {/* 3. PAYNKOLAY CHECKOUT MODAL */}
      {isCheckoutOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-[500px] bg-white rounded-[12px] border border-[#d9dde8] shadow-[0_8px_32px_rgba(40,46,62,0.15)] overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#d9dde8]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#4255ff]" />
                <h3 className="text-[16px] font-bold text-[#282e3e]">
                  Paynkolay Güvenli Ödeme
                </h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f6f7fb] text-[#586380] hover:text-[#282e3e] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {paymentSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-[22px] font-bold text-[#282e3e]">
                  Ödemeniz Başarıyla Alındı!
                </h3>
                <p className="text-[14px] text-[#586380] leading-[22px]">
                  <strong>{currentExam.name}</strong> sınav havuzunuz için <strong>{selectedPackage.title}</strong> hesabınıza tanımlandı.
                  Hemen denemelerinizi çözmeye başlayabilirsiniz.
                </p>
                <div className="pt-3">
                  <Link
                    href={`/student?exam=${selectedExamId}`}
                    onClick={() => setIsCheckoutOpen(false)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-white font-semibold text-[14px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] transition-all cursor-pointer"
                  >
                    <span>Deneme Havuzuna Git</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                {/* Order Summary Box */}
                <div className="p-3.5 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8] space-y-1.5 text-[13px]">
                  <div className="flex items-center justify-between text-[#282e3e] font-semibold">
                    <span>{selectedPackage.title} ({currentExam.name})</span>
                    <span>₺{selectedPackage.price}.00</span>
                  </div>
                  <div className="flex items-center justify-between text-[#586380] text-[12px]">
                    <span>Kapsam: {selectedPackage.count} Adet Tam Deneme & Telafi</span>
                    <span className="text-emerald-700 font-semibold">KDV Dahil</span>
                  </div>
                </div>

                {/* Credit Card Form */}
                <form onSubmit={handlePaySubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[12px] font-semibold text-[#282e3e]">
                      Kart Üzerindeki İsim
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ad Soyad"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-semibold text-[#282e3e]">
                      Kart Numarası
                    </label>
                    <div className="relative flex items-center">
                      <CreditCard className="absolute left-3 w-4 h-4 text-[#939bb4]" />
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="•••• •••• •••• ••••"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#282e3e]">
                        Son Kullanma
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="AA/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all text-center font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#282e3e]">
                        CVV / Güvenlik Kodu
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 rounded-[4px] border border-[#d9dde8] text-[14px] text-[#282e3e] placeholder-[#939bb4] focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all text-center font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-semibold text-[#282e3e]">
                      Taksit Seçeneği
                    </label>
                    <select
                      value={installment}
                      onChange={(e) => setInstallment(e.target.value)}
                      className="w-full px-3 py-2 rounded-[4px] border border-[#d9dde8] text-[13px] text-[#282e3e] bg-white focus:border-[#4255ff] focus:ring-1 focus:ring-[#4255ff] outline-none transition-all"
                    >
                      <option value="1">Tek Çekim (₺{selectedPackage.price}.00)</option>
                      <option value="3">3 Taksit (3 x ₺{Math.round(selectedPackage.price / 3)}.00)</option>
                      <option value="6">6 Taksit (6 x ₺{Math.round(selectedPackage.price / 6)}.00)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-3 py-3 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-white font-semibold text-[14px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        <span>Paynkolay 3D Secure İletişimi Kuruluyor...</span>
                      </span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>₺{selectedPackage.price}.00 Güvenle Öde</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#586380] text-center">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>256-bit SSL Güvenli Paynkolay / Aktif Bank Sanal POS Altyapısı</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

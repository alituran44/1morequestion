"use client";

import { useState } from "react";
import { ShieldCheck, CreditCard, Lock, CheckCircle2, X, AlertCircle } from "lucide-react";
import { MockExamItem } from "./MockExamCard";

interface PaynkolayModalProps {
  exam: MockExamItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (examId: string) => void;
}

export function PaynkolayModal({ exam, isOpen, onClose, onSuccess }: PaynkolayModalProps) {
  const [step, setStep] = useState<"CARD" | "SMS" | "SUCCESS">("CARD");
  const [cardNumber, setCardNumber] = useState("4543 •••• •••• 9012");
  const [cardHolder, setCardHolder] = useState("DENİZ YILMAZ");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("321");
  const [smsCode, setSmsCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !exam) return null;

  const handlePayClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate Paynkolay 3D gateway call
    setTimeout(() => {
      setIsLoading(false);
      setStep("SMS");
    }, 1000);
  };

  const handleSmsVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate SMS approval and UserMockAccess creation
    setTimeout(() => {
      setIsLoading(false);
      setStep("SUCCESS");
      onSuccess(exam.id);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-base">Paynkolay Sanal POS</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                3D Secure
              </span>
            </div>
            <p className="text-xs text-slate-500">Aktif Bank Güvenli Ödeme Altyapısı • Üye İşyeri: #189064897</p>
          </div>
        </div>

        {/* Step 1: Card Form */}
        {step === "CARD" && (
          <form onSubmit={handlePayClick} className="space-y-4">
            {/* Exam Summary */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{exam.title}</div>
                <div className="text-[11px] text-slate-500">
                  {exam.exam.name} • {exam.durationMins} Dk
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Tutar</div>
                <div className="text-base font-black text-emerald-700">{exam.price.toFixed(2)} ₺</div>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kart Sahibi
              </label>
              <input
                type="text"
                required
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kart Numarası
              </label>
              <input
                type="text"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Son Kullanma
                </label>
                <input
                  type="text"
                  required
                  placeholder="AA/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 text-center font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  CVV / Güvenlik
                </label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 text-center font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoading ? "Banka Bağlantısı Kuruluyor..." : `${exam.price.toFixed(2)} ₺ ile Güvenli Öde`}</span>
            </button>
          </form>
        )}

        {/* Step 2: 3D Secure SMS Verification */}
        {step === "SMS" && (
          <form onSubmit={handleSmsVerify} className="space-y-4 animate-in fade-in">
            <div className="text-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">3D Secure Doğrulama</h4>
              <p className="text-xs text-slate-500">
                Lütfen kayıtlı cep telefonunuza gönderilen 6 haneli doğrulama kodunu girin.
              </p>
            </div>

            <div>
              <input
                type="text"
                autoFocus
                placeholder="123456"
                maxLength={6}
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-center text-lg tracking-[0.5em] font-mono text-slate-900 py-3 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer"
            >
              {isLoading ? "Onaylanıyor..." : "Ödemeyi Tamamla ve Sınavı Aç"}
            </button>
          </form>
        )}

        {/* Step 3: Success */}
        {step === "SUCCESS" && (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base mb-1">Ödeme Başarıyla Alındı!</h4>
              <p className="text-xs text-slate-500">
                Sipariş onaylandı ve Paynkolay üzerinden sınava tam erişim hakkınız tanımlandı.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer"
            >
              Sınava Başla
            </button>
          </div>
        )}

        {/* Micro Bank Security Strip */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span>Mastercard</span>
            <span>•</span>
            <span>VISA</span>
            <span>•</span>
            <span className="text-[#006699]">TROY</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-3 h-3" />
            <span>256-Bit SSL Koruması</span>
          </div>
        </div>
      </div>
    </div>
  );
}

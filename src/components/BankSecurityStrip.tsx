"use client";

import { ShieldCheck, Lock, CheckCircle2, Award } from "lucide-react";

export function BankSecurityStrip() {
  return (
    <div className="w-full border-t border-[#d9dde8] bg-[#ffffff] py-6 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-4">
        {/* Top Trust Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Security & Banking Text */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-[#282e3e]">
                  Paynkolay 256-Bit SSL & 3D Secure Banka Güvenlik Güvencesi
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  PCI-DSS Level 1
                </span>
              </div>
              <p className="text-[11px] text-[#586380]">
                Tüm kredi ve banka kartı ödemeleri Aktif Bank / Paynkolay Sanal POS altyapısı ve 3D Secure SMS onayıyla gerçekleştirilir. Kart bilgileriniz asla sistemlerimizde saklanmaz.
              </p>
            </div>
          </div>

          {/* Payment & Security Method Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
            {/* Paynkolay / Aktif Bank Badge */}
            <div className="h-8 px-3 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8] flex items-center gap-1.5 text-[#282e3e]">
              <span className="w-2 h-2 rounded-full bg-[#4255ff]" />
              <span>Paynkolay</span>
              <span className="text-[9px] font-medium text-[#586380]">(Aktif Bank)</span>
            </div>

            {/* Mastercard */}
            <div className="h-8 px-3 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8] flex items-center gap-1.5 text-[#282e3e]">
              <span className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#eb001b] -mr-1 opacity-90" />
                <span className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90" />
              </span>
              <span>Mastercard</span>
              <span className="text-[9px] text-[#586380]">ID Check</span>
            </div>

            {/* Visa */}
            <div className="h-8 px-3 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8] flex items-center gap-1.5 text-[#282e3e]">
              <span className="font-black italic text-[#1a1f71] tracking-tighter text-[13px]">VISA</span>
              <span className="text-[9px] text-[#586380]">Secure</span>
            </div>

            {/* Troy */}
            <div className="h-8 px-3 rounded-[6px] bg-[#f6f7fb] border border-[#d9dde8] flex items-center gap-1 text-[#006699]">
              <span className="font-extrabold tracking-wider text-[11px]">TROY</span>
              <span className="text-[9px] text-[#586380]">Yerli Ödeme</span>
            </div>

            {/* 3D Secure 2.0 */}
            <div className="h-8 px-3 rounded-[6px] bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>3D Secure 2.0</span>
            </div>

            {/* 256-Bit SSL */}
            <div className="h-8 px-3 rounded-[6px] bg-[#edefff] border border-[#d9dde8] text-[#4255ff] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#4255ff]" />
              <span>256-Bit SSL</span>
            </div>
          </div>
        </div>

        {/* Regulatory & Institutional Micro Bar */}
        <div className="pt-2 border-t border-[#d9dde8]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#586380]">
          <div className="flex items-center gap-3">
            <span>T.C. Merkez Bankası (TCMB) Lisanslı Ödeme Hizmetleri Kanunu Uyarınca Korumalıdır.</span>
            <span>•</span>
            <span>Üye İşyeri No: <strong>189064897</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <span>SSL Sertifikası: Sectigo RSA 2048 Bit</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Tüm İşlemler Şifreli ve Sigortalıdır</span>
          </div>
        </div>
      </div>
    </div>
  );
}

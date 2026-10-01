"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { PricingSection } from "@/components/PricingSection";
import { AuthModal } from "@/components/AuthModal";
import { BankSecurityStrip } from "@/components/BankSecurityStrip";
import { ArrowLeft, KeyRound, Search, ChevronDown } from "lucide-react";

export default function PricingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#282e3e] flex flex-col justify-between selection:bg-[#4255ff] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#ffffff] border-b border-[#d9dde8] shadow-[0_4px_16px_rgba(40,46,62,0.1)] px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <BrandLogo size="md" showText={false} href="/" />
            <Link
              href="/"
              className="text-[14px] font-semibold text-[#586380] hover:text-[#4255ff] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfa</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/join"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[200px] hover:bg-[#edefff] text-[#4255ff] text-[13px] font-semibold transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Koda Gir</span>
            </Link>

            <button
              onClick={() => openAuth("login")}
              className="px-3.5 py-1.5 rounded-[200px] border border-[#d9dde8] hover:border-[#4255ff] text-[13px] font-semibold text-[#282e3e] hover:text-[#4255ff] transition-all cursor-pointer bg-white"
            >
              Giriş Yap
            </button>

            <button
              onClick={() => openAuth("register")}
              className="inline-flex items-center justify-center px-4 py-2 rounded-[200px] bg-[#4255ff] hover:bg-[#3444e5] text-[#ffffff] font-semibold text-[14px] shadow-[0_2px_4px_rgba(40,46,62,0.1)] transition-all cursor-pointer"
            >
              Ücretsiz Kaydol
            </button>
          </div>
        </div>
      </header>

      {/* Main Pricing Section */}
      <main className="flex-1">
        <PricingSection />
      </main>

      {/* Bank Security Strip */}
      <BankSecurityStrip />

      {/* Footer */}
      <footer className="border-t border-[#d9dde8] bg-[#ffffff] py-8 px-6 text-center text-[12px] text-[#586380]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" showText={false} />
            <span>© 2026 1morequiz • Türkiye'nin AI Destekli İngilizce Sınav Arenası</span>
          </div>
          <div className="flex items-center gap-4 text-[#586380]">
            <Link href="/student" className="hover:text-[#4255ff] transition-colors">Öğrenci Arenası</Link>
            <span>•</span>
            <Link href="/instructor" className="hover:text-[#4255ff] transition-colors">Öğretmen Paneli</Link>
            <span>•</span>
            <Link href="/join" className="hover:text-[#4255ff] transition-colors">Koda Gir</Link>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </div>
  );
}

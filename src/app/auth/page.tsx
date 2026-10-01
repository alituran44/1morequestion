"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/AuthModal";
import { BrandLogo } from "@/components/BrandLogo";
import { ArrowLeft } from "lucide-react";

function AuthContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AuthModal
      isOpen={isOpen}
      onClose={() => setIsOpen(true)}
      defaultMode={initialMode}
    />
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] flex flex-col justify-between">
      <header className="p-6 max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <BrandLogo size="md" href="/" />
        <Link 
          href="/" 
          className="text-[14px] font-semibold text-[#586380] hover:text-[#4255ff] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div className="p-8 text-[#586380] text-[14px]">Giriş ekranı yükleniyor...</div>}>
          <AuthContent />
        </Suspense>
      </main>

      <footer className="p-6 text-center text-[12px] text-[#586380]">
        © 2026 1morequiz • Türkiye'nin AI Destekli İngilizce Sınav Arenası
      </footer>
    </div>
  );
}

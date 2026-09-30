"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { 
  Home, 
  Library, 
  BarChart3, 
  Users, 
  Sparkles, 
  CreditCard,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  Swords,
  Layers,
  Trophy,
  Flame,
  Coins,
  GraduationCap
} from "lucide-react";

interface SidebarProps {
  activeRole: "INSTRUCTOR" | "STUDENT";
  onRoleToggle?: (role: "INSTRUCTOR" | "STUDENT") => void;
}

export function Sidebar({ activeRole, onRoleToggle }: SidebarProps) {
  const pathname = usePathname();

  // Distinct navigation sets for Educator vs Student
  const instructorNavItems = [
    { label: "Eğitmen Ana Sayfa", href: "/instructor", icon: Home },
    { label: "Koda Gir (Katıl)", href: "/join", icon: KeyRound, pinBadge: true },
    { label: "Benim Kütüphanem", href: "/library", icon: Library },
    { label: "Raporlar & Analitik", href: "/reports", icon: BarChart3 },
    { label: "Öğrenciler & Sınıflar", href: "/students", icon: Users },
    { label: "AI Deneme Stüdyosu", href: "/studio", icon: Sparkles, highlight: true },
    { label: "Paynkolay / Finans", href: "/billing", icon: CreditCard },
  ];

  const studentNavItems = [
    { label: "Öğrenci Arenası", href: "/student", icon: Home },
    { label: "Koda Gir (Katıl)", href: "/join", icon: KeyRound, pinBadge: true },
    { label: "1v1 Düello Arenası", href: "/duel/904182", icon: Swords, liveBadge: true },
    { label: "Bilgi Kartları", href: "/flashcards/904182", icon: Layers },
    { label: "Ödevlerim & Görevler", href: "/student", icon: BookOpen },
    { label: "Sınav Karnem", href: "/reports", icon: Trophy },
  ];

  const currentNavItems = activeRole === "INSTRUCTOR" ? instructorNavItems : studentNavItems;

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 h-screen sticky top-0 shadow-xs">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <Link href="/" className="flex flex-col gap-1.5 group w-full">
            <BrandLogo size="md" variant="light" showText={false} href="" />
            <div className="text-[10px] font-bold tracking-wide text-amber-700">
              {activeRole === "INSTRUCTOR" ? "Eğitmen & Yazar Paneli" : "Öğrenci Sınav Arenası"}
            </div>
          </Link>
        </div>

        {/* Dedicated Role Identity Box (Completely separate for Student vs Instructor) */}
        {activeRole === "STUDENT" ? (
          <div className="p-3 mx-4 my-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 font-black text-xs shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-black text-slate-900 truncate">
                    Deniz Yılmaz
                  </div>
                  <div className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Öğrenci</span>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                title="Giriş Portalları & Çıkış"
                className="text-[10px] text-slate-500 hover:text-slate-900 px-2 py-1 rounded-lg hover:bg-white transition-colors shrink-0 font-semibold"
              >
                Çıkış
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-3 mx-4 my-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-black text-xs shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-black text-slate-900 truncate">
                    Ahmet Hoca
                  </div>
                  <div className="text-[10px] text-slate-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    <span>Eğitmen</span>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                title="Giriş Portalları & Çıkış"
                className="text-[10px] text-slate-500 hover:text-slate-900 px-2 py-1 rounded-lg hover:bg-white transition-colors shrink-0 font-semibold"
              >
                Çıkış
              </Link>
            </div>
          </div>
        )}

        {/* Student Quick Stats Pill (Only visible in Student Mode) */}
        {activeRole === "STUDENT" && (
          <div className="mx-4 mb-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-amber-700 font-bold">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>500 Jeton</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-1.5 text-rose-600 font-bold">
              <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>3 Gün Seri</span>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {currentNavItems.map((item: any) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-amber-50 text-amber-900 border border-amber-200 font-bold shadow-xs"
                    : item.highlight
                    ? "text-amber-700 hover:bg-amber-50/60 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${
                    isActive 
                      ? "text-amber-600" 
                      : item.highlight 
                      ? "text-amber-600" 
                      : "text-slate-400 group-hover:text-slate-600"
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
                    AI
                  </span>
                )}
                {item.pinBadge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                    PIN
                  </span>
                )}
                {item.liveBadge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-200 animate-pulse">
                    Canlı
                  </span>
                )}
                {item.adminBadge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold border border-slate-200">
                    Master
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/80">
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{activeRole === "INSTRUCTOR" ? "Paynkolay 3D Korumalı" : "Kişiselleştirilmiş Öğrenme"}</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          {activeRole === "INSTRUCTOR" ? "1morequiz • Eğitmen Modu" : "1morequiz • Öğrenci Arenası"}
        </div>
      </div>
    </aside>
  );
}

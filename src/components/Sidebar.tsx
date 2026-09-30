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
    { label: "Admin Paneli", href: "/admin", icon: ShieldCheck, adminBadge: true },
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
    <aside className="w-64 border-r border-slate-800 bg-[#080c14] flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/" className="flex flex-col gap-1.5 group w-full">
            <BrandLogo size="md" showText={false} href="" />
            <div className="text-[10px] font-bold tracking-wide text-amber-400">
              {activeRole === "INSTRUCTOR" ? "Eğitmen & Yazar Paneli" : "Öğrenci Sınav Arenası"}
            </div>
          </Link>
        </div>

        {/* Dedicated Role Identity Box (Completely separate for Student vs Instructor) */}
        {activeRole === "STUDENT" ? (
          <div className="p-3 mx-4 my-3 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/30 shadow-lg shadow-amber-950/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-xs shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-black text-slate-100 truncate">
                    Deniz Yılmaz
                  </div>
                  <div className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>Öğrenci</span>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                title="Giriş Portalları & Çıkış"
                className="text-[10px] text-slate-400 hover:text-amber-300 px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              >
                Çıkış
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-3 mx-4 my-3 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xs shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-black text-slate-100 truncate">
                    Ahmet Hoca
                  </div>
                  <div className="text-[10px] text-sky-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>Eğitmen</span>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                title="Giriş Portalları & Çıkış"
                className="text-[10px] text-slate-500 hover:text-slate-300 px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              >
                Çıkış
              </Link>
            </div>
          </div>
        )}

        {/* Student Quick Stats Pill (Only visible in Student Mode) */}
        {activeRole === "STUDENT" && (
          <div className="mx-4 mb-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>500 Jeton</span>
            </div>
            <div className="w-px h-4 bg-slate-800" />
            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold shadow-sm shadow-amber-500/10"
                    : item.highlight
                    ? "text-amber-400 hover:bg-amber-950/20 hover:text-amber-300"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${
                    isActive 
                      ? "text-amber-400" 
                      : item.highlight 
                      ? "text-amber-400" 
                      : "text-slate-400"
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    AI
                  </span>
                )}
                {item.pinBadge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    PIN
                  </span>
                )}
                {item.liveBadge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 animate-pulse">
                    Canlı
                  </span>
                )}
                {item.adminBadge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    Master
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>{activeRole === "INSTRUCTOR" ? "Paynkolay 3D Korumalı" : "Kişiselleştirilmiş Öğrenme"}</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          {activeRole === "INSTRUCTOR" ? "1morequiz • Eğitmen Modu" : "1morequiz • Öğrenci Arenası"}
        </div>
      </div>
    </aside>
  );
}

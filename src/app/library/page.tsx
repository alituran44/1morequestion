"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { 
  Plus, 
  Search, 
  ChevronDown, 
  FileText, 
  Presentation, 
  Video, 
  BookOpen, 
  Layers, 
  UploadCloud, 
  Globe, 
  MoreVertical, 
  Sparkles,
  ArrowRight,
  HardDrive,
  FileSpreadsheet,
  Archive,
  FileEdit,
  RotateCcw,
  Trash2,
  CheckCircle2,
  FolderArchive
} from "lucide-react";
import Link from "next/link";

interface LibraryItem {
  id: string;
  title: string;
  examCode: string;
  type: "MOCK_EXAM" | "QUESTION_SET" | "TOPIC_TEST";
  questionCount: number;
  durationMins: number;
  price: number;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  createdAt: string;
}

export default function LibraryPage() {
  const [activeRole, setActiveRole] = useState<"INSTRUCTOR" | "STUDENT">("INSTRUCTOR");
  const [activeTab, setActiveTab] = useState<"CREATED" | "DRAFT" | "ARCHIVED">("CREATED");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [isResourceDropdownOpen, setIsResourceDropdownOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial mock data mirroring screenshot 1 & 2
  const [items, setItems] = useState<LibraryItem[]>([
    {
      id: "lib-1",
      title: "2026 YDT Şampiyonlar Özgün Deneme #1",
      examCode: "YDT",
      type: "MOCK_EXAM",
      questionCount: 80,
      durationMins: 120,
      price: 69.0,
      status: "PUBLISHED",
      createdAt: "2 gün önce",
    },
    {
      id: "lib-2",
      title: "2026 YDS Master Plus Akademik Deneme #1",
      examCode: "YDS",
      type: "MOCK_EXAM",
      questionCount: 80,
      durationMins: 180,
      price: 89.0,
      status: "PUBLISHED",
      createdAt: "3 gün önce",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleArchiveItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: "ARCHIVED" } : item));
    setOpenMenuId(null);
    showToast("Aktivite başarıyla arşive kaldırıldı.");
  };

  const handleRestoreItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: "PUBLISHED" } : item));
    setOpenMenuId(null);
    showToast("Aktivite arşivden geri yüklendi.");
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setOpenMenuId(null);
    showToast("Aktivite silindi.");
  };

  const filteredItems = items.filter((item) => {
    if (activeTab === "CREATED" && item.status !== "PUBLISHED") return false;
    if (activeTab === "DRAFT" && item.status !== "DRAFT") return false;
    if (activeTab === "ARCHIVED" && item.status !== "ARCHIVED") return false;

    if (selectedType !== "ALL" && item.type !== selectedType) return false;

    if (
      searchTerm &&
      !item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.examCode.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b0f17] flex text-slate-100">
      <Sidebar activeRole={activeRole} onRoleToggle={setActiveRole} />

      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-6">
        {/* Top Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-100">
              Benim tarafımdan oluşturuldu
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Hazırladığınız sınav denemeleri, soru modülleri ve ders materyalleri
            </p>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Etkinlik adına göre ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-64"
              />
            </div>

            {/* + Kaynak Ekle Dropdown Trigger (Exact match to Screenshot 1) */}
            <div className="relative">
              <button
                onClick={() => setIsResourceDropdownOpen(!isResourceDropdownOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white text-xs font-bold transition-all shadow-md shadow-fuchsia-950 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Kaynak ekle</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {/* Wayground Floating Dropdown (Screenshot 1 Exact Replica) */}
              {isResourceDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#111827] border border-slate-700/80 rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 space-y-3">
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-300">
                      <UploadCloud className="w-4 h-4 text-fuchsia-400" />
                      <span>Kendi kaynağınızı yükleyin</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Çalışma sayfalarınızı, sınav denemelerinizi ve daha fazlasını getirin ve geliştirin.
                    </p>
                  </div>

                  {/* Dropdown Items list from Screenshot 1 */}
                  <div className="space-y-1">
                    {[
                      { title: "Değerlendirme", desc: "Hızlı ve etkileşimli sorular", icon: FileText, color: "text-emerald-400 bg-emerald-500/10", href: "/studio" },
                      { title: "Sunum", desc: "Sorular ve beyaz tahta içeren slaytlar", icon: Presentation, color: "text-amber-400 bg-amber-500/10", href: "/studio" },
                      { title: "Video", desc: "Videonun önemli noktalarındaki sorular", icon: Video, color: "text-rose-400 bg-rose-500/10", href: "/studio" },
                      { title: "Geçit (Passage)", desc: "Bir pasajı temel alan okuma soruları", icon: BookOpen, color: "text-sky-400 bg-sky-500/10", href: "/studio" },
                      { title: "Bilgi Kartları / Kartvizit", desc: "Sorular ön tarafta, cevaplar arka tarafta", icon: Layers, color: "text-purple-400 bg-purple-500/10", href: "/studio" },
                    ].map((menuItem, idx) => {
                      const Icon = menuItem.icon;
                      return (
                        <Link
                          key={idx}
                          href={menuItem.href}
                          onClick={() => setIsResourceDropdownOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-850 transition-colors group"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${menuItem.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-200 group-hover:text-fuchsia-300 transition-colors">
                              {menuItem.title}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {menuItem.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Sub Navigation Tabs (Oluşturuldu, Taslak, Arşivlendi) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 border-b border-slate-800 w-full pb-2">
            <button
              onClick={() => setActiveTab("CREATED")}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "CREATED"
                  ? "bg-slate-800 text-sky-400 border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Oluşturuldu ({items.filter((i) => i.status === "PUBLISHED").length}/20)
            </button>
            <button
              onClick={() => setActiveTab("DRAFT")}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "DRAFT"
                  ? "bg-slate-800 text-amber-400 border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Taslak ({items.filter((i) => i.status === "DRAFT").length})
            </button>
            <button
              onClick={() => setActiveTab("ARCHIVED")}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "ARCHIVED"
                  ? "bg-slate-800 text-slate-200 border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Arşivlendi ({items.filter((i) => i.status === "ARCHIVED").length})
            </button>
          </div>

          <div className="shrink-0 pl-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500 font-medium cursor-pointer"
            >
              <option value="ALL">Aktivite Türü: Tümü</option>
              <option value="MOCK_EXAM">Tam Deneme Sınavı</option>
              <option value="TOPIC_TEST">Konu Testi</option>
              <option value="QUESTION_SET">Soru Seti</option>
            </select>
          </div>
        </div>

        {/* Content Body */}
        {filteredItems.length === 0 ? (
          /* TAB-SPECIFIC EMPTY STATES */
          activeTab === "ARCHIVED" ? (
            /* ARCHIVE EMPTY STATE (Never shows the onboarding creation box) */
            <div className="max-w-md mx-auto py-20 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-lg">
                <FolderArchive className="w-8 h-8 text-slate-400" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-slate-100">
                  Arşivlenmiş aktivite bulunmuyor
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Kullanımdan kaldırdığınız veya saklamak istediğiniz deneme ve aktiviteler burada güvenle saklanır. Şu an hiçbir içeriği arşivlemediniz.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("CREATED")}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-850 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                Aktivitelerime Dön
              </button>
            </div>
          ) : activeTab === "DRAFT" ? (
            /* DRAFT EMPTY STATE */
            <div className="max-w-md mx-auto py-20 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-lg">
                <FileEdit className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-slate-100">
                  Kayıtlı taslak bulunmuyor
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Hazırlamaya başladığınız fakat henüz yayınlamadığınız tüm sınav denemeleri ve soru modülleri burada taslak olarak saklanır.
                </p>
              </div>
              <Link
                href="/studio"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-amber-950"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Taslak Başlat</span>
              </Link>
            </div>
          ) : (
            /* CREATED TAB ONBOARDING HERO: ONLY displayed when activeTab === "CREATED" and user has no activities */
            <div className="max-w-2xl mx-auto py-12 text-center space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center justify-center gap-2">
                  <span>✏️</span>
                  <span>İlk aktivitenizi oluşturalım!</span>
                </h2>
              </div>

              {/* Search Input from Screenshot 2 */}
              <div className="max-w-lg mx-auto relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Bir etkinlik arayın..."
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              {/* AI Callout from Screenshot 2 */}
              <div className="pt-4 space-y-4">
                <div className="text-xs font-bold text-slate-400 flex items-center justify-center gap-2">
                  <span>Veya kullanarak bir tane yaratın:</span>
                  <span className="font-black text-sm tracking-tight text-white bg-gradient-to-r from-fuchsia-500 to-sky-500 px-2.5 py-0.5 rounded-lg shadow-sm">
                    1MOREQUESTION AI
                  </span>
                </div>

                {/* 5 Creation Cards Grid matching Screenshot 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {/* Card 1: Çalışma Kağıdı */}
                  <Link
                    href="/studio"
                    className="p-4 rounded-2xl bg-[#111827] border border-slate-800 hover:border-fuchsia-500/50 text-left transition-all hover:scale-[1.02] flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Şuradan İthal:</div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-fuchsia-300">
                        Çalışma kağıdı (PDF)
                      </div>
                    </div>
                  </Link>

                  {/* Card 2: Çalışma Materyalleri */}
                  <Link
                    href="/studio"
                    className="p-4 rounded-2xl bg-[#111827] border border-slate-800 hover:border-sky-500/50 text-left transition-all hover:scale-[1.02] flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Şuradan Üret:</div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-sky-300">
                        Çalışma materyalleri
                      </div>
                    </div>
                  </Link>

                  {/* Card 3: İnternet Sitesi */}
                  <Link
                    href="/studio"
                    className="p-4 rounded-2xl bg-[#111827] border border-slate-800 hover:border-emerald-500/50 text-left transition-all hover:scale-[1.02] flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Şuradan Üret:</div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">
                        İnternet sitesi / URL
                      </div>
                    </div>
                  </Link>

                  {/* Card 4: Konu / Standartlar */}
                  <Link
                    href="/studio"
                    className="p-4 rounded-2xl bg-[#111827] border border-slate-800 hover:border-amber-500/50 text-left transition-all hover:scale-[1.02] flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Şuradan Üret:</div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                        Konu / CEFR Standartları
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Card 5: Sıfırdan Oluştur */}
                <div className="max-w-xl mx-auto">
                  <Link
                    href="/studio"
                    className="w-full p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-center transition-all flex items-center justify-center gap-2 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Veya Sıfırdan oluştur</span>
                  </Link>
                </div>
              </div>
            </div>
          )
        ) : (
          /* Table of Items from Screenshot 1 */
          <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-900/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <div className="col-span-6 flex items-center gap-3">
                <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
                <span>Etkinlik Detayları</span>
              </div>
              <div className="col-span-2 text-center">Soru Sayısı & Süre</div>
              <div className="col-span-2 text-center">Satış Fiyatı</div>
              <div className="col-span-2 text-right">Eylemler</div>
            </div>

            <div className="divide-y divide-slate-800/80">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-850/50 transition-colors group"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
                    <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 group-hover:border-sky-500/40 transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                          {item.examCode}
                        </span>
                        {item.status === "ARCHIVED" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-bold">
                            Arşivde
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.type === "MOCK_EXAM" ? "Tam Deneme" : "Modül Testi"} • {item.createdAt}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-xs text-slate-300">
                    <span className="font-semibold text-slate-100">{item.questionCount} Soru</span>
                    <span className="text-slate-500 text-[11px] block">{item.durationMins} Dk</span>
                  </div>

                  <div className="col-span-2 text-center text-xs">
                    {item.price > 0 ? (
                      <span className="font-bold text-emerald-400">{item.price.toFixed(2)} ₺</span>
                    ) : (
                      <span className="text-slate-500">Ücretsiz</span>
                    )}
                  </div>

                  {/* Actions column with More menu */}
                  <div className="col-span-2 flex items-center justify-end gap-2 text-xs relative">
                    {item.status === "ARCHIVED" ? (
                      <button
                        onClick={() => handleRestoreItem(item.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Geri Yükle</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleArchiveItem(item.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Archive className="w-3 h-3" />
                        <span>Arşive Kaldır</span>
                      </button>
                    )}

                    <div className="relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === item.id && (
                        <div className="absolute right-0 top-full mt-1 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-40 text-xs animate-in fade-in">
                          <Link
                            href="/studio"
                            className="block px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
                          >
                            Düzenle
                          </Link>
                          {item.status === "ARCHIVED" ? (
                            <button
                              onClick={() => handleRestoreItem(item.id)}
                              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-800 text-sky-400"
                            >
                              Arşivden Çıkar
                            </button>
                          ) : (
                            <button
                              onClick={() => handleArchiveItem(item.id)}
                              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-800 text-amber-400"
                            >
                              Arşive Taşı
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-400 flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Sil</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

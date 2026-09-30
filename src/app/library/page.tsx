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
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900">
      <Sidebar activeRole={activeRole} onRoleToggle={setActiveRole} />

      <main className="flex-1 overflow-y-auto min-h-screen px-6 sm:px-10 py-6 max-w-7xl mx-auto space-y-6">
        {/* Top Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Benim tarafımdan oluşturuldu
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Hazırladığınız sınav denemeleri, soru modülleri ve ders materyalleri
            </p>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Etkinlik adına göre ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 w-64 shadow-xs"
              />
            </div>

            {/* + Kaynak Ekle Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsResourceDropdownOpen(!isResourceDropdownOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Kaynak ekle</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {/* Wayground Floating Dropdown */}
              {isResourceDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 space-y-3">
                  <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <UploadCloud className="w-4 h-4 text-amber-600" />
                      <span>Kendi kaynağınızı yükleyin</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Çalışma sayfalarınızı, sınav denemelerinizi ve daha fazlasını getirin ve geliştirin.
                    </p>
                  </div>

                  {/* Dropdown Items list */}
                  <div className="space-y-1">
                    {[
                      { title: "Değerlendirme", desc: "Hızlı ve etkileşimli sorular", icon: FileText, color: "text-emerald-700 bg-emerald-50 border border-emerald-100", href: "/studio" },
                      { title: "Sunum", desc: "Sorular ve beyaz tahta içeren slaytlar", icon: Presentation, color: "text-amber-700 bg-amber-50 border border-amber-100", href: "/studio" },
                      { title: "Video", desc: "Videonun önemli noktalarındaki sorular", icon: Video, color: "text-rose-700 bg-rose-50 border border-rose-100", href: "/studio" },
                      { title: "Geçit (Passage)", desc: "Bir pasajı temel alan okuma soruları", icon: BookOpen, color: "text-sky-700 bg-sky-50 border border-sky-100", href: "/studio" },
                      { title: "Bilgi Kartları / Kartvizit", desc: "Sorular ön tarafta, cevaplar arka tarafta", icon: Layers, color: "text-purple-700 bg-purple-50 border border-purple-100", href: "/studio" },
                    ].map((menuItem, idx) => {
                      const Icon = menuItem.icon;
                      return (
                        <Link
                          key={idx}
                          href={menuItem.href}
                          onClick={() => setIsResourceDropdownOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${menuItem.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
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
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Sub Navigation Tabs (Oluşturuldu, Taslak, Arşivlendi) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 border-b border-slate-200 w-full pb-2">
            <button
              onClick={() => setActiveTab("CREATED")}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "CREATED"
                  ? "bg-white text-amber-700 border border-amber-300 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Oluşturuldu ({items.filter((i) => i.status === "PUBLISHED").length}/20)
            </button>
            <button
              onClick={() => setActiveTab("DRAFT")}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "DRAFT"
                  ? "bg-white text-amber-600 border border-amber-300 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Taslak ({items.filter((i) => i.status === "DRAFT").length})
            </button>
            <button
              onClick={() => setActiveTab("ARCHIVED")}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "ARCHIVED"
                  ? "bg-white text-slate-800 border border-slate-300 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Arşivlendi ({items.filter((i) => i.status === "ARCHIVED").length})
            </button>
          </div>

          <div className="shrink-0 pl-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-amber-500 font-medium cursor-pointer shadow-xs"
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
              <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shadow-xs">
                <FolderArchive className="w-8 h-8 text-slate-500" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-slate-900">
                  Arşivlenmiş aktivite bulunmuyor
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Kullanımdan kaldırdığınız veya saklamak istediğiniz deneme ve aktiviteler burada güvenle saklanır. Şu an hiçbir içeriği arşivlemediniz.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("CREATED")}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer shadow-xs"
              >
                Aktivitelerime Dön
              </button>
            </div>
          ) : activeTab === "DRAFT" ? (
            /* DRAFT EMPTY STATE */
            <div className="max-w-md mx-auto py-20 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                <FileEdit className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-slate-900">
                  Kayıtlı taslak bulunmuyor
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Hazırlamaya başladığınız fakat henüz yayınlamadığınız tüm sınav denemeleri ve soru modülleri burada taslak olarak saklanır.
                </p>
              </div>
              <Link
                href="/studio"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Taslak Başlat</span>
              </Link>
            </div>
          ) : (
            /* CREATED TAB ONBOARDING HERO */
            <div className="max-w-2xl mx-auto py-12 text-center space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                  <span>✏️</span>
                  <span>İlk aktivitenizi oluşturalım!</span>
                </h2>
              </div>

              {/* Search Input */}
              <div className="max-w-lg mx-auto relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Bir etkinlik arayın..."
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-xs"
                />
              </div>

              {/* AI Callout */}
              <div className="pt-4 space-y-4">
                <div className="text-xs font-bold text-slate-500 flex items-center justify-center gap-2">
                  <span>Veya kullanarak bir tane yaratın:</span>
                  <span className="font-black text-sm tracking-tight text-white bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-0.5 rounded-lg shadow-xs">
                    1MOREQUESTION AI
                  </span>
                </div>

                {/* 5 Creation Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {/* Card 1: Çalışma Kağıdı */}
                  <Link
                    href="/studio"
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-left transition-all hover:scale-[1.02] flex items-center gap-3 group shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Şuradan İthal:</div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                        Çalışma kağıdı (PDF)
                      </div>
                    </div>
                  </Link>

                  {/* Card 2: Çalışma Materyalleri */}
                  <Link
                    href="/studio"
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-left transition-all hover:scale-[1.02] flex items-center gap-3 group shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Şuradan Üret:</div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                        Çalışma materyalleri
                      </div>
                    </div>
                  </Link>

                  {/* Card 3: İnternet Sitesi */}
                  <Link
                    href="/studio"
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-left transition-all hover:scale-[1.02] flex items-center gap-3 group shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Şuradan Üret:</div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                        İnternet sitesi / URL
                      </div>
                    </div>
                  </Link>

                  {/* Card 4: Konu / Standartlar */}
                  <Link
                    href="/studio"
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-left transition-all hover:scale-[1.02] flex items-center gap-3 group shadow-xs hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Şuradan Üret:</div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                        Konu / CEFR Standartları
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Card 5: Sıfırdan Oluştur */}
                <div className="max-w-xl mx-auto">
                  <Link
                    href="/studio"
                    className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 text-center transition-all flex items-center justify-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-xs hover:shadow-md"
                  >
                    <Plus className="w-4 h-4 text-amber-500" />
                    <span>Veya Sıfırdan oluştur</span>
                  </Link>
                </div>
              </div>
            </div>
          )
        ) : (
          /* Table of Items */
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <div className="col-span-6 flex items-center gap-3">
                <input type="checkbox" className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
                <span>Etkinlik Detayları</span>
              </div>
              <div className="col-span-2 text-center">Soru Sayısı & Süre</div>
              <div className="col-span-2 text-center">Satış Fiyatı</div>
              <div className="col-span-2 text-right">Eylemler</div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/80 transition-colors group"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <input type="checkbox" className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
                    <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-amber-600 group-hover:border-amber-300 transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                          {item.examCode}
                        </span>
                        {item.status === "ARCHIVED" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-bold">
                            Arşivde
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.type === "MOCK_EXAM" ? "Tam Deneme" : "Modül Testi"} • {item.createdAt}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">{item.questionCount} Soru</span>
                    <span className="text-slate-400 text-[11px] block">{item.durationMins} Dk</span>
                  </div>

                  <div className="col-span-2 text-center text-xs">
                    {item.price > 0 ? (
                      <span className="font-bold text-emerald-600">{item.price.toFixed(2)} ₺</span>
                    ) : (
                      <span className="text-slate-400">Ücretsiz</span>
                    )}
                  </div>

                  {/* Actions column with More menu */}
                  <div className="col-span-2 flex items-center justify-end gap-2 text-xs relative">
                    {item.status === "ARCHIVED" ? (
                      <button
                        onClick={() => handleRestoreItem(item.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Geri Yükle</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleArchiveItem(item.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <Archive className="w-3 h-3" />
                        <span>Arşive Kaldır</span>
                      </button>
                    )}

                    <div className="relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === item.id && (
                        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-40 text-xs animate-in fade-in">
                          <Link
                            href="/studio"
                            className="block px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                          >
                            Düzenle
                          </Link>
                          {item.status === "ARCHIVED" ? (
                            <button
                              onClick={() => handleRestoreItem(item.id)}
                              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 text-amber-700"
                            >
                              Arşivden Çıkar
                            </button>
                          ) : (
                            <button
                              onClick={() => handleArchiveItem(item.id)}
                              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 text-amber-600"
                            >
                              Arşive Taşı
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600 flex items-center gap-1.5"
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

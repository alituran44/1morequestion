"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  MoreVertical, 
  DollarSign, 
  Sparkles, 
  ArrowLeft, 
  RefreshCw, 
  Shield, 
  Eye, 
  Award,
  Zap,
  BarChart2
} from "lucide-react";

interface AdminExamItem {
  id: string;
  title: string;
  examCode: string;
  author: string;
  price: number;
  questionCount: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  submittedDate: string;
  salesCount: number;
}

interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
  solvedMocks: number;
}

interface AdminTransactionItem {
  id: string;
  orderNumber: string;
  merchantOid: string;
  userName: string;
  examTitle: string;
  amount: number;
  platformShare: number;
  status: "SUCCESS" | "PENDING" | "FAILED";
  date: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "EXAMS" | "USERS" | "FINANCE" | "SYSTEM">("OVERVIEW");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial Mock Data for Admin
  const [exams, setExams] = useState<AdminExamItem[]>([
    {
      id: "ex-1",
      title: "2026 YDT Şampiyonlar Özgün Deneme #1",
      examCode: "YDT",
      author: "Ahmet Hoca (ELT)",
      price: 69.0,
      questionCount: 80,
      status: "APPROVED",
      submittedDate: "28 Eylül 2026",
      salesCount: 142,
    },
    {
      id: "ex-2",
      title: "2026 YDS Master Akademik Paragraf & Çeviri",
      examCode: "YDS",
      author: "Ahmet Hoca (ELT)",
      price: 89.0,
      questionCount: 80,
      status: "APPROVED",
      submittedDate: "25 Eylül 2026",
      salesCount: 88,
    },
    {
      id: "ex-3",
      title: "IELTS Academic Reading Band 7.5+ Master",
      examCode: "IELTS_ACAD",
      author: "İngilizce Dil Vakfı",
      price: 119.0,
      questionCount: 40,
      status: "PENDING",
      submittedDate: "29 Eylül 2026",
      salesCount: 0,
    },
    {
      id: "ex-4",
      title: "TOEFL iBT Academic Listening & Reading Mock",
      examCode: "TOEFL_IBT",
      author: "TestPrep Global",
      price: 149.0,
      questionCount: 56,
      status: "PENDING",
      submittedDate: "30 Eylül 2026",
      salesCount: 0,
    },
  ]);

  const [users, setUsers] = useState<AdminUserItem[]>([
    {
      id: "usr-1",
      name: "Ahmet Hoca",
      email: "ahmet.elt@okul.com",
      role: "INSTRUCTOR",
      status: "ACTIVE",
      createdAt: "15 Eylül 2026",
      solvedMocks: 0,
    },
    {
      id: "usr-2",
      name: "Deniz Yılmaz",
      email: "deniz.yilmaz@ogrenci.com",
      role: "STUDENT",
      status: "ACTIVE",
      createdAt: "20 Eylül 2026",
      solvedMocks: 14,
    },
    {
      id: "usr-3",
      name: "Selin Demir",
      email: "selin.demir@ogrenci.com",
      role: "STUDENT",
      status: "ACTIVE",
      createdAt: "22 Eylül 2026",
      solvedMocks: 22,
    },
    {
      id: "usr-4",
      name: "Sistem Yöneticisi",
      email: "admin@1morequestion.com",
      role: "ADMIN",
      status: "ACTIVE",
      createdAt: "1 Eylül 2026",
      solvedMocks: 0,
    },
  ]);

  const [transactions, setTransactions] = useState<AdminTransactionItem[]>([
    {
      id: "tx-1",
      orderNumber: "ORD-20260929-8812",
      merchantOid: "PAYN-994101",
      userName: "Deniz Yılmaz",
      examTitle: "2026 YDT Şampiyonlar Özgün Deneme #1",
      amount: 69.0,
      platformShare: 10.35,
      status: "SUCCESS",
      date: "29 Eylül 2026 14:22",
    },
    {
      id: "tx-2",
      orderNumber: "ORD-20260929-8813",
      merchantOid: "PAYN-994102",
      userName: "Berke Demir",
      examTitle: "2026 YDS Master Akademik Paragraf",
      amount: 89.0,
      platformShare: 13.35,
      status: "SUCCESS",
      date: "29 Eylül 2026 15:40",
    },
    {
      id: "tx-3",
      orderNumber: "ORD-20260930-8814",
      merchantOid: "PAYN-994103",
      userName: "Merve Çelik",
      examTitle: "2026 YDT Şampiyonlar Özgün Deneme #1",
      amount: 69.0,
      platformShare: 10.35,
      status: "SUCCESS",
      date: "30 Eylül 2026 09:15",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveExam = (id: string) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, status: "APPROVED" } : e));
    showToast("Deneme sınavı onaylandı ve canlı mağazaya alındı.");
  };

  const handleRejectExam = (id: string) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, status: "REJECTED" } : e));
    showToast("Deneme sınavı reddedildi.");
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
        showToast(`${u.name} kullanıcısının durumu: ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleChangeRole = (id: string, newRole: "STUDENT" | "INSTRUCTOR" | "ADMIN") => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    showToast(`Kullanıcı yetkisi ${newRole} olarak güncellendi.`);
  };

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalCommission = transactions.reduce((acc, t) => acc + t.platformShare, 0);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Admin Top Header */}
      <header className="border-b border-slate-800 bg-[#0c121e]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-rose-950">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base tracking-tight text-white">1morequestion</span>
                  <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    MASTER ADMIN
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Merkezi Yönetim, Denetim & Finans Konsolu
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Exit / Switcher Portals */}
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/student"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:text-emerald-300 font-bold transition-all flex items-center gap-1.5"
            >
              <span>Öğrenci Arenası</span>
            </Link>
            <Link
              href="/instructor"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 hover:text-sky-300 font-bold transition-all flex items-center gap-1.5"
            >
              <span>Eğitmen Paneli</span>
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white font-medium transition-all"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* KPI Dashboard Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in">
          {/* KPI 1 */}
          <div className="p-5 rounded-3xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Toplam Kullanıcı</span>
              <Users className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-black text-white">{users.length * 350 + 20}</div>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>%18 bu ay büyüme</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="p-5 rounded-3xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Aktif Deneme Sınavları</span>
              <FileText className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">{exams.length + 24}</div>
            <div className="text-[11px] text-amber-400 font-semibold">
              {exams.filter(e => e.status === "PENDING").length} Deneme onay bekliyor
            </div>
          </div>

          {/* KPI 3 */}
          <div className="p-5 rounded-3xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Paynkolay Toplam Ciro</span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{totalRevenue * 150 + 12450} ₺</div>
            <div className="text-[11px] text-slate-400">
              Platform Payı (%15): <strong className="text-slate-200">{(totalRevenue * 150 + 12450) * 0.15} ₺</strong>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="p-5 rounded-3xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Soru Havuzu & IRT Motoru</span>
              <Zap className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-3xl font-black text-rose-400">4,850 Soru</div>
            <div className="text-[11px] text-slate-400">
              IRT Yetenek Parametresi: <strong className="text-emerald-400">Kalibre</strong>
            </div>
          </div>
        </section>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("OVERVIEW")}
            className={`text-xs px-4 py-2 rounded-xl font-extrabold transition-all cursor-pointer ${
              activeTab === "OVERVIEW"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-950"
                : "text-slate-400 hover:text-white bg-slate-900/60"
            }`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab("EXAMS")}
            className={`text-xs px-4 py-2 rounded-xl font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "EXAMS"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-950"
                : "text-slate-400 hover:text-white bg-slate-900/60"
            }`}
          >
            <span>Deneme Sınavları & Onay</span>
            {exams.filter(e => e.status === "PENDING").length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {exams.filter(e => e.status === "PENDING").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("USERS")}
            className={`text-xs px-4 py-2 rounded-xl font-extrabold transition-all cursor-pointer ${
              activeTab === "USERS"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-950"
                : "text-slate-400 hover:text-white bg-slate-900/60"
            }`}
          >
            Kullanıcı & Rol Yönetimi
          </button>
          <button
            onClick={() => setActiveTab("FINANCE")}
            className={`text-xs px-4 py-2 rounded-xl font-extrabold transition-all cursor-pointer ${
              activeTab === "FINANCE"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-950"
                : "text-slate-400 hover:text-white bg-slate-900/60"
            }`}
          >
            Paynkolay Finans & Hakediş
          </button>
          <button
            onClick={() => setActiveTab("SYSTEM")}
            className={`text-xs px-4 py-2 rounded-xl font-extrabold transition-all cursor-pointer ${
              activeTab === "SYSTEM"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-950"
                : "text-slate-400 hover:text-white bg-slate-900/60"
            }`}
          >
            AI & Sistem Ayarları
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Pending Actions Box */}
              <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-4">
                <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>İnceleme ve Onay Bekleyen İçerikler</span>
                </h3>
                <div className="space-y-3">
                  {exams.filter(e => e.status === "PENDING").map((ex) => (
                    <div key={ex.id} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{ex.title}</div>
                        <div className="text-[11px] text-slate-400">Yazar: {ex.author} • {ex.questionCount} Soru • Fiyat: {ex.price} ₺</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveExam(ex.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
                        >
                          Onayla
                        </button>
                        <button
                          onClick={() => handleRejectExam(ex.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900 text-rose-300 font-bold transition-all"
                        >
                          Reddet
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Real-time System Status */}
              <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-4">
                <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sistem & Entegrasyon Sağlığı</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Paynkolay Sanal POS API</div>
                      <div className="text-[11px] text-slate-400">Merchant: AKTIF_BANK_LIVE • 3D Secure v2.2</div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Aktif & Bağlı
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">AI Deneme Stüdyosu OCR Motoru</div>
                      <div className="text-[11px] text-slate-400">pdf-parse v2 + Otomatik Regex Ayıklama</div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Çalışıyor
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">SQLite Veritabanı & Prisma ORM</div>
                      <div className="text-[11px] text-slate-400">dev.db • 6 Model • Tam İndeksli</div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Optimal (2.1 ms)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXAMS QUEUE */}
        {activeTab === "EXAMS" && (
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-white">Deneme Sınavları Moderasyon Masası</h3>
                <p className="text-xs text-slate-400">Platformdaki tüm sınavların yayın, fiyat ve onay durumları</p>
              </div>
            </div>

            <div className="divide-y divide-slate-800/80 text-xs">
              {exams.map((ex) => (
                <div key={ex.id} className="p-4 flex items-center justify-between hover:bg-slate-900/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-sm">{ex.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                        {ex.examCode}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        ex.status === "APPROVED"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : ex.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {ex.status === "APPROVED" ? "Yayında" : ex.status === "PENDING" ? "Onay Bekliyor" : "Reddedildi"}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Yazar: {ex.author} • {ex.questionCount} Soru • Satış: {ex.salesCount} Adet • Tarih: {ex.submittedDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-extrabold text-emerald-400 text-sm">{ex.price.toFixed(2)} ₺</div>
                      <div className="text-[10px] text-slate-500">Kullanıcı Başı</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {ex.status !== "APPROVED" && (
                        <button
                          onClick={() => handleApproveExam(ex.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all cursor-pointer"
                        >
                          Yayına Al
                        </button>
                      )}
                      {ex.status === "APPROVED" && (
                        <button
                          onClick={() => handleRejectExam(ex.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-rose-950 text-rose-300 font-bold transition-all cursor-pointer"
                        >
                          Yayından Kaldır
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: USERS & ROLES */}
        {activeTab === "USERS" && (
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-white">Kullanıcı Listesi & Yetkilendirme</h3>
                <p className="text-xs text-slate-400">Kayıtlı öğrenciler, eğitmenler ve yönetici yetkileri</p>
              </div>
            </div>

            <div className="divide-y divide-slate-800/80 text-xs">
              {users.map((usr) => (
                <div key={usr.id} className="p-4 flex items-center justify-between hover:bg-slate-900/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
                      {usr.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100">{usr.name}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                          usr.role === "ADMIN"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : usr.role === "INSTRUCTOR"
                            ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}>
                          {usr.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {usr.email} • Kayıt: {usr.createdAt} • Çözülen Deneme: {usr.solvedMocks}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={usr.role}
                      onChange={(e) => handleChangeRole(usr.id, e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none cursor-pointer"
                    >
                      <option value="STUDENT">Rol: Öğrenci</option>
                      <option value="INSTRUCTOR">Rol: Eğitmen</option>
                      <option value="ADMIN">Rol: Yönetici</option>
                    </select>

                    <button
                      onClick={() => handleToggleUserStatus(usr.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                        usr.status === "ACTIVE"
                          ? "bg-slate-900 hover:bg-rose-950 text-rose-300 border border-slate-800"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {usr.status === "ACTIVE" ? "Askıya Al" : "Aktifleştir"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FINANCE & PAYNKOLAY */}
        {activeTab === "FINANCE" && (
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-white">Paynkolay Sanal POS İşlem Kayıtları</h3>
                <p className="text-xs text-slate-400">3D Secure işlem dökümleri, komisyonlar ve eğitmen hakedişleri</p>
              </div>
            </div>

            <div className="divide-y divide-slate-800/80 text-xs">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-900/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sky-400">{tx.orderNumber}</span>
                      <span className="text-[10px] text-slate-500 font-mono">OID: {tx.merchantOid}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        BAŞARILI
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Müşteri: <strong className="text-slate-200">{tx.userName}</strong> • Ürün: {tx.examTitle} • Tarih: {tx.date}
                    </div>
                  </div>

                  <div className="text-right space-y-0.5">
                    <div className="font-black text-emerald-400 text-sm">+{tx.amount.toFixed(2)} ₺</div>
                    <div className="text-[10px] text-slate-400">
                      Platform Payı: <strong className="text-rose-400">+{tx.platformShare.toFixed(2)} ₺</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM & AI ENGINE */}
        {activeTab === "SYSTEM" && (
          <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-6 animate-in fade-in">
            <div>
              <h3 className="font-extrabold text-base text-white">AI Motoru & IRT Algoritma Kalibrasyonu</h3>
              <p className="text-xs text-slate-400">Yapay zeka soru çıkarma parametreleri ve adaptif havuz kuralları</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="font-bold text-white">IRT Madde Yanıt Teorisi Duyarlılığı</div>
                <p className="text-slate-400 text-[11px]">
                  Öğrencinin anlık yetenek puanı (Theta score) aralığı (-3.0 ile +3.0 arasında).
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="font-mono text-emerald-400 font-bold">Theta Threshold: ±0.5 SD</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="font-bold text-white">OCR PDF Soru Ayrıştırma Güven Skoru</div>
                <p className="text-slate-400 text-[11px]">
                  PDF'ten otomatik soru kökü ve şıkları ayıklarken minimum kabul yüzdesi.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="font-mono text-sky-400 font-bold">%92 Doğruluk Filtresi</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500">
        1morequestion Master Yönetim Konsolu • Güvenli Yönetici Erişimi
      </footer>
    </div>
  );
}
